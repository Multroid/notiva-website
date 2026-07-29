import type { MetadataRoute } from 'next';

/* Canonical origin. Single source of truth — never hardcode the domain in a
   second place. Set as NEXT_PUBLIC_MARKETING_URL in .env / .env.production. */
const SITE_URL = process.env.NEXT_PUBLIC_MARKETING_URL || 'https://notiva.de';

/* Paths that must never be indexed by anyone.
   - /api/ : NextAuth, cron and webhook endpoints. No content, some of it
             state-changing — a crawler has no business there. Nothing links
             to them, so there is no removal signal to preserve.

   Deliberately NOT disallowed:

   - /basket. It is internally linked (the basket bar on /support, the
     add-to-basket CTA on every PDP), so crawlers will discover the URL either
     way. A `Disallow` here would stop them fetching the page — and a page that
     is never fetched is a page whose `noindex` is never read, which is exactly
     how a blocked URL ends up in the index as a bare, title-less result.
     Google: "For the noindex rule to be effective, the page must not be
     blocked by a robots.txt file." The `robots: { index: false, follow: false }`
     in (notiva)/basket/layout.tsx is therefore the single authoritative
     signal, and this file must leave the door open so it can be read.

   - the archived marketing paths (/pricing, /features, /about/*, /blog, …).
     They 307-redirect to / (see next.config.ts → ARCHIVED_MARKETING_PATHS).
     Blocking them would prevent crawlers from *seeing* the redirect, which is
     exactly the signal we want them to follow while those URLs are parked. */
const DISALLOW = ['/api/'];

/* Everything else is fair game: /, /for-investors, /support, /merch/<slug>. */
const ALLOW = ['/'];

/* ── AI / answer-engine crawlers ──────────────────────────────────────────
   The GEO (generative engine optimisation) half of this file.

   These agents are what put a site into ChatGPT / Claude / Perplexity /
   AI Overviews answers. Most robots.txt boilerplate blocks them by default,
   and several of these bots treat "no explicit rule" conservatively. For a
   pre-launch product whose entire job right now is to be *found and described
   correctly*, being quotable is worth far more than withholding the copy —
   especially since every page here is public marketing text.

   Each vendor gets its own group so a future decision to opt one out (say,
   training-only bots) is a one-line change and stays readable in the emitted
   robots.txt. The same DISALLOW applies to all of them. */
const AI_CRAWLER_GROUPS: string[][] = [
	/* OpenAI. GPTBot = training corpus, OAI-SearchBot = the ChatGPT search
	   index, ChatGPT-User = a live fetch triggered by a user's question.
	   The last two are what surface notiva.de inside an answer. */
	['GPTBot', 'OAI-SearchBot', 'ChatGPT-User'],

	/* Anthropic. ClaudeBot = crawler, anthropic-ai = legacy token still
	   honoured by some tooling, Claude-SearchBot = search/citation fetch. */
	['ClaudeBot', 'anthropic-ai', 'Claude-SearchBot'],

	/* Perplexity. PerplexityBot indexes, Perplexity-User fetches a page
	   because someone asked about it — blocking the latter removes us from
	   the citation list of any answer that mentions German bookkeeping. */
	['PerplexityBot', 'Perplexity-User'],

	/* Google's separate AI opt-in token. Independent of Googlebot: without an
	   explicit allow, the page can rank in Search but be excluded from
	   AI Overviews and Gemini grounding. */
	['Google-Extended'],

	/* Common Crawl. Not an answer engine itself, but the corpus a large share
	   of open models are trained on — the cheapest way to exist in the next
	   generation of model weights. */
	['CCBot'],

	/* Apple's AI opt-in token, distinct from Applebot (Siri / Spotlight). */
	['Applebot-Extended'],

	/* ByteDance (Doubao / TikTok search). */
	['Bytespider'],

	/* Meta AI. */
	['meta-externalagent'],
];

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			/* Default group — conventional search crawlers (Googlebot, Bingbot,
			   DuckDuckBot, …) and anything not named below. */
			{ userAgent: '*', allow: ALLOW, disallow: DISALLOW },

			...AI_CRAWLER_GROUPS.map((userAgent) => ({
				userAgent,
				allow: ALLOW,
				disallow: DISALLOW,
			})),
		],
		sitemap: `${SITE_URL}/sitemap.xml`,
	};
}
