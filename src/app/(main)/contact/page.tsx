import { Mail, MessageSquare, Phone, MapPin, Send, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 mb-6">
						<Mail className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
						Have questions about Notiva? We&apos;d love to hear from you. Our team is here to help.
					</p>
				</div>
			</section>

			{/* Contact Methods */}
			<section className="py-12 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
						<div className="bg-background rounded-lg p-6 border text-center">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
								<Mail className="size-6" />
							</div>
							<h3 className="font-semibold mb-2">Email</h3>
							<p className="text-sm text-muted-foreground mb-2">support@notiva.app</p>
							<p className="text-xs text-muted-foreground">Response in 24 hours</p>
						</div>

						<div className="bg-background rounded-lg p-6 border text-center">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
								<MessageSquare className="size-6" />
							</div>
							<h3 className="font-semibold mb-2">Live Chat</h3>
							<p className="text-sm text-muted-foreground mb-2">Chat with us</p>
							<p className="text-xs text-muted-foreground">Mon-Fri 9am-5pm EST</p>
						</div>

						<div className="bg-background rounded-lg p-6 border text-center">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
								<Phone className="size-6" />
							</div>
							<h3 className="font-semibold mb-2">Sales</h3>
							<p className="text-sm text-muted-foreground mb-2">sales@multroid.com</p>
							<p className="text-xs text-muted-foreground">For enterprise inquiries</p>
						</div>

						<div className="bg-background rounded-lg p-6 border text-center">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
								<Clock className="size-6" />
							</div>
							<h3 className="font-semibold mb-2">Office Hours</h3>
							<p className="text-sm text-muted-foreground mb-2">Mon-Fri</p>
							<p className="text-xs text-muted-foreground">9:00 AM - 6:00 PM EST</p>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Form */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
							<p className="text-muted-foreground">
								Fill out the form below and we&apos;ll get back to you as soon as possible.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-8 md:p-12 border">
							<form className="space-y-6">
								<div className="grid md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label htmlFor="firstName">First Name *</Label>
										<Input id="firstName" placeholder="John" required />
									</div>
									<div className="space-y-2">
										<Label htmlFor="lastName">Last Name *</Label>
										<Input id="lastName" placeholder="Doe" required />
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">Email *</Label>
									<Input id="email" type="email" placeholder="john@example.com" required />
								</div>

								<div className="space-y-2">
									<Label htmlFor="company">Company (Optional)</Label>
									<Input id="company" placeholder="Your company name" />
								</div>

								<div className="space-y-2">
									<Label htmlFor="category">What can we help you with? *</Label>
									<select
										id="category"
										className="w-full rounded-md border bg-background px-3 py-2 text-sm"
										required
									>
										<option value="">Select a topic</option>
										<option value="general">General Inquiry</option>
										<option value="sales">Sales & Pricing</option>
										<option value="support">Technical Support</option>
										<option value="partnership">Partnership Opportunities</option>
										<option value="press">Press & Media</option>
										<option value="feedback">Product Feedback</option>
										<option value="other">Other</option>
									</select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="subject">Subject *</Label>
									<Input id="subject" placeholder="How can we help?" required />
								</div>

								<div className="space-y-2">
									<Label htmlFor="message">Message *</Label>
									<Textarea
										id="message"
										placeholder="Tell us more about your inquiry..."
										className="min-h-[150px]"
										required
									/>
								</div>

								<div className="pt-4">
									<Button type="submit" size="lg" className="w-full md:w-auto">
										<Send className="mr-2 size-4" />
										Send Message
									</Button>
								</div>

								<p className="text-xs text-muted-foreground">
									By submitting this form, you agree to our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>.
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>

			{/* Enterprise & Sales */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
						<div className="bg-background rounded-lg p-8 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<MessageSquare className="size-6" />
							</div>
							<h3 className="text-2xl font-bold mb-4">Sales Inquiries</h3>
							<p className="text-muted-foreground mb-6">
								Interested in Notiva for your business? Our sales team can help you find the right plan and answer questions about enterprise features.
							</p>
							<Button asChild>
								<Link href="mailto:sales@multroid.com">
									<Mail className="mr-2 size-4" />
									Contact Sales
								</Link>
							</Button>
						</div>

						<div className="bg-background rounded-lg p-8 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Mail className="size-6" />
							</div>
							<h3 className="text-2xl font-bold mb-4">Press & Media</h3>
							<p className="text-muted-foreground mb-6">
								Members of the press looking for information, interviews, or brand assets can reach out to our press team.
							</p>
							<Button asChild variant="outline">
								<Link href="mailto:press@multroid.com">
									<Mail className="mr-2 size-4" />
									Contact Press Team
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Office Location */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto bg-muted/50 rounded-lg p-8 md:p-12 border">
						<div className="flex flex-col md:flex-row gap-8 items-center">
							<div className="flex-shrink-0">
								<div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
									<MapPin className="size-8" />
								</div>
							</div>
							<div className="flex-1 text-center md:text-left">
								<h2 className="text-2xl font-bold mb-2">Visit Us</h2>
								<p className="text-muted-foreground mb-4">
									While Notiva is a digital-first product, our parent company Multroid welcomes visitors and partners.
								</p>
								<Link href="https://multroid.com" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
									Learn more about Multroid →
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Quick Links */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4">Looking for Quick Answers?</h2>
					<p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
						Check out our Help Center for instant answers to common questions.
					</p>
					<Button asChild size="lg" variant="outline">
						<Link href="/help">Visit Help Center</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}

