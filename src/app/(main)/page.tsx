'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CalendarDays, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { getLogoUrl } from '@/lib/logo-dev'
import { getMainAppRegisterUrl } from '@/lib/app-url'
import BillingScanningSection from '@/components/BillingScanningSection'
import HeroSection from '@/components/HeroSection'
import EverythingInOnePlaceSection from '@/components/EverythingInOnePlaceSection'
import MeetNoviSection from '@/components/MeetNoviSection'

export default function Home() {
    const { data: session } = useSession()
    const isAuthenticated = !!session?.user

    return (
        <>
                {/* Hero Section - Pastel Sky */}
                <HeroSection />

                {/* Meet Novi Section */}
                <section id="meet-novi" data-section="meet-novi">
                    <MeetNoviSection />
                </section>

                {/* Integrations Section */}
                <section id="integrations" data-section="integrations" className="bg-muted dark:bg-background py-24 md:py-32 overflow-hidden">
                    <div className="mx-auto max-w-5xl px-6 mb-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-balance text-3xl font-semibold md:text-4xl lg:text-5xl">
                                Integrate with tools you already use
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Connect seamlessly with popular calendars, cloud storage, and communication platforms to keep everything in sync.
                            </p>
                        </div>
                    </div>

                    {/* Infinite Marquee */}
                    <IntegrationMarquee />

                    <div className="mx-auto max-w-5xl px-6 mt-12">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-background flex aspect-square items-center justify-center border rounded-lg p-3">
                                    <CalendarDays className="size-6 text-primary" />
                                </div>
                                <blockquote className="text-left">
                                    <p className="text-sm">&quot;The calendar integration is seamless.&quot;</p>
                                    <cite className="text-xs text-muted-foreground not-italic">Sarah Johnson, Product Manager</cite>
                                </blockquote>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/integrations">View All Integrations</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Everything in One Place Section */}
                <section id="everything-in-one-place" data-section="everything-in-one-place">
                    <EverythingInOnePlaceSection />
                </section>

                {/* Billing Scanning Section */}
                <section id="billing-scanning" data-section="billing-scanning">
                    <BillingScanningSection />
                </section>

                {/* Final CTA Section */}
                <section id="final-cta" data-section="final-cta" className="relative py-20 bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl">
                    <div className="max-w-4xl mx-auto text-center space-y-8 px-6">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold">Stay on top of every subscription and deadline—start today</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Join thousands of users who never miss another payment or renewal window
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {isAuthenticated ? (
                                <>
                                    <Button size="lg" className="text-lg px-8" asChild>
                                        <Link href="/home">
                                            <LayoutDashboard className="mr-2 w-5 h-5" />
                                            Go to Home
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                                        <Link href="/settings">Settings</Link>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button size="lg" className="text-lg px-8" asChild>
                                        <a href={getMainAppRegisterUrl()}>
                                            Get Started Free
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </a>
                                    </Button>
                                    <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                                        <Link href="#integrations">Explore Integrations</Link>
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Dashboard Preview */}
                        <div className="mt-12 max-w-3xl mx-auto">
                            <div className="bg-background/50 backdrop-blur-sm rounded-2xl border shadow-xl overflow-hidden">
                                <Image
                                    src="/Dashboard-screenshot-example.png"
                                    alt="Notiva Dashboard Preview"
                                    width={1440}
                                    height={900}
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer id="footer" data-section="footer" className="m-1 mt-20 rounded-3xl border">
                    <div className="mx-auto max-w-5xl space-y-16 px-5 py-16">
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-8">
                            <Link href="/" aria-label="go home" className="inline-flex items-center gap-2 font-semibold tracking-tight">
                                <Image
                                    src="/Notiva-Logo.svg"
                                    alt="Notiva"
                                    width={32}
                                    height={32}
                                    className="size-8 rounded-lg"
                                />
                                <span>Notiva</span>
                            </Link>
                            <div className="flex gap-3">
                                <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-primary block">
                                    <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"></path>
                                    </svg>
                                </Link>
                                <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary block">
                                    <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"></path>
                                    </svg>
                                </Link>
                                <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary block">
                                    <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                            {/* Product */}
                            <div>
                                <span className="font-medium">Product</span>
                                <ul className="mt-4 list-inside space-y-4">
                                    <li><Link href="/features" className="hover:text-primary text-muted-foreground text-sm duration-150">Features</Link></li>
                                    <li><Link href="/pricing" className="hover:text-primary text-muted-foreground text-sm duration-150">Pricing</Link></li>
                                    <li><Link href="/integrations" className="hover:text-primary text-muted-foreground text-sm duration-150">Integrations</Link></li>
                                    <li><Link href="/roadmap" className="hover:text-primary text-muted-foreground text-sm duration-150">Roadmap</Link></li>
                                </ul>
                            </div>
                            {/* Use Cases */}
                            <div>
                                <span className="font-medium">Use Cases</span>
                                <ul className="mt-4 list-inside space-y-4">
                                    <li><Link href="/use-cases/individuals" className="hover:text-primary text-muted-foreground text-sm duration-150">Individuals</Link></li>
                                    <li><Link href="/use-cases/families" className="hover:text-primary text-muted-foreground text-sm duration-150">Families</Link></li>
                                    <li><Link href="/use-cases/teams-startups" className="hover:text-primary text-muted-foreground text-sm duration-150">Teams & Startups</Link></li>
                                    <li><Link href="/use-cases/enterprise" className="hover:text-primary text-muted-foreground text-sm duration-150">Enterprise</Link></li>
                                </ul>
                            </div>
                            {/* Resources */}
                            <div>
                                <span className="font-medium">Resources</span>
                                <ul className="mt-4 list-inside space-y-4">
                                    <li><Link href="/help" className="hover:text-primary text-muted-foreground text-sm duration-150">Help Center</Link></li>
                                    <li><Link href="/blog" className="hover:text-primary text-muted-foreground text-sm duration-150">Blog</Link></li>
                                    <li><Link href="/compare" className="hover:text-primary text-muted-foreground text-sm duration-150">Compare</Link></li>
                                    <li><Link href="/security" className="hover:text-primary text-muted-foreground text-sm duration-150">Security</Link></li>
                                    <li><Link href="/contact" className="hover:text-primary text-muted-foreground text-sm duration-150">Contact</Link></li>
                                </ul>
                            </div>
                            {/* Company & Newsletter */}
                            <div>
                                <span className="text-sm font-medium">Company</span>
                                <ul className="mt-4 list-inside space-y-4">
                                    <li><Link href="/about/company" className="hover:text-primary text-muted-foreground text-sm duration-150">About</Link></li>
                                    <li><Link href="/about/careers" className="hover:text-primary text-muted-foreground text-sm duration-150">Careers</Link></li>
                                    <li><Link href="/about/press" className="hover:text-primary text-muted-foreground text-sm duration-150">Press</Link></li>
                                    <li><Link href="/privacy" className="hover:text-primary text-muted-foreground text-sm duration-150">Privacy</Link></li>
                                    <li><Link href="/terms" className="hover:text-primary text-muted-foreground text-sm duration-150">Terms</Link></li>
                                </ul>

                                <form className="mt-12 w-full max-w-xs">
                                    <div className="space-y-2.5">
                                        <label className="block text-sm font-medium" htmlFor="newsletter-email">
                                            Subscribe to our newsletter
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Your email"
                                            type="email"
                                            id="newsletter-email"
                                            required
                                            name="email"
                                        />
                                    </div>
                                    <Button type="submit" className="mt-3">
                                        <span>Subscribe</span>
                                    </Button>
                                </form>
                            </div>
                        </div>
                        <div className="bg-muted mt-16 flex items-center justify-between rounded-md p-4 px-6 py-3">
                            <div className="flex items-center gap-3">
                                <Image 
                                    src="/Logo/multroid-logo.svg" 
                                    alt="Multroid Logo" 
                                    width={20} 
                                    height={20}
                                    className="size-5"
                                />
                                <span className="text-sm">&copy; {new Date().getFullYear()} Notiva. Made and owned by <Link href="https://multroid.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Multroid</Link>. All rights reserved by Multroid.</span>
                            </div>
                            <Link href="/license" className="text-muted-foreground hover:text-primary text-sm">
                                License
                            </Link>
                        </div>
                    </div>
                </footer>
        </>
    )
}

// Integration data for the marquee
const integrations = [
    { logo: "google.com", name: "Google Calendar", description: "Sync deadlines with your Google Calendar automatically." },
    { logo: "microsoft.com", name: "Outlook", description: "Connect with Microsoft Outlook for seamless scheduling." },
    { logo: "dropbox.com", name: "Dropbox", description: "Store and sync documents with Dropbox integration." },
    { logo: "slack.com", name: "Slack", description: "Get notifications directly in your Slack workspace." },
    { logo: "zapier.com", name: "Zapier", description: "Automate workflows with 5000+ app integrations." },
    { logo: "stripe.com", name: "Stripe", description: "Track subscription payments and billing automatically." },
    { logo: "notion.so", name: "Notion", description: "Keep your workspace and subscriptions in perfect sync." },
    { logo: "trello.com", name: "Trello", description: "Manage subscription tasks with Trello boards." },
    { logo: "asana.com", name: "Asana", description: "Connect your project management workflows." },
    { logo: "airtable.com", name: "Airtable", description: "Sync subscription data with Airtable bases." },
]

const IntegrationCard = ({ logo, name }: { logo: string; name: string }) => {
    return (
        <div className="group bg-background dark:bg-card hover:bg-muted/50 dark:hover:bg-muted/30 w-[160px] flex-shrink-0 flex flex-col items-center justify-center rounded-xl border p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <div className="flex items-center justify-center mb-3">
                <Image
                    src={getLogoUrl({ domain: logo, size: 120 })}
                    alt={`${name} logo`}
                    width={56}
                    height={56}
                    className="object-contain grayscale"
                />
            </div>
            <h3 className="text-sm font-semibold text-center leading-tight">{name}</h3>
        </div>
    )
}

const IntegrationMarquee = () => {
    return (
        <div className="marquee-container marquee-muted py-4">
            <div className="marquee-track">
                {/* First set of cards */}
                {integrations.map((integration, index) => (
                    <IntegrationCard key={`first-${index}`} logo={integration.logo} name={integration.name} />
                ))}
                {/* Duplicate set for seamless loop */}
                {integrations.map((integration, index) => (
                    <IntegrationCard key={`second-${index}`} logo={integration.logo} name={integration.name} />
                ))}
            </div>
        </div>
    )
}
