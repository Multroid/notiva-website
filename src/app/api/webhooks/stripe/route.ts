/* Stripe webhook — the only trustworthy record that money moved.
 *
 * The browser is told a donation succeeded by confirmPayment(), but that is a
 * client-side claim: the tab can be closed mid-redirect, a SEPA debit settles
 * days later, and a subscription renews with nobody watching. Anything that
 * must be true because a payment happened — a confirmation mail, the supporter
 * wall, the funding total — belongs here, not on the support page.
 *
 * Signature verification is not optional. This endpoint is public, and without
 * it anyone could POST a "payment succeeded" body. */

import { NextResponse } from 'next/server';
import type Stripe from 'stripe';

import { getStripe, stripeConfig } from '@/lib/stripe/client';

/* Verification hashes the exact bytes Stripe sent, so the body must be read raw
   — any JSON round-trip changes it and every signature fails. */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request): Promise<NextResponse> {
	const config = stripeConfig();
	const secret = process.env.STRIPE_WEBHOOK_SECRET;
	if (!config || !secret) {
		/* Not configured is not a Stripe failure — 503 so deliveries retry once
		   the keys land rather than being dropped as permanently rejected. */
		return NextResponse.json({ error: 'stripe not configured' }, { status: 503 });
	}

	const signature = request.headers.get('stripe-signature');
	if (!signature) {
		return NextResponse.json({ error: 'missing signature' }, { status: 400 });
	}

	const payload = await request.text();
	const stripe = getStripe(config);

	let event: Stripe.Event;
	try {
		event = await stripe.webhooks.constructEventAsync(payload, signature, secret);
	} catch (error) {
		console.error('[stripe] webhook signature verification failed', error);
		return NextResponse.json({ error: 'invalid signature' }, { status: 400 });
	}

	/* Only donation objects are ours. Everything else on the account — the
	   consumer app's subscription billing included — is someone else's event and
	   is acknowledged without being acted on. */
	try {
		switch (event.type) {
			case 'payment_intent.succeeded': {
				const intent = event.data.object;
				if (intent.metadata?.notiva_kind !== 'donation') break;
				console.info(
					'[stripe] donation received',
					intent.id,
					intent.amount,
					intent.currency,
					intent.metadata.notiva_mode
				);
				/* TODO: confirmation mail via src/lib/email.ts, and the supporter
				   wall / funding total on /support once those stop being
				   placeholders. */
				break;
			}

			case 'invoice.paid': {
				/* Monthly supporters: fires on the first charge and every renewal. */
				const invoice = event.data.object;
				console.info(
					'[stripe] supporter invoice paid',
					invoice.id,
					invoice.amount_paid,
					invoice.currency
				);
				break;
			}

			case 'invoice.payment_failed': {
				const invoice = event.data.object;
				console.warn('[stripe] supporter invoice failed', invoice.id);
				break;
			}

			case 'customer.subscription.deleted': {
				const subscription = event.data.object;
				if (subscription.metadata?.notiva_kind !== 'donation') break;
				console.info('[stripe] supporter cancelled', subscription.id);
				break;
			}

			default:
				break;
		}
	} catch (error) {
		/* A 500 makes Stripe retry. That is right for a transient failure and
		   wrong for a bug, so the event is logged with its id either way. */
		console.error('[stripe] webhook handler failed', event.id, event.type, error);
		return NextResponse.json({ error: 'handler failed' }, { status: 500 });
	}

	return NextResponse.json({ received: true });
}
