import Image from 'next/image'
import { getMainAppRegisterUrl } from '@/lib/app-url'
import { NotivaButtonLink } from '@/components/ui/notiva-button'

function SeparatorLine() {
    return (
        <div className="flex items-center justify-center p-[4px]">
            <div className="w-[2px] h-[16px] bg-[#0047BA]" />
        </div>
    )
}

export default function HeroSection() {
    return (
        <section className="relative p-[16px]">
            {/* Main Container */}
            <div className="relative w-full max-w-[1440px] mx-auto rounded-[40px] overflow-visible pt-[100px] pb-[29px] px-[48px] flex flex-col items-center gap-[72px]">
                {/* Hero Header */}
                <div className="flex flex-col items-start gap-[24px] w-full px-4 md:px-[80px]">
                    {/* Badge */}
                    <div className="bg-[#FEFDFD] border-2 border-[#B0C6EA] rounded-[12px] px-[16px] py-[8px] overflow-hidden">
                        <p className="text-[12px] font-normal leading-[18px] text-[#0033A1] text-center">
                            AI-native financial management
                        </p>
                    </div>

                    {/* Content - Horizontal layout */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-[45px] w-full">
                        {/* Left - Headline */}
                        <div className="flex-shrink-0 w-full md:w-[698px]">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-black leading-[1.2] lg:leading-[86px] capitalize text-[#0047BA]">
                                Your AI{' '}
                                <br />
                                Financial Friend
                            </h1>
                        </div>

                        {/* Right - Description */}
                        <div className="flex-1 flex items-end">
                            <p className="text-base md:text-[20px] font-normal leading-[25px] text-[#0047BA] max-w-[800px]">
                                Your accounts, invoices, subscriptions, and taxes — all in one place.{' '}
                                Novi reads the full picture and keeps you one step ahead.
                            </p>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex items-center justify-center gap-[16px] w-full px-[16px] py-[8px] overflow-hidden">
                        <span className="text-[12px] font-normal leading-[18px] text-[#0047BA] text-center whitespace-nowrap">
                            GDPR compliant by design
                        </span>
                        <SeparatorLine />
                        <span className="text-[12px] font-normal leading-[18px] text-[#0047BA] text-center whitespace-nowrap">
                            AES-256 encryption
                        </span>
                        <SeparatorLine />
                        <span className="text-[12px] font-normal leading-[18px] text-[#0047BA] text-center whitespace-nowrap">
                            Data hosted in Germany
                        </span>
                        <SeparatorLine />
                        <span className="text-[12px] font-normal leading-[18px] text-[#0047BA] text-center whitespace-nowrap">
                            Zero data selling
                        </span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-[24px]">
                    <NotivaButtonLink
                        href={getMainAppRegisterUrl()}
                        variant="primary"
                        size="lg"
                    >
                        Start for free
                    </NotivaButtonLink>
                    <NotivaButtonLink
                        href="#novi-section"
                        variant="secondary"
                        size="lg"
                    >
                        See Novi in action
                    </NotivaButtonLink>
                </div>

                {/* Screenshot Area */}
                <div className="relative w-full flex justify-center">
                    {/* Dashboard Preview Card */}
                    <div
                        className="rounded-[12px] overflow-hidden p-[24px]"
                        style={{
                            background: 'rgba(189, 207, 234, 0.3)',
                            border: '3px solid #B0C6EA',
                        }}
                    >
                        {/* Browser Chrome */}
                        <div className="bg-[#B0C6EA] border-2 border-[#0047BA] rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[12px] rounded-br-[12px] overflow-hidden">
                            {/* Browser Top Bar */}
                            <div className="bg-[#B0C6EA] flex items-center gap-[10px] px-[24px] py-[8px] rounded-[16px]">
                                {/* Traffic Light Buttons */}
                                <div className="flex items-center gap-[6px] w-[52px]">
                                    <div className="w-[12px] h-[12px] rounded-full bg-[#F32735]" />
                                    <div className="w-[12px] h-[12px] rounded-full bg-[#FFE800]" />
                                    <div className="w-[12px] h-[12px] rounded-full bg-[#70D44B]" />
                                </div>
                                {/* URL Bar */}
                                <div className="flex-1 flex items-center gap-[10px] bg-[#D9E3F5] border border-[#0047BA] rounded-[8px] px-[16px] py-[8px] overflow-hidden">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                        <path d="M10.667 6.667V5.333A2.667 2.667 0 0 0 8 2.667a2.667 2.667 0 0 0-2.667 2.666v1.334M8 9.667v1.666M5.333 6.667h5.334c.736 0 1.333.597 1.333 1.333v4c0 .736-.597 1.333-1.333 1.333H5.333A1.333 1.333 0 0 1 4 12V8c0-.736.597-1.333 1.333-1.333Z" stroke="#0047BA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="text-[12px] font-normal leading-[18px] text-[#0047BA] text-center whitespace-nowrap">
                                        https://app.notiva.de/Home
                                    </span>
                                </div>
                            </div>
                            {/* Screenshot */}
                            <Image
                                src="/Main Page.svg"
                                alt="Notiva Dashboard - Track your subscriptions and deadlines"
                                width={930}
                                height={607}
                                className="w-full h-auto block"
                                priority
                            />
                        </div>
                    </div>

                    {/* iPhone Screenshot - overlapping right, bottom-aligned with dashboard */}
                    <div className="hidden lg:block absolute right-[-60px] bottom-0 w-[380px] h-[90%]">
                        <Image
                            src="/Iphone-notiva-home-screenshot.svg"
                            alt="Notiva Mobile App"
                            width={302}
                            height={620}
                            className="w-full h-full object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
