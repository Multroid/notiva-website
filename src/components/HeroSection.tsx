import Link from "next/link"
import { Button } from "@/components/ui/button"
import NoviAnimation from "@/components/NoviAnimation"

export default function HeroSection() {
    return (
        <section className="flex flex-col items-center gap-14 px-4 py-[168px]">
            <div className="flex w-full max-w-[1440px] flex-col items-center justify-center gap-10 px-6">
                <div className="flex w-full flex-col items-center justify-center gap-8">
                    <h1 className="w-full text-center font-bold text-[68px] leading-[102px] text-[#333333]">
                        Live your life. <span className="text-[#3D87FF]">Novi</span>
                        <br />
                        handles the rest.
                    </h1>
                    <p className="w-full max-w-[600px] text-center font-medium text-lg leading-[27px] text-[#333333]">
                        Every bill, every deadline, every price comparison. Put it down.
                        We can handle the boring stuff now.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <Button asChild variant="primary">
                        <Link href="/register">Join the waitlist</Link>
                    </Button>
                    <Button asChild variant="secondaryClean">
                        <Link href="#demo">See Notiva in action</Link>
                    </Button>
                </div>
            </div>

            <div className="relative size-[771px] max-w-full">
                <NoviAnimation />
            </div>
        </section>
    )
}
