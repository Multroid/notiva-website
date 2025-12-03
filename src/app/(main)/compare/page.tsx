import { Link2, Check, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ComparePage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 mb-6">
						<Link2 className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">How Notiva Compares</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
						See why thousands choose Notiva over other subscription management tools. We're built for simplicity, security, and savings.
					</p>
				</div>
			</section>

			{/* Comparison Table */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Feature Comparison</h2>
					<div className="max-w-5xl mx-auto overflow-x-auto">
						<table className="w-full bg-background border rounded-lg">
							<thead>
								<tr className="border-b">
									<th className="text-left p-4 font-semibold">Feature</th>
									<th className="text-center p-4 font-semibold bg-primary/5">
										<div className="font-bold text-primary">Notiva</div>
									</th>
									<th className="text-center p-4 font-semibold">Competitor A</th>
									<th className="text-center p-4 font-semibold">Competitor B</th>
									<th className="text-center p-4 font-semibold">Spreadsheets</th>
								</tr>
							</thead>
							<tbody>
								<tr className="border-b">
									<td className="p-4">Unlimited Subscriptions</td>
									<td className="text-center p-4 bg-primary/5">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<X className="size-5 text-red-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
								</tr>
								<tr className="border-b">
									<td className="p-4">Smart Reminders</td>
									<td className="text-center p-4 bg-primary/5">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<X className="size-5 text-red-600 mx-auto" />
									</td>
								</tr>
								<tr className="border-b">
									<td className="p-4">Calendar Sync</td>
									<td className="text-center p-4 bg-primary/5">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<X className="size-5 text-red-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<X className="size-5 text-red-600 mx-auto" />
									</td>
								</tr>
								<tr className="border-b">
									<td className="p-4">Document Vault</td>
									<td className="text-center p-4 bg-primary/5">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<X className="size-5 text-red-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<X className="size-5 text-red-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<X className="size-5 text-red-600 mx-auto" />
									</td>
								</tr>
								<tr className="border-b">
									<td className="p-4">Team Collaboration</td>
									<td className="text-center p-4 bg-primary/5">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<X className="size-5 text-red-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
								</tr>
								<tr className="border-b">
									<td className="p-4">Mobile App</td>
									<td className="text-center p-4 bg-primary/5">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<X className="size-5 text-red-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<X className="size-5 text-red-600 mx-auto" />
									</td>
								</tr>
								<tr className="border-b">
									<td className="p-4">Analytics & Reports</td>
									<td className="text-center p-4 bg-primary/5">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<X className="size-5 text-red-600 mx-auto" />
									</td>
								</tr>
								<tr className="border-b">
									<td className="p-4">API Access</td>
									<td className="text-center p-4 bg-primary/5">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<X className="size-5 text-red-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<X className="size-5 text-red-600 mx-auto" />
									</td>
								</tr>
								<tr className="border-b">
									<td className="p-4">Free Plan Available</td>
									<td className="text-center p-4 bg-primary/5">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<X className="size-5 text-red-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
									<td className="text-center p-4">
										<Check className="size-5 text-green-600 mx-auto" />
									</td>
								</tr>
								<tr>
									<td className="p-4 font-semibold">Starting Price</td>
									<td className="text-center p-4 bg-primary/5 font-semibold text-primary">Free</td>
									<td className="text-center p-4">$9.99/mo</td>
									<td className="text-center p-4">$4.99/mo</td>
									<td className="text-center p-4">Free</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</section>

			{/* Why Notiva Wins */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Why Users Choose Notiva</h2>
					<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Check className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">More Features, Better Value</h3>
							<p className="text-muted-foreground">
								Get all the features you need at a price that makes sense. Our free plan includes features others charge for.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Check className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Modern, Intuitive Interface</h3>
							<p className="text-muted-foreground">
								No learning curve. Our clean, modern design makes subscription management actually enjoyable.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Check className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Built for Teams & Individuals</h3>
							<p className="text-muted-foreground">
								Whether you're managing personal subscriptions or company-wide SaaS, Notiva scales with you.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Customer Testimonials */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
					<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						<div className="bg-background rounded-lg p-6 border">
							<p className="text-muted-foreground mb-4">
								"We tried three different subscription trackers before finding Notiva. The document vault and calendar sync features are game-changers."
							</p>
							<p className="font-semibold">— Sarah M.</p>
							<p className="text-sm text-muted-foreground">Switched from Competitor A</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<p className="text-muted-foreground mb-4">
								"Better features than the expensive alternative we were using, and the free plan actually works for most individuals. No brainer."
							</p>
							<p className="font-semibold">— James K.</p>
							<p className="text-sm text-muted-foreground">Switched from Competitor B</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<p className="text-muted-foreground mb-4">
								"Finally retired my messy spreadsheet. Notiva does everything I was doing manually, plus a ton more. Should have switched years ago."
							</p>
							<p className="font-semibold">— Lisa T.</p>
							<p className="text-sm text-muted-foreground">Switched from Spreadsheets</p>
						</div>
					</div>
				</div>
			</section>

			{/* Migration Help */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-3xl font-bold mb-4">Switching is Easy</h2>
						<p className="text-lg text-muted-foreground mb-8">
							Moving from another tool or spreadsheet? We'll help you migrate your data for free. Our team is here to make the transition smooth and painless.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button asChild size="lg">
								<Link href="/register">Start Free</Link>
							</Button>
							<Button asChild variant="outline" size="lg">
								<Link href="/contact">Talk to Us About Migration</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Ready to Make the Switch?
					</h2>
					<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
						Join thousands who've already upgraded to Notiva for better subscription management.
					</p>
					<Button asChild size="lg" variant="secondary">
						<Link href="/register">Get Started Free</Link>
					</Button>
					<p className="text-sm opacity-75 mt-4">No credit card required • Free forever plan</p>
				</div>
			</section>
		</div>
	);
}

