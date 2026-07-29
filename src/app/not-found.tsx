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

export default function NotFound() {
	return (
		<NotivaProviders className={`${jakarta.variable} ${inter.variable}`}>
			<NotFoundView />
		</NotivaProviders>
	);
}
