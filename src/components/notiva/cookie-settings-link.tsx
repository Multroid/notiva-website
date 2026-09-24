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

/* Fired by uc.js only once the CMP is actually working on this domain: the
   banner is being built, or a stored answer has been read or a new one given. */
const READY_EVENTS = ['CookiebotOnDialogInit', 'CookiebotOnLoad', 'CookiebotOnConsentReady'];

/* Remembered for the rest of the page session, so a link that mounts after the
   event has already fired (the one on /datenschutz only appears once this hook
   has said yes; every client-side navigation remounts the footer) still sees it. */
let seenReady = false;

function cookiebotIsUp(): boolean {
	return (
		seenReady ||
		Boolean(window.Cookiebot?.hasResponse) ||
		document.getElementById('CybotCookiebotDialog') !== null
	);
}

/** True once Cookiebot can really show its banner on this domain.

    window.Cookiebot existing is not enough. uc.js defines it even when the
    domain is not authorised for the domain group (Cookiebot Manager › Domains):
    it then logs "The domain … is not authorized", never builds the banner, and
    renew() does nothing. That is exactly how the footer link sat dead on
    notiva.de. A consent answer on record or a built banner are states only a
    working CMP reaches; the events cover it reaching one after mount. */
export function useCookiebotReady(): boolean {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		if (!cookiebotEnabled) return;
		if (cookiebotIsUp()) {
			setReady(true);
			return;
		}
		const onReady = (): void => {
			seenReady = true;
			setReady(true);
		};
		for (const name of READY_EVENTS) window.addEventListener(name, onReady);
		return () => {
			for (const name of READY_EVENTS) window.removeEventListener(name, onReady);
		};
	}, []);

	return ready;
}

export function CookieSettingsLink(): React.JSX.Element | null {
	/* Rendered only once Cookiebot is working. Before that renew() would throw
	   or do nothing, and if it never comes up — blocked, offline, domain not
	   authorised, no CBID configured — a dead "Cookie settings" control is worse
	   than no control, because it looks like the withdrawal path and isn't one. */
	const ready = useCookiebotReady();
	const t = useT();

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
