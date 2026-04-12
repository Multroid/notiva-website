"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/ui/button"

type Persona = {
    id: string
    label: string
    title: string
    description: string
    cta: string
    href: string
    gradient: string
}

const personas: Persona[] = [
    {
        id: "freelancers",
        label: "Freelancers",
        title: "Freelancers",
        description:
            "Novi doesn't just track — it proactively analyzes your insurance, detects tax deductions, compares providers, monitors credit, and alerts you before money is lost.",
        cta: "Explore Freelancer options",
        href: "/features",
        gradient: "from-[#5b8def] to-[#0047BA]",
    },
    {
        id: "families",
        label: "Families",
        title: "Families",
        description:
            "Coordinate household bills, school payments, and renewals in one place. Novi keeps everyone aligned and your budget on track without the spreadsheets.",
        cta: "Explore Family options",
        href: "/features",
        gradient: "from-[#f59e8e] to-[#CA3A0E]",
    },
    {
        id: "couples",
        label: "Couples",
        title: "Couples",
        description:
            "Joint accounts, shared subscriptions, split rent — Novi handles the boring stuff so you can focus on building a life together.",
        cta: "Explore Couple options",
        href: "/features",
        gradient: "from-[#a78bfa] to-[#6d28d9]",
    },
    {
        id: "students",
        label: "Students",
        title: "Students",
        description:
            "Stretch every euro further. Novi spots student discounts, tracks tuition deadlines, and helps you build credit responsibly from day one.",
        cta: "Explore Student options",
        href: "/features",
        gradient: "from-[#34d399] to-[#047857]",
    },
    {
        id: "entrepreneurs",
        label: "Entrepreneurs",
        title: "Entrepreneurs",
        description:
            "Separate business and personal finances, automate invoicing reminders, and get intelligent tax forecasts so you can keep building, not bookkeeping.",
        cta: "Explore Entrepreneur options",
        href: "/business",
        gradient: "from-[#fbbf24] to-[#b45309]",
    },
]

export default function BuiltForBigSection() {
    const [activeIndex, setActiveIndex] = useState(0)

    const total = personas.length
    const active = personas[activeIndex]
    const prev = personas[(activeIndex - 1 + total) % total]
    const next = personas[(activeIndex + 1) % total]

    const goPrev = () => setActiveIndex((i) => (i - 1 + total) % total)
    const goNext = () => setActiveIndex((i) => (i + 1) % total)

    return (
        <section className="flex flex-col items-center gap-14 px-4 py-[168px]">
            <div className="flex w-full max-w-[1440px] flex-col items-start gap-6 px-6">
                <p className="font-bold text-[22px] leading-[33px] text-[#CA3A0E]">
                    Built for real life
                </p>
                <h2 className="font-bold text-[46px] leading-[69px] text-[#333333]">
                    Made for people who&rsquo;d rather{" "}
                    <span className="text-[#0060FB]">live</span> than manage spreadsheets.
                </h2>
            </div>

            <div className="flex w-full max-w-[1440px] flex-col items-center gap-20 px-4">
                <div className="flex h-[785px] w-full items-center justify-center gap-8">
                    {/* Previous preview */}
                    <button
                        type="button"
                        onClick={goPrev}
                        aria-label={`Show ${prev.label}`}
                        className={`relative flex h-full w-[200px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${prev.gradient} shadow-[0px_25px_50px_-12px_rgba(0,71,186,0.25)]`}
                    >
                        <div className="absolute inset-0 bg-[rgba(173,204,255,0.4)]" />
                        <span className="relative flex items-center justify-center rounded-full border-2 border-[#D9E3F5] bg-white p-4">
                            <ChevronLeftIcon className="size-[14px] text-[#0047BA]" />
                        </span>
                    </button>

                    {/* Active card */}
                    <div
                        className={`relative flex h-full flex-1 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${active.gradient} p-14 shadow-[0px_25px_50px_-12px_rgba(0,71,186,0.25)]`}
                    >
                        <div className="absolute inset-0 bg-[rgba(0,40,104,0.4)]" />
                        <div className="relative flex flex-col gap-4">
                            <h3 className="font-bold text-[68px] leading-[102px] text-white">
                                {active.title}
                            </h3>
                            <p className="max-w-[600px] font-medium text-lg leading-[27px] text-white">
                                {active.description}
                            </p>
                        </div>
                        <div className="relative">
                            <Button asChild variant="secondary">
                                <Link href={active.href}>{active.cta}</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Next preview */}
                    <button
                        type="button"
                        onClick={goNext}
                        aria-label={`Show ${next.label}`}
                        className={`relative flex h-full w-[200px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${next.gradient} shadow-[0px_25px_50px_-12px_rgba(0,71,186,0.25)]`}
                    >
                        <div className="absolute inset-0 bg-[rgba(173,204,255,0.4)]" />
                        <span className="relative flex items-center justify-center rounded-full border-2 border-[#D9E3F5] bg-white p-4">
                            <ChevronRightIcon className="size-[14px] text-[#0047BA]" />
                        </span>
                    </button>
                </div>

                {/* Tabs */}
                <div role="tablist" className="flex flex-wrap items-center justify-center gap-4">
                    {personas.map((p, i) => {
                        const isActive = i === activeIndex
                        return (
                            <button
                                key={p.id}
                                role="tab"
                                type="button"
                                aria-selected={isActive}
                                onClick={() => setActiveIndex(i)}
                                className={`appearance-none flex items-center justify-center rounded-3xl border-2 border-[#D9E3F5] px-6 py-3 font-semibold text-base leading-6 transition-colors outline-none focus:outline-none ${
                                    isActive
                                        ? "bg-[#0047BA] text-[#F0EEE9]"
                                        : "bg-[#FEFDFD] text-[#898C8E] hover:text-[#0047BA]"
                                }`}
                            >
                                {p.label}
                            </button>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
