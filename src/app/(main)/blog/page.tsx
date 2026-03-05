import { BookOpenIcon as BookOpen, CalendarIcon as Calendar, ArrowRightIcon as ArrowRight } from "@heroicons/react/24/solid";
import Link from "next/link";
import { NotivaButtonLink } from "@/components/ui/notiva-button";

export default function BlogPage() {
	const blogPosts = [
		{
			id: 1,
			title: "How Novi Reads Your Invoices So You Don\u2019t Have To",
			excerpt: "A look at how Notiva\u2019s AI co-pilot scans invoices, detects patterns, and surfaces insights automatically.",
			category: "Product",
			date: "February 2026",
			readTime: "5 min read",
		},
		{
			id: 2,
			title: "5 Signs You\u2019re Overpaying on Subscriptions",
			excerpt: "Hidden fees, forgotten trials, and renewal creep \u2014 here\u2019s how to spot them before they add up.",
			category: "Tips & Guides",
			date: "January 2026",
			readTime: "7 min read",
		},
		{
			id: 3,
			title: "Why We Built Notiva with GDPR at Its Core",
			excerpt: "Privacy isn\u2019t a feature we added later. Here\u2019s how data protection shapes every decision we make.",
			category: "Engineering",
			date: "December 2025",
			readTime: "6 min read",
		},
		{
			id: 4,
			title: "The Real Cost of Forgotten Renewals",
			excerpt: "Our research shows the average person loses \u20AC240/year on subscriptions they forgot about. Here\u2019s how to fix it.",
			category: "Insights",
			date: "November 2025",
			readTime: "8 min read",
		},
		{
			id: 5,
			title: "Notiva Launch: Your AI Financial Friend Is Here",
			excerpt: "Introducing Notiva \u2014 the AI-native platform that tracks your accounts, invoices, subscriptions, and taxes in one place.",
			category: "Announcements",
			date: "September 2025",
			readTime: "4 min read",
		},
	];

	const categories = ["All", "Product", "Tips & Guides", "Engineering", "Insights", "Announcements"];

	return (
		<div className="min-h-screen">
			{/* Hero */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-[#D9E3F5] text-[#0047BA] ring-1 ring-[#B0C6EA] mb-6">
						<BookOpen className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#0047BA]">Notiva Blog</h1>
					<p className="text-xl text-[var(--multroid-grey-dark)] max-w-2xl mx-auto">
						Tips, product updates, and insights on managing your finances with AI.
					</p>
				</div>
			</section>

			{/* Category Filter */}
			<section className="py-6 border-b border-[#B0C6EA] sticky top-[84px] z-30 bg-white">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap gap-2 justify-center">
						{categories.map((category) => (
							<button
								key={category}
								className={`px-4 py-2 rounded-[8px] text-sm font-medium transition-colors ${
									category === "All"
										? "bg-[#0047BA] text-[#F0EEE9]"
										: "bg-[#D9E3F5] text-[#0047BA] border border-[#B0C6EA] hover:bg-[#B0C6EA]"
								}`}
							>
								{category}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* Featured Post */}
			<section className="py-12">
				<div className="container mx-auto px-4">
					<div className="max-w-5xl mx-auto">
						<div className="rounded-[12px] overflow-hidden border border-[#B0C6EA] bg-white">
							<div className="grid md:grid-cols-2 gap-0">
								<div className="bg-[#D9E3F5] flex items-center justify-center p-12">
									<BookOpen className="size-32 text-[#0047BA]/20" />
								</div>
								<div className="p-8 flex flex-col justify-center">
									<span className="text-xs font-semibold text-[#F05627] uppercase mb-2">Featured Post</span>
									<h2 className="text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
									<p className="text-[var(--multroid-grey-dark)] mb-6">{blogPosts[0].excerpt}</p>
									<div className="flex items-center gap-4 text-sm text-[var(--multroid-grey)] mb-6">
										<span className="flex items-center gap-1">
											<Calendar className="size-4" />
											{blogPosts[0].date}
										</span>
										<span>&middot;</span>
										<span>{blogPosts[0].readTime}</span>
									</div>
									<div>
										<NotivaButtonLink href={`/blog/${blogPosts[0].id}`} variant="primary" size="sm">
											Read Article
										</NotivaButtonLink>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Blog Grid */}
			<section className="py-12">
				<div className="container mx-auto px-4">
					<h2 className="text-2xl font-bold mb-8 text-[#0047BA]">Latest Articles</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{blogPosts.slice(1).map((post) => (
							<article key={post.id} className="rounded-[12px] border border-[#B0C6EA] bg-white overflow-hidden hover:shadow-lg transition-shadow">
								<div className="bg-[#D9E3F5] h-48 flex items-center justify-center">
									<BookOpen className="size-16 text-[#0047BA]/20" />
								</div>
								<div className="p-6">
									<span className="text-xs font-semibold text-[#F05627] uppercase">{post.category}</span>
									<h3 className="text-xl font-bold mt-2 mb-3 line-clamp-2">{post.title}</h3>
									<p className="text-[var(--multroid-grey-dark)] text-sm mb-4 line-clamp-3">{post.excerpt}</p>
									<div className="flex items-center gap-3 text-xs text-[var(--multroid-grey)] mb-4">
										<span className="flex items-center gap-1">
											<Calendar className="size-3" />
											{post.date}
										</span>
										<span>&middot;</span>
										<span>{post.readTime}</span>
									</div>
									<Link href={`/blog/${post.id}`} className="text-sm font-semibold text-[#0047BA] hover:underline inline-flex items-center gap-1">
										Read More <ArrowRight className="size-4" />
									</Link>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* Newsletter */}
			<section className="py-20 bg-[#0047BA]">
				<div className="container mx-auto px-4">
					<div className="max-w-2xl mx-auto text-center">
						<h2 className="text-3xl font-bold mb-4 text-[#F0EEE9]">Never Miss an Update</h2>
						<p className="text-lg text-[#B0C6EA] mb-8">
							Subscribe for the latest tips, guides, and product updates delivered to your inbox.
						</p>
						<div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-1 px-4 py-3 rounded-[8px] text-sm bg-[#D9E3F5] border border-[#B0C6EA] text-[#0047BA] placeholder:text-[#0047BA]/50"
							/>
							<NotivaButtonLink href="#" variant="important" size="lg">
								Subscribe
							</NotivaButtonLink>
						</div>
						<p className="text-sm text-[#B0C6EA]/70 mt-4">No spam. Unsubscribe anytime.</p>
					</div>
				</div>
			</section>

			{/* Topics */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#0047BA]">Explore Topics</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
						{[
							{ title: "Tips & Tricks", desc: "Practical advice for managing finances" },
							{ title: "Product Updates", desc: "Latest Notiva features and improvements" },
							{ title: "Engineering", desc: "How we build Notiva under the hood" },
							{ title: "Insights", desc: "Data and research on financial habits" },
						].map((topic) => (
							<div key={topic.title} className="rounded-[12px] p-6 border border-[#B0C6EA] bg-white hover:bg-[#FAFAF8] transition-colors">
								<h3 className="font-semibold mb-2">{topic.title}</h3>
								<p className="text-sm text-[var(--multroid-grey-dark)]">{topic.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
