import { Flag, Rocket, Users, Brain, Building, Globe } from "lucide-react";
import { NotivaButtonLink } from "@/components/ui/notiva-button";
import { getMainAppRegisterUrl } from "@/lib/app-url";

const milestones = [
	{
		date: "Q3 2026",
		icon: Brain,
		title: "Novi Daily Brief & Advanced AI",
		description: "Novi delivers AI-generated morning summaries \u2014 upcoming payments, savings tips, and financial health at a glance.",
		status: "upcoming" as const,
	},
	{
		date: "Q2 2026",
		icon: Users,
		title: "Calendar Sync & Smart Reminders",
		description: "Integration with Google Calendar, Outlook, and Apple Calendar. Customizable reminder lead times for every subscription and deadline.",
		status: "upcoming" as const,
	},
	{
		date: "April 2026",
		icon: Rocket,
		title: "Notiva Public Launch",
		description: "Notiva launches publicly with subscription tracking, document vault, bank connections, email reminders, and three pricing tiers.",
		status: "current" as const,
	},
	{
		date: "Q1 2026",
		icon: Brain,
		title: "Novi AI Co-Pilot Development",
		description: "Building Notiva\u2019s AI assistant \u2014 automatic invoice reading, pattern detection, and proactive financial insights.",
		status: "done" as const,
	},
	{
		date: "Q1 2026",
		icon: Flag,
		title: "Notiva Beta & Testing",
		description: "Internal beta launch with core features: subscription tracking, document vault, and financial dashboard. Early user feedback shapes the product.",
		status: "done" as const,
	},
	{
		date: "Q4 2025",
		icon: Globe,
		title: "Multroid Founded",
		description: "Multroid is established with a mission to build an AI-native ecosystem of software solutions for finance, HR, and operations.",
		status: "done" as const,
	},
];

const upcoming = [
	{
		icon: Building,
		title: "Notiva for Business",
		description: "Multi-seat workspaces, role-based access, company analytics, and enterprise integrations.",
		quarter: "Q4 2026",
	},
	{
		icon: Globe,
		title: "Hoomara Launch",
		description: "Multroid\u2019s second product \u2014 intelligent HR platform for administrative workflow automation.",
		quarter: "2027",
	},
];

export default function MilestonesPage() {
	return (
		<div className="min-h-screen">
			{/* Hero */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-[#D9E3F5] text-[#0047BA] ring-1 ring-[#B0C6EA] mb-6">
						<Flag className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#0047BA]">Milestones</h1>
					<p className="text-xl text-[var(--multroid-grey-dark)] max-w-2xl mx-auto">
						Our journey building Notiva \u2014 from idea to AI-powered financial platform.
					</p>
				</div>
			</section>

			{/* Timeline */}
			<section className="py-12">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto">
						{milestones.map((milestone, i) => {
							const Icon = milestone.icon;
							const isCurrent = milestone.status === "current";
							return (
								<div key={milestone.title} className="relative pb-12 last:pb-0">
									{/* Connector */}
									{i < milestones.length - 1 && (
										<div className="absolute left-[19px] top-[48px] bottom-0 w-[2px] bg-[#B0C6EA]" />
									)}

									<div className="flex items-start gap-6">
										{/* Dot */}
										<div
											className={`size-10 rounded-full flex items-center justify-center shrink-0 z-10 ${
												isCurrent
													? "bg-[#F05627] text-white ring-4 ring-[#FEE9EB]"
													: milestone.status === "upcoming"
														? "bg-[#D9E3F5] text-[#0047BA] ring-2 ring-[#B0C6EA]"
														: "bg-[#0047BA] text-white"
											}`}
										>
											<Icon className="size-5" />
										</div>

										{/* Card */}
										<div
											className={`flex-1 rounded-[12px] border p-6 ${
												isCurrent
													? "border-[#F05627] bg-white ring-1 ring-[#F05627]/10"
													: milestone.status === "upcoming"
														? "border-dashed border-[#B0C6EA] bg-white"
														: "border-[#B0C6EA] bg-white"
											}`}
										>
											<div className="flex flex-wrap items-center gap-3 mb-2">
												<span className="text-xs font-semibold bg-[#D9E3F5] text-[#0047BA] px-2 py-1 rounded">
													{milestone.date}
												</span>
												{isCurrent && (
													<span className="text-xs font-semibold bg-[#FEE9EB] text-[#F05627] px-2 py-1 rounded">
														Current
													</span>
												)}
												{milestone.status === "upcoming" && (
													<span className="text-xs font-semibold bg-[#D9E3F5] text-[#0047BA] px-2 py-1 rounded">
														Upcoming
													</span>
												)}
											</div>
											<h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
											<p className="text-[var(--multroid-grey-dark)]">{milestone.description}</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* What's Next */}
			<section className="py-20 bg-[#FAFAF8]">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#0047BA]">What&apos;s Next</h2>
					<div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
						{upcoming.map((item) => {
							const Icon = item.icon;
							return (
								<div key={item.title} className="rounded-[12px] p-8 border-2 border-dashed border-[#B0C6EA] bg-white">
									<div className="flex items-center gap-3 mb-4">
										<div className="size-12 rounded-[12px] bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center">
											<Icon className="size-6" />
										</div>
										<span className="text-xs font-semibold bg-[#D9E3F5] text-[#0047BA] px-2 py-1 rounded">
											{item.quarter}
										</span>
									</div>
									<h3 className="text-lg font-bold mb-2">{item.title}</h3>
									<p className="text-sm text-[var(--multroid-grey-dark)]">{item.description}</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 bg-[#0047BA]">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4 text-[#F0EEE9]">Be part of the journey</h2>
					<p className="text-xl text-[#B0C6EA] mb-8 max-w-2xl mx-auto">
						Join Notiva today and experience every new feature as it ships.
					</p>
					<NotivaButtonLink href={getMainAppRegisterUrl()} variant="important" size="lg">
						Get Started Free
					</NotivaButtonLink>
				</div>
			</section>
		</div>
	);
}
