import { FolderLock, Shield, Search, Cloud, FileText, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DocumentVaultPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 mb-6">
						<FolderLock className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Secure Document Storage</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
						Store bills, contracts, and receipts securely in one place. Access your important documents anytime, anywhere.
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
					<h2 className="text-3xl font-bold text-center mb-12">Document Vault Features</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Shield className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Bank-Level Encryption</h3>
							<p className="text-muted-foreground">
								Your documents are encrypted with AES-256 encryption, the same standard used by financial institutions.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Cloud className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Cloud Backup</h3>
							<p className="text-muted-foreground">
								Automatic cloud backups ensure your documents are safe and accessible from any device.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Search className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Smart Search</h3>
							<p className="text-muted-foreground">
								Find documents instantly with powerful search by name, date, subscription, or content.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<FileText className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
							<p className="text-muted-foreground">
								Upload PDFs, images, Word documents, and more. Preview files directly in your browser.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<Lock className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Access Control</h3>
							<p className="text-muted-foreground">
								Share documents securely with team members or family with granular permission controls.
							</p>
						</div>

						<div className="bg-background rounded-lg p-6 border">
							<div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
								<FolderLock className="size-6" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Organized Library</h3>
							<p className="text-muted-foreground">
								Automatically organize documents by subscription or create custom folders for easy management.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Use Cases */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">What You Can Store</h2>
					<div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-lg font-semibold mb-3">Subscription Contracts</h3>
							<p className="text-muted-foreground">
								Keep all your service agreements and terms of service in one secure place.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-lg font-semibold mb-3">Invoices & Receipts</h3>
							<p className="text-muted-foreground">
								Store payment records and receipts for easy reference during tax season.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-lg font-semibold mb-3">Bills & Statements</h3>
							<p className="text-muted-foreground">
								Archive monthly statements and bills for your utilities and services.
							</p>
						</div>

						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="text-lg font-semibold mb-3">Warranty Documents</h3>
							<p className="text-muted-foreground">
								Never lose track of warranty information and purchase confirmations.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Security Assurance */}
			<section className="py-20 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<Shield className="size-16 mx-auto mb-6 text-primary" />
						<h2 className="text-3xl font-bold mb-4">Your Security is Our Priority</h2>
						<p className="text-lg text-muted-foreground mb-6">
							We use industry-leading security practices to protect your sensitive documents. Your files are encrypted both in transit and at rest, and we never access your documents without your explicit permission.
						</p>
						<Button asChild variant="outline">
							<Link href="/security">Learn More About Our Security</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Start Securing Your Documents Today
					</h2>
					<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
						Join Notiva and keep all your important subscription documents safe and organized.
					</p>
					<Button asChild size="lg" variant="secondary">
						<Link href="/register">Get Started Free</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}

