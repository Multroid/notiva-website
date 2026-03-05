import Image from 'next/image'
import { getMainAppRegisterUrl } from '@/lib/app-url'
import { NotivaButtonLink } from '@/components/ui/notiva-button'

const trustBadges = [
    'GDPR compliant by design',
    'AES-256 encryption',
    'Data hosted in Germany',
    'Zero data selling',
]

export default function HeroSection() {
    return (
        <section className="relative px-[16px] lg:px-[48px]">
            {/* Radial gradient behind screenshot area */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse at 50% 70%, rgba(0,71,186,0.8) 0%, rgba(128,163,221,0.4) 20%, rgba(255,255,255,0) 50%)',
                }}
            />

            {/* Main Container */}
            <div className="relative w-full max-w-[1440px] mx-auto rounded-[40px] overflow-visible pt-[60px] xl:pt-[100px] pb-[29px] flex flex-col items-center gap-[40px] xl:gap-[72px]">
                {/* Hero Header */}
                <div className="flex flex-col items-center xl:items-start gap-[16px] xl:gap-[24px] w-full px-0 xl:px-[80px]">
                    {/* Badge */}
                    <div className="bg-[#FEFDFD] border-2 border-[#B0C6EA] rounded-[12px] px-[16px] py-[8px] overflow-hidden">
                        <p className="text-[12px] font-normal leading-[18px] text-[#0033A1] text-center">
                            AI-native financial management
                        </p>
                    </div>

                    {/* Content - Horizontal layout on xl+ */}
                    <div className="flex flex-col xl:flex-row items-start xl:items-center gap-[24px] xl:gap-[45px] w-full">
                        {/* Left - Headline */}
                        <div className="flex-shrink-0 w-full xl:w-[698px]">
                            <h1 className="text-[36px] sm:text-[48px] lg:text-[64px] xl:text-[80px] font-black leading-[1.15] xl:leading-[86px] capitalize text-[#0047BA] text-center xl:text-left">
                                Your AI{' '}
                                <br />
                                Financial Friend
                            </h1>
                        </div>

                        {/* Right - Description */}
                        <div className="flex-1 flex items-end">
                            <p className="text-[16px] xl:text-[20px] font-normal leading-[22px] xl:leading-[25px] text-[#0047BA] max-w-[800px] text-center xl:text-left">
                                Your accounts, invoices, subscriptions, and taxes — all in one place.{' '}
                                Novi reads the full picture and keeps you one step ahead.
                            </p>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="w-full py-[8px]">
                        {/* lg+: all 4 in a row with separators */}
                        <div className="hidden lg:flex items-center justify-center gap-[16px]">
                            {trustBadges.map((badge, i) => (
                                <span key={badge} className="flex items-center gap-[16px]">
                                    {i > 0 && (
                                        <span className="w-[2px] h-[16px] bg-[#0047BA]" />
                                    )}
                                    <span className="text-[12px] font-normal leading-[18px] text-[#0047BA] text-center whitespace-nowrap">
                                        {badge}
                                    </span>
                                </span>
                            ))}
                        </div>
                        {/* <lg: 2x2 grid with separators per row */}
                        <div className="grid lg:hidden grid-cols-1 gap-y-[8px] justify-items-center">
                            {[
                                [trustBadges[0], trustBadges[1]],
                                [trustBadges[2], trustBadges[3]],
                            ].map((row, ri) => (
                                <div key={ri} className="flex items-center justify-center gap-[16px]">
                                    <span className="text-[12px] font-normal leading-[18px] text-[#0047BA] text-center whitespace-nowrap">
                                        {row[0]}
                                    </span>
                                    <span className="w-[2px] h-[16px] bg-[#0047BA]" />
                                    <span className="text-[12px] font-normal leading-[18px] text-[#0047BA] text-center whitespace-nowrap">
                                        {row[1]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-[16px] sm:gap-[24px] w-full sm:w-auto px-4 sm:px-0">
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
                    {/* Mobile only (<640px): iPhone Screenshot */}
                    <div className="sm:hidden flex justify-center">
                        <Image
                            src="/Iphone-notiva-home-screenshot.svg"
                            alt="Notiva Mobile App"
                            width={302}
                            height={620}
                            className="w-[260px] h-auto"
                            priority
                        />
                    </div>

                    {/* sm+ (640px+): Dashboard + iPhone overlay */}
                    <div
                        className="hidden sm:block rounded-[12px] overflow-hidden p-[12px] xl:p-[24px]"
                        style={{
                            background: 'rgba(189, 207, 234, 0.3)',
                            border: '3px solid #B0C6EA',
                        }}
                    >
                        {/* Browser Chrome */}
                        <div className="bg-[#B0C6EA] border-2 border-[#0047BA] rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[12px] rounded-br-[12px] overflow-hidden">
                            {/* Browser Top Bar */}
                            <div className="bg-[#B0C6EA] flex items-center gap-[10px] px-[12px] lg:px-[24px] py-[8px] rounded-[16px]">
                                {/* Traffic Light Buttons */}
                                <div className="flex items-center gap-[6px] w-[52px]">
                                    <div className="w-[12px] h-[12px] rounded-full bg-[#F32735]" />
                                    <div className="w-[12px] h-[12px] rounded-full bg-[#FFE800]" />
                                    <div className="w-[12px] h-[12px] rounded-full bg-[#70D44B]" />
                                </div>
                                {/* URL Bar */}
                                <div className="flex-1 flex items-center gap-[10px] bg-[#D9E3F5] border border-[#0047BA] rounded-[8px] px-[8px] lg:px-[16px] py-[8px] overflow-hidden">
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

                    {/* iPhone Screenshot overlay — visible on sm+, scales at breakpoints */}
                    <div className="hidden sm:block absolute right-[-20px] lg:right-[-40px] xl:right-[-60px] bottom-0 w-[180px] lg:w-[280px] xl:w-[380px] h-[70%] lg:h-[80%] xl:h-[90%]">
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
