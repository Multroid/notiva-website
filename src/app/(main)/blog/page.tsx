import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogPage() {
	// Sample blog posts - in production, these would come from a CMS or database
	const blogPosts = [
		{
			id: 1,
			title: "10 Ways to Save Money on Subscriptions in 2025",
			excerpt: "Discover proven strategies to reduce your subscription costs without sacrificing the services you love.",
			category: "Tips & Guides",
			date: "March 15, 2025",
			readTime: "5 min read",
			image: "/blog/subscription-savings.jpg",
		},
		{
			id: 2,
			title: "The Hidden Cost of Forgotten Subscriptions",
			excerpt: "How much are unused subscriptions really costing you? Our research reveals surprising statistics.",
			category: "Industry Insights",
			date: "March 10, 2025",
			readTime: "7 min read",
			image: "/blog/forgotten-subs.jpg",
		},
		{
			id: 3,
			title: "How to Audit Your Company's SaaS Stack",
			excerpt: "A step-by-step guide for businesses to identify waste and optimize their software subscriptions.",
			category: "Business",
			date: "March 5, 2025",
			readTime: "10 min read",
			image: "/blog/saas-audit.jpg",
		},
		{
			id: 4,
			title: "Subscription Management Best Practices for 2025",
			excerpt: "Expert tips and industry best practices for staying on top of your recurring expenses.",
			category: "Best Practices",
			date: "February 28, 2025",
			readTime: "6 min read",
			image: "/blog/best-practices.jpg",
		},
		{
			id: 5,
			title: "Understanding Different Types of Subscription Models",
			excerpt: "From freemium to enterprise - a comprehensive guide to subscription pricing models.",
			category: "Education",
			date: "February 20, 2025",
			readTime: "8 min read",
			image: "/blog/subscription-models.jpg",
		},
		{
			id: 6,
			title: "Notiva Product Update: Calendar Sync is Here",
			excerpt: "We're excited to announce our new Google Calendar integration and other exciting features.",
			category: "Product Updates",
			date: "February 15, 2025",
			readTime: "4 min read",
			image: "/blog/product-update.jpg",
		},
	];

	const categories = ["All", "Tips & Guides", "Industry Insights", "Business", "Best Practices", "Education", "Product Updates"];

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="py-20 text-center bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 mb-6">
						<BookOpen className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Notiva Blog</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
						Tips, guides, and insights to help you master subscription management and save money.
					</p>
				</div>
			</section>

			{/* Category Filter */}
			<section className="py-8 border-b bg-background sticky top-16 z-30">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap gap-2 justify-center">
						{categories.map((category) => (
							<Button
								key={category}
								variant={category === "All" ? "default" : "outline"}
								size="sm"
							>
								{category}
							</Button>
						))}
					</div>
				</div>
			</section>

			{/* Featured Post */}
			<section className="py-12">
				<div className="container mx-auto px-4">
					<div className="max-w-5xl mx-auto">
						<div className="bg-muted/50 rounded-lg overflow-hidden border">
							<div className="grid md:grid-cols-2 gap-0">
								<div className="bg-muted flex items-center justify-center p-12">
									<BookOpen className="size-32 text-muted-foreground/30" />
								</div>
								<div className="p-8 flex flex-col justify-center">
									<span className="text-sm font-semibold text-primary mb-2">FEATURED POST</span>
									<h2 className="text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
									<p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
									<div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
										<span className="flex items-center gap-1">
											<Calendar className="size-4" />
											{blogPosts[0].date}
										</span>
										<span>•</span>
										<span>{blogPosts[0].readTime}</span>
									</div>
									<Button asChild>
										<Link href={`/blog/${blogPosts[0].id}`}>
											Read Article <ArrowRight className="ml-2 size-4" />
										</Link>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Blog Posts Grid */}
			<section className="py-12">
				<div className="container mx-auto px-4">
					<h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{blogPosts.slice(1).map((post) => (
							<article key={post.id} className="bg-background border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
								<div className="bg-muted h-48 flex items-center justify-center">
									<BookOpen className="size-16 text-muted-foreground/30" />
								</div>
								<div className="p-6">
									<span className="text-xs font-semibold text-primary uppercase">{post.category}</span>
									<h3 className="text-xl font-bold mt-2 mb-3 line-clamp-2">{post.title}</h3>
									<p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
									<div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
										<span className="flex items-center gap-1">
											<Calendar className="size-3" />
											{post.date}
										</span>
										<span>•</span>
										<span>{post.readTime}</span>
									</div>
									<Link href={`/blog/${post.id}`} className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
										Read More <ArrowRight className="size-4" />
									</Link>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* Newsletter Signup */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4">
					<div className="max-w-2xl mx-auto text-center">
						<h2 className="text-3xl font-bold mb-4">Never Miss an Update</h2>
						<p className="text-lg opacity-90 mb-8">
							Subscribe to our newsletter for the latest tips, guides, and product updates delivered to your inbox.
						</p>
						<div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-1 px-4 py-3 rounded-md text-foreground"
							/>
							<Button variant="secondary" size="lg">
								Subscribe
							</Button>
						</div>
						<p className="text-sm opacity-75 mt-4">No spam. Unsubscribe anytime.</p>
					</div>
				</div>
			</section>

			{/* Topics */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Explore Topics</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
						<Link href="/blog/category/tips" className="bg-muted/50 rounded-lg p-6 hover:bg-muted transition-colors">
							<h3 className="font-semibold mb-2">Tips & Tricks</h3>
							<p className="text-sm text-muted-foreground">Practical advice for managing subscriptions</p>
						</Link>
						<Link href="/blog/category/business" className="bg-muted/50 rounded-lg p-6 hover:bg-muted transition-colors">
							<h3 className="font-semibold mb-2">Business</h3>
							<p className="text-sm text-muted-foreground">SaaS management for companies</p>
						</Link>
						<Link href="/blog/category/guides" className="bg-muted/50 rounded-lg p-6 hover:bg-muted transition-colors">
							<h3 className="font-semibold mb-2">How-To Guides</h3>
							<p className="text-sm text-muted-foreground">Step-by-step tutorials</p>
						</Link>
						<Link href="/blog/category/updates" className="bg-muted/50 rounded-lg p-6 hover:bg-muted transition-colors">
							<h3 className="font-semibold mb-2">Product Updates</h3>
							<p className="text-sm text-muted-foreground">Latest features and improvements</p>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}

