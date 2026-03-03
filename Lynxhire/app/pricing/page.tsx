import Link from "next/link";
import { Check } from "lucide-react";

export const metadata = {
  title: "Pricing — LynxHire",
  description:
    "Simple, transparent pricing for Canadian employers. Start free, upgrade when you're ready.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying LynxHire",
    features: [
      "1 active job posting",
      "Basic AI matching",
      "Unlimited candidate browsing",
      "In-platform messaging",
      "Standard support",
    ],
    cta: "Get Started Free",
    href: "/auth/signup",
    accent: false,
  },
  {
    name: "Starter",
    price: "$149",
    period: "/month CAD",
    description: "For growing teams hiring regularly",
    features: [
      "10 active job postings",
      "Advanced AI matching & scoring",
      "Full ATS pipeline",
      "25 resume downloads/month",
      "Priority support",
      "Company profile badge",
    ],
    cta: "Start Starter Plan",
    href: "/auth/signup",
    accent: true,
    badge: "Most Popular",
  },
  {
    name: "Growth",
    price: "$299",
    period: "/month CAD",
    description: "For high-volume hiring teams",
    features: [
      "Unlimited job postings",
      "Full AI suite + bulk scoring",
      "Full ATS + hiring analytics",
      "Unlimited resume access",
      "Dedicated account support",
      "Custom company profile",
    ],
    cta: "Start Growth Plan",
    href: "/auth/signup",
    accent: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="font-heading font-bold text-foreground text-4xl mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            No per-click fees. No hidden costs. One flat subscription for
            unlimited hiring potential.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            All prices in Canadian dollars (CAD) · Cancel anytime
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-card rounded-2xl p-6 flex flex-col ${
                plan.accent
                  ? "border-2 border-primary shadow-lg shadow-primary/10"
                  : "border border-border"
              }`}
            >
              {plan.badge && (
                <div className="mb-4">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full text-primary-foreground"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}
              <div className="mb-5">
                <h2 className="font-heading font-bold text-foreground text-xl mb-1">
                  {plan.name}
                </h2>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-heading font-bold text-foreground text-3xl">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {plan.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    <Check
                      size={15}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "var(--primary)" }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`w-full py-3 rounded-xl text-sm font-medium text-center transition-all ${
                  plan.accent
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border text-foreground hover:bg-muted"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Candidate section */}
        <div className="bg-card border border-border rounded-2xl p-8 text-center mb-10">
          <h2 className="font-heading font-bold text-foreground text-xl mb-2">
            For Job Seekers
          </h2>
          <p className="text-muted-foreground text-sm mb-1">
            LynxHire is <strong className="text-foreground">always free</strong>{" "}
            for candidates.
          </p>
          <p className="text-muted-foreground text-sm mb-5">
            Create your profile, apply to jobs, and get AI-matched to
            opportunities — at no cost.
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl text-sm hover:bg-primary/90 transition-all"
          >
            Create Free Candidate Account
          </Link>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading font-bold text-foreground text-xl mb-6 text-center">
            Common Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I switch plans?",
                a: "Yes. Upgrade or downgrade at any time from your billing dashboard. Changes take effect at the next billing cycle.",
              },
              {
                q: "Is there a contract?",
                a: "No. All plans are month-to-month. Cancel at any time — your access continues until the end of the paid period.",
              },
              {
                q: "Do you charge per application or click?",
                a: "Never. Unlike Indeed or other per-click platforms, LynxHire charges a flat monthly fee regardless of how many applications you receive.",
              },
              {
                q: "What payment methods do you accept?",
                a: "All major credit and debit cards via Stripe. Invoicing available for annual Growth plans.",
              },
              {
                q: "Is GST/HST included?",
                a: "Prices shown are before applicable taxes. GST/HST will be calculated at checkout based on your province.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="bg-card border border-border rounded-xl p-5"
              >
                <p className="font-medium text-foreground text-sm mb-2">
                  {item.q}
                </p>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
