import { Building, Target, Users, Zap, Globe, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CompanyPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 mb-6 overflow-hidden">
						<Image 
							src="/Logo/multroid-logo.svg" 
							alt="Multroid Logo" 
							width={64} 
							height={64}
							className="size-16 rounded-2xl"
						/>
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Built by Multroid</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
						Notiva is proudly developed and owned by Multroid, a technology company dedicated to creating innovative software solutions that simplify complex problems. All rights reserved by Multroid.
					</p>
					<Button asChild variant="outline" size="lg">
						<Link href="https://multroid.com" target="_blank" rel="noopener noreferrer">
							Visit Multroid.com →
						</Link>
					</Button>
				</div>
			</section>

			{/* About Multroid */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold text-center mb-8">About Multroid</h2>
						<div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
							<p className="text-center">
								Multroid is a forward-thinking technology company that builds software products designed to make life easier for individuals and businesses. Our team is passionate about creating intuitive, powerful tools that solve real-world problems.
							</p>
							<p className="text-center">
								Notiva is part of the Multroid ecosystem—a suite of applications designed to help users manage their digital lives more effectively. From subscription tracking to productivity tools, each Multroid product is built with the same commitment to quality, security, and user experience.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Our Mission & Values */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Our Mission & Values</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Target className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Our Mission</h3>
							<p className="text-muted-foreground">
								To build software that empowers people to take control of their digital lives, starting with subscription management.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Users className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">User-First Design</h3>
							<p className="text-muted-foreground">
								Every feature we build starts with understanding our users' needs and creating solutions that genuinely help them.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Zap className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Innovation</h3>
							<p className="text-muted-foreground">
								We're constantly exploring new technologies and approaches to deliver the best possible experience.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Globe className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Accessibility</h3>
							<p className="text-muted-foreground">
								We believe great software should be accessible to everyone, which is why Notiva offers a generous free tier.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Heart className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Privacy & Trust</h3>
							<p className="text-muted-foreground">
								We take your privacy seriously and build every product with security and data protection at its core.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Building className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Sustainable Growth</h3>
							<p className="text-muted-foreground">
								We're building Multroid for the long term, focusing on sustainable growth and lasting value for our users.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* The Multroid Ecosystem */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold text-center mb-8">The Multroid Ecosystem</h2>
						<div className="bg-background rounded-lg p-8 border">
							<div className="text-center mb-6">
								<Globe className="size-16 mx-auto mb-4 text-primary" />
								<h3 className="text-2xl font-semibold mb-4">Connected Products, Unified Experience</h3>
								<p className="text-muted-foreground">
									Notiva is the first of several applications in the Multroid ecosystem. Each product is designed to work seamlessly together, creating a unified experience for managing your digital life. Stay tuned for more innovations from Multroid.
								</p>
							</div>
							<div className="border-t pt-6 mt-6">
								<h4 className="font-semibold mb-4 text-center">Current Multroid Products:</h4>
								<div className="flex justify-center">
									<div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
										<p className="font-semibold text-primary">Notiva</p>
										<p className="text-sm text-muted-foreground">Subscription Management Platform</p>
									</div>
								</div>
								<p className="text-sm text-muted-foreground text-center mt-6">More products coming soon...</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Our Story */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
						<div className="space-y-6 text-muted-foreground">
							<p>
								Multroid was founded with a simple observation: modern life is increasingly complex, and the tools we use should make it simpler, not more complicated. We saw people struggling to manage their growing number of subscriptions, losing money on forgotten renewals, and lacking visibility into their recurring expenses.
							</p>
							<p>
								That's why we built Notiva—to give people and businesses a better way to track, manage, and optimize their subscriptions. But our vision extends beyond just subscription management. Multroid is committed to building a suite of tools that address the everyday challenges of modern digital life.
							</p>
							<p>
								We're a small but passionate team of developers, designers, and problem-solvers who believe that great software should be intuitive, secure, and accessible to everyone. Every day, we work to make Notiva and future Multroid products better for our users.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Team Culture */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-3xl font-bold mb-6">Join the Multroid Team</h2>
						<p className="text-lg text-muted-foreground mb-8">
							We're always looking for talented, passionate people who want to help us build the future of productivity software. If you're excited about solving real problems and creating products people love, we'd love to hear from you.
						</p>
						<Button asChild size="lg">
							<Link href="/about/careers">View Open Positions</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Contact & Learn More */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
						<div className="bg-muted/50 rounded-lg p-8 text-center">
							<Building className="size-12 mx-auto mb-4 text-primary" />
							<h3 className="text-xl font-semibold mb-2">Learn More About Multroid</h3>
							<p className="text-muted-foreground mb-6">
								Visit our main website to explore our vision, products, and latest updates.
							</p>
							<Button asChild variant="outline">
								<Link href="https://multroid.com" target="_blank" rel="noopener noreferrer">
									Visit Multroid.com
								</Link>
							</Button>
						</div>

						<div className="bg-muted/50 rounded-lg p-8 text-center">
							<Users className="size-12 mx-auto mb-4 text-primary" />
							<h3 className="text-xl font-semibold mb-2">Get in Touch</h3>
							<p className="text-muted-foreground mb-6">
								Have questions or want to partner with Multroid? We'd love to hear from you.
							</p>
							<Button asChild variant="outline">
								<Link href="/contact">Contact Us</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Experience the Multroid Difference
					</h2>
					<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
						Try Notiva today and discover why thousands trust Multroid to help them manage their subscriptions.
					</p>
					<Button asChild size="lg" variant="secondary">
						<Link href="/register">Get Started Free</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}

