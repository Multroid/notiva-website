"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PlayIcon } from "@heroicons/react/24/solid"
import { AnimatePresence, motion } from "framer-motion"
import { CarouselArrowButton } from "@/components/ui/carousel-arrow-button"
import { Reveal } from "@/components/ui/reveal"

type Persona = {
    id: string
    label: string
    title: string
    description: string
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
        href: "/features",
        gradient: "linear-gradient(135deg, #5b8def 0%, #0047BA 100%)",
    },
    {
        id: "families",
        label: "Families",
        title: "Families",
        description:
            "Coordinate household bills, school payments, and renewals in one place. Novi keeps everyone aligned and your budget on track without the spreadsheets.",
        href: "/features",
        gradient: "linear-gradient(135deg, #f59e8e 0%, #CA3A0E 100%)",
    },
    {
        id: "couples",
        label: "Couples",
        title: "Couples",
        description:
            "Joint accounts, shared subscriptions, split rent — Novi handles the boring stuff so you can focus on building a life together.",
        href: "/features",
        gradient: "linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%)",
    },
    {
        id: "students",
        label: "Students",
        title: "Students",
        description:
            "Stretch every euro further. Novi spots student discounts, tracks tuition deadlines, and helps you build credit responsibly from day one.",
        href: "/features",
        gradient: "linear-gradient(135deg, #34d399 0%, #047857 100%)",
    },
    {
        id: "entrepreneurs",
        label: "Entrepreneurs",
        title: "Entrepreneurs",
        description:
            "Separate business and personal finances, automate invoicing reminders, and get intelligent tax forecasts so you can keep building, not bookkeeping.",
        href: "/business",
        gradient: "linear-gradient(135deg, #fbbf24 0%, #b45309 100%)",
    },
]

type CardProps = {
    persona: Persona
    variant: "active" | "peek"
}

function PersonaCard({ persona, variant }: CardProps) {
    const isPeek = variant === "peek"
    return (
        <div
            aria-hidden={isPeek}
            className={`flex w-full flex-col gap-6 ${
                isPeek ? "pointer-events-none opacity-50 blur-[5px]" : ""
            }`}
        >
            <div
                className="relative h-[380px] w-full overflow-hidden rounded-2xl"
                style={{ background: persona.gradient }}
            >
                <div
                    className="pointer-events-none absolute left-[24px] top-[300px] flex size-[56px] items-center justify-center rounded-full bg-white"
                    style={{
                        boxShadow:
                            "0px 10px 15px 0px rgba(0,0,0,0.1), 0px 4px 6px 0px rgba(0,0,0,0.1)",
                    }}
                >
                    <PlayIcon className="size-5 text-[#0047BA]" />
                </div>
            </div>

            <div className="flex w-full items-end justify-center gap-4">
                <div className="flex flex-1 flex-col gap-4">
                    <p className="font-bold text-[22px] leading-[33px] text-[#0047BA]">
                        {persona.title}
                    </p>
                    <p className="max-w-[448px] font-medium text-base leading-6 text-[#333333]">
                        {persona.description}
                    </p>
                </div>
                <Link
                    href={persona.href}
                    tabIndex={isPeek ? -1 : 0}
                    className="inline-flex shrink-0 items-center justify-center rounded-lg border border-[#0047BA] bg-[#FEFDFD] px-8 py-4 font-semibold text-base leading-[18px] text-[#0047BA] transition-colors hover:bg-[#E8E8E8]"
                >
                    Learn more
                </Link>
            </div>
        </div>
    )
}

const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 420 : -420, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -420 : 420, opacity: 0 }),
}

