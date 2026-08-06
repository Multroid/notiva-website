/**
 * POST /api/investor-deck — deck requests from /for-investors.
 *
 * The deck is NOT attached or linked here by design: it goes out by hand after
 * review, which is what the page copy promises ("we share the deck in
 * confidence", "reply within two working days") and what lets a pre-seed founder
 * qualify each investor. This endpoint records the lead, acknowledges the
 * requester so the two-day expectation is set immediately, and pings the founder.
 *
 * No double opt-in: this is correspondence the requester initiated, so it rests
 * on DSGVO Art. 6(1)(b), not on marketing consent.
 */
import { NextResponse } from 'next/server';

import { isDbConfigured, sql } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import { FOUNDER_EMAIL, investorAckEmail, investorNotifyEmail } from '@/lib/leads/emails';
import { clientIp, isFlooding, leadError, userAgent } from '@/lib/leads/request';
import { investorInput } from '@/lib/leads/schema';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
	if (!isDbConfigured()) {
		console.error('[investor-deck] DATABASE_URL missing — refusing to drop a lead silently');
		return leadError('not_configured', 503);
	}

	let payload: unknown;
	try {
		payload = await req.json();
	} catch {
		return leadError('invalid', 400);
	}

	const parsed = investorInput.safeParse(payload);
	if (!parsed.success) {
		const tripped = parsed.error.issues.some((i) => i.message === 'honeypot');
		if (tripped) return NextResponse.json({ ok: true });
		return leadError('invalid', 400);
	}

	const { name, company, email, message, lang, source } = parsed.data;
	const ip = clientIp(req);

	/* Tighter than the waitlist: a genuine investor submits once. */
	if (await isFlooding('investor_lead', ip, { max: 3, windowMinutes: 60 })) {
		return leadError('rate_limited', 429);
	}

	try {
		/* No unique constraint on email here — the same fund legitimately requests
		   twice (different partner, or a follow-up months later), and each request
		   is its own event worth keeping. */
		await sql`
			insert into public.investor_lead
				(name, company, email, message, lang, source, ip, user_agent)
			values
				(${name}, ${company}, ${email}, ${message ?? null}, ${lang}, ${source},
				 ${ip}::inet, ${userAgent(req)})`;
	} catch (error) {
		console.error('[investor-deck] insert failed:', error);
		return leadError('server_error', 500);
	}

	/* The lead is safely stored, so mail failures must not turn into an error the
	   investor sees — the founder can still act on the row. Await both so the
	   serverless instance is not frozen mid-flight, but report success either way. */
	const ack = investorAckEmail(lang, name);
	const [ackResult, notifyResult] = await Promise.all([
		sendEmail({
			to: email,
			...ack,
			/* Replies must reach a human, not the no-reply mailbox the default
			   SYSTEM_FROM_EMAIL points at. */
			replyTo: FOUNDER_EMAIL,
		}),
		sendEmail({
			to: FOUNDER_EMAIL,
			...investorNotifyEmail({ name, company, email, message, lang, source }),
			replyTo: email,
		}),
	]);

	if (!ackResult.success) console.error('[investor-deck] ack email failed:', ackResult.error);
	if (!notifyResult.success)
		console.error('[investor-deck] founder notification failed:', notifyResult.error);

	return NextResponse.json({ ok: true });
}
