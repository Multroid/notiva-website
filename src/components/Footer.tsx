"use client"

import Link from "next/link"
import Image from "next/image"
import NewsletterForm from "@/components/NewsletterForm"
import { Reveal } from "@/components/ui/reveal"

const linkColumns = [
    {
        title: "Solutions",
        links: [
            { label: "Financial Management", href: "/features" },
            { label: "Tax Intelligence", href: "/features" },
            { label: "Provider Switching", href: "/features" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "/about/company" },
            { label: "Our Mission", href: "/about/company" },
            { label: "Milestones", href: "/milestones" },
            { label: "Contact Us", href: "/contact" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Help Center", href: "/help" },
            { label: "Blog", href: "/blog" },
            { label: "FAQ", href: "/faq" },
            { label: "Changelog", href: "/changelog" },
        ],
    },
]

export default function Footer() {
    return (
        <footer
            className="relative w-full overflow-hidden bg-[#0047BA] rounded-tl-[40px] rounded-tr-[40px] pt-8 px-6"
            style={{ boxShadow: "0px -27px 50px 0px rgba(0,71,186,0.35)" }}
        >
            <div className="mx-auto w-full max-w-[1440px]">
                {/* Top section: logo + tagline + newsletter */}
                <Reveal className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 px-10 py-6">
                    <div className="flex flex-1 items-center gap-6 pr-6">
                        <div className="flex items-center gap-6 max-w-[448px]">
                            <Image
                                src="/Logo/Notiva Logo transparent white.svg"
                                alt=""
                                width={40}
                                height={40}
                                className="shrink-0"
                            />
                            <p className="font-black text-[40px] leading-none text-[#FEFDFD] whitespace-nowrap">
                                Notiva
                            </p>
                        </div>
                        <p className="flex-1 font-normal text-base leading-5 tracking-[0.32px] text-[#FEFDFD] whitespace-pre-wrap">
                            The AI that manages your entire financial life.{"\n"}
                            At Notiva we are building the financial operating system for Europe.
                        </p>
                    </div>

                    <div className="flex flex-col gap-[18px] py-6 max-w-[431px]">
                        <p className="font-semibold text-[22px] leading-7 text-[#FEFDFD]">
                            Stay Updated
                        </p>
                        <p className="font-normal text-base leading-5 tracking-[0.32px] text-[#FEFDFD]">
                            Get the latest updates on our products and innovations.
                        </p>
                        <NewsletterForm source="footer" />
                    </div>
                </Reveal>

                {/* Link columns */}
                <Reveal delay={0.1} className="flex flex-col sm:flex-row items-start justify-between gap-10 px-10 py-[10px]">
                    {linkColumns.map((col) => (
                        <div
                            key={col.title}
                            className="flex flex-col gap-[18px] py-11 text-[#FEFDFD] min-w-[120px]"
                        >
                            <p className="font-semibold text-[22px] leading-7">{col.title}</p>
                            <ul className="flex flex-col gap-2">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="font-normal text-base leading-5 tracking-[0.32px] hover:underline"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </Reveal>
            </div>

            {/* Giant brand wordmark */}
            <div className="flex w-full items-end justify-center px-10 pt-10">
                <p
                    aria-hidden="true"
                    className="font-black uppercase text-center text-[#F0EEE9] leading-[0.85] select-none"
                    style={{ fontSize: "clamp(80px, 16vw, 228px)" }}
                >
                    Notiva
                </p>
            </div>

            {/* Copyright */}
            <p className="relative text-center text-sm font-medium text-[#FEFDFD] py-6">
                &copy; {new Date().getFullYear()} Notiva. Made and owned by{" "}
                <Link
                    href="https://multroid.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    Multroid
                </Link>
                .
            </p>
        </footer>
    )
}
