import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';

import '@/styles/notiva/tokens.css';
import '@/styles/notiva/nav.css';
import '@/styles/notiva/modal.css';

import { NotivaProviders } from '@/components/notiva/providers';
import { NotFoundView } from '@/components/notiva/not-found-view';

/* Root not-found: handles every unmatched URL. It renders inside
   src/app/layout.tsx, NOT inside (notiva)/layout.tsx, so it has to bring its
   own fonts and providers — next/font dedupes identical configurations, so
   declaring them again here costs nothing. */

const jakarta = Plus_Jakarta_Sans({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
	variable: '--font-jakarta',
	display: 'swap',
});

const inter = Inter({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-inter',
	display: 'swap',
});

/* The 404 status already keeps this out of an index; the directive below is for
   anything that renders the page without seeing the header (a soft 404, a
   preview deploy). Next emits its own `noindex` for this route on top.

   `absolute`, because the root layout's "Notiva - %s" template would otherwise
   produce "Notiva - Notiva · Seite nicht gefunden" — verified in the built
   HTML. This file is a real route (`/_not-found`), so unlike a nested
   not-found its `metadata` export is resolved normally. */
export const metadata: Metadata = {
	title: { absolute: 'Notiva · Seite nicht gefunden' },
	robots: { index: false, follow: false },
};

export default function NotFound() {
	return (
		<NotivaProviders className={`${jakarta.variable} ${inter.variable}`}>
			<NotFoundView />
		</NotivaProviders>
	);
}
