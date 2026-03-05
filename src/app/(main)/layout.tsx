"use client"

import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";
import { NotivaButtonLink } from "@/components/ui/notiva-button";
import { getMainAppLoginUrl, getMainAppRegisterUrl, getMainAppDashboardUrl } from "@/lib/app-url";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Bars3Icon as Menu,
  XMarkIcon as X,
  ChevronDownIcon as ChevronDown,
  Squares2X2Icon as LayoutDashboard,
  SparklesIcon as Sparkles,
  TagIcon as Tag,
  BuildingOfficeIcon as Building,
  DocumentTextIcon as FileText,
  BookOpenIcon as BookOpen,
  QuestionMarkCircleIcon as HelpCircle,
  EnvelopeIcon as Mail,
  SwatchIcon as Palette,
  RocketLaunchIcon as Rocket,
  FlagIcon as Flag,
  ChatBubbleLeftEllipsisIcon as MessageCircleQuestion,
} from "@heroicons/react/24/solid";
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
			<header
				className="w-full sticky top-0 z-40 px-3 md:px-6"
				style={{
					height: '84px',
					backdropFilter: 'blur(6px)',
					backgroundColor: 'rgba(255, 255, 255, 0.8)',
				}}
			>
				<div className="container mx-auto flex items-center justify-between h-full px-4">
					{/* Logo */}
					<Link href="/" className="inline-flex items-center gap-[8px] rounded-[8px]">
						<div className="bg-[#0047BA] rounded-[8px] p-[8px] flex items-center justify-center overflow-hidden">
							<Image
								src="/Logo/Notiva Logo transparent white.svg"
								alt="Notiva"
								width={25}
								height={24}
								className="w-[25px] h-[24px]"
							/>
						</div>
						<span
							className="uppercase"
							style={{
								fontFamily: "'Montserrat', sans-serif",
								fontWeight: 700,
								fontSize: '24px',
								lineHeight: '26px',
								letterSpacing: '2px',
								color: '#0047BA'
							}}
						>
							Notiva
						</span>
					</Link>

					{/* Desktop Nav */}
					<nav className="hidden lg:flex items-center gap-6 text-[14px]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
						{/* Features */}
						<Link
							href="/features"
							className="hover:text-foreground transition-colors"
							style={{ color: 'var(--multroid-grey-dark, #67696B)' }}
						>
							Features
						</Link>

						{/* Pricing */}
						<Link
							href="/pricing"
							className="hover:text-foreground transition-colors"
							style={{ color: 'var(--multroid-grey-dark, #67696B)' }}
						>
							Pricing
						</Link>

						{/* For Business */}
						<Link
							href="/business"
							className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
							style={{ color: 'var(--multroid-grey-dark, #67696B)' }}
						>
							For Business
							<span className="text-[10px] font-semibold bg-[#D9E3F5] text-[#0047BA] px-1.5 py-0.5 rounded leading-none">
								Soon
							</span>
						</Link>

						{/* Resources Mega Dropdown */}
						<div className="relative group">
							<button
								type="button"
								className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
								style={{ color: 'var(--multroid-grey-dark, #67696B)' }}
							>
								<span>Resources</span>
								<ChevronDown className="size-3" style={{ color: 'var(--multroid-grey-dark, #67696B)' }} />
							</button>
							<div className="absolute right-0 top-full mt-1 w-[640px] rounded-xl border bg-background shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 delay-100 transform translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0">
								<div className="absolute -top-1 left-0 right-0 h-1"></div>
								<div className="grid grid-cols-3 gap-0 p-5">
									{/* EXPLORE Column */}
									<div className="space-y-1">
										<p className="text-[10px] font-bold uppercase tracking-wider text-[var(--multroid-grey)] px-3 pb-2">Explore</p>
										<Link href="/faq" className="flex gap-3 rounded-lg p-3 hover:bg-accent/50 transition-colors">
											<span className="size-9 grid place-items-center rounded-lg bg-[#D9E3F5] text-[#0047BA] ring-1 ring-[#B0C6EA] shrink-0">
												<MessageCircleQuestion className="size-5" />
											</span>
											<span>
												<span className="block text-foreground font-medium text-[13px]">FAQ</span>
												<span className="block text-[11px] text-muted-foreground leading-tight">Common questions answered</span>
											</span>
										</Link>
										<Link href="/help" className="flex gap-3 rounded-lg p-3 hover:bg-accent/50 transition-colors">
											<span className="size-9 grid place-items-center rounded-lg bg-[#D9E3F5] text-[#0047BA] ring-1 ring-[#B0C6EA] shrink-0">
												<HelpCircle className="size-5" />
											</span>
											<span>
												<span className="block text-foreground font-medium text-[13px]">Help Center</span>
												<span className="block text-[11px] text-muted-foreground leading-tight">Guides & documentation</span>
											</span>
										</Link>
									</div>

									{/* COMPANY Column */}
									<div className="space-y-1 border-l border-[#B0C6EA]/30 pl-5">
										<p className="text-[10px] font-bold uppercase tracking-wider text-[var(--multroid-grey)] px-3 pb-2">Company</p>
										<Link href="/about/company" className="flex gap-3 rounded-lg p-3 hover:bg-accent/50 transition-colors">
											<span className="size-9 grid place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 overflow-hidden shrink-0">
												<Image src="/Multroid-assets/Multroid Logo Social 600.svg" alt="Multroid" width={36} height={36} className="size-9 rounded-lg" />
											</span>
											<span>
												<span className="block text-foreground font-medium text-[13px]">About</span>
												<span className="block text-[11px] text-muted-foreground leading-tight">Mission & ecosystem</span>
											</span>
										</Link>
										<Link href="/brand" className="flex gap-3 rounded-lg p-3 hover:bg-accent/50 transition-colors">
											<span className="size-9 grid place-items-center rounded-lg bg-[#D9E3F5] text-[#0047BA] ring-1 ring-[#B0C6EA] shrink-0">
												<Palette className="size-5" />
											</span>
											<span>
												<span className="block text-foreground font-medium text-[13px]">Brand Guidelines</span>
												<span className="block text-[11px] text-muted-foreground leading-tight">Logos, colors & assets</span>
											</span>
										</Link>
										<Link href="/contact" className="flex gap-3 rounded-lg p-3 hover:bg-accent/50 transition-colors">
											<span className="size-9 grid place-items-center rounded-lg bg-[#D9E3F5] text-[#0047BA] ring-1 ring-[#B0C6EA] shrink-0">
												<Mail className="size-5" />
											</span>
											<span>
												<span className="block text-foreground font-medium text-[13px]">Contact</span>
												<span className="block text-[11px] text-muted-foreground leading-tight">Get in touch</span>
											</span>
										</Link>
									</div>

									{/* UPDATES Column */}
									<div className="space-y-1 border-l border-[#B0C6EA]/30 pl-5">
										<p className="text-[10px] font-bold uppercase tracking-wider text-[var(--multroid-grey)] px-3 pb-2">Updates</p>
										<Link href="/blog" className="flex gap-3 rounded-lg p-3 hover:bg-accent/50 transition-colors">
											<span className="size-9 grid place-items-center rounded-lg bg-[#D9E3F5] text-[#0047BA] ring-1 ring-[#B0C6EA] shrink-0">
												<BookOpen className="size-5" />
											</span>
											<span>
												<span className="block text-foreground font-medium text-[13px]">Blog</span>
												<span className="block text-[11px] text-muted-foreground leading-tight">Articles & insights</span>
											</span>
										</Link>
										<Link href="/changelog" className="flex gap-3 rounded-lg p-3 hover:bg-accent/50 transition-colors">
											<span className="size-9 grid place-items-center rounded-lg bg-[#D9E3F5] text-[#0047BA] ring-1 ring-[#B0C6EA] shrink-0">
												<Rocket className="size-5" />
											</span>
											<span>
												<span className="block text-foreground font-medium text-[13px]">Changelog</span>
												<span className="block text-[11px] text-muted-foreground leading-tight">What&apos;s new in Notiva</span>
											</span>
										</Link>
										<Link href="/milestones" className="flex gap-3 rounded-lg p-3 hover:bg-accent/50 transition-colors">
											<span className="size-9 grid place-items-center rounded-lg bg-[#D9E3F5] text-[#0047BA] ring-1 ring-[#B0C6EA] shrink-0">
												<Flag className="size-5" />
											</span>
											<span>
												<span className="block text-foreground font-medium text-[13px]">Milestones</span>
												<span className="block text-[11px] text-muted-foreground leading-tight">Our journey & roadmap</span>
											</span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</nav>

					{/* Right Controls */}
					<div className="flex items-center gap-[16px]">
						<ThemeToggle />
						<div className="hidden lg:flex items-center gap-[16px]">
							{isAuthenticated ? (
								<UserNav />
							) : (
								<>
									<a
										href={getMainAppLoginUrl()}
										className="text-[14px] font-medium hover:text-[#0047BA] transition-colors"
										style={{ color: 'var(--multroid-grey-dark, #67696B)', fontFamily: "'Montserrat', sans-serif" }}
									>
										Login
									</a>
									<NotivaButtonLink
										href={getMainAppRegisterUrl()}
										variant="primary"
										size="sm"
									>
										Get Started Free
									</NotivaButtonLink>
								</>
							)}
						</div>
						<Button
							variant="ghost"
							size="icon"
							className="lg:hidden"
							aria-label="Toggle menu"
							onClick={() => setMobileOpen((v) => !v)}
						>
							{mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
						</Button>
					</div>
				</div>

				{/* Mobile Nav */}
				{mobileOpen && (
					<div className="lg:hidden border-t bg-background">
						<div className="container mx-auto px-4 py-4 space-y-2">
							<div className="grid gap-2">
								<Link href="/features" onClick={closeMobile} className="flex items-center gap-2 text-sm px-2 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">
									<Sparkles className="size-4 text-[#0047BA]" />
									Features
								</Link>
								<Link href="/pricing" onClick={closeMobile} className="flex items-center gap-2 text-sm px-2 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">
									<Tag className="size-4 text-[#0047BA]" />
									Pricing
								</Link>
								<Link href="/business" onClick={closeMobile} className="flex items-center gap-2 text-sm px-2 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">
									<Building className="size-4 text-[#0047BA]" />
									For Business
									<span className="text-[10px] font-semibold bg-[#D9E3F5] text-[#0047BA] px-1.5 py-0.5 rounded leading-none">
										Soon
									</span>
								</Link>
							</div>

							<Accordion type="multiple" className="w-full">
								<AccordionItem value="resources">
									<AccordionTrigger className="text-sm">Resources</AccordionTrigger>
									<AccordionContent>
										<div className="space-y-4">
											<div>
												<p className="text-[10px] font-bold uppercase tracking-wider text-[var(--multroid-grey)] px-2 pb-1">Explore</p>
												<ul className="grid gap-1">
													<li>
														<Link href="/faq" onClick={closeMobile} className="flex items-center gap-2 rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">
															<MessageCircleQuestion className="size-4 text-[#0047BA]" />
															FAQ
														</Link>
													</li>
													<li>
														<Link href="/help" onClick={closeMobile} className="flex items-center gap-2 rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">
															<HelpCircle className="size-4 text-[#0047BA]" />
															Help Center
														</Link>
													</li>
												</ul>
											</div>
											<div>
												<p className="text-[10px] font-bold uppercase tracking-wider text-[var(--multroid-grey)] px-2 pb-1">Company</p>
												<ul className="grid gap-1">
													<li>
														<Link href="/about/company" onClick={closeMobile} className="flex items-center gap-2 rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">
															<Building className="size-4 text-[#0047BA]" />
															About
														</Link>
													</li>
													<li>
														<Link href="/brand" onClick={closeMobile} className="flex items-center gap-2 rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">
															<Palette className="size-4 text-[#0047BA]" />
															Brand Guidelines
														</Link>
													</li>
													<li>
														<Link href="/contact" onClick={closeMobile} className="flex items-center gap-2 rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">
															<Mail className="size-4 text-[#0047BA]" />
															Contact
														</Link>
													</li>
												</ul>
											</div>
											<div>
												<p className="text-[10px] font-bold uppercase tracking-wider text-[var(--multroid-grey)] px-2 pb-1">Updates</p>
												<ul className="grid gap-1">
													<li>
														<Link href="/blog" onClick={closeMobile} className="flex items-center gap-2 rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">
															<BookOpen className="size-4 text-[#0047BA]" />
															Blog
														</Link>
													</li>
													<li>
														<Link href="/changelog" onClick={closeMobile} className="flex items-center gap-2 rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">
															<Rocket className="size-4 text-[#0047BA]" />
															Changelog
														</Link>
													</li>
													<li>
														<Link href="/milestones" onClick={closeMobile} className="flex items-center gap-2 rounded px-2 py-1.5 hover:bg-accent hover:text-accent-foreground">
															<Flag className="size-4 text-[#0047BA]" />
															Milestones
														</Link>
													</li>
												</ul>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>

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
			<main className="overflow-x-hidden">{children}</main>
		</>
	);
}
