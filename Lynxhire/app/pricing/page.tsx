// STYLE RULE: Never invent new styles. Always copy from existing template components.
// Buttons: bg-neutral-900 text-white rounded-full (primary) | border border-neutral-200 rounded-full (secondary)
// Orange: #FF6B2B only
// Badge/pill: border border-neutral-200 text-neutral-500 text-xs rounded-full px-4 py-1.5
// Cards: bg-white border border-neutral-100 rounded-2xl shadow-sm
// Body text: text-neutral-500
// Headings: font-bold text-neutral-900
// Page hero top padding: pt-36 minimum (fixed navbar clearance)

import Link from "next/link";
import Pricing from "@/components/pricing";

export const metadata = {
  title: "Pricing — LynxHire",
  description:
    "Simple, transparent pricing for Canadian SMEs. AI-powered recruitment Canada and skills-based matching software—start free, upgrade when you're ready. No per-click fees.",
  keywords: ["LynxHire pricing", "AI-powered recruitment Canada", "precision recruitment for Canadian SMEs", "skilled trades hiring platform", "Canadian workforce optimization"],
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4">
        {/* Hero */}
        <div className="text-center pt-36 pb-10">
          <div className="inline-flex items-center gap-2 border border-neutral-200 text-neutral-500 text-xs rounded-full px-4 py-1.5 mb-8">
            Pricing
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-4 tracking-tight">
            Simple, <span className="text-[#FF6B2B]">transparent</span> pricing
          </h1>
          <p className="text-neutral-500 text-lg max-w-xl mx-auto">
            No per-click fees. No hidden costs. One flat subscription for unlimited hiring potential.
          </p>
          <p className="text-sm text-neutral-400 mt-2">All prices in Canadian dollars (CAD) · Cancel anytime</p>
        </div>

        {/* Same pricing cards as homepage */}
        <Pricing />

        {/* Candidate section */}
        <div className="bg-white border border-neutral-100 rounded-2xl p-8 text-center mb-10 shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            For Job Seekers
          </h2>
          <p className="text-neutral-500 text-sm mb-1">
            LynxHire is <strong className="text-neutral-900">always free</strong> for candidates.
          </p>
          <p className="text-neutral-500 text-sm mb-5">
            Create your profile, apply to jobs, and get AI-matched to opportunities — at no cost.
          </p>
          <Link
            href="/auth/signup"
            className="inline-block bg-neutral-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-neutral-800 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
          >
            Create Free Candidate Account
          </Link>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto pb-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
            Common Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: "Can I switch plans?", a: "Yes. Upgrade or downgrade at any time from your billing dashboard. Changes take effect at the next billing cycle." },
              { q: "Is there a contract?", a: "No. All plans are month-to-month. Cancel at any time — your access continues until the end of the paid period." },
              { q: "Do you charge per application or click?", a: "Never. Unlike Indeed or other per-click platforms, LynxHire charges a flat monthly fee regardless of how many applications you receive." },
              { q: "What payment methods do you accept?", a: "All major credit and debit cards via Stripe. Invoicing available for annual Growth plans." },
              { q: "Is GST/HST included?", a: "Prices shown are before applicable taxes. GST/HST will be calculated at checkout based on your province." },
            ].map((item) => (
              <div key={item.q} className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-sm">
                <p className="font-medium text-neutral-900 text-sm mb-2">{item.q}</p>
                <p className="text-neutral-500 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
