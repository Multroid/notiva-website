import type { Metadata } from 'next';

import { JsonLd } from '@/components/notiva/json-ld';
import { pageMetadata } from '@/lib/page-metadata';
import { graph, softwareApplication, website } from '@/lib/structured-data';

import { ComingSoonPage } from './coming-soon-page';

/* Coming Soon.html is the landing page while Notiva is pre-launch, and it is
   the site's primary indexable URL.

   `absoluteTitle`, because a layout's title.template applies to its child
   segments, not to a page in the same segment: the (notiva) layout's
   template: '%s' cannot reach this page, so without it the root layout's
   "Notiva - %s" would wrap the title into "Notiva - Notiva · …".

   The title string must stay character-identical to the German argument of
   useNotivaTitle() in coming-soon-page.tsx — that hook re-asserts
   document.title after hydration, so a mismatch means the rendered title
   (which is what Google indexes) differs from the SSR one. */
export const metadata: Metadata = pageMetadata({
	title: 'Notiva · Buchhaltung und Steuern für Selbstständige',
	description:
		'Notiva liest Bank, E-Mail und Belege das ganze Jahr, bereitet UStVA und EÜR vor und warnt vor jeder Frist. Für Selbstständige in Deutschland. Start 2026.',
	path: '/',
	absoluteTitle: true,
});

export default function HomePage() {
	return (
		<>
			{/* WebSite + SoftwareApplication for the entity behind this URL. The
			    Organization they both point at comes from (notiva)/layout.tsx.
			    No offers/price (subscription pricing is not public) and no
			    aggregateRating (no reviews exist) — see structured-data.ts. */}
			<JsonLd id="ld-home" data={graph(website(), softwareApplication())} />
			<ComingSoonPage />
		</>
	);
}
