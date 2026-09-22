'use server';

/* Donations: one-off payments and monthly supporter subscriptions.
 *
 * Both end in the same place — a client secret the Payment Element confirms in
 * the browser — but they are built differently:
 *
 *   once   a PaymentIntent for the amount.
 *   month  a Customer, then a Subscription with `payment_behavior:
 *          'default_incomplete'`, whose first invoice carries the secret.
 *
 * The monthly amounts are priced inline against one configured Product rather
 * than against three fixed Prices, because the design lets someone type their
 * own monthly figure — €5/€15/€50 are presets in the UI, not the only options.
 *
 * This is a server action, so it is a public endpoint: the amount is re-checked
 * here and the charge is built from the checked value. Nothing the browser
 * sends is trusted to be a number, an email, or in range.
 *
 * NOT TAX-DEDUCTIBLE, AND NOT A CHARITY. Notiva is for-profit, and not yet a
 * founded company (founding is planned); the page says it is no charity and no
 * receipt is issued. Whether perks (the supporter wall,
 * the tier benefits) turn a donation into a taxable supply is a question for
 * the Steuerberater, not something this file decides. */

import {
	MAX_DONATION_EUR,
	MIN_DONATION_EUR,
	getStripe,
	stripeConfig,
	toCents,
} from './client';

export type DonationMode = 'once' | 'month';

export interface DonationRequest {
	amountEur: number;
	email: string;
	mode: DonationMode;
	lang: 'de' | 'en';
}

export type DonationResult =
	| { ok: true; clientSecret: string; publishableKey: string }
	| {
			ok: false;
			reason: 'unconfigured' | 'invalid-amount' | 'invalid-email' | 'failed';
	  };

/* Deliberately the same rule as the client-side check in the support page, so
   the two cannot disagree about what counts as an address. */
const MAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function startDonation(
	request: DonationRequest
): Promise<DonationResult> {
	const config = stripeConfig();
	if (!config) return { ok: false, reason: 'unconfigured' };

	const amountEur = Number(request?.amountEur);
	if (
		!Number.isFinite(amountEur) ||
		amountEur < MIN_DONATION_EUR ||
		amountEur > MAX_DONATION_EUR
	) {
		return { ok: false, reason: 'invalid-amount' };
	}

	const email = String(request?.email ?? '').trim();
	if (!MAIL_RE.test(email)) return { ok: false, reason: 'invalid-email' };

	const mode: DonationMode = request?.mode === 'month' ? 'month' : 'once';
	const lang = request?.lang === 'en' ? 'en' : 'de';
	const unitAmount = toCents(amountEur);

	/* Carried onto every object so a payout line can be traced back to the page
	   that produced it without joining against anything. */
	const metadata = {
		notiva_kind: 'donation',
		notiva_mode: mode,
		notiva_lang: lang,
	};

	const stripe = getStripe(config);

	try {
		if (mode === 'once') {
			const intent = await stripe.paymentIntents.create({
				amount: unitAmount,
				currency: 'eur',
				receipt_email: email,
				/* Lets the dashboard decide which methods appear — card, SEPA,
				   Apple/Google Pay — instead of hardcoding a list here that would
				   drift from the account settings. */
				automatic_payment_methods: { enabled: true },
				description:
					lang === 'de' ? 'Notiva · Einmalige Spende' : 'Notiva · One-off donation',
				metadata,
			});
			if (!intent.client_secret) throw new Error('PaymentIntent has no client_secret');
			return {
				ok: true,
				clientSecret: intent.client_secret,
				publishableKey: config.publishableKey,
			};
		}

		/* ── monthly ── */
		if (!config.donationProductId) {
			/* A subscription price must belong to a Product, and inventing one per
			   donation would litter the account. Without it configured the monthly
			   path is simply not open. */
			return { ok: false, reason: 'unconfigured' };
		}

		/* Reuse the customer if this address has given before, so a supporter does
		   not accumulate one Customer per donation. */
		const existing = await stripe.customers.list({ email, limit: 1 });
		const customer =
			existing.data[0] ??
			(await stripe.customers.create({ email, metadata }));

		const subscription = await stripe.subscriptions.create({
			customer: customer.id,
			items: [
				{
					price_data: {
						currency: 'eur',
						product: config.donationProductId,
						recurring: { interval: 'month' },
						unit_amount: unitAmount,
					},
				},
			],
			payment_behavior: 'default_incomplete',
			payment_settings: { save_default_payment_method: 'on_subscription' },
			/* In the pinned API version the first invoice exposes the secret as
			   `confirmation_secret`; `invoice.payment_intent` no longer exists. */
			expand: ['latest_invoice.confirmation_secret'],
			metadata,
		});

		const invoice = subscription.latest_invoice;
		const clientSecret =
			invoice && typeof invoice !== 'string'
				? invoice.confirmation_secret?.client_secret
				: undefined;

		if (!clientSecret) throw new Error('Subscription invoice has no confirmation_secret');
		return { ok: true, clientSecret, publishableKey: config.publishableKey };
	} catch (error) {
		/* Stripe errors can quote the request, which includes the email. Log it
		   server-side, tell the browser nothing beyond "failed". */
		console.error('[stripe] donation setup failed', error);
		return { ok: false, reason: 'failed' };
	}
}
