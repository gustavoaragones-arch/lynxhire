import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
  typescript: true,
});

export const PLANS = {
  starter: {
    name: "Starter",
    price: 14900, // CAD cents
    priceId: process.env.STRIPE_STARTER_PRICE_ID ?? "",
    description:
      "10 active job postings, Advanced AI matching, Basic ATS",
  },
  growth: {
    name: "Growth",
    price: 29900,
    priceId: process.env.STRIPE_GROWTH_PRICE_ID ?? "",
    description:
      "Unlimited postings, Full AI Suite, Full ATS + Analytics",
  },
  candidate_premium: {
    name: "Candidate Premium",
    price: 1900,
    priceId: process.env.STRIPE_CANDIDATE_PREMIUM_PRICE_ID ?? "",
    description:
      "Resume boost, Application insights, Salary data",
  },
};
