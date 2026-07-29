import { CheckIcon as Check } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMainAppRegisterUrl } from "@/lib/app-url";

const plans = [
	{
		name: "Free",
		price: "\u20AC0",
		period: "forever",
		description: "Get started and see what Notiva can do.",
		features: [
			"Up to 10 tracked subscriptions",
			"Basic Novi AI insights",
			"Email reminders",
			"1 GB document storage",
			"Single account",
		],
		cta: "Start for free",
		variant: "secondary" as const,
		highlighted: false,
	},
	{
		name: "Pro",
		price: "\u20AC4.99",
		period: "/month",
		description: "Full power for individuals who want complete control.",
		features: [
			"Unlimited subscriptions & invoices",
			"Full Novi AI co-pilot",
			"Push, email & calendar reminders",
			"10 GB document vault",
			"Calendar sync (Google, Outlook, Apple)",
			"Financial dashboard & analytics",
			"Priority support",
		],
		cta: "Get Pro",
		variant: "primary" as const,
		highlighted: true,
		badge: "Most Popular",
	},
	{
		name: "Family",
		price: "\u20AC9.99",
		period: "/month",
		description: "Share financial clarity with your household.",
		features: [
			"Everything in Pro",
			"Up to 5 family members",
			"Shared document vault (25 GB)",
			"Shared subscriptions & reminders",
			"Individual dashboards per member",
			"Family spending overview",
		],
		cta: "Get Family",
		variant: "primary" as const,
		highlighted: false,
	},
];

export default function PricingPage() {
	return (
		<div className="min-h-screen">
			{/* Hero */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="bg-[#FEFDFD] border-2 border-[#B0C6EA] rounded-[12px] px-[16px] py-[8px] inline-block mb-6">
						<p className="text-[12px] font-normal leading-[18px] text-[#0033A1]">
							Simple, transparent pricing
						</p>
					</div>
					<h1 className="text-4xl md:text-5xl lg:text-[64px] font-black mb-6 text-[#0047BA] leading-tight">
						Plans that grow<br />with you
					</h1>
					<p className="text-xl text-[var(--multroid-grey-dark)] max-w-2xl mx-auto">
						Start free, upgrade when you need more. No hidden fees, cancel anytime.
					</p>
				</div>
			</section>

			{/* Pricing Cards */}
			<section className="py-12 bg-[#FAFAF8]">
				<div className="container mx-auto px-4">
					<div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
						{plans.map((plan) => (
							<div
								key={plan.name}
								className={`rounded-[12px] p-8 bg-white flex flex-col ${
									plan.highlighted
										? "border-2 border-[#0047BA] ring-2 ring-[#0047BA]/10 relative"
										: "border border-[#B0C6EA]"
								}`}
							>
								{plan.badge && (
									<div className="absolute -top-3 left-1/2 -translate-x-1/2">
										<span className="bg-[#F05627] text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
											{plan.badge}
										</span>
									</div>
								)}
								<div className="mb-6">
									<h3 className="text-xl font-bold mb-2">{plan.name}</h3>
									<div className="flex items-baseline gap-1">
										<span className="text-4xl font-black text-[#0047BA]">{plan.price}</span>
										<span className="text-[var(--multroid-grey)]">{plan.period}</span>
									</div>
									<p className="text-sm text-[var(--multroid-grey-dark)] mt-2">{plan.description}</p>
								</div>

								<ul className="space-y-3 mb-8 flex-1">
									{plan.features.map((feature) => (
										<li key={feature} className="flex items-start gap-3 text-sm">
											<Check className="size-4 text-[#009966] shrink-0 mt-0.5" />
											<span className="text-[var(--multroid-grey-dark)]">{feature}</span>
										</li>
									))}
								</ul>

								<Button asChild variant={plan.variant} size="lg" fullWidth>
									<Link href={getMainAppRegisterUrl()}>{plan.cta}</Link>
								</Button>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Business Teaser */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto rounded-[12px] p-8 md:p-12 border border-[#B0C6EA] bg-white text-center">
						<span className="inline-block text-xs font-semibold bg-[#D9E3F5] text-[#0047BA] px-3 py-1 rounded-full mb-4">
							Coming Soon
						</span>
						<h2 className="text-2xl font-bold mb-4 text-[#0047BA]">Notiva for Business</h2>
						<p className="text-[var(--multroid-grey-dark)] mb-6 max-w-xl mx-auto">
							Multi-seat workspaces, role-based access, company-wide analytics, and advanced integrations.
							Built for teams that need financial clarity at scale.
						</p>
						<Button asChild variant="secondary" size="lg">
							<Link href="/business">Learn More</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className="py-20 bg-[#FAFAF8]">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#0047BA]">Pricing FAQ</h2>
					<div className="max-w-3xl mx-auto space-y-6">
						{[
							{ q: "Can I switch plans later?", a: "Yes, upgrade or downgrade anytime. Changes take effect at your next billing cycle." },
							{ q: "Is there a free trial for Pro?", a: "The Free plan is yours forever. When you\u2019re ready for more, Pro includes a 14-day free trial." },
							{ q: "What payment methods do you accept?", a: "We accept all major credit/debit cards and SEPA direct debit via Stripe." },
							{ q: "Can I cancel anytime?", a: "Absolutely. No contracts, no cancellation fees. You keep access until the end of your billing period." },
						].map((faq) => (
							<div key={faq.q} className="rounded-[12px] p-6 border border-[#B0C6EA] bg-white">
								<h3 className="font-semibold mb-2">{faq.q}</h3>
								<p className="text-[var(--multroid-grey-dark)]">{faq.a}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 bg-[#0047BA]">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#F0EEE9]">
						Start free. Upgrade when ready.
					</h2>
					<p className="text-xl text-[#B0C6EA] mb-8 max-w-2xl mx-auto">
						No credit card required. Get started in under a minute.
					</p>
					<Button asChild variant="important" size="lg">
						<Link href={getMainAppRegisterUrl()}>Get Started Free</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}
