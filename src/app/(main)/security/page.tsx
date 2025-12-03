import { Shield, Lock, Eye, Server, FileCheck, AlertCircle } from "lucide-react";
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
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Security & Privacy</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
						Your data security and privacy are our highest priorities. Learn about our comprehensive approach to keeping your information safe.
					</p>
				</div>
			</section>

			{/* Core Security Principles */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Our Security Commitment</h2>
					<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						<div className="bg-background rounded-lg p-6 border text-center">
							<div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
								<Lock className="size-8" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Encrypted by Default</h3>
							<p className="text-muted-foreground">
								All data is encrypted in transit and at rest using AES-256 encryption, the same standard used by banks and government agencies.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border text-center">
							<div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
								<Eye className="size-8" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Zero-Knowledge Architecture</h3>
							<p className="text-muted-foreground">
								We never have access to your unencrypted data. Only you can decrypt and view your sensitive subscription information.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border text-center">
							<div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
								<Shield className="size-8" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Regular Security Audits</h3>
							<p className="text-muted-foreground">
								Third-party security experts regularly test and audit our systems to ensure we meet the highest security standards.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Security Features */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Security Features</h2>
					<div className="max-w-4xl mx-auto space-y-8">
						<div className="flex gap-6">
							<div className="flex-shrink-0">
								<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
									<Lock className="size-6" />
								</div>
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Two-Factor Authentication (2FA)</h3>
								<p className="text-muted-foreground">
									Add an extra layer of security to your account with 2FA. We support authenticator apps (Google Authenticator, Authy) and SMS verification.
								</p>
							</div>
						</div>

						<div className="flex gap-6">
							<div className="flex-shrink-0">
								<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
									<Eye className="size-6" />
								</div>
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Granular Access Controls</h3>
								<p className="text-muted-foreground">
									Control exactly who can access your subscription data with role-based permissions and access logs that track every action.
								</p>
							</div>
						</div>

						<div className="flex gap-6">
							<div className="flex-shrink-0">
								<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
									<Server className="size-6" />
								</div>
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Secure Infrastructure</h3>
								<p className="text-muted-foreground">
									Hosted on AWS with industry-leading security measures, automatic failover, and geographic redundancy to ensure your data is always safe and available.
								</p>
							</div>
						</div>

						<div className="flex gap-6">
							<div className="flex-shrink-0">
								<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
									<AlertCircle className="size-6" />
								</div>
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Activity Monitoring</h3>
								<p className="text-muted-foreground">
									Real-time monitoring and alerting for suspicious activities. Get notified immediately of any unauthorized access attempts.
								</p>
							</div>
						</div>

						<div className="flex gap-6">
							<div className="flex-shrink-0">
								<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
									<FileCheck className="size-6" />
								</div>
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Automated Backups</h3>
								<p className="text-muted-foreground">
									Daily automated backups with point-in-time recovery ensure your data is never lost, even in the unlikely event of a system failure.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Compliance & Certifications */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Compliance & Certifications</h2>
					<div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
						<div className="bg-background rounded-lg p-6 border">
							<h3 className="text-xl font-semibold mb-3">SOC 2 Type II Certified</h3>
							<p className="text-muted-foreground">
								We've completed rigorous SOC 2 Type II audits, demonstrating our commitment to security, availability, and confidentiality.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<h3 className="text-xl font-semibold mb-3">GDPR Compliant</h3>
							<p className="text-muted-foreground">
								Fully compliant with the General Data Protection Regulation. You have complete control over your data and privacy.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<h3 className="text-xl font-semibold mb-3">CCPA Compliant</h3>
							<p className="text-muted-foreground">
								We comply with the California Consumer Privacy Act and respect your rights to know, delete, and opt-out.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<h3 className="text-xl font-semibold mb-3">ISO 27001 Certified</h3>
							<p className="text-muted-foreground">
								Our information security management system meets the international ISO 27001 standard.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Privacy Practices */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-3xl font-bold text-center mb-12">Our Privacy Practices</h2>
						<div className="space-y-6">
							<div className="bg-muted/50 rounded-lg p-6 border-l-4 border-primary">
								<h3 className="text-lg font-semibold mb-2">We Don't Sell Your Data. Ever.</h3>
								<p className="text-muted-foreground">
									Your subscription data is yours and yours alone. We never sell, rent, or share your information with third parties for marketing purposes.
								</p>
							</div>

							<div className="bg-muted/50 rounded-lg p-6 border-l-4 border-primary">
								<h3 className="text-lg font-semibold mb-2">Transparent Data Usage</h3>
								<p className="text-muted-foreground">
									We're completely transparent about what data we collect and why. Read our detailed privacy policy to understand exactly how we use your information.
								</p>
							</div>

							<div className="bg-muted/50 rounded-lg p-6 border-l-4 border-primary">
								<h3 className="text-lg font-semibold mb-2">Your Data, Your Control</h3>
								<p className="text-muted-foreground">
									Export all your data at any time in standard formats. Want to delete your account? You can do it instantly, and we'll delete all your data.
								</p>
							</div>

							<div className="bg-muted/50 rounded-lg p-6 border-l-4 border-primary">
								<h3 className="text-lg font-semibold mb-2">Minimal Data Collection</h3>
								<p className="text-muted-foreground">
									We only collect the data necessary to provide our service. No tracking pixels, no unnecessary analytics, no hidden data collection.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Incident Response */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-3xl font-bold mb-6">Security Incident Response</h2>
						<p className="text-lg text-muted-foreground mb-8">
							While we work hard to prevent security incidents, we have a comprehensive incident response plan in place. If a security issue affects your data, we'll notify you within 72 hours and take immediate action to resolve it.
						</p>
						<Button asChild variant="outline">
							<Link href="/contact">Report a Security Issue</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Bug Bounty */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/20">
						<div className="text-center">
							<Shield className="size-16 mx-auto mb-6 text-primary" />
							<h2 className="text-3xl font-bold mb-4">Security Researcher Program</h2>
							<p className="text-lg text-muted-foreground mb-6">
								We welcome security researchers to help us keep Notiva secure. If you discover a security vulnerability, please report it responsibly to our security team.
							</p>
							<Button asChild>
								<Link href="/security/responsible-disclosure">Learn More</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Questions */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4">Questions About Security?</h2>
					<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
						We're happy to answer any questions about our security practices. Contact our security team directly.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button asChild size="lg">
							<Link href="/contact">Contact Security Team</Link>
						</Button>
						<Button asChild variant="outline" size="lg">
							<Link href="/help">Visit Help Center</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}

