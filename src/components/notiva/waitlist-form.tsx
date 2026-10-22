'use client';

/* Inline waitlist signup for event pages (/rwu, reached by QR code).

   Same flow as the waitlist modal, just not behind a button: the strings,
   the consent wording recorded server-side, the email check, the honeypot and
   the POST /api/waitlist payload all come from or match modal-context.tsx.
   Double opt-in is unchanged — this only sends the confirmation mail, and the
   link in it lands on / like every other signup.

   `source` is the pathname, as in the modal, so these signups arrive tagged
   with the event page and get the event rate limit (lib/leads/constants.ts).

   Styling reuses the modal's .nm-* field rules from modal.css; the card around
   them is the page's own. */

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';

import { useLang } from './lang-context';
import { MAIL_RE, MODAL_STRINGS } from './modal-context';
import { Novi } from './novi';

const EXTRA = {
	de: {
		spam: 'Keine Mail da? Schau auch im Spam-Ordner nach.',
		another: 'Weitere E-Mail eintragen',
	},
	en: {
		spam: 'No email yet? Check your spam folder too.',
		another: 'Add another email',
	},
} as const;

export function WaitlistForm(): React.JSX.Element {
	const { lang } = useLang();
	const t = MODAL_STRINGS[lang];
	const x = EXTRA[lang];
	const id = useId();

	const [sent, setSent] = useState(false);
	const [pending, setPending] = useState(false);
	const [err, setErr] = useState<string | null>(null);
	const [mail, setMail] = useState('');
	const [consent, setConsent] = useState(false);
	/* Hidden field; anything but "" means a bot filled the form in. */
	const [hp, setHp] = useState('');

	const mailRef = useRef<HTMLInputElement>(null);
	const headRef = useRef<HTMLHeadingElement>(null);
	/* Focus follows the state that just replaced the element under the
	   visitor's finger. Only on a change — never on load, which would pop the
	   phone keyboard over the page (and Strict Mode re-runs mount effects). */
	const prevSent = useRef(sent);

	useEffect(() => {
		if (prevSent.current === sent) return;
		prevSent.current = sent;
		(sent ? headRef.current : mailRef.current)?.focus();
	}, [sent]);

	/* Back to an empty form — for a friend's phone or a device left at the booth. */
	const another = useCallback(() => {
		setSent(false);
		setErr(null);
		setMail('');
		setConsent(false);
		setHp('');
	}, []);

	const onSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (pending) return;

			const m = mail.trim();
			if (!MAIL_RE.test(m)) {
				setErr(t.errMail);
				mailRef.current?.focus();
				return;
			}
			if (!consent) {
				setErr(t.errConsent);
				return;
			}

			setErr(null);
			setPending(true);
			const source = window.location.pathname.replace(/\/$/, '') || '/';

			try {
				const res = await fetch('/api/waitlist', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email: m,
						lang,
						source,
						consent: true,
						consentText: t.wConsent.replace(/<[^>]+>/g, ''),
						hp,
					}),
				});

				if (res.ok) {
					setSent(true);
					return;
				}

				const body = await res.json().catch(() => null);
				const code = body?.error?.code;
				if (res.status === 429 || code === 'rate_limited') setErr(t.errRate);
				else if (code === 'invalid') setErr(t.errMail);
				else setErr(t.errServer);
			} catch {
				setErr(t.errNet);
			} finally {
				setPending(false);
			}
		},
		[mail, consent, hp, lang, pending, t]
	);

	return (
		<div className="wl-card" data-sent={sent ? '' : undefined}>
			<Novi className="wl-novi" pose={sent ? 'relieved' : 'wave'} loading="eager" />
			<div aria-live="polite">
				<h2 className="wl-title" ref={headRef} tabIndex={-1}>
					{sent ? t.wDoneT : t.wTitle}
				</h2>
				<p className="wl-copy">{sent ? t.wDoneC : t.wCopy}</p>
			</div>

			{sent ? (
				<>
					<p className="nm-small">{x.spam}</p>
					<button className="wl-again" type="button" onClick={another}>
						{x.another}
					</button>
				</>
			) : (
				<form onSubmit={onSubmit} noValidate>
					<div className="nm-rows">
						<div className="nm-row">
							<label htmlFor={`${id}-mail`}>{t.lMail}</label>
							<input
								id={`${id}-mail`}
								type="email"
								inputMode="email"
								autoComplete="email"
								autoCapitalize="none"
								spellCheck={false}
								enterKeyHint="send"
								ref={mailRef}
								placeholder={t.phMail}
								value={mail}
								disabled={pending}
								aria-invalid={err === t.errMail || undefined}
								onChange={(e) => setMail(e.target.value)}
							/>
						</div>
					</div>

					{/* Honeypot, off-screen rather than display:none — see modal-context. */}
					<div className="nm-hp" aria-hidden="true">
						<label htmlFor={`${id}-website`}>Website</label>
						<input
							id={`${id}-website`}
							name="website"
							type="text"
							tabIndex={-1}
							autoComplete="off"
							value={hp}
							onChange={(e) => setHp(e.target.value)}
						/>
					</div>

					<label className="nm-consent">
						<input
							type="checkbox"
							checked={consent}
							disabled={pending}
							onChange={(e) => setConsent(e.target.checked)}
						/>
						<span dangerouslySetInnerHTML={{ __html: t.wConsent }} />
					</label>

					<button className="nm-submit" type="submit" disabled={pending}>
						{pending ? t.sending : t.wBtn}
					</button>
					<p className="nm-err" hidden={!err} role="alert">
						{err}
					</p>
					<p className="nm-small">{t.wSmall}</p>
				</form>
			)}
		</div>
	);
}
