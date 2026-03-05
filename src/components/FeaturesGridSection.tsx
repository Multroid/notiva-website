import {
  Lock,
  Smile,
  Sparkles,
  PieChart,
  BarChart2,
  Calendar,
  RefreshCw,
  DollarSign,
} from 'lucide-react'
import { NotivaButtonLink } from '@/components/ui/notiva-button'
import { getMainAppRegisterUrl } from '@/lib/app-url'

interface FeatureCard {
  icon: React.ReactNode
  title: string
  body: string
  colSpan?: 2
}

const features: FeatureCard[][] = [
  // Row 1
  [
    {
      icon: <Lock className="size-[40px] text-[#0047BA]" />,
      title: 'Private by default. Secure by design.',
      body: 'Read-only connections, encrypted storage, and full transparency over what\'s synced. Your data is never exposed.',
    },
    {
      icon: <Smile className="size-[40px] text-[#0047BA]" />,
      title: 'Your money, explained in plain language.',
      body: 'Novi surfaces insights, flags issues, and answers financial questions — before you even think to ask.',
      colSpan: 2,
    },
    {
      icon: <Sparkles className="size-[40px] text-[#0047BA]" />,
      title: 'Proactive, not reactive.',
      body: 'Novi watches your bills, subscriptions, and cash flow 24/7 — alerting you days before a problem hits.',
    },
  ],
  // Row 2
  [
    {
      icon: <PieChart className="size-[40px] text-[#0047BA]" />,
      title: 'German tax, handled automatically.',
      body: 'VAT tracking, Steuerberater-ready exports, and freelance categorization — built natively, not bolted on.',
    },
    {
      icon: <BarChart2 className="size-[40px] text-[#0047BA]" />,
      title: 'Track investments across accounts.',
      body: 'Novi aggregates your financial data, providing insights on all your portfolios and accounts in one view.',
    },
    {
      icon: <Calendar className="size-[40px] text-[#0047BA]" />,
      title: 'A clear timeline of your spending.',
      body: 'Grouped by merchant and category so you can spot waste, track patterns, and take action — fast.',
      colSpan: 2,
    },
  ],
  // Row 3
  [
    {
      icon: <RefreshCw className="size-[40px] text-[#0047BA]" />,
      title: 'Kill subscriptions you forgot about.',
      body: 'Novi detects every recurring charge and flags anything you haven\'t used in 90+ days. Cancel in seconds.',
    },
    {
      icon: <DollarSign className="size-[40px] text-[#0047BA]" />,
      title: 'Optimize subscriptions and reduce overspending.',
      body: 'Novi compares your current subscriptions with better alternatives, ensuring you save money without losing value.',
    },
  ],
]

function FeatureCardComponent({ card }: { card: FeatureCard }) {
  const isWide = card.colSpan === 2

  return (
    <div
      className={`bg-[#FEFDFD] border-2 border-[#0047BA] rounded-[16px] p-[16px] flex ${
        isWide ? 'col-span-1 md:col-span-2 flex-row gap-[16px]' : 'flex-col gap-[12px]'
      }`}
      style={{
        boxShadow: '0px 4px 15px 0px rgba(0,0,0,0.2)',
      }}
    >
      {isWide && (
        <div className="hidden md:flex w-[200px] flex-shrink-0 bg-[#B0C6EA] rounded-[16px] items-center justify-center">
          <div className="text-[#0047BA] text-[14px] font-medium">App Preview</div>
        </div>
      )}
      <div className="flex flex-col gap-[12px] flex-1">
        {card.icon}
        <h3 className="text-[22px] font-semibold leading-[28px] text-[#101113]">
          {card.title}
        </h3>
        <p className="text-[16px] font-normal leading-[22px] text-[#898C8E]">
          {card.body}
        </p>
      </div>
    </div>
  )
}

export default function FeaturesGridSection() {
  return (
    <section className="py-[80px] px-[16px]" style={{ background: 'linear-gradient(to bottom, #d4e4ff, rgba(176,198,234,0))' }}>
      <div className="max-w-[1360px] mx-auto flex flex-col items-center gap-[60px]">
        {/* Header */}
        <div className="text-center max-w-[900px] px-4 flex flex-col gap-[24px]">
          <h2 className="text-[44px] font-bold leading-[48px] text-[#0047BA]">
            The Features you will love...
          </h2>
          <p className="text-[20px] font-normal leading-[25px] text-[#001238]">
            Notiva combines open banking, AI-native intelligence, and German financial expertise — so your money works while you focus on everything else.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="w-full flex flex-col gap-[24px]">
          {features.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-1 md:grid-cols-4 gap-[24px]"
            >
              {row.map((card, cardIndex) => (
                <FeatureCardComponent key={cardIndex} card={card} />
              ))}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-wrap items-center justify-center gap-[16px]">
          <NotivaButtonLink
            href={getMainAppRegisterUrl()}
            variant="primary"
            size="lg"
          >
            Get Started
          </NotivaButtonLink>
          <NotivaButtonLink
            href="#how-it-works"
            variant="secondary"
            size="lg"
          >
            See how NOVI works
          </NotivaButtonLink>
        </div>
      </div>
    </section>
  )
}
