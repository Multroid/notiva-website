'use client';

/* The yellow pre-launch notice from Coming Soon.html (lines 312-317, 320-323).
   Rendered once by NotivaProviders so it appears on every page, and its
   collapsed/expanded state persists across navigation via localStorage.

   Difference from the design source: collapsed is a round info button rather
   than a text pill. */

import React, { useEffect, useLayoutEffect, useState } from 'react';

import { useT } from './lang-context';

/* Layout effect on the client so the collapsed state is applied before the
   browser paints — a plain effect let the full-size card flash on every page
   load. Falls back to useEffect on the server, where layout effects warn. */
const useIsomorphicLayoutEffect =
	typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/* Unchanged from the design source — renaming it would reset the state of
   anyone who has already collapsed the notice. */
const NKEY = 'notiva-coming-soon-notice-dismissed';

export function SiteNotice(): React.JSX.Element {
	const t = useT();

	/* false on the server and on first client render; the stored/small-screen
	   state is applied in the effect below, never during render. */
	const [minimised, setMinimised] = useState(false);

	useIsomorphicLayoutEffect(() => {
		let stored: string | null = null;
		try {
			stored = window.localStorage.getItem(NKEY);
		} catch {
			stored = null;
		}
		/* Source line 321: collapsed if previously dismissed, or on a phone. */
		if (stored === '1' || window.innerWidth <= 640) setMinimised(true);
	}, []);

	function minimise(e: React.MouseEvent) {
		e.stopPropagation();
		setMinimised(true);
		try {
			window.localStorage.setItem(NKEY, '1');
		} catch {
			/* private mode — it still collapses for this page view */
		}
	}

	function expand() {
		if (!minimised) return;
		setMinimised(false);
		try {
			window.localStorage.removeItem(NKEY);
		} catch {
			/* ignore */
		}
	}

	const label = t('Hinweis anzeigen', 'Show notice');

	return (
		<aside
			className={'notice' + (minimised ? ' is-min' : '')}
			id="notice"
			role={minimised ? 'button' : 'region'}
			aria-label={minimised ? label : t('Hinweis', 'Notice')}
			aria-expanded={minimised ? false : undefined}
			tabIndex={minimised ? 0 : undefined}
			onClick={expand}
			onKeyDown={
				minimised
					? (e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								expand();
							}
						}
					: undefined
			}
		>
			<button
				id="notice-close"
				type="button"
				aria-label={t('Hinweis minimieren', 'Minimise notice')}
				onClick={minimise}
			>
				<svg viewBox="0 0 24 24">
					<path d="M5 5l14 14M19 5L5 19" />
				</svg>
			</button>
			{/* h2, not h3: this notice is rendered on every page by NotivaProviders
			    and is the last heading in the document. On the landing page and the
			    404 the only heading before it is the <h1>, so an h3 skipped a
			    level. Nothing styles a bare `.notiva-shell h2`, so the rule in
			    site-notice.css is the only one that applies. */}
			<h2>{t('Wir bauen gerade an Notiva', 'We are building Notiva')}</h2>
			<p>
				{t(
					'Der Start ist für 2026 geplant. Bis dahin ist diese Seite unser Zuhause, die vollständige Website kommt mit dem Start.',
					'Launch is planned for 2026. Until then this page is our home, the full website arrives with launch.'
				)}
			</p>
			{/* shown only when collapsed */}
			<svg className="nicon" viewBox="0 0 24 24" aria-hidden="true">
				<circle cx="12" cy="12" r="9" />
				<path d="M12 11.25v4.75" />
				<path d="M12 7.9v.2" />
			</svg>
		</aside>
	);
}
