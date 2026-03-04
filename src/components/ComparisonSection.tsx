import Image from 'next/image'
import { NotivaButtonLink } from '@/components/ui/notiva-button'

interface ComparisonRow {
  capability: string
  withNotiva: string | boolean
  withoutNotiva: string | boolean
}

const comparisonData: ComparisonRow[] = [
  {
    capability: 'Document deadline extraction',
    withNotiva: 'Automatic',
    withoutNotiva: 'Manual',
  },
  {
    capability: 'Automated Email and attachment scanning',
    withNotiva: true,
    withoutNotiva: false,
  },
  {
    capability: 'Background processing',
    withNotiva: true,
    withoutNotiva: false,
  },
  {
    capability: 'Automatic forecasting',
    withNotiva: true,
    withoutNotiva: false,
  },
  {
    capability: 'Renewal and expiration tracking',
    withNotiva: true,
    withoutNotiva: false,
  },
]

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#1AC200" fillOpacity="0.15" />
      <path d="M7 12.5L10.5 16L17 9" stroke="#1AC200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#F32735" fillOpacity="0.15" />
      <path d="M8 8L16 16M16 8L8 16" stroke="#F32735" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ValueCell({ value }: { value: string | boolean }) {
  if (typeof value === 'string') {
    const isPositive = value === 'Automatic'
    return (
      <span className={`font-semibold text-[14px] ${isPositive ? 'text-[#1AC200]' : 'text-[#898C8E]'}`}>
        {value}
      </span>
    )
  }
  return value ? <CheckIcon /> : <CrossIcon />
}

export default function ComparisonSection() {
  return (
    <section
      className="relative py-[100px] px-[16px] overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(0,71,186,0.15) 0%, transparent 60%)',
      }}
    >
      <div className="max-w-[900px] mx-auto flex flex-col items-center gap-[48px]">
        {/* Title */}
        <h2 className="text-[48px] font-semibold text-[#0047BA] text-center">
          Automatic vs Manual
        </h2>

        {/* Comparison Card */}
        <div className="w-full bg-[#E6EDF8] border-2 border-[#0047BA] rounded-[16px] p-[12px]">
          <div className="bg-[#FAFAF8] border border-[#B0C6EA] rounded-[24px] p-[24px]">
            {/* Header Row */}
            <div className="grid grid-cols-[1fr_140px_140px] md:grid-cols-[1fr_180px_180px] items-center gap-[8px] pb-[16px] border-b border-[#F0EEE9]">
              <span className="text-[16px] font-semibold text-[#101113]">Capabilities</span>
              <div className="flex flex-col items-center gap-[4px]">
                <Image
                  src="/Logo/Notiva-Logo-Blue.svg"
                  alt="Notiva"
                  width={40}
                  height={40}
                />
                <span className="text-[12px] font-medium text-[#101113]">With Notiva</span>
              </div>
              <div className="flex flex-col items-center gap-[4px]">
                <Image
                  src="/Logo/Notiva-Logo-Blue.svg"
                  alt="Notiva"
                  width={40}
                  height={40}
                  className="opacity-30 grayscale"
                />
                <span className="text-[12px] font-medium text-[#898C8E]">Without Notiva</span>
              </div>
            </div>

            {/* Data Rows */}
            {comparisonData.map((row, index) => (
              <div
                key={row.capability}
                className={`grid grid-cols-[1fr_140px_140px] md:grid-cols-[1fr_180px_180px] items-center gap-[8px] py-[16px] ${
                  index % 2 === 0 ? 'bg-[#E6EDF8]' : ''
                } rounded-l-[8px] rounded-r-[8px] px-[12px]`}
              >
                <span className="text-[14px] md:text-[16px] font-medium text-[#101113]">
                  {row.capability}
                </span>
                <div className="flex items-center justify-center">
                  <ValueCell value={row.withNotiva} />
                </div>
                <div className="flex items-center justify-center">
                  <ValueCell value={row.withoutNotiva} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <NotivaButtonLink
          href="/compare"
          variant="secondary"
          size="lg"
        >
          Compare in detail
        </NotivaButtonLink>
      </div>
    </section>
  )
}
