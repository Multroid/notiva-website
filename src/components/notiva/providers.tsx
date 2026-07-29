'use client';

/* Lang > Basket > Modal, wrapped in a div that carries the next/font
   variables from the (notiva) route-group layout. */

import React from 'react';
import { NotivaLangProvider } from './lang-context';
import { NotivaBasketProvider } from './basket-context';
import { NotivaModalProvider } from './modal-context';

export function NotivaProviders({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}): React.JSX.Element {
	return (
		<div className={className}>
			<NotivaLangProvider>
				<NotivaBasketProvider>
					<NotivaModalProvider>{children}</NotivaModalProvider>
				</NotivaBasketProvider>
			</NotivaLangProvider>
		</div>
	);
}
