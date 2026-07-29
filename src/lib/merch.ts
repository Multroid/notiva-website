/* The merch catalogue as plain data — no React, no `'use client'`.
 *
 * This used to live inside basket-context.tsx. It moved here so server code
 * (the Fourthwall catalogue bridge, structured data, OG images) can import the
 * *values*, not just the types: importing a runtime value out of a
 * `'use client'` module turns it into a client reference, which is fine for
 * components and wrong for a lookup table.
 *
 * basket-context.tsx re-exports everything below, so existing imports from
 * '@/components/notiva/basket-context' keep working unchanged.
 *
 * Prices here are the *fallback*: once FOURTHWALL_STOREFRONT_TOKEN is set they
 * are replaced at request time by the live figures from Fourthwall. See
 * src/lib/fourthwall/catalogue.ts. */

import type { Lang } from '@/components/notiva/lang-context';

export type MerchId =
	| 'shirt'
	| 'hoodie'
	| 'cap'
	| 'tote'
	| 'pin'
	| 'stickers'
	| 'sleeve'
	| 'plush';

export interface MerchItem {
	slug: MerchId;
	de: string;
	en: string;
	price: number;
	sizes?: string[];
	img?: string;
}

export const MERCH: Record<MerchId, MerchItem> = {
	shirt: {
		slug: 'shirt',
		de: 'T-Shirt ✦',
		en: 'T-shirt ✦',
		price: 29,
		sizes: ['S', 'M', 'L', 'XL', 'XXL'],
		img: '/notiva/novi/merch-shirt.webp',
	},
	hoodie: {
		slug: 'hoodie',
		de: 'Hoodie ✦',
		en: 'Hoodie ✦',
		price: 59,
		sizes: ['S', 'M', 'L', 'XL', 'XXL'],
	},
	cap: { slug: 'cap', de: 'Cap', en: 'Cap', price: 24 },
	tote: { slug: 'tote', de: 'Tote Bag', en: 'Tote bag', price: 19 },
	pin: { slug: 'pin', de: 'Emaille-Pin ✦', en: 'Enamel pin ✦', price: 9 },
	stickers: {
		slug: 'stickers',
		de: 'Sticker-Set',
		en: 'Sticker set',
		price: 6,
		img: '/notiva/novi/sticker-pack.webp',
	},
	sleeve: { slug: 'sleeve', de: 'Laptop-Sleeve', en: 'Laptop sleeve', price: 34 },
	plush: { slug: 'plush', de: 'Novi-Plüschtier', en: 'Novi plush', price: 39 },
};

/* Display-only estimates. Fourthwall computes the real shipping cost at
   checkout from the shop's shipping profile — if these two numbers stop
   matching the Fourthwall settings, these are the ones that are wrong. */
export const SHIP = 4.9;
export const FREE_SHIPPING_FROM = 60;

export function isMerchId(v: unknown): v is MerchId {
	return typeof v === 'string' && Object.prototype.hasOwnProperty.call(MERCH, v);
}

/** Same rounding + separator rules as notiva-shop.js fmt(). */
export function fmt(n: number, lang: Lang): string {
	if (Math.abs(n - Math.round(n)) < 0.005) return '€' + Math.round(n);
	const s = n.toFixed(2);
	return '€' + (lang === 'de' ? s.replace('.', ',') : s);
}
