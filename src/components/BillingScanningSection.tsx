'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FileText,
  ScanLine,
  Mail,
  CalendarPlus,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Highlighted Text Component (Simulates extraction)
const ExtractedData = ({ children, delay }: { children: React.ReactNode; delay: number }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsHighlighted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span 
      className={`
        transition-all duration-500 rounded px-0.5
        ${isHighlighted 
          ? 'bg-indigo-100 text-indigo-700 font-semibold' 
          : 'text-slate-600'}
      `}
    >
      {children}
    </span>
  );
};

// Feature Item Component
const FeatureItem = ({ 
  icon: Icon, 
  text, 
  delay 
}: { 
  icon: React.ElementType
  text: string
  delay: number 
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.4 }}
    viewport={{ once: true }}
    className="flex items-start gap-3"
  >
    <div className="flex-shrink-0 mt-0.5">
      <Icon className="w-5 h-5 text-slate-500" strokeWidth={1.5} />
    </div>
    <span className="text-slate-600 dark:text-slate-400">{text}</span>
  </motion.div>
);

// --- Main Component ---

export default function BillingScanningSection() {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-wide">
                Powerful
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-foreground">
                Your documents, decoded automatically.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Notiva analyzes any document you choose to upload or connect — 
                contract, ID, invoice, or receipt. It extracts dates, deadlines, and key 
                details automatically, so you don&apos;t have to enter anything manually.
              </p>
            </motion.div>

            {/* Feature List */}
            <div className="space-y-4 pt-2">
              <FeatureItem 
                icon={FileText} 
                text="Extracts renewal dates, expirations, contract terms."
                delay={0.2}
              />
              <FeatureItem 
                icon={ScanLine} 
                text="Reads PDFs, scans, photos, IDs, invoices."
                delay={0.3}
              />
              <FeatureItem 
                icon={Mail} 
                text="Finds deadlines in email attachments."
                delay={0.4}
              />
              <FeatureItem 
                icon={CalendarPlus} 
                text="Adds everything to your timeline automatically."
                delay={0.5}
              />
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <Button 
                size="lg" 
                className="rounded-full px-6 font-medium"
                asChild
              >
                <Link href="/features">
                  Discover
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="group font-medium"
                asChild
              >
                <Link href="/features/document-scanning">
                  Details
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Side: Document Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Background decorative elements */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-40" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />

            {/* The Document Card */}
            <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              
              {/* Document Header - macOS style */}
              <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tracking-wide">
                  SERVICE_AGREEMENT_V2.PDF
                </div>
              </div>

              {/* Gradient bar */}
              <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400" />

              {/* Document Content */}
              <div className="p-6 md:p-8 space-y-5 relative">
                
                <div className="font-bold text-slate-800 dark:text-slate-200 text-base tracking-wide border-b border-slate-200 dark:border-slate-700 pb-3">
                  SUBSCRIPTION CONTRACT
                </div>
                
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  This agreement is effective as of <ExtractedData delay={800}>Nov 24, 2025</ExtractedData>
                  <br />
                  between <strong className="text-slate-700 dark:text-slate-300">Acme Inc</strong> and <strong className="text-slate-700 dark:text-slate-300">Cloud Services Ltd</strong> (&quot;Vendor&quot;).
                </p>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                  <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm mb-3">1. PLAN DETAILS</p>
                  <div className="grid grid-cols-2 gap-6 pl-2">
                    <div>
                      <div className="text-[10px] uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-1">Product</div>
                      <div className="text-sm"><ExtractedData delay={1800}>Pro License</ExtractedData></div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-1">Billing</div>
                      <div className="text-sm"><ExtractedData delay={2000}>Monthly</ExtractedData></div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                  <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm mb-3">2. PAYMENT SCHEDULE</p>
                  <div className="space-y-2.5 pl-2 text-sm">
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Monthly Cost:</span>
                      <ExtractedData delay={2800}>$49.00</ExtractedData>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Next Renewal:</span>
                      <ExtractedData delay={3000}>Dec 24, 2025</ExtractedData>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Auto-Renew:</span>
                      <ExtractedData delay={3200}>Active</ExtractedData>
                    </div>
                  </div>
                </div>
                
                {/* Faux Text Lines for filler */}
                <div className="space-y-2 pt-4 opacity-30">
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-4/6" />
                </div>

                {/* Extracting Data Button */}
                <div className="flex justify-center pt-4">
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2.5 shadow-lg"
                  >
                    <div className="w-4 h-4 border-2 border-white/30 dark:border-slate-900/30 border-t-white dark:border-t-slate-900 rounded-full animate-spin" />
                    Extracting Data points...
                  </motion.div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
