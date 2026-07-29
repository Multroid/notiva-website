import type { Metadata } from 'next';

/* page.tsx is a client component (language context + modal), so the static
   DE title lives here — it matches <title>Notiva · Für Investoren</title> in
   For Investors.html. The EN title is swapped client-side on language change. */
export const metadata: Metadata = {
	title: 'Notiva · Für Investoren',
};

export default function ForInvestorsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
