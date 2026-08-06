/**
 * POST /api/waitlist — pre-launch waitlist, double opt-in.
 *
 * Nothing here sends marketing email. It records the signup as unconfirmed and
 * sends exactly one confirmation message; GET /api/waitlist/confirm completes it.
 * Double opt-in is not optional for marketing email in Germany (§7 Abs. 2 UWG,
 * and it is what makes the DSGVO Art. 6(1)(a) consent provable), so the flow is
 * built that way rather than bolted on later.
 */
import { randomBytes } from 'node:crypto';
import { NextResponse } from 'next/server';

import { isDbConfigured, sql } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import { waitlistConfirmEmail } from '@/lib/leads/emails';
import { clientIp, isFlooding, leadError, publicOrigin, userAgent } from '@/lib/leads/request';
import { waitlistInput } from '@/lib/leads/schema';

export const runtime = 'nodejs';
/* Never cached, never statically analysed into a build-time fetch. */
export const dynamic = 'force-dynamic';

function confirmUrl(req: Request, token: string): string {
	return `${publicOrigin(req)}/api/waitlist/confirm?token=${encodeURIComponent(token)}`;
}

export async function POST(req: Request) {
	if (!isDbConfigured()) {
		console.error('[waitlist] DATABASE_URL missing — refusing to drop a signup silently');
		return leadError('not_configured', 503);
	}

	let payload: unknown;
	try {
		payload = await req.json();
	} catch {
		return leadError('invalid', 400);
	}

	const parsed = waitlistInput.safeParse(payload);
	/* A tripped honeypot is a bot. Returning 200 keeps it from learning which
	   field gave it away, and nothing is written. */
	if (!parsed.success) {
		const tripped = parsed.error.issues.some((i) => i.message === 'honeypot');
		if (tripped) return NextResponse.json({ ok: true });
		return leadError('invalid', 400);
	}

	const { email, lang, source, consentText } = parsed.data;
	const ip = clientIp(req);

	if (await isFlooding('waitlist_signup', ip, { max: 5, windowMinutes: 60 })) {
		return leadError('rate_limited', 429);
	}

	const token = randomBytes(32).toString('base64url');

	try {
		/* One row per address, so a repeat signup updates rather than duplicates.
		   Whether it restarts the opt-in turns on one question — does this address
		   currently hold a live confirmed consent?

		     unconfirmed        → new token, resend. Covers "I lost the email".
		     confirmed          → touch nothing, send nothing. Stops the endpoint
		                          being used to mailbomb a subscriber.
		     previously left    → new token AND confirmed_at back to null, because
		                          re-subscribing needs fresh consent, not a silent
		                          reinstatement of the old one.

		   RETURNING reports post-update values, so confirmed_at comes back null in
		   exactly the cases that still need an email. */
		const rows = await sql<{ confirmed_at: Date | null; confirm_token: string }[]>`
			insert into public.waitlist_signup
				(email, lang, source, consent_text, consent_at, ip, user_agent,
				 confirm_token, confirm_sent_at)
			values
				(${email}, ${lang}, ${source}, ${consentText ?? null}, now(),
				 ${ip}::inet, ${userAgent(req)}, ${token}, now())
			on conflict (email) do update set
				lang            = excluded.lang,
				source          = excluded.source,
				ip              = excluded.ip,
				user_agent      = excluded.user_agent,
				consent_text    = case when waitlist_signup.confirmed_at is null
				                         or waitlist_signup.unsubscribed_at is not null
				                       then excluded.consent_text
				                       else waitlist_signup.consent_text end,
				consent_at      = case when waitlist_signup.confirmed_at is null
				                         or waitlist_signup.unsubscribed_at is not null
				                       then excluded.consent_at
				                       else waitlist_signup.consent_at end,
				confirm_token   = case when waitlist_signup.confirmed_at is null
				                         or waitlist_signup.unsubscribed_at is not null
				                       then excluded.confirm_token
				                       else waitlist_signup.confirm_token end,
				confirm_sent_at = case when waitlist_signup.confirmed_at is null
				                         or waitlist_signup.unsubscribed_at is not null
				                       then now()
				                       else waitlist_signup.confirm_sent_at end,
				confirmed_at    = case when waitlist_signup.unsubscribed_at is not null
				                       then null
				                       else waitlist_signup.confirmed_at end,
				unsubscribed_at = null
			returning confirmed_at, confirm_token`;

		const row = rows[0];

		/* Already on the list: report success without emailing again. The response
		   shape is identical either way, so the endpoint cannot be used to test
		   whether a given address is subscribed. */
		if (row?.confirmed_at) {
			return NextResponse.json({ ok: true, status: 'confirmed' });
		}

		const mail = waitlistConfirmEmail(lang, confirmUrl(req, row?.confirm_token ?? token));
		const sent = await sendEmail({ to: email, ...mail });

		if (!sent.success) {
			/* The row exists but no confirmation can arrive, so the signup is
			   stuck. Surface it rather than showing a success state. */
			console.error('[waitlist] confirmation email failed for', email, sent.error);
			return leadError('server_error', 502);
		}

		return NextResponse.json({ ok: true, status: 'pending' });
	} catch (error) {
		console.error('[waitlist] insert failed:', error);
		return leadError('server_error', 500);
	}
}
