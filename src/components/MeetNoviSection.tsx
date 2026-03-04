'use client'

import React, { useEffect, useRef } from 'react'
import { useRive, Layout, Fit, Alignment, EventType } from '@rive-app/react-canvas'
import { getMainAppRegisterUrl } from '@/lib/app-url'
import { NotivaButtonLink } from '@/components/ui/notiva-button'

const IDLE_ANIMATION = 'Idle'
const GREETING_ANIMATION = 'Greeting'
const IDLE_CYCLES_BEFORE_GREETING = 2

export default function MeetNoviSection() {
  const loopCountRef = useRef(0)
  const currentAnimationRef = useRef<'idle' | 'greeting'>('idle')

  const { rive, RiveComponent } = useRive({
    src: '/animations/novi.riv',
    autoplay: true,
    animations: [IDLE_ANIMATION],
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  })

  useEffect(() => {
    if (!rive) return

    const handleLoop = () => {
      if (currentAnimationRef.current === 'idle') {
        loopCountRef.current += 1
        if (loopCountRef.current >= IDLE_CYCLES_BEFORE_GREETING) {
          loopCountRef.current = 0
          currentAnimationRef.current = 'greeting'
          rive.stop(IDLE_ANIMATION)
          rive.play(GREETING_ANIMATION)
        }
      }
    }

    const handleStop = () => {
      if (currentAnimationRef.current === 'greeting') {
        currentAnimationRef.current = 'idle'
        loopCountRef.current = 0
        rive.stop(GREETING_ANIMATION)
        rive.play(IDLE_ANIMATION)
      }
    }

    rive.on(EventType.Loop, handleLoop)
    rive.on(EventType.Stop, handleStop)

    return () => {
      rive.off(EventType.Loop, handleLoop)
      rive.off(EventType.Stop, handleStop)
    }
  }, [rive])

  const exampleQuestions = [
    '"What subscriptions increased this month?"',
    '"Which bills are due next week?"',
    '"Show me all invoices from Amazon."',
  ]

  return (
    <section className="px-6 lg:px-[111px] py-[80px] lg:py-[120px]">
      <div className="mx-auto max-w-6xl flex flex-col lg:flex-row items-center gap-[32px]">
        {/* Left - Novi Animation */}
        <div className="flex items-center justify-center flex-shrink-0">
          <div style={{ width: '400px', height: '400px' }}>
            <RiveComponent style={{ width: '100%', height: '100%', display: 'block' }} />
          </div>
        </div>

        {/* Right - Content */}
        <div className="flex flex-col gap-[40px] p-[16px] max-w-[514px] text-center lg:text-left">
          <div>
            <h2 className="text-[44px] leading-[48px]">
              <span className="font-normal" style={{ color: '#101113' }}>Meet </span>
              <span className="font-bold" style={{ color: '#0047BA' }}>Novi</span>
            </h2>
            <p
              className="mt-2 text-[20px] font-normal"
              style={{ color: '#101113', letterSpacing: '-1.4px' }}
            >
              your finance co-pilot
            </p>
          </div>

          <div className="flex flex-col gap-[16px]">
            <p className="text-[16px] leading-[22px]" style={{ color: '#898C8E' }}>
              Novi runs quietly in the background to spot what matters:
              upcoming renewals, unexpected charges, and documents
              that need action. Ask questions like:
            </p>

            <ul className="space-y-2 text-left">
              {exampleQuestions.map((question, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#0047BA' }}
                  />
                  <span className="text-[16px] italic" style={{ color: '#898C8E' }}>
                    {question}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-[24px] justify-center lg:justify-start">
            <NotivaButtonLink
              href={getMainAppRegisterUrl()}
              variant="primary"
              size="lg"
            >
              Ask Novi
            </NotivaButtonLink>
            <NotivaButtonLink
              href="#how-it-works"
              variant="secondary"
              size="lg"
            >
              See examples
            </NotivaButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
