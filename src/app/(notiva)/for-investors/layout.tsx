import type { Metadata } from 'next';

import { JsonLd } from '@/components/notiva/json-ld';
import { pageMetadata } from '@/lib/page-metadata';
import { INVESTOR_FAQ, faqPage } from '@/lib/structured-data';

/* page.tsx is a client component (language context + modal), so the static DE
   metadata and the JSON-LD live here, in the server layout above it.

   The title matches useNotivaTitle('Notiva · Für Investoren', …) in page.tsx —
   that hook holds document.title after hydration, so the two must not drift.
   It passes through the (notiva) group's identity template '%s' unchanged, so
   no `absoluteTitle` here. */
export const metadata: Metadata = pageMetadata({
	title: 'Notiva · Für Investoren',
	description:
		'Notiva sammelt eine Pre-Seed-Runde ein: das KI-native Finanz-Backoffice für Selbstständige in Deutschland. Markt, Produkt, Traction und Risiken offen dargelegt.',
	path: '/for-investors',
});

export default function ForInvestorsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{/* The six <details> Q&As of the "Häufige Fragen" section, German copy
			    verbatim — Google requires FAQPage markup to match the rendered
			    text, so INVESTOR_FAQ has to be edited in lockstep with page.tsx. */}
			<JsonLd id="ld-faq" data={faqPage(INVESTOR_FAQ, { url: '/for-investors' })} />
			{children}
		</>
	);
}
