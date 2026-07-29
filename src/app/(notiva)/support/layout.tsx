import type { Metadata } from 'next';

import { JsonLd } from '@/components/notiva/json-ld';
import { pageMetadata } from '@/lib/page-metadata';
import { merchItemList } from '@/lib/structured-data';

/* page.tsx is a client component, so the static DE metadata and the JSON-LD
   live here. Support Notiva.html carries data-title-de / data-title-en on
   <html>; the DE title is the static one below and the page swaps
   document.title on language change — the two strings must match. */
export const metadata: Metadata = pageMetadata({
	title: 'Notiva · Unterstützen',
	description:
		'Notiva ist bootstrapped und startet 2026. Spenden und Merch werden Entwicklungszeit. Bestellungen sind bis zum Launch unverbindlich, abgebucht wird nichts.',
	path: '/support',
});

export default function SupportLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{/* The eight merch tiles of the #merch grid, in catalogue order, as an
			    ItemList of links to the PDPs. Names only — the Product node with
			    its PreOrder offer lives on each /merch/<slug> page, so nothing is
			    duplicated and no price is asserted twice. */}
			<JsonLd id="ld-merch-list" data={merchItemList({ url: '/support' })} />
			{children}
		</>
	);
}
