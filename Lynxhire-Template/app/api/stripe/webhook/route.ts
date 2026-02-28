import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import type Stripe from "stripe";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig)
    return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.supabase_user_id;
        const plan = session.metadata?.plan;
        if (!userId || !plan) break;

        await supabaseAdmin
          .from("subscriptions")
          .update({
            plan,
            status: "active",
            stripe_subscription_id:
              typeof session.subscription === "string"
                ? session.subscription
                : session.subscription?.id ?? null,
            stripe_customer_id:
              typeof session.customer === "string"
                ? session.customer
                : session.customer?.id ?? null,
          })
          .eq("profile_id", userId);
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription & {
          current_period_end?: number;
        };
        const userId = sub.metadata?.supabase_user_id;
        if (!userId) break;

        const plan = (sub.metadata?.plan as string) ?? "free";
        const status =
          sub.status === "active"
            ? "active"
            : sub.status === "past_due"
              ? "past_due"
              : sub.status === "canceled"
                ? "cancelled"
                : "active";

        const update: {
          plan: string;
          status: string;
          current_period_end?: string;
        } = { plan, status };
        if (typeof sub.current_period_end === "number") {
          update.current_period_end = new Date(
            sub.current_period_end * 1000
          ).toISOString();
        }

        await supabaseAdmin
          .from("subscriptions")
          .update(update)
          .eq("stripe_subscription_id", sub.id);
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await supabaseAdmin
          .from("subscriptions")
          .update({
            plan: "free",
            status: "cancelled",
            stripe_subscription_id: null,
          })
          .eq("stripe_subscription_id", sub.id);
        break;
      }
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
