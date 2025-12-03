import { Home, Users, DollarSign, Calendar, Shield, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FamiliesPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 mb-6">
						<Home className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Subscription Management for Families</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
						Manage household subscriptions together. Share plans, split costs fairly, and keep everyone on the same page.
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

			{/* Family Challenges */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-3xl font-bold text-center mb-8">Family Subscription Challenges</h2>
						<div className="grid md:grid-cols-2 gap-6">
							<div className="bg-background rounded-lg p-6 border">
								<p className="text-muted-foreground">
									👨‍👩‍👧‍👦 Multiple family members signing up for different services without coordination
								</p>
							</div>
							<div className="bg-background rounded-lg p-6 border">
								<p className="text-muted-foreground">
									💰 Difficulty splitting subscription costs fairly among family members
								</p>
							</div>
							<div className="bg-background rounded-lg p-6 border">
								<p className="text-muted-foreground">
									🔄 Duplicate subscriptions for the same service across different family accounts
								</p>
							</div>
							<div className="bg-background rounded-lg p-6 border">
								<p className="text-muted-foreground">
									📱 No central place to manage shared family plans and household bills
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Benefits for Families */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Why Families Love Notiva</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Users className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Shared Family Workspace</h3>
							<p className="text-muted-foreground">
								Create a family workspace where everyone can see and manage household subscriptions together.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<DollarSign className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Cost Splitting</h3>
							<p className="text-muted-foreground">
								Automatically calculate how much each family member owes for shared subscriptions.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Calendar className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Shared Calendar</h3>
							<p className="text-muted-foreground">
								Sync renewal dates to a shared family calendar so everyone knows when payments are due.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Shield className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Parental Controls</h3>
							<p className="text-muted-foreground">
								Parents maintain admin access while giving kids view-only permissions for transparency.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Share2 className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Document Sharing</h3>
							<p className="text-muted-foreground">
								Store and share important contracts, receipts, and bills with family members securely.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Home className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Budget Together</h3>
							<p className="text-muted-foreground">
								Set family budget limits and get alerts when household subscription spending exceeds targets.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Common Family Subscriptions */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Typical Family Subscriptions</h2>
					<div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
						<div className="bg-background rounded-lg p-4 border">
							<h3 className="font-semibold mb-3">Entertainment</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• Netflix Family Plan</li>
								<li>• Spotify Family</li>
								<li>• Disney+ Bundle</li>
								<li>• YouTube Premium Family</li>
								<li>• Apple One Family</li>
							</ul>
						</div>

						<div className="bg-background rounded-lg p-4 border">
							<h3 className="font-semibold mb-3">Household</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• Internet & Cable</li>
								<li>• Amazon Prime</li>
								<li>• Meal Kit Services</li>
								<li>• Security System</li>
								<li>• Cloud Storage</li>
							</ul>
						</div>

						<div className="bg-background rounded-lg p-4 border">
							<h3 className="font-semibold mb-3">Kids & Education</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• Online Learning Platforms</li>
								<li>• Gaming Subscriptions</li>
								<li>• Educational Apps</li>
								<li>• Activity Classes</li>
								<li>• Book Subscriptions</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* How It Works for Families */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Getting Started with Family Sharing</h2>
					<div className="max-w-3xl mx-auto space-y-8">
						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								1
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Create Family Workspace</h3>
								<p className="text-muted-foreground">
									Set up a shared family workspace and invite family members via email to join.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								2
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Add Subscriptions</h3>
								<p className="text-muted-foreground">
									Add all household subscriptions, mark which ones are shared, and assign cost splits.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								3
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Stay Synced</h3>
								<p className="text-muted-foreground">
									Everyone gets notifications for upcoming renewals and can see the family budget in real-time.
								</p>
							</div>
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
								<Home className="size-8" />
							</div>
							<p className="text-lg text-muted-foreground mb-4">
								"Notiva has been a game-changer for our family of five. We discovered we had three Netflix accounts and two Spotify subscriptions! Consolidating to family plans saved us $85 per month. Plus, our teenagers can now see where the household money goes."
							</p>
							<p className="font-semibold">— The Johnson Family</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Bring Your Family Together
					</h2>
					<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
						Start managing household subscriptions as a team with Notiva's family features.
					</p>
					<Button asChild size="lg" variant="secondary">
						<Link href="/register">Get Started Free</Link>
					</Button>
					<p className="text-sm opacity-75 mt-4">Perfect for families of all sizes • Easy setup in minutes</p>
				</div>
			</section>
		</div>
	);
}

