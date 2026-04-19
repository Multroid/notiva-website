"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import LanguageDropdown from "@/components/LanguageDropdown"
import { WaitlistDialog } from "@/components/WaitlistDialog"

const navLinks = [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "For Business", href: "/business" },
    { label: "About", href: "/about/company" },
]

export default function Navbar() {
    const [waitlistOpen, setWaitlistOpen] = useState(false)
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
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="font-medium text-base leading-6 text-[#67696B] hover:text-[#0047BA] transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
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
