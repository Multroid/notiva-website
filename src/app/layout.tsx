import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import { SessionProvider } from "@/components/session-provider";
import { Toaster } from "@/components/ui/sonner";
import { DynamicTitle } from "@/components/dynamic-title";
import { COOKIEBOT_CBID, cookiebotEnabled } from "@/lib/cookiebot";
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
				{/* Cookiebot CMP.

				    `beforeInteractive` + root layout is the only combination that
				    works. Next preloads uc.js from <head> and then injects the real
				    tag from its client runtime (self.__next_s) before React hydrates,
				    so it is running before any application code — which is what
				    data-blockingmode="auto" needs to be able to block anything at all.
				    The same <Script> in a child component or in the (notiva) layout is
				    silently downgraded to an ordinary deferred script.

				    Two things were tried and rejected. Next's own docs put
				    beforeInteractive scripts next to <body>, inside <html>: React 19
				    refuses a <script> there ("cannot be a child of <html>") and the
				    page hydrates with an error. A raw parser-blocking <script> in a
				    hand-written <head> does run earlier — but uc.js prepends its own
				    tags into that head while the document is still parsing, React then
				    hydrates against shifted children, and the resulting mismatch
				    cannot be silenced (suppressHydrationWarning does not apply to
				    hoisted script resources in React 19). A permanent hydration error
				    on every page load was not worth the few milliseconds.

				    What auto-blocking does NOT cover: scripts React injects at runtime
				    after Cookiebot has loaded — here that is loadStripe() on /support.
				    Those two Stripe cookies are declared strictly necessary under § 25
				    Abs. 2 Nr. 2 TDDDG (see § 7 of the privacy policy), so they are
				    meant to run unblocked; anything added later that is *not*
				    necessary must be gated on Cookiebot.consent in code rather than
				    assumed handled.

				    No data-culture: Cookiebot reads <html lang>, which is always "de"
				    here — the DE/EN toggle only rewrites it client-side, after the
				    banner has already picked its language. */}
				{cookiebotEnabled && (
					<Script
						id="Cookiebot"
						src="https://consent.cookiebot.com/uc.js"
						data-cbid={COOKIEBOT_CBID}
						data-blockingmode="auto"
						strategy="beforeInteractive"
					/>
				)}

				{/* Still no analytics here.
				    Google Analytics 4 (G-BF5YGPRDQ7) used to load unconditionally at
				    this point and set the _ga / _ga_BF5YGPRDQ7 cookies before the
				    visitor agreed to anything. Analytics storage is not "strictly
				    necessary" under § 25 Abs. 1 TDDDG, so it needs prior consent —
				    which meant either a consent banner or removal.

				    Cookiebot above is the banner half of that answer: anything that
				    lands here later (PostHog, and it is the only thing planned) is
				    gated by it rather than shipped unconditionally, and it is what
				    lets a cookie-setting analytics tool be reconsidered at all.

				    Whatever lands here must stay consistent with §§ 7 and 8 of
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
