'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { getMainAppRegisterUrl } from '@/lib/app-url'
import Iridescence from '@/components/Iridescence'

export default function HeroSection() {
    return (
        <section className="relative px-4 md:px-6 py-4 md:py-6">
            {/* Iridescence Background Container - Contains everything and clips content */}
            <div 
                className="relative w-full rounded-[2.5rem] overflow-hidden"
                style={{
                    boxShadow: '0px 0px 18.5px 4px rgba(0, 71, 186, 0.5)',
                }}
            >
                {/* Iridescence layer */}
                <div className="absolute inset-0 z-0">
                    <Iridescence 
                        color={[0.2, 0.4, 1]} 
                        mouseReact={false} 
                        amplitude={8} 
                        speed={0.6} 
                    />
                </div>
                
                {/* Inner glow overlay */}
                <div 
                    className="absolute inset-0 z-[1] pointer-events-none rounded-[2.5rem]"
                    style={{
                        boxShadow: 'inset 0px 0px 1.1px 1px #0bf, inset 0px 0px 40px 0px #0047ba',
                    }}
                />

                {/* Content Container */}
                <div className="relative z-10 w-full flex flex-col items-center text-center pt-16 md:pt-24 lg:pt-28 pb-8 gap-[72px]">
                    {/* Text Content */}
                    <div className="flex flex-col items-center gap-[45px] px-4 md:px-20 max-w-5xl mx-auto">
                        {/* Headline */}
                        <h1 
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-montserrat font-black leading-[1.2] lg:leading-[86.4px] text-center"
                            style={{ color: 'var(--multroid-white, #F0EEE9)' }}
                        >
                            Your AI financial manager
                            <br />
                            powered by your inbox
                        </h1>

                        {/* Body copy */}
                        <p 
                            className="text-base sm:text-lg md:text-[18px] font-montserrat font-normal max-w-[800px] leading-relaxed md:leading-[29.25px] text-center"
                            style={{ color: 'var(--multroid-white, #F0EEE9)' }}
                        >
                            Notiva securely connects to your email and turns receipts, invoices, and subscription 
                            renewals into a clean financial timeline — with reminders, insights, and an AI assistant 
                            that explains everything.
                        </p>

                        {/* CTA Button */}
                        <a
                            href={getMainAppRegisterUrl()}
                            className="notiva-btn notiva-btn-cta"
                            style={{
                                boxShadow: '0px 0px 18px 0px rgba(236, 105, 65, 0.6)',
                            }}
                        >
                            <span className="notiva-btn-cta-text">Let AI track my deadlines</span>
                            <span className="notiva-btn-cta-arrow">
                                <ArrowRight />
                            </span>
                        </a>
                    </div>

                    {/* Dashboard Preview with Frosted Glass Container */}
                    <div className="w-full max-w-[978px] mx-auto px-4 md:px-6">
                        <div 
                            className="relative rounded-2xl overflow-hidden p-6"
                            style={{
                                background: 'rgba(0, 0, 0, 0.3)',
                                backdropFilter: 'blur(7.5px)',
                                boxShadow: 'inset 0px 0px 5px 0px #7dafff',
                            }}
                        >
                            <div className="relative w-full rounded-3xl overflow-hidden">
                                <Image
                                    src="/Dashboard-screenshot-example.png"
                                    alt="Notiva Dashboard - Track your subscriptions and deadlines"
                                    width={930}
                                    height={540}
                                    className="w-full h-auto"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
