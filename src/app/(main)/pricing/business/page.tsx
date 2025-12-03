'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Building2, Users, Shield, BarChart3, Clock, HeadphonesIcon, Zap, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function BusinessPricingPage() {
    const businessAppUrl = process.env.NEXT_PUBLIC_BUSINESS_APP_URL || 'https://business.notiva.de';

    const teamFeatures = [
        'Unlimited team members',
        'Advanced role-based permissions',
        'Team workspaces & projects',
        'Advanced analytics & reporting',
        'Priority support (email & chat)',
        'API access',
        'Custom integrations',
        '99.9% uptime SLA',
        'Data export capabilities',
        'Audit logs & compliance'
    ];

    const enterpriseFeatures = [
        'Everything in Team',
        'SSO & SAML authentication',
        'Advanced security controls',
        'Dedicated account manager',
        '24/7 priority support',
        'Custom SLA agreements',
        'On-premise deployment option',
        'Advanced compliance features',
        'Custom training & onboarding',
        'Volume discounts'
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 px-6">
                <div className="max-w-6xl mx-auto text-center space-y-6">
                    <Badge className="mb-4">Business Solutions</Badge>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                        Built for Teams & Enterprises
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Powerful document management, compliance tracking, and team collaboration features 
                        designed for growing businesses and enterprises.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Button size="lg" asChild>
                            <a href={`${businessAppUrl}/login`}>
                                Get Started with Team Plan
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/contact">Contact Sales</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Why Choose Business Plans */}
            <section className="py-16 px-6 bg-muted/30">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center space-y-4 mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Why Choose Notiva for Business?
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Enterprise-grade features that scale with your business
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card>
                            <CardHeader>
                                <Building2 className="w-10 h-10 text-primary mb-4" />
                                <CardTitle className="text-xl">Unlimited Scale</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Add unlimited team members and manage thousands of documents without restrictions.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <Shield className="w-10 h-10 text-primary mb-4" />
                                <CardTitle className="text-xl">Enterprise Security</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    SSO, SAML, advanced encryption, and compliance features to keep your data secure.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <BarChart3 className="w-10 h-10 text-primary mb-4" />
                                <CardTitle className="text-xl">Advanced Analytics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Detailed insights, custom reports, and team performance metrics at your fingertips.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <HeadphonesIcon className="w-10 h-10 text-primary mb-4" />
                                <CardTitle className="text-xl">Priority Support</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Dedicated account managers and 24/7 support to ensure your team's success.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Pricing Comparison */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center space-y-4 mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Choose Your Business Plan
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            All plans include 30-day free trial
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Team Plan */}
                        <Card className="relative border-2 border-primary shadow-lg">
                            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                                Most Popular
                            </Badge>
                            <CardHeader className="text-center pb-4">
                                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                                <CardTitle className="text-3xl">Team</CardTitle>
                                <CardDescription className="text-base">
                                    For growing teams and startups
                                </CardDescription>
                                <div className="pt-6">
                                    <div className="text-5xl font-bold">$49</div>
                                    <p className="text-muted-foreground mt-2">per month, billed monthly</p>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <Button size="lg" className="w-full" asChild>
                                    <a href={`${businessAppUrl}/login?plan=team`}>
                                        Start Team Trial
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </a>
                                </Button>
                                <div className="space-y-3">
                                    {teamFeatures.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Enterprise Plan */}
                        <Card className="relative border-2">
                            <CardHeader className="text-center pb-4">
                                <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                                <CardTitle className="text-3xl">Enterprise</CardTitle>
                                <CardDescription className="text-base">
                                    For large organizations with advanced needs
                                </CardDescription>
                                <div className="pt-6">
                                    <div className="text-5xl font-bold">Custom</div>
                                    <p className="text-muted-foreground mt-2">Contact us for pricing</p>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <Button size="lg" variant="outline" className="w-full" asChild>
                                    <Link href="/contact">Contact Sales</Link>
                                </Button>
                                <div className="space-y-3">
                                    {enterpriseFeatures.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="text-center mt-12 space-y-4">
                        <p className="text-sm text-muted-foreground">
                            All plans include 30-day free trial • Cancel anytime • No credit card required for trial
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Comparison Table */}
            <section className="py-16 px-6 bg-muted/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Feature Comparison
                    </h2>

                    <div className="bg-card rounded-lg border overflow-hidden">
                        <div className="grid grid-cols-3 gap-4 p-6 border-b font-semibold">
                            <div>Feature</div>
                            <div className="text-center">Team</div>
                            <div className="text-center">Enterprise</div>
                        </div>

                        {[
                            { feature: 'Team Members', team: 'Unlimited', enterprise: 'Unlimited' },
                            { feature: 'Document Storage', team: 'Unlimited', enterprise: 'Unlimited' },
                            { feature: 'Workspaces', team: 'Unlimited', enterprise: 'Unlimited' },
                            { feature: 'Role-based Permissions', team: '✓', enterprise: '✓' },
                            { feature: 'API Access', team: '✓', enterprise: '✓' },
                            { feature: 'Audit Logs', team: '90 days', enterprise: 'Unlimited' },
                            { feature: 'SSO & SAML', team: '—', enterprise: '✓' },
                            { feature: 'Dedicated Support', team: 'Email & Chat', enterprise: '24/7 Phone' },
                            { feature: 'Custom SLA', team: '—', enterprise: '✓' },
                            { feature: 'On-premise Deployment', team: '—', enterprise: '✓' },
                        ].map((row, idx) => (
                            <div key={idx} className="grid grid-cols-3 gap-4 p-6 border-b last:border-b-0">
                                <div>{row.feature}</div>
                                <div className="text-center">{row.team}</div>
                                <div className="text-center">{row.enterprise}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>How does the 30-day free trial work?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Start using Notiva Business with full access to all features for 30 days. 
                                    No credit card required. After the trial, choose to subscribe or downgrade to a personal plan.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Can I switch between Team and Enterprise plans?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Yes, you can upgrade or downgrade at any time. Contact our sales team to discuss 
                                    your needs and we'll help you transition smoothly.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>What payment methods do you accept?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    We accept all major credit cards, ACH transfers, and can arrange invoicing for 
                                    Enterprise customers. Annual subscriptions are also available with a discount.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Is my data secure?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Absolutely. We use enterprise-grade encryption, regular security audits, and 
                                    comply with GDPR, SOC 2, and other industry standards. Enterprise plans include 
                                    additional security features like SSO and advanced access controls.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-6 bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-4xl font-bold">
                        Ready to Transform Your Team's Workflow?
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Join hundreds of teams managing their documents and deadlines with Notiva
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild>
                            <a href={`${businessAppUrl}/login?plan=team`}>
                                Start Free Trial
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/contact">Schedule a Demo</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

