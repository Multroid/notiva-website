import { NotivaInputField } from "@/components/ui/notiva-input-field"
import NoviAnimation from "@/components/NoviAnimation"

export default function NewsletterCtaSection() {
    return (
        <section className="flex items-center justify-center px-4 py-[168px]">
            <div className="flex w-full max-w-[1440px] flex-1 items-center justify-center gap-20">
                <div className="flex h-[334px] w-[800px] max-w-[800px] shrink-0 flex-col items-start justify-center gap-10 px-8 py-4">
                    <h2 className="w-full font-bold text-[44px] leading-[48px] text-[#0047BA]">
                        Get smarter about your money. Every week.
                    </h2>

                    <div className="flex w-full min-w-[400px] flex-col items-start justify-center">
                        <p className="w-full font-normal text-base leading-5 tracking-[0.32px] text-[#101113]">
                            German tax tips, savings hacks, and product updates - delivered free.
                        </p>
                        <p className="w-full font-normal text-base leading-5 tracking-[0.32px] text-[#101113]">
                            &nbsp;
                        </p>
                        <p className="w-full font-normal text-base leading-5 tracking-[0.32px] text-[#101113]">
                            Subscribe and get our free guide:&nbsp; 10 Tax Deductions Every German Freelancer Misses
                        </p>
                    </div>

                    <NotivaInputField />
                </div>

                <div className="relative size-[334px] shrink-0">
                    <NoviAnimation />
                </div>
            </div>
        </section>
    )
}
