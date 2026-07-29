'use client';

/* Notiva shared navbar — identical across all public pages.
   Markup is the <header> block from Coming Soon.html / For Investors.html /
   Support Notiva.html; the burger + sheet behaviour is assets/notiva-nav.js
   (cloned links + CTA, Escape / outside-click / >820px resize all close it).
   `data-mobilenav` is always present because the JS equivalent always runs.

   Two departures from the source:
   • every nav link carries an icon, so the same row reads at a glance in the
     top bar and as a large touch target in the mobile sheet;
   • the mobile sheet is a full-screen panel rather than a dropdown under the
     header. It therefore renders as a sibling of <header>, not a child:
     the header sets `backdrop-filter`, and a filtered ancestor becomes the
     containing block for `position:fixed` descendants, which would pin the
     panel to the 72px header box instead of the viewport. */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLang, useT } from './lang-context';
import { useNotivaModal } from './modal-context';

/* Stroke width, size and colour all come from nav.css so one rule covers the
   top bar and the sheet. */
function IconInvestors(): React.JSX.Element {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M3 17.5 9.5 11l4 4L21 7.5" />
			<path d="M15 7.5h6v6" />
		</svg>
	);
}

function IconSupport(): React.JSX.Element {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M20.4 5.1a5.2 5.2 0 0 0-7.4 0L12 6.1l-1-1a5.2 5.2 0 1 0-7.4 7.4l8.4 8.4 8.4-8.4a5.2 5.2 0 0 0 0-7.4Z" />
		</svg>
	);
}

function IconMail(): React.JSX.Element {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<rect x="3" y="5" width="18" height="14" rx="2.5" />
			<path d="m3.5 7.9 8.5 5.6 8.5-5.6" />
		</svg>
	);
}

/* Sheet rows only — hidden in the top bar by nav.css. */
function IconGo(): React.JSX.Element {
	return (
		<svg className="navlink-go" viewBox="0 0 24 24" aria-hidden="true">
			<path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
		</svg>
	);
}

/* Waitlist CTA — a bell, because that is what joining buys you: a ping at
   launch. Sized by the `.btn svg` rule, not by the icon. */
function IconWaitlist(): React.JSX.Element {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M18 9a6 6 0 1 0-12 0c0 5-2 6.5-2 6.5h16S18 14 18 9Z" />
			<path d="M13.7 19a2 2 0 0 1-3.4 0" />
		</svg>
	);
}

function IconCopy(): React.JSX.Element {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<rect x="9" y="9" width="11.5" height="11.5" rx="2.5" />
			<path d="M5.5 15H5a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 2 2V6" />
		</svg>
	);
}

function IconCheck(): React.JSX.Element {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="m5 12.5 4.5 4.5L19 7" />
		</svg>
	);
}

const TEAM_EMAIL = 'team@notiva.de';

/* navigator.clipboard needs a secure context; the textarea fallback keeps the
   control working over plain http (LAN preview) and in older Safari. */
async function copyToClipboard(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		/* fall through */
	}
	try {
		const ta = document.createElement('textarea');
		ta.value = text;
		ta.setAttribute('readonly', '');
		ta.style.position = 'fixed';
		ta.style.top = '0';
		ta.style.opacity = '0';
		document.body.appendChild(ta);
		ta.select();
		const ok = document.execCommand('copy');
		ta.remove();
		return ok;
	} catch {
		return false;
	}
}

/* The address is a control, not a destination: a mailto: hands the visitor off
   to whatever mail client the OS decides on, which on a desktop browser is
   usually nothing at all. Clicking copies instead, and the button reports back.
   Styled apart from the nav links in both surfaces so it never reads as one. */
function MailCopy({ sheet }: { sheet?: boolean }): React.JSX.Element {
	const t = useT();
	const [state, setState] = useState<'idle' | 'ok' | 'fail'>('idle');
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(
		() => () => {
			if (timer.current) clearTimeout(timer.current);
		},
		[]
	);

	async function onCopy() {
		const ok = await copyToClipboard(TEAM_EMAIL);
		setState(ok ? 'ok' : 'fail');
		if (timer.current) clearTimeout(timer.current);
		timer.current = setTimeout(() => setState('idle'), 2200);
	}

	const flag =
		state === 'ok'
			? t('Kopiert', 'Copied')
			: t('Kopieren fehlgeschlagen', 'Copy failed');

	return (
		<button
			className={sheet ? 'navmail navmail-row' : 'navmail'}
			type="button"
			data-copied={state === 'ok' ? '' : undefined}
			data-failed={state === 'fail' ? '' : undefined}
			aria-label={t(
				`E-Mail-Adresse ${TEAM_EMAIL} kopieren`,
				`Copy email address ${TEAM_EMAIL}`
			)}
			onClick={onCopy}
		>
			<IconMail />
			<span className="navmail-addr">{TEAM_EMAIL}</span>
			<span className="navmail-end">
				{state === 'ok' ? <IconCheck /> : <IconCopy />}
				{/* the word only has room in the sheet row; the pill shows the tick */}
				<span className="navmail-flag">{state === 'idle' ? '' : flag}</span>
			</span>
			{/* announced once per copy — the tick alone is invisible to a screen
			    reader, and the button's own label never changes */}
			<span className="navmail-live" role="status" aria-live="polite">
				{state === 'idle' ? '' : flag}
			</span>
		</button>
	);
}

