import type { Metadata } from 'next';

import { ComingSoonPage } from './coming-soon-page';

/* Coming Soon.html is the landing page while Notiva is pre-launch.
   It has a fixed <title> (no data-title-de/-en on <html>), so the document
   title never changes with the language toggle. */
export const metadata: Metadata = {
	/* `absolute`, because a layout's title.template applies to its child
	   segments, not to a page in the same segment: the (notiva) layout's
	   template: '%s' cannot reach this page, so without `absolute` the root
	   layout's "Notiva - %s" wraps it into "Notiva - Notiva · Warteliste". */
	title: { absolute: 'Notiva · Warteliste' },
	description:
		'Notiva liest Bank, E-Mail und Belege das ganze Jahr, erstellt UStVA und EÜR und warnt, bevor etwas Geld kostet. Für Selbstständige in Deutschland und Europa.',
};

export default function HomePage() {
	return <ComingSoonPage />;
}
