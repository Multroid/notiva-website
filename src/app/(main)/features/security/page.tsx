import { Shield, Lock, Eye, Key, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SecurityPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 mb-6">
						<Shield className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Enterprise-Grade Security</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
						Your data's security is our top priority. We use industry-leading practices to protect your sensitive subscription information.
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

			{/* Security Features */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Our Security Features</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Lock className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">AES-256 Encryption</h3>
							<p className="text-muted-foreground">
								All your data is encrypted at rest and in transit using bank-level AES-256 encryption standards.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Key className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Two-Factor Authentication</h3>
							<p className="text-muted-foreground">
								Add an extra layer of security with 2FA using authenticator apps or SMS verification.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Eye className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Access Controls</h3>
							<p className="text-muted-foreground">
								Granular permission settings let you control exactly who can view or edit your subscriptions.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Shield className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Regular Security Audits</h3>
							<p className="text-muted-foreground">
								We conduct regular third-party security audits to ensure our systems meet the highest standards.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<CheckCircle className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">SOC 2 Compliance</h3>
							<p className="text-muted-foreground">
								We're SOC 2 Type II certified, demonstrating our commitment to data security and privacy.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<AlertCircle className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Activity Monitoring</h3>
							<p className="text-muted-foreground">
								Track all account activity with detailed logs to detect and prevent unauthorized access.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Compliance & Certifications */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Compliance & Certifications</h2>
					<div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-3">GDPR Compliant</h3>
							<p className="text-muted-foreground">
								Fully compliant with the General Data Protection Regulation, ensuring your data rights are protected under EU law.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-3">CCPA Compliant</h3>
							<p className="text-muted-foreground">
								We comply with the California Consumer Privacy Act, giving you control over your personal information.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-3">ISO 27001 Certified</h3>
							<p className="text-muted-foreground">
								Our information security management system meets international ISO 27001 standards.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-3">PCI DSS Compliant</h3>
							<p className="text-muted-foreground">
								Payment card data is handled according to PCI DSS standards for maximum security.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Data Privacy */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-3xl font-bold text-center mb-8">Your Privacy Matters</h2>
						<div className="space-y-6">
							<div className="bg-background rounded-lg p-6 border">
								<h3 className="text-lg font-semibold mb-2">We Never Sell Your Data</h3>
								<p className="text-muted-foreground">
									Your subscription data is yours. We never sell, rent, or share your information with third parties for marketing purposes.
								</p>
							</div>

							<div className="bg-background rounded-lg p-6 border">
								<h3 className="text-lg font-semibold mb-2">Transparent Data Usage</h3>
								<p className="text-muted-foreground">
									We're completely transparent about how we use your data. Read our privacy policy to learn exactly what we collect and why.
								</p>
							</div>

							<div className="bg-background rounded-lg p-6 border">
								<h3 className="text-lg font-semibold mb-2">Easy Data Export & Deletion</h3>
								<p className="text-muted-foreground">
									Export all your data at any time or request complete deletion of your account and information.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Infrastructure Security */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Infrastructure Security</h2>
					<div className="max-w-3xl mx-auto space-y-8">
						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								<CheckCircle className="size-5" />
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Secure Cloud Hosting</h3>
								<p className="text-muted-foreground">
									Hosted on AWS with 99.9% uptime SLA, automatic backups, and disaster recovery protocols.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								<CheckCircle className="size-5" />
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">DDoS Protection</h3>
								<p className="text-muted-foreground">
									Advanced DDoS mitigation protects against distributed denial-of-service attacks.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								<CheckCircle className="size-5" />
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Regular Backups</h3>
								<p className="text-muted-foreground">
									Automated daily backups with point-in-time recovery ensure your data is never lost.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								<CheckCircle className="size-5" />
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Security Monitoring</h3>
								<p className="text-muted-foreground">
									24/7 monitoring and automated alerts help us detect and respond to security threats immediately.
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
						Your Data is Safe with Us
					</h2>
					<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
						Join thousands of users who trust Notiva to keep their subscription data secure.
					</p>
					<Button asChild size="lg" variant="secondary">
						<Link href="/register">Get Started Free</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}

