'use client'

import Link from 'next/link'
import Image from 'next/image'
import { NotivaInputField } from '@/components/ui/notiva-input-field'

const linkColumns = [
  {
    title: 'Solutions',
    links: [
      { label: 'Hoomara', href: '#' },
      { label: 'Multroid Flow', href: '#' },
      { label: 'All Solutions', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about/company' },
      { label: 'Our Mission', href: '/about/company' },
      { label: 'Milestones', href: '/about/company' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Blog', href: '/blog' },
      { label: 'Security', href: '/security' },
      { label: 'Privacy', href: '/privacy' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="w-full bg-[#0047BA] rounded-tl-[40px] rounded-tr-[40px] pt-[32px] px-[24px]"
      style={{
        boxShadow: '0px -27px 50px 0px rgba(0,71,186,0.35)',
      }}
    >
      {/* Top Row */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-[32px] pb-[40px]">
        {/* Company Info */}
        <div className="flex items-center gap-[12px]">
          <Image
            src="/Logo/Notiva Logo transparent white.svg"
            alt="Notiva"
            width={40}
            height={40}
          />
          <span className="text-[40px] font-black text-[#FEFDFD]">
            Notiva
          </span>
        </div>

        {/* Tagline */}
        <div className="flex-1 max-w-[400px]">
          <p className="text-[16px] font-medium text-[#FEFDFD]">
            Building the future of technology with innovative solutions that simplify your financial life.
          </p>
        </div>

        {/* Stay Updated CTA */}
        <div className="flex flex-col gap-[18px] px-[32px] max-w-[431px]">
          <h3 className="text-[32px] font-semibold text-[#FEFDFD]">Stay Updated</h3>
          <p className="text-[16px] font-medium text-[#FEFDFD]">
            Get the latest news and updates from Notiva.
          </p>
          <NotivaInputField
            variant="orange"
            placeholder="Enter your email"
            buttonText="Subscribe"
          />
        </div>
      </div>

      {/* Middle Section - Link Columns */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-[40px] px-[40px] py-[60px] border-t border-white/10">
        {linkColumns.map((col) => (
          <div key={col.title}>
            <h4 className="text-[32px] font-semibold text-[#FEFDFD] mb-[24px]">
              {col.title}
            </h4>
            <ul className="flex flex-col gap-[16px]">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[16px] font-medium text-[#FEFDFD] hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom - Giant Wordmark */}
      <div className="flex flex-col items-center gap-[24px] py-[40px]">
        <h2
          className="text-[120px] md:text-[180px] lg:text-[228px] font-black text-[#F0EEE9] uppercase text-center leading-none select-none"
          style={{ opacity: 0.15 }}
        >
          NOTIVA
        </h2>

        {/* Copyright */}
        <p className="text-[14px] font-medium text-[#FEFDFD] text-center pb-[24px]">
          &copy; {new Date().getFullYear()} Notiva. Made and owned by{' '}
          <Link href="https://multroid.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Multroid
          </Link>.
        </p>
      </div>
    </footer>
  )
}
