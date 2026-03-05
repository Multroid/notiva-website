import { DocumentTextIcon as FileText, ArrowDownTrayIcon as Download, EnvelopeIcon as Mail, PhotoIcon as ImageIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { NotivaButtonLink } from "@/components/ui/notiva-button";

export default function PressPage() {
	const pressReleases = [
		{
			date: "February 2026",
			title: "Notiva Introduces Novi — AI Financial Co-Pilot",
			excerpt:
				"Multroid launches Novi, an AI assistant built into Notiva that reads invoices, tracks deadlines, and provides proactive financial insights.",
		},
		{
			date: "December 2025",
			title: "Hoomara Announced as Second Multroid Product",
			excerpt:
				"Multroid expands its ecosystem with Hoomara, an intelligent HR platform designed to automate administrative workflows.",
		},
		{
			date: "September 2025",
			title: "Notiva Launches with AI-Powered Financial Tracking",
			excerpt:
				"Multroid launches Notiva, an AI-native platform for managing subscriptions, documents, and critical deadlines with financial clarity and control.",
		},
	];

	return (
		<div className="min-h-screen">
			{/* Hero */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-[#D9E3F5] text-[#0047BA] ring-1 ring-[#B0C6EA] mb-6">
						<FileText className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#0047BA]">Press &amp; Media</h1>
					<p className="text-xl text-[var(--multroid-grey-dark)] max-w-2xl mx-auto">
						News, press releases, and media resources from Multroid and Notiva.
					</p>
				</div>
			</section>

			{/* Press Contact */}
			<section className="py-12 bg-[#FAFAF8]">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto rounded-[12px] p-8 border border-[#B0C6EA] bg-white">
						<div className="flex flex-col md:flex-row gap-8 items-center">
							<div className="size-16 rounded-2xl bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center shrink-0">
								<Mail className="size-8" />
							</div>
							<div className="flex-1 text-center md:text-left">
								<h2 className="text-2xl font-bold mb-2">Media Inquiries</h2>
								<p className="text-[var(--multroid-grey-dark)] mb-4">
									For press inquiries, interviews, or media requests, please contact our press team.
								</p>
								<a
									href="mailto:press@multroid.com"
									className="text-[#0047BA] font-semibold hover:underline"
								>
									press@multroid.com
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Press Releases */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#0047BA]">Latest Press Releases</h2>
					<div className="max-w-4xl mx-auto space-y-6">
						{pressReleases.map((release, i) => (
							<article
								key={i}
								className="rounded-[12px] p-6 border border-[#B0C6EA] bg-white hover:shadow-lg transition-shadow"
							>
								<p className="text-sm text-[var(--multroid-grey)] mb-2">{release.date}</p>
								<h3 className="text-xl font-semibold mb-2">{release.title}</h3>
								<p className="text-[var(--multroid-grey-dark)]">{release.excerpt}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* Brand Assets */}
			<section className="py-20 bg-[#FAFAF8]">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#0047BA]">Brand Assets</h2>
					<div className="max-w-4xl mx-auto">
						<div className="grid md:grid-cols-2 gap-8">
							<div className="rounded-[12px] p-8 border border-[#B0C6EA] bg-white">
								<div className="size-16 rounded-2xl bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center mb-4">
									<ImageIcon className="size-8" />
								</div>
								<h3 className="text-xl font-semibold mb-2">Logos &amp; Icons</h3>
								<p className="text-[var(--multroid-grey-dark)] mb-6">
									Official Notiva and Multroid logos in SVG, PNG, and various sizes.
								</p>
								<button className="inline-flex items-center gap-2 text-[#0047BA] font-medium hover:underline" disabled>
									<Download className="size-4" />
									Coming Soon
								</button>
							</div>

							<div className="rounded-[12px] p-8 border border-[#B0C6EA] bg-white">
								<div className="size-16 rounded-2xl bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center mb-4">
									<FileText className="size-8" />
								</div>
								<h3 className="text-xl font-semibold mb-2">Brand Guidelines</h3>
								<p className="text-[var(--multroid-grey-dark)] mb-6">
									Usage rules, typography, colour palette, and spacing for Multroid brands.
								</p>
								<button className="inline-flex items-center gap-2 text-[#0047BA] font-medium hover:underline" disabled>
									<Download className="size-4" />
									Coming Soon
								</button>
							</div>
						</div>

						{/* Color Palette */}
						<div className="mt-8 rounded-[12px] p-8 border border-[#B0C6EA] bg-white">
							<h3 className="text-xl font-semibold mb-6">Notiva Color Palette</h3>
							<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
								<div>
									<div className="h-16 rounded-lg bg-[#0047BA] mb-2" />
									<p className="text-xs font-mono text-[var(--multroid-grey-dark)]">Notiva Blue</p>
									<p className="text-xs font-mono text-[var(--multroid-grey)]">#0047BA</p>
								</div>
								<div>
									<div className="h-16 rounded-lg bg-[#0033A1] mb-2" />
									<p className="text-xs font-mono text-[var(--multroid-grey-dark)]">Multroid Blue</p>
									<p className="text-xs font-mono text-[var(--multroid-grey)]">#0033A1</p>
								</div>
								<div>
									<div className="h-16 rounded-lg bg-[#F05627] mb-2" />
									<p className="text-xs font-mono text-[var(--multroid-grey-dark)]">Orange CTA</p>
									<p className="text-xs font-mono text-[var(--multroid-grey)]">#F05627</p>
								</div>
								<div>
									<div className="h-16 rounded-lg bg-[#F0EEE9] border mb-2" />
									<p className="text-xs font-mono text-[var(--multroid-grey-dark)]">Off-White</p>
									<p className="text-xs font-mono text-[var(--multroid-grey)]">#F0EEE9</p>
								</div>
								<div>
									<div className="h-16 rounded-lg bg-[#101113] mb-2" />
									<p className="text-xs font-mono text-[var(--multroid-grey-dark)]">Black</p>
									<p className="text-xs font-mono text-[var(--multroid-grey)]">#101113</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Company Facts */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto rounded-[12px] p-8 border border-[#B0C6EA] bg-white">
						<h2 className="text-2xl font-bold mb-8 text-center text-[#0047BA]">Company Facts</h2>
						<div className="grid sm:grid-cols-2 gap-6">
							<div>
								<h3 className="font-semibold mb-1">Company</h3>
								<p className="text-[var(--multroid-grey-dark)]">Multroid</p>
							</div>
							<div>
								<h3 className="font-semibold mb-1">Founded</h3>
								<p className="text-[var(--multroid-grey-dark)]">2024</p>
							</div>
							<div>
								<h3 className="font-semibold mb-1">Products</h3>
								<p className="text-[var(--multroid-grey-dark)]">Notiva, Hoomara</p>
							</div>
							<div>
								<h3 className="font-semibold mb-1">Industry</h3>
								<p className="text-[var(--multroid-grey-dark)]">AI Software / SaaS</p>
							</div>
							<div>
								<h3 className="font-semibold mb-1">Data Hosting</h3>
								<p className="text-[var(--multroid-grey-dark)]">Germany (GDPR compliant)</p>
							</div>
							<div>
								<h3 className="font-semibold mb-1">Website</h3>
								<p>
									<Link
										href="https://multroid.com"
										className="text-[#0047BA] hover:underline"
										target="_blank"
										rel="noopener noreferrer"
									>
										multroid.com
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Boilerplate */}
			<section className="py-20 bg-[#FAFAF8]">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-2xl font-bold text-center mb-6 text-[#0047BA]">About Notiva (Boilerplate)</h2>
						<div className="rounded-[12px] p-8 border border-[#B0C6EA] bg-white space-y-4 text-[var(--multroid-grey-dark)]">
							<p>
								Notiva is an AI-powered financial management platform developed by Multroid. It helps
								individuals and businesses track subscriptions, documents, and critical deadlines with
								an AI co-pilot called Novi that reads invoices, detects patterns, and keeps users one
								step ahead.
							</p>
							<p>
								Multroid is a technology company building an AI-native ecosystem of software solutions
								for finance, HR, operations, and automation. Products include Notiva (financial
								management) and Hoomara (HR automation).
							</p>
							<p>
								For more information visit{" "}
								<Link href="/" className="text-[#0047BA] hover:underline">
									notiva.de
								</Link>{" "}
								or{" "}
								<Link
									href="https://multroid.com"
									className="text-[#0047BA] hover:underline"
									target="_blank"
									rel="noopener noreferrer"
								>
									multroid.com
								</Link>
								.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 bg-[#0047BA]">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#F0EEE9]">
						Questions or Interview Requests?
					</h2>
					<p className="text-xl text-[#B0C6EA] mb-8 max-w-2xl mx-auto">
						Our press team is here to help with media inquiries, interview requests, and more.
					</p>
					<NotivaButtonLink
						href="mailto:press@multroid.com"
						variant="important"
						size="lg"
					>
						Contact Press Team
					</NotivaButtonLink>
				</div>
			</section>
		</div>
	);
}
