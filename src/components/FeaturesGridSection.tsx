'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// Feature data with content for left side
const features = [
  {
    id: 'autonomous',
    title: 'Autonomous tracking, not manual input',
    description: 'Notiva automatically finds subscriptions, invoices, and receipts in your email and keeps them updated over time.',
    // Content for the left side when selected
    contentHeading: 'Everything in one place, nothing forgotten',
    contentSubheading: 'Notiva brings together your subscriptions, expenses, and important documents — and keeps all your deadlines, renewals, and dates updated automatically.',
    bannerText: 'Secure By Design',
    image: '/Dashboard-screenshot-example.png', // Placeholder - replace with actual feature image
  },
  {
    id: 'private',
    title: 'Private by default. Secure by design.',
    description: 'Read-only connections, encrypted storage, and transparent controls over what\'s synced.',
    contentHeading: 'Your data stays yours',
    contentSubheading: 'We use read-only access wherever possible and encrypt everything at rest. You control exactly what gets synced and can revoke access anytime.',
    bannerText: 'Bank-Level Security',
    image: '/Dashboard-screenshot-example.png',
  },
  {
    id: 'subscriptions',
    title: 'Subscriptions you can actually control',
    description: 'See next billing dates, detect trial endings, and get reminders before renewals hit.',
    contentHeading: 'Never miss a renewal again',
    contentSubheading: 'Get notified before trials end, spot price increases instantly, and keep track of every subscription in one dashboard.',
    bannerText: 'Smart Reminders',
    image: '/Dashboard-screenshot-example.png',
  },
  {
    id: 'anomaly',
    title: 'Anomaly detection',
    description: 'Notiva flags unusual charges and sudden price increases.',
    contentHeading: 'Catch surprises before they cost you',
    contentSubheading: 'Our AI monitors your spending patterns and alerts you when something looks off — unexpected charges, price hikes, or duplicate payments.',
    bannerText: 'AI Powered',
    image: '/Dashboard-screenshot-example.png',
  },
  {
    id: 'timeline',
    title: 'A clear timeline of spending',
    description: 'Everything is grouped by merchant and category so you can understand patterns and spot waste fast.',
    contentHeading: 'See where your money goes',
    contentSubheading: 'Visualize your spending over time, grouped by merchant and category. Spot trends, find waste, and make informed decisions.',
    bannerText: 'Visual Insights',
    image: '/Dashboard-screenshot-example.png',
  },
]

// Feature Selection Card Component
interface FeatureCardProps {
  feature: typeof features[0]
  isSelected: boolean
  isFirst: boolean
  isLast: boolean
  onHover: () => void
  onClick: () => void
}

const FeatureSelectionCard = ({ 
  feature, 
  isSelected, 
  isFirst, 
  isLast, 
  onHover,
  onClick 
}: FeatureCardProps) => {
  // Determine border radius based on position and selection
  const getBorderRadius = () => {
    if (isSelected) return '32px' // Selected state has uniform larger radius
    if (isFirst) return '16px 42px 16px 16px' // Top right corner larger
    if (isLast) return '16px 16px 42px 16px' // Bottom right corner larger
    return '16px' // Regular cards
  }

  return (
    <motion.div
      onMouseEnter={onHover}
      onClick={onClick}
      className={cn(
        'flex flex-col justify-center items-start p-6 md:p-8 gap-4 cursor-pointer transition-all duration-300',
        isSelected 
          ? 'bg-[#F05627]' 
          : 'bg-[#0047BA] hover:bg-[#003995]'
      )}
      style={{
        borderRadius: getBorderRadius(),
        boxShadow: isSelected ? '0px 0px 18px 2px rgba(240, 86, 39, 0.8)' : 'none',
      }}
      layout
    >
      {/* Lock Icon */}
      <Lock 
        className="w-6 h-6 text-[#F0EEE9]" 
        strokeWidth={2}
        aria-hidden="true"
      />
      
      {/* Heading */}
      <h3 
        className="font-bold text-lg md:text-2xl leading-7 text-[#F0EEE9]"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {feature.title}
      </h3>
      
      {/* Subheading */}
      <p 
        className={cn(
          'text-sm md:text-base leading-[18px]',
          isSelected ? 'text-[#D8D6D2]' : 'text-[#B4B3AF]'
        )}
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {feature.description}
      </p>
    </motion.div>
  )
}

// Content Display Component (Left Side)
interface ContentDisplayProps {
  feature: typeof features[0]
}

