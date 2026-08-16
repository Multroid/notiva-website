'use client';

/* "Cookie-Einstellungen" — reopens the Cookiebot banner.

   Art. 7 Abs. 3 DSGVO wants withdrawing consent to be as easy as giving it, so
   this has to sit somewhere permanent rather than only inside the banner that
   disappears once it is answered. It rides in NotivaFooter, which every page
   except Coming Soon renders; Coming Soon is covered by Cookiebot's own
   floating widget (Cookiebot dashboard › Widget), which needs no code. */

import React, { useEffect, useState } from 'react';

import { cookiebotEnabled } from '@/lib/cookiebot';
import { useT } from './lang-context';

export function CookieSettingsLink(): React.JSX.Element | null {
	/* Rendered only once uc.js has defined window.Cookiebot. Before that
	   renew() would throw, and if the script never arrives — blocked, offline,
	   no CBID configured — a dead "Cookie settings" control is worse than no
	   control, because it looks like the withdrawal path and isn't one. */
	const [ready, setReady] = useState(false);
	const t = useT();

	useEffect(() => {
		if (!cookiebotEnabled) return;
		if (window.Cookiebot) {
			setReady(true);
			return;
		}
		const onLoad = (): void => setReady(true);
		window.addEventListener('CookiebotOnLoad', onLoad);
		return () => window.removeEventListener('CookiebotOnLoad', onLoad);
	}, []);

	if (!ready) return null;

	return (
		<button
			type="button"
			className="nv-cookie-settings"
			onClick={() => window.Cookiebot?.renew()}
		>
			{t('Cookie-Einstellungen', 'Cookie settings')}
		</button>
	);
}
