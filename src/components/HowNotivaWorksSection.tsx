import {
  CloudArrowUpIcon as CloudUpload,
  SparklesIcon as Sparkles,
  BellIcon as Bell,
  ShieldCheckIcon as ShieldCheck,
} from '@heroicons/react/24/solid'
import { NotivaButtonLink } from '@/components/ui/notiva-button'
import { getMainAppRegisterUrl } from '@/lib/app-url'

const steps = [
  {
    icon: CloudUpload,
    title: 'Upload or Connect your email (read-only)',
    description: 'Choose the accounts, inboxes, or documents you want Notiva to manage.',
  },
  {
    icon: Sparkles,
    title: 'Notiva extracts what matters',
    description: 'Expenses, renewals, expirations, invoices, IDs, contract dates — all analyzed automatically.',
  },
  {
    icon: Bell,
    title: 'Novi keeps you informed',
    description: 'Notiva keeps your finances and important data up to date so you can stop worrying about staying on top of everything.',
  },
  {
    icon: ShieldCheck,
    title: 'Peace of mind',
    description: 'Novi notifies you only when a renewal, expiration, or payment is coming up — nothing unnecessary.',
  },
]

export default function HowNotivaWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-[60px] lg:py-[79px] px-[16px] lg:px-[48px] overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(0,71,186,0.3) 0%, transparent 70%)',
      }}
    >
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-[40px] items-start">
        {/* Left Column - Sticky */}
        <div className="lg:sticky lg:top-[120px] flex flex-col gap-[32px] flex-1">
          <span
            className="text-[14px] font-normal uppercase"
            style={{ letterSpacing: '0.7px', color: 'rgba(43,127,255,0.8)' }}
          >
            HOW IT WORKS
          </span>

          <h2 className="text-[28px] lg:text-[44px] font-bold leading-[34px] lg:leading-[48px] text-[#101113]">
            How Notiva works
          </h2>

          <p className="text-[16px] lg:text-[20px] font-normal leading-[22px] lg:leading-[25px] text-[#67696B] max-w-md">
            From setup to peace of mind in just a few simple steps. Let Notiva handle the tracking while you focus on what matters.
          </p>

          <div className="flex flex-wrap items-center gap-[16px]">
            <NotivaButtonLink
              href={getMainAppRegisterUrl()}
              variant="primary"
              size="lg"
            >
              Get Started
            </NotivaButtonLink>
            <NotivaButtonLink
              href="/features"
              variant="secondary"
              size="lg"
            >
              Learn More
            </NotivaButtonLink>
          </div>
        </div>

        {/* Right Column - Timeline */}
        <div className="relative flex-1 max-w-[600px]">
          {/* Connecting line */}
          <div className="absolute left-[32px] top-[32px] bottom-[32px] w-px bg-[#B0C6EA]" />

          <div className="flex flex-col gap-[10px]">
            {steps.map((step, index) => (
              <div key={index} className="relative flex gap-[24px] py-[24px]">
                {/* Icon circle */}
                <div
                  className="relative z-10 flex-shrink-0 w-[64px] h-[64px] rounded-[16px] flex items-center justify-center"
                  style={{
                    backgroundColor: '#FEFDFD',
                    border: '1px solid #F0EEE9',
                    boxShadow: '0px 10px 15px -3px rgba(226,232,240,0.5)',
                  }}
                >
                  <step.icon className="w-[28px] h-[28px] text-[#0047BA]" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-[8px]">
                  <h3 className="text-[16px] font-semibold text-[#101113] mb-[8px]">
                    {step.title}
                  </h3>
                  <p className="text-[18px] font-normal leading-[26px] text-[#67696B]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
