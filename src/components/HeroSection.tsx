"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import NoviAnimation from "@/components/NoviAnimation"
import { WaitlistDialog } from "@/components/WaitlistDialog"

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
}

const item = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
}

const headlineContainer = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
}

const syllable = {
    hidden: { opacity: 0, y: -40, filter: "blur(12px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
}

const HEADLINE_PARTS: { text: string; accent?: boolean; breakAfter?: boolean }[] = [
    { text: "Live" },
    { text: "your" },
    { text: "life.", breakAfter: true },
    { text: "Novi", accent: true},
    { text: "handles" },
    { text: "the" },
    { text: "rest." },
]

export default function HeroSection() {
    const [waitlistOpen, setWaitlistOpen] = useState(false)
    return (
        <section className="flex flex-col items-center gap-6 px-4 pt-[84px] pb-[168px]">
            <motion.div
                className="flex w-full max-w-[1440px] flex-col items-center justify-center gap-10 px-6"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <div className="flex w-full flex-col items-center justify-center gap-8">
                    <motion.h1
                        variants={headlineContainer}
                        initial="hidden"
                        animate="show"
                        className="w-full text-center font-bold text-[68px] leading-[102px] tracking-normal text-[#333333]"
                    >
                        {HEADLINE_PARTS.map((part, i) => (
                            <span key={i}>
                                <motion.span
                                    variants={syllable}
                                    className={`inline-block align-baseline whitespace-pre leading-[102px] ${part.accent ? "text-[#3D87FF]" : ""}`}
                                >
                                    {part.breakAfter ? part.text : `${part.text} `}
                                </motion.span>
                                {part.breakAfter ? <br /> : null}
                            </span>
                        ))}
                    </motion.h1>
                    <motion.p
                        variants={item}
                        className="w-full max-w-[600px] text-center font-medium text-lg leading-[27px] text-[#333333]"
                    >
                        Every bill, every deadline, every price comparison. Put it down.
                        We can handle the boring stuff now.
                    </motion.p>
                </div>

                <motion.div variants={item} className="flex items-center gap-4">
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                        <Button variant="primary" onClick={() => setWaitlistOpen(true)}>
                            Join the waitlist
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                        <Button asChild variant="secondaryClean">
                            <Link href="#demo">See Notiva in action</Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                className="relative size-[520px] max-w-full"
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            >
                <NoviAnimation />
            </motion.div>
            <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
        </section>
    )
}
