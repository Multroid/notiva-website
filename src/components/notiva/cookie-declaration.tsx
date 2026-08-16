'use client';

/* The Cookiebot cookie declaration — the generated table of every cookie the
   scanner found, which § 13 DSGVO / the TDDDG expect the privacy policy to
   carry and which nobody can keep accurate by hand.

   cd.js renders its output next to its own <script> element, so it cannot be a
   JSX <script>: React would run it, but the table would land wherever the
   hydration pass happened to put the node. It is appended into a host div
   instead, and torn down and re-appended when the DE/EN toggle flips, because
   Cookiebot has no API to re-render an existing declaration in another
   language. */

import React, { useEffect, useRef } from 'react';

import { COOKIEBOT_CBID, cookiebotEnabled } from '@/lib/cookiebot';
import { useLang } from './lang-context';

export function CookieDeclaration(): React.JSX.Element | null {
	const host = useRef<HTMLDivElement>(null);
	const { lang } = useLang();

	useEffect(() => {
		const el = host.current;
		if (!el || !cookiebotEnabled) return;

		el.replaceChildren();

		const script = document.createElement('script');
		script.id = 'CookieDeclaration';
		script.src = `https://consent.cookiebot.com/${COOKIEBOT_CBID}/cd.js`;
		script.type = 'text/javascript';
		script.async = true;
		/* Explicit, not auto-detected: Cookiebot reads <html lang>, which is
		   'de' on every first paint (lang-context restores the stored choice in
		   an effect), so an English reader would get a German table. */
		script.setAttribute('data-culture', lang.toUpperCase());
		el.appendChild(script);

		return () => el.replaceChildren();
	}, [lang]);

	/* No CBID configured → no table, and the surrounding section still reads
	   correctly because it describes the cookies in prose above it. */
	if (!cookiebotEnabled) return null;

	return <div ref={host} className="nv-cookie-declaration" />;
}