/* The DE/EN switch appears twice — top bar and sheet footer — so the ids from
   the design source stay on the top-bar copy only. */
function LangToggle({ withIds }: { withIds?: boolean }): React.JSX.Element {
	const { lang, setLang } = useLang();
	return (
		<div className="lang" role="group" aria-label="Sprache">
			<button
				id={withIds ? 'lang-de' : undefined}
				type="button"
				aria-pressed={lang === 'de'}
				onClick={() => setLang('de')}
			>
				DE
			</button>
			<button
				id={withIds ? 'lang-en' : undefined}
				type="button"
				aria-pressed={lang === 'en'}
				onClick={() => setLang('en')}
			>
				EN
			</button>
		</div>
	);
}

export function NotivaHeader({
	current,
}: {
	current?: 'investors' | 'support';
}): React.JSX.Element {
	const { lang } = useLang();
	const t = useT();
	const { open } = useNotivaModal();
	const [sheetOpen, setSheetOpen] = useState(false);
	const sheetRef = useRef<HTMLDivElement>(null);
	const burgerRef = useRef<HTMLButtonElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);

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

	/* The panel covers the viewport — stop the page scrolling behind it, and
	   hand focus to the close button so the keyboard lands inside the menu. */
	useEffect(() => {
		if (!sheetOpen) return;
		const prev = document.body.style.overflow;
		const burger = burgerRef.current;
		document.body.style.overflow = 'hidden';
		closeRef.current?.focus();
		return () => {
			document.body.style.overflow = prev;
			burger?.focus();
		};
	}, [sheetOpen]);

	const investorsLabel = t('Für Investoren', 'For Investors');
	const supportLabel = t('Unterstützen', 'Support us');
	const waitlistLabel = t('Auf die Warteliste', 'Join the waitlist');

	const items = [
		{
			href: '/for-investors',
			label: investorsLabel,
			icon: <IconInvestors />,
			active: current === 'investors',
		},
		{
			href: '/support',
			label: supportLabel,
			icon: <IconSupport />,
			active: current === 'support',
		},
	];

	/* `sheet` only adds the trailing chevron — everything else is one set of
	   rows styled two ways, so the two surfaces cannot drift apart. */
	function renderLinks(sheet: boolean) {
		return items.map((item) => (
			<Link
				key={item.href}
				className="navlink"
				href={item.href}
				aria-current={item.active ? 'page' : undefined}
			>
				{item.icon}
				<span>{item.label}</span>
				{sheet ? <IconGo /> : null}
			</Link>
		));
	}

	return (
		<>
			<header>
				<div className="wrap nav" data-mobilenav="">
					<Link className="brand" href="/">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src="/notiva/notiva-logo-chip.svg"
							alt=""
							width={38}
							height={38}
						/>
						<div className="wordmark">Notiva</div>
					</Link>
					<div className="navright">
						{renderLinks(false)}
						<MailCopy />
						<LangToggle withIds />
						<button
							className="btn btn-solid"
							type="button"
							onClick={() => open('waitlist')}
						>
							<IconWaitlist />
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
			</header>
			<div
				ref={sheetRef}
				className="navsheet"
				data-open={sheetOpen ? '' : undefined}
				aria-hidden={!sheetOpen}
				aria-label={lang === 'en' ? 'Menu' : 'Menü'}
				onClick={(e) => {
					/* Any link or the CTA dismisses the panel; the DE/EN switch is a
					   setting and the address copies in place, so neither dismisses it —
					   closing over the "Kopiert" tick would hide the only confirmation
					   the visitor gets. */
					const hit = (e.target as HTMLElement).closest('a,button');
					if (hit && !hit.closest('.lang,.navmail')) close();
				}}
			>
				<div className="navsheet-top">
					<div className="brand">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src="/notiva/notiva-logo-chip.svg"
							alt=""
							width={34}
							height={34}
						/>
						<div className="wordmark">Notiva</div>
					</div>
					<button
						ref={closeRef}
						className="navsheet-close"
						type="button"
						aria-label={lang === 'en' ? 'Close menu' : 'Menü schließen'}
						onClick={close}
					>
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="M5 5l14 14M19 5L5 19" />
						</svg>
					</button>
				</div>
				<nav className="navsheet-links">
					{renderLinks(true)}
					<MailCopy sheet />
				</nav>
				{/* Pinned to the bottom of the panel: the two things worth reaching
				    for one-handed are the language switch and the waitlist CTA. */}
				<div className="navsheet-foot">
					<LangToggle />
					<button
						className="btn btn-solid"
						type="button"
						onClick={() => open('waitlist')}
					>
						<IconWaitlist />
						{waitlistLabel}
					</button>
				</div>
			</div>
		</>
	);
}
