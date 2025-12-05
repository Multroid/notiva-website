'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { LayoutGrid, ShieldCheck, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ElementType
  title: string
  description: string
  delay: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="space-y-3"
  >
    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
      <Icon className="w-6 h-6 text-slate-700 dark:text-slate-300" strokeWidth={1.5} />
    </div>
    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px]">
      {description}
    </p>
  </motion.div>
)

export default function EverythingInOnePlaceSection() {
  return (
    <section className="relative bg-slate-50 dark:bg-slate-950 py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-foreground">
                Everything in one place, nothing forgotten
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Notiva brings together your subscriptions, expenses, and important 
                documents — and keeps all your deadlines, renewals, and dates 
                updated automatically.
              </p>
            </motion.div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <FeatureCard
                icon={LayoutGrid}
                title="Never scattered"
                description="Your subscriptions, expenses, and deadlines live in one dashboard"
                delay={0.2}
              />
              <FeatureCard
                icon={ShieldCheck}
                title="Always protected"
                description="Bank-level encryption keeps your financial data safe and private"
                delay={0.3}
              />
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <Button 
                size="lg" 
                className="rounded-full px-6 font-medium"
                asChild
              >
                <Link href="/features">
                  Explore
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="group font-medium"
                asChild
              >
                <Link href="/about/company">
                  Learn more
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Image/Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 shadow-2xl">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent" />
              
              {/* Dashboard mockup image */}
              <Image
                src="/Dashboard-screenshot-example.png"
                alt="Notiva Dashboard - Everything in one place"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating decorative elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 p-4 hidden lg:flex flex-col justify-center"
            >
              <div className="text-3xl font-bold text-primary">12+</div>
              <div className="text-xs text-muted-foreground">Integrations</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              viewport={{ once: true }}
              className="absolute -top-4 -right-4 w-28 h-28 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 p-4 hidden lg:flex flex-col justify-center items-center"
            >
              <ShieldCheck className="w-8 h-8 text-emerald-500 mb-1" />
              <div className="text-xs text-muted-foreground text-center">Secured</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

