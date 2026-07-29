'use server';

/* The handoff to Fourthwall.
 *
 * The basket lives in localStorage for its whole life (see basket-context.tsx)
 * — no Fourthwall cart exists until someone presses "Zur Kasse". That is
 * deliberate: POST /v1/carts creates *and* fills a cart in one call, there is
 * no add-to-cart endpoint to keep in sync, and a cart per add-to-basket would
 * litter the shop with abandoned carts and fire the cart-abandoned webhooks for
 * baskets nobody ever intended to buy.
 *
 * This is a server action, so it is a public endpoint: everything arriving here
 * is treated as hostile. Variant ids are checked against the live catalogue
 * rather than passed straight through, which also catches the honest case of a
 * basket that has been sitting in localStorage since before a product changed. */

import { createCart, checkoutUrl, fourthwallConfig } from './client';
import { getCatalogue } from './catalogue';

/** What the client sends. Prices are deliberately absent — the client does not
 *  get a say in what anything costs; Fourthwall prices the cart from the
 *  variant ids. */
export interface CheckoutLine {
	variantId: string;
	quantity: number;
}

export type CheckoutResult =
	| { ok: true; url: string }
	| { ok: false; reason: 'unconfigured' | 'empty' | 'unavailable' | 'failed' };

const MAX_LINES = 40;
const MAX_QTY = 99;

export async function startCheckout(
	lines: CheckoutLine[]
): Promise<CheckoutResult> {
	const config = fourthwallConfig();
	if (!config) return { ok: false, reason: 'unconfigured' };

	if (!Array.isArray(lines) || lines.length === 0) {
		return { ok: false, reason: 'empty' };
	}
	if (lines.length > MAX_LINES) return { ok: false, reason: 'failed' };

	/* Every variant the shop currently sells, flattened. A basket line that is
	   not in here is stale or forged; either way it must not reach the cart. */
	const catalogue = await getCatalogue();
	const known = new Set(
		Object.values(catalogue).flatMap((entry) =>
			entry.available ? entry.variants.map((v) => v.id) : []
		)
	);

	const items: CheckoutLine[] = [];
	for (const line of lines) {
		if (!line || typeof line.variantId !== 'string') continue;
		if (!known.has(line.variantId)) continue;
		const quantity = Math.floor(Number(line.quantity));
		if (!Number.isFinite(quantity) || quantity < 1) continue;
		items.push({ variantId: line.variantId, quantity: Math.min(MAX_QTY, quantity) });
	}

	if (!items.length) return { ok: false, reason: 'unavailable' };

	try {
		const cart = await createCart(config, items);
		return { ok: true, url: checkoutUrl(config, cart.id) };
	} catch (error) {
		/* The message can carry the storefront token back in an echoed URL, so it
		   is logged and never returned. */
		console.error('[fourthwall] cart creation failed', error);
		return { ok: false, reason: 'failed' };
	}
}
