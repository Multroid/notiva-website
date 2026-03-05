import { EnvelopeIcon as Mail, ChatBubbleLeftRightIcon as MessageSquare, PhoneIcon as Phone, MapPinIcon as MapPin, PaperAirplaneIcon as Send, ClockIcon as Clock } from "@heroicons/react/24/solid";
import Link from "next/link";
import { NotivaButtonLink } from "@/components/ui/notiva-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
	return (
		<div className="min-h-screen">
			{/* Hero */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-[#D9E3F5] text-[#0047BA] ring-1 ring-[#B0C6EA] mb-6">
						<Mail className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#0047BA]">Get in Touch</h1>
					<p className="text-xl text-[var(--multroid-grey-dark)] max-w-2xl mx-auto">
						Have questions about Notiva? We&apos;d love to hear from you. Our team is here to help.
					</p>
				</div>
			</section>

			{/* Contact Methods */}
			<section className="py-12 bg-[#FAFAF8]">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
						{[
							{ icon: Mail, title: "Email", line1: "support@notiva.de", line2: "Response in 24 hours" },
							{ icon: MessageSquare, title: "Live Chat", line1: "Chat with us", line2: "Mon\u2013Fri 9am\u20135pm CET" },
							{ icon: Phone, title: "Sales", line1: "sales@multroid.com", line2: "For enterprise inquiries" },
							{ icon: Clock, title: "Office Hours", line1: "Mon\u2013Fri", line2: "9:00 AM \u2013 6:00 PM CET" },
						].map((item) => (
							<div key={item.title} className="rounded-[12px] p-6 border border-[#B0C6EA] bg-white text-center">
								<div className="size-12 rounded-lg bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center mx-auto mb-4">
									<item.icon className="size-6" />
								</div>
								<h3 className="font-semibold mb-2">{item.title}</h3>
								<p className="text-sm text-[var(--multroid-grey-dark)] mb-1">{item.line1}</p>
								<p className="text-xs text-[var(--multroid-grey)]">{item.line2}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Contact Form */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold mb-4 text-[#0047BA]">Send Us a Message</h2>
							<p className="text-[var(--multroid-grey-dark)]">
								Fill out the form below and we&apos;ll get back to you as soon as possible.
							</p>
						</div>

						<div className="rounded-[12px] p-8 md:p-12 border border-[#B0C6EA] bg-white">
							<form className="space-y-6">
								<div className="grid md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label htmlFor="firstName">First Name *</Label>
										<Input id="firstName" placeholder="John" required className="border-[#B0C6EA] focus:border-[#0047BA]" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="lastName">Last Name *</Label>
										<Input id="lastName" placeholder="Doe" required className="border-[#B0C6EA] focus:border-[#0047BA]" />
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">Email *</Label>
									<Input id="email" type="email" placeholder="john@example.com" required className="border-[#B0C6EA] focus:border-[#0047BA]" />
								</div>

								<div className="space-y-2">
									<Label htmlFor="company">Company (Optional)</Label>
									<Input id="company" placeholder="Your company name" className="border-[#B0C6EA] focus:border-[#0047BA]" />
								</div>

								<div className="space-y-2">
									<Label htmlFor="category">What can we help you with? *</Label>
									<select
										id="category"
										className="w-full rounded-[8px] border border-[#B0C6EA] bg-white px-3 py-2 text-sm focus:border-[#0047BA] focus:outline-none"
										required
									>
										<option value="">Select a topic</option>
										<option value="general">General Inquiry</option>
										<option value="sales">Sales &amp; Pricing</option>
										<option value="support">Technical Support</option>
										<option value="partnership">Partnership Opportunities</option>
										<option value="press">Press &amp; Media</option>
										<option value="feedback">Product Feedback</option>
										<option value="other">Other</option>
									</select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="subject">Subject *</Label>
									<Input id="subject" placeholder="How can we help?" required className="border-[#B0C6EA] focus:border-[#0047BA]" />
								</div>

								<div className="space-y-2">
									<Label htmlFor="message">Message *</Label>
									<Textarea
										id="message"
										placeholder="Tell us more about your inquiry..."
										className="min-h-[150px] border-[#B0C6EA] focus:border-[#0047BA]"
										required
									/>
								</div>

								<div className="pt-4">
									<button
										type="submit"
										className="inline-flex items-center gap-2 bg-[#0047BA] text-[#F0EEE9] font-semibold px-6 py-3 rounded-[8px] hover:bg-[#003995] transition-colors"
									>
										<Send className="size-4" />
										Send Message
									</button>
								</div>

								<p className="text-xs text-[var(--multroid-grey)]">
									By submitting this form, you agree to our Privacy Policy and Terms of Service.
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>

			{/* Sales & Press */}
			<section className="py-20 bg-[#FAFAF8]">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
						<div className="rounded-[12px] p-8 border border-[#B0C6EA] bg-white">
							<div className="size-12 rounded-lg bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center mb-4">
								<MessageSquare className="size-6" />
							</div>
							<h3 className="text-2xl font-bold mb-4">Sales Inquiries</h3>
							<p className="text-[var(--multroid-grey-dark)] mb-6">
								Interested in Notiva for your business? Our sales team can help you find the right plan.
							</p>
							<NotivaButtonLink href="mailto:sales@multroid.com" variant="primary" size="sm">
								Contact Sales
							</NotivaButtonLink>
						</div>

						<div className="rounded-[12px] p-8 border border-[#B0C6EA] bg-white">
							<div className="size-12 rounded-lg bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center mb-4">
								<Mail className="size-6" />
							</div>
							<h3 className="text-2xl font-bold mb-4">Press &amp; Media</h3>
							<p className="text-[var(--multroid-grey-dark)] mb-6">
								Looking for information, interviews, or brand assets? Reach out to our press team.
							</p>
							<NotivaButtonLink href="mailto:press@multroid.com" variant="secondary" size="sm">
								Contact Press Team
							</NotivaButtonLink>
						</div>
					</div>
				</div>
			</section>

			{/* Visit */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto rounded-[12px] p-8 md:p-12 border border-[#B0C6EA] bg-white">
						<div className="flex flex-col md:flex-row gap-8 items-center">
							<div className="size-16 rounded-2xl bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center shrink-0">
								<MapPin className="size-8" />
							</div>
							<div className="flex-1 text-center md:text-left">
								<h2 className="text-2xl font-bold mb-2">Visit Us</h2>
								<p className="text-[var(--multroid-grey-dark)] mb-4">
									Notiva is a digital-first product by Multroid. We welcome visitors and partners.
								</p>
								<Link href="https://multroid.com" target="_blank" rel="noopener noreferrer" className="text-[#0047BA] font-semibold hover:underline">
									Learn more about Multroid &rarr;
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Link */}
			<section className="py-20 bg-[#0047BA]">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4 text-[#F0EEE9]">Looking for Quick Answers?</h2>
					<p className="text-[#B0C6EA] mb-8 max-w-2xl mx-auto">
						Check out our Help Center for instant answers to common questions.
					</p>
					<NotivaButtonLink href="/help" variant="important" size="lg">
						Visit Help Center
					</NotivaButtonLink>
				</div>
			</section>
		</div>
	);
}
