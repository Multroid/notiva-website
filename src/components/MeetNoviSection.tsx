'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRive, Layout, Fit, Alignment, EventType } from '@rive-app/react-canvas'
import { motion } from 'framer-motion'
import { getMainAppRegisterUrl } from '@/lib/app-url'

// Animation names in the novi.riv file
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

    // Handle loop events (fires when looping animations complete a cycle)
    const handleLoop = () => {
      if (currentAnimationRef.current === 'idle') {
        loopCountRef.current += 1
        
        if (loopCountRef.current >= IDLE_CYCLES_BEFORE_GREETING) {
          // Switch to greeting animation
          loopCountRef.current = 0
          currentAnimationRef.current = 'greeting'
          rive.stop(IDLE_ANIMATION)
          rive.play(GREETING_ANIMATION)
        }
      }
    }

    // Handle stop events (fires when one-shot animations like Greeting complete)
    const handleStop = () => {
      // If greeting just finished, switch back to idle
      if (currentAnimationRef.current === 'greeting') {
        currentAnimationRef.current = 'idle'
        loopCountRef.current = 0
        rive.stop(GREETING_ANIMATION)
        rive.play(IDLE_ANIMATION)
      }
    }

    // Subscribe to events
    rive.on(EventType.Loop, handleLoop)
    rive.on(EventType.Stop, handleStop)

    return () => {
      rive.off(EventType.Loop, handleLoop)
      rive.off(EventType.Stop, handleStop)
    }
  }, [rive])

  // Example questions for Novi
  const exampleQuestions = [
    '"What subscriptions increased this month?"',
    '"Which bills are due next week?"',
    '"Show me all invoices from Amazon."',
  ]

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left - Novi Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex items-center justify-center order-1 lg:order-1"
          >
            <div 
              className="relative"
              style={{ 
                width: '350px', 
                height: '350px',
                minWidth: '350px',
                minHeight: '350px',
              }}
            >
              <RiveComponent 
                style={{ 
                  width: '100%', 
                  height: '100%',
                  display: 'block',
                }} 
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 text-center lg:text-left order-2 lg:order-2"
          >
            {/* Title */}
            <div>
              <h2 
                className="text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight"
                style={{ color: '#09090B' }}
              >
                Meet <span style={{ color: '#0047BA', fontWeight: 700 }}>Novi</span>
              </h2>
              {/* Subtitle */}
              <p 
                className="mt-2 text-lg"
                style={{ color: '#54545E' }}
              >
                your finance co-pilot
              </p>
            </div>
            
            {/* Description */}
            <div className="space-y-4 max-w-lg mx-auto lg:mx-0">
              <p 
                className="text-base leading-relaxed"
                style={{ color: '#54545E' }}
              >
                Novi runs quietly in the background to spot what matters: 
                upcoming renewals, unexpected charges, and documents 
                that need action. Ask questions like:
              </p>
              
              {/* Bullet Points */}
              <ul className="space-y-2 text-left">
                {exampleQuestions.map((question, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-2"
                  >
                    <span 
                      className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: '#0047BA' }}
                    />
                    <span 
                      className="text-base italic"
                      style={{ color: '#54545E' }}
                    >
                      {question}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons - Double Layer Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-4 pt-4 justify-center lg:justify-start"
            >
              {/* Ask Novi - Primary Button */}
              <a
                href={getMainAppRegisterUrl()}
                className="flex flex-col items-center justify-center overflow-hidden"
                style={{
                  height: '44px',
                  padding: '4px',
                  backgroundColor: '#D9E3F5',
                  border: '1px solid #0033A1',
                  borderRadius: '4px',
                }}
              >
                <span
                  className="flex flex-col items-center justify-center flex-1 min-h-0 min-w-0 overflow-hidden"
                  style={{
                    backgroundColor: '#0047BA',
                    borderRadius: '8px',
                    paddingLeft: '32px',
                    paddingRight: '32px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '18px',
                      color: '#F0EEE9',
                      textAlign: 'center',
                    }}
                  >
                    Ask Novi
                  </span>
                </span>
              </a>

              {/* See examples - Secondary Button */}
              <Link
                href="#how-it-works"
                className="flex flex-col items-center justify-center overflow-hidden"
                style={{
                  height: '44px',
                  padding: '4px',
                  backgroundColor: '#D9E3F5',
                  border: '1px solid #0047BA',
                  borderRadius: '4px',
                }}
              >
                <span
                  className="flex flex-col items-center justify-center flex-1 min-h-0 min-w-0 overflow-hidden"
                  style={{
                    backgroundColor: '#F3F4F4',
                    border: '1px solid #0047BA',
                    borderRadius: '8px',
                    paddingLeft: '32px',
                    paddingRight: '32px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '18px',
                      color: '#0047BA',
                      textAlign: 'center',
                    }}
                  >
                    See examples
                  </span>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
