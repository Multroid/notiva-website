import HeroSection from '@/components/HeroSection'
import BoldMessageSection from '@/components/BoldMessageSection'
import BuiltForBigSection from '@/components/BuiltForBigSection'
import FeaturesSection from '@/components/FeaturesSection'
import HowNotivaWorksSection from '@/components/HowNotivaWorksSection'
import ComparisonSection from '@/components/ComparisonSection'
import PricingSection from '@/components/PricingSection'
import NewsletterCtaSection from '@/components/NewsletterCtaSection'
import Footer from '@/components/Footer'

export default function Home() {
    return (
        <>
            <main>
                <HeroSection />
                <BoldMessageSection />
                <BuiltForBigSection />
                <FeaturesSection />
                <HowNotivaWorksSection />
                <ComparisonSection />
                <PricingSection />
                <NewsletterCtaSection />
            </main>
            <Footer />
        </>
    )
}
