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
            <HeroSection />
            <MeetNoviSection />
            <FeaturesGridSection />
            <HowNotivaWorksSection />
            <ComparisonSection />
            <PricingSection />
            <NewsletterSection />
            <Footer />
        </>
    )
}
