import { User, Wallet, Bell, TrendingDown, Shield, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function IndividualsPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 mb-6">
						<User className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Subscription Management for Individuals</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
						Take control of your personal subscriptions. Track expenses, never miss renewals, and save money effortlessly.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button asChild size="lg">
							<Link href="/register">Get Started Free</Link>
						</Button>
						<Button asChild variant="outline" size="lg">
							<Link href="/pricing">View Pricing</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Problem Statement */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-3xl font-bold text-center mb-8">Sound Familiar?</h2>
						<div className="grid md:grid-cols-2 gap-6">
							<div className="bg-background rounded-lg p-6 border">
								<p className="text-muted-foreground">
									💸 Losing track of monthly subscriptions and getting charged for services you forgot about
								</p>
							</div>
							<div className="bg-background rounded-lg p-6 border">
								<p className="text-muted-foreground">
									📆 Missing renewal dates and dealing with unexpected charges on your credit card
								</p>
							</div>
							<div className="bg-background rounded-lg p-6 border">
								<p className="text-muted-foreground">
									🤔 Not knowing exactly how much you're spending on subscriptions each month
								</p>
							</div>
							<div className="bg-background rounded-lg p-6 border">
								<p className="text-muted-foreground">
									📄 Struggling to find receipts and contracts when you need them
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Benefits */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">How Notiva Helps Individuals</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Wallet className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Complete Financial Visibility</h3>
							<p className="text-muted-foreground">
								See all your subscriptions in one place and know exactly where your money goes each month.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Bell className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Smart Reminders</h3>
							<p className="text-muted-foreground">
								Get notified before renewals so you can decide whether to continue or cancel each service.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<TrendingDown className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Reduce Waste</h3>
							<p className="text-muted-foreground">
								Identify unused subscriptions and cancel them to save hundreds of dollars per year.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Shield className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Secure Document Storage</h3>
							<p className="text-muted-foreground">
								Store receipts, contracts, and warranties in a secure digital vault for easy access.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<CheckCircle className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Budget Tracking</h3>
							<p className="text-muted-foreground">
								Set budgets for different categories and get alerts when you're approaching your limits.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<User className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
							<p className="text-muted-foreground">
								Simple, intuitive interface designed for personal use. No complicated setup required.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Common Subscriptions */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Track All Your Subscriptions</h2>
					<div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
						<div className="bg-background rounded-lg p-4 border">
							<h3 className="font-semibold mb-3">Streaming Services</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• Netflix</li>
								<li>• Spotify</li>
								<li>• Disney+</li>
								<li>• YouTube Premium</li>
								<li>• Apple Music</li>
							</ul>
						</div>

						<div className="bg-background rounded-lg p-4 border">
							<h3 className="font-semibold mb-3">Software & Apps</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• Adobe Creative Cloud</li>
								<li>• Microsoft 365</li>
								<li>• iCloud Storage</li>
								<li>• Dropbox</li>
								<li>• VPN Services</li>
							</ul>
						</div>

						<div className="bg-background rounded-lg p-4 border">
							<h3 className="font-semibold mb-3">Lifestyle</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• Gym Memberships</li>
								<li>• Food Delivery Apps</li>
								<li>• News Subscriptions</li>
								<li>• Online Learning</li>
								<li>• Gaming Services</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Success Story */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/20">
						<div className="text-center mb-6">
							<div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 text-primary mb-4">
								<User className="size-8" />
							</div>
							<p className="text-lg text-muted-foreground mb-4">
								"I was shocked to discover I was spending $347 per month on subscriptions I barely used. After using Notiva for just one month, I cut that down to $89 by canceling services I didn't need. That's over $3,000 saved per year!"
							</p>
							<p className="font-semibold">— Sarah M., Personal User</p>
						</div>
					</div>
				</div>
			</section>

			{/* Features Highlight */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Features Built for You</h2>
					<div className="max-w-3xl mx-auto space-y-6">
						<div className="bg-background rounded-lg p-6 border">
							<h3 className="text-lg font-semibold mb-2">Calendar Sync</h3>
							<p className="text-muted-foreground">
								Automatically add renewal dates to your Google Calendar, Apple Calendar, or Outlook so you never miss a payment.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<h3 className="text-lg font-semibold mb-2">Spending Analytics</h3>
							<p className="text-muted-foreground">
								Visualize your subscription spending over time with charts and reports to identify trends and savings opportunities.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<h3 className="text-lg font-semibold mb-2">Mobile App</h3>
							<p className="text-muted-foreground">
								Manage your subscriptions on the go with our mobile app for iOS and Android (coming soon).
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Start Saving Money Today
					</h2>
					<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
						Join thousands of individuals who use Notiva to take control of their subscriptions and save money.
					</p>
					<Button asChild size="lg" variant="secondary">
						<Link href="/register">Get Started Free</Link>
					</Button>
					<p className="text-sm opacity-75 mt-4">No credit card required • Free forever plan available</p>
				</div>
			</section>
		</div>
	);
}

