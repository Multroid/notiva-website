'use client';

/* Notiva shared modal: waitlist + investor deck request.
   Descended from assets/notiva-modal.js — the T table, markup, mode-switch link,
   Escape-to-close, scrim-click-to-close and focus-on-open (180 ms) are unchanged
   from that port. The CSS lives in src/styles/notiva/modal.css.

   What changed since the port: submitting now actually posts. The original
   onSubmit validated the fields and flipped straight to the success state
   without a network call, so every signup and deck request was discarded while
   the visitor was told they were on the list.

   The waitlist is double opt-in, so "submitted" and "on the list" are two
   different states: POST /api/waitlist only sends a confirmation mail, and
   GET /api/waitlist/confirm redirects back here with ?nv=<result>, which this
   provider picks up and renders. */

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useLang } from './lang-context';
import { CONFIRM_RESULT_PARAM, type ConfirmResult } from '@/lib/leads/constants';

export type NotivaModalMode = 'waitlist' | 'deck';

interface ModalStrings {
	wTitle: string;
	wCopy: string;
	wBtn: string;
	wSmall: string;
	wConsent: string;
	wDoneT: string;
	wDoneC: string;
	wOkT: string;
	wOkC: string;
	wAlreadyT: string;
	wAlreadyC: string;
	wExpiredT: string;
	wExpiredC: string;
	wBadT: string;
	wBadC: string;
	dTitle: string;
	dCopy: string;
	dBtn: string;
	dSmall: string;
	dDoneT: string;
	dDoneC: string;
	lName: string;
	phName: string;
	lCompany: string;
	phCompany: string;
	lMail: string;
	phMail: string;
	errMail: string;
	errAll: string;
	errConsent: string;
	errNet: string;
	errRate: string;
	errServer: string;
	sending: string;
	toDeck: string;
	toWait: string;
	close: string;
}

