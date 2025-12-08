import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import { SessionProvider } from "@/components/session-provider";
import { Toaster } from "@/components/ui/sonner";
import { DynamicTitle } from "@/components/dynamic-title";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: 'swap',
});

const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
	weight: ["500", "600"],
	display: 'swap',
});

export const metadata: Metadata = {
	title: {
		default: "Notiva",
		template: "Notiva - %s",
	},
	description: "The smartest way to track document expirations, subscription renewals, and important payments.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
			</head>
			<body className={`${inter.variable} ${montserrat.variable} antialiased min-h-screen bg-background text-foreground`} suppressHydrationWarning>
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
