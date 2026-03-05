# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server with Turbopack on port 3001
npm run build        # Production build
npm run lint         # ESLint
npx tsc --noEmit     # Type check (not run during build — build ignores TS/ESLint errors)
npm install --legacy-peer-deps  # Required flag for installing dependencies
```

## Architecture

This is the **Notiva marketing website** — a Next.js 15 App Router site deployed on AWS Amplify. It is separate from the consumer app (`notiva-consumer`). Auth pages (`/login`, `/register`, etc.) redirect to the consumer app via `next.config.ts` redirects.

### Route Groups
- `src/app/(main)/` — All marketing pages. Layout includes sticky header with nav dropdowns + mobile accordion nav. The layout is a client component using `useSession` for auth state.
- `src/app/api/` — API routes for auth (NextAuth v4), cron jobs (notifications, Stripe reconciliation, trial monitoring), and webhooks.

### Homepage Structure
The homepage (`src/app/(main)/page.tsx`) renders landing sections in order: HeroSection, MeetNoviSection, FeaturesGridSection, HowNotivaWorksSection, ComparisonSection, PricingSection, NewsletterSection, Footer. Each is a standalone component in `src/components/`.

### Key Patterns
- **Notiva Button System**: Use `<NotivaButton>` / `<NotivaButtonLink>` from `src/components/ui/notiva-button.tsx` — not the default shadcn Button — for marketing pages. Variants: `primary`, `secondary`, `important`, `cta`. Button styles are CSS classes defined in `globals.css` (`notiva-btn-*`).
- **App URL helpers**: `getMainAppLoginUrl()`, `getMainAppRegisterUrl()`, `getMainAppDashboardUrl()` from `src/lib/app-url.ts` generate consumer app URLs dynamically based on environment.
- **Font**: Montserrat loaded via `next/font/google`, exposed as `--font-montserrat` CSS variable.
- **Styling**: Tailwind CSS v4 with `@theme inline` block in `globals.css`. Shadcn/UI (new-york style) for generic UI components in `src/components/ui/`.
- **Animations**: Framer Motion for section animations, GSAP for complex timelines, Rive for the "Novi" mascot (`/public/animations/novi.riv`).

### Design System Colors (CSS variables in globals.css)
- `--notiva-blue: #0047BA` (primary brand blue)
- `--notiva-blue-dark: #00336C` / `--notiva-blue-darker` variants
- `--multroid-white: #F0EEE9` (off-white for dark backgrounds)
- `--multroid-grey-dark: #67696B` (nav text)
- Orange `#F05627` for important/CTA buttons
- `--multroid-blue: #0033A1` for borders

### Deployment
- AWS Amplify with `amplify.yml` config. No standalone output mode.
- `main` branch deploys to production (`notiva.de`), `dev` branch to staging.
- Prisma client is a server external package (`serverExternalPackages` in next.config.ts).

### Figma Reference
The design source is in Figma (file key: `EyQEFMQt7rVZepDXRFRru9`). Landing page sections map to specific Figma node IDs documented in the auto-memory file.
