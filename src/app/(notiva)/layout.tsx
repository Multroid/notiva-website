import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';

import '@/styles/notiva/tokens.css';
import '@/styles/notiva/nav.css';
import '@/styles/notiva/modal.css';

import { JsonLd } from '@/components/notiva/json-ld';
import { NotivaProviders } from '@/components/notiva/providers';
import { getCatalogue } from '@/lib/fourthwall/catalogue';
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

/* Every page in this group prerenders, and the Fourthwall catalogue is fetched
   here — without a revalidate window the prices, images and stock baked at
   build time would never change again until the next deploy. Five minutes
   applies to the whole group, so /support, /basket and the eight PDPs cannot
   drift apart from each other. */
export const revalidate = 300;

export default async function NotivaLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	/* One fetch for the whole route group. Falls back to the local price table
	   when no Fourthwall shop is configured, so this never blocks a render. */
	const catalogue = await getCatalogue();

	return (
		<NotivaProviders
			className={`${jakarta.variable} ${inter.variable}`}
			catalogue={catalogue}
		>
			{/* Publisher node for the whole group. Every other schema on every page
			    references it by @id (`…/#organization`) instead of restating the
			    company, so it is emitted once here rather than per page. */}
			<JsonLd id="ld-organization" data={organization()} />
			{children}
		</NotivaProviders>
	);
}
