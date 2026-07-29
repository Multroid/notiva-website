import type { Metadata } from 'next';

/* Basket.html carries data-title-de="Notiva · Korb" / data-title-en="Notiva · Basket".
   The DE title is the static metadata; page.tsx swaps document.title when the
   language flips (assets/notiva-shop.js applyLang(), lines 102–104). */
export const metadata: Metadata = {
	title: 'Notiva · Korb',
};

export default function BasketLayout({ children }: { children: React.ReactNode }) {
	return children;
}
