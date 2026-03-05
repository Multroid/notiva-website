import { RocketLaunchIcon as Rocket, SparklesIcon as Sparkles, BugAntIcon as Bug, WrenchIcon as Wrench } from "@heroicons/react/24/solid";
import { NotivaButtonLink } from "@/components/ui/notiva-button";
import { getMainAppRegisterUrl } from "@/lib/app-url";

type ChangeType = "feature" | "improvement" | "fix";

const releases: {
	version: string;
	date: string;
	title: string;
	changes: { type: ChangeType; text: string }[];
}[] = [
	{
		version: "1.0.0",
		date: "April 2026",
		title: "Notiva Public Launch",
		changes: [
			{ type: "feature", text: "Subscription and invoice tracking with automatic categorization" },
			{ type: "feature", text: "Document vault with 1 GB free storage and drag-and-drop upload" },
			{ type: "feature", text: "Secure bank connections via open banking providers" },
			{ type: "feature", text: "Email reminders for upcoming renewals and deadlines" },
			{ type: "feature", text: "Financial dashboard with available balance, cash flow, and spending breakdowns" },
			{ type: "feature", text: "Novi AI co-pilot \u2014 reads invoices, detects patterns, and flags upcoming deadlines" },
			{ type: "feature", text: "Free, Pro, and Family pricing plans" },
		],
	},
];

const typeConfig: Record<ChangeType, { icon: typeof Sparkles; label: string; color: string; bg: string }> = {
	feature: { icon: Sparkles, label: "New", color: "text-[#0047BA]", bg: "bg-[#D9E3F5]" },
	improvement: { icon: Wrench, label: "Improved", color: "text-[#009966]", bg: "bg-[#E6F5EE]" },
	fix: { icon: Bug, label: "Fixed", color: "text-[#F05627]", bg: "bg-[#FEE9EB]" },
};

export default function ChangelogPage() {
	return (
		<div className="min-h-screen">
			{/* Hero */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-[#D9E3F5] text-[#0047BA] ring-1 ring-[#B0C6EA] mb-6">
						<Rocket className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#0047BA]">Changelog</h1>
					<p className="text-xl text-[var(--multroid-grey-dark)] max-w-2xl mx-auto">
						Every release, feature, and fix. See what&apos;s new in Notiva.
					</p>
				</div>
			</section>

			{/* Timeline */}
			<section className="py-12">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto">
						{releases.map((release, i) => (
							<div key={release.version} className="relative pb-12 last:pb-0">
								{/* Timeline line */}
								{i < releases.length - 1 && (
									<div className="absolute left-[19px] top-[48px] bottom-0 w-[2px] bg-[#B0C6EA]" />
								)}

								{/* Version dot */}
								<div className="flex items-start gap-6">
									<div className="size-10 rounded-full bg-[#0047BA] text-white flex items-center justify-center shrink-0 text-xs font-bold z-10">
										{release.version.split(".")[1]}
									</div>

									<div className="flex-1 rounded-[12px] border border-[#B0C6EA] bg-white p-6">
										<div className="flex flex-wrap items-center gap-3 mb-3">
											<span className="text-xs font-mono font-semibold bg-[#D9E3F5] text-[#0047BA] px-2 py-1 rounded">
												v{release.version}
											</span>
											<span className="text-sm text-[var(--multroid-grey)]">{release.date}</span>
										</div>
										<h3 className="text-xl font-bold mb-4">{release.title}</h3>
										<ul className="space-y-3">
											{release.changes.map((change, j) => {
												const config = typeConfig[change.type];
												const Icon = config.icon;
												return (
													<li key={j} className="flex items-start gap-3">
														<span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded shrink-0 mt-0.5 ${config.bg} ${config.color}`}>
															<Icon className="size-3" />
															{config.label}
														</span>
														<span className="text-sm text-[var(--multroid-grey-dark)]">{change.text}</span>
													</li>
												);
											})}
										</ul>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 bg-[#0047BA]">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4 text-[#F0EEE9]">Try the latest version</h2>
					<p className="text-xl text-[#B0C6EA] mb-8 max-w-2xl mx-auto">
						Every update makes Notiva smarter. Start free and experience it yourself.
					</p>
					<NotivaButtonLink href={getMainAppRegisterUrl()} variant="important" size="lg">
						Get Started Free
					</NotivaButtonLink>
				</div>
			</section>
		</div>
	);
}
