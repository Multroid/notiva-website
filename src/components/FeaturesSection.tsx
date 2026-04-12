import Link from "next/link"
import {
    ChartPieIcon,
    FaceSmileIcon,
    LockClosedIcon,
    CalendarIcon,
    SparklesIcon,
    ChartBarSquareIcon,
    CreditCardIcon,
} from "@heroicons/react/24/solid"
import { Button } from "@/components/ui/button"

type FeatureContentProps = {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    stat?: string
    statLabel: string
}

function FeatureContent({ icon: Icon, title, description, stat, statLabel }: FeatureContentProps) {
    return (
        <div className="flex h-full flex-1 flex-col items-start justify-center gap-4 p-2">
            <Icon className="size-10 text-[#0047BA]" />
            <h3 className="font-bold text-[22px] leading-[33px] text-[#333333]">{title}</h3>
            <p className="font-medium text-base leading-6 text-[#777777]">{description}</p>
            <div className="flex w-full items-center gap-[10px] border-t border-[#BBBBBB] py-4">
                {stat && (
                    <span className="font-bold text-[22px] leading-[33px] text-[#0047BA] whitespace-nowrap">
                        {stat}
                    </span>
                )}
                <span className="font-medium text-base leading-6 text-[#777777] whitespace-nowrap">
                    {statLabel}
                </span>
            </div>
        </div>
    )
}

function ImageSlot({ aspect = "9/16", className = "" }: { aspect?: string; className?: string }) {
    return (
        <div className="flex h-full items-center justify-center p-[10px]">
            <div
                className={`relative h-full rounded-lg bg-gradient-to-br from-[#0047BA]/30 to-[#0047BA]/10 shadow-[0px_4px_15px_0px_rgba(0,0,0,0.4)] ${className}`}
                style={{ aspectRatio: aspect }}
                aria-hidden="true"
            />
        </div>
    )
}

