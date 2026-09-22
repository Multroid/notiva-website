import type { Metadata } from 'next';

import { NOINDEX, pageMetadata } from '@/lib/page-metadata';

/* page.tsx is a client component, so the static DE metadata lives here. The
   title must stay character-identical to the DE argument of useNotivaTitle() in
   page.tsx — that hook re-asserts document.title after hydration.

   NOINDEX until a lawyer has signed the text off. A privacy policy is normally
   worth indexing, but an unreviewed one is not what should turn up under
   "Notiva Datenschutz" — and Google is slow to re-crawl a page it has already
   decided about. Remove `robots` and add the route to src/app/sitemap.ts once
   the review is done. */
export const metadata: Metadata = {
	...pageMetadata({
		title: 'Notiva · Datenschutz',
		description:
			'Welche Daten notiva.de erhebt, warum und wie lange: Warteliste mit Double-Opt-in, Investoren-Anfragen, Spenden über Stripe, Merch über Fourthwall. Kein Tracking, keine Werbe-Cookies.',
		path: '/datenschutz',
	}),
	robots: NOINDEX,
};

export default function DatenschutzLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
