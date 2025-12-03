import { FileText, Download, Mail, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PressPage() {
	// Sample press releases - in production, these would come from a CMS
	const pressReleases = [
		{
			id: 1,
			title: "Notiva Launches Google Calendar Integration",
			date: "March 1, 2025",
			excerpt: "Multroid announces seamless calendar synchronization feature for Notiva users.",
		},
		{
			id: 2,
			title: "Notiva Reaches 10,000 Active Users Milestone",
			date: "February 15, 2025",
			excerpt: "Subscription management platform continues rapid growth with expanded feature set.",
		},
		{
			id: 3,
			title: "Multroid Launches Notiva Subscription Management Platform",
			date: "January 10, 2025",
			excerpt: "New platform helps individuals and businesses track and optimize recurring expenses.",
		},
	];

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 mb-6">
						<FileText className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Press & Media</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
						News, press releases, and media resources from Multroid and Notiva.
					</p>
				</div>
			</section>

			{/* Press Contact */}
			<section className="py-12 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto bg-background rounded-lg p-8 border">
						<div className="flex flex-col md:flex-row gap-8 items-center">
							<div className="flex-shrink-0">
								<div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
									<Mail className="size-8" />
								</div>
							</div>
							<div className="flex-1 text-center md:text-left">
								<h2 className="text-2xl font-bold mb-2">Media Inquiries</h2>
								<p className="text-muted-foreground mb-4">
									For press inquiries, interviews, or media requests, please contact our press team.
								</p>
								<a href="mailto:press@multroid.com" className="text-primary font-semibold hover:underline">
									press@multroid.com
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Latest Press Releases */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Latest Press Releases</h2>
					<div className="max-w-4xl mx-auto space-y-6">
						{pressReleases.map((release) => (
							<article key={release.id} className="bg-muted/50 rounded-lg p-6 border hover:shadow-lg transition-shadow">
								<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
									<div>
										<p className="text-sm text-muted-foreground mb-2">{release.date}</p>
										<h3 className="text-xl font-semibold mb-2">{release.title}</h3>
										<p className="text-muted-foreground">{release.excerpt}</p>
									</div>
									<Button asChild variant="outline">
										<Link href={`/about/press/${release.id}`}>Read More</Link>
									</Button>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* Brand Assets */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Brand Assets</h2>
					<div className="max-w-4xl mx-auto">
						<div className="grid md:grid-cols-2 gap-8">
							<div className="bg-background rounded-lg p-8 border">
								<div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
									<ImageIcon className="size-8" />
								</div>
								<h3 className="text-xl font-semibold mb-2">Logos & Icons</h3>
								<p className="text-muted-foreground mb-6">
									Download official Notiva and Multroid logos in various formats and sizes.
								</p>
								<Button variant="outline" className="w-full">
									<Download className="mr-2 size-4" />
									Download Logo Pack
								</Button>
							</div>

							<div className="bg-background rounded-lg p-8 border">
								<div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
									<FileText className="size-8" />
								</div>
								<h3 className="text-xl font-semibold mb-2">Brand Guidelines</h3>
								<p className="text-muted-foreground mb-6">
									Learn how to properly use our brand assets and maintain consistency.
								</p>
								<Button variant="outline" className="w-full">
									<Download className="mr-2 size-4" />
									Download Guidelines
								</Button>
							</div>
						</div>

						<div className="mt-8 bg-background rounded-lg p-8 border">
							<h3 className="text-xl font-semibold mb-4">Color Palette</h3>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								<div>
									<div className="h-20 rounded-lg bg-primary mb-2"></div>
									<p className="text-sm font-mono text-muted-foreground">Primary</p>
								</div>
								<div>
									<div className="h-20 rounded-lg bg-secondary mb-2"></div>
									<p className="text-sm font-mono text-muted-foreground">Secondary</p>
								</div>
								<div>
									<div className="h-20 rounded-lg bg-accent mb-2"></div>
									<p className="text-sm font-mono text-muted-foreground">Accent</p>
								</div>
								<div>
									<div className="h-20 rounded-lg bg-muted mb-2"></div>
									<p className="text-sm font-mono text-muted-foreground">Muted</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Company Facts */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Company Facts</h2>
					<div className="max-w-3xl mx-auto bg-muted/50 rounded-lg p-8 border">
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<h3 className="font-semibold mb-2">Company Name</h3>
								<p className="text-muted-foreground">Multroid</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">Product Name</h3>
								<p className="text-muted-foreground">Notiva</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">Founded</h3>
								<p className="text-muted-foreground">2024</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">Website</h3>
								<p className="text-muted-foreground">
									<Link href="https://multroid.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
										multroid.com
									</Link>
								</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">Industry</h3>
								<p className="text-muted-foreground">Software / SaaS</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">Focus</h3>
								<p className="text-muted-foreground">Subscription Management</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Boilerplate */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-3xl font-bold text-center mb-8">About Notiva (Boilerplate)</h2>
						<div className="bg-background rounded-lg p-8 border space-y-4 text-muted-foreground">
							<p>
								Notiva is a subscription management platform developed by Multroid that helps individuals and businesses track, manage, and optimize their recurring expenses. With features like smart reminders, calendar sync, document vault, and team collaboration, Notiva makes it easy to stay on top of subscriptions and reduce unnecessary spending.
							</p>
							<p>
								Multroid is a technology company dedicated to building innovative software solutions that simplify complex problems. Notiva is part of the Multroid ecosystem of products designed to help users manage their digital lives more effectively.
							</p>
							<p>
								For more information, visit <Link href="/" className="text-primary hover:underline">notiva.app</Link> or <Link href="https://multroid.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">multroid.com</Link>.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Questions or Interview Requests?
					</h2>
					<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
						Our press team is here to help with media inquiries, interview requests, and more.
					</p>
					<Button asChild size="lg" variant="secondary">
						<Link href="mailto:press@multroid.com">Contact Press Team</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}

