import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import { SessionProvider } from "@/components/session-provider";
import { Toaster } from "@/components/ui/sonner";
import { DynamicTitle } from "@/components/dynamic-title";
import { SITE_URL } from "@/lib/structured-data";

const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
	weight: ["400", "500", "600", "700", "800", "900"],
	display: 'swap',
});

export const metadata: Metadata = {
	/* Required for the file-based OG cards and every relative `alternates.canonical`
	   to resolve to an absolute URL. Without it Next warns at build time and emits
	   localhost URLs in production. */
	metadataBase: new URL(SITE_URL),
	title: {
		default: "Notiva",
		template: "Notiva - %s",
	},
	/* German, because every server-rendered page is German (English is a
	   client-side toggle at the same URL, so crawlers never see it). This is only
	   a fallback — each indexable route sets its own via pageMetadata(). */
	description:
		"Notiva ist das KI-native Finanz-Backoffice für Selbstständige in Deutschland: Buchhaltung, Umsatzsteuer und Fristen vorbereitet, jede Zahl belegt. Start 2026.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		/* lang="de": every server-rendered page ships German copy. The English
		   toggle swaps `lang` on the page shell client-side, it does not change
		   the document language a crawler sees. */
		<html lang="de" suppressHydrationWarning>
			{/* No preconnect to fonts.googleapis.com / fonts.gstatic.com.
			    next/font/google downloads Montserrat, Plus Jakarta Sans and Inter at
			    build time and serves them from /_next/static/media, so nothing is
			    ever fetched from Google — the hints saved no round trip and only
			    opened a TLS connection that handed the visitor's IP to Google. */}
			<body className={`${montserrat.variable} font-montserrat antialiased min-h-screen bg-background text-foreground`} suppressHydrationWarning>
				{/* No analytics here on purpose.
				    Google Analytics 4 (G-BF5YGPRDQ7) used to load unconditionally at
				    this point and set the _ga / _ga_BF5YGPRDQ7 cookies before the
				    visitor agreed to anything. Analytics storage is not "strictly
				    necessary" under § 25 Abs. 1 TDDDG, so it needs prior consent —
				    which meant either a consent banner or removal.

				    Replacement is PostHog on EU Cloud (Frankfurt), configured
				    cookieless (persistence: 'memory', IP anonymised, no session
				    replay). Because that touches no browser storage, § 25 does not
				    apply and the site keeps working without a consent banner.

				    Whatever lands here must stay consistent with § 8 of
				    src/app/(notiva)/datenschutz/page.tsx and with the
				    "DSGVO-konform by design" badge on the landing page. */}
				<DynamicTitle />
				<SessionProvider>
					<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
						{children}
						<Toaster richColors />
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
