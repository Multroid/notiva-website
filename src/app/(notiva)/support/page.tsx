'use client';

/* Port of Designs/Example designs/Notiva Design/Support Notiva.html.
   Layout, copy (DE + EN) and every interaction from the source's inline
   <script> (lines 329–418) are preserved:
   – one-off / monthly toggle
   – 4 amount buttons + the custom-amount field that appears and takes focus
   – 3 monthly tiers
   – donate / subscribe validation + the thank-you overlay
   – the `bootstrapped` term popover (hover = CSS, click pins, ✕ / outside
     click / Escape close, aria-expanded tracks state)
   – paint(): Novi pose + caption + the 220 ms `.up` nudge, re-run on language
     change (the source listens for the `notiva:lang` event)
   – merch grid with quick-add, supporter wall, fine-print <details> */

import '@/styles/notiva/page.css';
import '@/styles/notiva/shop.css';
import '@/styles/notiva/support.css';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { useLang, useT } from '@/components/notiva/lang-context';
import { NotivaHeader } from '@/components/notiva/notiva-header';
import { useNotivaTitle } from '@/components/notiva/use-notiva-title';
import { NotivaFooter } from '@/components/notiva/notiva-footer';
import { BasketBar } from '@/components/notiva/basket-bar';
import { Novi } from '@/components/notiva/novi';
import { ImageSlot } from '@/components/notiva/image-slot';
import { OverlayCard } from '@/components/notiva/overlay-card';
import { fmt, useBasket, type MerchId } from '@/components/notiva/basket-context';
import { useNotivaModal } from '@/components/notiva/modal-context';
import type { DonationIntent } from '@/components/notiva/donation-payment';
import { startDonation } from '@/lib/stripe/donation-action';

/* @stripe/react-stripe-js is ~6 kB of the page's JavaScript and is needed only
   once someone has picked an amount and pressed Weiter. Loading it lazily keeps
   it off the critical path for the large majority who read the page and never
   open the dialog; by the time the chunk is wanted, a server round trip for the
   client secret has already happened, so the fetch is free in wall-clock terms.
   ssr:false because Stripe Elements has no server rendering to do. */
const DonationPayment = dynamic(
	() => import('@/components/notiva/donation-payment').then((m) => m.DonationPayment),
	{ ssr: false }
);

/* ------------------------------------------------------------------ */
/* the source's T table, verbatim (Support Notiva.html lines 331–339)  */
/* ------------------------------------------------------------------ */

type Mode = 'once' | 'month';
type Amount = '5' | '15' | '50' | 'custom';
/* `big` is the custom-amount caption once the entered sum passes €50. */
type CapKey = Amount | 'big';

interface SupportStrings {
	close: string;
	needMail: string;
	needAmt: string;
	/* The design's donT/donN/once/month described a donation that was only
	   *noted* — "Abgebucht wird nichts, solange der Zahlungsdienstleister nicht
	   angebunden ist". Stripe is now that provider, so those strings are not
	   merely unused, they are false, and they are gone rather than left in the
	   table for someone to reach for. These describe a donation that has been
	   charged, plus the two ways getting there can fail. */
	thanksT: string;
	thanksB: string;
	thanksN: string;
	notOpen: string;
	payFailed: string;
	continueBusy: string;
	/** suffix appended to the tile prices while the monthly mode is on */
	per: string;
	caps: Record<Mode, Record<CapKey, string>>;
}

