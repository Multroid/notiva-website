"use client"

import { Fragment, useState } from "react"
import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon, MoonIcon } from "@heroicons/react/24/solid"
import {
    SparklesIcon,
    BanknotesIcon,
    ArrowPathIcon,
    ShieldCheckIcon,
    ChartBarIcon,
    MapIcon,
} from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"

type Status = "yes" | "partial" | "none"

type Capability = {
    title: string
    subtitle: string
    icon: React.ComponentType<{ className?: string }>
    status: Record<string, Status>
}

const competitors = [
    "Finanzguru",
    "Check24",
    "WISO Steuer",
    "Clark",
    "Cleo",
    "Revolut",
    "Aboalarm",
] as const

const capabilities: Capability[] = [
    {
        title: "AI financial Agent",
        subtitle: "Smart, proactive, conversational agent with deep Financial knowledge.",
        icon: SparklesIcon,
        status: {
            Notiva: "yes",
            Finanzguru: "none",
            Check24: "none",
            "WISO Steuer": "none",
            Clark: "none",
            Cleo: "yes",
            Revolut: "partial",
            Aboalarm: "none",
        },
    },
    {
        title: "Tax Intelligence",
        subtitle: "Auto-detection from transactions & emails",
        icon: BanknotesIcon,
        status: {
            Notiva: "yes",
            Finanzguru: "none",
            Check24: "partial",
            "WISO Steuer": "yes",
            Clark: "none",
            Cleo: "none",
            Revolut: "none",
            Aboalarm: "none",
        },
    },
    {
        title: "Subscription & Provider management",
        subtitle:
            "Detection, optimization, cancellation of digital Subscriptions and Electricity, gas, internet, telecom.",
        icon: ArrowPathIcon,
        status: {
            Notiva: "yes",
            Finanzguru: "yes",
            Check24: "yes",
            "WISO Steuer": "none",
            Clark: "none",
            Cleo: "partial",
            Revolut: "none",
            Aboalarm: "yes",
        },
    },
    {
        title: "Insurance optimization",
        subtitle: "Compare & switch across 300+ providers",
        icon: ShieldCheckIcon,
        status: {
            Notiva: "yes",
            Finanzguru: "yes",
            Check24: "yes",
            "WISO Steuer": "none",
            Clark: "yes",
            Cleo: "none",
            Revolut: "partial",
            Aboalarm: "none",
        },
    },
    {
        title: "Credit score intelligence",
        subtitle: "SCHUFA analysis & improvement",
        icon: ChartBarIcon,
        status: {
            Notiva: "yes",
            Finanzguru: "none",
            Check24: "none",
            "WISO Steuer": "none",
            Clark: "none",
            Cleo: "yes",
            Revolut: "none",
            Aboalarm: "none",
        },
    },
    {
        title: "Pension & retirement Planning",
        subtitle: "Altersvorsorge optimization",
        icon: MapIcon,
        status: {
            Notiva: "yes",
            Finanzguru: "yes",
            Check24: "none",
            "WISO Steuer": "none",
            Clark: "partial",
            Cleo: "none",
            Revolut: "none",
            Aboalarm: "none",
        },
    },
]

function StatusCell({ status }: { status: Status }) {
    if (status === "yes") {
        return <CheckIcon className="size-6 text-[#16A34A]" aria-label="Supported" />
    }
    if (status === "partial") {
        return (
            <MoonIcon
                className="size-6 -rotate-90 text-[#F05627]"
                aria-label="Partially supported"
            />
        )
    }
    return <span className="sr-only">Not supported</span>
}

const VISIBLE_COMPETITORS = 2
const CAPABILITY_COL_WIDTH = 400

