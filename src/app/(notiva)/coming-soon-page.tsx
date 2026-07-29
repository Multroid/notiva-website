'use client';

/* Port of Designs/Example designs/Notiva Design/Coming Soon.html.

   Everything the source's four <script> blocks did survives here:
   the Novi automaton (lines 348–408), the yellow site notice (320–323), the
   desktop dashboard demo (334–338), the phone mock demo (340–342) and the
   html/body scroll lock (line 15, now `notiva-locked` on <html>). */

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { T, useT, useLang } from '@/components/notiva/lang-context';
import { useNotivaModal } from '@/components/notiva/modal-context';
import { NotivaHeader } from '@/components/notiva/notiva-header';
import { useNotivaTitle } from '@/components/notiva/use-notiva-title';
import { ImageSlot } from '@/components/notiva/image-slot';
import { Novi, NOVI_POSES } from '@/components/notiva/novi';

import '@/styles/notiva/coming-soon.css';
import './coming-soon-shell.css';

/** Same localStorage key the source uses. */
const NKEY = 'notiva-coming-soon-notice-dismissed';

type NavKey = 'start' | 'radar' | 'calendar' | 'tx' | 'tax' | 'receipts';

interface NavItem {
	key: NavKey;
	de: string;
	en: string;
	badge?: string;
}

const OVERVIEW: NavItem[] = [
	{ key: 'start', de: 'Start', en: 'Home' },
	{ key: 'radar', de: 'Radar', en: 'Radar', badge: '3' },
	{ key: 'calendar', de: 'Kalender', en: 'Calendar' },
];

const FINANCE: NavItem[] = [
	{ key: 'tx', de: 'Umsätze', en: 'Transactions' },
	{ key: 'tax', de: 'Steuern', en: 'Tax' },
	{ key: 'receipts', de: 'Belege', en: 'Receipts' },
];

/* The .ai tab is not selectable, so the tab bar stays literal markup. */
type TabKey = 'home' | 'radar' | 'tax';

