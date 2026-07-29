'use client';

/* <footer><div class="wrap"><div/><div/></div></footer> — the two-column
   footer used by For Investors, Support Notiva, the merch PDPs and Basket.
   Coming Soon has no footer. */

import React from 'react';
import { T } from './lang-context';

export function NotivaFooter({
	left,
	right,
}: {
	left: { de: string; en: string };
	right: { de: string; en: string };
}): React.JSX.Element {
	return (
		<footer>
			<div className="wrap">
				<T as="div" de={left.de} en={left.en} />
				<T as="div" de={right.de} en={right.en} />
			</div>
		</footer>
	);
}
