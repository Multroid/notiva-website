import { ViewfinderCircleIcon as Target, UserGroupIcon as Users, BoltIcon as Zap, GlobeAltIcon as Globe, HeartIcon as Heart, BuildingOfficeIcon as Building, ShieldCheckIcon as Shield } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { NotivaButtonLink } from "@/components/ui/notiva-button";

export default function CompanyPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 mb-6 overflow-hidden">
						<Image
							src="/Multroid-assets/Multroid Logo Social 600.svg"
							alt="Multroid Logo"
							width={64}
							height={64}
							className="size-16 rounded-2xl"
						/>
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#0047BA]">
						Built by Multroid
					</h1>
					<p className="text-xl text-[var(--multroid-grey-dark)] max-w-3xl mx-auto mb-8">
						Multroid is the AI operating layer for modern companies — an ecosystem of intelligent products
						that replaces fragmented tools with one unified, AI-driven experience.
					</p>
					<NotivaButtonLink
						href="https://multroid.com"
						target="_blank"
						rel="noopener noreferrer"
						variant="secondary"
						size="lg"
					>
						Visit Multroid.com
					</NotivaButtonLink>
				</div>
			</section>

			{/* Mission */}
			<section className="py-20 bg-[#FAFAF8]">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-3xl font-bold mb-6 text-[#0047BA]">Our Mission</h2>
						<p className="text-lg text-[var(--multroid-grey-dark)] leading-relaxed">
							Building an AI-native ecosystem of software solutions that simplify how companies
							manage finance, people, operations, and automation. We believe fragmented tooling
							slows teams down — so we&apos;re replacing it with one intelligent platform.
						</p>
					</div>
				</div>
			</section>

			{/* Values */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#0047BA]">What Drives Us</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
						<div className="rounded-[12px] p-6 border border-[#B0C6EA] bg-white">
							<div className="size-12 rounded-lg bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center mb-4">
								<Target className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">AI-Native Thinking</h3>
							<p className="text-[var(--multroid-grey-dark)]">
								Every product is built with AI at its core — not bolted on as an afterthought.
								Intelligence is woven into every workflow.
							</p>
						</div>

						<div className="rounded-[12px] p-6 border border-[#B0C6EA] bg-white">
							<div className="size-12 rounded-lg bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center mb-4">
								<Users className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">User-First Design</h3>
							<p className="text-[var(--multroid-grey-dark)]">
								We start with real problems people face, then build solutions that genuinely
								simplify their work and personal lives.
							</p>
						</div>

						<div className="rounded-[12px] p-6 border border-[#B0C6EA] bg-white">
							<div className="size-12 rounded-lg bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center mb-4">
								<Shield className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Privacy &amp; Trust</h3>
							<p className="text-[var(--multroid-grey-dark)]">
								GDPR compliant by design, AES-256 encryption, data hosted in Germany.
								We never sell user data — trust is non-negotiable.
							</p>
						</div>

						<div className="rounded-[12px] p-6 border border-[#B0C6EA] bg-white">
							<div className="size-12 rounded-lg bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center mb-4">
								<Zap className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Unified Experience</h3>
							<p className="text-[var(--multroid-grey-dark)]">
								One ecosystem instead of dozens of disconnected tools. Our products work
								together seamlessly so teams spend less time switching context.
							</p>
						</div>

						<div className="rounded-[12px] p-6 border border-[#B0C6EA] bg-white">
							<div className="size-12 rounded-lg bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center mb-4">
								<Globe className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Accessibility</h3>
							<p className="text-[var(--multroid-grey-dark)]">
								Great software should be available to everyone. Every Multroid product
								offers a generous free tier to get started.
							</p>
						</div>

						<div className="rounded-[12px] p-6 border border-[#B0C6EA] bg-white">
							<div className="size-12 rounded-lg bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center mb-4">
								<Heart className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Sustainable Growth</h3>
							<p className="text-[var(--multroid-grey-dark)]">
								We build for the long term — sustainable business, lasting value for users,
								and products that get better every day.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* The Ecosystem */}
			<section className="py-20 bg-[#FAFAF8]">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#0047BA]">The Multroid Ecosystem</h2>
					<div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
						<div className="rounded-[12px] p-8 border border-[#0047BA] bg-white">
							<div className="flex items-center gap-3 mb-4">
								<div className="bg-[#0047BA] rounded-[8px] p-[8px] flex items-center justify-center overflow-hidden">
									<Image
										src="/Logo/Notiva Logo transparent white.svg"
										alt="Notiva"
										width={24}
										height={24}
									/>
								</div>
								<span className="text-xl font-bold text-[#0047BA]">Notiva</span>
							</div>
							<p className="text-[var(--multroid-grey-dark)] mb-4">
								AI-powered platform for tracking subscriptions, documents, and critical deadlines.
								Gives individuals and businesses financial clarity and control.
							</p>
							<span className="inline-block text-xs font-medium bg-[#D9E3F5] text-[#0047BA] px-3 py-1 rounded-full">
								Live
							</span>
						</div>

						<div className="rounded-[12px] p-8 border border-[#B0C6EA] bg-white">
							<div className="flex items-center gap-3 mb-4">
								<div className="bg-[#0047BA] rounded-[8px] p-[8px] flex items-center justify-center">
									<Building className="size-6 text-white" />
								</div>
								<span className="text-xl font-bold text-[#0047BA]">Hoomara</span>
							</div>
							<p className="text-[var(--multroid-grey-dark)] mb-4">
								Intelligent HR platform that automates administrative workflows,
								so teams can focus on people, not paperwork.
							</p>
							<span className="inline-block text-xs font-medium bg-[#F3F4F4] text-[var(--multroid-grey-dark)] px-3 py-1 rounded-full">
								Coming Soon
							</span>
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
								<h3 className="font-semibold mb-1">Industry</h3>
								<p className="text-[var(--multroid-grey-dark)]">AI Software / SaaS</p>
							</div>
							<div>
								<h3 className="font-semibold mb-1">Focus</h3>
								<p className="text-[var(--multroid-grey-dark)]">Finance, HR, Operations &amp; Automation</p>
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

			{/* CTA */}
			<section className="py-20 bg-[#0047BA]">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#F0EEE9]">
						Experience Notiva
					</h2>
					<p className="text-xl text-[#B0C6EA] mb-8 max-w-2xl mx-auto">
						See how Multroid&apos;s AI-native approach gives you financial clarity and control.
					</p>
					<NotivaButtonLink
						href="/register"
						variant="important"
						size="lg"
					>
						Get Started Free
					</NotivaButtonLink>
				</div>
			</section>
		</div>
	);
}
