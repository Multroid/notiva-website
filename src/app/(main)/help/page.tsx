import { HelpCircle, BookOpen, MessageSquare, Video, Search, FileQuestion, Zap, Users, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HelpPage() {
	const popularArticles = [
		{
			id: 1,
			title: "Getting Started with Notiva",
			category: "Getting Started",
			description: "Learn the basics and set up your account in minutes.",
		},
		{
			id: 2,
			title: "How to Add Your First Subscription",
			category: "Subscriptions",
			description: "Step-by-step guide to tracking your subscriptions.",
		},
		{
			id: 3,
			title: "Setting Up Smart Reminders",
			category: "Reminders",
			description: "Never miss a renewal with custom reminder settings.",
		},
		{
			id: 4,
			title: "Connecting Your Calendar",
			category: "Integrations",
			description: "Sync with Google Calendar, Outlook, or Apple Calendar.",
		},
		{
			id: 5,
			title: "Managing Team Workspaces",
			category: "Collaboration",
			description: "Share subscriptions and collaborate with your team.",
		},
		{
			id: 6,
			title: "Understanding Your Subscription Analytics",
			category: "Analytics",
			description: "Get insights into your spending patterns and trends.",
		},
	];

	const categories = [
		{
			icon: Zap,
			title: "Getting Started",
			description: "New to Notiva? Start here.",
			articleCount: 8,
		},
		{
			icon: FileQuestion,
			title: "Subscriptions",
			description: "Managing your subscriptions",
			articleCount: 15,
		},
		{
			icon: Shield,
			title: "Security & Privacy",
			description: "How we protect your data",
			articleCount: 6,
		},
		{
			icon: Users,
			title: "Team Features",
			description: "Collaboration and workspaces",
			articleCount: 12,
		},
		{
			icon: MessageSquare,
			title: "Integrations",
			description: "Connecting external services",
			articleCount: 10,
		},
		{
			icon: BookOpen,
			title: "Billing & Plans",
			description: "Pricing and payment questions",
			articleCount: 7,
		},
	];

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="py-20 text-center bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 mb-6">
						<HelpCircle className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Help Center</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
						Find answers, learn about features, and get the most out of Notiva.
					</p>
					
					{/* Search Bar */}
					<div className="max-w-2xl mx-auto relative">
						<Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search for help articles..."
							className="pl-12 h-14 text-lg"
						/>
					</div>
				</div>
			</section>

			{/* Quick Help Options */}
			<section className="py-12 border-b">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
						<Link href="/help/guides" className="bg-muted/50 rounded-lg p-6 hover:shadow-lg transition-shadow border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<BookOpen className="size-6" />
							</div>
							<h3 className="font-semibold mb-2">Browse Guides</h3>
							<p className="text-sm text-muted-foreground">
								Complete documentation and tutorials
							</p>
						</Link>

						<Link href="/contact" className="bg-muted/50 rounded-lg p-6 hover:shadow-lg transition-shadow border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<MessageSquare className="size-6" />
							</div>
							<h3 className="font-semibold mb-2">Contact Support</h3>
							<p className="text-sm text-muted-foreground">
								Get help from our support team
							</p>
						</Link>

						<Link href="/help/videos" className="bg-muted/50 rounded-lg p-6 hover:shadow-lg transition-shadow border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Video className="size-6" />
							</div>
							<h3 className="font-semibold mb-2">Video Tutorials</h3>
							<p className="text-sm text-muted-foreground">
								Watch step-by-step video guides
							</p>
						</Link>
					</div>
				</div>
			</section>

			{/* Popular Articles */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Popular Articles</h2>
					<div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
						{popularArticles.map((article) => (
							<Link key={article.id} href={`/help/articles/${article.id}`} className="bg-muted/50 rounded-lg p-6 hover:shadow-lg transition-shadow border">
								<div className="flex items-start gap-3">
									<FileQuestion className="size-5 text-primary flex-shrink-0 mt-1" />
									<div>
										<span className="text-xs font-semibold text-primary uppercase">{article.category}</span>
										<h3 className="font-semibold mt-1 mb-2">{article.title}</h3>
										<p className="text-sm text-muted-foreground">{article.description}</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Browse by Category */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
					<div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{categories.map((category, index) => {
							const Icon = category.icon;
							return (
								<Link key={index} href={`/help/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`} className="bg-background rounded-lg p-6 hover:shadow-lg transition-shadow border">
									<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
										<Icon className="size-6" />
									</div>
									<h3 className="font-semibold mb-2">{category.title}</h3>
									<p className="text-sm text-muted-foreground mb-3">{category.description}</p>
									<p className="text-xs text-muted-foreground">{category.articleCount} articles</p>
								</Link>
							);
						})}
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
					<div className="max-w-3xl mx-auto space-y-6">
						<div className="bg-muted/50 rounded-lg p-6 border">
							<h3 className="font-semibold mb-2">How much does Notiva cost?</h3>
							<p className="text-muted-foreground">
								Notiva offers a free forever plan with essential features. Premium plans start at $4.99/month with advanced features like unlimited subscriptions, team collaboration, and priority support. <Link href="/pricing" className="text-primary hover:underline">View pricing</Link>
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6 border">
							<h3 className="font-semibold mb-2">Is my data secure?</h3>
							<p className="text-muted-foreground">
								Yes! We use bank-level AES-256 encryption and are SOC 2 Type II certified. Your data is encrypted both in transit and at rest. We never sell your data to third parties. <Link href="/security" className="text-primary hover:underline">Learn more about security</Link>
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6 border">
							<h3 className="font-semibold mb-2">Can I sync with my calendar?</h3>
							<p className="text-muted-foreground">
								Absolutely! Notiva integrates with Google Calendar, Microsoft Outlook, and Apple Calendar. Your subscription renewals will automatically appear on your calendar with customizable reminders.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6 border">
							<h3 className="font-semibold mb-2">Can I share subscriptions with my team?</h3>
							<p className="text-muted-foreground">
								Yes! Team and Enterprise plans include workspace features where you can invite team members, set permissions, and collaborate on subscription management.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6 border">
							<h3 className="font-semibold mb-2">How do I cancel my subscription to Notiva?</h3>
							<p className="text-muted-foreground">
								You can cancel anytime from your account settings. There are no cancellation fees, and you&apos;ll retain access until the end of your billing period.
							</p>
						</div>
					</div>

					<div className="text-center mt-12">
						<p className="text-muted-foreground mb-4">Still have questions?</p>
						<Button asChild size="lg">
							<Link href="/contact">Contact Support</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Community Resources */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Need More Help?
					</h2>
					<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
						Our support team is here to help you succeed with Notiva.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button asChild size="lg" variant="secondary">
							<Link href="/contact">Contact Support</Link>
						</Button>
						<Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
							<Link href="/register">Get Started Free</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}

