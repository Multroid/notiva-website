import { QuestionMarkCircleIcon as HelpCircle, BookOpenIcon as BookOpen, ChatBubbleLeftRightIcon as MessageSquare, VideoCameraIcon as Video, MagnifyingGlassIcon as Search, DocumentMagnifyingGlassIcon as FileQuestion, BoltIcon as Zap, UserGroupIcon as Users, ShieldCheckIcon as Shield } from "@heroicons/react/24/solid";
import Link from "next/link";
import { NotivaButtonLink } from "@/components/ui/notiva-button";
import { Input } from "@/components/ui/input";

export default function HelpPage() {
	const popularArticles = [
		{
			title: "Getting Started with Notiva",
			category: "Getting Started",
			description: "Learn the basics and set up your account in minutes.",
		},
		{
			title: "How Novi Reads Your Invoices",
			category: "AI Features",
			description: "Understand how Notiva\u2019s AI co-pilot processes your documents.",
		},
		{
			title: "Setting Up Smart Reminders",
			category: "Reminders",
			description: "Never miss a renewal with custom reminder settings.",
		},
		{
			title: "Connecting Your Calendar",
			category: "Integrations",
			description: "Sync with Google Calendar, Outlook, or Apple Calendar.",
		},
		{
			title: "Understanding Your Financial Dashboard",
			category: "Analytics",
			description: "Get insights into your spending patterns and trends.",
		},
		{
			title: "Data Privacy &amp; Security",
			category: "Security",
			description: "How we protect your data with GDPR compliance and AES-256 encryption.",
		},
	];

	const categories = [
		{ icon: Zap, title: "Getting Started", description: "New to Notiva? Start here.", articleCount: 8 },
		{ icon: FileQuestion, title: "Subscriptions", description: "Managing your subscriptions", articleCount: 15 },
		{ icon: Shield, title: "Security & Privacy", description: "How we protect your data", articleCount: 6 },
		{ icon: Users, title: "Team Features", description: "Collaboration and workspaces", articleCount: 12 },
		{ icon: MessageSquare, title: "Integrations", description: "Connecting external services", articleCount: 10 },
		{ icon: BookOpen, title: "Billing & Plans", description: "Pricing and payment questions", articleCount: 7 },
	];

	return (
		<div className="min-h-screen">
			{/* Hero */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-[#D9E3F5] text-[#0047BA] ring-1 ring-[#B0C6EA] mb-6">
						<HelpCircle className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#0047BA]">Help Center</h1>
					<p className="text-xl text-[var(--multroid-grey-dark)] max-w-2xl mx-auto mb-8">
						Find answers, learn about features, and get the most out of Notiva.
					</p>

					{/* Search */}
					<div className="max-w-2xl mx-auto relative">
						<Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#0047BA]/50" />
						<Input
							type="search"
							placeholder="Search for help articles..."
							className="pl-12 h-14 text-lg border-[#B0C6EA] focus:border-[#0047BA] rounded-[12px]"
						/>
					</div>
				</div>
			</section>

			{/* Quick Help */}
			<section className="py-12 border-b border-[#B0C6EA]">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
						<div className="rounded-[12px] p-6 border border-[#B0C6EA] bg-white hover:shadow-lg transition-shadow">
							<div className="size-12 rounded-lg bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center mb-4">
								<BookOpen className="size-6" />
							</div>
							<h3 className="font-semibold mb-2">Browse Guides</h3>
							<p className="text-sm text-[var(--multroid-grey-dark)]">
								Complete documentation and tutorials
							</p>
						</div>

						<Link href="/contact" className="rounded-[12px] p-6 border border-[#B0C6EA] bg-white hover:shadow-lg transition-shadow">
							<div className="size-12 rounded-lg bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center mb-4">
								<MessageSquare className="size-6" />
							</div>
							<h3 className="font-semibold mb-2">Contact Support</h3>
							<p className="text-sm text-[var(--multroid-grey-dark)]">
								Get help from our support team
							</p>
						</Link>

						<div className="rounded-[12px] p-6 border border-[#B0C6EA] bg-white hover:shadow-lg transition-shadow">
							<div className="size-12 rounded-lg bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center mb-4">
								<Video className="size-6" />
							</div>
							<h3 className="font-semibold mb-2">Video Tutorials</h3>
							<p className="text-sm text-[var(--multroid-grey-dark)]">
								Watch step-by-step video guides
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Popular Articles */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#0047BA]">Popular Articles</h2>
					<div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
						{popularArticles.map((article) => (
							<div key={article.title} className="rounded-[12px] p-6 border border-[#B0C6EA] bg-white hover:shadow-lg transition-shadow">
								<div className="flex items-start gap-3">
									<FileQuestion className="size-5 text-[#0047BA] shrink-0 mt-1" />
									<div>
										<span className="text-xs font-semibold text-[#F05627] uppercase">{article.category}</span>
										<h3 className="font-semibold mt-1 mb-2">{article.title}</h3>
										<p className="text-sm text-[var(--multroid-grey-dark)]" dangerouslySetInnerHTML={{ __html: article.description }} />
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Browse by Category */}
			<section className="py-20 bg-[#FAFAF8]">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#0047BA]">Browse by Category</h2>
					<div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{categories.map((category) => {
							const Icon = category.icon;
							return (
								<div key={category.title} className="rounded-[12px] p-6 border border-[#B0C6EA] bg-white hover:shadow-lg transition-shadow">
									<div className="size-12 rounded-lg bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center mb-4">
										<Icon className="size-6" />
									</div>
									<h3 className="font-semibold mb-2">{category.title}</h3>
									<p className="text-sm text-[var(--multroid-grey-dark)] mb-3">{category.description}</p>
									<p className="text-xs text-[var(--multroid-grey)]">{category.articleCount} articles</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#0047BA]">Frequently Asked Questions</h2>
					<div className="max-w-3xl mx-auto space-y-6">
						{[
							{
								q: "Is my data secure?",
								a: "Absolutely. We use AES-256 encryption, are GDPR compliant by design, and host all data in Germany. We never sell your data to third parties.",
							},
							{
								q: "What does Novi do?",
								a: "Novi is Notiva\u2019s AI co-pilot. It reads your invoices, detects subscription patterns, flags upcoming deadlines, and suggests ways to save money \u2014 all automatically.",
							},
							{
								q: "Can I sync with my calendar?",
								a: "Yes! Notiva integrates with Google Calendar, Microsoft Outlook, and Apple Calendar. Subscription renewals and deadlines appear on your calendar with customizable reminders.",
							},
							{
								q: "How do I cancel my Notiva subscription?",
								a: "You can cancel anytime from your account settings. There are no cancellation fees, and you\u2019ll retain access until the end of your billing period.",
							},
						].map((faq) => (
							<div key={faq.q} className="rounded-[12px] p-6 border border-[#B0C6EA] bg-white">
								<h3 className="font-semibold mb-2">{faq.q}</h3>
								<p className="text-[var(--multroid-grey-dark)]">{faq.a}</p>
							</div>
						))}
					</div>

					<div className="text-center mt-12">
						<p className="text-[var(--multroid-grey-dark)] mb-4">Still have questions?</p>
						<NotivaButtonLink href="/contact" variant="primary" size="lg">
							Contact Support
						</NotivaButtonLink>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 bg-[#0047BA]">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#F0EEE9]">
						Need More Help?
					</h2>
					<p className="text-xl text-[#B0C6EA] mb-8 max-w-2xl mx-auto">
						Our support team is here to help you succeed with Notiva.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<NotivaButtonLink href="/contact" variant="important" size="lg">
							Contact Support
						</NotivaButtonLink>
						<NotivaButtonLink href="/register" variant="secondary" size="lg">
							Get Started Free
						</NotivaButtonLink>
					</div>
				</div>
			</section>
		</div>
	);
}