export default function FeaturesSection() {
    return (
        <section className="flex flex-col items-center justify-center px-4 py-[168px]">
            <div className="flex w-full max-w-[1440px] flex-col items-center gap-20">
                {/* Header */}
                <div className="flex w-full flex-col items-center gap-12 px-[200px] text-center">
                    <h2 className="font-bold text-[44px] leading-[48px] text-[#0047BA] whitespace-nowrap">
                        Everything you need. One AI.
                    </h2>
                    <p className="font-medium text-lg leading-[27px] text-[#001238]">
                        Notiva combines open banking, AI-native intelligence, and German financial
                        expertise — so your money works while you focus on everything else.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid w-full grid-cols-4 gap-6">
                    {/* Row 1 */}
                    {/* AI Financial Advisor — cols 1-2 */}
                    <div className="col-span-2 flex h-[354px] items-center justify-center gap-4 rounded-2xl bg-[rgba(0,71,186,0.1)] p-4">
                        <ImageSlot className="w-[212px]" />
                        <FeatureContent
                            icon={FaceSmileIcon}
                            title="AI Financial Advisor"
                            description="Daily financial briefs, intelligent cashflow forecasting, and scenario planning. Novi thinks about your money 24/7 so you don't have to."
                            stat="24/7"
                            statLabel="financial intelligence"
                        />
                    </div>

                    {/* Auto Tax Detection — cols 3-4 */}
                    <div className="col-span-2 flex h-[354px] items-center justify-center gap-4 rounded-2xl bg-[rgba(0,71,186,0.1)] p-4">
                        <ImageSlot className="w-[212px]" />
                        <FeatureContent
                            icon={ChartPieIcon}
                            title="Auto Tax Detection"
                            description="Novi scans your transactions, invoices, and emails to find deductions you're missing. No manual categorization needed."
                            stat="€1,172"
                            statLabel="avg. refund recovered"
                        />
                    </div>

                    {/* Row 2 */}
                    {/* Provider Switching — cols 1-2 */}
                    <div className="col-span-2 flex h-[339px] items-center justify-center gap-4 rounded-2xl bg-[rgba(0,71,186,0.1)] p-4">
                        <FeatureContent
                            icon={LockClosedIcon}
                            title="Provider Switching"
                            description="Electricity, internet, telecom — Novi monitors contract end dates and finds cheaper providers before you even think about it."
                            stat="€264+"
                            statLabel="saved per year"
                        />
                        <ImageSlot className="w-[212px]" />
                    </div>

                    {/* Professional Marketplace — cols 3-4 */}
                    <div className="col-span-2 flex h-[339px] items-center justify-center gap-4 rounded-2xl bg-[rgba(0,71,186,0.1)] p-4">
                        <FeatureContent
                            icon={CalendarIcon}
                            title="Professional Marketplace"
                            description="Complex case? Book a vetted Steuerberater, insurance broker, or financial advisor directly in the app. AI first, humans when it matters."
                            statLabel="coming Q1 2027"
                        />
                        <ImageSlot aspect="2620/2716" className="w-[212px]" />
                    </div>

                    {/* Row 3 */}
                    {/* Credit Score & Schufa — col 1 */}
                    <div className="col-span-1 flex flex-col items-center justify-center rounded-2xl bg-[rgba(0,71,186,0.1)] p-4">
                        <div className="flex w-full flex-col items-start gap-4 p-2">
                            <CreditCardIcon className="size-10 text-[#0047BA]" />
                            <h3 className="font-bold text-[22px] leading-[33px] text-[#333333]">
                                Credit Score &amp; Schufa
                            </h3>
                            <p className="font-medium text-base leading-6 text-[#777777]">
                                Monitor your Schufa score, understand what impacts it, and get actionable
                                guidance to improve your creditworthiness over time.
                            </p>
                            <div className="flex w-full items-center gap-[10px] border-t border-[#BBBBBB] py-4">
                                <span className="font-medium text-base leading-6 text-[#777777] whitespace-nowrap">
                                    achieve better score
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Subscription Management — cols 2-3 */}
                    <div className="col-span-2 flex items-center justify-center gap-4 rounded-2xl bg-[rgba(0,71,186,0.1)] p-4">
                        <ImageSlot aspect="16/9" className="h-[144px] w-[212px]" />
                        <FeatureContent
                            icon={ChartBarSquareIcon}
                            title="Subscription Management"
                            description="Detect every recurring charge. Flag what you haven't used in 90+ days. Optimize or cancel — in seconds."
                            stat="€200+"
                            statLabel="saved per year"
                        />
                    </div>

                    {/* Insurance Optimization — col 4 */}
                    <div className="col-span-1 flex flex-col items-center justify-center rounded-2xl bg-[rgba(0,71,186,0.1)] p-4">
                        <div className="flex w-full flex-col items-start gap-4 p-2">
                            <SparklesIcon className="size-10 text-[#0047BA]" />
                            <h3 className="font-bold text-[22px] leading-[33px] text-[#333333]">
                                Insurance Optimization
                            </h3>
                            <p className="font-medium text-base leading-6 text-[#777777]">
                                Compare your current insurance across 300+ providers. Same coverage,
                                better price. Novi finds what you&rsquo;re overpaying — automatically.
                            </p>
                            <div className="flex w-full items-center gap-[10px] border-t border-[#BBBBBB] py-4">
                                <span className="font-bold text-[22px] leading-[33px] text-[#0047BA] whitespace-nowrap">
                                    €338+
                                </span>
                                <span className="font-medium text-base leading-6 text-[#777777] whitespace-nowrap">
                                    saved per year
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA buttons */}
                <div className="flex items-center gap-4">
                    <Button asChild variant="primary">
                        <Link href="/register">Get Started for free</Link>
                    </Button>
                    <Button asChild variant="secondary">
                        <Link href="/features">Check out all features</Link>
                    </Button>
                </div>

                {/* Disclaimer */}
                <p className="text-center font-medium text-base leading-6 text-black">
                    Advisory only — Novi never moves money or executes without your explicit
                    approval. Savings based on average German household research data.
                </p>
            </div>
        </section>
    )
}