const T: Record<'de' | 'en', ModalStrings> = {
	de: {
		wTitle: 'Auf die Notiva Warteliste',
		wCopy: 'Nur wichtige Updates auf dem Weg zum Start. Kein Spam, jederzeit abbestellbar.',
		wBtn: 'Eintragen',
		wSmall: 'Deutsch und Englisch zum Start. Abmeldung mit einem Klick.',
		/* New tab: this link lives inside the open dialog, so navigating in place
		   would discard whatever has already been typed. */
		wConsent:
			'Ja, schickt mir Updates zum Start von Notiva. Ich kann mich jederzeit abmelden. Mehr in der <a href="/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a>.',
		wDoneT: 'Schau in dein Postfach.',
		wDoneC: 'Wir haben dir eine E-Mail geschickt. Bestätige den Link darin, dann bist du auf der Liste.',
		wOkT: 'Du bist auf der Liste.',
		wOkC: 'Bestätigt. Wir melden uns, sobald dein früher Zugang bereit ist.',
		wAlreadyT: 'Schon bestätigt.',
		wAlreadyC: 'Diese Adresse steht bereits auf der Liste. Du musst nichts weiter tun.',
		wExpiredT: 'Der Link ist abgelaufen.',
		wExpiredC: 'Bestätigungslinks gelten 14 Tage. Trag deine E-Mail einfach noch einmal ein.',
		wBadT: 'Der Link funktioniert nicht.',
		wBadC: 'Wir konnten diesen Bestätigungslink nicht zuordnen. Trag deine E-Mail noch einmal ein.',
		dTitle: 'Investoren-Deck anfragen',
		dCopy: 'Deck und Finanzplan gehen nach einer kurzen Anfrage heraus. Wir antworten in der Regel innerhalb von zwei Werktagen.',
		dBtn: 'Deck anfragen',
		dSmall: 'Wir teilen das Deck vertraulich. Direkt: hikmat.imanov@notiva.de',
		dDoneT: 'Anfrage ist da.',
		dDoneC: 'Wir antworten innerhalb von zwei Werktagen mit Deck und einem Terminvorschlag.',
		lName: 'Vollständiger Name',
		phName: 'Alex Weber',
		lCompany: 'Fonds oder Firma',
		phCompany: 'Beispiel Ventures',
		lMail: 'E-Mail',
		phMail: 'name@beispiel.de',
		errMail: 'Bitte gib eine gültige E-Mail-Adresse ein.',
		errAll: 'Bitte Name, Firma und eine gültige E-Mail-Adresse angeben.',
		errConsent: 'Bitte bestätige, dass wir dir schreiben dürfen.',
		errNet: 'Keine Verbindung. Prüf dein Netz und versuch es noch einmal.',
		errRate: 'Zu viele Versuche. Bitte versuch es in einer Stunde noch einmal.',
		errServer: 'Da ist bei uns etwas schiefgelaufen. Bitte versuch es später noch einmal.',
		sending: 'Wird gesendet …',
		toDeck: 'Investor oder Unterstützer? <b>Deck anfragen →</b>',
		toWait: 'Kein Investor? <b>Auf die Warteliste →</b>',
		close: 'Schließen',
	},
	en: {
		wTitle: 'Join the Notiva waitlist',
		wCopy: 'Only the updates that matter on the way to launch. No spam, unsubscribe anytime.',
		wBtn: 'Join waitlist',
		wSmall: 'German and English at launch. Unsubscribe in one click.',
		wConsent:
			'Yes, send me updates about the Notiva launch. I can unsubscribe at any time. More in the <a href="/datenschutz" target="_blank" rel="noopener noreferrer">privacy policy</a>.',
		wDoneT: 'Check your inbox.',
		wDoneC: 'We sent you an email. Confirm the link inside and you are on the list.',
		wOkT: 'You are on the list.',
		wOkC: 'Confirmed. We will write to you when your early access is ready.',
		wAlreadyT: 'Already confirmed.',
		wAlreadyC: 'This address is already on the list. There is nothing more to do.',
		wExpiredT: 'That link has expired.',
		wExpiredC: 'Confirmation links last 14 days. Just enter your email once more.',
		wBadT: 'That link does not work.',
		wBadC: 'We could not match this confirmation link. Please enter your email again.',
		dTitle: 'Request the investor deck',
		dCopy: 'The deck and financial plan go out after a short request. We normally reply within two working days.',
		dBtn: 'Request the deck',
		dSmall: 'We share the deck in confidence. Direct: hikmat.imanov@notiva.de',
		dDoneT: 'Request received.',
		dDoneC: 'We will reply within two working days with the deck and a proposed time.',
		lName: 'Full name',
		phName: 'Alex Weber',
		lCompany: 'Fund or company',
		phCompany: 'Example Ventures',
		lMail: 'Email',
		phMail: 'name@example.com',
		errMail: 'Please enter a valid email address.',
		errAll: 'Please enter a name, a company and a valid email address.',
		errConsent: 'Please confirm that we may write to you.',
		errNet: 'No connection. Check your network and try again.',
		errRate: 'Too many attempts. Please try again in an hour.',
		errServer: 'Something went wrong on our side. Please try again later.',
		sending: 'Sending …',
		toDeck: 'Investor or supporter? <b>Request the deck →</b>',
		toWait: 'Not an investor? <b>Join the waitlist →</b>',
		close: 'Close',
	},
};

const MAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* 'form' while editing, 'sent' once the POST succeeded, or one of the outcomes
   the confirmation link redirects back with. */
type View = 'form' | 'sent' | ConfirmResult;

export interface NotivaModalContextValue {
	open(mode: NotivaModalMode): void;
	close(): void;
}

const ModalContext = createContext<NotivaModalContextValue>({
	open: () => {},
	close: () => {},
});

