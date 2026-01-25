'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  FileSearch,
  Mail,
  Settings2,
  MousePointerClick,
  CalendarClock,
  Check,
  X,
  Zap,
  Clock,
  ArrowRight
} from 'lucide-react'

interface ComparisonRow {
  icon: React.ElementType
  capability: string
  withNotiva: string | boolean
  withoutNotiva: string | boolean
}

const comparisonData: ComparisonRow[] = [
  {
    icon: FileSearch,
    capability: 'Document deadline extraction',
    withNotiva: 'Automatic',
    withoutNotiva: 'Manual',
  },
  {
    icon: Mail,
    capability: 'Automated Email and attachment scanning',
    withNotiva: true,
    withoutNotiva: true,
  },
  {
    icon: Settings2,
    capability: 'Background processing',
    withNotiva: true,
    withoutNotiva: true,
  },
  {
    icon: MousePointerClick,
    capability: 'Manual input required',
    withNotiva: false,
    withoutNotiva: true,
  },
  {
    icon: CalendarClock,
    capability: 'Renewal and expiration tracking',
    withNotiva: true,
    withoutNotiva: false,
  },
]

const ValueCell = ({ value, isNotiva }: { value: string | boolean; isNotiva: boolean }) => {
  if (typeof value === 'string') {
    return (
      <span className={`font-semibold text-sm ${
        isNotiva 
          ? 'text-emerald-600 dark:text-emerald-400' 
          : 'text-slate-500 dark:text-slate-400'
      }`}>
        {value}
      </span>
    )
  }
  
  if (value) {
    return (
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
        isNotiva 
          ? 'bg-emerald-100 dark:bg-emerald-900/30' 
          : 'bg-slate-100 dark:bg-slate-800'
      }`}>
        <Check className={`w-4 h-4 ${
          isNotiva 
            ? 'text-emerald-600 dark:text-emerald-400' 
            : 'text-slate-500 dark:text-slate-400'
        }`} strokeWidth={2.5} />
      </div>
    )
  }
  
  return (
    <div className="w-6 h-6 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
      <X className="w-4 h-4 text-red-500 dark:text-red-400" strokeWidth={2.5} />
    </div>
  )
}

export default function ComparisonSection() {
  return (
    <section 
      id="comparison" 
      className="relative bg-slate-50 dark:bg-slate-950 py-24 md:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.08),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.15),transparent_50%)]" />
      
      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <span className="inline-block text-sm font-semibold text-primary/80 uppercase tracking-wider">
            Why choose automation
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Automatic versus manual
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what changes when you choose automation
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
        >
          {/* Table Header */}
          <div className="px-6 py-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex items-start">
              <div className="flex-1 text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Capability
              </div>
              
              {/* With Notiva Header */}
              <div className="w-[140px] md:w-[180px] text-center flex-shrink-0">
                <div className="inline-flex items-center justify-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="font-semibold text-foreground text-sm">With Notiva</div>
                <p className="text-xs text-muted-foreground mt-1 hidden md:block">
                  Your important dates update themselves
                </p>
              </div>
              
              {/* Without Notiva Header */}
              <div className="w-[140px] md:w-[180px] text-center flex-shrink-0">
                <div className="inline-flex items-center justify-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </div>
                </div>
                <div className="font-semibold text-slate-500 dark:text-slate-400 text-sm">Without Notiva</div>
                <p className="text-xs text-muted-foreground mt-1 hidden md:block">
                  Manual tracking is slow and unreliable
                </p>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {comparisonData.map((row, index) => (
              <motion.div
                key={row.capability}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center px-6 py-5 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
              >
                {/* Capability */}
                <div className="flex-1 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0">
                    <row.icon className="w-5 h-5 text-slate-600 dark:text-slate-300" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm md:text-base font-medium text-foreground">
                    {row.capability}
                  </span>
                </div>
                
                {/* With Notiva Value */}
                <div className="w-[140px] md:w-[180px] flex items-center justify-center flex-shrink-0">
                  <ValueCell value={row.withNotiva} isNotiva={true} />
                </div>
                
                {/* Without Notiva Value */}
                <div className="w-[140px] md:w-[180px] flex items-center justify-center flex-shrink-0">
                  <ValueCell value={row.withoutNotiva} isNotiva={false} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <Button 
            variant="outline" 
            size="lg"
            className="rounded-full px-8 font-medium"
            asChild
          >
            <Link href="/compare">
              Compare in Detail
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="lg"
            className="rounded-full px-6 font-medium text-muted-foreground hover:text-foreground group"
            asChild
          >
            <Link href="/features">
              Learn More
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

