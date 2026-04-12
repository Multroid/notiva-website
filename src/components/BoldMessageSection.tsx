import Link from "next/link"
import { Button } from "@/components/ui/button"

const lines: { dark: string; grey: string }[][] = [
    [
        { dark: "", grey: "Grow " },
        { dark: "✨ your money", grey: "" },
    ],
    [
        { dark: "smarter 📈 ", grey: "" },
        { dark: "", grey: "than inflation" },
    ],
    [
        { dark: "", grey: "ever " },
        { dark: "💸 could steal", grey: "" },
    ],
    [
        { dark: "Built for people ", grey: "" },
        { dark: "", grey: "with ambition" },
    ],
    [
        { dark: "", grey: "and zero time " },
        { dark: "to watch charts.", grey: "" },
    ],
]

export default function BoldMessageSection() {
    return (
        <section className="flex flex-col items-center justify-center px-4 py-[120px]">
            <div className="flex w-full flex-col items-center gap-20">
                <div className="flex w-full flex-col items-center gap-2 text-center font-bold text-[46px] leading-[69px]">
                    {lines.map((line, i) => (
                        <p key={i}>
                            {line.map((part, j) => (
                                <span
                                    key={j}
                                    className={part.dark ? "text-[#333333]" : "text-[#A4A4A4]"}
                                >
                                    {part.dark || part.grey}
                                </span>
                            ))}
                        </p>
                    ))}
                </div>

                <Button asChild variant="primary">
                    <Link href="/register">Start Growing</Link>
                </Button>
            </div>
        </section>
    )
}
