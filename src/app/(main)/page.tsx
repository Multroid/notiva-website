import HeroSection from '@/components/HeroSection'
import MeetNoviSection from '@/components/MeetNoviSection'
import FeaturesGridSection from '@/components/FeaturesGridSection'
import HowNotivaWorksSection from '@/components/HowNotivaWorksSection'
import ComparisonSection from '@/components/ComparisonSection'
import PricingSection from '@/components/PricingSection'
import NewsletterSection from '@/components/NewsletterSection'
import Footer from '@/components/Footer'

export default function Home() {
    return (
        <>
            <div
                style={{
                    background:
                        'radial-gradient(ellipse at 50% 50%, rgba(0,71,186,0.8) 0%, rgba(128,163,221,0.4) 25%, rgba(255,255,255,0) 55%)',
                }}
            >
                <HeroSection />
                <MeetNoviSection />
            </div>
            <FeaturesGridSection />
            <HowNotivaWorksSection />
            <ComparisonSection />
            <PricingSection />
            <NewsletterSection />
            <Footer />
        </>
    )
}
