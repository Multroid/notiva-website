'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Bell, CalendarDays, FolderLock, Users, CheckCircle, LayoutDashboard, Briefcase, Shield, BarChart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useSession } from 'next-auth/react'
import { getLogoUrl } from '@/lib/logo-dev'
import { getMainAppLoginUrl, getMainAppRegisterUrl } from '@/lib/app-url'
import Aurora from '@/components/Aurora'
import { FeatureShowcase } from '@/components/landing/feature-showcase'
import BillingScanningSection from '@/components/BillingScanningSection'

export default function Home() {
    const { data: session } = useSession()
    const isAuthenticated = !!session?.user
    const [isDarkMode, setIsDarkMode] = React.useState(false)

    React.useEffect(() => {
        // Check if dark mode is active
        const isDark = document.documentElement.classList.contains('dark')
        setIsDarkMode(isDark)
        
        // Watch for theme changes
        const observer = new MutationObserver(() => {
            const isDark = document.documentElement.classList.contains('dark')
            setIsDarkMode(isDark)
        })
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        })
        
        return () => observer.disconnect()
    }, [])

    return (
        <>
                {/* Aurora Background - Scrolls with page */}
                <div className="absolute top-0 left-0 right-0 w-full h-[800px] pointer-events-none z-0">
                    <Aurora 
                        colorStops={isDarkMode 
                            ? ['#3b82f6', '#8b5cf6', '#6366f1'] // Dark mode: blue to purple gradient
                            : ['#93c5fd', '#c4b5fd', '#a5b4fc'] // Light mode: light blue and violet
                        }
                        amplitude={0.6}
                        blend={0.85}
                        speed={0.35}
                    />
                </div>

        <div className="overflow-hidden -mt-10 relative z-10">
                {/* Hero Section */}
                <section className="relative">
                    <div className="relative pt-24">
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="max-w-4xl text-center sm:mx-auto lg:mr-auto lg:mt-0 lg:w-4/5">
                                <Link
                                    href="/"
                                    className="rounded-(--radius) mx-auto flex w-fit items-center gap-2 border p-1 pr-3">
                                    <span className="bg-muted rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 text-xs">New</span>
                                    <span className="text-sm">Smart Reminders & Document Vault</span>
                                    <span className="bg-(--color-border) block h-4 w-px"></span>
                                    <ArrowRight className="size-4" />
                                </Link>

                                <h1 className="mt-8 text-balance text-6xl font-black tracking-tighter md:text-7xl xl:text-8xl">
                                    Stay ahead of <span className="text-muted-foreground">every deadline.</span>
                                </h1>
                                
                                <p className="mx-auto mt-8 max-w-2xl text-wrap text-lg text-muted-foreground">
                                    Notiva is the smartest way to track document expirations and versions, subscription renewals, and important payments.
                                </p>

                                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
                                    {isAuthenticated ? (
                                        <>
                                            <Button size="lg" asChild>
                                                <Link href="/home">
                                                    <LayoutDashboard className="mr-2 size-4" />
                                                    Go to Dashboard
                                                </Link>
                                            </Button>
                                            <Button size="lg" variant="outline" asChild>
                                                <Link href="#features">
                                                    Explore Features
                                                </Link>
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button size="lg" asChild>
                                                <a href={getMainAppRegisterUrl()}>
                                                    <span className="text-nowrap">Get Started Free</span>
                                                    <ArrowRight className="ml-2 size-4" />
                                                </a>
                                            </Button>
                                            <Button size="lg" variant="outline" asChild>
                                                <Link href="#how-it-works">
                                                    Learn More
                                                </Link>
                                            </Button>
                                        </>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground mt-6">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="size-4 text-primary" />
                                        Free to start
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="size-4 text-primary" />
                                        Email reminders
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="size-4 text-primary" />
                                        Secure by design
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dashboard Preview */}
                        <div className="relative mx-auto mt-16 max-w-6xl overflow-hidden px-4">
                            <div className="relative rounded-2xl border border-border/25 overflow-hidden">
                                <Image
                                    src="/Dashboard-screenshot-example.png"
                                    alt="Notiva Dashboard - Manage your subscriptions and deadlines"
                                    width={1440}
                                    height={900}
                                    className="w-full h-auto"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Business Features Section */}
                <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-sm font-medium">
                                    <Briefcase className="w-4 h-4" />
                                    For Businesses
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold">
                                    Enterprise-Grade Solutions for Teams
                                </h2>
                                <p className="text-lg text-muted-foreground">
                                    Advanced features for teams and enterprises. Manage thousands of documents, 
                                    compliance deadlines, and team workflows with enterprise security.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        'Unlimited team members',
                                        'Advanced role-based permissions',
                                        'SSO & SAML authentication',
                                        'Dedicated account manager',
                                        'Custom SLA & 24/7 support'
                                    ].map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button size="lg" asChild>
                                        <Link href="/pricing/business">
                                            Learn More About Business Plans
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href="/contact">Schedule a Demo</Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative">
                                <Card className="p-8 shadow-2xl">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Users className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">Team Collaboration</h4>
                                                <p className="text-sm text-muted-foreground">Unlimited members</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Shield className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">Enterprise Security</h4>
                                                <p className="text-sm text-muted-foreground">SSO & advanced encryption</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                <BarChart className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">Advanced Analytics</h4>
                                                <p className="text-sm text-muted-foreground">Custom reports & insights</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-16 md:py-32">
                    <div className="mx-auto max-w-5xl px-6">
                        <div className="text-center space-y-4 mb-12">
                            <h2 className="text-3xl font-bold">Everything you need to stay organized</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Powerful features to help you manage subscriptions, track deadlines, and save money.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="relative z-10 grid grid-cols-6 gap-3">
                                {/* Customizable - Track Everything */}
                                <Card className="relative col-span-full flex overflow-hidden lg:col-span-2">
                                    <CardContent className="relative m-auto size-fit pt-6">
                                        <div className="relative flex h-24 w-56 items-center">
                                            <svg
                                                className="text-muted absolute inset-0 size-full"
                                                viewBox="0 0 254 104"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <span className="mx-auto block w-fit text-5xl font-semibold">100%</span>
                                        </div>
                                        <h2 className="mt-6 text-center text-3xl font-semibold">Flexible</h2>
                                    </CardContent>
                                </Card>

                                {/* Secure Document Vault */}
                                <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
                                    <CardContent className="pt-6">
                                        <div className="relative mx-auto flex aspect-square size-32 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                                            <FolderLock className="m-auto size-16 text-primary" />
                                        </div>
                                        <div className="relative z-10 mt-6 space-y-2 text-center">
                                            <h2 className="text-lg font-medium transition">Secure Document Vault</h2>
                                            <p className="text-foreground">Store contracts, IDs, and important files in encrypted cloud storage. Always accessible when you need them.</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Smart Analytics */}
                                <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
                                    <CardContent className="pt-6">
                                        <div className="pt-6 lg:px-6">
                                            <svg
                                                className="dark:text-muted-foreground w-full"
                                                viewBox="0 0 386 123"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <rect width="386" height="123" rx="10" />
                                                <g clipPath="url(#clip0_0_106)">
                                                    <circle className="text-muted-foreground dark:text-muted" cx="29" cy="29" r="15" fill="currentColor" />
                                                    <path d="M29 23V35" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M35 29L29 35L23 29" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M55.2373 32H58.7988C61.7383 32 63.4404 30.1816 63.4404 27.0508V27.0371C63.4404 23.9404 61.7246 22.1357 58.7988 22.1357H55.2373V32ZM56.7686 30.6807V23.4551H58.6279C60.6719 23.4551 61.8818 24.7881 61.8818 27.0576V27.0713C61.8818 29.3613 60.6924 30.6807 58.6279 30.6807H56.7686ZM69.4922 32.1436C71.666 32.1436 72.999 30.6875 72.999 28.2949V28.2812C72.999 25.8887 71.6592 24.4326 69.4922 24.4326C67.3184 24.4326 65.9785 25.8955 65.9785 28.2812V28.2949C65.9785 30.6875 67.3115 32.1436 69.4922 32.1436ZM69.4922 30.9062C68.2139 30.9062 67.4961 29.9424 67.4961 28.2949V28.2812C67.4961 26.6338 68.2139 25.6699 69.4922 25.6699C70.7637 25.6699 71.4883 26.6338 71.4883 28.2812V28.2949C71.4883 29.9355 70.7637 30.9062 69.4922 30.9062Z" fill="currentColor" />
                                                </g>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3 123C3 123 14.3298 94.153 35.1282 88.0957C55.9266 82.0384 65.9333 80.5508 65.9333 80.5508C65.9333 80.5508 80.699 80.5508 92.1777 80.5508C103.656 80.5508 100.887 63.5348 109.06 63.5348C117.233 63.5348 117.217 91.9728 124.78 91.9728C132.343 91.9728 142.264 78.03 153.831 80.5508C165.398 83.0716 186.825 91.9728 193.761 91.9728C200.697 91.9728 206.296 63.5348 214.07 63.5348C221.844 63.5348 238.653 93.7771 244.234 91.9728C249.814 90.1684 258.8 60 266.19 60C272.075 60 284.1 88.057 286.678 88.0957C294.762 88.2171 300.192 72.9284 305.423 72.9284C312.323 72.9284 323.377 65.2437 335.553 63.5348C347.729 61.8259 348.218 82.07 363.639 80.5508C367.875 80.1335 372.949 82.2017 376.437 87.1008C379.446 91.3274 381.054 97.4325 382.521 104.647C383.479 109.364 382.521 123 382.521 123" fill="url(#paint0_linear_0_106)" />
                                                <path className="text-primary-600 dark:text-primary-500" d="M3 121.077C3 121.077 15.3041 93.6691 36.0195 87.756C56.7349 81.8429 66.6632 80.9723 66.6632 80.9723C66.6632 80.9723 80.0327 80.9723 91.4656 80.9723C102.898 80.9723 100.415 64.2824 108.556 64.2824C116.696 64.2824 117.693 92.1332 125.226 92.1332C132.759 92.1332 142.07 78.5115 153.591 80.9723C165.113 83.433 186.092 92.1332 193 92.1332C199.908 92.1332 205.274 64.2824 213.017 64.2824C220.76 64.2824 237.832 93.8946 243.39 92.1332C248.948 90.3718 257.923 60.5 265.284 60.5C271.145 60.5 283.204 87.7182 285.772 87.756C293.823 87.8746 299.2 73.0802 304.411 73.0802C311.283 73.0802 321.425 65.9506 333.552 64.2824C345.68 62.6141 346.91 82.4553 362.27 80.9723C377.629 79.4892 383 106.605 383 106.605" stroke="currentColor" strokeWidth="3" />
                                                <defs>
                                                    <linearGradient id="paint0_linear_0_106" x1="3" y1="60" x2="3" y2="123" gradientUnits="userSpaceOnUse">
                                                        <stop className="text-primary/15 dark:text-primary/35" stopColor="currentColor" />
                                                        <stop className="text-transparent" offset="1" stopColor="currentColor" stopOpacity="0.103775" />
                                                    </linearGradient>
                                                    <clipPath id="clip0_0_106"><rect width="358" height="30" fill="white" transform="translate(14 14)" /></clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div className="relative z-10 mt-14 space-y-2 text-center">
                                            <h2 className="text-lg font-medium transition">Smart Analytics</h2>
                                            <p className="text-foreground">Track spending patterns and get insights into your subscription costs and upcoming expenses.</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Smart Reminders with Shield Icon*/}
                                <Card className="card variant-outlined relative col-span-full overflow-hidden lg:col-span-3">
                                    <CardContent className="grid pt-6 sm:grid-cols-2">
                                        <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                                            <div className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                                                <Bell className="m-auto size-5" strokeWidth={1} />
                                            </div>
                                            <div className="space-y-2">
                                                <h2 className="text-lg font-medium transition">Smart Reminders</h2>
                                                <p className="text-foreground">Get notified before bills are due, subscriptions renew, or documents expire. Never miss a payment again.</p>
                                            </div>
                                        </div>
                                        <div className="rounded-tl-(--radius) relative -mb-6 -mr-6 mt-6 h-fit border-l border-t p-6 py-6 sm:ml-6">
                                            <div className="absolute left-3 top-2 flex gap-1">
                                                <span className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"></span>
                                                <span className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"></span>
                                                <span className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"></span>
                                            </div>
                                            <CalendarDays className="size-full text-primary/20" strokeWidth={0.5} />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Team Collaboration */}
                                <Card className="card variant-outlined relative col-span-full overflow-hidden lg:col-span-3">
                                    <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                                        <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                                            <div className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                                                <Users className="m-auto size-6" strokeWidth={1} />
                                            </div>
                                            <div className="space-y-2">
                                                <h2 className="text-lg font-medium transition">Team Collaboration</h2>
                                                <p className="text-foreground">Share subscriptions and documents with family or team members. Perfect for households and businesses.</p>
                                            </div>
                                        </div>
                                        <div className="before:bg-(--color-border) relative mt-6 before:absolute before:inset-0 before:mx-auto before:w-px sm:-my-6 sm:-mr-6">
                                            <div className="relative flex h-full flex-col justify-center space-y-6 py-6">
                                                <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                                                    <span className="block h-fit rounded border px-2 py-1 text-xs shadow-sm">You</span>
                                                    <div className="ring-background size-7 ring-4 rounded-full bg-primary/20 flex items-center justify-center">
                                                        <Users className="size-4" />
                                                    </div>
                                                </div>
                                                <div className="relative ml-[calc(50%-1rem)] flex items-center gap-2">
                                                    <div className="ring-background size-8 ring-4 rounded-full bg-primary/20 flex items-center justify-center">
                                                        <Users className="size-5" />
                                                    </div>
                                                    <span className="block h-fit rounded border px-2 py-1 text-xs shadow-sm">Team</span>
                                                </div>
                                                <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                                                    <span className="block h-fit rounded border px-2 py-1 text-xs shadow-sm">Family</span>
                                                    <div className="ring-background size-7 ring-4 rounded-full bg-primary/20 flex items-center justify-center">
                                                        <Users className="size-4" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Billing Scanning Section */}
                <BillingScanningSection />

                {/* Who is Notiva for Section */}
                <section className="pt-16 md:pt-24 pb-0 bg-background">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center space-y-4 mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                For Everyone
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                                Who is Notiva for?
                            </h2>
                            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                                Whether you&apos;re a solo professional, managing a household, or running a team—Notiva adapts to your workflow.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Feature Showcase */}
                <FeatureShowcase />

                {/* Integrations Section */}
                <section className="bg-muted dark:bg-background py-24 md:py-32">
                    <div className="mx-auto flex flex-col px-6 md:grid md:max-w-5xl md:grid-cols-2 md:gap-12">
                        <div className="order-last mt-6 flex flex-col gap-12 md:order-first">
                            <div className="space-y-6">
                                <h2 className="text-balance text-3xl font-semibold md:text-4xl lg:text-5xl">
                                    Integrate with tools you already use
                                </h2>
                                <p className="text-muted-foreground">
                                    Connect seamlessly with popular calendars, cloud storage, and communication platforms to keep everything in sync.
                                </p>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/integrations">View All Integrations</Link>
                                </Button>
                            </div>

                            <div className="mt-auto grid grid-cols-[auto_1fr] gap-3">
                                <div className="bg-background flex aspect-square items-center justify-center border rounded-lg p-3">
                                    <CalendarDays className="size-9 text-primary" />
                                </div>
                                <blockquote>
                                    <p className="text-sm">&quot;The calendar integration is seamless. All my subscription deadlines sync automatically.&quot;</p>
                                    <div className="mt-2 flex gap-2 text-sm">
                                        <cite className="not-italic font-medium">Sarah Johnson</cite>
                                        <p className="text-muted-foreground">Product Manager</p>
                                    </div>
                                </blockquote>
                            </div>
                        </div>

                        <div className="-mx-6 px-6 [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_70%,transparent_100%)] sm:mx-auto sm:max-w-md md:-mx-6 md:ml-auto md:mr-0">
                            <div className="bg-background dark:bg-muted/50 rounded-2xl border p-3 shadow-lg md:pb-12">
                                <div className="grid grid-cols-2 gap-2">
                                    <IntegrationCard
                                        logo="google.com"
                                        name="Google Calendar"
                                        description="Sync deadlines with your Google Calendar automatically."
                                    />
                                    <IntegrationCard
                                        logo="microsoft.com"
                                        name="Outlook"
                                        description="Connect with Microsoft Outlook for seamless scheduling."
                                    />
                                    <IntegrationCard
                                        logo="dropbox.com"
                                        name="Dropbox"
                                        description="Store and sync documents with Dropbox integration."
                                    />
                                    <IntegrationCard
                                        logo="slack.com"
                                        name="Slack"
                                        description="Get notifications directly in your Slack workspace."
                                    />
                                    <IntegrationCard
                                        logo="zapier.com"
                                        name="Zapier"
                                        description="Automate workflows with 5000+ app integrations."
                                    />
                                    <IntegrationCard
                                        logo="stripe.com"
                                        name="Stripe"
                                        description="Track subscription payments and billing automatically."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="py-16 px-6 bg-background">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center space-y-4 mb-12">
                            <h2 className="text-3xl font-bold">Get started in minutes</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Simple 3-step process to take control of your subscriptions
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center space-y-4">
                                <div className="mx-auto size-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-primary">1</span>
                                </div>
                                <h3 className="text-xl font-semibold">Sign Up Free</h3>
                                <p className="text-sm text-muted-foreground">
                                    Create your account in seconds. No credit card required to get started.
                                </p>
                            </div>

                            <div className="text-center space-y-4">
                                <div className="mx-auto size-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-primary">2</span>
                                </div>
                                <h3 className="text-xl font-semibold">Add Your Subscriptions</h3>
                                <p className="text-sm text-muted-foreground">
                                    Import from bank statements, email receipts, or add manually with our intuitive interface.
                                </p>
                            </div>

                            <div className="text-center space-y-4">
                                <div className="mx-auto size-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-primary">3</span>
                                </div>
                                <h3 className="text-xl font-semibold">Relax & Get Reminded</h3>
                                <p className="text-sm text-muted-foreground">
                                    Sit back and let us notify you before every deadline. Never miss a payment again.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-16 md:py-32">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="mx-auto max-w-2xl space-y-6 text-center">
                            <h2 className="text-center text-4xl font-semibold lg:text-5xl">Simple, transparent pricing</h2>
                            <p className="text-muted-foreground">Choose the perfect plan for your needs. All plans include a 14-day free trial. No credit card required.</p>
                        </div>

                        <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">
                            {/* Free Plan */}
                            <div className="rounded-lg flex flex-col justify-between space-y-8 border p-6 lg:p-10">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-medium text-xl">Free</h3>
                                        <span className="my-3 block text-3xl font-semibold">$0</span>
                                        <p className="text-muted-foreground text-sm">Per month, forever</p>
                                    </div>

                                    <Button asChild variant="outline" className="w-full">
                                        <a href={getMainAppRegisterUrl()}>Get Started Free</a>
                                    </Button>

                                    <hr className="border-dashed" />

                                    <ul className="list-outside space-y-3 text-sm">
                                        {[
                                            'Up to 5 subscriptions',
                                            'Email reminders',
                                            'Basic dashboard',
                                            '100MB document storage',
                                            'Single user account',
                                            'Mobile app access'
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <CheckCircle className="size-4 text-primary shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Pro Plan - Highlighted */}
                            <div className="dark:bg-muted rounded-lg border p-6 shadow-lg shadow-gray-950/5 lg:p-10 relative scale-105 border-primary">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                                        Most Popular
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-medium text-xl">Pro</h3>
                                        <span className="my-3 block text-3xl font-semibold">$9</span>
                                        <p className="text-muted-foreground text-sm">Per month, billed monthly</p>
                                    </div>

                                    <Button asChild className="w-full">
                                        <a href={getMainAppLoginUrl()}>Start Pro Trial</a>
                                    </Button>

                                    <hr className="border-dashed" />

                                    <div className="text-sm font-medium mb-2">Everything in Free plus:</div>

                                    <ul className="list-outside space-y-3 text-sm">
                                        {[
                                            'Unlimited subscriptions',
                                            'SMS & app notifications',
                                            'Advanced analytics',
                                            'Unlimited document storage',
                                            'Calendar integration',
                                            'Priority email support',
                                            'Custom categories',
                                            'Export to CSV',
                                            'Advanced reminders',
                                            'Email receipt scanning'
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <CheckCircle className="size-4 text-primary shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Family Plan */}
                            <div className="rounded-lg flex flex-col justify-between space-y-8 border p-6 lg:p-10">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-medium text-xl">Family</h3>
                                        <span className="my-3 block text-3xl font-semibold">$19</span>
                                        <p className="text-muted-foreground text-sm">Per month, billed monthly</p>
                                    </div>

                                    <Button asChild variant="outline" className="w-full">
                                        <a href={getMainAppLoginUrl()}>Start Family Trial</a>
                                    </Button>

                                    <hr className="border-dashed" />

                                    <div className="text-sm font-medium mb-2">Everything in Pro plus:</div>

                                    <ul className="list-outside space-y-3 text-sm">
                                        {[
                                            'Up to 5 family members',
                                            'Shared subscriptions',
                                            'Family calendar sync',
                                            'Shared document vault',
                                            'Role-based permissions',
                                            'Family spending reports',
                                            'Split bill tracking',
                                            'Multiple workspaces',
                                            'Priority support',
                                            'Family activity log'
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <CheckCircle className="size-4 text-primary shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-12 space-y-4">
                            <p className="text-sm text-muted-foreground">
                                All plans include 14-day free trial • No credit card required • Cancel anytime
                            </p>
                        </div>
                    </div>
                </section>

                {/* Business/Enterprise CTA Section */}
                <section className="relative py-16 md:py-32">
                    <div className="mx-auto max-w-5xl px-6">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                                Built for growing teams and enterprises
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Advanced features, unlimited scale, and dedicated support for your business
                            </p>
                        </div>
                        <div className="mt-8 md:mt-20">
                            <div className="bg-card relative rounded-3xl border shadow-2xl shadow-zinc-950/5">
                                <div className="grid items-center gap-12 divide-y p-12 md:grid-cols-2 md:divide-x md:divide-y-0">
                                    <div className="pb-12 text-center md:pb-0 md:pr-12">
                                        <h3 className="text-2xl font-semibold">Business Plans</h3>
                                        <p className="mt-2 text-lg text-muted-foreground">For startups and enterprises of any size</p>
                                        <div className="mb-6 mt-12">
                                            <span className="text-5xl font-bold">Starting at</span>
                                            <span className="mt-2 block text-6xl font-bold">
                                                <span className="text-4xl">$</span>49
                                            </span>
                                            <span className="text-muted-foreground text-sm">per month</span>
                                        </div>

                                        <div className="flex justify-center">
                                            <Button asChild size="lg">
                                                <a href={`${typeof window !== 'undefined' && process.env.NEXT_PUBLIC_BUSINESS_APP_URL || 'https://business.notiva.de'}/login?plan=team`}>
                                                    Get Started with Business Plans
                                                    <ArrowRight className="ml-2 w-4 h-4" />
                                                </a>
                                            </Button>
                                        </div>

                                        <p className="text-muted-foreground mt-12 text-sm">
                                            Includes: Advanced security, unlimited storage, API access, custom integrations, and dedicated support
                                        </p>
                                    </div>
                                    <div className="relative md:pl-12">
                                        <ul role="list" className="space-y-4">
                                            {[
                                                'Unlimited team members',
                                                'Advanced analytics & reporting',
                                                'SSO & SAML authentication',
                                                'Custom workflows & automation',
                                                'API access & webhooks',
                                                'Dedicated account manager',
                                                'Priority 24/7 support',
                                                'Custom SLA & uptime guarantee'
                                            ].map((item, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <CheckCircle className="size-4 text-primary shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-muted-foreground mt-8 text-sm">
                                            Trusted by leading companies worldwide for managing thousands of subscriptions and critical deadlines.
                                        </p>
                                        <div className="mt-8">
                                            <Button variant="outline" asChild>
                                                <Link href="/contact">Schedule a Demo</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="relative py-20 bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl">
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
                                        <Link href="#pricing">View Pricing</Link>
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
                <footer className="m-1 mt-20 rounded-3xl border">
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
                                    <li><Link href="#features" className="hover:text-primary text-muted-foreground text-sm duration-150">Features</Link></li>
                                    <li><Link href="#pricing" className="hover:text-primary text-muted-foreground text-sm duration-150">Pricing</Link></li>
                                    <li><Link href="/integrations" className="hover:text-primary text-muted-foreground text-sm duration-150">Integrations</Link></li>
                                    <li><Link href="#how-it-works" className="hover:text-primary text-muted-foreground text-sm duration-150">How it Works</Link></li>
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
        </div>
        </>
    )
}

const IntegrationCard = ({ logo, name, description }: { logo: string; name: string; description: string }) => {
    return (
        <div className="hover:bg-muted dark:hover:bg-muted/50 space-y-4 rounded-lg border p-4 transition-colors">
            <div className="flex size-fit items-center justify-center">
                <Image
                    src={getLogoUrl({ domain: logo, size: 80 })}
                    alt={`${name} logo`}
                    width={40}
                    height={40}
                    className="object-contain"
                />
            </div>
            <div className="space-y-1">
                <h3 className="text-sm font-medium">{name}</h3>
                <p className="text-muted-foreground line-clamp-1 text-sm md:line-clamp-2">{description}</p>
            </div>
        </div>
    )
}
