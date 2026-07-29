'use client';

/* Floating basket bar, bottom centre — port of bar() / paintBadge() / flash()
   in assets/notiva-shop.js (lines 71–98). The source refuses to build the bar
   on the basket page ([data-basket-lines] present); here that is `/basket`. */

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from './lang-context';
import { fmt, useBasket } from './basket-context';

export function BasketBar(): React.JSX.Element | null {
	const pathname = usePathname();
	const { lang } = useLang();
	const { count, subtotal, flash } = useBasket();

	if (pathname === '/basket') return null;

	const items =
		lang === 'de'
			? count === 1
				? '1 Artikel'
				: count + ' Artikel'
			: count === 1
				? '1 item'
				: count + ' items';
	const toBasket = lang === 'de' ? 'Zum Korb →' : 'Go to basket →';

	return (
		<div className="basketbar" role="status" data-open={count ? '' : undefined}>
			<svg viewBox="0 0 24 24">
				<path d="M4 8h16l-1.4 11.2A2 2 0 0 1 16.6 21H7.4a2 2 0 0 1-2-1.8L4 8Z" />
				<path d="M9 8V6a3 3 0 0 1 6 0v2" />
			</svg>
			<span className="c">{flash ?? items}</span>
			<span className="t">{fmt(subtotal, lang)}</span>
			<Link className="btn btn-paper-solid" href="/basket">
				{toBasket}
			</Link>
		</div>
	);
}
