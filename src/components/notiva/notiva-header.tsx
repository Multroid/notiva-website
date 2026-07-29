'use client';

/* Notiva shared navbar — identical across all public pages.
   Markup is the <header> block from Coming Soon.html / For Investors.html /
   Support Notiva.html; the burger + sheet behaviour is assets/notiva-nav.js
   (cloned links + CTA, Escape / outside-click / >820px resize all close it).
   `data-mobilenav` is always present because the JS equivalent always runs. */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLang, useT } from './lang-context';
import { useNotivaModal } from './modal-context';

export function NotivaHeader({
	current,
}: {
	current?: 'investors' | 'support';
}): React.JSX.Element {
	const { lang, setLang } = useLang();
	const t = useT();
	const { open } = useNotivaModal();
	const [sheetOpen, setSheetOpen] = useState(false);
	const sheetRef = useRef<HTMLDivElement>(null);
	const burgerRef = useRef<HTMLButtonElement>(null);

	const close = useCallback(() => setSheetOpen(false), []);

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') close();
		}
		function onDocClick(e: MouseEvent) {
			const target = e.target as Node | null;
			if (!target) return;
			if (sheetRef.current?.contains(target)) return;
			if (burgerRef.current?.contains(target)) return;
			close();
		}
		function onResize() {
			if (window.innerWidth > 820) close();
		}
		document.addEventListener('keydown', onKey);
		document.addEventListener('click', onDocClick);
		window.addEventListener('resize', onResize);
		return () => {
			document.removeEventListener('keydown', onKey);
			document.removeEventListener('click', onDocClick);
			window.removeEventListener('resize', onResize);
		};
	}, [close]);

	const investorsLabel = t('Für Investoren', 'For Investors');
	const supportLabel = t('Unterstützen', 'Support us');
	const waitlistLabel = t('Auf die Warteliste', 'Join the waitlist');

	const links = (
		<>
			<Link
				className="navlink"
				href="/for-investors"
				aria-current={current === 'investors' ? 'page' : undefined}
			>
				{investorsLabel}
			</Link>
			<Link
				className="navlink"
				href="/support"
				aria-current={current === 'support' ? 'page' : undefined}
			>
				{supportLabel}
			</Link>
			<a className="navlink" href="mailto:team@notiva.de">
				team@notiva.de
			</a>
		</>
	);

	return (
		<header>
			<div className="wrap nav" data-mobilenav="">
				<Link className="brand" href="/">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src="/notiva/notiva-logo-chip.svg" alt="" />
					<div className="wordmark">Notiva</div>
				</Link>
				<div className="navright">
					{links}
					<div className="lang" role="group" aria-label="Sprache">
						<button
							id="lang-de"
							type="button"
							aria-pressed={lang === 'de'}
							onClick={() => setLang('de')}
						>
							DE
						</button>
						<button
							id="lang-en"
							type="button"
							aria-pressed={lang === 'en'}
							onClick={() => setLang('en')}
						>
							EN
						</button>
					</div>
					<button
						className="btn btn-solid"
						type="button"
						onClick={() => open('waitlist')}
					>
						{waitlistLabel}
					</button>
					<button
						ref={burgerRef}
						className="navburger"
						type="button"
						aria-expanded={sheetOpen}
						aria-label={lang === 'en' ? 'Menu' : 'Menü'}
						onClick={() => setSheetOpen((v) => !v)}
					>
						<span />
						<span />
					</button>
				</div>
			</div>
			<div
				ref={sheetRef}
				className="navsheet"
				hidden={!sheetOpen}
				onClick={(e) => {
					if ((e.target as HTMLElement).closest('a,button')) close();
				}}
			>
				{links}
				<button className="btn btn-solid" type="button" onClick={() => open('waitlist')}>
					{waitlistLabel}
				</button>
			</div>
		</header>
	);
}
