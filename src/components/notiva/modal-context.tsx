'use client';

/* Notiva shared modal: waitlist + investor deck request.
   Full port of assets/notiva-modal.js — the T table (DE + EN) is verbatim,
   as are the markup, the validation rules, the mode-switch link, the success
   state, Escape-to-close, scrim-click-to-close and focus-on-open (180 ms).
   The CSS string from that file now lives in src/styles/notiva/modal.css. */

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

export type NotivaModalMode = 'waitlist' | 'deck';

interface ModalStrings {
	wTitle: string;
	wCopy: string;
	wBtn: string;
	wSmall: string;
	wDoneT: string;
	wDoneC: string;
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
		wDoneT: 'Du bist auf der Liste.',
		wDoneC: 'Wir melden uns, sobald dein früher Zugang bereit ist.',
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
		toDeck: 'Investor oder Unterstützer? <b>Deck anfragen →</b>',
		toWait: 'Kein Investor? <b>Auf die Warteliste →</b>',
		close: 'Schließen',
	},
	en: {
		wTitle: 'Join the Notiva waitlist',
		wCopy: 'Only the updates that matter on the way to launch. No spam, unsubscribe anytime.',
		wBtn: 'Join waitlist',
		wSmall: 'German and English at launch. Unsubscribe in one click.',
		wDoneT: 'You are on the list.',
		wDoneC: 'We will write to you when your early access is ready.',
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
		toDeck: 'Investor or supporter? <b>Request the deck →</b>',
		toWait: 'Not an investor? <b>Join the waitlist →</b>',
		close: 'Close',
	},
};

const MAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
	const [done, setDone] = useState(false);
	const [err, setErr] = useState<string | null>(null);
	const [name, setName] = useState('');
	const [company, setCompany] = useState('');
	const [mail, setMail] = useState('');

	const nameRef = useRef<HTMLInputElement>(null);
	const mailRef = useRef<HTMLInputElement>(null);
	const focusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const doneRef = useRef(false);

	const t = T[lang];
	const deck = mode === 'deck';

	const close = useCallback(() => {
		setIsOpen(false);
	}, []);

	const open = useCallback((m: NotivaModalMode) => {
		if (m === 'deck' || m === 'waitlist') setMode(m);
		/* the source clears the success state and the fields on re-open */
		if (doneRef.current) {
			doneRef.current = false;
			setDone(false);
			setErr(null);
			setMail('');
			setName('');
			setCompany('');
		}
		setIsOpen(true);
		if (focusTimer.current) clearTimeout(focusTimer.current);
		focusTimer.current = setTimeout(() => {
			focusTimer.current = null;
			const el = m === 'deck' ? nameRef.current : mailRef.current;
			if (el) el.focus();
		}, 180);
	}, []);

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

	const onSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const m = mail.trim();
			const n = name.trim();
			const c = company.trim();
			const okMail = MAIL_RE.test(m);
			if (!okMail || (mode === 'deck' && (!n || !c))) {
				setErr(mode === 'deck' ? t.errAll : t.errMail);
				return;
			}
			setErr(null);
			doneRef.current = true;
			setDone(true);
		},
		[mail, name, company, mode, t]
	);

	const value = useMemo<NotivaModalContextValue>(() => ({ open, close }), [open, close]);

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
						<h2 id="nm-title">
							{done ? (deck ? t.dDoneT : t.wDoneT) : deck ? t.dTitle : t.wTitle}
						</h2>
						<p className="nm-copy">
							{done ? (deck ? t.dDoneC : t.wDoneC) : deck ? t.dCopy : t.wCopy}
						</p>
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
										onChange={(e) => setMail(e.target.value)}
									/>
								</div>
							</div>
							<button className="nm-submit" type="submit">
								{deck ? t.dBtn : t.wBtn}
							</button>
							<p className="nm-err" hidden={!err}>
								{err}
							</p>
						</form>
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
