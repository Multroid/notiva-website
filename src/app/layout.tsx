import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
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
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
			</head>
			<body className={`${montserrat.variable} font-montserrat antialiased min-h-screen bg-background text-foreground`} suppressHydrationWarning>
				{/* Google Analytics */}
				<Script
					src="https://www.googletagmanager.com/gtag/js?id=G-BF5YGPRDQ7"
					strategy="afterInteractive"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-BF5YGPRDQ7');
					`}
				</Script>
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
