"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { OnboardingProgress } from "@/components/onboarding/progress";

const STEPS = ["Company Info", "Culture & Description", "Hiring Plan"];

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "Free forever",
    description: "Try LynxHire with no commitment",
    features: [
      "1 active job posting",
      "Basic candidate matching",
      "Unlimited browsing",
    ],
    cta: "Start Free",
  },
  {
    id: "starter",
    name: "Starter",
    price: "$149/mo CAD",
    description: "For teams actively hiring",
    features: [
      "10 active job postings",
      "Advanced AI matching",
      "Basic ATS",
      "25 resume views/mo",
    ],
    cta: "Start Starter",
    popular: true,
  },
  {
    id: "growth",
    name: "Growth",
    price: "$299/mo CAD",
    description: "For scaling companies",
    features: [
      "Unlimited job postings",
      "Full AI Suite",
      "Full ATS + Analytics",
      "Unlimited resume access",
    ],
    cta: "Start Growth",
  },
];

export default function EmployerStep3() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState("free");

  async function handleComplete(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/auth/login");
      return;
    }

    // Mark onboarding complete
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ onboarding_complete: true })
      .eq("id", user.id);

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    // If paid plan selected, redirect to billing (Stripe — Phase 7)
    // For now, all go to complete screen
    router.push("/onboarding/employer/complete");
  }

  return (
    <main className="px-4 py-10">
      <div className="max-w-xl mx-auto">
        <OnboardingProgress currentStep={3} totalSteps={3} steps={STEPS} />

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-1">
            Choose Your Plan
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            You can upgrade or downgrade anytime. No contracts.
          </p>

          <form onSubmit={handleComplete} className="space-y-4">
            {PLANS.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all relative ${
                  selectedPlan === plan.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background hover:border-primary/30"
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-3 right-3 text-xs font-medium bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-heading font-bold text-foreground text-lg">
                      {plan.name}
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {plan.description}
                    </p>
                  </div>
                  <span className="font-bold text-foreground text-sm">
                    {plan.price}
                  </span>
                </div>
                <ul className="space-y-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="text-xs text-muted-foreground flex items-center gap-2"
                    >
                      <span className="text-primary">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3.5 py-2.5">
                {error}
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.push("/onboarding/employer/step-2")}
                className="flex-1 py-2.5 border border-border text-foreground font-medium rounded-lg text-sm hover:bg-card transition-all"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg text-sm hover:bg-primary/90 disabled:opacity-60 transition-all"
              >
                {loading ? "Finishing..." : "Complete Setup 🎉"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