const ST: Record<'de' | 'en', SupportStrings> = {
	de: {
		close: 'Schließen',
		needMail: 'Bitte eine E-Mail-Adresse eintragen, damit wir bestätigen können.',
		needAmt: 'Bitte eine Summe ab €1 eintragen.',
		thanksT: 'Danke.',
		thanksB: 'Deine Unterstützung ist angekommen und geht direkt in Entwicklungszeit.',
		thanksN: 'Die Bestätigung kommt per E-Mail. Eine Spende ist keine Investition und steuerlich nicht abzugsfähig.',
		notOpen:
			'Spenden sind noch nicht freigeschaltet. Wir melden uns, sobald es losgeht.',
		payFailed: 'Das hat gerade nicht geklappt. Bitte versuch es gleich noch einmal.',
		continueBusy: 'Einen Moment …',
		per: ' / Mon.',
		caps: {
			once: {
				'5': 'Ein Monat Belegverarbeitung für einen Pilotnutzer.',
				'15': 'Rund 1.000 Belege erkannt und GoBD-konform archiviert.',
				'50': 'Ein halber Entwicklungstag an der UStVA- und EÜR-Engine.',
				custom: 'Gleiche Aufteilung, egal wie hoch die Summe ist.',
				big: 'Über €50. Mehr als ein halber Entwicklungstag an der Steuer-Engine.',
			},
			month: {
				'5': 'Jeden Monat ein Monat Belegverarbeitung für einen Pilotnutzer.',
				'15': 'Jeden Monat rund 1.000 Belege erkannt und archiviert.',
				'50': 'Jeden Monat ein halber Entwicklungstag an der Steuer-Engine.',
				custom: 'Monatlich ist die Summe, mit der wir planen können.',
				big: 'Über €50 im Monat. Damit planen wir Entwicklungstage fest ein.',
			},
		},
	},
	en: {
		close: 'Close',
		needMail: 'Please enter an email address so we can confirm.',
		needAmt: 'Please enter an amount of €1 or more.',
		thanksT: 'Thank you.',
		thanksB: 'Your support has arrived and goes straight into development time.',
		thanksN: 'The confirmation comes by email. A donation is not an investment and is not tax-deductible.',
		notOpen: 'Donations are not open yet. We will say when they are.',
		payFailed: 'That did not work just now. Please try again in a moment.',
		continueBusy: 'One moment …',
		per: ' / mo',
		caps: {
			once: {
				'5': 'One month of document processing for one pilot user.',
				'15': 'Around 1,000 documents read and archived GoBD-compliant.',
				'50': 'Half a development day on the UStVA and EÜR engine.',
				custom: 'Same split, whatever the amount.',
				big: 'Over €50. More than half a development day on the tax engine.',
			},
			month: {
				'5': 'One month of document processing for one pilot user, every month.',
				'15': 'Around 1,000 documents read and archived, every month.',
				'50': 'Half a development day on the tax engine, every month.',
				custom: 'Monthly is the amount we can plan with.',
				big: 'Over €50 a month. Development days we can commit to.',
			},
		},
	},
};

const MAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function mailOk(v: string): boolean {
	return MAIL_RE.test(v.trim());
}

const DOC_TITLE = { de: 'Notiva · Unterstützen', en: 'Notiva · Support us' };

/* ------------------------------------------------------------------ */
/* donate model                                                        */
/* ------------------------------------------------------------------ */

/* The overlay used to be driven by an {amount, mode} pair, because the design's
   thank-you restated what had just been "noted". With Stripe the thank-you is
   reached after a redirect, where that state no longer exists — and the amount
   is in the confirmation mail anyway, from Stripe, which is the party that
   actually knows it. So the card is now a fixed message and the pair is gone. */

/* spenden-variants.js TIERS — the running total picks Novi's reaction pose.
   Anything at or below €50 still gets `love`; past it, `rocket`. */
const POSE_TIERS: [limit: number, pose: string][] = [
	[10, 'wave'],
	[30, 'happy'],
	[50.0001, 'love'],
];

function poseFor(total: number): string {
	for (const [limit, pose] of POSE_TIERS) if (total < limit) return pose;
	return 'rocket';
}

/** Empty custom field falls back to the design's €60 placeholder, like sum(). */
const CUSTOM_FALLBACK = 60;

/* ------------------------------------------------------------------ */
/* merch grid                                                          */
/* ------------------------------------------------------------------ */

interface MerchCard {
	id: MerchId;
	de: string;
	en: string;
	subDe: string;
	subEn: string;
	/* No `price` here on purpose: it comes from the Fourthwall catalogue via
	   priceOf(), so the grid, the PDP and the basket cannot drift apart. */
	ph: string;
	img?: string;
	/** Alt text, German — only meaningful for the tiles that have a photo.
	    Tiles without `img` render the ✦ placeholder, which carries no meaning. */
	imgAlt?: string;
	/** shirt + hoodie only link through to the size picker */
	sizeOnly?: boolean;
	quickLabel?: string;
}

