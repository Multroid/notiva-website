'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  CloudUpload, 
  Sparkles, 
  Bell, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react'
import { getMainAppRegisterUrl } from '@/lib/app-url'

const steps = [
  {
    icon: CloudUpload,
    title: 'Upload or connect',
    description: 'Choose the accounts, inboxes, or documents you want Notiva to manage',
  },
  {
    icon: Sparkles,
    title: 'Notiva extracts what matters',
    description: 'Renewals, expirations, invoices, IDs, contract dates — all analyzed automatically',
  },
  {
    icon: Bell,
    title: 'Novi keeps you informed',
    description: 'Novi notifies you only when a renewal, expiration, or payment is coming up — nothing unnecessary.',
  },
  {
    icon: ShieldCheck,
    title: 'Peace of mind',
    description: 'Notiva keeps your important data up to date so you can stop worrying about staying on top of everything.',
  },
]

export default function HowNotivaWorksSection() {
  return (
    <section 
      id="how-it-works" 
      className="relative bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left - Header Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32 space-y-8"
          >
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="inline-block text-sm font-medium text-primary/80 uppercase tracking-wider"
              >
                How it works
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-foreground"
              >
                How Notiva works
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground max-w-md"
            >
              From setup to peace of mind in just a few simple steps. Let Notiva handle the tracking while you focus on what matters.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button 
                size="lg" 
                className="rounded-full px-8 font-medium group"
                asChild
              >
                <a href={getMainAppRegisterUrl()}>
                  Get Started
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="rounded-full px-6 font-medium text-muted-foreground hover:text-foreground"
                asChild
              >
                <Link href="/features">
                  Explore Features
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right - Timeline Steps */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 lg:left-8 top-8 bottom-8 w-px bg-gradient-to-b from-primary/30 via-primary/20 to-transparent" />
            
            <div className="space-y-0">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  viewport={{ once: true, margin: '-50px' }}
                  className="relative flex gap-6 lg:gap-8 pb-12 last:pb-0"
                >
                  {/* Icon container */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 flex items-center justify-center"
                    >
                      <step.icon className="w-5 h-5 lg:w-7 lg:h-7 text-primary" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1 lg:pt-3">
                    <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

