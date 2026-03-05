import {
  BuildingOfficeIcon as Building,
  UserGroupIcon as Users,
  ShieldCheckIcon as ShieldCheck,
  ChartBarIcon as BarChart3,
  LinkIcon as Plug,
  LockClosedIcon as Lock,
  ArrowRightIcon as ArrowRight,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { NotivaButtonLink } from "@/components/ui/notiva-button";

const businessFeatures = [
	{
		icon: Users,
		title: "Multi-Seat Workspaces",
		description:
			"Invite your entire finance team. Shared subscriptions, invoices, and documents with role-based access control.",
	},
	{
		icon: BarChart3,
		title: "Company-Wide Analytics",
		description:
			"See total spend, department breakdowns, renewal forecasts, and cost-saving opportunities across your organization.",
	},
	{
		icon: ShieldCheck,
		title: "Advanced Compliance",
		description:
			"Audit trails, SSO integration, data retention policies, and admin controls built for regulated industries.",
	},
	{
		icon: Plug,
		title: "Enterprise Integrations",
		description:
			"Connect with your ERP, accounting software, and existing toolchain via API and pre-built connectors.",
	},
	{
		icon: Lock,
		title: "Enhanced Security",
		description:
			"Everything in the personal plan plus SSO/SAML, IP allowlisting, and dedicated data processing agreements.",
	},
	{
		icon: Building,
		title: "Dedicated Support",
		description:
			"Priority onboarding, a dedicated account manager, and custom SLAs for your team.",
	},
];

export default function BusinessPage() {
	return (
		<div className="min-h-screen">
			{/* Hero */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<span className="inline-block text-xs font-semibold bg-[#D9E3F5] text-[#0047BA] px-4 py-1.5 rounded-full mb-6">
						Coming Soon
					</span>
					<h1 className="text-4xl md:text-5xl lg:text-[64px] font-black mb-6 text-[#0047BA] leading-tight">
						Notiva for Business
					</h1>
					<p className="text-xl text-[var(--multroid-grey-dark)] max-w-3xl mx-auto mb-10">
						The same AI-powered financial clarity your team needs \u2014 with multi-seat workspaces,
						company analytics, and enterprise-grade security.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<NotivaButtonLink href="mailto:sales@multroid.com" variant="primary" size="lg">
							Contact Sales
						</NotivaButtonLink>
						<NotivaButtonLink href="/features" variant="secondary" size="lg">
							See All Features
						</NotivaButtonLink>
					</div>
				</div>
			</section>

			{/* Why Business */}
			<section className="py-20 bg-[#FAFAF8]">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-[#0047BA] mb-4">Built for teams that need clarity at scale</h2>
						<p className="text-[var(--multroid-grey-dark)] max-w-2xl mx-auto">
							Notiva for Business extends everything from the personal plan with features
							designed for finance teams, operations, and leadership.
						</p>
					</div>
					<div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{businessFeatures.map((feature) => (
							<div
								key={feature.title}
								className="rounded-[12px] p-8 border border-[#B0C6EA] bg-white hover:shadow-lg transition-shadow"
							>
								<div className="size-14 rounded-[12px] bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center mb-4">
									<feature.icon className="size-7" />
								</div>
								<h3 className="text-lg font-bold mb-2">{feature.title}</h3>
								<p className="text-sm text-[var(--multroid-grey-dark)] leading-relaxed">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* How It Differs */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold text-center mb-12 text-[#0047BA]">
							Personal vs. Business
						</h2>
						<div className="rounded-[12px] border border-[#B0C6EA] bg-white overflow-hidden">
							<table className="w-full text-sm">
								<thead>
									<tr className="bg-[#D9E3F5]">
										<th className="text-left p-4 font-semibold text-[#0047BA]">Feature</th>
										<th className="text-center p-4 font-semibold text-[#0047BA]">Personal</th>
										<th className="text-center p-4 font-semibold text-[#0047BA]">Business</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-[#B0C6EA]/50">
									{[
										["Novi AI Co-Pilot", "\u2713", "\u2713"],
										["Subscription & Invoice Tracking", "\u2713", "\u2713"],
										["Document Vault", "10 GB", "Unlimited"],
										["Calendar Sync", "\u2713", "\u2713"],
										["Team Members", "1", "Unlimited"],
										["Role-Based Access", "\u2014", "\u2713"],
										["Company-Wide Analytics", "\u2014", "\u2713"],
										["SSO / SAML", "\u2014", "\u2713"],
										["API Access", "\u2014", "\u2713"],
										["Dedicated Account Manager", "\u2014", "\u2713"],
									].map(([feature, personal, business]) => (
										<tr key={feature} className="hover:bg-[#FAFAF8]">
											<td className="p-4 text-[var(--multroid-grey-dark)]">{feature}</td>
											<td className="p-4 text-center">{personal}</td>
											<td className="p-4 text-center font-medium text-[#0047BA]">{business}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>

			{/* Early Access */}
			<section className="py-20 bg-[#FAFAF8]">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto rounded-[12px] p-8 md:p-12 border-2 border-[#0047BA] bg-white text-center">
						<h2 className="text-2xl font-bold mb-4 text-[#0047BA]">Get Early Access</h2>
						<p className="text-[var(--multroid-grey-dark)] mb-8 max-w-xl mx-auto">
							Notiva for Business is currently in development. Join the waitlist to be the first to know
							when it launches and get exclusive early-adopter pricing.
						</p>
						<div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
							<input
								type="email"
								placeholder="Work email address"
								className="flex-1 px-4 py-3 rounded-[8px] text-sm bg-white border border-[#B0C6EA] text-[#0047BA] placeholder:text-[var(--multroid-grey)] focus:border-[#0047BA] focus:outline-none"
							/>
							<button className="inline-flex items-center justify-center gap-2 bg-[#0047BA] text-[#F0EEE9] font-semibold px-6 py-3 rounded-[8px] hover:bg-[#003995] transition-colors whitespace-nowrap">
								Join Waitlist
								<ArrowRight className="size-4" />
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 bg-[#0047BA]">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#F0EEE9]">
						Questions about Notiva for Business?
					</h2>
					<p className="text-xl text-[#B0C6EA] mb-8 max-w-2xl mx-auto">
						Talk to our sales team about pricing, custom requirements, and how Notiva can fit your organization.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<NotivaButtonLink href="mailto:sales@multroid.com" variant="important" size="lg">
							Contact Sales
						</NotivaButtonLink>
						<NotivaButtonLink href="/pricing" variant="secondary" size="lg">
							View Personal Plans
						</NotivaButtonLink>
					</div>
				</div>
			</section>
		</div>
	);
}
