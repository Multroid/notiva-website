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
import Link from 'next/link';

import { useLang, useT } from '@/components/notiva/lang-context';
import { NotivaHeader } from '@/components/notiva/notiva-header';
import { useNotivaTitle } from '@/components/notiva/use-notiva-title';
import { NotivaFooter } from '@/components/notiva/notiva-footer';
import { BasketBar } from '@/components/notiva/basket-bar';
import { Novi } from '@/components/notiva/novi';
import { ImageSlot } from '@/components/notiva/image-slot';
import { OverlayCard } from '@/components/notiva/overlay-card';
import { useBasket, type MerchId } from '@/components/notiva/basket-context';
import { useNotivaModal } from '@/components/notiva/modal-context';

/* ------------------------------------------------------------------ */
/* the source's T table, verbatim (Support Notiva.html lines 331–339)  */
/* ------------------------------------------------------------------ */

type CapKey = 'a5' | 'a15' | 'a50' | 'custom' | 'month';

interface SupportStrings {
	close: string;
	needMail: string;
	needAmt: string;
	donT: string;
	donN: string;
	once(a: number): string;
	month(a: number, n: string): string;
	caps: Record<CapKey, string>;
}

const ST: Record<'de' | 'en', SupportStrings> = {
	de: {
		close: 'Schließen',
		needMail: 'Bitte eine E-Mail-Adresse eintragen, damit wir bestätigen können.',
		needAmt: 'Bitte eine Summe ab €1 eintragen.',
		donT: 'Danke. Vorgemerkt.',
		donN: 'Abgebucht wird nichts, solange der Zahlungsdienstleister nicht angebunden ist. Du bekommst eine Bestätigung per E-Mail.',
		once: (a) => 'Einmalige Spende über €' + a + '.',
		month: (a, n) => '€' + a + ' monatlich, Stufe ' + n + '.',
		caps: {
			a5: 'Ein Monat Beleg- und Postfach-Verarbeitung für einen Pilotnutzer.',
			a15: 'Rund tausend erkannte und GoBD-konform archivierte Belege.',
			a50: 'Ein halber Entwicklungstag an der USt-Engine.',
			custom: 'Jede Summe geht in Entwicklungszeit, nicht in Marketing.',
			month: 'Monatlich ist die Summe, mit der wir planen können.',
		},
	},
	en: {
		close: 'Close',
		needMail: 'Please enter an email address so we can confirm.',
		needAmt: 'Please enter an amount of €1 or more.',
		donT: 'Thank you. Noted.',
		donN: 'Nothing is charged until the payment provider is connected. You will get a confirmation by email.',
		once: (a) => 'One-off donation of €' + a + '.',
		month: (a, n) => '€' + a + ' per month, ' + n + ' tier.',
		caps: {
			a5: 'One month of document and inbox processing for one pilot user.',
			a15: 'Roughly a thousand documents read and archived GoBD-compliant.',
			a50: 'Half a development day on the VAT engine.',
			custom: 'Any amount goes into development time, not marketing.',
			month: 'Monthly is the amount we can plan with.',
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

type Mode = 'once' | 'month';
type Amount = '5' | '15' | '50' | 'custom';
type TierId = 'supporter' | 'foerderer' | 'gruendungskreis';

const TIER_NAME: Record<TierId, string> = {
	supporter: 'Supporter',
	foerderer: 'Förderer',
	gruendungskreis: 'Gründungskreis',
};
const TIER_PRICE: Record<TierId, number> = {
	supporter: 5,
	foerderer: 15,
	gruendungskreis: 50,
};

interface OvState {
	a: number;
	m: Mode;
	n?: string;
}

/* ------------------------------------------------------------------ */
/* merch grid                                                          */
/* ------------------------------------------------------------------ */

interface MerchCard {
	id: MerchId;
	de: string;
	en: string;
	subDe: string;
	subEn: string;
	price: string;
	ph: string;
	img?: string;
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
		price: '€29',
		ph: 'Foto: T-Shirt',
		img: '/notiva/novi/merch-shirt.png',
		sizeOnly: true,
	},
	{
		id: 'hoodie',
		de: 'Hoodie ✦',
		en: 'Hoodie ✦',
		subDe: 'Notiva-Blau, S–XXL',
		subEn: 'Notiva blue, S–XXL',
		price: '€59',
		ph: 'Foto: Hoodie',
		sizeOnly: true,
	},
	{
		id: 'cap',
		de: 'Cap',
		en: 'Cap',
		subDe: 'Gesticktes ✦, Einheitsgröße',
		subEn: 'Embroidered ✦, one size',
		price: '€24',
		ph: 'Foto: Cap',
		quickLabel: 'Cap in den Korb',
	},
	{
		id: 'tote',
		de: 'Tote Bag',
		en: 'Tote bag',
		subDe: 'Schweres Canvas, 38 × 42 cm',
		subEn: 'Heavy canvas, 38 × 42 cm',
		price: '€19',
		ph: 'Foto: Tote Bag',
		quickLabel: 'Tote Bag in den Korb',
	},
	{
		id: 'pin',
		de: 'Emaille-Pin ✦',
		en: 'Enamel pin ✦',
		subDe: '22 mm, harte Emaille',
		subEn: '22 mm, hard enamel',
		price: '€9',
		ph: 'Foto: Emaille-Pin',
		quickLabel: 'Emaille-Pin in den Korb',
	},
	{
		id: 'stickers',
		de: 'Sticker-Set',
		en: 'Sticker set',
		subDe: 'Sieben Novi-Sticker, wetterfest',
		subEn: 'Seven Novi stickers, weatherproof',
		price: '€6',
		ph: 'Foto: Sticker-Set',
		img: '/notiva/novi/sticker-pack.png',
		quickLabel: 'Sticker-Set in den Korb',
	},
	{
		id: 'sleeve',
		de: 'Laptop-Sleeve',
		en: 'Laptop sleeve',
		subDe: 'Gefilzte Wolle, 13–14 Zoll',
		subEn: 'Felted wool, 13–14 inch',
		price: '€34',
		ph: 'Foto: Laptop-Sleeve',
		quickLabel: 'Laptop-Sleeve in den Korb',
	},
	{
		id: 'plush',
		de: 'Novi-Plüschtier',
		en: 'Novi plush',
		subDe: '24 cm, sitzt neben dem Monitor',
		subEn: '24 cm, sits by your monitor',
		price: '€39',
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
	const { add } = useBasket();
	const { open: openModal } = useNotivaModal();

	/* ---- donate state (source globals: mode / amt / tier / ovState) ---- */
	const [mode, setMode] = useState<Mode>('once');
	const [amt, setAmt] = useState<Amount>('5');
	const [tier, setTier] = useState<TierId>('supporter');
	const [customAmt, setCustomAmt] = useState('');
	const [donMail, setDonMail] = useState('');
	const [subMail, setSubMail] = useState('');
	const [donErr, setDonErr] = useState<string | null>(null);
	const [subErr, setSubErr] = useState<string | null>(null);
	const [ovState, setOvState] = useState<OvState | null>(null);

	const customRef = useRef<HTMLInputElement>(null);

	/* ---- popover state ---- */
	const [popOpen, setPopOpen] = useState(false);
	const termWrapRef = useRef<HTMLSpanElement>(null);

	/* ---- Novi reaction ---- */
	const [up, setUp] = useState(false);

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
				setOvState(null);
			}
		}
		document.addEventListener('click', onDocClick);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('click', onDocClick);
			document.removeEventListener('keydown', onKey);
		};
	}, []);

	/* paint(): pose + caption + the 220 ms nudge, on every mode/amount/lang
	   change and once on load — exactly when the source calls paint(). */
	let pose = 'idle';
	let capKey: CapKey = 'a5';
	if (mode === 'month') {
		pose = 'calendar';
		capKey = 'month';
	} else if (amt === '15') {
		pose = 'pleased';
		capKey = 'a15';
	} else if (amt === '50') {
		pose = 'delighted';
		capKey = 'a50';
	} else if (amt === 'custom') {
		pose = 'pleased';
		capKey = 'custom';
	}

	useEffect(() => {
		setUp(true);
		const id = setTimeout(() => setUp(false), 220);
		return () => clearTimeout(id);
	}, [paintTick, lang]);

	const chooseAmount = useCallback((next: Amount) => {
		setAmt(next);
		setDonErr(null);
		setPaintTick((n) => n + 1);
	}, []);

	const chooseMode = useCallback((next: Mode) => {
		setMode(next);
		setPaintTick((n) => n + 1);
	}, []);

	const donate = useCallback(() => {
		const v = amt === 'custom' ? customAmt : amt;
		if (!v || Number(v) < 1) {
			setDonErr(s.needAmt);
			return;
		}
		if (!mailOk(donMail)) {
			setDonErr(s.needMail);
			return;
		}
		setDonErr(null);
		setOvState({ a: Number(v), m: 'once' });
	}, [amt, customAmt, donMail, s]);

	const subscribe = useCallback(() => {
		if (!mailOk(subMail)) {
			setSubErr(s.needMail);
			return;
		}
		setSubErr(null);
		setOvState({ a: TIER_PRICE[tier], m: 'month', n: TIER_NAME[tier] });
	}, [subMail, tier, s]);

	const ovBody = ovState
		? ovState.m === 'once'
			? s.once(ovState.a)
			: s.month(ovState.a, ovState.n ?? '')
		: '';

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
					<div className="eyebrow">{t('Spenden', 'Donate')}</div>
					<h2>{t('Einmalig oder monatlich.', 'One-off or monthly.')}</h2>
					<div className="toggle" role="group" aria-label="Modus">
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

					<div id="once" hidden={mode !== 'once'}>
						<div className="amts" role="group">
							<button
								className="amt"
								type="button"
								data-amt="5"
								aria-pressed={amt === '5'}
								onClick={() => chooseAmount('5')}
							>
								<span className="v">€5</span>
								<span className="l">
									{t('Ein Kaffee für Novi', 'A coffee for Novi')}
								</span>
							</button>
							<button
								className="amt"
								type="button"
								data-amt="15"
								aria-pressed={amt === '15'}
								onClick={() => chooseAmount('15')}
							>
								<span className="v">€15</span>
								<span className="l">
									{t(
										'Name auf der Unterstützer-Wand',
										'Name on the supporter wall'
									)}
								</span>
							</button>
							<button
								className="amt"
								type="button"
								data-amt="50"
								aria-pressed={amt === '50'}
								onClick={() => chooseAmount('50')}
							>
								<span className="v">€50</span>
								<span className="l">
									{t(
										'Wand plus Sticker-Set per Post',
										'Wall plus a sticker set by post'
									)}
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
									{t('Summe selbst wählen', 'Choose your own amount')}
								</span>
							</button>
						</div>
						<div className="pay">
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
									placeholder="25"
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
								onClick={donate}
							>
								{t('Weiter', 'Continue')}
							</button>
						</div>
						<p className="err" id="don-err" hidden={!donErr}>
							{donErr}
						</p>
					</div>

					<div id="monthly" hidden={mode !== 'month'}>
						<div className="tiers" role="group">
							<button
								className="tier"
								type="button"
								data-tier="supporter"
								data-price="5"
								aria-pressed={tier === 'supporter'}
								onClick={() => setTier('supporter')}
							>
								<div className="name">Supporter</div>
								<div className="price">
									€5 <small>{t('/ Monat', '/ month')}</small>
								</div>
								<ul>
									<li>
										{t(
											'Name auf der Unterstützer-Wand',
											'Name on the supporter wall'
										)}
									</li>
									<li>
										{t(
											'Einladung in die Beta, sobald Plätze frei sind',
											'Beta invite as soon as seats open'
										)}
									</li>
								</ul>
							</button>
							<button
								className="tier"
								type="button"
								data-tier="foerderer"
								data-price="15"
								aria-pressed={tier === 'foerderer'}
								onClick={() => setTier('foerderer')}
							>
								<div className="name">Förderer</div>
								<div className="price">
									€15 <small>{t('/ Monat', '/ month')}</small>
								</div>
								<ul>
									<li>{t('Alles aus Supporter', 'Everything in Supporter')}</li>
									<li>
										{t(
											'Founding-Supporter-Abzeichen im Produkt',
											'Founding Supporter badge in the product'
										)}
									</li>
									<li>{t('Sticker-Set per Post', 'Sticker set by post')}</li>
								</ul>
							</button>
							<button
								className="tier"
								type="button"
								data-tier="gruendungskreis"
								data-price="50"
								aria-pressed={tier === 'gruendungskreis'}
								onClick={() => setTier('gruendungskreis')}
							>
								<div className="name">Gründungskreis</div>
								<div className="price">
									€50 <small>{t('/ Monat', '/ month')}</small>
								</div>
								<ul>
									<li>{t('Alles aus Förderer', 'Everything in Förderer')}</li>
									<li>
										{t(
											'Rabatt im ersten Abo-Jahr',
											'Discount in your first subscription year'
										)}
									</li>
									<li>
										{t(
											'Stimme bei Roadmap-Prioritäten',
											'A vote on roadmap priorities'
										)}
									</li>
								</ul>
							</button>
						</div>
						<div className="pay">
							<div className="field">
								<label htmlFor="sub-mail">
									{t('E-Mail für die Bestätigung', 'Email for the confirmation')}
								</label>
								<input
									id="sub-mail"
									type="email"
									placeholder="du@beispiel.de"
									value={subMail}
									onChange={(e) => setSubMail(e.target.value)}
								/>
							</div>
							<button
								className="btn btn-solid"
								type="button"
								id="sub-go"
								onClick={subscribe}
							>
								{t('Weiter', 'Continue')}
							</button>
						</div>
						<p className="err" id="sub-err" hidden={!subErr}>
							{subErr}
						</p>
						<p className="fine">
							{t(
								'Monatliche Unterstützung ist jederzeit zum Monatsende kündbar, mit einer E-Mail und ohne Begründung.',
								'Monthly support can be cancelled at the end of any month, by email and without a reason.'
							)}
						</p>
					</div>

					<div className={up ? 'novi-react up' : 'novi-react'} id="nr">
						<Novi pose={pose} data-novi={pose} alt="" />
						<div className="txt">
							<div className="eb">{t('Was das baut', 'What this builds')}</div>
							<p className="cap" id="nr-cap">
								{s.caps[capKey]}
							</p>
						</div>
					</div>

					<div className="strip">
						<div>
							<span className="k">€15</span>
							<p>
								{t(
									'Rund tausend erkannte und GoBD-konform archivierte Belege.',
									'Roughly a thousand documents read and archived GoBD-compliant.'
								)}
							</p>
						</div>
						<div>
							<span className="k">€50</span>
							<p>
								{t(
									'Ein halber Entwicklungstag an der UStVA- und EÜR-Engine.',
									'Half a development day on the UStVA and EÜR engine.'
								)}
							</p>
						</div>
						<div>
							<span className="k">€900</span>
							<p>
								{t(
									'Eine Runde Zertifizierung der ELSTER-Abgabewege.',
									'One round of certification on the ELSTER filing rails.'
								)}
							</p>
						</div>
					</div>
					<p className="fine">
						{t(
							'Einmal im Monat eine kurze Notiz per E-Mail: was reingekommen ist, was damit gebaut wurde. Die Beträge sind interne Schätzwerte, keine geprüften Kosten.',
							'Once a month a short note by email: what came in and what it built. The figures are internal estimates, not audited costs.'
						)}
					</p>
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
									<ImageSlot src={c.img} placeholder={c.ph} />
								</div>
								<Link className="meta" href={`/merch/${c.id}`}>
									<div className="n">{t(c.de, c.en)}</div>
									<div className="sub">{t(c.subDe, c.subEn)}</div>
									<div className="pr">{c.price}</div>
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
								<Novi pose="relieved" data-novi="relieved" alt="" />
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

			<OverlayCard
				open={ovState !== null}
				onClose={() => setOvState(null)}
				title={s.donT}
				body={ovBody}
				note={s.donN}
				closeLabel={s.close}
			/>

			<BasketBar />
		</div>
	);
}
