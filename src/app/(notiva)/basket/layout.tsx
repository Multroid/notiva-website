import type { Metadata } from 'next';

import { NOINDEX } from '@/lib/page-metadata';

/* Basket.html carries data-title-de="Notiva · Korb" / data-title-en="Notiva · Basket".
   The DE title is the static metadata; page.tsx swaps document.title when the
   language flips (assets/notiva-shop.js applyLang(), lines 102–104).

   No canonical, no Open Graph, no description: the basket holds per-visitor
   state and has no stable content, so it must stay out of every index.

   The `noindex, nofollow` below is the *only* signal, by design. robots.ts
   deliberately does not disallow /basket: this page is linked from /support
   and from every PDP, so crawlers find the URL regardless, and a robots.txt
   block would stop them fetching the page and therefore stop them ever
   reading this tag — the classic way a blocked URL lands in the index as a
   bare result. A readable noindex beats a saved request here. */
export const metadata: Metadata = {
	title: 'Notiva · Korb',
	robots: NOINDEX,
};

export default function BasketLayout({ children }: { children: React.ReactNode }) {
	return children;
}
