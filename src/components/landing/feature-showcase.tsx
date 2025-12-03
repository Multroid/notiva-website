'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

type FeatureItem = {
    title: string;
    desc: string;
}

type ContentData = {
    [key: string]: FeatureItem[];
}

const content: ContentData = {
    professional: [
        { title: "Expense Tracking", desc: "Seamless bank import, auto‑categorization, and instant receipt capture." },
        { title: "Subscription Tracking", desc: "Email parsing that detects renewal alerts and price changes automatically." },
        { title: "Document Deadlines", desc: "Passport, ID, and insurance reminders synced directly to your personal calendar." },
        { title: "Tax Prep", desc: "Year‑end export with tagging. Generates CSV and PDF packages for your accountant." },
        { title: "Budgets", desc: "Set monthly caps and get alerts before you overspend." },
        { title: "Inbox‑to‑Expense", desc: "Forward receipts to a dedicated email address to auto‑file them instantly." },
        { title: "Privacy", desc: "Local redaction ensures your data stays private with vendor spend insights." }
    ],
    family: [
        { title: "Shared Budgets", desc: "Set per‑member or per‑category caps to manage household spending." },
        { title: "Family Vault", desc: "Secure storage for passports, school forms, and medical docs with reminders." },
        { title: "Household Subs", desc: "Assign owners to subscriptions and get family‑wide alerts." },
        { title: "Calendar Sync", desc: "Sync school and medical deadlines to Google or Microsoft Calendar." },
        { title: "Roles & Permissions", desc: "Partner, teen, and caregiver access levels for better security." },
        { title: "Emergency Access", desc: "Time‑locked trusted contact access for peace of mind." },
        { title: "Expense Approvals", desc: "Optional parent approval flow for child spending." }
    ],
    team: [
        { title: "Workspaces", desc: "Manage multiple teams, cost centers, and projects in one place." },
        { title: "RBAC Controls", desc: "Admin, Manager, and Member roles with custom approval workflows." },
        { title: "Reimbursements", desc: "Policy enforcement, per‑diem handling, and receipt OCR." },
        { title: "Shared Subscriptions", desc: "Owner assignment, renewal discipline, and chargeback protection." },
        { title: "Company Documents", desc: "Entity docs, contracts, and compliance dates with retention rules." },
        { title: "Audit Logs", desc: "Full audit trails, data exports, and SOC2‑friendly reporting." },
        { title: "SSO & Provisioning", desc: "SAML/SCIM support, Slack/Teams notifications, and API access." }
    ]
};

export function FeatureShowcase() {
    const [category, setCategory] = useState<string>('professional');
    const [index, setIndex] = useState<number>(0);

    const activeItems = content[category];
    const activeItem = activeItems[index];

    return (
        <section className="pb-16 md:pb-24 pt-0 bg-background relative z-10">
            <div className="mx-auto max-w-5xl px-6 flex flex-col gap-4">
                
                {/* Main Display Stage */}
                <div className="bg-card border rounded-lg flex flex-col-reverse md:grid md:grid-cols-[1.4fr_1fr] min-h-[600px] overflow-hidden shadow-sm">
                    
                    {/* Left: Dynamic Content */}
                    <div className="p-8 md:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-r">
                        <div key={`${category}-${index}`} className="animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-forwards">
                            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-4">
                                {category}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground mb-5">
                                {activeItem.title}
                            </h2>
                            <p className="text-lg leading-relaxed text-muted-foreground max-w-md mb-8">
                                {activeItem.desc}
                            </p>
                            
                            {/* Placeholder for future animation/image */}
                            <div className="w-full h-48 md:h-64 bg-muted/20 rounded-lg border border-dashed border-muted flex items-center justify-center">
                                <span className="text-muted-foreground text-sm font-medium">Animation coming soon</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Feature List */}
                    <div className="bg-muted/30 overflow-y-auto p-5 flex flex-col gap-1 max-h-[250px] md:max-h-none">
                        {activeItems.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => setIndex(idx)}
                                className={cn(
                                    "text-left px-5 py-3.5 rounded-md text-sm font-medium transition-all flex justify-between items-center group",
                                    index === idx 
                                        ? "bg-background text-primary shadow-sm border border-border/50" 
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                )}
                            >
                                {item.title}
                                <ArrowRight className={cn(
                                    "size-4 transition-all duration-200",
                                    index === idx ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                                )} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    {[
                        { id: 'professional', title: 'Professional', subtitle: 'Solo & Freelancers' },
                        { id: 'family', title: 'Family', subtitle: 'Household Management' }
                    ].map((nav) => (
                        <div 
                            key={nav.id}
                            onClick={() => {
                                setCategory(nav.id);
                                setIndex(0);
                            }}
                            className={cn(
                                "bg-card border rounded-lg p-5 cursor-pointer transition-all relative overflow-hidden hover:border-primary/50",
                                category === nav.id && "border-primary ring-1 ring-primary before:absolute before:top-0 before:left-5 before:right-5 before:h-1 before:bg-primary before:rounded-b-sm"
                            )}
                        >
                            <h3 className="font-semibold text-foreground mb-1">{nav.title}</h3>
                            <p className="text-sm text-muted-foreground">{nav.subtitle}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

