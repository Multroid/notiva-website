"use client"

import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";
import { getMainAppLoginUrl, getMainAppRegisterUrl, getMainAppDashboardUrl } from "@/lib/app-url";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
	Menu,
	X,
	ChevronDown,
	Bell,
	CalendarDays,
	FolderLock,
	Users,
	Plug,
	Shield,
	User,
	Home,
	Building,
	Briefcase,
	BookOpen,
	HelpCircle,
	Link2,
	FileText,
	LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [mobileOpen, setMobileOpen] = useState(false)
	const { data: session } = useSession()
	const isAuthenticated = !!session?.user

	const closeMobile = () => setMobileOpen(false)

	return (
		<>
			<header className="w-full sticky top-0 z-40 supports-[backdrop-filter]:bg-background/70 bg-background border-b backdrop-blur">
				<div className="container mx-auto flex items-center justify-between py-4 px-4">
					<Link href="/" className="inline-flex items-center gap-2 font-semibold tracking-tight">
						<img
							src="/Notiva-Logo.svg"
							alt="Notiva"
							className="size-8 rounded-lg"
						/>
						<span className="dark:text-white">Notiva</span>
					</Link>
					<nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
						{/* Features */}
						<div className="relative group">
							<button type="button" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
								<span>Features</span>
								<ChevronDown className="size-3 text-muted-foreground group-hover:text-foreground transition-colors" />
							</button>
							<div className="absolute left-0 top-full mt-1 min-w-[720px] rounded-lg border bg-background shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 delay-100 transform translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0">
								{/* Invisible bridge to prevent dropdown from closing when moving mouse */}
								<div className="absolute -top-1 left-0 right-0 h-1"></div>
							<div className="grid grid-cols-2 lg:grid-cols-3 gap-2 p-3 lg:p-4">
								<Link href="/features/reminders" className="flex gap-3 rounded-md p-3 hover:bg-accent/50 transition-colors">
									<span className="size-9 grid place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20"><Bell className="size-5" /></span>
									<span>
										<span className="block text-foreground font-medium">Reminders</span>
										<span className="block text-xs text-muted-foreground">Never miss renewals or due dates.</span>
									</span>
								</Link>
								<Link href="/features/document-vault" className="flex gap-3 rounded-md p-3 hover:bg-accent/50 transition-colors">
									<span className="size-9 grid place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20"><FolderLock className="size-5" /></span>
									<span>
										<span className="block text-foreground font-medium">Document Vault</span>
										<span className="block text-xs text-muted-foreground">Securely store bills and contracts.</span>
									</span>
								</Link>
								<Link href="/features/calendar-sync" className="flex gap-3 rounded-md p-3 hover:bg-accent/50 transition-colors">
									<span className="size-9 grid place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20"><CalendarDays className="size-5" /></span>
									<span>
										<span className="block text-foreground font-medium">Calendar Sync</span>
										<span className="block text-xs text-muted-foreground">Sync key dates to your calendar.</span>
									</span>
								</Link>
								<Link href="/features/collaboration" className="flex gap-3 rounded-md p-3 hover:bg-accent/50 transition-colors">
									<span className="size-9 grid place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20"><Users className="size-5" /></span>
									<span>
										<span className="block text-foreground font-medium">Collaboration</span>
										<span className="block text-xs text-muted-foreground">Share and work with your team.</span>
									</span>
								</Link>
								<Link href="/features/integrations" className="flex gap-3 rounded-md p-3 hover:bg-accent/50 transition-colors">
									<span className="size-9 grid place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20"><Plug className="size-5" /></span>
									<span>
										<span className="block text-foreground font-medium">Integrations</span>
										<span className="block text-xs text-muted-foreground">Connect tools you already use.</span>
									</span>
								</Link>
								<Link href="/features/security" className="flex gap-3 rounded-md p-3 hover:bg-accent/50 transition-colors">
									<span className="size-9 grid place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20"><Shield className="size-5" /></span>
									<span>
										<span className="block text-foreground font-medium">Security</span>
										<span className="block text-xs text-muted-foreground">Enterprise‑grade privacy and access.</span>
									</span>
								</Link>
							</div>
						</div>
					</div>

						<Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>

						{/* Use Cases */}
						<div className="relative group">
							<button type="button" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
								<span>Use Cases</span>
								<ChevronDown className="size-3 text-muted-foreground group-hover:text-foreground transition-colors" />
							</button>
							<div className="absolute left-0 top-full mt-1 min-w-[640px] rounded-lg border bg-background shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 delay-100 transform translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0">
								{/* Invisible bridge to prevent dropdown from closing when moving mouse */}
								<div className="absolute -top-1 left-0 right-0 h-1"></div>
							<div className="grid grid-cols-2 gap-2 p-3 lg:p-4">
								<Link href="/use-cases/individuals" className="flex gap-3 rounded-md p-3 hover:bg-accent/50 transition-colors">
									<span className="size-9 grid place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20"><User className="size-5" /></span>
									<span>
										<span className="block text-foreground font-medium">Individuals</span>
										<span className="block text-xs text-muted-foreground">Personal subscription management.</span>
									</span>
								</Link>
								<Link href="/use-cases/families" className="flex gap-3 rounded-md p-3 hover:bg-accent/50 transition-colors">
									<span className="size-9 grid place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20"><Home className="size-5" /></span>
									<span>
										<span className="block text-foreground font-medium">Families</span>
										<span className="block text-xs text-muted-foreground">Household plans and shared bills.</span>
									</span>
								</Link>
								<Link href="/use-cases/teams-startups" className="flex gap-3 rounded-md p-3 hover:bg-accent/50 transition-colors">
									<span className="size-9 grid place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20"><Users className="size-5" /></span>
									<span>
										<span className="block text-foreground font-medium">Teams & Startups</span>
										<span className="block text-xs text-muted-foreground">Collaborate and track budgets.</span>
									</span>
								</Link>
								<Link href="/use-cases/enterprise" className="flex gap-3 rounded-md p-3 hover:bg-accent/50 transition-colors">
									<span className="size-9 grid place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20"><Building className="size-5" /></span>
									<span>
										<span className="block text-foreground font-medium">Enterprise</span>
										<span className="block text-xs text-muted-foreground">Advanced controls and reporting.</span>
									</span>
								</Link>
							</div>
						</div>
					</div>

						{/* Resources */}
						<div className="relative group">
							<button type="button" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
								<span>Resources</span>
								<ChevronDown className="size-3 text-muted-foreground group-hover:text-foreground transition-colors" />
							</button>
							<div className="absolute left-0 top-full mt-1 min-w-[640px] rounded-lg border bg-background shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 delay-100 transform translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0">
								{/* Invisible bridge to prevent dropdown from closing when moving mouse */}
								<div className="absolute -top-1 left-0 right-0 h-1"></div>
							<div className="grid grid-cols-2 gap-2 p-3 lg:p-4">
								<Link href="/blog" className="flex gap-3 rounded-md p-3 hover:bg-accent/50 transition-colors">
									<span className="size-9 grid place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20"><BookOpen className="size-5" /></span>
									<span>
										<span className="block text-foreground font-medium">Blog</span>
										<span className="block text-xs text-muted-foreground">Guides, tips, and news.</span>
									</span>
								</Link>
								<Link href="/help" className="flex gap-3 rounded-md p-3 hover:bg-accent/50 transition-colors">
									<span className="size-9 grid place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20"><HelpCircle className="size-5" /></span>
									<span>
										<span className="block text-foreground font-medium">Help Center</span>
										<span className="block text-xs text-muted-foreground">FAQs and product support.</span>
									</span>
								</Link>
								<Link href="/compare" className="flex gap-3 rounded-md p-3 hover:bg-accent/50 transition-colors">
									<span className="size-9 grid place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20"><Link2 className="size-5" /></span>
									<span>
										<span className="block text-foreground font-medium">Compare</span>
										<span className="block text-xs text-muted-foreground">See how we stack up.</span>
									</span>
								</Link>
								<Link href="/security" className="flex gap-3 rounded-md p-3 hover:bg-accent/50 transition-colors">
									<span className="size-9 grid place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20"><Shield className="size-5" /></span>
									<span>
										<span className="block text-foreground font-medium">Security</span>
										<span className="block text-xs text-muted-foreground">Our approach to safety.</span>
									</span>
								</Link>
							</div>
						</div>
					</div>

						{/* About */}
						<div className="relative group">
							<button type="button" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
								<span>About</span>
								<ChevronDown className="size-3 text-muted-foreground group-hover:text-foreground transition-colors" />
							</button>
							<div className="absolute left-0 top-full mt-1 min-w-[560px] rounded-lg border bg-background shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 delay-100 transform translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0">
								{/* Invisible bridge to prevent dropdown from closing when moving mouse */}
								<div className="absolute -top-1 left-0 right-0 h-1"></div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 lg:p-4">
								<Link href="/about/company" className="flex gap-3 rounded-md p-3 hover:bg-accent/50 transition-colors">
									<span className="size-9 grid place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20 overflow-hidden">
										<Image 
											src="/Logo/multroid-logo.svg" 
											alt="Multroid Logo" 
											width={36} 
											height={36}
											className="size-9 rounded-md"
										/>
									</span>
									<span>
										<span className="block text-foreground font-medium">Company</span>
										<span className="block text-xs text-muted-foreground">Mission, values, and leadership.</span>
									</span>
								</Link>
								<Link href="/about/careers" className="flex gap-3 rounded-md p-3 hover:bg-accent/50 transition-colors">
									<span className="size-9 grid place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20"><Briefcase className="size-5" /></span>
									<span>
										<span className="block text-foreground font-medium">Careers</span>
										<span className="block text-xs text-muted-foreground">Join our growing team.</span>
									</span>
								</Link>
								<Link href="/about/press" className="flex gap-3 rounded-md p-3 hover:bg-accent/50 transition-colors">
									<span className="size-9 grid place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20"><FileText className="size-5" /></span>
									<span>
										<span className="block text-foreground font-medium">Press</span>
										<span className="block text-xs text-muted-foreground">Brand assets and announcements.</span>
									</span>
								</Link>
							</div>
						</div>
					</div>

						<Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
					</nav>
					<div className="flex items-center gap-2">
						<div className="hidden md:flex items-center gap-2">
							{isAuthenticated ? (
								<UserNav />
							) : (
								<>
									<a href={getMainAppLoginUrl()} className="text-sm px-3 py-1.5 rounded-md border hover:bg-accent hover:text-accent-foreground">Login</a>
									<Button asChild size="sm">
										<a href={getMainAppRegisterUrl()}>Get Started Free</a>
									</Button>
								</>
							)}
						</div>
						<ThemeToggle />
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
							aria-label="Toggle menu"
							onClick={() => setMobileOpen((v) => !v)}
						>
							{mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
						</Button>
					</div>
				</div>

				{/* Mobile Nav */}
				{mobileOpen && (
					<div className="md:hidden border-t bg-background">
						<div className="container mx-auto px-4 py-4 space-y-2">
							<Accordion type="multiple" className="w-full">
								<AccordionItem value="features">
									<AccordionTrigger>Features</AccordionTrigger>
									<AccordionContent>
										<ul className="grid gap-2">
											<li><Link href="/features/reminders" onClick={closeMobile} className="block rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">Reminders</Link></li>
											<li><Link href="/features/document-vault" onClick={closeMobile} className="block rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">Document Vault</Link></li>
											<li><Link href="/features/calendar-sync" onClick={closeMobile} className="block rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">Calendar Sync</Link></li>
											<li><Link href="/features/collaboration" onClick={closeMobile} className="block rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">Collaboration</Link></li>
											<li><Link href="/features/integrations" onClick={closeMobile} className="block rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">Integrations</Link></li>
											<li><Link href="/features/security" onClick={closeMobile} className="block rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">Security</Link></li>
										</ul>
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="use-cases">
									<AccordionTrigger>Use Cases</AccordionTrigger>
									<AccordionContent>
										<ul className="grid gap-2">
											<li><Link href="/use-cases/individuals" onClick={closeMobile} className="block rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">Individuals</Link></li>
											<li><Link href="/use-cases/families" onClick={closeMobile} className="block rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">Families</Link></li>
											<li><Link href="/use-cases/teams-startups" onClick={closeMobile} className="block rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">Teams & Startups</Link></li>
											<li><Link href="/use-cases/enterprise" onClick={closeMobile} className="block rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">Enterprise</Link></li>
										</ul>
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="resources">
									<AccordionTrigger>Resources</AccordionTrigger>
									<AccordionContent>
										<ul className="grid gap-2">
											<li><Link href="/blog" onClick={closeMobile} className="block rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">Blog</Link></li>
											<li><Link href="/help" onClick={closeMobile} className="block rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">Help Center</Link></li>
											<li><Link href="/compare" onClick={closeMobile} className="block rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">Compare</Link></li>
											<li><Link href="/security" onClick={closeMobile} className="block rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">Security</Link></li>
										</ul>
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="about">
									<AccordionTrigger>About</AccordionTrigger>
									<AccordionContent>
										<ul className="grid gap-2">
											<li><Link href="/about/company" onClick={closeMobile} className="block rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">Company</Link></li>
											<li><Link href="/about/careers" onClick={closeMobile} className="block rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">Careers</Link></li>
											<li><Link href="/about/press" onClick={closeMobile} className="block rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">Press</Link></li>
										</ul>
									</AccordionContent>
								</AccordionItem>
							</Accordion>

							<div className="grid gap-2 pt-1">
								<Link href="/pricing" onClick={closeMobile} className="text-sm px-2 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">Pricing</Link>
								<Link href="/contact" onClick={closeMobile} className="text-sm px-2 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">Contact</Link>
							</div>

							<div className="grid gap-2 pt-4 border-t">
								{isAuthenticated ? (
								<Button asChild>
									<a href={getMainAppDashboardUrl()} onClick={closeMobile}>
										<LayoutDashboard className="mr-2 size-4" />
											Go to Dashboard
										</a>
									</Button>
								) : (
									<>
										<Button asChild variant="outline">
											<a href={getMainAppLoginUrl()} onClick={closeMobile}>Login</a>
										</Button>
										<Button asChild>
											<a href={getMainAppRegisterUrl()} onClick={closeMobile}>Get Started Free</a>
										</Button>
									</>
								)}
							</div>
						</div>
					</div>
				)}
			</header>
			<main className="container mx-auto px-4 py-10">{children}</main>
		</>
	);
}