export default function ComparisonSection() {
    const [startIdx, setStartIdx] = useState(0)
    const maxStart = competitors.length - VISIBLE_COMPETITORS

    const visibleCompetitors = competitors.slice(startIdx, startIdx + VISIBLE_COMPETITORS)

    const goPrev = () => setStartIdx((i) => Math.max(0, i - 1))
    const goNext = () => setStartIdx((i) => Math.min(maxStart, i + 1))

    const canGoPrev = startIdx > 0
    const canGoNext = startIdx < maxStart

    return (
        <section className="flex flex-col items-center justify-center px-4 py-[168px]">
            <div className="flex w-full max-w-[1440px] flex-col items-center gap-20">
                <h2 className="text-center font-bold text-[46px] leading-[69px] text-[#0047BA]">
                    Notiva does it all, so you don&rsquo;t have to.
                </h2>

                <div className="flex w-full max-w-full flex-col items-center gap-10 overflow-x-auto">
                    <div className="flex w-[1188px] shrink-0 flex-col px-12">
                        {/* Header row */}
                        <div className="relative flex w-full items-center py-4">
                            <div
                                className="flex shrink-0 items-center"
                                style={{ width: CAPABILITY_COL_WIDTH }}
                            >
                                <p className="font-bold text-base text-black whitespace-nowrap">
                                    CAPABILITY
                                </p>
                            </div>
                            <div className="flex flex-1 items-center justify-center rounded-tl-xl rounded-tr-xl bg-[#0047BA] py-4 -my-4">
                                <p className="font-bold text-sm text-white whitespace-nowrap">
                                    Notiva
                                </p>
                            </div>
                            {visibleCompetitors.map((c) => (
                                <div
                                    key={c}
                                    className="flex flex-1 items-center justify-center"
                                >
                                    <p className="font-bold text-sm text-black whitespace-nowrap">
                                        {c}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Top divider */}
                        <div className="h-1 w-full rounded-sm bg-[#0047BA]" />

                        {/* Body section — relative parent for the absolute Notiva column tint.
                            No parent gap above/below, so the body's outer edges sit flush against
                            the top and bottom dividers. Internal gap-2 still spaces the rows. */}
                        <div className="relative flex flex-col gap-2">
                            {/* Notiva column body background — absolutely positioned so the
                                tint stays continuous through the gap-2 row gaps */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-y-0 bg-[rgba(0,71,186,0.1)]"
                                style={{
                                    left: `${CAPABILITY_COL_WIDTH}px`,
                                    width: `calc((100% - ${CAPABILITY_COL_WIDTH}px) / 3)`,
                                    boxShadow: "3px 0 4px 0 rgba(0,0,0,0.15)",
                                }}
                            />

                            {capabilities.map((cap, rowIdx) => {
                                const Icon = cap.icon
                                const isLast = rowIdx === capabilities.length - 1
                                return (
                                    <Fragment key={cap.title}>
                                        <div className="relative flex w-full items-center py-3">
                                            <div
                                                className="flex shrink-0 items-start gap-2 pr-4"
                                                style={{ width: CAPABILITY_COL_WIDTH }}
                                            >
                                                <Icon className="size-6 shrink-0 text-[#0047BA]" />
                                                <div className="flex flex-1 flex-col gap-2">
                                                    <p className="font-bold text-sm text-[#333333]">
                                                        {cap.title}
                                                    </p>
                                                    <p className="font-medium text-xs text-[#A4A4A4]">
                                                        {cap.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 items-center justify-center">
                                                <StatusCell status={cap.status.Notiva} />
                                            </div>
                                            {visibleCompetitors.map((c) => (
                                                <div
                                                    key={c}
                                                    className="flex flex-1 items-center justify-center"
                                                >
                                                    <StatusCell status={cap.status[c]} />
                                                </div>
                                            ))}
                                        </div>
                                        {!isLast && (
                                            <div className="relative h-px w-full bg-[#D9D6D1]" />
                                        )}
                                    </Fragment>
                                )
                            })}
                        </div>

                        {/* Bottom divider */}
                        <div className="h-1 w-full rounded-sm bg-[#0047BA]" />

                        {/* Carousel row — arrows in the LEFT and RIGHT competitor columns */}
                        <div className="mt-2 flex w-full items-center py-3">
                            <div
                                className="shrink-0"
                                style={{ width: CAPABILITY_COL_WIDTH }}
                            />
                            <div className="flex flex-1" />
                            <div className="flex flex-1 items-center justify-start">
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    disabled={!canGoPrev}
                                    aria-label="Show previous competitors"
                                    className="appearance-none flex items-center justify-center rounded-full border-2 border-[#D9E3F5] bg-white p-4 outline-none focus:outline-none transition-opacity disabled:opacity-30"
                                >
                                    <ChevronLeftIcon className="size-[14px] text-[#0047BA]" />
                                </button>
                            </div>
                            <div className="flex flex-1 items-center justify-end">
                                <button
                                    type="button"
                                    onClick={goNext}
                                    disabled={!canGoNext}
                                    aria-label="Show next competitors"
                                    className="appearance-none flex items-center justify-center rounded-full border-2 border-[#D9E3F5] bg-white p-4 outline-none focus:outline-none transition-opacity disabled:opacity-30"
                                >
                                    <ChevronRightIcon className="size-[14px] text-[#0047BA]" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <Button asChild variant="secondary">
                        <Link href="/features">Compare in detail</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
