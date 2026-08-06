/**
 * Postgres connection for the marketing site's own tables (lead capture).
 *
 * Separate from src/lib/prisma.ts on purpose — that one is a deliberate stub
 * (the marketing app has no Prisma schema) and must stay that way.
 *
 * DATABASE_URL points at Supabase's Supavisor pooler on :6543, which is
 * transaction-mode only. Two consequences:
 *   - `prepare: false` is mandatory. Prepared statements are per-session, and a
 *     transaction-mode pooler hands you a different backend each statement.
 *   - `max: 1`, because each serverless instance should hold one pooled
 *     connection, not ten.
 */
import 'server-only';
import postgres from 'postgres';

/* The URL is shared with Prisma's config and carries Prisma-only query params
   (?schema, pgbouncer, connection_limit, pool_timeout). postgres.js forwards
   query params it does not recognise to the server as startup parameters, so
   leaving them on produces `unrecognized configuration parameter "pgbouncer"`
   at connect time. Keep the origin and path, drop the search string, and pass
   the real options in code. */
function parsed(): { href: string; ssl: 'require' | false } {
	const raw = process.env.DATABASE_URL;
	if (!raw) throw new Error('DATABASE_URL is not set');
	const url = new URL(raw);

	/* TLS is decided before the search string is dropped. Supabase requires it
	   and its URL says so; a loopback Postgres generally has no certificate at
	   all, and forcing TLS there fails the handshake rather than falling back. */
	const mode = url.searchParams.get('sslmode');
	const loopback = ['localhost', '127.0.0.1', '::1'].includes(url.hostname);
	const ssl = mode === 'disable' || (!mode && loopback) ? false : 'require';

	url.search = '';
	return { href: url.toString(), ssl };
}

function create() {
	const { href, ssl } = parsed();
	return postgres(href, {
		prepare: false,
		max: 1,
		idle_timeout: 20,
		max_lifetime: 60 * 30,
		connect_timeout: 10,
		ssl,
		/* The pooler does not support the type-introspection round trip. */
		fetch_types: false,
		onnotice: () => {},
		connection: { application_name: 'notiva-marketing' },
	});
}

/* Next dev replaces the module on every edit; without the global the old pool
   is never closed and Supabase runs out of connections after a few saves. */
const globalForDb = globalThis as unknown as {
	notivaSql?: ReturnType<typeof create>;
};

export const sql: ReturnType<typeof create> = globalForDb.notivaSql ?? create();

if (process.env.NODE_ENV !== 'production') globalForDb.notivaSql = sql;

/** True when a lead can actually be persisted — lets routes fail loudly in prod
 *  and degrade to email-only locally rather than 500ing on a missing env var. */
export function isDbConfigured(): boolean {
	return Boolean(process.env.DATABASE_URL);
}