const CARDS: MerchCard[] = [
	{
		id: 'shirt',
		de: 'T-Shirt ✦',
		en: 'T-shirt ✦',
		subDe: 'Bio-Baumwolle, S–XXL',
		subEn: 'Organic cotton, S–XXL',
		ph: 'Foto: T-Shirt',
		img: '/notiva/novi/merch-shirt.webp',
		imgAlt: 'Notiva T-Shirt ✦ aus Bio-Baumwolle in Off-White, mit dem ✦ klein auf der Brust',
		sizeOnly: true,
	},
	{
		id: 'hoodie',
		de: 'Hoodie ✦',
		en: 'Hoodie ✦',
		subDe: 'Notiva-Blau, S–XXL',
		subEn: 'Notiva blue, S–XXL',
		ph: 'Foto: Hoodie',
		sizeOnly: true,
	},
	{
		id: 'cap',
		de: 'Cap',
		en: 'Cap',
		subDe: 'Gesticktes ✦, Einheitsgröße',
		subEn: 'Embroidered ✦, one size',
		ph: 'Foto: Cap',
		quickLabel: 'Cap in den Korb',
	},
	{
		id: 'tote',
		de: 'Tote Bag',
		en: 'Tote bag',
		subDe: 'Schweres Canvas, 38 × 42 cm',
		subEn: 'Heavy canvas, 38 × 42 cm',
		ph: 'Foto: Tote Bag',
		quickLabel: 'Tote Bag in den Korb',
	},
	{
		id: 'pin',
		de: 'Emaille-Pin ✦',
		en: 'Enamel pin ✦',
		subDe: '22 mm, harte Emaille',
		subEn: '22 mm, hard enamel',
		ph: 'Foto: Emaille-Pin',
		quickLabel: 'Emaille-Pin in den Korb',
	},
	{
		id: 'stickers',
		de: 'Sticker-Set',
		en: 'Sticker set',
		subDe: 'Sieben Novi-Sticker, wetterfest',
		subEn: 'Seven Novi stickers, weatherproof',
		ph: 'Foto: Sticker-Set',
		img: '/notiva/novi/sticker-pack.webp',
		imgAlt: 'Notiva Sticker-Set: sieben wetterfeste Novi-Sticker in verschiedenen Posen',
		quickLabel: 'Sticker-Set in den Korb',
	},
	{
		id: 'sleeve',
		de: 'Laptop-Sleeve',
		en: 'Laptop sleeve',
		subDe: 'Gefilzte Wolle, 13–14 Zoll',
		subEn: 'Felted wool, 13–14 inch',
		ph: 'Foto: Laptop-Sleeve',
		quickLabel: 'Laptop-Sleeve in den Korb',
	},
	{
		id: 'plush',
		de: 'Novi-Plüschtier',
		en: 'Novi plush',
		subDe: '24 cm, sitzt neben dem Monitor',
		subEn: '24 cm, sits by your monitor',
		ph: 'Foto: Novi-Plüschtier',
		quickLabel: 'Novi-Plüschtier in den Korb',
	},
];

const WALL = [
	'Markus H.',
	'Jana R.',
	'Sam O.',
	'Lena B.',
	'Tobias W.',
	'Aylin K.',
	'Fabian S.',
	'Nora M.',
	'Dennis P.',
	'Kathrin L.',
	'Ivo T.',
	'Ahmet Y.',
];

/* ------------------------------------------------------------------ */

