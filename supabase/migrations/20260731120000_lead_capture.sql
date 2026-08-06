-- Lead capture for the marketing site: waitlist signups and investor deck requests.
--
-- Both tables are written only by the Next.js route handlers in
-- src/app/api/{waitlist,investor-deck}, which connect as the database owner over
-- DATABASE_URL (the Supavisor transaction pooler on :6543). Nothing reaches these
-- tables through the Data API.
--
-- RLS is therefore enabled with ZERO policies, and anon/authenticated are revoked
-- explicitly: if the Data API is ever pointed at the public schema, these tables
-- deny by default rather than relying on Supabase's current "new tables are not
-- exposed" behaviour (breaking change 2026-04-28, enforced 2026-10-30) staying put.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Waitlist
-- ---------------------------------------------------------------------------
-- Double opt-in: a row is created unconfirmed, an email carries confirm_token,
-- and confirmed_at is stamped when that link is opened. Only rows with
-- confirmed_at may be sent marketing email (§7 UWG / DSGVO Art. 6(1)(a)).
create table if not exists public.waitlist_signup (
	id              uuid primary key default gen_random_uuid(),
	email           text        not null,
	lang            text        not null default 'de' check (lang in ('de', 'en')),
	source          text        not null default 'website',

	-- consent trail: what they agreed to, when, and from where
	consent_at      timestamptz not null default now(),
	consent_text    text,
	ip              inet,
	user_agent      text,

	-- double opt-in
	confirm_token   text        not null,
	confirm_sent_at timestamptz,
	confirmed_at    timestamptz,

	unsubscribed_at timestamptz,
	created_at      timestamptz not null default now(),
	updated_at      timestamptz not null default now(),

	constraint waitlist_signup_email_lower check (email = lower(email))
);

create unique index if not exists waitlist_signup_email_key
	on public.waitlist_signup (email);
create unique index if not exists waitlist_signup_confirm_token_key
	on public.waitlist_signup (confirm_token);
-- Powers the per-IP flood check in the route handler.
create index if not exists waitlist_signup_ip_created_at_idx
	on public.waitlist_signup (ip, created_at desc);

-- ---------------------------------------------------------------------------
-- Investor deck requests
-- ---------------------------------------------------------------------------
-- Not marketing email: this is pre-contractual correspondence the requester
-- initiated (DSGVO Art. 6(1)(b)), so no double opt-in. The deck is sent by hand
-- after review, so `status` tracks that by design.
create table if not exists public.investor_lead (
	id           uuid primary key default gen_random_uuid(),
	name         text        not null,
	company      text        not null,
	email        text        not null,
	message      text,
	lang         text        not null default 'de' check (lang in ('de', 'en')),
	source       text        not null default 'for-investors',

	status       text        not null default 'new'
		check (status in ('new', 'reviewing', 'deck_sent', 'meeting_booked', 'passed', 'spam')),
	deck_sent_at timestamptz,
	notes        text,

	ip           inet,
	user_agent   text,
	created_at   timestamptz not null default now(),
	updated_at   timestamptz not null default now(),

	constraint investor_lead_email_lower check (email = lower(email))
);

create index if not exists investor_lead_created_at_idx
	on public.investor_lead (created_at desc);
create index if not exists investor_lead_email_idx
	on public.investor_lead (email);
create index if not exists investor_lead_ip_created_at_idx
	on public.investor_lead (ip, created_at desc);

-- ---------------------------------------------------------------------------
-- updated_at
-- ---------------------------------------------------------------------------
-- SECURITY INVOKER (the default) — a trigger function needs no elevated rights
-- here, and search_path is pinned so it cannot be hijacked by a shadowing schema.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
	new.updated_at := now();
	return new;
end;
$$;

drop trigger if exists waitlist_signup_touch on public.waitlist_signup;
create trigger waitlist_signup_touch
	before update on public.waitlist_signup
	for each row execute function public.touch_updated_at();

drop trigger if exists investor_lead_touch on public.investor_lead;
create trigger investor_lead_touch
	before update on public.investor_lead
	for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Lock down
-- ---------------------------------------------------------------------------
alter table public.waitlist_signup enable row level security;
alter table public.investor_lead   enable row level security;

-- Deliberately no policies: with RLS on and no policy, every role except those
-- with BYPASSRLS (postgres, service_role) sees nothing and can write nothing.
revoke all on public.waitlist_signup from anon, authenticated;
revoke all on public.investor_lead   from anon, authenticated;
revoke execute on function public.touch_updated_at() from public;

comment on table public.waitlist_signup is
	'Pre-launch waitlist, double opt-in. Written by POST /api/waitlist; confirmed by GET /api/waitlist/confirm. Only rows with confirmed_at may receive marketing email.';
comment on table public.investor_lead is
	'Investor deck requests from /for-investors. Written by POST /api/investor-deck. The deck is sent manually; see status.';
