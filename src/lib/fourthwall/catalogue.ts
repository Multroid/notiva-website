/* The bridge between Fourthwall's catalogue and Notiva's design.
 *
 * Notiva's eight products are addressed by their own slugs (`shirt`, `hoodie`,
 * …) in routes, structured data, OG images and the sitemap. Those slugs are
 * public URLs and must not change just because the shop names a product
 * differently, so this module maps MerchId → Fourthwall slug and normalises the
 * API response into one flat, serialisable shape the client components render.
 *
 * WHAT COMES FROM WHERE
 *   Fourthwall  price, images, variants (and their per-size variant ids), stock
 *   Notiva      the bilingual name and description
 *
 * The split is not a preference: a Fourthwall product carries a single `name`
 * and a single `description`, with no notion of a locale. This site serves
 * German and English at the same URL, so the copy has to stay in
 * PRODUCT_COPY / MERCH. The Fourthwall strings are still exposed below as
 * `fwName` / `fwDescription` in case that trade ever gets made differently.
 *
 * FAILURE IS NOT AN ERROR
 * With no token configured — which is the state until the shop exists — and
 * likewise when the API is unreachable or a slug is unmapped, every entry falls
 * back to the local figures and reports `source: 'local'`. The pages render
 * exactly as they do today; only checkout is disabled, because a cart cannot be
 * built without variant ids. */

import { cache } from 'react';

import { MERCH, type MerchId } from '@/lib/merch';

import {
	CURRENCY,
	fourthwallConfig,
	getAllProducts,
	type FwProduct,
} from './client';

/* ── slug mapping ────────────────────────────────────────────────── */

/** Notiva slug → the product's slug inside Fourthwall.
 *
 *  FILL THIS IN once the products exist: the value is the last segment of the
 *  product URL in the Fourthwall admin. Any entry that does not resolve simply
 *  stays on the local fallback, so a half-populated shop is a valid state and
 *  the six products without photography can be added last. */
export const FOURTHWALL_SLUGS: Record<MerchId, string> = {
	shirt: 'notiva-t-shirt',
	hoodie: 'notiva-hoodie',
	cap: 'notiva-cap',
	tote: 'notiva-tote-bag',
	pin: 'notiva-enamel-pin',
	stickers: 'notiva-sticker-set',
	sleeve: 'notiva-laptop-sleeve',
	plush: 'novi-plush',
};

/* ── normalised shape ────────────────────────────────────────────── */

export interface CatalogueImage {
	url: string;
	width: number;
	height: number;
}

export interface CatalogueVariant {
	/** The UUID the cart API needs. Never a product id. */
	id: string;
	/** 'S' | 'M' | … , or '' for products sold in one variant. */
	size: string;
	price: number;
	inStock: boolean;
}

export interface CatalogueEntry {
	id: MerchId;
	/** Lowest variant price, which is what a listing card shows. */
	price: number;
	currency: string;
	images: CatalogueImage[];
	variants: CatalogueVariant[];
	/** False when the whole product is sold out or withdrawn. */
	available: boolean;
	source: 'fourthwall' | 'local';
	fwName?: string;
	fwDescription?: string;
}

export type Catalogue = Record<MerchId, CatalogueEntry>;

/** True once at least one product resolved against the live shop — the signal
 *  the basket uses to decide whether checkout can run at all. */
export function isLive(catalogue: Catalogue): boolean {
	return Object.values(catalogue).some((e) => e.source === 'fourthwall');
}

export function variantFor(
	entry: CatalogueEntry,
	size: string
): CatalogueVariant | undefined {
	if (!entry.variants.length) return undefined;
	if (!size) return entry.variants[0];
	return entry.variants.find((v) => v.size === size);
}

/** The size list a PDP renders. Live variants win; otherwise the local sizes,
 *  so the picker keeps its shape before the shop exists. */
export function sizesFor(entry: CatalogueEntry): string[] | undefined {
	if (entry.source === 'fourthwall') {
		const sizes = entry.variants.map((v) => v.size).filter(Boolean);
		return sizes.length ? sizes : undefined;
	}
	return MERCH[entry.id].sizes;
}

/* ── building entries ────────────────────────────────────────────── */

function localEntry(id: MerchId): CatalogueEntry {
	const item = MERCH[id];
	return {
		id,
		price: item.price,
		currency: CURRENCY,
		images: [],
		variants: [],
		available: true,
		source: 'local',
	};
}

function fromProduct(id: MerchId, product: FwProduct): CatalogueEntry {
	const variants: CatalogueVariant[] = product.variants.map((v) => ({
		id: v.id,
		size: v.attributes?.size?.name ?? '',
		price: v.unitPrice.value,
		inStock: v.stock?.type === 'LIMITED' ? (v.stock.inStock ?? 0) > 0 : true,
	}));

	/* A product with no variants cannot be added to a cart, so it is not really
	   live — fall back rather than render an add button that cannot work. */
	if (!variants.length) return localEntry(id);

	return {
		id,
		price: Math.min(...variants.map((v) => v.price)),
		currency: product.variants[0]?.unitPrice.currency ?? CURRENCY,
		images: product.images.map((img) => ({
			url: img.url,
			width: img.width,
			height: img.height,
		})),
		variants,
		available: product.state.type === 'AVAILABLE',
		source: 'fourthwall',
		fwName: product.name,
		fwDescription: product.description,
	};
}

function localCatalogue(): Catalogue {
	return Object.fromEntries(
		(Object.keys(MERCH) as MerchId[]).map((id) => [id, localEntry(id)])
	) as Catalogue;
}

/* ── the entry point ─────────────────────────────────────────────── */

/** Server-only. `cache()` collapses the many calls one render makes (layout,
 *  support grid, PDP, OG image) into a single fetch per request; the
 *  revalidate window on the fetch itself handles reuse across requests. */
export const getCatalogue = cache(async (): Promise<Catalogue> => {
	const config = fourthwallConfig();
	if (!config) return localCatalogue();

	let products: FwProduct[];
	try {
		products = await getAllProducts(config);
	} catch (error) {
		/* A shop outage must not take the marketing site with it. */
		console.error('[fourthwall] catalogue fetch failed, using local prices', error);
		return localCatalogue();
	}

	const bySlug = new Map(products.map((p) => [p.slug, p]));

	return Object.fromEntries(
		(Object.keys(MERCH) as MerchId[]).map((id) => {
			const product = bySlug.get(FOURTHWALL_SLUGS[id]);
			return [id, product ? fromProduct(id, product) : localEntry(id)];
		})
	) as Catalogue;
});
