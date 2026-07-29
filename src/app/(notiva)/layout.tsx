import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';

import '@/styles/notiva/tokens.css';
import '@/styles/notiva/nav.css';
import '@/styles/notiva/modal.css';

import { JsonLd } from '@/components/notiva/json-ld';
import { NotivaProviders } from '@/components/notiva/providers';
import { organization } from '@/lib/structured-data';

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

/* The design pages carry full titles ("Notiva · Unterstützen"), so this group
   opts out of the root layout's "Notiva - %s" template. */
export const metadata: Metadata = {
	title: {
		default: 'Notiva',
		template: '%s',
	},
	/* every design page declares <link rel="icon" href="assets/notiva-logo-chip.svg"> */
	icons: { icon: '/notiva/notiva-logo-chip.svg' },
};

export default function NotivaLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<NotivaProviders className={`${jakarta.variable} ${inter.variable}`}>
			{/* Publisher node for the whole group. Every other schema on every page
			    references it by @id (`…/#organization`) instead of restating the
			    company, so it is emitted once here rather than per page. */}
			<JsonLd id="ld-organization" data={organization()} />
			{children}
		</NotivaProviders>
	);
}