export default function BuiltForBigSection() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    const total = personas.length
    const active = personas[activeIndex]
    const prev = personas[(activeIndex - 1 + total) % total]
    const next = personas[(activeIndex + 1) % total]

    const goTo = (i: number) => {
        if (i === activeIndex) return
        const forward = (i - activeIndex + total) % total
        const backward = (activeIndex - i + total) % total
        setDirection(forward <= backward ? 1 : -1)
        setActiveIndex(i)
    }

    const goPrev = () => {
        setDirection(-1)
        setActiveIndex((activeIndex - 1 + total) % total)
    }

    const goNext = () => {
        setDirection(1)
        setActiveIndex((activeIndex + 1) % total)
    }

    useEffect(() => {
        const id = setTimeout(() => {
            setDirection(1)
            setActiveIndex((i) => (i + 1) % total)
        }, 7000)
        return () => clearTimeout(id)
    }, [activeIndex, total])

    return (
        <section className="flex flex-col items-center gap-20 overflow-x-clip px-4 py-[168px]">
            {/* Headline row */}
            <Reveal className="flex w-full max-w-[1440px] items-center justify-center gap-14 px-4">
                <div className="flex flex-1 flex-col items-start gap-2">
                    <p className="font-bold text-[22px] leading-[33px] text-[#7DAFFF]">
                        Built for real life
                    </p>
                    <h2 className="font-normal text-[46px] leading-[69px] text-[#333333]">
                        Built for People
                    </h2>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="whitespace-pre-wrap font-medium text-base leading-6 text-[#A4A4A4]">
                        Made for people who&rsquo;d rather{" "}
                        <span className="text-[#7DAFFF]">live</span>
                        {"\n"}than manage spreadsheets.
                    </p>
                </div>
            </Reveal>

            {/* Cards + Tabs */}
            <Reveal delay={0.1} className="flex w-full flex-col items-center gap-[120px]">
                <div className="relative flex w-full items-center justify-center">
                    <AnimatePresence
                        initial={false}
                        custom={direction}
                        mode="popLayout"
                    >
                        <motion.div
                            key={activeIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 260, damping: 32 },
                                opacity: { duration: 0.25 },
                            }}
                            className="flex w-full items-center justify-center gap-14"
                        >
                            <button
                                type="button"
                                aria-label={`View ${prev.label}`}
                                onClick={goPrev}
                                className="w-[623px] shrink-0 cursor-pointer appearance-none bg-transparent text-left outline-none focus:outline-none"
                            >
                                <PersonaCard persona={prev} variant="peek" />
                            </button>
                            <div className="w-[631px] shrink-0">
                                <PersonaCard persona={active} variant="active" />
                            </div>
                            <button
                                type="button"
                                aria-label={`View ${next.label}`}
                                onClick={goNext}
                                className="w-[623px] shrink-0 cursor-pointer appearance-none bg-transparent text-left outline-none focus:outline-none"
                            >
                                <PersonaCard persona={next} variant="peek" />
                            </button>
                        </motion.div>
                    </AnimatePresence>

                    <CarouselArrowButton
                        direction="left"
                        aria-label="Previous persona"
                        onClick={goPrev}
                        style={{ top: "190px", left: "calc(50% - 626px)" }}
                        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    />
                    <CarouselArrowButton
                        direction="right"
                        aria-label="Next persona"
                        onClick={goNext}
                        style={{ top: "190px", left: "calc(50% + 626px)" }}
                        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    />
                </div>

                {/* Tabs */}
                <div className="flex w-full flex-col items-center px-4">
                    <div
                        role="tablist"
                        aria-label="Select persona"
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        {personas.map((p, i) => {
                            const isActive = i === activeIndex
                            return (
                                <button
                                    key={p.id}
                                    role="tab"
                                    type="button"
                                    aria-selected={isActive}
                                    onClick={() => goTo(i)}
                                    className={`appearance-none relative flex items-center justify-center overflow-hidden rounded-3xl border-2 border-[#D9E3F5] px-6 py-3 font-semibold text-base leading-6 transition-colors outline-none focus:outline-none ${
                                        isActive
                                            ? "bg-[#0047BA] text-[#F0EEE9]"
                                            : "bg-[#FEFDFD] text-[#898C8E] hover:text-[#0047BA]"
                                    }`}
                                >
                                    {isActive && (
                                        <motion.span
                                            key={activeIndex}
                                            aria-hidden
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 7, ease: "linear" }}
                                            className="pointer-events-none absolute inset-y-0 left-0 bg-[#00336C]"
                                        />
                                    )}
                                    <span className="relative z-[1]">{p.label}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </Reveal>
        </section>
    )
}
