# Archived routes

Notiva is pre-launch: the site serves only the Coming Soon landing page and the
investor / support / merch pages ported from the design files. Everything that
used to live under `src/app` and is not part of that set was moved here so Next
stops compiling it as a route, while the code itself is kept for the relaunch.

| archived path | old URL(s) |
|---|---|
| `app/(main)/` | `/`, `/about/*`, `/blog`, `/brand`, `/business`, `/changelog`, `/compare`, `/contact`, `/faq`, `/features`, `/help`, `/milestones`, `/pricing`, `/security`, `/use-cases` |
| `app/(auth)/` | `/register`, `/verify-email` |
| `app/login/`, `app/forgot-password/`, `app/reset-password/` | the matching auth pages |
| `middleware.ts` | the NextAuth route gate (see below) |

`middleware.ts` was archived because every page that survives is public, so the
gate protected nothing — while still calling `getToken()` on every request and
redirecting anything unrecognised to `/login`, which now redirects off-site. It
never covered `/api/*` (those were explicitly allowed through), so removing it
changes nothing about API access. Restore it alongside the authenticated routes
at relaunch.

Nothing here is built or served. `archive/` is excluded from `tsconfig.json` and
from ESLint, so the archived code is not type-checked or linted either.

## What still runs

- `src/app/api/**` — NextAuth, cron jobs and webhooks are infrastructure, not
  pages, and were deliberately left in place.
- The auth redirects in `next.config.ts` (`/login`, `/register`,
  `/forgot-password`, `/reset-password`, `/onboarding`, `/home`, `/dashboard`,
  `/settings/*`, `/verify-email`) still point at the consumer app, so those URLs
  keep working even though the local pages are archived.
- Every archived marketing URL now issues a **temporary** redirect to `/`
  (see `ARCHIVED_MARKETING_PATHS` in `next.config.ts`). Temporary, not permanent,
  so the original URLs can be restored at relaunch without fighting cached 301s.

## Restoring

Move a folder back under `src/app/`, drop its entry from
`ARCHIVED_MARKETING_PATHS` in `next.config.ts`, and it is live again.
