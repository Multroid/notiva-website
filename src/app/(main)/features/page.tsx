import {
  LightBulbIcon as Brain,
  BellIcon as Bell,
  DocumentTextIcon as FileText,
  CalendarDaysIcon as CalendarDays,
  ChartBarIcon as BarChart3,
  ShieldCheckIcon as Shield,
  LinkIcon as Plug,
  ReceiptPercentIcon as Receipt,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMainAppRegisterUrl } from "@/lib/app-url";

const features = [
	{
		icon: Brain,
		title: "Novi \u2014 AI Co-Pilot",
		description:
			"Novi reads your invoices, detects subscription patterns, flags upcoming deadlines, and suggests ways to save \u2014 all automatically.",
		highlight: true,
	},
	{
		icon: Receipt,
		title: "Invoice & Document Scanning",
		description:
			"Upload or forward receipts and invoices. Novi extracts amounts, due dates, and vendors instantly.",
	},
	{
		icon: Bell,
		title: "Smart Reminders",
		description:
			"Never miss a renewal or payment deadline. Get reminders via push, email, or calendar \u2014 customized to your preferences.",
	},
	{
		icon: BarChart3,
		title: "Financial Dashboard",
		description:
			"See your available balance, monthly cash flow, upcoming payments, and subscription costs in one clear view.",
	},
	{
		icon: FileText,
		title: "Document Vault",
		description:
			"Securely store bills, contracts, and tax documents. Everything searchable and organized by category.",
	},
	{
		icon: CalendarDays,
		title: "Calendar Sync",
		description:
			"Sync deadlines and renewals to Google Calendar, Outlook, or Apple Calendar with one click.",
	},
	{
		icon: Plug,
		title: "Integrations",
		description:
			"Connect your email, bank feeds, and the tools you already use. Notiva fits into your existing workflow.",
	},
	{
		icon: Shield,
		title: "Security & Privacy",
		description:
			"AES-256 encryption, GDPR compliant by design, data hosted in Germany. Zero data selling \u2014 ever.",
	},
];

export default function FeaturesPage() {
	return (
		<div className="min-h-screen">
			{/* Hero */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="bg-[#FEFDFD] border-2 border-[#B0C6EA] rounded-[12px] px-[16px] py-[8px] inline-block mb-6">
						<p className="text-[12px] font-normal leading-[18px] text-[#0033A1]">
							Everything you need in one place
						</p>
					</div>
					<h1 className="text-4xl md:text-5xl lg:text-[64px] font-black mb-6 text-[#0047BA] leading-tight">
						Features that keep you<br />one step ahead
					</h1>
					<p className="text-xl text-[var(--multroid-grey-dark)] max-w-3xl mx-auto mb-10">
						Notiva combines AI-powered document reading, smart reminders, and a financial dashboard
						into one platform \u2014 so you never miss a deadline or overpay again.
					</p>
					<Button asChild variant="primary" size="lg">
						<Link href={getMainAppRegisterUrl()}>Start for free</Link>
					</Button>
				</div>
			</section>

			{/* Features Grid */}
			<section className="py-20 bg-[#FAFAF8]">
				<div className="container mx-auto px-4">
					<div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
						{features.map((feature) => (
							<div
								key={feature.title}
								className={`rounded-[12px] p-8 bg-white border ${
									feature.highlight
										? "border-[#0047BA] ring-1 ring-[#0047BA]/10"
										: "border-[#B0C6EA]"
								} hover:shadow-lg transition-shadow`}
							>
								<div className="flex items-start gap-5">
									<div
										className={`size-14 rounded-[12px] flex items-center justify-center shrink-0 ${
											feature.highlight
												? "bg-[#0047BA] text-white"
												: "bg-[#D9E3F5] text-[#0047BA]"
										}`}
									>
										<feature.icon className="size-7" />
									</div>
									<div>
										{feature.highlight && (
											<span className="text-xs font-semibold text-[#F05627] uppercase mb-1 block">
												Powered by AI
											</span>
										)}
										<h3 className="text-xl font-bold mb-2">{feature.title}</h3>
										<p className="text-[var(--multroid-grey-dark)] leading-relaxed">
											{feature.description}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Trust Strip */}
			<section className="py-12 border-y border-[#B0C6EA]">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap items-center justify-center gap-8 text-[12px] text-[#0047BA]">
						<span>GDPR compliant by design</span>
						<span className="w-[2px] h-[16px] bg-[#0047BA]" />
						<span>AES-256 encryption</span>
						<span className="w-[2px] h-[16px] bg-[#0047BA]" />
						<span>Data hosted in Germany</span>
						<span className="w-[2px] h-[16px] bg-[#0047BA]" />
						<span>Zero data selling</span>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 bg-[#0047BA]">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#F0EEE9]">
						Ready to take control?
					</h2>
					<p className="text-xl text-[#B0C6EA] mb-8 max-w-2xl mx-auto">
						Join Notiva for free and let Novi handle the details.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button asChild variant="important" size="lg">
							<Link href={getMainAppRegisterUrl()}>Get Started Free</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
