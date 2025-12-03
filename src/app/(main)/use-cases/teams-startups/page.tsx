import { Users, Zap, TrendingUp, DollarSign, Lock, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TeamsStartupsPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 mb-6">
						<Users className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Built for Growing Teams & Startups</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
						Control SaaS sprawl, optimize spending, and collaborate seamlessly. The subscription management platform that scales with your startup.
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

			{/* Startup Challenges */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-3xl font-bold text-center mb-8">Common Startup Challenges</h2>
						<div className="grid md:grid-cols-2 gap-6">
							<div className="bg-background rounded-lg p-6 border">
								<p className="text-muted-foreground">
									💸 SaaS spending spiraling out of control as the team grows and adds new tools
								</p>
							</div>
							<div className="bg-background rounded-lg p-6 border">
								<p className="text-muted-foreground">
									🔍 No visibility into who's using what tools and whether they're getting value
								</p>
							</div>
							<div className="bg-background rounded-lg p-6 border">
								<p className="text-muted-foreground">
									👥 Different team members signing up for duplicate tools without coordination
								</p>
							</div>
							<div className="bg-background rounded-lg p-6 border">
								<p className="text-muted-foreground">
									📊 Difficult to create accurate budget forecasts when subscription costs keep changing
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Key Benefits */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Why Teams Choose Notiva</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<DollarSign className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Reduce SaaS Spend</h3>
							<p className="text-muted-foreground">
								Identify unused licenses and redundant tools. Teams typically save 20-30% on SaaS costs.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Users className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
							<p className="text-muted-foreground">
								Shared workspaces let finance, IT, and department heads collaborate on subscription management.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<BarChart3 className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Spending Analytics</h3>
							<p className="text-muted-foreground">
								Detailed reports and dashboards show spending trends, cost per department, and ROI analysis.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Lock className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Access Controls</h3>
							<p className="text-muted-foreground">
								Set role-based permissions so team members can only access subscriptions relevant to them.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<TrendingUp className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Budget Forecasting</h3>
							<p className="text-muted-foreground">
								Plan ahead with accurate forecasts of upcoming renewals and subscription cost projections.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Zap className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Quick Onboarding</h3>
							<p className="text-muted-foreground">
								Get your team up and running in minutes, not weeks. No complex implementation required.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Common Team Subscriptions */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Tools Your Team Might Be Using</h2>
					<div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
						<div className="bg-background rounded-lg p-4 border">
							<h3 className="font-semibold mb-3">Development</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• GitHub/GitLab</li>
								<li>• AWS/Google Cloud</li>
								<li>• Vercel/Netlify</li>
								<li>• DataDog/Sentry</li>
								<li>• Docker</li>
							</ul>
						</div>

						<div className="bg-background rounded-lg p-4 border">
							<h3 className="font-semibold mb-3">Productivity</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• Slack/Discord</li>
								<li>• Notion/Confluence</li>
								<li>• Google Workspace</li>
								<li>• Zoom/Microsoft Teams</li>
								<li>• Asana/Linear</li>
							</ul>
						</div>

						<div className="bg-background rounded-lg p-4 border">
							<h3 className="font-semibold mb-3">Business</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• Stripe/PayPal</li>
								<li>• HubSpot/Salesforce</li>
								<li>• Mailchimp/SendGrid</li>
								<li>• QuickBooks/Xero</li>
								<li>• Intercom/Zendesk</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Use Cases by Department */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Benefits by Department</h2>
					<div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
								💰 Finance Teams
							</h3>
							<p className="text-muted-foreground">
								Track all SaaS expenses in one place, create accurate budgets, approve new subscriptions, and generate financial reports for stakeholders.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
								💻 Engineering Teams
							</h3>
							<p className="text-muted-foreground">
								Manage development tools, cloud infrastructure costs, API subscriptions, and technical service contracts in one central hub.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
								👥 HR & Operations
							</h3>
							<p className="text-muted-foreground">
								Track employee benefits, training platforms, HR software, and ensure proper offboarding when team members leave.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
								📈 Marketing Teams
							</h3>
							<p className="text-muted-foreground">
								Manage marketing tools, ad spend platforms, analytics services, and content creation subscriptions with full visibility.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Success Story */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/20">
						<div className="text-center mb-6">
							<div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 text-primary mb-4">
								<Users className="size-8" />
							</div>
							<p className="text-lg text-muted-foreground mb-4">
								"As we grew from 10 to 50 employees, our SaaS costs exploded. Notiva helped us discover $1,200/month in unused licenses and duplicate tools. The ROI paid for itself in the first month, and now our finance team has complete visibility into our tech stack."
							</p>
							<p className="font-semibold">— Alex Chen, CFO at TechStart Inc.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Features Highlight */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Enterprise Features for Teams</h2>
					<div className="max-w-3xl mx-auto space-y-6">
						<div className="bg-muted/50 rounded-lg p-6 border-l-4 border-primary">
							<h3 className="text-lg font-semibold mb-2">Approval Workflows</h3>
							<p className="text-muted-foreground">
								Set up approval chains so new subscriptions require manager or finance approval before purchase.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6 border-l-4 border-primary">
							<h3 className="text-lg font-semibold mb-2">SSO & SAML Integration</h3>
							<p className="text-muted-foreground">
								Integrate with your existing identity provider for secure single sign-on access.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6 border-l-4 border-primary">
							<h3 className="text-lg font-semibold mb-2">Custom Reports</h3>
							<p className="text-muted-foreground">
								Generate custom reports for board meetings, investor updates, or department reviews.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Ready to Optimize Your SaaS Stack?
					</h2>
					<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
						Join hundreds of fast-growing teams who trust Notiva to manage their subscriptions.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button asChild size="lg" variant="secondary">
							<Link href="/register">Start Free Trial</Link>
						</Button>
						<Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
							<Link href="/contact">Talk to Sales</Link>
						</Button>
					</div>
					<p className="text-sm opacity-75 mt-4">14-day free trial • No credit card required</p>
				</div>
			</section>
		</div>
	);
}

