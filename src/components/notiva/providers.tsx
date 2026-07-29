'use client';

/* Lang > Basket > Modal, wrapped in a div that carries the next/font
   variables from the (notiva) route-group layout.

   The site notice is rendered here rather than per page so it appears
   everywhere and keeps its collapsed/expanded state across navigation. It
   needs its own .notiva-shell wrapper because the font and colour tokens are
   declared there, not on this div — same pattern the modal uses. */

import React from 'react';
import type { Catalogue } from '@/lib/fourthwall/catalogue';
import { NotivaLangProvider } from './lang-context';
import { NotivaBasketProvider } from './basket-context';
import { NotivaModalProvider } from './modal-context';
import { SiteNotice } from './site-notice';

import '@/styles/notiva/site-notice.css';
/* Mobile rhythm + merch-card layout. Loaded here, at the layout level, rather
   than per page — its selectors lead with .notiva-shell so they out-specify
   the generated stylesheets they refine and do not depend on import order. */
import '@/styles/notiva/rhythm.css';

export function NotivaProviders({
	children,
	className,
	catalogue,
}: {
	children: React.ReactNode;
	className?: string;
	/* Fetched once in the route-group layout and handed down, so the basket, the
	   merch grid and every PDP price agree without each fetching for itself. */
	catalogue?: Catalogue;
}): React.JSX.Element {
	return (
		<div className={className}>
			<NotivaLangProvider>
				<NotivaBasketProvider catalogue={catalogue}>
					<NotivaModalProvider>
						{children}
						<div className="notiva-shell">
							<SiteNotice />
						</div>
					</NotivaModalProvider>
				</NotivaBasketProvider>
			</NotivaLangProvider>
		</div>
	);
}
