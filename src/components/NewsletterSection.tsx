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
    <section className="pt-[60px] lg:pt-[80px] pb-[80px] lg:pb-[200px] px-[16px] lg:px-[48px]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-[40px] lg:gap-[80px] justify-center">
        {/* Rive Animation — first in DOM, left on desktop */}
        <div className="flex-shrink-0" style={{ width: '260px', height: '260px' }}>
          <RiveComponent style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>

        {/* Content — second in DOM, right on desktop */}
        <div className="flex flex-col gap-[24px] lg:px-[32px] py-[16px] max-w-[800px]">
          <h2 className="text-[32px] lg:text-[48px] font-semibold leading-[38px] lg:leading-[56px]">
            <span className="text-[#0047BA]">NOTIVA </span>
            <span className="text-[#001941]">Newsletter</span>
          </h2>
          <p className="text-[16px] lg:text-[20px] font-normal text-[#001941]">
            Get Finance Management tips and updates delivered straight to your inbox.
          </p>
          <NotivaInputField
            variant="blue"
            placeholder="Enter your email address"
            buttonText="Subscribe"
          />
        </div>
      </div>
    </section>
  )
}
