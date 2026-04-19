"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
    LifebuoyIcon,
    BookOpenIcon,
    UserIcon,
    ShoppingCartIcon,
    EnvelopeIcon,
    PencilIcon,
    ListBulletIcon,
    SparklesIcon,
    CalendarIcon,
    UsersIcon,
    FolderIcon,
    PuzzlePieceIcon,
    BellAlertIcon,
    ShieldCheckIcon,
    Squares2X2Icon,
} from "@heroicons/react/24/solid"
import { Button } from "@/components/ui/button"
import LanguageDropdown from "@/components/LanguageDropdown"
import { WaitlistDialog } from "@/components/WaitlistDialog"

type MegaItem = {
    label: string
    description: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

type MegaColumn = {
    title: string
    variant: "cards" | "list"
    items: MegaItem[]
}

const aboutMega: MegaColumn[] = [
    {
        title: "Explore",
        variant: "cards",
        items: [
            { label: "FAQs", description: "Frequently asked questions", href: "/faq", icon: LifebuoyIcon },
            { label: "Docs", description: "Platform documentation", href: "/help", icon: BookOpenIcon },
        ],
    },
    {
        title: "Company",
        variant: "list",
        items: [
            { label: "About", description: "Company, values, and team", href: "/about/company", icon: UserIcon },
            { label: "Brand Guidelines", description: "Logos, wordmark, etc.", href: "/brand", icon: ShoppingCartIcon },
            { label: "Contact Support", description: "Reach out to support", href: "/contact", icon: EnvelopeIcon },
        ],
    },
    {
        title: "Updates",
        variant: "list",
        items: [
            { label: "Blog", description: "Insights and stories", href: "/blog", icon: PencilIcon },
            { label: "Changelog", description: "Releases and updates", href: "/changelog", icon: ListBulletIcon },
            { label: "Webinars", description: "Product details", href: "/blog", icon: SparklesIcon },
        ],
    },
]

type SimpleLink = { label: string; href: string }
type NavItem = SimpleLink | { label: string; mega: MegaColumn[] }

const featuresMega: MegaColumn[] = [
    {
        title: "Product",
        variant: "list",
        items: [
            { label: "Calendar Sync", description: "Plan around every payment", href: "/features/calendar-sync", icon: CalendarIcon },
            { label: "Collaboration", description: "Share finances with family", href: "/features/collaboration", icon: UsersIcon },
            { label: "Document Vault", description: "Receipts, invoices, contracts", href: "/features/document-vault", icon: FolderIcon },
        ],
    },
    {
        title: "Platform",
        variant: "list",
        items: [
            { label: "Integrations", description: "Banks and tools, connected", href: "/features/integrations", icon: PuzzlePieceIcon },
            { label: "Smart Reminders", description: "Never miss a due date", href: "/features/reminders", icon: BellAlertIcon },
            { label: "Security", description: "Bank-grade by default", href: "/features/security", icon: ShieldCheckIcon },
        ],
    },
    {
        title: "Overview",
        variant: "list",
        items: [
            { label: "All Features", description: "Explore the full platform", href: "/features", icon: Squares2X2Icon },
            { label: "Meet Novi", description: "Your AI finance co-pilot", href: "/features", icon: SparklesIcon },
        ],
    },
]

const navItems: NavItem[] = [
    { label: "Features", mega: featuresMega },
    { label: "Pricing", href: "/pricing" },
    { label: "For Business", href: "/business" },
    { label: "About", mega: aboutMega },
]

export default function Navbar() {
    const [waitlistOpen, setWaitlistOpen] = useState(false)
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    const scheduleClose = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current)
        closeTimer.current = setTimeout(() => setOpenIndex(null), 120)
    }
    const cancelClose = () => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current)
            closeTimer.current = null
        }
    }
    useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

    return (
        <header className="sticky top-0 z-40 w-full backdrop-blur-[6px] bg-white/80">
            <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-10 py-[18px]">
                <div className="flex items-center gap-20">
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-lg p-2"
                        aria-label="Notiva home"
                    >
                        <Image
                            src="/Logo/Notiva Logo transparent normal.svg"
                            alt=""
                            width={25}
                            height={24}
                            priority
                        />
                        <span className="font-bold text-2xl leading-[26px] tracking-[2px] uppercase text-[#0047BA]">
                            Notiva
                        </span>
                    </Link>

                    <nav className="flex items-center gap-8">
                        {navItems.map((item, i) => {
                            const isMega = "mega" in item
                            if (!isMega) {
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="font-medium text-base leading-6 text-[#67696B] hover:text-[#0047BA] transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                )
                            }
                            const open = openIndex === i
                            return (
                                <div
                                    key={item.label}
                                    className="relative"
                                    onMouseEnter={() => { cancelClose(); setOpenIndex(i) }}
                                    onMouseLeave={scheduleClose}
                                >
                                    <button
                                        type="button"
                                        aria-expanded={open}
                                        className={`font-medium text-base leading-6 transition-colors ${open ? "text-[#0047BA]" : "text-[#67696B] hover:text-[#0047BA]"}`}
                                    >
                                        {item.label}
                                    </button>
                                    <AnimatePresence>
                                        {open && (
                                            <MegaMenu
                                                columns={item.mega}
                                                onEnter={cancelClose}
                                                onLeave={scheduleClose}
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        })}
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <LanguageDropdown />

                    <div className="flex items-center gap-4">
                        <Button asChild variant="secondaryClean">
                            <Link href="/login">Log in</Link>
                        </Button>
                        <Button variant="primary" onClick={() => setWaitlistOpen(true)}>
                            Join the waitlist
                        </Button>
                    </div>
                </div>
            </div>
            <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
        </header>
    )
}

function MegaMenu({
    columns,
    onEnter,
    onLeave,
}: {
    columns: MegaColumn[]
    onEnter: () => void
    onLeave: () => void
}) {
    return (
        <>
            {/* Hover bridge to prevent flicker between trigger and panel */}
            <div
                className="absolute left-0 right-0 top-full h-3"
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
            />
            <motion.div
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.985 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 top-full mt-3 -translate-x-1/2 z-50 origin-top"
            >
                <motion.div
                    className="flex rounded-2xl border border-[#E5E5E3] bg-[#FEFDFD] p-6 shadow-[0_20px_50px_-20px_rgba(0,25,65,0.25)]"
                    style={{ width: "min(90vw, 1100px)" }}
                >
                    {columns.map((col, idx) => (
                        <div
                            key={col.title}
                            className={`flex-1 px-6 ${idx !== 0 ? "border-l border-[#EEEDEA]" : ""}`}
                        >
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[1.5px] text-[#898C8E]">
                                {col.title}
                            </p>
                            {col.variant === "cards" ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {col.items.map((it) => (
                                        <Link
                                            key={it.label}
                                            href={it.href}
                                            className="group flex flex-col justify-between rounded-xl bg-[#F3F4F4] p-4 min-h-[170px] hover:bg-[#E8EAEA] transition-colors"
                                        >
                                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FEFDFD] ring-1 ring-[#E5E5E3]">
                                                <it.icon className="h-5 w-5 text-[#101113]" />
                                            </span>
                                            <div>
                                                <p className="font-semibold text-lg text-[#101113]">
                                                    {it.label}
                                                </p>
                                                <p className="text-sm text-[#67696B]">
                                                    {it.description}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <ul className="flex flex-col gap-2">
                                    {col.items.map((it) => (
                                        <li key={it.label}>
                                            <Link
                                                href={it.href}
                                                className="flex items-center gap-3 rounded-xl p-2 hover:bg-[#F3F4F4] transition-colors"
                                            >
                                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#F3F4F4] ring-1 ring-[#E5E5E3]">
                                                    <it.icon className="h-5 w-5 text-[#101113]" />
                                                </span>
                                                <span className="flex flex-col">
                                                    <span className="font-semibold text-base text-[#101113] leading-tight">
                                                        {it.label}
                                                    </span>
                                                    <span className="text-sm text-[#67696B] leading-tight">
                                                        {it.description}
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </>
    )
}
