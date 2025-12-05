'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRive, Layout, Fit, Alignment, EventType } from '@rive-app/react-canvas'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
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

  return (
    <section className="relative bg-white dark:bg-slate-950 py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Novi Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-[400px] aspect-square">
              <RiveComponent className="w-full h-full" />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-foreground">
              Meet Novi
            </h2>
            
            <div className="space-y-4 max-w-lg mx-auto lg:mx-0">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Notiva takes care of things behind the scenes.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Novi, your intelligent assistant, sends friendly reminders when 
                something important is coming up like: &apos;Your driver&apos;s license needs 
                renewing soon&apos;.
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-4 pt-4 justify-center lg:justify-start"
            >
              <Button 
                size="lg" 
                className="rounded-full px-8 font-medium"
                asChild
              >
                <a href={getMainAppRegisterUrl()}>
                  Start
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 font-medium"
                asChild
              >
                <Link href="#how-it-works">
                  See how it works
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