const ContentDisplay = ({ feature }: ContentDisplayProps) => {
  return (
    <motion.div
      key={feature.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col justify-center items-center p-4 gap-4 h-full"
      style={{
        background: 'radial-gradient(49.96% 50.08% at 49.96% 50%, rgba(240, 86, 39, 0.46) 0%, rgba(255, 255, 255, 0) 100%)',
      }}
    >
      {/* Feature Animation/Image Area */}
      <div 
        className="w-full flex-1 min-h-[300px] md:min-h-[400px] rounded-[28px] overflow-hidden bg-gray-100"
        style={{
          boxShadow: 'inset 0px 0px 8px rgba(0, 71, 186, 0.4), 0px 0px 16px rgba(0, 0, 0, 0.2)',
        }}
      >
        <img 
          src={feature.image} 
          alt={feature.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content Copy */}
      <div className="flex flex-col items-start pt-4 gap-4 w-full">
        {/* Heading */}
        <h2 
          className="text-2xl md:text-[40px] leading-tight md:leading-[48px] font-bold text-[#0047BA]"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {feature.contentHeading}
        </h2>
        
        {/* Subheading */}
        <p 
          className="text-base md:text-xl leading-relaxed md:leading-7 font-medium text-[#003995]"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {feature.contentSubheading}
        </p>
        
        {/* Banner */}
        <div 
          className="flex items-center px-4 gap-2 h-12 rounded-2xl"
          style={{ background: '#B0C6EA' }}
        >
          <Lock className="w-6 h-6 text-[#F0EEE9]" strokeWidth={2} />
          <span 
            className="font-bold text-base leading-[48px] text-[#F0EEE9]"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {feature.bannerText}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// Mobile Dropdown Component
interface MobileDropdownProps {
  features: typeof features
  selectedIndex: number
  onSelect: (index: number) => void
  isOpen: boolean
  onToggle: () => void
}

const MobileDropdown = ({ features, selectedIndex, onSelect, isOpen, onToggle }: MobileDropdownProps) => {
  const selectedFeature = features[selectedIndex]
  
  return (
    <div className="w-full md:hidden">
      {/* Dropdown Trigger */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-[#F05627] rounded-2xl text-white"
        style={{ boxShadow: '0px 0px 18px 2px rgba(240, 86, 39, 0.8)' }}
      >
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5" />
          <span className="font-bold text-base">{selectedFeature.title}</span>
        </div>
        <ChevronDown 
          className={cn(
            "w-5 h-5 transition-transform duration-300",
            isOpen && "rotate-180"
          )} 
        />
      </button>
      
      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-2 rounded-2xl bg-[#0047BA]"
          >
            {features.map((feature, index) => (
              index !== selectedIndex && (
                <button
                  key={feature.id}
                  onClick={() => {
                    onSelect(index)
                    onToggle()
                  }}
                  className="w-full flex items-center gap-3 p-4 text-left text-white hover:bg-[#003995] transition-colors border-b border-[#003995] last:border-b-0"
                >
                  <Lock className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm">{feature.title}</span>
                </button>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FeaturesGridSection() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
  
  const selectedFeature = features[selectedIndex]

  return (
    <section 
      className="flex flex-col justify-center items-center py-12 md:py-20 px-4"
    >
      {/* Features Card - Outer Border */}
      <div 
        className="w-full max-w-[1245px] p-4 md:p-6 rounded-3xl"
        style={{
          background: '#E6EDF8',
          border: '3px solid #0047BA',
          borderRadius: '24px',
        }}
      >
        {/* Card Container - Inner White Card with Shadow */}
        <div 
          className="w-full p-4 md:p-6 rounded-[32px] md:rounded-[40px]"
          style={{
            background: '#FDFCFC',
            boxShadow: '0px 0px 16px 2px rgba(0, 0, 0, 0.25)',
          }}
        >
          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {/* Mobile Dropdown */}
            <MobileDropdown
              features={features}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
              isOpen={mobileDropdownOpen}
              onToggle={() => setMobileDropdownOpen(!mobileDropdownOpen)}
            />
            
            {/* Mobile Content Display */}
            <AnimatePresence mode="wait">
              <ContentDisplay feature={selectedFeature} />
            </AnimatePresence>
          </div>
          
          {/* Desktop View - Two Column Layout */}
          <div className="hidden md:flex flex-row gap-4">
            {/* Left Side - Content Display */}
            <div className="flex-1 min-h-[700px]">
              <AnimatePresence mode="wait">
                <ContentDisplay feature={selectedFeature} />
              </AnimatePresence>
            </div>
            
            {/* Right Side - Feature Selection List */}
            <div className="flex-1 flex flex-col justify-center gap-4 p-4">
              {features.map((feature, index) => (
                <FeatureSelectionCard
                  key={feature.id}
                  feature={feature}
                  isSelected={index === selectedIndex}
                  isFirst={index === 0}
                  isLast={index === features.length - 1}
                  onHover={() => setSelectedIndex(index)}
                  onClick={() => setSelectedIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
