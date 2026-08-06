/**
 * Unsubscribe from the waitlist. Two methods, on purpose.
 *
 * GET  — the visible link in the email footer. It does NOT unsubscribe; it
 *        redirects to the landing page with the token so a button can POST.
 *        A GET must not mutate, and here that is practical rather than
 *        pedantic: Outlook Safe Links, spam filters and antivirus scanners
 *        fetch every URL in a message, so an unsubscribing GET would silently
 *        drop people who never clicked anything.
 *
 * POST — actually unsubscribes. Serves both the confirm button and RFC 8058
 *        one-click, where the mail provider POSTs to the List-Unsubscribe URL
 *        with `List-Unsubscribe=One-Click`. Gmail and Yahoo have required this
 *        of bulk senders since February 2024, and RFC 8058 requires the POST to
 *        complete without any further interaction — so no CSRF token is
 *        possible or expected. The unguessable token in the URL is the
 *        credential, exactly as with the confirmation link.
 *
 * Idempotent: unsubscribing twice reports success rather than an error, because
 * providers retry and a second click must not look like a failure.
 */
import { NextResponse } from 'next/server';

import { isDbConfigured, sql } from '@/lib/db';
import {
	CONFIRM_RESULT_PARAM,
	UNSUB_TOKEN_PARAM,
	type ConfirmResult,
} from '@/lib/leads/constants';
import { leadError, publicOrigin } from '@/lib/leads/request';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function land(req: Request, result: ConfirmResult, token?: string) {
	const target = new URL('/', publicOrigin(req));
	target.searchParams.set(CONFIRM_RESULT_PARAM, result);
	if (token) target.searchParams.set(UNSUB_TOKEN_PARAM, token);
	return NextResponse.redirect(target, 303);
}

/** Accepts the token from the query string (how both the emailed link and an
 *  RFC 8058 provider POST carry it) or from a JSON body (how the confirm button
 *  sends it). */
async function tokenFrom(req: Request): Promise<string | null> {
	const fromQuery = new URL(req.url).searchParams.get('token');
	if (fromQuery) return fromQuery;

	if (req.method === 'POST') {
		try {
			const body = await req.json();
			if (typeof body?.token === 'string') return body.token;
		} catch {
			/* one-click POSTs send form-encoded List-Unsubscribe=One-Click and no
			   JSON at all; the token was in the query string in that case. */
		}
	}
	return null;
}

export async function GET(req: Request) {
	const token = new URL(req.url).searchParams.get('token');
	if (!token || token.length < 20 || !isDbConfigured()) {
		return land(req, 'unsub-invalid');
	}

	try {
		/* Look up without mutating, so a prefetch is harmless. Distinguish an
		   unknown token from one that is already unsubscribed. */
		const rows = await sql<{ unsubscribed_at: Date | null }[]>`
			select unsubscribed_at from public.waitlist_signup
			 where unsubscribe_token = ${token}
			 limit 1`;

		if (rows.length === 0) return land(req, 'unsub-invalid');
		if (rows[0].unsubscribed_at) return land(req, 'unsubscribed');
		return land(req, 'unsub-ask', token);
	} catch (error) {
		console.error('[unsubscribe] lookup failed:', error);
		return land(req, 'unsub-invalid');
	}
}

export async function POST(req: Request) {
	if (!isDbConfigured()) return leadError('not_configured', 503);

	const token = await tokenFrom(req);
	if (!token || token.length < 20) return leadError('invalid', 400);

	try {
		/* coalesce keeps the first opt-out timestamp: when it was withdrawn is the
		   fact worth being able to prove, not when someone last clicked. */
		const rows = await sql<{ email: string }[]>`
			update public.waitlist_signup
			   set unsubscribed_at = coalesce(unsubscribed_at, now())
			 where unsubscribe_token = ${token}
			returning email`;

		/* An unknown token still reports ok. The alternative tells an enumerating
		   caller which tokens are real, and a provider's retry would surface a
		   spurious error to the recipient. */
		if (rows.length === 0) {
			console.warn('[unsubscribe] no row for the supplied token');
		} else {
			console.info('[unsubscribe] opted out:', rows[0].email);
		}

		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error('[unsubscribe] update failed:', error);
		return leadError('server_error', 500);
	}
}
