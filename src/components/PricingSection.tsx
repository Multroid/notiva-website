import { Check } from 'lucide-react'
import { NotivaButtonLink } from '@/components/ui/notiva-button'
import { getMainAppRegisterUrl } from '@/lib/app-url'

const plans = [
  {
    name: 'Pro',
    price: '3.99',
    yearlyPrice: '49',
    savePercent: 32,
    category: 'FOR INDIVIDUALS',
    popular: true,
    buttonVariant: 'primary' as const,
    buttonText: 'Get Started with Pro',
    features: [
      'Track unlimited subscriptions',
      'Email and bank sync',
      'Document scanning & deadline extraction',
      'Smart reminders & notifications',
      'Export reports to PDF/CSV',
    ],
  },
  {
    name: 'Family',
    price: '11.99',
    yearlyPrice: '99',
    savePercent: 31,
    category: 'FOR HOUSEHOLDS',
    popular: false,
    buttonVariant: 'primaryDark' as const,
    buttonText: 'Get Started with Family',
    features: [
      'Everything in Pro',
      'Up to 6 family members',
      'Shared subscription tracking',
      'Family spending insights',
      'Collaborative document management',
      'Priority support access',
    ],
  },
]

export default function PricingSection() {
  return (
    <section
      className="py-[124px] px-[16px] md:px-[190px]"
      style={{
        borderTop: '1px dashed rgba(0,71,186,0.5)',
        borderBottom: '1px dashed rgba(0,71,186,0.5)',
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-[48px]">
        {/* Header */}
        <div className="text-center flex flex-col gap-[16px]">
          <span className="text-[14px] font-normal uppercase text-[#54545E]" style={{ letterSpacing: '0.7px' }}>
            PLANS
          </span>
          <h2 className="text-[60px] font-semibold text-[#09090B]" style={{ letterSpacing: '-0.5px', lineHeight: '60px' }}>
            Simple pricing
          </h2>
          <p className="text-[20px] font-normal text-[#54545E]">
            Choose what works for you
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-[24px] w-full">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative flex flex-col p-[33px] bg-[#FEFDFD] border-2 border-[#B0C6EA] rounded-[16px]"
              style={{
                boxShadow: '0px 0px 19.6px -1px rgba(0,71,186,0.2)',
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-[24px] right-[24px]">
                  <span className="bg-[#F05627] rounded-[16px] px-[16px] py-[8px] text-[#F0EEE9] text-[20px] font-medium">
                    Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-[22px] font-semibold text-[#101113]">{plan.name}</h3>

              {/* Price */}
              <div className="flex items-baseline gap-[4px] mt-[16px]">
                <span className="text-[48px] font-bold text-[#0047BA]" style={{ letterSpacing: '-1.2px', lineHeight: '48px' }}>
                  &euro;{plan.price}
                </span>
                <span className="text-[18px] font-normal text-[#898C8E]">/mo</span>
              </div>

              {/* Billing Note */}
              <p className="text-[14px] text-[#898C8E] mt-[8px]">
                or <span className="font-bold text-[#101113]">&euro;{plan.yearlyPrice}</span> yearly{' '}
                <span className="text-[#009966] font-semibold">Save {plan.savePercent}%</span>
              </p>

              {/* Divider */}
              <div className="border-t border-[#F0EEE9] my-[24px]" />

              {/* Category */}
              <span className="text-[13px] font-semibold uppercase text-[#898C8E] mb-[16px]">
                {plan.category}
              </span>

              {/* Features */}
              <ul className="flex flex-col gap-[12px] mb-[32px] flex-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-[12px]">
                    <Check className="size-[20px] text-[#0047BA] flex-shrink-0 mt-[2px]" />
                    <span className="text-[14px] text-[#101113]">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <NotivaButtonLink
                href={getMainAppRegisterUrl()}
                variant={plan.buttonVariant}
                size="lg"
                fullWidth
              >
                {plan.buttonText}
              </NotivaButtonLink>

              {/* Trial Text */}
              <p className="text-[16px] text-[#101113] text-center mt-[16px]">
                Start a free 30-day trial
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-[16px] text-[#F05627] text-center">
          All plans include a 30-day free trial. No credit card required for the trial.
        </p>
      </div>
    </section>
  )
}
