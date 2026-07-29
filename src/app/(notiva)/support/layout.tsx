import type { Metadata } from 'next';

/* Support Notiva.html carries data-title-de / data-title-en on <html>; the DE
   title is the static one, the page swaps document.title on language change. */
export const metadata: Metadata = {
	title: 'Notiva · Unterstützen',
};

export default function SupportLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
