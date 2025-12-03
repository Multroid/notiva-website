import { Building, Shield, BarChart3, Users, Zap, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EnterprisePage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 mb-6">
						<Building className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Enterprise Subscription Management</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
						Complete visibility and control over enterprise-wide subscriptions. Built for large organizations with advanced security and compliance needs.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button asChild size="lg">
							<Link href="/contact">Request Demo</Link>
						</Button>
						<Button asChild variant="outline" size="lg">
							<Link href="/pricing">View Enterprise Pricing</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Enterprise Challenges */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-3xl font-bold text-center mb-8">Enterprise Challenges We Solve</h2>
						<div className="grid md:grid-cols-2 gap-6">
							<div className="bg-background rounded-lg p-6 border">
								<p className="text-muted-foreground">
									💰 Millions spent annually on SaaS with limited visibility into usage and ROI
								</p>
							</div>
							<div className="bg-background rounded-lg p-6 border">
								<p className="text-muted-foreground">
									🔒 Compliance and security requirements for managing sensitive subscription data
								</p>
							</div>
							<div className="bg-background rounded-lg p-6 border">
								<p className="text-muted-foreground">
									👥 Decentralized purchasing across departments leading to shadow IT and waste
								</p>
							</div>
							<div className="bg-background rounded-lg p-6 border">
								<p className="text-muted-foreground">
									📊 Complex reporting needs for finance, procurement, and executive leadership
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Enterprise Features */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Enterprise-Grade Features</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Shield className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Advanced Security</h3>
							<p className="text-muted-foreground">
								SOC 2 Type II certified, SAML SSO, custom data retention policies, and dedicated security team.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Users className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Unlimited Users</h3>
							<p className="text-muted-foreground">
								Add unlimited team members across all departments with granular role-based access controls.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<BarChart3 className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
							<p className="text-muted-foreground">
								Custom dashboards, executive reports, cost allocation by department, and predictive forecasting.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Lock className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Compliance Ready</h3>
							<p className="text-muted-foreground">
								GDPR, CCPA, HIPAA compliant. Audit logs, data residency options, and compliance reporting.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Zap className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">API & Integrations</h3>
							<p className="text-muted-foreground">
								REST API, webhooks, and pre-built integrations with ERP, procurement, and finance systems.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Building className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Dedicated Support</h3>
							<p className="text-muted-foreground">
								Priority 24/7 support, dedicated account manager, and custom onboarding assistance.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Compliance & Security */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Security & Compliance</h2>
					<div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
						<div className="bg-background rounded-lg p-6 border">
							<h3 className="text-xl font-semibold mb-3">Security Standards</h3>
							<ul className="space-y-2 text-muted-foreground">
								<li>✓ SOC 2 Type II Certified</li>
								<li>✓ ISO 27001 Certified</li>
								<li>✓ AES-256 Encryption</li>
								<li>✓ Regular Penetration Testing</li>
								<li>✓ 99.9% Uptime SLA</li>
							</ul>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<h3 className="text-xl font-semibold mb-3">Compliance</h3>
							<ul className="space-y-2 text-muted-foreground">
								<li>✓ GDPR Compliant</li>
								<li>✓ CCPA Compliant</li>
								<li>✓ HIPAA Compliant Options</li>
								<li>✓ PCI DSS Compliant</li>
								<li>✓ Custom Data Residency</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Integration Partners */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Enterprise Integrations</h2>
					<div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
						<div className="bg-muted/50 rounded-lg p-4 border">
							<h3 className="font-semibold mb-3">ERP Systems</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• SAP</li>
								<li>• Oracle NetSuite</li>
								<li>• Microsoft Dynamics</li>
								<li>• Workday</li>
							</ul>
						</div>

						<div className="bg-muted/50 rounded-lg p-4 border">
							<h3 className="font-semibold mb-3">Procurement</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• Coupa</li>
								<li>• Ariba</li>
								<li>• Jaggaer</li>
								<li>• Ivalua</li>
							</ul>
						</div>

						<div className="bg-muted/50 rounded-lg p-4 border">
							<h3 className="font-semibold mb-3">Identity & SSO</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• Okta</li>
								<li>• Azure AD</li>
								<li>• OneLogin</li>
								<li>• Ping Identity</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Use Cases */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Enterprise Use Cases</h2>
					<div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
						<div className="bg-background rounded-lg p-6 border">
							<h3 className="text-xl font-semibold mb-3">Financial Services</h3>
							<p className="text-muted-foreground">
								Banks and financial institutions use Notiva to track fintech subscriptions, maintain compliance, and manage vendor relationships across global offices.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<h3 className="text-xl font-semibold mb-3">Healthcare</h3>
							<p className="text-muted-foreground">
								Healthcare organizations manage HIPAA-compliant subscriptions for medical software, patient management systems, and clinical tools.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<h3 className="text-xl font-semibold mb-3">Technology Companies</h3>
							<p className="text-muted-foreground">
								Tech companies control cloud infrastructure costs, development tools, and SaaS across engineering, sales, and marketing teams.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<h3 className="text-xl font-semibold mb-3">Manufacturing</h3>
							<p className="text-muted-foreground">
								Manufacturing enterprises track industrial software licenses, IoT subscriptions, and supply chain management platforms.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Success Story */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/20">
						<div className="text-center mb-6">
							<div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 text-primary mb-4">
								<Building className="size-8" />
							</div>
							<p className="text-lg text-muted-foreground mb-4">
								"With 5,000+ employees across 20 countries, we were spending $12M annually on SaaS without proper visibility. Notiva helped us consolidate vendors, eliminate redundancies, and save $2.4M in the first year. The compliance features were crucial for our SOX audits."
							</p>
							<p className="font-semibold">— Jennifer Wu, VP of IT Operations at Fortune 500 Company</p>
						</div>
					</div>
				</div>
			</section>

			{/* Implementation */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Enterprise Onboarding</h2>
					<div className="max-w-3xl mx-auto space-y-8">
						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								1
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Discovery Call</h3>
								<p className="text-muted-foreground">
									Meet with our team to discuss your requirements, compliance needs, and integration points.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								2
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Custom Implementation</h3>
								<p className="text-muted-foreground">
									Our team works with yours to configure SSO, set up integrations, and customize workflows.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
								3
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Team Training</h3>
								<p className="text-muted-foreground">
									Comprehensive training for admins and users, with ongoing support from your dedicated account manager.
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
						Ready for Enterprise-Grade Control?
					</h2>
					<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
						Schedule a demo to see how Notiva can transform your subscription management.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button asChild size="lg" variant="secondary">
							<Link href="/contact">Schedule Demo</Link>
						</Button>
						<Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
							<Link href="/pricing">View Pricing</Link>
						</Button>
					</div>
					<p className="text-sm opacity-75 mt-4">Custom pricing for enterprise • Dedicated support included</p>
				</div>
			</section>
		</div>
	);
}

