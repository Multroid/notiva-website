/** Shared request-side concerns for the two lead endpoints: client identity,
 *  flood control and a single JSON error shape the modal can switch on. */
import 'server-only';
import { NextResponse } from 'next/server';

import { sql } from '@/lib/db';

export type LeadErrorCode =
	| 'invalid'
	| 'rate_limited'
	| 'server_error'
	| 'not_configured';

export function leadError(code: LeadErrorCode, status: number) {
	return NextResponse.json({ ok: false, error: { code } }, { status });
}

/**
 * Public origin to build confirmation links and redirects from.
 *
 * In production this is ALWAYS the configured value, never derived from the
 * request. Host is attacker-controlled, so trusting it would let someone mint a
 * confirmation link pointing at their own domain — handing them a live token —
 * and would turn the confirm redirect into an open redirect.
 *
 * In development the configured value is https://notiva.de, which sends every
 * locally generated link and redirect off to production and 404s against
 * whatever is deployed there. Locally the request's own origin is therefore
 * preferred, which is what makes the flow testable end to end.
 */
export function publicOrigin(req: Request): string {
	const configured = (process.env.NEXT_PUBLIC_MARKETING_URL || 'https://notiva.de').replace(
		/\/$/,
		''
	);
	if (process.env.NODE_ENV === 'production') return configured;

	try {
		return new URL(req.url).origin;
	} catch {
		return configured;
	}
}

/** Unsubscribe endpoint for a given row's stable token. Same origin rules as
 *  publicOrigin — in particular it must never come from the Host header in
 *  production, or the List-Unsubscribe header could be pointed at a third party. */
export function unsubscribeUrl(req: Request, token: string): string {
	return `${publicOrigin(req)}/api/waitlist/unsubscribe?token=${encodeURIComponent(token)}`;
}

/** Client IP behind Amplify's CloudFront distribution. x-forwarded-for is a
 *  comma-separated chain appended to by each hop, so the client is the first
 *  entry. Returns null rather than a bogus value when there is no header, so the
 *  inet column stays honest and the rate limiter simply does not match. */
export function clientIp(req: Request): string | null {
	const forwarded = req.headers.get('x-forwarded-for');
	if (forwarded) {
		const first = forwarded.split(',')[0]?.trim();
		if (first) return first;
	}
	return req.headers.get('x-real-ip')?.trim() || null;
}

export function userAgent(req: Request): string | null {
	return req.headers.get('user-agent')?.slice(0, 500) || null;
}

/**
 * Count rows this IP has written to `table` inside `windowMinutes`.
 *
 * Deliberately a database count rather than Redis: Amplify runs many instances,
 * so an in-memory counter would reset per cold start and cap nothing. The table
 * has an (ip, created_at desc) index, and a null IP can never match, which fails
 * open — acceptable, because the honeypot and the unique email index are the
 * other two layers.
 */
async function recentCountByIp(
	table: 'waitlist_signup' | 'investor_lead',
	ip: string | null,
	windowMinutes: number
): Promise<number> {
	if (!ip) return 0;
	const rows =
		table === 'waitlist_signup'
			? await sql<{ n: number }[]>`
				select count(*)::int as n from public.waitlist_signup
				where ip = ${ip}::inet
				  and created_at > now() - make_interval(mins => ${windowMinutes})`
			: await sql<{ n: number }[]>`
				select count(*)::int as n from public.investor_lead
				where ip = ${ip}::inet
				  and created_at > now() - make_interval(mins => ${windowMinutes})`;
	return rows[0]?.n ?? 0;
}

/** True when this IP has exceeded its allowance and the request should be
 *  refused. Errors are swallowed to a permit: a database hiccup must not take
 *  the signup form down with it. */
export async function isFlooding(
	table: 'waitlist_signup' | 'investor_lead',
	ip: string | null,
	{ max, windowMinutes }: { max: number; windowMinutes: number }
): Promise<boolean> {
	try {
		return (await recentCountByIp(table, ip, windowMinutes)) >= max;
	} catch (error) {
		console.error(`[leads] rate-limit check failed for ${table}:`, error);
		return false;
	}
}
