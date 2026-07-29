/* Stripe — server-side configuration and client.
 *
 * Stripe handles donations only. Merch is Fourthwall's, because Fourthwall is
 * the merchant of record for physical goods and Stripe is not a commerce
 * platform (see src/lib/fourthwall/client.ts). The two never touch.
 *
 * Same shape as the Fourthwall bridge: with no keys configured every entry
 * point returns `null` and the UI says the donations are not open yet, rather
 * than throwing. That is the correct pre-launch state, not an error. */

import Stripe from 'stripe';

export interface StripeConfig {
	secretKey: string;
	publishableKey: string;
	/** Only the monthly tiers need it — one-off donations do not. */
	donationProductId?: string;
}

export function stripeConfig(): StripeConfig | null {
	const secretKey = process.env.STRIPE_SECRET_KEY;
	const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
	if (!secretKey || !publishableKey) return null;
	return {
		secretKey,
		publishableKey,
		donationProductId: process.env.STRIPE_DONATION_PRODUCT_ID,
	};
}

/* One instance per process. Stripe keeps a connection pool, so building a new
   client per request would throw that away on every donation. */
let cached: { key: string; stripe: Stripe } | null = null;

/** No `apiVersion` is passed on purpose: the SDK pins its own
 *  (2026-06-24.dahlia for stripe@22), and hardcoding a different string here
 *  would silently disagree with the types this code is compiled against. In
 *  that version an invoice carries `confirmation_secret`, not `payment_intent`
 *  — which is where the subscription flow below reads its client secret. */
export function getStripe(config: StripeConfig): Stripe {
	if (cached?.key === config.secretKey) return cached.stripe;
	const stripe = new Stripe(config.secretKey, {
		appInfo: { name: 'notiva-website', url: 'https://notiva.de' },
	});
	cached = { key: config.secretKey, stripe };
	return stripe;
}

/* ── donation limits ─────────────────────────────────────────────── */

/** The design's own floor: "Bitte eine Summe ab €1 eintragen." */
export const MIN_DONATION_EUR = 1;

/** Not a business rule — a guard. A four-figure "donation" through a public,
 *  unauthenticated endpoint is far more likely to be a card test or a fat
 *  finger than a supporter, and either is better refused than refunded. */
export const MAX_DONATION_EUR = 5000;

export function toCents(amountEur: number): number {
	return Math.round(amountEur * 100);
}
