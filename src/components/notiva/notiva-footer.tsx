'use client';

/* <footer><div class="wrap"><div/><div/></div></footer> — the two-column
   footer used by For Investors, Support Notiva, the merch PDPs and Basket.
   Coming Soon has no footer. */

import React from 'react';
import { CookieSettingsLink } from './cookie-settings-link';
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
				{/* One wrapper, not a third child: .wrap is space-between, so a
				    separate element for the cookie link would drag the two existing
				    columns apart on every page. It renders nothing until Cookiebot
				    has loaded, and nothing at all when no CBID is configured. */}
				<div className="nv-footer-legal">
					<T as="span" de={right.de} en={right.en} />
					<CookieSettingsLink />
				</div>
			</div>
		</footer>
	);
}
