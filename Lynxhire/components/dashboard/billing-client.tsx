"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const PLANS: {
  id: string;
  name: string;
  price: string;
  features: string[];
  cta: string | null;
  popular?: boolean;
}[] = [
  {
    id: "free",
    name: "Free",
    price: "Free forever",
    features: ["1 active job posting", "Basic AI matching", "Unlimited browsing"],
    cta: null,
  },
  {
    id: "starter",
    name: "Starter",
    price: "CAD $149/mo",
    features: [
      "10 active job postings",
      "Advanced AI matching",
      "Basic ATS",
      "25 resume views/mo",
    ],
    cta: "Upgrade to Starter",
    popular: true,
  },
  {
    id: "growth",
    name: "Growth",
    price: "CAD $299/mo",
    features: [
      "Unlimited postings",
      "Full AI Suite",
      "Full ATS + Analytics",
      "Unlimited resume access",
    ],
    cta: "Upgrade to Growth",
  },
];

interface Subscription {
  plan: string;
  status: string;
  current_period_end: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
}

export function BillingClient({
  subscription,
}: {
  subscription: Subscription | null;
}) {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentPlan = subscription?.plan ?? "free";
  const isActive = subscription?.status === "active";
  const hasStripe = !!subscription?.stripe_subscription_id;

  async function handleUpgrade(planId: string) {
    setLoading(planId);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upgrade failed");
      setLoading(null);
    }
  }

  async function handleManageBilling() {
    setLoading("portal");
    setError(null);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to open portal");
      setLoading(null);
    }
  }

  return (
    <div className="space-y-6">
      {searchParams.get("success") && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
          🎉 Subscription activated! Welcome to{" "}
          {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}.
        </div>
      )}
      {searchParams.get("cancelled") && (
        <div className="p-4 rounded-xl bg-muted border border-border text-muted-foreground text-sm">
          Checkout cancelled. Your current plan remains unchanged.
        </div>
      )}

      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Current Plan
            </p>
            <p className="font-heading font-bold text-foreground text-2xl capitalize">
              {currentPlan}
            </p>
            {subscription?.current_period_end && (
              <p className="text-sm text-muted-foreground mt-1">
                Renews{" "}
                {new Date(
                  subscription.current_period_end
                ).toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
          <span
            className={`text-xs font-medium px-3 py-1.5 rounded-full capitalize ${
              isActive
                ? "bg-green-100 text-green-700"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {subscription?.status ?? "Free"}
          </span>
        </div>

        {hasStripe && (
          <button
            onClick={handleManageBilling}
            disabled={loading === "portal"}
            className="mt-4 px-4 py-2 border border-border text-foreground text-sm font-medium rounded-xl hover:border-primary/40 transition-all disabled:opacity-60"
          >
            {loading === "portal"
              ? "Opening..."
              : "Manage Billing & Invoices →"}
          </button>
        )}
      </div>

      <div className="space-y-3">
        <h2 className="font-heading font-bold text-foreground">
          Available Plans
        </h2>
        {PLANS.map((plan) => {
          const isCurrent = plan.id === currentPlan;
          return (
            <div
              key={plan.id}
              className={`bg-card border rounded-2xl p-5 transition-all ${
                isCurrent ? "border-primary" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-foreground">
                      {plan.name}
                    </span>
                    {plan.popular && !isCurrent && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-primary text-primary-foreground">
                        Popular
                      </span>
                    )}
                    {isCurrent && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-primary/10 text-primary">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {plan.price}
                  </p>
                </div>
                {plan.cta && !isCurrent && (
                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={!!loading}
                    className="px-4 py-2 bg-primary text-primary-foreground text-xs font-medium rounded-xl hover:bg-primary/90 disabled:opacity-60 transition-all"
                  >
                    {loading === plan.id ? "Redirecting..." : plan.cta}
                  </button>
                )}
              </div>
              <ul className="space-y-1.5">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="text-xs text-muted-foreground flex items-center gap-2"
                  >
                    <span className="text-primary">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <p className="text-xs text-muted-foreground">
        Payments processed securely by Stripe. All prices in Canadian dollars
        (CAD). Cancel anytime.
      </p>
    </div>
  );
}
