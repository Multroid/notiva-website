'use client'

import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas'
import { NotivaInputField } from '@/components/ui/notiva-input-field'

export default function NewsletterSection() {
  const { RiveComponent } = useRive({
    src: '/animations/novi.riv',
    autoplay: true,
    animations: ['Idle'],
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  })

  return (
    <section className="pt-[80px] pb-[200px] px-[16px]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-[80px] justify-center">
        {/* Left Content */}
        <div className="flex flex-col gap-[24px] px-[32px] py-[16px] max-w-[800px]">
          <h2 className="text-[48px] font-semibold leading-[56px]">
            <span className="text-[#0047BA]">NOTIVA </span>
            <span className="text-[#001941]">Newsletter</span>
          </h2>
          <p className="text-[20px] font-normal text-[#001941]">
            Get Finance Management tips and updates delivered straight to your inbox.
          </p>
          <NotivaInputField
            variant="blue"
            placeholder="Enter your email address"
            buttonText="Subscribe"
          />
        </div>

        {/* Right - Rive Animation */}
        <div className="flex-shrink-0" style={{ width: '260px', height: '260px' }}>
          <RiveComponent style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
      </div>
    </section>
  )
}
