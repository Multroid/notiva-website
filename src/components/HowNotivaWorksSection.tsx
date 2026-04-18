"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const steps = [
    {
        num: 1,
        title: "Connect your accounts",
        description: "Bank, Email, Notion, Excel, Paypal, Stripe and more.",
    },
    {
        num: 2,
        title: "Novi learns your finances",
        description:
            "Novi analyzes your transactions, contracts, and goals to build a complete picture of your money.",
    },
    {
        num: 3,
        title: "Get proactive insights",
        description:
            "Daily briefs, contract end alerts, and tax tips — delivered before they cost you anything.",
    },
    {
        num: 4,
        title: "Let Novi take action",
        description:
            "Approve in one tap. Novi handles the boring stuff: cancellations, switches, deductions, reminders.",
    },
]

export default function HowNotivaWorksSection() {
    const [activeIndex, setActiveIndex] = useState(0)
    const refs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number(entry.target.getAttribute("data-step-index"))
                        setActiveIndex(idx)
                    }
                })
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
        )
        refs.current.forEach((el) => el && observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <section className="bg-[#00286A] px-4 py-[168px]">
            <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[120px]">
                <h2 className="text-center font-bold text-[46px] leading-[69px] text-white">
                    Set up in minutes.
                    <br />
                    Works for you forever.
                </h2>

                <div className="grid w-full grid-cols-1 gap-20 lg:grid-cols-2">
                    {/* Left: sticky animation — pinned full-viewport-height; cross-fades between step visuals on activeIndex change */}
                    <div>
                        <div className="sticky top-0 flex h-screen items-center justify-center">
                            <div className="relative size-[480px] max-w-full">
                                {steps.map((step, i) => (
                                    <div
                                        key={step.num}
                                        aria-hidden={i !== activeIndex}
                                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3D87FF]/40 to-[#0047BA]/10 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.5)] transition-opacity duration-500 ${
                                            i === activeIndex
                                                ? "opacity-100"
                                                : "pointer-events-none opacity-0"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: scrolling step text — each step takes one viewport height so the IntersectionObserver fires cleanly */}
                    <div className="flex flex-col">
                        {steps.map((step, i) => (
                            <div
                                key={step.num}
                                ref={(el) => {
                                    refs.current[i] = el
                                }}
                                data-step-index={i}
                                className="flex h-screen items-center"
                            >
                                <div className="flex flex-col gap-4 text-white">
                                    <p className="font-bold text-[38px] leading-[57px]">
                                        Step {step.num}.
                                    </p>
                                    <div className="flex max-w-[364px] flex-col gap-2">
                                        <h3 className="font-bold text-[26px] leading-[39px]">
                                            {step.title}
                                        </h3>
                                        <p className="font-medium text-sm leading-[21px]">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Button asChild variant="secondary">
                    <Link href="/features">Learn More</Link>
                </Button>
            </div>
        </section>
    )
}