export default function SupportPage(): React.JSX.Element {
	const { lang } = useLang();
	const t = useT();
	const s = ST[lang];
	const { add, catalogue, priceOf } = useBasket();
	const { open: openModal } = useNotivaModal();

	/* ---- donate state (design globals: amt / mode, defaulting to €15 once) ---- */
	const [mode, setMode] = useState<Mode>('once');
	const [amt, setAmt] = useState<Amount>('15');
	const [customAmt, setCustomAmt] = useState(String(CUSTOM_FALLBACK));
	const [donMail, setDonMail] = useState('');
	const [donErr, setDonErr] = useState<string | null>(null);
	/* Stripe payment step: the client secret plus what it is for. */
	const [intent, setIntent] = useState<DonationIntent | null>(null);
	const [donBusy, setDonBusy] = useState(false);
	const [thanked, setThanked] = useState(false);

	const customRef = useRef<HTMLInputElement>(null);

	/* ---- popover state ---- */
	const [popOpen, setPopOpen] = useState(false);
	const termWrapRef = useRef<HTMLSpanElement>(null);

	/* document title follows the language, like data-title-de/-en */
	useNotivaTitle(DOC_TITLE.de, DOC_TITLE.en);

	/* The source focuses #custom-amt and re-runs paint() inside the click handler
	   (Support Notiva.html lines 345-361), so both replay even when the clicked
	   button is already the selected one. A change-driven effect would not. */
	const [paintTick, setPaintTick] = useState(0);

	/* Focus after commit, not from the handler: #custom-wrap is still `hidden`
	   while the handler runs, and a hidden field cannot take focus. Keyed on
	   paintTick so re-clicking the already-pressed "Andere" refocuses too. */
	useEffect(() => {
		if (amt === 'custom') customRef.current?.focus();
	}, [amt, paintTick]);

	/* outside click + Escape close the bootstrapped popover */
	useEffect(() => {
		function onDocClick(e: MouseEvent) {
			const target = e.target as Node | null;
			if (target && termWrapRef.current?.contains(target)) return;
			setPopOpen(false);
		}
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				setPopOpen(false);
				setThanked(false);
			}
		}
		document.addEventListener('click', onDocClick);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('click', onDocClick);
			document.removeEventListener('keydown', onKey);
		};
	}, []);

	/* paint(): the running total drives both the caption and Novi's pose. */
	const total =
		amt === 'custom'
			? Number(customAmt) > 0
				? Number(customAmt)
				: CUSTOM_FALLBACK
			: Number(amt);
	const pose = poseFor(total);
	const capKey: CapKey = amt === 'custom' && total > 50 ? 'big' : amt;
	/* Monthly re-labels the tiles rather than swapping them for tier cards. */
	const per = mode === 'month' ? s.per : '';

	const chooseAmount = useCallback((next: Amount) => {
		setAmt(next);
		setDonErr(null);
		setPaintTick((n) => n + 1);
	}, []);

	const chooseMode = useCallback((next: Mode) => {
		setMode(next);
		setPaintTick((n) => n + 1);
	}, []);

	/* "Weiter" no longer just congratulates the visitor — it asks Stripe for a
	   client secret and opens the Payment Element. The amount is re-checked on
	   the server and the charge is built there from the checked value; what is
	   validated here is only so the visitor gets a German error instead of a
	   round trip. */
	const donate = useCallback(() => {
		const v = amt === 'custom' ? Number(customAmt) : Number(amt);
		if (!v || v < 1) {
			setDonErr(s.needAmt);
			return;
		}
		if (!mailOk(donMail)) {
			setDonErr(s.needMail);
			return;
		}
		setDonErr(null);
		setDonBusy(true);
		void startDonation({
			amountEur: v,
			email: donMail.trim(),
			mode,
			lang,
		})
			.then((result) => {
				if (result.ok) {
					setIntent({
						clientSecret: result.clientSecret,
						publishableKey: result.publishableKey,
						amountEur: v,
						mode,
					});
					return;
				}
				setDonErr(result.reason === 'unconfigured' ? s.notOpen : s.payFailed);
			})
			.catch(() => setDonErr(s.payFailed))
			.finally(() => setDonBusy(false));
	}, [amt, customAmt, donMail, lang, mode, s]);

	/* Coming back from Stripe. Methods that need a redirect (3-D Secure, SEPA
	   mandates, wallets) land here with ?donation=done; the in-place path
	   navigates to the same URL so there is one success state either way.
	   window.location rather than useSearchParams(): this page is statically
	   prerendered, and useSearchParams() would force a Suspense boundary around
	   it for a query string that only ever matters after a redirect. */
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		if (params.get('donation') !== 'done') return;
		setThanked(true);
		/* Drop the marker so a refresh does not thank the same person twice.
		   Stripe's own payment_intent* params go with it. */
		params.delete('donation');
		params.delete('payment_intent');
		params.delete('payment_intent_client_secret');
		params.delete('redirect_status');
		const query = params.toString();
		window.history.replaceState(
			null,
			'',
			window.location.pathname + (query ? `?${query}` : '') + window.location.hash
		);
	}, []);

	return (
		<div className="notiva-shell nv-page nv-shop nv-support" lang={lang}>
			<NotivaHeader current="support" />

			{/* ------------------------------- hero ------------------------------- */}
			<section className="hero">
				<div className="wrap">
					<div className="novi-hero">
						<Novi pose="wave" data-novi="wave" alt="" />
						<div className="say">
							{t(
								'Novi ist fast fertig gebaut. Der Rest kostet Entwicklungszeit.',
								'Novi is nearly built. What is left costs development time.'
							)}
						</div>
					</div>
					<div className="eyebrow">{t('Unterstützen', 'Support us')}</div>
					<h1>
						{t(
							'Notiva wird selbst finanziert. Du kannst mitfinanzieren.',
							'Notiva is self-funded. You can help fund it.'
						)}
					</h1>
					<p className="lede">
						<span>
							{t(
								'Wir bauen die deutsche Steuer- und Buchhaltungslogik vor dem Launch aus eigener Tasche —',
								'We are building the German tax and bookkeeping logic before launch out of our own pocket —'
							)}
						</span>{' '}
						<span className="termwrap" ref={termWrapRef}>
							<button
								type="button"
								className="term"
								id="term-boot"
								aria-expanded={popOpen}
								aria-describedby="pop-boot"
								onClick={() => setPopOpen((v) => !v)}
							>
								bootstrapped
							</button>
							<span
								className="pop"
								id="pop-boot"
								role="tooltip"
								data-open={popOpen ? '' : undefined}
							>
								<button
									type="button"
									className="x"
									id="pop-x"
									aria-label="Schließen"
									onClick={() => setPopOpen(false)}
								>
									✕
								</button>
								<span className="w">
									{t('Bootstrapped heißt', 'Bootstrapped means')}
								</span>
								<span className="t">
									{t(
										'Kein Investorengeld, keine Bank, kein Wachstumsdruck. Server, Zertifizierungen und Arbeitszeit zahlen wir aus Ersparnissen und Nebeneinkünften. Das hält uns unabhängig, macht uns aber langsamer als ein Team mit Millionen im Rücken.',
										'No investor money, no bank, no pressure to grow at any cost. Servers, certifications and working hours come out of savings and side income. That keeps us independent, but it makes us slower than a team with millions behind it.'
									)}
								</span>
								<span className="t n">
									{t(
										'Wir sprechen mit Investoren und haben Förderung beantragt. Bis etwas davon steht, hält jede Spende und jedes Shirt die Entwicklung am Laufen.',
										'We are talking to investors and have applied for public funding. Until any of that lands, every donation and every shirt keeps development running.'
									)}
								</span>
							</span>
						</span>
						<span>
							{t(
								'. Spende, was du willst, oder kauf Merch: beides wird Entwicklungszeit und hält den Solo-Tarif für kleine Freiberufler günstig.',
								'. Donate what you like or buy merch: both become development time and keep the Solo plan cheap for small freelancers.'
							)}
						</span>
					</p>
					<div className="actions">
						<a className="btn btn-solid" href="#spenden">
							{t('Spenden', 'Donate')}
						</a>
						<a className="btn btn-ghost" href="#merch">
							{t('Merch kaufen', 'Buy merch')}
						</a>
					</div>
					<div className="prog">
						<div className="top">
							<div className="now">€6.480</div>
							<div className="of">
								{t('von €20.000 · 214 Unterstützer', 'of €20,000 · 214 supporters')}
							</div>
						</div>
						<div className="bar">
							<i />
						</div>
					</div>
					<p className="fine">
						{t(
							'Ziel: Entwicklung bis zum Launch, ohne den Solo-Preis anzuheben. Stand und Unterstützerzahl sind Platzhalter, bis der Zahlungsanbieter angebunden ist.',
							'Goal: development through launch without raising the Solo price. The total and supporter count are placeholders until the payment provider is connected.'
						)}
					</p>
				</div>
			</section>

			{/* ------------------------------ donate ------------------------------ */}
			<section id="spenden">
				<div className="wrap">
					<div className="don-head">
						<div>
							<div className="eyebrow">{t('Spenden', 'Donate')}</div>
							<h2>
								{t(
									'Du zahlst Entwicklungszeit, kein Marketing.',
									'You are paying for development time, not marketing.'
								)}
							</h2>
						</div>
						<div className="toggle" role="group" aria-label={t('Modus', 'Mode')}>
							<button
								id="m-once"
								type="button"
								aria-pressed={mode === 'once'}
								onClick={() => chooseMode('once')}
							>
								{t('Einmalig', 'One-off')}
							</button>
							<button
								id="m-month"
								type="button"
								aria-pressed={mode === 'month'}
								onClick={() => chooseMode('month')}
							>
								{t('Monatlich', 'Monthly')}
							</button>
						</div>
					</div>

					{/* Novi answers the running total — wave / happy / love, then
					    rocket past €50 — and the bubble follows mode + amount. */}
					<div className="don-novi">
						<Novi pose={`react-${pose}`} data-pose={pose} alt="" />
						<p className="say" aria-live="polite">
							{s.caps[mode][capKey]}
						</p>
					</div>

					<div className="amts" role="group" aria-label={t('Summe', 'Amount')}>
						<button
							className="amt"
							type="button"
							data-amt="5"
							aria-pressed={amt === '5'}
							onClick={() => chooseAmount('5')}
						>
							<span className="v">{`€5${per}`}</span>
							<span className="l">
								<span className="long">
									{t(
										'Ein Monat Belegverarbeitung für einen Pilotnutzer',
										'One month of document processing for one pilot user'
									)}
								</span>
								<span className="short">
									{t(
										'Ein Monat Belegverarbeitung',
										'One month of document processing'
									)}
								</span>
							</span>
						</button>
						<button
							className="amt"
							type="button"
							data-amt="15"
							aria-pressed={amt === '15'}
							onClick={() => chooseAmount('15')}
						>
							<span className="v">{`€15${per}`}</span>
							<span className="l">
								<span className="long">
									{t(
										'Rund 1.000 Belege erkannt und GoBD-konform archiviert',
										'Around 1,000 documents read and archived GoBD-compliant'
									)}
								</span>
								<span className="short">
									{t(
										'Rund 1.000 Belege archiviert',
										'Around 1,000 documents archived'
									)}
								</span>
							</span>
						</button>
						<button
							className="amt"
							type="button"
							data-amt="50"
							aria-pressed={amt === '50'}
							onClick={() => chooseAmount('50')}
						>
							<span className="v">{`€50${per}`}</span>
							<span className="l">
								<span className="long">
									{t(
										'Ein halber Entwicklungstag an der UStVA-Engine',
										'Half a development day on the UStVA engine'
									)}
								</span>
								<span className="short">
									{t('Ein halber Entwicklungstag', 'Half a development day')}
								</span>
							</span>
						</button>
						<button
							className="amt"
							type="button"
							data-amt="custom"
							aria-pressed={amt === 'custom'}
							onClick={() => chooseAmount('custom')}
						>
							<span className="v">{t('Andere', 'Other')}</span>
							<span className="l">
								<span className="long">
									{t(
										'Summe selbst wählen, gleiche Aufteilung',
										'Choose your own amount, same split'
									)}
								</span>
								<span className="short">
									{t('Summe selbst wählen', 'Choose your own amount')}
								</span>
							</span>
						</button>
					</div>
					<div className="don-go">
						<div className="field" id="custom-wrap" hidden={amt !== 'custom'}>
							<label htmlFor="custom-amt">
								{t('Summe in Euro', 'Amount in euro')}
							</label>
							<input
								id="custom-amt"
								ref={customRef}
								type="number"
								min="1"
								step="1"
								placeholder={String(CUSTOM_FALLBACK)}
								value={customAmt}
								onChange={(e) => setCustomAmt(e.target.value)}
							/>
						</div>
						<div className="field">
							<label htmlFor="don-mail">
								{t('E-Mail für die Bestätigung', 'Email for the confirmation')}
							</label>
							<input
								id="don-mail"
								type="email"
								placeholder="du@beispiel.de"
								value={donMail}
								onChange={(e) => setDonMail(e.target.value)}
							/>
						</div>
						<button
							className="btn btn-solid"
							type="button"
							id="don-go"
							disabled={donBusy}
							onClick={donate}
						>
							{donBusy ? s.continueBusy : t('Weiter', 'Continue')}
						</button>
					</div>
					<p className="err" id="don-err" hidden={!donErr}>
						{donErr}
					</p>

					<p className="fine">
						{t(
							'Monatlich jederzeit zum Monatsende kündbar. Einmal im Monat eine kurze Notiz per E-Mail: was reingekommen ist, was damit gebaut wurde.',
							'Monthly can be cancelled at the end of any month. Once a month a short note by email: what came in and what it built.'
						)}
					</p>

					<div className="don-split">
						<div className="lbl">
							<b>{t('Wohin es geht', 'Where it goes')}</b>
							<em>
								{t(
									'Interne Schätzwerte, keine geprüften Kosten',
									'Internal estimates, not audited costs'
								)}
							</em>
						</div>
						{/* Decorative: the same 60/25/15 split is spelled out below. */}
						<div className="barx" aria-hidden="true">
							<i style={{ width: '60%', background: 'var(--blue-400)' }} />
							<i style={{ width: '25%', background: 'var(--blue-200)' }} />
							<i style={{ width: '15%', background: 'var(--blue-border)' }} />
						</div>
						<div className="keys">
							<div>
								<s style={{ background: 'var(--blue-400)' }} />
								<p>
									<b>{t('60 % Entwicklung', '60% development')}</b>
									<span>
										{t(
											'UStVA, EÜR, Fristen, E-Rechnung.',
											'UStVA, EÜR, deadlines, e-invoicing.'
										)}
									</span>
								</p>
							</div>
							<div>
								<s style={{ background: 'var(--blue-200)' }} />
								<p>
									<b>{t('25 % Zertifizierung', '25% certification')}</b>
									<span>
										{t(
											'ELSTER-Abgabewege und Prüfungen.',
											'ELSTER filing rails and audits.'
										)}
									</span>
								</p>
							</div>
							<div>
								<s style={{ background: 'var(--blue-border)' }} />
								<p>
									<b>{t('15 % Betrieb', '15% running costs')}</b>
									<span>
										{t(
											'Server und GoBD-Belegarchiv.',
											'Servers and the GoBD document archive.'
										)}
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ------------------------------- merch ------------------------------ */}
			<section id="merch">
				<div className="wrap">
					<div className="eyebrow">{t('Merch', 'Merch')}</div>
					<h2>{t('Der ✦ zum Anziehen.', 'The ✦, wearable.')}</h2>
					<p className="lede">
						{t(
							'Gedruckt in der EU, auf Bestellung. Preise inklusive Mehrwertsteuer, Versand frei ab €60. Was nach Herstellung übrig bleibt, geht in die Entwicklung.',
							'Printed in the EU, made to order. Prices include VAT, free shipping from €60. Whatever is left after production goes into development.'
						)}
					</p>
					<div className="shopgrid">
						{CARDS.map((c) => (
							<div className="pcard" key={c.id}>
								<div className="ph">
									{/* Fourthwall photography wins once it exists; the local
									    slot and then the ✦ mark are the fallbacks. */}
									<ImageSlot
										src={catalogue[c.id]?.images[0]?.url ?? c.img}
										alt={c.imgAlt ?? ''}
										placeholder={c.ph}
										loading="lazy"
									/>
								</div>
								<Link className="meta" href={`/merch/${c.id}`}>
									<div className="n">{t(c.de, c.en)}</div>
									<div className="sub">{t(c.subDe, c.subEn)}</div>
									<div className="pr">{fmt(priceOf(c.id), lang)}</div>
								</Link>
								<div className="row">
									<Link className="go" href={`/merch/${c.id}`}>
										{c.sizeOnly
											? t('Größe wählen', 'Choose a size')
											: t('Ansehen', 'View')}
									</Link>
									{c.sizeOnly ? null : (
										<button
											type="button"
											className="quick"
											data-add-id={c.id}
											aria-label={c.quickLabel}
											onClick={() => add(c.id, '', 1)}
										>
											+
										</button>
									)}
								</div>
							</div>
						))}
					</div>
					<p className="fine">
						{t(
							'Produktion über einen Print-on-Demand-Partner in der EU, Versand nach Deutschland und in die EU. Bestellungen sind bis zum Launch unverbindlich: abgebucht wird nichts, solange der Zahlungsdienstleister nicht angebunden ist.',
							'Produced through a print-on-demand partner in the EU, shipping within Germany and the EU. Orders are non-binding until launch: nothing is charged while the payment provider is not connected.'
						)}
					</p>
				</div>
			</section>

			{/* --------------------------- supporter wall -------------------------- */}
			<section>
				<div className="wrap">
					<div className="eyebrow">{t('Unterstützer-Wand', 'Supporter wall')}</div>
					<h2>
						{t(
							'Die Leute, die früh dabei waren.',
							'The people who were here early.'
						)}
					</h2>
					<div className="wall">
						{WALL.map((n) => (
							<div className="chip" key={n}>
								{n}
							</div>
						))}
						<div className="chip you">{t('Dein Name', 'Your name')}</div>
					</div>
					<p className="fine">
						{t(
							'Ab €15 kommt dein Name hierher, wenn du magst: Vorname und erster Buchstabe des Nachnamens, oder ein Pseudonym. Platzhalternamen, bis echte Unterstützer zustimmen.',
							'From €15 your name goes here if you want it to: first name and last initial, or a pseudonym. Placeholder names until real supporters agree.'
						)}
					</p>
				</div>
			</section>

			{/* -------------------------------- cta ------------------------------- */}
			<section className="cta">
				<div className="wrap">
					<div className="split">
						<div>
							<div className="novi-thanks">
								<Novi pose="relieved" data-novi="relieved" alt="" loading="lazy" />
								<p>
									{t(
										'Auch ohne Geld kommt Notiva voran.',
										'Notiva moves forward without money too.'
									)}
								</p>
							</div>
							<div className="eyebrow" style={{ color: 'var(--paper)' }}>
								{t('Danke', 'Thank you')}
							</div>
							<h2>
								{t(
									'Geld ist nicht die einzige Hilfe.',
									'Money is not the only way to help.'
								)}
							</h2>
							<p className="lede">
								{t(
									'Pilotnutzer werden, uns an eine Kanzlei weiterempfehlen oder ehrliches Feedback schicken hilft genauso viel.',
									'Becoming a pilot user, recommending us to a Kanzlei or sending honest feedback helps just as much.'
								)}
							</p>
							<div className="ctabtns">
								<button
									className="btn btn-paper-solid"
									type="button"
									onClick={() => openModal('waitlist')}
								>
									{t('Auf die Warteliste', 'Join the waitlist')}
								</button>
								<a className="btn btn-paper" href="#spenden">
									{t('Doch spenden', 'Donate after all')}
								</a>
							</div>
						</div>
						<div className="direct">
							<div className="line">
								<span>
									{t(
										'Fragen zur Unterstützung',
										'Questions about supporting'
									)}
								</span>
								<a href="mailto:team@notiva.de?subject=Notiva%20unterst%C3%BCtzen">
									team@notiva.de
								</a>
								<em>
									{t(
										'Antwort meist am selben Tag.',
										'Usually answered the same day.'
									)}
								</em>
							</div>
							<div className="line">
								<span>
									{t(
										'Größere Beträge oder Sachleistung',
										'Larger amounts or in-kind help'
									)}
								</span>
								<a href="mailto:hikmat.imanov@notiva.de?subject=Notiva%20unterst%C3%BCtzen">
									hikmat.imanov@notiva.de
								</a>
								<em>
									{t(
										'Schreib direkt dem Gründer.',
										'Write to the founder directly.'
									)}
								</em>
							</div>
							<div className="line">
								<span>
									{t('Investieren statt spenden', 'Invest instead of donate')}
								</span>
								<Link href="/for-investors">
									{t('Für Investoren →', 'For investors →')}
								</Link>
								<em>
									{t(
										'Pre-Seed ist offen, Deck auf Anfrage.',
										'The pre-seed is open, deck on request.'
									)}
								</em>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ------------------------------- legal ------------------------------ */}
			<section className="legal">
				<div className="wrap">
					<details>
						<summary>
							<span>{t('Das Kleingedruckte', 'The fine print')}</span>
						</summary>
						<ul>
							<li>
								{t(
									'Eine Spende ist keine Beteiligung und keine Investition. Sie begründet keinen Anteil an Notiva, keinen Anspruch auf Rückzahlung und keine Rendite.',
									'A donation is not equity and not an investment. It creates no share in Notiva, no claim to repayment and no return.'
								)}
							</li>
							<li>
								{t(
									'Notiva ist kein gemeinnütziger Verein. Spenden sind steuerlich nicht abzugsfähig, wir stellen keine Zuwendungsbestätigung aus.',
									'Notiva is not a registered charity. Donations are not tax-deductible and we do not issue donation receipts for tax purposes.'
								)}
							</li>
							<li>
								{t(
									'Vergünstigungen für Unterstützer sind freiwillige Zugaben und kein zugesicherter Leistungsumfang. Monatliche Unterstützung ist jederzeit zum Monatsende kündbar.',
									'Supporter perks are voluntary extras, not a guaranteed scope of service. Monthly support can be cancelled at the end of any month.'
								)}
							</li>
							<li>
								{t(
									'Diese Seite ist ein Entwurf. Spenden und Merch-Bestellungen laufen erst, wenn der Zahlungsdienstleister angebunden und die Angaben rechtlich geprüft sind.',
									'This page is a draft. Donations and merch orders only run once the payment provider is connected and the wording has been legally reviewed.'
								)}
							</li>
						</ul>
					</details>
				</div>
			</section>

			<NotivaFooter
				left={{ de: 'Notiva · Deutschland', en: 'Notiva · Germany' }}
				right={{
					de: 'Kein gemeinnütziger Verein. Spenden sind nicht steuerlich abzugsfähig.',
					en: 'Not a registered charity. Donations are not tax-deductible.',
				}}
			/>

			<DonationPayment
				intent={intent}
				lang={lang}
				onCancel={() => setIntent(null)}
			/>

			<OverlayCard
				open={thanked}
				onClose={() => setThanked(false)}
				title={s.thanksT}
				body={s.thanksB}
				note={s.thanksN}
				closeLabel={s.close}
			/>

			<BasketBar />
		</div>
	);
}
