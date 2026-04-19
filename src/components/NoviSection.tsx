"use client"

import { useState } from "react"
import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import financialManagerImg from "../../public/illustrations/novi/financial-manager.png"
import noviDefaultImg from "../../public/illustrations/novi/novi-default.png"

type Bullet = { title: string; description: string }

type Category = {
    id: string
    label: string
    image: StaticImageData
    headline: string
    ctaLabel: string
    ctaHref: string
    bullets: [Bullet, Bullet]
}

const categories: Category[] = [
    {
        id: "financial-manager",
        label: "Financial Manager",
        image: financialManagerImg,
        headline: "Turning chaos into financial clarity",
        ctaLabel: "Explore Finance tools",
        ctaHref: "/features",
        bullets: [
            {
                title: "Save up to 30% on monthly bills",
                description:
                    "Novi tracks your spending patterns and finds hidden savings across subscriptions, utilities, and recurring payments.",
            },
            {
                title: "Save 10 hours on budgeting",
                description:
                    "Stop juggling spreadsheets. Novi auto-categorizes expenses, tracks cash flow, and generates insights you can act on instantly.",
            },
        ],
    },
    {
        id: "tax-intelligence",
        label: "Tax Intelligence",
        image: noviDefaultImg,
        headline: "Never miss a tax deduction again",
        ctaLabel: "Explore Tax tools",
        ctaHref: "/features",
        bullets: [
            {
                title: "Find deductions you're missing",
                description:
                    "Novi scans your finances year-round to surface tax deductions most people overlook — automatically.",
            },
            {
                title: "Be audit-ready, always",
                description:
                    "Organized records, flagged anomalies, and real-time compliance checks so tax season is stress-free.",
            },
        ],
    },
    {
        id: "insurance",
        label: "Insurance",
        image: noviDefaultImg,
        headline: "Stop overpaying for coverage",
        ctaLabel: "Explore Insurance tools",
        ctaHref: "/features",
        bullets: [
            {
                title: "Compare 100+ providers instantly",
                description:
                    "Novi checks your current policies against hundreds of alternatives to find better rates with equal or better coverage.",
            },
            {
                title: "Get alerted before renewal traps",
                description:
                    "Novi warns you about upcoming renewals and price hikes so you can switch or negotiate before it's too late.",
            },
        ],
    },
    {
        id: "electricity",
        label: "Electricity",
        image: noviDefaultImg,
        headline: "Lower your energy bills",
        ctaLabel: "Explore Electricity tools",
        ctaHref: "/features",
        bullets: [
            {
                title: "Find the cheapest provider in your area",
                description:
                    "Novi compares electricity providers by rate, contract terms, and green energy options tailored to your location.",
            },
            {
                title: "Switch providers in minutes",
                description:
                    "Once you pick a plan, Novi handles the paperwork and transition so you don't have to lift a finger.",
            },
        ],
    },
    {
        id: "telecom-internet",
        label: "Telecom & Internet",
        image: noviDefaultImg,
        headline: "Better plans, less cost",
        ctaLabel: "Explore Telecom tools",
        ctaHref: "/features",
        bullets: [
            {
                title: "Plans matched to your real usage",
                description:
                    "Novi analyzes your data, call, and streaming habits to recommend phone and internet plans that actually fit.",
            },
            {
                title: "Bundle & save automatically",
                description:
                    "Discover bundled deals across telecom and internet that save you money without sacrificing speed or coverage.",
            },
        ],
    },
]

export default function NoviSection() {
    const [activeId, setActiveId] = useState<string>(categories[0].id)
    const active = categories.find((c) => c.id === activeId) ?? categories[0]

    return (
        <section className="flex flex-col items-center justify-center gap-8 bg-[rgba(51,51,51,0.1)] px-4 py-[168px]">
            <div className="flex w-full max-w-[1440px] flex-col items-center justify-center gap-14">
                {/* Heading */}
                <Reveal as="div" className="w-full">
                    <h2 className="w-full max-w-[1100px] mx-auto text-center font-bold text-[46px] leading-[69px] text-[#333333]">
                        Built to <span className="text-[#F05627]">power</span> your
                        <br />
                        financial life
                    </h2>
                </Reveal>

                <Reveal delay={0.1} className="flex w-full max-w-[1148px] flex-col items-stretch gap-20">
                    {/* Category cards */}
                    <div
                        role="tablist"
                        className="flex items-center justify-center gap-3"
                    >
                        {categories.map((c) => {
                            const isActive = c.id === activeId
                            return (
                                <button
                                    key={c.id}
                                    role="tab"
                                    type="button"
                                    aria-selected={isActive}
                                    onClick={() => setActiveId(c.id)}
                                    className={`group appearance-none flex w-[220px] flex-col items-center gap-4 rounded-2xl px-[17px] py-[25px] outline-none focus:outline-none transition-colors ${
                                        isActive
                                            ? "bg-white border border-[#0047BA] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]"
                                            : "bg-white/60 border border-[#E8E8E8] hover:bg-white hover:border-[#B0C6EA]"
                                    }`}
                                >
                                    <div className="relative h-[108px] w-[184.4px] overflow-hidden">
                                        <Image
                                            src={c.image}
                                            alt=""
                                            fill
                                            sizes="184px"
                                            className={`object-cover object-center transition-[filter] ${
                                                isActive ? "grayscale-0" : "grayscale group-hover:grayscale-0"
                                            }`}
                                            priority={isActive}
                                        />
                                    </div>
                                    <span
                                        className={`flex h-[42px] items-center justify-center font-medium text-sm leading-[21px] text-center transition-colors ${
                                            isActive
                                                ? "text-[#1A1A1A]"
                                                : "text-[#A4A4A4] group-hover:text-[#1A1A1A]"
                                        }`}
                                    >
                                        {c.label}
                                    </span>
                                </button>
                            )
                        })}
                    </div>

                    {/* Bottom content — animates when activeId changes */}
                    <div className="relative w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                className="flex w-full items-center justify-between"
                            >
                                {/* Left: heading + CTA */}
                                <div className="flex flex-col items-start gap-10 py-6">
                                    <h3 className="w-[380px] font-normal text-[38px] leading-[57px] text-[#333333]">
                                        {active.headline}
                                    </h3>
                                    <Button asChild variant="secondary">
                                        <Link href={active.ctaHref}>{active.ctaLabel}</Link>
                                    </Button>
                                </div>

                                {/* Right: two points */}
                                <div className="flex flex-col items-start gap-10">
                                    {active.bullets.map((b, i) => (
                                        <div key={i} className="flex flex-col items-start gap-2">
                                            <p className="font-bold text-[22px] leading-[33px] text-[#333333]">
                                                {b.title}
                                            </p>
                                            <p className="w-[500px] font-normal text-base leading-[26px] text-[#8E8E8E]">
                                                {b.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
