import { Users, UserPlus, Lock, MessageSquare, Activity, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CollaborationPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 mb-6">
						<Users className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Collaborate with Your Team</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
						Share workspaces, manage permissions, and work together seamlessly on subscription management.
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
					<h2 className="text-3xl font-bold text-center mb-12">Collaboration Features</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Users className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Team Workspaces</h3>
							<p className="text-muted-foreground">
								Create shared workspaces for different teams, departments, or projects to manage subscriptions together.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<UserPlus className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Invite Team Members</h3>
							<p className="text-muted-foreground">
								Easily add team members via email and get them started managing subscriptions in minutes.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Lock className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
							<p className="text-muted-foreground">
								Control who can view, edit, or manage subscriptions with granular permission settings.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<MessageSquare className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Comments & Notes</h3>
							<p className="text-muted-foreground">
								Leave comments on subscriptions to communicate with your team about renewals and changes.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Activity className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Activity Tracking</h3>
							<p className="text-muted-foreground">
								See who made changes and when with detailed activity logs for complete transparency.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Share2 className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Document Sharing</h3>
							<p className="text-muted-foreground">
								Share contracts, invoices, and receipts securely within your team workspace.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Use Cases */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Perfect For Teams</h2>
					<div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
								<Users className="size-5 text-primary" />
								Startups & Small Businesses
							</h3>
							<p className="text-muted-foreground">
								Keep track of all your software subscriptions, tools, and services in one central place. Know exactly who's using what and when renewals are coming.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
								<Users className="size-5 text-primary" />
								Finance Teams
							</h3>
							<p className="text-muted-foreground">
								Collaborate with different departments to manage budgets, track expenses, and ensure timely renewals without overspending.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
								<Users className="size-5 text-primary" />
								IT Departments
							</h3>
							<p className="text-muted-foreground">
								Manage software licenses, cloud services, and technical subscriptions across your organization with full visibility and control.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
								<Users className="size-5 text-primary" />
								Families
							</h3>
							<p className="text-muted-foreground">
								Share household subscriptions with family members, split costs fairly, and keep everyone informed about upcoming renewals.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Permission Levels */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Flexible Permission Levels</h2>
					<div className="max-w-3xl mx-auto space-y-6">
						<div className="bg-background rounded-lg p-6 border">
							<h3 className="text-xl font-semibold mb-2">Admin</h3>
							<p className="text-muted-foreground">
								Full access to manage workspace, add/remove members, edit all subscriptions, and configure billing.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<h3 className="text-xl font-semibold mb-2">Editor</h3>
							<p className="text-muted-foreground">
								Can add, edit, and delete subscriptions, upload documents, and manage reminders for the team.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<h3 className="text-xl font-semibold mb-2">Viewer</h3>
							<p className="text-muted-foreground">
								Read-only access to view subscriptions, documents, and reports without making changes.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Start Collaborating Today
					</h2>
					<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
						Bring your team together and manage subscriptions more efficiently with Notiva.
					</p>
					<Button asChild size="lg" variant="secondary">
						<Link href="/register">Get Started Free</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}

