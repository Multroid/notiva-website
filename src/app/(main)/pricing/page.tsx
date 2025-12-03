"use client";

import { useMemo, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

type BillingCycle = "monthly" | "yearly";

type Plan = {
    id: string;
    code: string;
    name: string;
    currency: string;
    monthlyPrice: number; // in cents
    yearlyPrice: number; // in cents
    limits: Record<string, number>;
    features: Record<string, boolean>;
    sortOrder: number;
    stripePriceIdMonthly?: string;
    stripePriceIdYearly?: string;
};

// Helper to get plan description based on code
function getPlanDescription(code: string): string {
    const descriptions: Record<string, string> = {
        free: "Perfect for getting started with basic subscription tracking",
        pro: "Perfect for individuals and small teams who need advanced features",
        family: "Share and manage subscriptions with your family",
        team: "Built for growing teams that need collaboration",
        enterprise: "Custom solutions for large organizations"
    };
    return descriptions[code] || "";
}

// Helper to format feature name
function formatFeatureName(key: string): string {
    return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
}

// Helper to format limit value
function formatLimit(key: string, value: number): string {
    if (value === -1) return "Unlimited";
    
    if (key === "storage") {
        const gb = value / (1024 * 1024 * 1024);
        const mb = value / (1024 * 1024);
        return gb >= 1 ? `${gb.toFixed(1)} GB` : `${mb.toFixed(0)} MB`;
    }
    
    return value.toString();
}

export default function PricingPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [billing, setBilling] = useState<BillingCycle>("monthly");
    const [selected, setSelected] = useState<string | null>(null);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

    useEffect(() => {
        // Use new unified /api/stripe endpoint
        fetch("/api/stripe")
            .then((res) => res.json())
            .then((data) => {
                // Check if plans array exists
                if (!data.plans || !Array.isArray(data.plans)) {
                    console.warn("No plans found in response:", data);
                    setLoading(false);
                    return;
                }
                
                // Map StripeAppData to Plan format
                interface StripePlanData {
                    id: string;
                    tier: string;
                    productName: string;
                    currency: string;
                    monthlyPrice: number;
                    yearlyPrice: number;
                    limits: Record<string, number>;
                    features: Record<string, boolean>;
                    stripePriceIdMonthly: string;
                    stripePriceIdYearly: string;
                }
                
                const mappedPlans = data.plans.map((plan: StripePlanData) => ({
                    id: plan.id,
                    code: plan.tier?.toLowerCase() || 'free',
                    name: plan.productName,
                    currency: plan.currency,
                    monthlyPrice: plan.monthlyPrice || 0,
                    yearlyPrice: plan.yearlyPrice || 0,
                    limits: plan.limits || {},
                    features: plan.features || {},
                    sortOrder: 0,
                    stripePriceIdMonthly: plan.stripePriceIdMonthly,
                    stripePriceIdYearly: plan.stripePriceIdYearly,
                }));
                
                setPlans(mappedPlans);
                // Auto-select pro plan if available
                const proPlan = mappedPlans.find((p: Plan) => p.code === "pro");
                if (proPlan) setSelected(proPlan.id);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch plans:", err);
                setLoading(false);
            });
    }, []);

    const handleUpgrade = async (planCode: string) => {
        // Check if user is logged in
        if (!session) {
            toast.error("Please sign in to upgrade", {
                description: "You need to be logged in to purchase a subscription"
            });
            router.push(`/login?callbackUrl=/pricing`);
            return;
        }

        // Don't allow upgrading to free plan
        if (planCode === "free") {
            toast.info("You're already on the Free plan!");
            return;
        }

        // Enterprise needs custom contact
        if (planCode === "enterprise") {
            window.location.href = "mailto:sales@notiva.app";
            return;
        }

        setCheckoutLoading(planCode);

        try {
            // Find the plan to get the correct priceId
            const plan = plans.find(p => p.code === planCode);
            if (!plan) {
                throw new Error("Plan not found");
            }

            // Get the correct priceId based on billing cycle
            const priceId = billing === "yearly" 
                ? plan.stripePriceIdYearly 
                : plan.stripePriceIdMonthly;
            
            if (!priceId) {
                throw new Error(`Price ID not found for ${billing} billing cycle`);
            }

            // Use new unified /api/stripe endpoint with action
            const response = await fetch("/api/stripe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "checkout",
                    priceId,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create checkout session");
            }

            // Redirect to Stripe Checkout
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error("No checkout URL returned");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Failed to start checkout", {
                description: error instanceof Error ? error.message : "Please try again later"
            });
            setCheckoutLoading(null);
        }
    };

    const prices = useMemo(() => {
        return plans.reduce<Record<string, { current?: number; original?: number; suffix?: string }>>((acc, plan) => {
            if (plan.code === "enterprise") {
                acc[plan.id] = { suffix: "Custom" };
                return acc;
            }
            
            const monthly = plan.monthlyPrice / 100; // Convert cents to currency
            const yearly = plan.yearlyPrice / 100;
            
            let effective: number;
            if (billing === "monthly") {
                effective = monthly;
            } else {
                // Calculate monthly rate for yearly billing
                effective = yearly / 12;
            }
            
            acc[plan.id] = { 
                current: effective, 
                suffix: billing === "monthly" ? "/mo" : "/mo (billed yearly)"
            };
            return acc;
        }, {});
    }, [billing, plans]);

    if (loading) {
        return (
            <div className="grid gap-10">
                <div className="space-y-3">
                    <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Select a Plan</h1>
                    <p className="text-muted-foreground">Loading plans...</p>
                </div>
            </div>
        );
    }

    // Calculate yearly savings
    const yearlySavingsPercent = plans.length > 0 && plans[0].monthlyPrice > 0
        ? Math.round((1 - (plans[0].yearlyPrice / 12) / plans[0].monthlyPrice) * 100)
        : 15;

    return (
        <div className="grid gap-10">
            <div className="space-y-3">
                <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Select a Plan</h1>
                <Tabs value={billing} onValueChange={(v) => setBilling(v as BillingCycle)} className="w-fit">
                    <TabsList>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger value="yearly">
                            Annually 
                            {yearlySavingsPercent > 0 && (
                                <span className="ml-1 text-[11px] text-primary">-{yearlySavingsPercent}%</span>
                            )}
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {plans.map((plan) => {
                    const isSelected = selected === plan.id;
                    const price = prices[plan.id];
                    const isPro = plan.code === "pro";
                    const isFree = plan.code === "free";
                    const isEnterprise = plan.code === "enterprise";

                    // Get key features (up to 8)
                    const enabledFeatures = Object.entries(plan.features)
                        .filter(([, enabled]) => enabled)
                        .slice(0, 8);

                    // Get key limits
                    const keyLimits = ["subscriptions", "storage", "members", "integrations"];
                    const displayLimits = keyLimits
                        .filter(key => plan.limits[key] !== undefined)
                        .map(key => ({
                            label: formatFeatureName(key),
                            value: formatLimit(key, plan.limits[key])
                        }));

                    return (
                        <Card
                            key={plan.id}
                            className={cn(
                                "relative transition-all",
                                isSelected ? "ring-2 ring-primary border-primary/60" : "hover:border-primary/30"
                            )}
                        >
                            <CardHeader className="border-b min-h-[170px] md:min-h-[180px]">
                                <CardTitle className="flex items-center gap-2">
                                    {plan.name}
                                    {isPro && (
                                        <Badge className="ml-1" variant="default">Popular</Badge>
                                    )}
                                </CardTitle>
                                <CardDescription>{getPlanDescription(plan.code)}</CardDescription>
                                <div className="mt-2 font-medium">
                                    {!isEnterprise && price ? (
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-semibold">
                                                {plan.currency === "EUR" ? "€" : "$"}{price.current?.toFixed(2)}
                                            </span>
                                            <span className="text-base">{price.suffix}</span>
                                        </div>
                                    ) : (
                                        <div className="text-xl font-semibold text-muted-foreground">
                                            Contact Sales
                                        </div>
                                    )}
                                    {!isFree && !isEnterprise && (
                                        <p className="text-xs text-muted-foreground mt-1">Excl. VAT</p>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm">
                                {/* CTA */}
                                {isFree ? (
                                    <Button variant="outline" className="w-full mb-3" disabled>
                                        Current Plan
                                    </Button>
                                ) : isEnterprise ? (
                                    <Button 
                                        variant="outline" 
                                        className="w-full mb-3 border-primary text-primary hover:bg-primary/5"
                                        onClick={() => handleUpgrade(plan.code)}
                                        disabled={checkoutLoading === plan.code}
                                    >
                                        {checkoutLoading === plan.code ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Loading...
                                            </>
                                        ) : (
                                            "Contact Sales"
                                        )}
                                    </Button>
                                ) : (
                                    <Button
                                        className="w-full mb-3"
                                        variant="default"
                                        onClick={() => handleUpgrade(plan.code)}
                                        disabled={checkoutLoading === plan.code}
                                    >
                                        {checkoutLoading === plan.code ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            "Get Started"
                                        )}
                                    </Button>
                                )}
                                
                                <div className="grid gap-6">
                                    {/* Limits */}
                                    {displayLimits.length > 0 && (
                                        <div>
                                            <div className="text-xs font-semibold text-muted-foreground mb-3">
                                                KEY LIMITS
                                            </div>
                                            <ul className="space-y-3">
                                                {displayLimits.map((limit, i) => (
                                                    <li key={i} className="flex items-center justify-between">
                                                        <span className="text-muted-foreground">{limit.label}</span>
                                                        <span className="font-medium">{limit.value}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Features */}
                                    {enabledFeatures.length > 0 && (
                                        <div>
                                            <div className="text-xs font-semibold text-muted-foreground mb-3">
                                                KEY FEATURES
                                            </div>
                                            <ul className="space-y-3">
                                                {enabledFeatures.map(([feature], i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <Check className="mt-0.5 size-4 text-primary flex-shrink-0" />
                                                        <span>{formatFeatureName(feature)}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            {Object.values(plan.features).filter(Boolean).length > 8 && (
                                                <p className="text-xs text-muted-foreground mt-3">
                                                    +{Object.values(plan.features).filter(Boolean).length - 8} more features
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="border-t"></CardFooter>
                        </Card>
                    );
                })}
            </div>

            <p className="text-xs text-muted-foreground">
                All prices exclude VAT. Quotas reset monthly. Fair-use policy applies.
            </p>
            <div className="text-sm">
                <a href="/pricing/compare" className="underline underline-offset-4">
                    Compare our plans in detail
                </a> or reach out to <a href="mailto:support@notiva.app" className="underline underline-offset-4">
                    support@notiva.app
                </a> for help.
            </div>
        </div>
    );
}


