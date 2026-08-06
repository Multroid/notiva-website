/**
 * GET /api/waitlist/confirm?token=… — closes the double opt-in loop.
 *
 * A GET that mutates is unusual, but the whole point of double opt-in is that
 * the confirmation is a link in an email, and links are GETs. The token is a
 * 256-bit secret and single-purpose, so the usual CSRF objection does not apply:
 * an attacker who can forge the request already knows the token, and knowing the
 * token is exactly the proof of mailbox control we are testing for.
 *
 * Always redirects to a human-visible page rather than returning JSON — the
 * visitor is a person who just clicked a link in their inbox.
 */
import { NextResponse } from 'next/server';

import { isDbConfigured, sql } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import { FOUNDER_EMAIL, waitlistNotifyEmail, waitlistWelcomeEmail } from '@/lib/leads/emails';
import {
	CONFIRM_RESULT_PARAM,
	CONFIRM_TOKEN_TTL_DAYS,
	type ConfirmResult,
} from '@/lib/leads/constants';
import { publicOrigin, unsubscribeUrl } from '@/lib/leads/request';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function back(req: Request, result: ConfirmResult) {
	const target = new URL('/', publicOrigin(req));
	target.searchParams.set(CONFIRM_RESULT_PARAM, result);
	return NextResponse.redirect(target, 303);
}

export async function GET(req: Request) {
	const token = new URL(req.url).searchParams.get('token');
	if (!token || token.length < 20) return back(req, 'invalid');
	if (!isDbConfigured()) return back(req, 'invalid');

	try {
		/* One statement decides everything: the WHERE clause matches only an
		   unconfirmed, unexpired token, so a replayed link cannot re-trigger the
		   welcome email and an expired one cannot confirm. */
		const rows = await sql<
			{ email: string; lang: 'de' | 'en'; source: string; unsubscribe_token: string }[]
		>`
			update public.waitlist_signup
			   set confirmed_at = now()
			 where confirm_token = ${token}
			   and confirmed_at is null
			   and confirm_sent_at > now() - make_interval(days => ${CONFIRM_TOKEN_TTL_DAYS})
			returning email, lang, source, unsubscribe_token`;

		if (rows.length > 0) {
			const signup = rows[0];
			/* Neither send should be able to fail the confirmation — the row is
			   already confirmed, which is the part that matters legally. */
			const welcome = waitlistWelcomeEmail(
				signup.lang,
				unsubscribeUrl(req, signup.unsubscribe_token)
			);
			void sendEmail({ to: signup.email, ...welcome }).then((r) => {
				if (!r.success) console.error('[waitlist] welcome email failed:', r.error);
			});
			void sendEmail({ to: FOUNDER_EMAIL, ...waitlistNotifyEmail(signup) });
			return back(req, 'confirmed');
		}

		/* No row updated. Distinguish "clicked twice" (friendly) from "expired or
		   bogus" (needs a retry) so the copy can differ. */
		const existing = await sql<{ confirmed_at: Date | null }[]>`
			select confirmed_at from public.waitlist_signup
			 where confirm_token = ${token}
			 limit 1`;

		if (existing.length === 0) return back(req, 'invalid');
		return back(req, existing[0].confirmed_at ? 'already' : 'expired');
	} catch (error) {
		console.error('[waitlist] confirm failed:', error);
		return back(req, 'invalid');
	}
}
