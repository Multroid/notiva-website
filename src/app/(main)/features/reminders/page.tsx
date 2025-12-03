import { Bell, Calendar, Clock, CheckCircle, Smartphone, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RemindersPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 mb-6">
						<Bell className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Never Miss a Payment Again</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
						Set up smart reminders that alert you before renewals and due dates, so you&apos;re always in control of your subscriptions.
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

			{/* Key Features */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Reminder Features</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Clock className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Custom Timing</h3>
							<p className="text-muted-foreground">
								Choose when to get notified - 1 day, 3 days, 1 week, or custom intervals before each renewal.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Smartphone className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Multi-Channel Alerts</h3>
							<p className="text-muted-foreground">
								Get reminders via email, push notifications, or in-app alerts based on your preferences.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Calendar className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Calendar Integration</h3>
							<p className="text-muted-foreground">
								Sync reminders directly to Google Calendar, Outlook, or Apple Calendar for seamless planning.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<CheckCircle className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Smart Snoozing</h3>
							<p className="text-muted-foreground">
								Need more time? Snooze reminders to get notified again later without losing track.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Bell className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Priority Levels</h3>
							<p className="text-muted-foreground">
								Set high-priority reminders for critical subscriptions to ensure you never miss important renewals.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Mail className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Digest Options</h3>
							<p className="text-muted-foreground">
								Prefer batch notifications? Get daily or weekly summaries of upcoming renewals instead.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">How Reminders Work</h2>
					<div className="max-w-3xl mx-auto space-y-8">
						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								1
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Add Your Subscriptions</h3>
								<p className="text-muted-foreground">
									Add subscriptions manually or import them automatically. Notiva tracks renewal dates for you.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								2
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Configure Your Preferences</h3>
								<p className="text-muted-foreground">
									Choose how and when you want to be reminded - customize for each subscription or set global defaults.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								3
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Relax and Get Notified</h3>
								<p className="text-muted-foreground">
									Notiva automatically sends reminders based on your schedule, keeping you informed and in control.
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
						Start Managing Your Subscriptions Smarter
					</h2>
					<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
						Join thousands who never miss a renewal with Notiva&apos;s intelligent reminder system.
					</p>
					<Button asChild size="lg" variant="secondary">
						<Link href="/register">Get Started Free</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}

