"use client"

import { useEffect, useRef, useState } from "react"

function FlagDE({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
            <defs>
                <clipPath id="flag-de-clip"><circle cx="8" cy="8" r="8" /></clipPath>
            </defs>
            <g clipPath="url(#flag-de-clip)">
                <rect width="16" height="5.34" y="0" fill="#000000" />
                <rect width="16" height="5.33" y="5.34" fill="#DD0000" />
                <rect width="16" height="5.33" y="10.67" fill="#FFCE00" />
            </g>
        </svg>
    )
}

function FlagGB({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
            <defs>
                <clipPath id="flag-gb-clip"><circle cx="30" cy="30" r="30" /></clipPath>
            </defs>
            <g clipPath="url(#flag-gb-clip)">
                <rect width="60" height="60" fill="#012169" />
                <path d="M0,0 L60,60 M60,0 L0,60" stroke="#FFFFFF" strokeWidth="12" />
                <path d="M0,0 L60,60 M60,0 L0,60" stroke="#C8102E" strokeWidth="6" />
                <path d="M30,0 V60 M0,30 H60" stroke="#FFFFFF" strokeWidth="20" />
                <path d="M30,0 V60 M0,30 H60" stroke="#C8102E" strokeWidth="10" />
            </g>
        </svg>
    )
}

function FlagES({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
            <defs>
                <clipPath id="flag-es-clip"><circle cx="8" cy="8" r="8" /></clipPath>
            </defs>
            <g clipPath="url(#flag-es-clip)">
                <rect width="16" height="4" y="0" fill="#AA151B" />
                <rect width="16" height="8" y="4" fill="#F1BF00" />
                <rect width="16" height="4" y="12" fill="#AA151B" />
            </g>
        </svg>
    )
}

const languages = [
    { code: "de", label: "Deutsch", Flag: FlagDE },
    { code: "en", label: "English", Flag: FlagGB },
    { code: "es", label: "Spanish", Flag: FlagES },
] as const

type LanguageCode = (typeof languages)[number]["code"]

export default function LanguageDropdown() {
    const [open, setOpen] = useState(false)
    const [current, setCurrent] = useState<LanguageCode>("de")
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return
        const onClick = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) setOpen(false)
        }
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false)
        }
        document.addEventListener("mousedown", onClick)
        document.addEventListener("keydown", onKey)
        return () => {
            document.removeEventListener("mousedown", onClick)
            document.removeEventListener("keydown", onKey)
        }
    }, [open])

    const CurrentFlag = languages.find((l) => l.code === current)!.Flag

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label="Select language"
                aria-haspopup="listbox"
                aria-expanded={open}
                className="flex size-6 items-center justify-center rounded-full overflow-hidden"
            >
                <CurrentFlag className="size-6" />
            </button>

            {open && (
                <div
                    role="listbox"
                    className="absolute right-0 top-12 z-50 w-[164px] flex flex-col gap-4 rounded-2xl border-2 border-[#0047BA] bg-white px-8 py-4 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
                >
                    {languages.map(({ code, label, Flag }) => (
                        <button
                            key={code}
                            type="button"
                            role="option"
                            aria-selected={current === code}
                            onClick={() => {
                                setCurrent(code)
                                setOpen(false)
                            }}
                            className="flex w-full items-center gap-6 text-left"
                        >
                            <Flag className="size-4 shrink-0" />
                            <span className="font-medium text-sm leading-[21px] text-[#364153] whitespace-nowrap">
                                {label}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
