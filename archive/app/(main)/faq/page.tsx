import { QuestionMarkCircleIcon as HelpCircle, ChevronDownIcon as ChevronDown } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const faqCategories = [
	{
		title: "Getting Started",
		questions: [
			{
				q: "What is Notiva?",
				a: "Notiva is an AI-powered financial management platform. It tracks your subscriptions, invoices, documents, and deadlines in one place \u2014 with an AI co-pilot called Novi that reads your documents and keeps you one step ahead.",
			},
			{
				q: "Is Notiva free?",
				a: "Yes! Notiva has a free-forever plan with essential features. You can track up to 10 subscriptions, get basic AI insights, and store up to 1 GB of documents. Upgrade to Pro or Family when you need more.",
			},
			{
				q: "How do I create an account?",
				a: "Click \u201CGet Started Free\u201D, enter your email, and you\u2019re in. No credit card required. You can start tracking your finances in under a minute.",
			},
		],
	},
	{
		title: "Novi AI Co-Pilot",
		questions: [
			{
				q: "What does Novi do?",
				a: "Novi is Notiva\u2019s AI assistant. It reads your invoices and receipts, detects subscription patterns, flags upcoming deadlines, finds potential savings, and gives you a daily financial brief \u2014 all automatically.",
			},
			{
				q: "How does Novi read my invoices?",
				a: "Upload or forward documents to Notiva. Novi uses AI to extract amounts, due dates, vendors, and categories. It then organizes everything in your dashboard and sets up reminders automatically.",
			},
			{
				q: "Is Novi available on the free plan?",
				a: "Basic Novi insights are included in the free plan. The full AI co-pilot with daily briefs, savings suggestions, and pattern detection is available on Pro and Family plans.",
			},
		],
	},
	{
		title: "Privacy & Security",
		questions: [
			{
				q: "Is my data secure?",
				a: "Absolutely. We use AES-256 encryption for all data at rest and in transit. Notiva is GDPR compliant by design, and all data is hosted in Germany. We never sell your data \u2014 ever.",
			},
			{
				q: "Where is my data stored?",
				a: "All data is hosted on servers in Germany, ensuring compliance with EU data protection regulations.",
			},
			{
				q: "Can Notiva connect to my bank account?",
				a: "Yes! Notiva supports secure bank connections through trusted open banking providers. This lets you automatically import transactions, track balances, and get real-time financial insights \u2014 all while keeping your credentials safe with bank-grade encryption.",
			},
		],
	},
	{
		title: "Plans & Billing",
		questions: [
			{
				q: "Can I switch plans later?",
				a: "Yes, upgrade or downgrade anytime from your account settings. Changes take effect at your next billing cycle.",
			},
			{
				q: "What payment methods do you accept?",
				a: "We accept all major credit/debit cards and SEPA direct debit via Stripe.",
			},
			{
				q: "Can I cancel anytime?",
				a: "Absolutely. No contracts, no cancellation fees. You keep access until the end of your billing period.",
			},
			{
				q: "Is there a free trial for Pro?",
				a: "The Free plan is yours forever. When you\u2019re ready, Pro includes a 14-day free trial so you can experience the full feature set risk-free.",
			},
		],
	},
	{
		title: "Features & Integrations",
		questions: [
			{
				q: "Can I sync with my calendar?",
				a: "Yes! Notiva integrates with Google Calendar, Microsoft Outlook, and Apple Calendar. Subscription renewals and deadlines appear on your calendar with customizable reminders.",
			},
			{
				q: "Does Notiva work on mobile?",
				a: "Yes. Notiva has a fully responsive web app that works on any device, plus a dedicated mobile experience optimized for iOS and Android browsers.",
			},
			{
				q: "What\u2019s Notiva for Business?",
				a: "Notiva for Business is an upcoming plan for teams and companies. It includes multi-seat workspaces, role-based access, company-wide analytics, and enterprise integrations. Join the waitlist on our Business page.",
			},
		],
	},
];

export default function FAQPage() {
	return (
		<div className="min-h-screen">
			{/* Hero */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-[#D9E3F5] text-[#0047BA] ring-1 ring-[#B0C6EA] mb-6">
						<HelpCircle className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#0047BA]">
						Frequently Asked Questions
					</h1>
					<p className="text-xl text-[var(--multroid-grey-dark)] max-w-2xl mx-auto">
						Everything you need to know about Notiva. Can&apos;t find your answer?{" "}
						<Link href="/contact" className="text-[#0047BA] hover:underline font-medium">
							Contact us
						</Link>.
					</p>
				</div>
			</section>

			{/* FAQ Sections */}
			<section className="py-12">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto space-y-12">
						{faqCategories.map((category) => (
							<div key={category.title}>
								<h2 className="text-2xl font-bold mb-6 text-[#0047BA]">{category.title}</h2>
								<div className="space-y-4">
									{category.questions.map((faq) => (
										<details
											key={faq.q}
											className="group rounded-[12px] border border-[#B0C6EA] bg-white"
										>
											<summary className="flex items-center justify-between cursor-pointer p-6 font-semibold select-none">
												<span>{faq.q}</span>
												<ChevronDown className="size-5 text-[#0047BA] shrink-0 ml-4 transition-transform group-open:rotate-180" />
											</summary>
											<div className="px-6 pb-6 text-[var(--multroid-grey-dark)] leading-relaxed">
												{faq.a}
											</div>
										</details>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 bg-[#0047BA]">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4 text-[#F0EEE9]">Still have questions?</h2>
					<p className="text-xl text-[#B0C6EA] mb-8 max-w-2xl mx-auto">
						Our support team is happy to help.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button asChild variant="important" size="lg">
							<Link href="/contact">Contact Support</Link>
						</Button>
						<Button asChild variant="secondary" size="lg">
							<Link href="/help">Help Center</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
