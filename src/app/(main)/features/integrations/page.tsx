import { Plug, Zap, Calendar, CreditCard, Mail, Database } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function IntegrationsPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 mb-6">
						<Plug className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Connect Your Favorite Tools</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
						Seamlessly integrate Notiva with the tools you already use. Automate your workflow and keep everything in sync.
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

			{/* Integration Categories */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Popular Integrations</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
								<Calendar className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Calendar Apps</h3>
							<p className="text-muted-foreground mb-4">
								Sync renewal dates and deadlines to your calendar automatically.
							</p>
							<div className="space-y-2 text-sm">
								<div className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-primary"></span>
									<span>Google Calendar</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-primary"></span>
									<span>Microsoft Outlook</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-primary"></span>
									<span>Apple Calendar</span>
								</div>
							</div>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center mb-4">
								<CreditCard className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Payment Platforms</h3>
							<p className="text-muted-foreground mb-4">
								Connect your payment methods for easy subscription tracking.
							</p>
							<div className="space-y-2 text-sm">
								<div className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-primary"></span>
									<span>Stripe</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-primary"></span>
									<span>PayPal</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-primary"></span>
									<span>Credit Cards</span>
								</div>
							</div>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center mb-4">
								<Mail className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Email & Notifications</h3>
							<p className="text-muted-foreground mb-4">
								Get alerts through your preferred communication channels.
							</p>
							<div className="space-y-2 text-sm">
								<div className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-primary"></span>
									<span>Email Notifications</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-primary"></span>
									<span>Slack</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-primary"></span>
									<span>Discord</span>
								</div>
							</div>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center mb-4">
								<Zap className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Automation Tools</h3>
							<p className="text-muted-foreground mb-4">
								Create custom workflows with your favorite automation platforms.
							</p>
							<div className="space-y-2 text-sm">
								<div className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-primary"></span>
									<span>Zapier</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-primary"></span>
									<span>Make (Integromat)</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-primary"></span>
									<span>IFTTT</span>
								</div>
							</div>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center mb-4">
								<Database className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Accounting Software</h3>
							<p className="text-muted-foreground mb-4">
								Sync expenses with your accounting and bookkeeping tools.
							</p>
							<div className="space-y-2 text-sm">
								<div className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-primary"></span>
									<span>QuickBooks</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-primary"></span>
									<span>Xero</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-primary"></span>
									<span>FreshBooks</span>
								</div>
							</div>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Plug className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">API Access</h3>
							<p className="text-muted-foreground mb-4">
								Build custom integrations with our developer-friendly API.
							</p>
							<div className="space-y-2 text-sm">
								<div className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-primary"></span>
									<span>RESTful API</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-primary"></span>
									<span>Webhooks</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-primary"></span>
									<span>API Documentation</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Benefits */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Why Integrate?</h2>
					<div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
						<div className="flex gap-4">
							<div className="flex-shrink-0 size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
								<Zap className="size-6" />
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Save Time</h3>
								<p className="text-muted-foreground">
									Automate repetitive tasks and eliminate manual data entry across platforms.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex-shrink-0 size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
								<Database className="size-6" />
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Centralized Data</h3>
								<p className="text-muted-foreground">
									Keep all your subscription data in sync across all your tools and platforms.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex-shrink-0 size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
								<Calendar className="size-6" />
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Better Visibility</h3>
								<p className="text-muted-foreground">
									See your subscription schedule alongside other commitments in your calendar.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex-shrink-0 size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
								<Plug className="size-6" />
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Workflow Automation</h3>
								<p className="text-muted-foreground">
									Create custom workflows that fit your team's unique processes and needs.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Coming Soon */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-3xl font-bold mb-4">More Integrations Coming Soon</h2>
						<p className="text-lg text-muted-foreground mb-6">
							We're constantly adding new integrations based on user feedback. Have a specific tool you'd like us to support?
						</p>
						<Button asChild variant="outline">
							<Link href="/contact">Request an Integration</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Connect Your Tools Today
					</h2>
					<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
						Start integrating Notiva with your favorite apps and streamline your subscription management.
					</p>
					<Button asChild size="lg" variant="secondary">
						<Link href="/register">Get Started Free</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}

