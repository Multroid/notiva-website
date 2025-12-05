'use client'
import React from 'react'
import { Check, Sparkles, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getMainAppRegisterUrl } from '@/lib/app-url'

const plans = [
    {
        name: 'Pro',
        price: '5.99',
        yearlyPrice: '49',
        description: 'For individuals',
        icon: Sparkles,
        features: [
            'Track unlimited subscriptions',
            'Email and bank sync',
            'Document scanning & deadline extraction',
            'Smart reminders & notifications',
            'Export reports to PDF/CSV',
        ],
        highlighted: false,
    },
    {
        name: 'Family',
        price: '12.99',
        yearlyPrice: '99',
        description: 'For households',
        icon: Users,
        features: [
            'Everything in Pro',
            'Up to 6 family members',
            'Shared subscription tracking',
            'Family spending insights',
            'Collaborative document management',
            'Priority support access',
        ],
        highlighted: true,
    },
]

export default function PricingSection() {
    return (
        <div className="bg-muted/30 dark:bg-background py-24 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                {/* Header */}
                <div className="text-center space-y-4 mb-16">
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        Plans
                    </span>
                    <h2 className="text-balance text-4xl font-bold md:text-5xl lg:text-6xl tracking-tight">
                        Simple pricing
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Choose what works for you
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {plans.map((plan) => {
                        const Icon = plan.icon
                        return (
                            <div
                                key={plan.name}
                                className={`
                                    relative rounded-2xl border bg-background p-8 
                                    transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                                    ${plan.highlighted 
                                        ? 'border-primary/50 shadow-lg ring-1 ring-primary/20' 
                                        : 'border-border shadow-sm'
                                    }
                                `}
                            >
                                {plan.highlighted && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                {/* Plan Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h3 className="text-xl font-semibold">{plan.name}</h3>
                                    </div>
                                    <div className="p-2.5 rounded-xl bg-muted/50 border">
                                        <Icon className="size-5 text-foreground" />
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="mb-2">
                                    <span className="text-5xl font-bold tracking-tight">€{plan.price}</span>
                                    <span className="text-muted-foreground text-lg">/mo</span>
                                </div>
                                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                                {/* Divider */}
                                <div className="border-t my-6" />

                                {/* Yearly Price */}
                                <p className="text-sm text-muted-foreground mb-6">
                                    or <span className="font-medium text-foreground">€{plan.yearlyPrice}</span> yearly
                                    <span className="ml-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                                        Save {Math.round((1 - (parseInt(plan.yearlyPrice) / (parseFloat(plan.price) * 12))) * 100)}%
                                    </span>
                                </p>

                                {/* Features */}
                                <ul className="space-y-3.5 mb-8">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Check className="size-5 text-primary shrink-0 mt-0.5" />
                                            <span className="text-sm text-foreground/90">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <Button
                                    className={`w-full h-12 text-base font-medium ${
                                        plan.highlighted 
                                            ? '' 
                                            : 'bg-foreground text-background hover:bg-foreground/90'
                                    }`}
                                    variant={plan.highlighted ? 'default' : 'secondary'}
                                    asChild
                                >
                                    <a href={getMainAppRegisterUrl()}>
                                        Get started
                                    </a>
                                </Button>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom Note */}
                <p className="text-center text-sm text-muted-foreground mt-10">
                    All plans include a 14-day free trial. No credit card required.
                </p>
            </div>
        </div>
    )
}

