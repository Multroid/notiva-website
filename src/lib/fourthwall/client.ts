/* Fourthwall Storefront API — the raw HTTP layer.
   https://docs.fourthwall.com/storefront/overview

   Everything here runs on the server. The storefront token is a *public* token
   (`ptkn_…`) and the API sends permissive CORS headers, so calling it from the
   browser would work — we do not, for two reasons: keeping it server-side lets
   the catalogue ride Next's fetch cache with a revalidate window, and it keeps
   the token out of the client bundle, which matters the day someone pastes a
   Platform API key in by mistake.

   Only the fields Notiva actually renders are typed. The API returns more
   (sizeGuide, dimensions, compareAtPrice, …); adding them here is a matter of
   copying from the schema, not of changing anything below. */

const API_BASE = 'https://storefront-api.fourthwall.com/v1';

/** Fourthwall bills in one currency per cart; Notiva is a German shop. */
export const CURRENCY = 'EUR';

/* ── wire types ──────────────────────────────────────────────────── */

export interface FwMoney {
	value: number;
	currency: string;
}

export interface FwImage {
	id: string;
	url: string;
	width: number;
	height: number;
}

export interface FwVariant {
	id: string;
	name: string;
	sku: string;
	unitPrice: FwMoney;
	/** Absent on products with a single, unnamed variant. */
	attributes?: {
		description?: string;
		color?: { name: string; swatch: string };
		size?: { name: string };
	};
	stock?: { type: 'LIMITED' | 'UNLIMITED'; inStock?: number };
	images?: FwImage[];
}

export interface FwProduct {
	id: string;
	name: string;
	slug: string;
	description: string;
	state: { type: 'AVAILABLE' | 'SOLD_OUT' };
	access: { type: 'PUBLIC' | 'HIDDEN' | 'PRIVATE' | 'ARCHIVED' };
	images: FwImage[];
	variants: FwVariant[];
}

export interface FwCart {
	id: string;
	items: { variant: FwVariant; quantity: number }[];
}

/* ── configuration ───────────────────────────────────────────────── */

export interface FourthwallConfig {
	token: string;
	/** Host only, no scheme: `shop.notiva.de`. */
	checkoutDomain: string;
}

/** `null` until the shop exists — every caller treats that as "fall back to the
 *  local catalogue" rather than as an error, so the site keeps rendering with
 *  no Fourthwall account at all. */
export function fourthwallConfig(): FourthwallConfig | null {
	const token = process.env.FOURTHWALL_STOREFRONT_TOKEN;
	const checkoutDomain = process.env.FOURTHWALL_CHECKOUT_DOMAIN;
	if (!token || !checkoutDomain) return null;
	return { token, checkoutDomain };
}

export class FourthwallError extends Error {
	constructor(
		message: string,
		readonly status?: number,
		options?: { cause?: unknown }
	) {
		super(message, options);
		this.name = 'FourthwallError';
	}
}

/* ── transport ───────────────────────────────────────────────────── */

interface FetchOptions {
	/** Seconds. Reads are cached; cart writes pass `false`. */
	revalidate?: number | false;
	method?: 'GET' | 'POST';
	body?: unknown;
	query?: Record<string, string | number | undefined>;
}

async function fwFetch<T>(
	config: FourthwallConfig,
	path: string,
	options: FetchOptions = {}
): Promise<T> {
	const { revalidate = 300, method = 'GET', body, query } = options;

	const url = new URL(API_BASE + path);
	url.searchParams.set('storefront_token', config.token);
	for (const [key, value] of Object.entries(query ?? {})) {
		if (value !== undefined) url.searchParams.set(key, String(value));
	}

	let res: Response;
	try {
		res = await fetch(url, {
			method,
			headers: body ? { 'content-type': 'application/json' } : undefined,
			body: body ? JSON.stringify(body) : undefined,
			/* Cart creation must never be served from cache — two people checking
			   out the same basket need two carts. */
			...(revalidate === false
				? { cache: 'no-store' as const }
				: { next: { revalidate, tags: ['fourthwall'] } }),
		});
	} catch (cause) {
		throw new FourthwallError(
			`Fourthwall request failed: ${method} ${path}`,
			undefined,
			{ cause }
		);
	}

	if (!res.ok) {
		/* The body is often a JSON problem document, but not reliably, and it can
		   carry the token back in an echoed URL — so it is read as text, truncated,
		   and never surfaced to the browser (see checkout-action.ts). */
		const detail = await res.text().catch(() => '');
		throw new FourthwallError(
			`Fourthwall ${res.status} on ${method} ${path}: ${detail.slice(0, 200)}`,
			res.status
		);
	}

	return (await res.json()) as T;
}

/* ── reads ───────────────────────────────────────────────────────── */

interface Paged<T> {
	results: T[];
	paging: { hasNextPage: boolean };
}

/** Every public product, via the built-in `all` collection.
 *
 *  There is no standalone list-products endpoint — the documented way to
 *  enumerate a shop is to page through a collection, so that is what this does.
 *  The page cap is a runaway guard: eight products today, and a shop that ever
 *  grows past 500 wants a per-collection fetch instead of this. */
export async function getAllProducts(
	config: FourthwallConfig,
	collection = 'all'
): Promise<FwProduct[]> {
	const out: FwProduct[] = [];
	for (let page = 0; page < 10; page++) {
		const res = await fwFetch<Paged<FwProduct>>(
			config,
			`/collections/${encodeURIComponent(collection)}/products`,
			{ query: { page, size: 50, currency: CURRENCY } }
		);
		out.push(...res.results);
		if (!res.paging?.hasNextPage) break;
	}
	return out;
}

export async function getProduct(
	config: FourthwallConfig,
	slug: string
): Promise<FwProduct> {
	return fwFetch<FwProduct>(config, `/products/${encodeURIComponent(slug)}`, {
		query: { currency: CURRENCY },
	});
}

/* ── cart + checkout ─────────────────────────────────────────────── */

export interface CartItem {
	variantId: string;
	quantity: number;
}

/** POST /v1/carts creates *and* populates in one call — there is no separate
 *  add-to-cart endpoint, which is why Notiva keeps the basket locally and only
 *  materialises a Fourthwall cart at the moment of checkout. */
export async function createCart(
	config: FourthwallConfig,
	items: CartItem[]
): Promise<FwCart> {
	return fwFetch<FwCart>(config, '/carts', {
		method: 'POST',
		revalidate: false,
		query: { currency: CURRENCY },
		body: { items },
	});
}

/** Where the customer leaves Notiva. Everything past this URL — address,
 *  payment, tax, shipping rates, confirmation mail — belongs to Fourthwall. */
export function checkoutUrl(config: FourthwallConfig, cartId: string): string {
	const url = new URL(`https://${config.checkoutDomain}/checkout/`);
	url.searchParams.set('cartCurrency', CURRENCY);
	url.searchParams.set('cartId', cartId);
	return url.toString();
}
