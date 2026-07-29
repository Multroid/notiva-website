import fs from 'node:fs';
import path from 'node:path';

import type { MetadataRoute } from 'next';

/* The eight merch slugs are imported, never retyped: PRODUCT_COPY / MERCH_ORDER
   is the same catalogue generateStaticParams() builds the pages from, so the
   sitemap physically cannot list a product that has no page (or miss a new
   one). */
import { MERCH_ORDER } from '@/app/(notiva)/merch/[slug]/product-copy';

const SITE_URL = process.env.NEXT_PUBLIC_MARKETING_URL || 'https://notiva.de';

/* Build-time fallback, evaluated once per build. */
const BUILD_TIME = new Date();

/* lastModified from the mtime of the file that actually holds the page's copy,
   rather than a hand-maintained constant (goes stale) or `new Date()` on every
   entry (a sitemap that claims every page changed on every deploy is noise
   crawlers learn to ignore). Falls back to build time if the source is not on
   disk — e.g. if this ever gets evaluated from a bundled server runtime. */
function lastModified(...relativePaths: string[]): Date {
	let newest = 0;
	for (const rel of relativePaths) {
		try {
			const mtime = fs.statSync(path.join(process.cwd(), rel)).mtimeMs;
			if (mtime > newest) newest = mtime;
		} catch {
			/* file not readable in this environment — ignore, fall back below */
		}
	}
	return newest > 0 ? new Date(newest) : BUILD_TIME;
}

const APP = 'src/app/(notiva)';

export default function sitemap(): MetadataRoute.Sitemap {
	/* The landing page. Pre-launch this is the page everything else points at
	   and the only one whose copy changes with any regularity. */
	const landing = {
		/* No trailing slash: with `trailingSlash: false` (the default) Next
		   normalises `alternates.canonical: '/'` down to the bare origin, so
		   the canonical this page actually emits is `https://notiva.de` —
		   verified against the built HTML. A <loc> that disagreed with the
		   page's own canonical would be a self-inflicted duplicate signal. */
		url: SITE_URL,
		lastModified: lastModified(`${APP}/page.tsx`, `${APP}/coming-soon-page.tsx`),
		changeFrequency: 'weekly' as const,
		priority: 1,
	};

	const investors = {
		url: `${SITE_URL}/for-investors`,
		lastModified: lastModified(`${APP}/for-investors/page.tsx`),
		changeFrequency: 'monthly' as const,
		priority: 0.8,
	};

	/* Donations + the merch catalogue; the hub the eight PDPs hang off. */
	const support = {
		url: `${SITE_URL}/support`,
		lastModified: lastModified(`${APP}/support/page.tsx`),
		changeFrequency: 'monthly' as const,
		priority: 0.8,
	};

	/* One entry per product. Copy for all eight lives in product-copy.ts, so
	   that file's mtime is the honest "last changed" for every PDP. */
	const merchCopyChanged = lastModified(
		`${APP}/merch/[slug]/product-copy.ts`,
		`${APP}/merch/[slug]/merch-product.tsx`,
	);

	const merch = MERCH_ORDER.map((slug) => ({
		url: `${SITE_URL}/merch/${slug}`,
		lastModified: merchCopyChanged,
		changeFrequency: 'monthly' as const,
		priority: 0.5,
	}));

	/* Deliberately absent: /basket (per-visitor state, noindex), the 404 routes,
	   /api/**, and every archived marketing path — those 307 to / and a sitemap
	   listing redirects is a crawl-budget leak. */
	return [landing, investors, support, ...merch];
}
