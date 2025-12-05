'use client'

import { ArrowRight } from 'lucide-react'
import { getMainAppRegisterUrl } from '@/lib/app-url'

export default function HeroSection() {
    return (
        <section className="relative min-h-[70svh] -mt-[69px] pt-[69px] flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
                poster="/video/pastel-gradient-poster.jpg"
            >
                <source src="/video/pastel gradient sky.mp4" type="video/mp4" />
            </video>

            {/* Fallback gradient for when video doesn't load */}
            <div className="hero-sky-bg absolute inset-0 z-0" aria-hidden="true" />

            {/* Frosted blur overlay */}
            <div className="absolute inset-0 z-[1] backdrop-blur-[12px] bg-white/15" aria-hidden="true" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center py-16">
                {/* Headline */}
                <h1 className="hero-headline text-[#1a1a1a]">
                    Never miss a
                    <br />
                    deadline again
                </h1>

                {/* Body copy */}
                <p className="hero-body text-[#1a1a1a] mt-8 max-w-[680px]">
                    With Notiva, you don&apos;t track deadlines — our AI, Novi, does.
                    <br />
                    It scans your connected accounts for bills, subscriptions and important documents
                    <br />
                    (like IDs and contracts), then automatically reminds you before anything expires.
                </p>

                {/* CTA Button */}
                <a
                    href={getMainAppRegisterUrl()}
                    className="hero-cta-button group mt-10"
                >
                    <span className="hero-cta-text">Let AI track my deadlines</span>
                    <span className="hero-cta-chip">
                        <ArrowRight className="size-5 text-[#1a1a1a]" strokeWidth={2.5} />
                    </span>
                </a>
            </div>
        </section>
    )
}

