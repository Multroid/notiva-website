import { CalendarDays, RefreshCw, Smartphone, Clock, Check, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CalendarSyncPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 mb-6">
						<CalendarDays className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Sync to Your Favorite Calendar</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
						Automatically sync subscription renewals and deadlines to Google Calendar, Outlook, or Apple Calendar.
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

			{/* Supported Calendars */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Supported Calendar Apps</h2>
					<div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
						<div className="bg-background rounded-lg p-8 border text-center">
							<div className="size-16 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-4">
								<Calendar className="size-8" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Google Calendar</h3>
							<p className="text-muted-foreground">
								Two-way sync with your Google Calendar for seamless integration.
							</p>
						</div>

						<div className="bg-background rounded-lg p-8 border text-center">
							<div className="size-16 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center mx-auto mb-4">
								<Calendar className="size-8" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Outlook Calendar</h3>
							<p className="text-muted-foreground">
								Connect with Microsoft Outlook and Office 365 calendars.
							</p>
						</div>

						<div className="bg-background rounded-lg p-8 border text-center">
							<div className="size-16 rounded-2xl bg-gray-500/10 text-gray-600 dark:text-gray-400 flex items-center justify-center mx-auto mb-4">
								<Calendar className="size-8" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Apple Calendar</h3>
							<p className="text-muted-foreground">
								Sync with iCloud Calendar across all your Apple devices.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Key Features */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Calendar Sync Features</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<RefreshCw className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Automatic Updates</h3>
							<p className="text-muted-foreground">
								Changes to your subscriptions instantly sync to your calendar - no manual updates needed.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Clock className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Custom Reminders</h3>
							<p className="text-muted-foreground">
								Set up calendar reminders with custom timing to get notified before each deadline.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Smartphone className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Mobile Access</h3>
							<p className="text-muted-foreground">
								View your subscription schedule on any device with calendar app access.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Calendar className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Color Coding</h3>
							<p className="text-muted-foreground">
								Organize events with custom colors for different subscription types or categories.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Check className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Selective Sync</h3>
							<p className="text-muted-foreground">
								Choose which subscriptions to sync and keep your calendar clutter-free.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<CalendarDays className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Multiple Calendars</h3>
							<p className="text-muted-foreground">
								Sync to different calendars for work subscriptions and personal subscriptions.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">How Calendar Sync Works</h2>
					<div className="max-w-3xl mx-auto space-y-8">
						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								1
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Connect Your Calendar</h3>
								<p className="text-muted-foreground">
									Link your Google Calendar, Outlook, or Apple Calendar in seconds with our secure OAuth integration.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								2
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Choose What to Sync</h3>
								<p className="text-muted-foreground">
									Select which subscription events you want to appear on your calendar and configure reminder preferences.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								3
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Stay Synced Automatically</h3>
								<p className="text-muted-foreground">
									Notiva keeps your calendar updated in real-time. Add, edit, or remove subscriptions and see changes instantly.
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
						Keep Your Schedule in Perfect Sync
					</h2>
					<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
						Connect Notiva with your calendar today and never miss an important renewal date.
					</p>
					<Button asChild size="lg" variant="secondary">
						<Link href="/register">Get Started Free</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}

