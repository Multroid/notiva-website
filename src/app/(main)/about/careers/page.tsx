import { Briefcase, Heart, Zap, Users, Globe, Code } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CareersPage() {
	// Sample job openings - in production, these would come from a job board API
	const jobOpenings = [
		{
			id: 1,
			title: "Senior Full Stack Engineer",
			department: "Engineering",
			location: "Remote",
			type: "Full-time",
			description: "Help us build the next generation of subscription management tools.",
		},
		{
			id: 2,
			title: "Product Designer",
			department: "Design",
			location: "Remote",
			type: "Full-time",
			description: "Create beautiful, intuitive interfaces that delight our users.",
		},
		{
			id: 3,
			title: "Customer Success Manager",
			department: "Support",
			location: "Remote",
			type: "Full-time",
			description: "Help our customers get the most value from Notiva.",
		},
	];

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 mb-6">
						<Briefcase className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Join the Multroid Team</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
						Help us build the future of subscription management. We're looking for talented, passionate people who want to make a real impact.
					</p>
					<Button asChild size="lg">
						<Link href="#openings">View Open Positions</Link>
					</Button>
				</div>
			</section>

			{/* Why Work at Multroid */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Why Work at Multroid?</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Zap className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Make an Impact</h3>
							<p className="text-muted-foreground">
								Work on products that help thousands of people and businesses save money and time every day.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Globe className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Remote-First Culture</h3>
							<p className="text-muted-foreground">
								Work from anywhere in the world. We believe in flexibility and trust our team to do great work.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Users className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Amazing Team</h3>
							<p className="text-muted-foreground">
								Work with talented, passionate people who care about building great products and supporting each other.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Code className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Modern Tech Stack</h3>
							<p className="text-muted-foreground">
								Use the latest technologies and best practices. We invest in the tools that help you do your best work.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Heart className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Work-Life Balance</h3>
							<p className="text-muted-foreground">
								Generous PTO, flexible hours, and a culture that values your time outside of work.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Zap className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Growth Opportunities</h3>
							<p className="text-muted-foreground">
								Learn and grow with us. We provide opportunities for professional development and career advancement.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Benefits */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Benefits & Perks</h2>
					<div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-lg font-semibold mb-4">💰 Compensation & Equity</h3>
							<ul className="space-y-2 text-muted-foreground">
								<li>• Competitive salary</li>
								<li>• Equity in Multroid</li>
								<li>• Performance bonuses</li>
								<li>• Annual salary reviews</li>
							</ul>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-lg font-semibold mb-4">🏥 Health & Wellness</h3>
							<ul className="space-y-2 text-muted-foreground">
								<li>• Health insurance</li>
								<li>• Dental & vision coverage</li>
								<li>• Mental health support</li>
								<li>• Wellness stipend</li>
							</ul>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-lg font-semibold mb-4">⏰ Time Off</h3>
							<ul className="space-y-2 text-muted-foreground">
								<li>• Unlimited PTO</li>
								<li>• Company holidays</li>
								<li>• Parental leave</li>
								<li>• Sabbatical program</li>
							</ul>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-lg font-semibold mb-4">📚 Learning & Development</h3>
							<ul className="space-y-2 text-muted-foreground">
								<li>• Learning budget</li>
								<li>• Conference attendance</li>
								<li>• Online courses</li>
								<li>• Mentorship program</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Open Positions */}
			<section id="openings" className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
					<div className="max-w-4xl mx-auto space-y-6">
						{jobOpenings.length > 0 ? (
							jobOpenings.map((job) => (
								<div key={job.id} className="bg-background rounded-lg p-6 border hover:shadow-lg transition-shadow">
									<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
										<div>
											<h3 className="text-xl font-semibold mb-2">{job.title}</h3>
											<p className="text-muted-foreground mb-3">{job.description}</p>
											<div className="flex flex-wrap gap-3 text-sm">
												<span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
													{job.department}
												</span>
												<span className="px-3 py-1 rounded-full bg-muted">
													{job.location}
												</span>
												<span className="px-3 py-1 rounded-full bg-muted">
													{job.type}
												</span>
											</div>
										</div>
										<Button asChild>
											<Link href={`/about/careers/${job.id}`}>Apply Now</Link>
										</Button>
									</div>
								</div>
							))
						) : (
							<div className="text-center bg-background rounded-lg p-12 border">
								<Briefcase className="size-16 mx-auto mb-4 text-muted-foreground/50" />
								<h3 className="text-xl font-semibold mb-2">No Open Positions Right Now</h3>
								<p className="text-muted-foreground mb-6">
									We're not actively hiring at the moment, but we're always interested in hearing from talented people.
								</p>
								<Button asChild variant="outline">
									<Link href="/contact">Send Us Your Resume</Link>
								</Button>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Our Hiring Process */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Our Hiring Process</h2>
					<div className="max-w-3xl mx-auto space-y-8">
						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								1
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Application</h3>
								<p className="text-muted-foreground">
									Submit your application through our careers page. We review every application carefully.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								2
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Initial Screen</h3>
								<p className="text-muted-foreground">
									A 30-minute video call to discuss your background, experience, and what you're looking for.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								3
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Technical/Skills Assessment</h3>
								<p className="text-muted-foreground">
									Depending on the role, this might be a coding challenge, design exercise, or case study.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								4
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Team Interviews</h3>
								<p className="text-muted-foreground">
									Meet with team members you'd be working with to ensure a good cultural and technical fit.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								5
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Offer & Onboarding</h3>
								<p className="text-muted-foreground">
									If we're a mutual fit, we'll extend an offer and help you get started with comprehensive onboarding.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Ready to Join Us?
					</h2>
					<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
						Whether you see a perfect role above or want to introduce yourself, we'd love to hear from you.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button asChild size="lg" variant="secondary">
							<Link href="#openings">View Open Positions</Link>
						</Button>
						<Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
							<Link href="/contact">Get in Touch</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}

