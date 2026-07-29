'use client';

/* The payment step of the donate section.
 *
 * It reuses the design's own .ov / .ovcard dialog (page.css lines 39–45) rather
 * than introducing a second dialog language — the thank-you card, the basket
 * card and this one are the same object with different contents. The Novi
 * portrait the other two carry is deliberately absent: at the moment someone is
 * entering card details, a mascot is noise.
 *
 * Stripe's Payment Element is an iframe, so it cannot inherit the page's CSS.
 * The appearance object below re-states the tokens from tokens.css by hand;
 * when a colour changes there, it has to change here too. That duplication is
 * the price of PCI scope staying on Stripe's side, and it is worth paying. */

import React, { useMemo, useState } from 'react';
import { loadStripe, type Stripe } from '@stripe/stripe-js';
import {
	Elements,
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';

import type { Lang } from './lang-context';
import type { DonationMode } from '@/lib/stripe/donation-action';

/* loadStripe fetches Stripe.js. Keyed by publishable key and resolved once per
   key, so reopening the dialog does not refetch the script. */
const stripeCache = new Map<string, Promise<Stripe | null>>();
function stripeFor(publishableKey: string): Promise<Stripe | null> {
	let promise = stripeCache.get(publishableKey);
	if (!promise) {
		promise = loadStripe(publishableKey);
		stripeCache.set(publishableKey, promise);
	}
	return promise;
}

const T = {
	de: {
		titleOnce: (a: string) => `Einmalig €${a}`,
		titleMonth: (a: string) => `€${a} monatlich`,
		subOnce: 'Zahlung abschließen. Danach bekommst du eine Bestätigung per E-Mail.',
		subMonth:
			'Abo abschließen. Jederzeit zum Monatsende kündbar, die Bestätigung kommt per E-Mail.',
		pay: 'Jetzt bezahlen',
		paying: 'Wird verarbeitet …',
		cancel: 'Abbrechen',
		generic: 'Die Zahlung konnte nicht abgeschlossen werden. Bitte versuch es noch einmal.',
		note: 'Eine Spende ist keine Investition und steuerlich nicht abzugsfähig.',
	},
	en: {
		titleOnce: (a: string) => `One-off €${a}`,
		titleMonth: (a: string) => `€${a} per month`,
		subOnce: 'Complete the payment. You will get a confirmation by email.',
		subMonth:
			'Start the subscription. Cancel at the end of any month; the confirmation comes by email.',
		pay: 'Pay now',
		paying: 'Processing …',
		cancel: 'Cancel',
		generic: 'The payment could not be completed. Please try again.',
		note: 'A donation is not an investment and is not tax-deductible.',
	},
} as const;

/** Mirrors tokens.css: --blue-400, --ink, --white, --neutral-700, --radius-2xl
 *  and the Plus Jakarta stack the (notiva) layout loads. */
const APPEARANCE = {
	theme: 'stripe' as const,
	variables: {
		colorPrimary: '#0047BA',
		colorText: '#101113',
		colorTextSecondary: '#777777',
		colorBackground: '#FEFDFD',
		colorDanger: '#C4342B',
		borderRadius: '10px',
		fontSizeBase: '15px',
		fontFamily:
			'var(--font-jakarta), ui-sans-serif, system-ui, -apple-system, sans-serif',
	},
};

export interface DonationIntent {
	clientSecret: string;
	publishableKey: string;
	amountEur: number;
	mode: DonationMode;
}

function PayForm({
	intent,
	lang,
	onCancel,
}: {
	intent: DonationIntent;
	lang: Lang;
	onCancel(): void;
}): React.JSX.Element {
	const stripe = useStripe();
	const elements = useElements();
	const t = T[lang];

	const [busy, setBusy] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function submit(event: React.FormEvent) {
		event.preventDefault();
		if (!stripe || !elements) return;
		setBusy(true);
		setError(null);

		/* confirmPayment redirects for any method that needs it (3-D Secure, SEPA
		   mandates, wallets) and returns here only when it can settle in place or
		   when it fails. Either way the browser never sees card data — it lives in
		   the Element's iframe and goes straight to Stripe. */
		const result = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/support?donation=done`,
			},
			redirect: 'if_required',
		});

		if (result.error) {
			/* card_error and validation_error are written for the customer; anything
			   else is an internal condition and gets the generic line instead. */
			const showable =
				result.error.type === 'card_error' ||
				result.error.type === 'validation_error';
			setError((showable && result.error.message) || t.generic);
			setBusy(false);
			return;
		}

		/* Settled without a redirect. Hand over to the same thank-you path the
		   redirect flow lands on, so there is one success state, not two. */
		window.location.href = '/support?donation=done';
	}

	const amount = String(intent.amountEur);

	return (
		<form onSubmit={submit}>
			<h3 id="ov-t">
				{intent.mode === 'once' ? t.titleOnce(amount) : t.titleMonth(amount)}
			</h3>
			<p>{intent.mode === 'once' ? t.subOnce : t.subMonth}</p>

			<div style={{ margin: '20px 0 0', textAlign: 'left' }}>
				<PaymentElement />
			</div>

			{error ? (
				<p className="err" role="alert" style={{ marginTop: 14 }}>
					{error}
				</p>
			) : null}

			<button className="btn btn-solid" type="submit" disabled={!stripe || busy}>
				{busy ? t.paying : t.pay}
			</button>
			<button
				className="btn btn-ghost"
				type="button"
				onClick={onCancel}
				disabled={busy}
				style={{ marginTop: 10, width: '100%' }}
			>
				{t.cancel}
			</button>

			<p className="ovnote">{t.note}</p>
		</form>
	);
}

export function DonationPayment({
	intent,
	lang,
	onCancel,
}: {
	intent: DonationIntent | null;
	lang: Lang;
	onCancel(): void;
}): React.JSX.Element | null {
	/* Hooks must run unconditionally, so the promise is resolved before the
	   early return below. */
	const stripePromise = useMemo(
		() => (intent ? stripeFor(intent.publishableKey) : null),
		[intent]
	);

	if (!intent || !stripePromise) return null;

	return (
		<div
			className="ov"
			onClick={(e) => {
				if (e.target === e.currentTarget) onCancel();
			}}
		>
			<div className="ovcard" role="dialog" aria-modal="true" aria-labelledby="ov-t">
				<Elements
					stripe={stripePromise}
					options={{ clientSecret: intent.clientSecret, appearance: APPEARANCE }}
				>
					<PayForm intent={intent} lang={lang} onCancel={onCancel} />
				</Elements>
			</div>
		</div>
	);
}
