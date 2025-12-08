'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { getMainAppRegisterUrl } from '@/lib/app-url'
import Iridescence from '@/components/Iridescence'

export default function HeroSection() {
    return (
        <section className="relative px-4 md:px-6 py-4 md:py-6 ">
            {/* Iridescence Background Container - Contains everything and clips content */}
            <div className="relative w-full rounded-[2.5rem] overflow-hidden border border-blue">
                {/* Iridescence layer */}
                <div className="absolute inset-0 z-0">
                    <Iridescence 
                        color={[0.2, 0.4, 1]} 
                        mouseReact={false} 
                        amplitude={8} 
                        speed={0.6} 
                    />
                </div>
                {/* Frosted glass overlay */}
                <div className="absolute inset-0 z-[1] bg-white/30 dark:bg-slate-900/30 backdrop-blur-md backdrop-saturate-150" />

                {/* Content Container - hugs content */}
                <div className="relative z-10 w-full flex flex-col items-center text-center pt-16 md:pt-20 lg:pt-24">
                    {/* Text Content */}
                    <div className="flex flex-col items-center px-4 md:px-8 max-w-4xl mx-auto">
                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-bold text-white leading-[1.2] [-webkit-text-stroke:0.5px_rgba(0,0,0,1)] dark:hidden">
                            Never miss a
                            <br />
                            deadline again
                        </h1>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-bold text-white leading-[1.2] [-webkit-text-stroke:0.5px_rgba(0,0,0,1)] hidden dark:block">
                            Never miss a
                            <br />
                            deadline again
                        </h1>

                        {/* Body copy */}
                        <p className="text-base sm:text-[16px] md:text-[18px] font-montserrat font-medium text-white mt-4 sm:mt-6 md:mt-10 max-w-[600px] leading-relaxed dark:hidden">
                            With Notiva, you don&apos;t track deadlines — our AI, Novi, does.
                            It scans your connected accounts for bills, subscriptions and
                            important documents (like IDs and contracts), then automatically
                            reminds you before anything expires.
                        </p>
                        <p className="text-base sm:text-[16px] md:text-[18px] font-medium text-white mt-4 sm:mt-6 md:mt-10 max-w-[600px] leading-relaxed hidden dark:block">
                            With Notiva, you don&apos;t track deadlines — our AI, Novi, does.
                            It scans your connected accounts for bills, subscriptions and
                            important documents (like IDs and contracts), then automatically
                            reminds you before anything expires.
                        </p>

                        {/* CTA Button */}
                        <a
                            href={getMainAppRegisterUrl()}
                            className="inline-flex items-center gap-0 mt-6 sm:mt-8 bg-[#1a1a1a] rounded-[12px] pl-5 sm:pl-6 pr-1.5 py-1.5 group hover:bg-[#2a2a2a] transition-colors"
                        >
                            <span className="text-white font-medium text-sm sm:text-base md:text-lg pr-3 sm:pr-4">Let AI track my deadlines</span>
                            <span className="flex items-center justify-center size-9 sm:size-10 md:size-12 bg-white rounded-[8px]">
                                <ArrowRight className="size-4 sm:size-5 md:size-6 text-[#1a1a1a]" strokeWidth={2.5} />
                            </span>
                        </a>
                    </div>

                    {/* Dashboard Preview - Fixed gap from CTA, clipped by parent overflow-hidden */}
                    {/* Recommended animation/image size: 1200x800px (3:2 ratio) or 1440x960px for retina */}
                    <div className="w-full max-w-5xl mx-auto mt-8 px-4 md:px-8">
                        <div className="relative w-full max-h-[300px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[450px] xl:max-h-[500px] overflow-hidden rounded-t-2xl shadow-2xl shadow-black/10">
                            <Image
                                src="/Dashboard-screenshot-example.png"
                                alt="Notiva Dashboard - Track your subscriptions and deadlines"
                                width={1200}
                                height={800}
                                className="w-full h-auto"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

/*
 * ANIMATION/IMAGE SIZE RECOMMENDATIONS:
 * 
 * For the dashboard preview area, create animations or images at these sizes:
 * 
 * Standard: 1200 x 800px (3:2 aspect ratio)
 * Retina:   2400 x 1600px (for high-DPI displays)
 * 
 * The visible area will be approximately:
 * - Mobile (< 640px):     ~350px width, max 400px height visible
 * - Tablet (640-1024px):  ~600px width, max 450-500px height visible  
 * - Desktop (> 1024px):   ~900px width, max 550-600px height visible
 * 
 * The bottom portion of the image/animation will be clipped by the rounded container.
 * Design with important content in the top 60-70% of the frame.
 * 
 * File formats:
 * - Static: WebP or PNG (with transparency if needed)
 * - Animated: MP4 (best compression), WebM, or Lottie JSON
 * - For looping animations, keep file size under 2MB for good performance
 */