export function ComingSoonPage(): React.JSX.Element {
	const t = useT();
	const { lang } = useLang();
	const { open } = useNotivaModal();

	const wrapRef = useRef<HTMLDivElement>(null);
	const noviRef = useRef<HTMLImageElement>(null);

	/* site notice */
	const [noticeMin, setNoticeMin] = useState(false);
	/* desktop mock */
	const [navOn, setNavOn] = useState<NavKey>('start');
	const [briefOpen, setBriefOpen] = useState(false);
	const [briefGone, setBriefGone] = useState(false);
	/* phone mock */
	const [pbriefOpen, setPbriefOpen] = useState(false);
	const [tabOn, setTabOn] = useState<TabKey>('home');

	/* Coming Soon.html line 6: a fixed <title>, no data-title-de/-en on <html>,
	   so it never follows the language toggle — same string for both. */
	useNotivaTitle('Notiva · Warteliste', 'Notiva · Warteliste');

	/* ── html,body{height:100%;overflow:hidden} from the source ─────────── */
	useEffect(() => {
		const root = document.documentElement;
		root.classList.add('notiva-locked');
		return () => {
			root.classList.remove('notiva-locked');
		};
	}, []);

	/* ── site notice: restore the persisted / small-screen minimised state ─
	   Source line 321 — read once, on load, never during render. */
	useEffect(() => {
		let stored: string | null = null;
		try {
			stored = window.localStorage.getItem(NKEY);
		} catch {
			stored = null;
		}
		if (stored === '1' || window.innerWidth <= 640) setNoticeMin(true);
	}, []);

	/* ── Novi by screen size (source lines 348–408) ──────────────────────
	   Wide: she strolls the top edge of the dashboard. Small: she peeks over
	   the phone, breathing in place (CSS keyframe) and changing pose.
	   Transform / src / the peek class are written straight onto the node —
	   this is the one place the design genuinely needs imperative writes, and
	   React never re-touches props it did not change. */
	useEffect(() => {
		if (!noviRef.current || !wrapRef.current) return;
		/* explicitly non-null locals: TS does not carry the narrowing above into
		   the hoisted function declarations below */
		const img: HTMLImageElement = noviRef.current;
		const wrap: HTMLDivElement = wrapRef.current;

		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const wide = window.matchMedia('(min-width:901px)');

		let x = 0;
		let face = -1;
		const SPEED = 132;
		let timer: ReturnType<typeof setTimeout> | null = null;
		let poseT: ReturnType<typeof setInterval> | null = null;
		let mode = '';

		function pose(k: string) {
			const s = NOVI_POSES[k];
			if (s && img.getAttribute('src') !== s) img.src = s;
		}
		function range() {
			return Math.min(wrap.clientWidth * 0.34, 430);
		}
		function put(px: number, f: number) {
			img.style.transform =
				'translateX(calc(' + px.toFixed(0) + 'px - 50%)) scaleX(' + f + ')';
		}
		function walk() {
			const R = range();
			let nx = 0;
			let tries = 0;
			do {
				nx = (Math.random() * 2 - 1) * R;
				tries++;
			} while (Math.abs(nx - x) < R * 0.5 && tries < 12);
			const want = nx > x ? -1 : 1; /* art faces left, so mirror to head right */
			pose('walk');
			if (want !== face) {
				/* turn on the spot, fast, before setting off */
				face = want;
				img.style.transition = 'transform 130ms cubic-bezier(.2,.8,.2,1)';
				put(x, face);
				const target = nx;
				timer = setTimeout(function () {
					go(target);
				}, 150);
			} else go(nx);
		}
		function go(nx: number) {
			const dist = Math.abs(nx - x);
			const dur = Math.max(0.9, dist / SPEED);
			img.style.transition = 'transform ' + dur.toFixed(2) + 's linear';
			put(nx, face);
			x = nx;
			timer = setTimeout(think, dur * 1000 + 60);
		}
		function think() {
			pose('think');
			img.style.transition = 'transform 200ms cubic-bezier(.2,.8,.2,1)';
			timer = setTimeout(walk, 3600 + Math.random() * 2600);
		}
		function stroll() {
			img.classList.remove('novi-peek');
			x = -range();
			put(x, face);
			if (reduce) {
				pose('think');
				return;
			}
			timer = setTimeout(walk, 900);
		}
		function peek() {
			img.style.transition = '';
			img.style.transform = '';
			img.classList.add('novi-peek');
			const list = ['think', 'pleased', 'point'];
			let i = 0;
			pose(list[0]);
			if (reduce) return;
			poseT = setInterval(function () {
				i = (i + 1) % list.length;
				pose(list[i]);
			}, 5200);
		}
		function apply() {
			const m = wide.matches ? 'wide' : 'small';
			if (m === mode) return;
			mode = m;
			if (timer) clearTimeout(timer);
			timer = null;
			if (poseT) clearInterval(poseT);
			poseT = null;
			if (m === 'wide') stroll();
			else peek();
		}
		function onResize() {
			apply();
			if (mode !== 'wide') return;
			const R = range();
			if (Math.abs(x) > R) {
				x = x > 0 ? R : -R;
				put(x, face);
			}
		}

		apply();
		wide.addEventListener('change', apply);
		window.addEventListener('resize', onResize);

		return () => {
			wide.removeEventListener('change', apply);
			window.removeEventListener('resize', onResize);
			if (timer) clearTimeout(timer);
			if (poseT) clearInterval(poseT);
			img.classList.remove('novi-peek');
			img.style.transition = '';
			img.style.transform = '';
			img.src = NOVI_POSES.walk;
		};
	}, []);

	function minimiseNotice(e: React.MouseEvent) {
		e.stopPropagation();
		setNoticeMin(true);
		try {
			window.localStorage.setItem(NKEY, '1');
		} catch {
			/* private mode — the notice still minimises for this page view */
		}
	}

	function expandNotice() {
		if (!noticeMin) return;
		setNoticeMin(false);
		try {
			window.localStorage.removeItem(NKEY);
		} catch {
			/* ignore */
		}
	}

	return (
		<div className="notiva-shell nv-coming-soon" lang={lang}>
			<div className="page">
				<NotivaHeader />

				<main>
					<div className="wrap">
						<div className="eyebrow">
							{t(
								'Für Selbstständige in Deutschland und Europa',
								'For the self-employed in Germany and Europe'
							)}
						</div>
						<T
							as="h1"
							de="Nie wieder <em>Angst</em> vor dem Finanzamt"
							en="Never <em>fear</em> the Finanzamt again"
						/>
						<p className="lede">
							{t(
								'Notiva liest Bank, E-Mail und Belege das ganze Jahr, erstellt UStVA und EÜR und warnt, bevor etwas Geld kostet.',
								'Notiva reads your bank, email and documents all year, prepares your UStVA and EÜR, and warns you before anything costs money.'
							)}
						</p>
						<div className="cta-row">
							<button
								className="cta"
								id="open"
								type="button"
								onClick={() => open('waitlist')}
							>
								{t('Auf die Warteliste', 'Join the waitlist')}
							</button>
							<div className="ctaplus">
								<T
									as={Link}
									href="/support"
									className="cta-sub"
									de="<b>✦</b> Bau mit uns: Merch und Spenden →"
									en="<b>✦</b> Build it with us: merch and donations →"
								/>
								<div className="peek" aria-hidden="true">
									<div className="pk shirt" title="Novi T-Shirt">
										<ImageSlot src="/notiva/uploads/firefly-tshirt-design.png" />
									</div>
									<div className="pk stick" title="Novi Sticker-Set">
										<ImageSlot src="/notiva/uploads/adobe-firefly-stickers.png" />
									</div>
								</div>
							</div>
						</div>
						<div className="trustrow">
							<div>{t('DSGVO-konform by design', 'GDPR-compliant by design')}</div>
							<i />
							<div>{t('Daten in Deutschland gehostet', 'Data hosted in Germany')}</div>
							<i />
							<div>{t('Deine Daten bleiben deine', 'Your data stays yours')}</div>
							<i />
							<div>{t('Berechnet, nie geraten', 'Calculated, never guessed')}</div>
						</div>
					</div>
				</main>

				<div className="stagewrap" ref={wrapRef}>
					<Novi pose="walk" ref={noviRef} />
					<div className="stage">
						{/* ── desktop dashboard mock ─────────────────────────── */}
						<div className="mock">
							<div className="bar">
								<b />
								<b />
								<b />
							</div>
							<div className="side">
								<div className="logo">
									<s />
									Notiva
								</div>
								<ul>
									<li className="ai">
										<s />
										Novi<em>{t('KI', 'AI')}</em>
									</li>
								</ul>
								<div className="grp">{t('Übersicht', 'Overview')}</div>
								<ul>
									{OVERVIEW.map((it) => (
										<li
											key={it.key}
											className={navOn === it.key ? 'on' : undefined}
											onClick={() => setNavOn(it.key)}
										>
											<s />
											<span>{t(it.de, it.en)}</span>
											{it.badge ? <em className="n">{it.badge}</em> : null}
										</li>
									))}
								</ul>
								<div className="grp fin">{t('Finanzen', 'Finance')}</div>
								<ul>
									{FINANCE.map((it) => (
										<li
											key={it.key}
											className={navOn === it.key ? 'on' : undefined}
											onClick={() => setNavOn(it.key)}
										>
											<s />
											<span>{t(it.de, it.en)}</span>
										</li>
									))}
								</ul>
							</div>
							<div className="body">
								<div className="day">{t('Dienstag, 28. Juli', 'Tuesday, 28 July')}</div>
								<h4>{t('Willkommen zurück, Markus.', 'Welcome back, Markus.')}</h4>
								<div
									className={
										'brief' +
										(briefOpen ? ' open' : '') +
										(briefGone ? ' gone' : '')
									}
								>
									<Novi pose="think" />
									<div className="txt">
										<div className="eb">
											{t('Dein Tagesbriefing', 'Your daily brief')}
										</div>
										<b>{t('Tagesbriefing — 28. Juli', 'Daily Brief — 28 July')}</b>
										<p>
											{t(
												'Drei Rechnungen sind überfällig — zusammen €4.180,00, die älteste seit 21 Tagen. Deine UStVA für Q3 ist in 6 Tagen fällig, geschätzt €1.240,00; der Betrag liegt schon zurückgelegt auf dem Steuertopf. Zwei Belege aus deinem Postfach warten noch auf Zuordnung.',
												'Three invoices are overdue — €4,180.00 in total, the oldest for 21 days. Your Q3 UStVA is due in 6 days, estimated €1,240.00; the amount is already set aside in your tax pot. Two receipts from your inbox are still waiting to be matched.'
											)}
										</p>
									</div>
									<div className="acts">
										<s onClick={() => setBriefOpen((v) => !v)}>
											{t('Öffnen', 'Open')}
										</s>
										<u
											onClick={() => {
												setBriefGone(true);
											}}
										>
											{t('Später', 'Dismiss')}
										</u>
									</div>
								</div>
								<div
									className={'restore' + (briefGone ? ' show' : '')}
									onClick={() => setBriefGone(false)}
								>
									<span>{t('Briefing ausgeblendet.', 'Brief dismissed.')}</span>
									<b>{t('Wieder anzeigen', 'Show again')}</b>
								</div>
								<div className="balance">
									<div className="lab">{t('Gesamtsaldo', 'Total balance')}</div>
									<div className="num">{t('€12.480', '€12,480')}</div>
									<div className="sub">{t('Über 3 Konten', 'Across 3 accounts')}</div>
									<div className="row">
										<div>
											<span className="lab">
												{t(
													'Frei verfügbar · 30 Tage',
													'Safe to spend · 30 days'
												)}
											</span>
											<b>{t('€8.240', '€8,240')}</b>
										</div>
										<div>
											<span className="lab">
												{t('Zurückgelegt für USt', 'Set aside for VAT')}
											</span>
											<b>{t('€3.180', '€3,180')}</b>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* ── phone mock ─────────────────────────────────────── */}
						<div
							className="phone"
							role="img"
							aria-label="Notiva App auf dem Smartphone"
						>
							<div className="scr">
								<div className="st">
									<span>9:41</span>
									<i />
									<i />
									<i className="bat" />
								</div>
								<div className="ptop">
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src="/notiva/notiva-logo-chip.svg" alt="" />
									<b>Notiva</b>
									<s>
										<em>3</em>
									</s>
								</div>
								<div className="pbody">
									<div>
										<div className="day">
											{t('Dienstag, 28. Juli', 'Tuesday, 28 July')}
										</div>
										<h4>
											{t(
												'Willkommen zurück, Markus.',
												'Welcome back, Markus.'
											)}
										</h4>
									</div>
									<div
										className={'pbrief' + (pbriefOpen ? ' open' : '')}
										onClick={() => setPbriefOpen((v) => !v)}
									>
										<Novi pose="think" />
										<div className="txt">
											<div className="eb">
												{t('Dein Tagesbriefing', 'Your daily brief')}
											</div>
											<p>
												{t(
													'Drei Rechnungen sind überfällig, zusammen €4.180,00. Deine UStVA für Q3 ist in 6 Tagen fällig, geschätzt €1.240,00, und liegt schon zurück. Zwei Belege warten auf Zuordnung.',
													'Three invoices are overdue, €4,180.00 in total. Your Q3 UStVA is due in 6 days, estimated €1,240.00, and already set aside. Two receipts are waiting to be matched.'
												)}
											</p>
										</div>
										<s className="go">→</s>
									</div>
									<div className="pdue">
										<s />
										<span>
											{t('UStVA Q3 · in 6 Tagen', 'UStVA Q3 · in 6 days')}
										</span>
										<b>{t('€1.240', '€1,240')}</b>
									</div>
									<div className="pbal">
										<div className="lab">{t('Gesamtsaldo', 'Total balance')}</div>
										<div className="num">{t('€12.480', '€12,480')}</div>
										<div className="sub">
											{t('Über 3 Konten', 'Across 3 accounts')}
										</div>
										<div className="row">
											<div>
												<span className="lab">
													{t('Frei verfügbar', 'Safe to spend')}
												</span>
												<b>{t('€8.240', '€8,240')}</b>
											</div>
											<div>
												<span className="lab">
													{t('Für USt zurück', 'Set aside for VAT')}
												</span>
												<b>{t('€3.180', '€3,180')}</b>
											</div>
										</div>
									</div>
								</div>
								<div className="tabs">
									<div
										className={tabOn === 'home' ? 'on' : undefined}
										onClick={() => setTabOn('home')}
									>
										<s />
										<span>{t('Start', 'Home')}</span>
									</div>
									<div
										className={tabOn === 'radar' ? 'on' : undefined}
										onClick={() => setTabOn('radar')}
									>
										<s />
										<span>{t('Radar', 'Radar')}</span>
									</div>
									<div className="ai">
										<s>✦</s>
										<span>Novi</span>
									</div>
									<div
										className={tabOn === 'tax' ? 'on' : undefined}
										onClick={() => setTabOn('tax')}
									>
										<s />
										<span>{t('Steuern', 'Tax')}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* ── yellow site notice ──────────────────────────────────── */}
				<aside
					className={'notice' + (noticeMin ? ' is-min' : '')}
					id="notice"
					role="region"
					aria-label="Hinweis"
					onClick={expandNotice}
				>
					<button
						id="notice-close"
						type="button"
						aria-label="Hinweis minimieren"
						onClick={minimiseNotice}
					>
						<svg viewBox="0 0 24 24">
							<path d="M5 5l14 14M19 5L5 19" />
						</svg>
					</button>
					<h3>{t('Wir bauen gerade an Notiva', 'We are building Notiva')}</h3>
					<p>
						{t(
							'Der Start ist für 2026 geplant. Bis dahin ist diese Seite unser Zuhause, die vollständige Website kommt mit dem Start.',
							'Launch is planned for 2026. Until then this page is our home, the full website arrives with launch.'
						)}
					</p>
					<svg className="expand" viewBox="0 0 24 24" aria-hidden="true">
						<path d="M8 14l4-4 4 4" />
					</svg>
				</aside>
			</div>
		</div>
	);
}