export function NotivaModalProvider({
	children,
}: {
	children: React.ReactNode;
}): React.JSX.Element {
	const { lang } = useLang();
	const [isOpen, setIsOpen] = useState(false);
	const [mode, setMode] = useState<NotivaModalMode>('waitlist');
	const [view, setView] = useState<View>('form');
	const [pending, setPending] = useState(false);
	const [err, setErr] = useState<string | null>(null);
	const [name, setName] = useState('');
	const [company, setCompany] = useState('');
	const [mail, setMail] = useState('');
	const [consent, setConsent] = useState(false);
	/* Hidden field; anything but "" means a bot filled the form in. */
	const [hp, setHp] = useState('');

	const nameRef = useRef<HTMLInputElement>(null);
	const mailRef = useRef<HTMLInputElement>(null);
	const focusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const viewRef = useRef<View>('form');

	const t = T[lang];
	const deck = mode === 'deck';
	const done = view !== 'form';

	const close = useCallback(() => {
		setIsOpen(false);
	}, []);

	const reset = useCallback(() => {
		viewRef.current = 'form';
		setView('form');
		setErr(null);
		setPending(false);
		setMail('');
		setName('');
		setCompany('');
		setConsent(false);
		setHp('');
	}, []);

	const open = useCallback(
		(m: NotivaModalMode) => {
			if (m === 'deck' || m === 'waitlist') setMode(m);
			/* the source clears the success state and the fields on re-open */
			if (viewRef.current !== 'form') reset();
			setIsOpen(true);
			if (focusTimer.current) clearTimeout(focusTimer.current);
			focusTimer.current = setTimeout(() => {
				focusTimer.current = null;
				const el = m === 'deck' ? nameRef.current : mailRef.current;
				if (el) el.focus();
			}, 180);
		},
		[reset]
	);

	/* Escape closes — the source registers this once, unconditionally. */
	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') close();
		}
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [close]);

	useEffect(() => {
		return () => {
			if (focusTimer.current) clearTimeout(focusTimer.current);
		};
	}, []);

	/* The confirmation link lands on / with ?nv=<result>. Read from
	   window.location rather than useSearchParams(): this provider wraps every
	   page in the (notiva) group and they all prerender, and the hook would drag
	   a Suspense requirement into all of them for one query flag.

	   The flag is then stripped with replaceState so a refresh or a shared URL
	   does not reopen the dialog. */
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const raw = params.get(CONFIRM_RESULT_PARAM);
		if (!raw) return;

		const valid: ConfirmResult[] = ['confirmed', 'already', 'expired', 'invalid'];
		if (!valid.includes(raw as ConfirmResult)) return;
		const result = raw as ConfirmResult;

		params.delete(CONFIRM_RESULT_PARAM);
		const qs = params.toString();
		window.history.replaceState(
			null,
			'',
			window.location.pathname + (qs ? `?${qs}` : '') + window.location.hash
		);

		/* Always the waitlist copy: only the waitlist has a confirmation step. */
		setMode('waitlist');
		viewRef.current = result;
		setView(result);
		setIsOpen(true);
	}, []);

	const onSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (pending) return;

			const m = mail.trim();
			const n = name.trim();
			const c = company.trim();

			if (!MAIL_RE.test(m) || (deck && (!n || !c))) {
				setErr(deck ? t.errAll : t.errMail);
				return;
			}
			/* Consent is what makes the later launch email lawful, so it gates the
			   request here as well as being re-checked server-side. */
			if (!deck && !consent) {
				setErr(t.errConsent);
				return;
			}

			setErr(null);
			setPending(true);

			/* Which page the visitor converted on, for attribution. */
			const source = window.location.pathname.replace(/\/$/, '') || '/';

			try {
				const res = await fetch(deck ? '/api/investor-deck' : '/api/waitlist', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(
						deck
							? { name: n, company: c, email: m, lang, source, hp }
							: {
									email: m,
									lang,
									source,
									consent: true,
									consentText: t.wConsent.replace(/<[^>]+>/g, ''),
									hp,
								}
					),
				});

				if (res.ok) {
					viewRef.current = 'sent';
					setView('sent');
					return;
				}

				const body = await res.json().catch(() => null);
				const code = body?.error?.code;
				if (res.status === 429 || code === 'rate_limited') setErr(t.errRate);
				else if (code === 'invalid') setErr(deck ? t.errAll : t.errMail);
				else setErr(t.errServer);
			} catch {
				setErr(t.errNet);
			} finally {
				setPending(false);
			}
		},
		[mail, name, company, consent, hp, deck, lang, pending, t]
	);

	const value = useMemo<NotivaModalContextValue>(() => ({ open, close }), [open, close]);

	/* Heading and body for whichever of the seven states is showing. */
	const heading = (() => {
		switch (view) {
			case 'form':
				return deck ? t.dTitle : t.wTitle;
			case 'sent':
				return deck ? t.dDoneT : t.wDoneT;
			case 'confirmed':
				return t.wOkT;
			case 'already':
				return t.wAlreadyT;
			case 'expired':
				return t.wExpiredT;
			case 'invalid':
				return t.wBadT;
		}
	})();

	const copy = (() => {
		switch (view) {
			case 'form':
				return deck ? t.dCopy : t.wCopy;
			case 'sent':
				return deck ? t.dDoneC : t.wDoneC;
			case 'confirmed':
				return t.wOkC;
			case 'already':
				return t.wAlreadyC;
			case 'expired':
				return t.wExpiredC;
			case 'invalid':
				return t.wBadC;
		}
	})();

	/* An expired or unmatched link should hand back the form, not a dead end. */
	const retryable = view === 'expired' || view === 'invalid';

	return (
		<ModalContext.Provider value={value}>
			{children}
			<div className="notiva-shell">
				<div
					className="nm-scrim"
					data-open={isOpen ? '' : undefined}
					onClick={(e) => {
						if (e.target === e.currentTarget) close();
					}}
				>
					<div className="nm-modal" role="dialog" aria-modal="true" aria-labelledby="nm-title">
						<button className="nm-close" type="button" aria-label={t.close} onClick={close}>
							<svg viewBox="0 0 24 24">
								<path d="M6 6l12 12M18 6L6 18" />
							</svg>
						</button>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							className="nm-mark"
							src="/notiva/notiva-logo-chip.svg"
							alt=""
							width={56}
							height={56}
						/>
						<h2 id="nm-title">{heading}</h2>
						<p className="nm-copy">{copy}</p>
						<form onSubmit={onSubmit} noValidate hidden={done}>
							<div className="nm-rows">
								<div className="nm-row" hidden={!deck}>
									<label htmlFor="nm-name">{t.lName}</label>
									<input
										id="nm-name"
										type="text"
										autoComplete="name"
										ref={nameRef}
										placeholder={t.phName}
										value={name}
										disabled={pending}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className="nm-row" hidden={!deck}>
									<label htmlFor="nm-company">{t.lCompany}</label>
									<input
										id="nm-company"
										type="text"
										autoComplete="organization"
										placeholder={t.phCompany}
										value={company}
										disabled={pending}
										onChange={(e) => setCompany(e.target.value)}
									/>
								</div>
								<div className="nm-row">
									<label htmlFor="nm-mail">{t.lMail}</label>
									<input
										id="nm-mail"
										type="email"
										autoComplete="email"
										ref={mailRef}
										placeholder={t.phMail}
										value={mail}
										disabled={pending}
										onChange={(e) => setMail(e.target.value)}
									/>
								</div>
							</div>

							{/* Honeypot. Positioned off-screen rather than display:none,
							    because the crawlers worth catching skip hidden fields but
							    do fill in anything laid out. */}
							<div className="nm-hp" aria-hidden="true">
								<label htmlFor="nm-website">Website</label>
								<input
									id="nm-website"
									name="website"
									type="text"
									tabIndex={-1}
									autoComplete="off"
									value={hp}
									onChange={(e) => setHp(e.target.value)}
								/>
							</div>

							{/* Opt-in, waitlist only: the deck request is correspondence the
							    visitor asked for, not marketing mail. */}
							<label className="nm-consent" hidden={deck}>
								<input
									type="checkbox"
									checked={consent}
									disabled={pending}
									onChange={(e) => setConsent(e.target.checked)}
								/>
								<span dangerouslySetInnerHTML={{ __html: t.wConsent }} />
							</label>

							<button className="nm-submit" type="submit" disabled={pending}>
								{pending ? t.sending : deck ? t.dBtn : t.wBtn}
							</button>
							<p className="nm-err" hidden={!err} role="alert">
								{err}
							</p>
						</form>
						{retryable ? (
							<button className="nm-submit" type="button" onClick={reset}>
								{t.wBtn}
							</button>
						) : null}
						<p className="nm-small" hidden={done}>
							{deck ? t.dSmall : t.wSmall}
						</p>
						<div className="nm-switch" hidden={done}>
							<button
								type="button"
								onClick={() => open(deck ? 'waitlist' : 'deck')}
								dangerouslySetInnerHTML={{ __html: deck ? t.toWait : t.toDeck }}
							/>
						</div>
					</div>
				</div>
			</div>
		</ModalContext.Provider>
	);
}

export function useNotivaModal(): NotivaModalContextValue {
	return useContext(ModalContext);
}
