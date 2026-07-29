'use client';

/* The design pages carry <html data-title-de/-en> and notiva-shop.js applyLang()
   rewrites document.title whenever the language changes.

   In the App Router a plain effect is not enough: Next.js writes the route's
   static `metadata` title into <head> as part of the navigation commit, which
   lands *after* the page's effect. On a fresh load with a stored EN preference
   the body copy switched to English while the tab title stayed German.

   So we set the title and then hold it: a MutationObserver on <head> re-asserts
   it if anything else (Next's metadata, DynamicTitle) overwrites it. */

import { useEffect } from 'react';

import { useLang } from './lang-context';

export function useNotivaTitle(de: string, en: string): void {
	const { lang } = useLang();

	useEffect(() => {
		const want = lang === 'de' ? de : en;
		const apply = () => {
			if (document.title !== want) document.title = want;
		};
		apply();

		/* observe <head>, not the <title> node: Next may replace the element
		   outright rather than mutate its text. */
		const obs = new MutationObserver(apply);
		obs.observe(document.head, { childList: true, subtree: true, characterData: true });
		return () => obs.disconnect();
	}, [lang, de, en]);
}
