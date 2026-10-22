import type { Metadata } from 'next';

import { NOINDEX, pageMetadata } from '@/lib/page-metadata';

import { RwuPage } from './rwu-page';

/* Event landing page for RWU, reached by QR code. Signups made here are tagged
   source '/rwu' and get the event rate limit (lib/leads/constants.ts).

   noindex: it is a campaign entry point, not content. It repeats the landing
   page's waitlist and would only compete with / in search. Not in sitemap.ts
   for the same reason. Open Graph stays, so a link shared into a group chat
   still unfurls with the site card.

   The title must stay character-identical to the German argument of
   useNotivaTitle() in rwu-page.tsx. */
export const metadata: Metadata = {
	...pageMetadata({
		title: 'Notiva · Warteliste RWU',
		description:
			'Hallo RWU: Trag dich auf die Notiva Warteliste ein. Das KI-native Finanz-Backoffice für Selbstständige in Deutschland.',
		path: '/rwu',
	}),
	robots: NOINDEX,
};

export default function Page() {
	return <RwuPage />;
}
