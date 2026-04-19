"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Reveal, StaggerGroup, staggerItemVariants } from "@/components/ui/reveal"

type Plan = {
    id: string
    name: string
    price: { monthly: string; yearly: string }
    audience: string
    features: string[]
    cta: string
    variant: "primary" | "secondary"
    popular?: boolean
}

const plans: Plan[] = [
    {
        id: "plus",
        name: "Plus",
        price: { monthly: "€4.99", yearly: "€3.99" },
        audience: "For Individuals",
        features: [
            "AI Financial Agent \u201C Novi \u201D",
            "Email and bank sync",
            "Document Intelligence",
            "Smart financial planning",
            "Export reports to PDF/CSV",
        ],
        cta: "Get Started with Plus",
        variant: "secondary",
    },
    {
        id: "pro",
        name: "Pro",
        price: { monthly: "€7.99", yearly: "€6.39" },
        audience: "For Individuals & Couples",
        features: [
            "Everything in Plus",
            "Extra partner account",
            "Tax Intelligence",
            "Subscription & Provider Intelligence",
            "Advanced Financial Analysis",
        ],
        cta: "Get Started with Pro",
        variant: "primary",
        popular: true,
    },
    {
        id: "family",
        name: "Family",
        price: { monthly: "€12.99", yearly: "€10.39" },
        audience: "For Households",
        features: [
            "Everything in Pro",
            "Up to 6 family members",
            "Shared finances & contracts management",
            "Collaborative Financial planning",
            "Priority support access",
        ],
        cta: "Get Started with Family",
        variant: "secondary",
    },
]

type Billing = "monthly" | "yearly"

function BillingToggle({
    value,
    onChange,
}: {
    value: Billing
    onChange: (v: Billing) => void
}) {
    return (
        <div
            role="tablist"
            className="flex items-center justify-center gap-0 rounded-[32px] border-2 border-[rgba(0,71,186,0.25)] p-2"
        >
            <button
                type="button"
                role="tab"
                aria-selected={value === "monthly"}
                onClick={() => onChange("monthly")}
                className={`appearance-none flex w-[100px] items-center justify-center rounded-3xl px-4 py-2 font-semibold text-base leading-6 transition-colors outline-none focus:outline-none ${
                    value === "monthly"
                        ? "bg-[#0047BA] text-white"
                        : "text-[rgba(0,71,186,0.25)]"
                }`}
            >
                Monthly
            </button>
            <button
                type="button"
                role="tab"
                aria-selected={value === "yearly"}
                onClick={() => onChange("yearly")}
                className={`appearance-none flex items-end justify-center gap-[10px] rounded-3xl px-4 py-2 transition-colors outline-none focus:outline-none ${
                    value === "yearly"
                        ? "bg-[#0047BA] text-white"
                        : ""
                }`}
            >
                <span
                    className={`font-semibold text-base leading-6 ${
                        value === "yearly" ? "text-white" : "text-[rgba(0,71,186,0.25)]"
                    }`}
                >
                    Yearly
                </span>
                <span className="font-medium text-xs leading-[18px] text-[#1FC16B]">
                    20% Discount
                </span>
            </button>
        </div>
    )
}

function PriceCard({ plan, billing }: { plan: Plan; billing: Billing }) {
    return (
        <motion.div
            variants={staggerItemVariants}
            className="flex w-[402px] shrink-0 flex-col gap-6 overflow-hidden rounded-2xl bg-white p-8 shadow-[0px_0px_20px_-1px_rgba(0,71,186,0.2)]"
        >
            {/* Heading */}
            <div className="flex w-full items-center gap-4">
                <div className="flex flex-1 flex-col justify-center gap-6">
                    <h3 className="font-bold text-[26px] leading-[39px] text-[#333333]">
                        {plan.name}
                    </h3>
                    <div className="flex items-center gap-[10px]">
                        <span className="font-bold text-[56px] leading-[84px] text-[#0047BA] whitespace-nowrap">
                            {plan.price[billing]}
                        </span>
                        <span className="font-medium text-lg leading-[27px] text-[#8E8E8E]">
                            /mo
                        </span>
                    </div>
                </div>
                {plan.popular && (
                    <div className="flex items-start self-stretch">
                        <span className="rounded-xl bg-[#F05627] px-4 py-2 font-bold text-base leading-6 text-[#F0EEE9]">
                            Popular
                        </span>
                    </div>
                )}
            </div>

            {/* Horizontal divider */}
            <div className="h-px w-full border-t border-[#F0EEE9]" />

            {/* Context */}
            <div className="flex w-full flex-col gap-12">
                {/* Plan features */}
                <div className="flex w-full flex-col gap-4">
                    <p className="font-medium text-base leading-6 text-[#8E8E8E]">
                        {plan.audience}
                    </p>
                    <ul className="flex w-full flex-col gap-4">
                        {plan.features.map((feature) => (
                            <li
                                key={feature}
                                className="flex w-full items-center gap-3"
                            >
                                <CheckIcon className="size-5 shrink-0 text-[#1FC16B]" />
                                <span className="font-medium text-sm leading-[21px] text-[#101113]">
                                    {feature}
                                </span>
                            </li>
                        ))}
                        <li className="flex w-full items-center justify-center gap-2 pt-1">
                            <span className="font-medium text-sm leading-[21px] text-[#8E8E8E]">
                                Explore more Features
                            </span>
                            <ArrowRightIcon className="size-[14px] text-[#8E8E8E]" />
                        </li>
                    </ul>
                </div>

                {/* CTA */}
                <Button asChild variant={plan.variant} fullWidth>
                    <Link href="/register">{plan.cta}</Link>
                </Button>
            </div>
        </motion.div>
    )
}

export default function PricingSection() {
    const [billing, setBilling] = useState<Billing>("monthly")

    return (
        <section className="flex flex-col items-center justify-center gap-14 px-4 py-20">
            {/* Heading */}
            <Reveal className="flex flex-col items-center justify-center gap-4 text-center">
                <h2 className="font-bold text-[56px] leading-[84px] text-[#333333]">
                    Simple pricing
                </h2>
                <p className="font-medium text-lg leading-[27px] text-[#8E8E8E]">
                    Choose what works for you
                </p>
            </Reveal>

            {/* Billing toggle */}
            <Reveal delay={0.1}>
                <BillingToggle value={billing} onChange={setBilling} />
            </Reveal>

            {/* Plans container */}
            <div className="flex w-full flex-col items-center gap-14">
                <StaggerGroup
                    stagger={0.12}
                    className="flex max-w-full items-stretch justify-center gap-6 overflow-x-auto px-14 py-8"
                >
                    {plans.map((plan) => (
                        <PriceCard key={plan.id} plan={plan} billing={billing} />
                    ))}
                </StaggerGroup>

                <Reveal as="div">
                    <p className="font-medium text-base leading-6 text-[#F05627] text-center">
                        All plans include a 7-day free trial.
                    </p>
                </Reveal>
            </div>
        </section>
    )
}
