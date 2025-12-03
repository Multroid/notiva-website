'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Slack, 
  Mail,
  HardDrive,
  Calendar,
  PieChart,
  Bell
} from 'lucide-react';

// --- Sub-components for cleaner code ---

// 1. The Logo Card (Left/Right Icons)
interface LogoCardProps {
  children: React.ReactNode;
  label: string;
  delay?: number;
  position: 'left' | 'right';
}

const LogoCard = ({ children, label, delay = 0, position }: LogoCardProps) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="relative group"
  >
    {/* Arrow Connector (Hidden on mobile) - Length matches grid gap (w-24 = 6rem = 96px) */}
    <div className={`hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 w-24 text-slate-300
      ${position === 'left' ? 'right-0 translate-x-full pl-4' : 'left-0 -translate-x-full pr-4'}
    `}>
      <svg width="100%" height="12" viewBox="0 0 100 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0 6H94" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M94 2L99 6L94 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    
    <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center hover:shadow-md transition-shadow relative z-10">
      {children}
    </div>
    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-slate-400 uppercase tracking-wider opacity-100 transition-opacity whitespace-nowrap">
      {label}
    </span>
  </motion.div>
);

// 2. The Highlighted Text (Simulates extraction)
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

// --- Main Component ---

export default function BillingScanningSection() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Smart Extraction
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            From static files to <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              smart reminders.
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Upload any contract, invoice, or receipt. Notiva instantly extracts renewal dates, 
            amounts, and vendor details to keep your subscriptions organized.
          </p>
        </div>

        {/* Animation Stage */}
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-24 items-center">
          
          {/* Left Column: Sources */}
          <div className="flex flex-row md:flex-col gap-6 md:gap-12 order-2 md:order-1 justify-center md:justify-self-end">
            <LogoCard label="Email" delay={0.1} position="left">
              <Mail className="w-8 h-8 text-slate-600" />
            </LogoCard>
            <LogoCard label="Drive" delay={0.2} position="left">
              <HardDrive className="w-8 h-8 text-slate-600" />
            </LogoCard>
            <LogoCard label="Slack" delay={0.3} position="left">
              <Slack className="w-8 h-8 text-[#4A154B]" />
            </LogoCard>
          </div>

          {/* Middle Column: The Document Scanner */}
          <div className="order-1 md:order-2 w-full max-w-[440px] relative md:justify-self-center">
            
            {/* Background decorative blobs */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20 animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-20 animate-pulse delay-700" />

            {/* The Document Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-lg shadow-2xl border border-slate-100 overflow-hidden"
              style={{ aspectRatio: '0.75' }} // Document aspect ratio
            >
              
              {/* Document Header */}
              <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="text-[10px] text-slate-400 font-mono">SERVICE_AGREEMENT_V2.PDF</div>
              </div>

              {/* Document Content */}
              <div className="p-8 text-[10px] md:text-xs leading-relaxed text-slate-400 font-mono space-y-4 relative z-0">
                
                <div className="font-bold text-slate-800 text-sm mb-4">SUBSCRIPTION CONTRACT</div>
                
                <p>
                  This agreement is effective as of <ExtractedData delay={1000}>Nov 24, 2025</ExtractedData> between 
                  <strong className="text-slate-700"> Acme Inc </strong> and 
                  <strong className="text-slate-700"> Cloud Services Ltd </strong> (&quot;Vendor&quot;).
                </p>

                <div className="h-px bg-slate-100 my-2" />

                <p className="font-semibold text-slate-700">1. PLAN DETAILS</p>
                <div className="grid grid-cols-2 gap-4 pl-2">
                  <div>
                    <div className="text-[9px] uppercase text-slate-300">Product</div>
                    <ExtractedData delay={2200}>Pro License</ExtractedData>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase text-slate-300">Billing</div>
                    <ExtractedData delay={2400}>Monthly</ExtractedData>
                  </div>
                </div>

                <div className="h-px bg-slate-100 my-2" />

                <p className="font-semibold text-slate-700">2. PAYMENT SCHEDULE</p>
                <div className="space-y-2 pl-2">
                  <div className="flex justify-between">
                    <span>Monthly Cost:</span>
                    <ExtractedData delay={3500}>$49.00</ExtractedData>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Renewal:</span>
                    <ExtractedData delay={3700}>Dec 24, 2025</ExtractedData>
                  </div>
                  <div className="flex justify-between">
                    <span>Auto-Renew:</span>
                    <ExtractedData delay={3900}>Active</ExtractedData>
                  </div>
                </div>
                
                {/* Faux Text Lines for filler */}
                <div className="space-y-1.5 pt-4 opacity-30">
                  <div className="h-1.5 bg-slate-300 rounded w-full" />
                  <div className="h-1.5 bg-slate-300 rounded w-5/6" />
                  <div className="h-1.5 bg-slate-300 rounded w-4/6" />
                </div>

              </div>

              {/* THE SCANNING BEAM */}
              <motion.div
                animate={{ top: ["-10%", "110%"] }}
                transition={{ 
                  duration: 4, 
                  ease: "linear", 
                  repeat: Infinity,
                  repeatDelay: 1 
                }}
                className="absolute left-0 right-0 h-24 bg-gradient-to-b from-indigo-500/0 via-indigo-500/10 to-indigo-500/20 border-b-2 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)] z-20 pointer-events-none w-full"
              />

              {/* Floating 'Extracted' Label at bottom */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center z-30">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-slate-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg"
                >
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Extracting Data points...
                </motion.div>
              </div>

            </motion.div>

          </div>

          {/* Right Column: Destinations */}
          <div className="flex flex-row md:flex-col gap-6 md:gap-12 order-3 md:order-3 justify-center md:justify-self-start">
             <LogoCard label="Calendar" delay={0.4} position="right">
               <Calendar className="w-8 h-8 text-blue-600" />
             </LogoCard>
             <LogoCard label="Reports" delay={0.5} position="right">
               <PieChart className="w-8 h-8 text-indigo-600" />
             </LogoCard>
             <LogoCard label="Alerts" delay={0.6} position="right">
               <Bell className="w-8 h-8 text-amber-500" />
             </LogoCard>
          </div>

        </div>
      </div>
    </section>
  );
}
