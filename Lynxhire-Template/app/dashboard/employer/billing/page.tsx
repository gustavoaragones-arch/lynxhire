import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { BillingClient } from "@/components/dashboard/billing-client";

export default async function BillingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select(
      "plan, status, current_period_end, stripe_customer_id, stripe_subscription_id"
    )
    .eq("profile_id", user.id)
    .single();

  return (
    <>
      <DashboardHeader
        title="Billing"
        subtitle="Manage your LynxHire subscription"
      />
      <main className="flex-1 p-6 max-w-3xl">
        <BillingClient subscription={subscription} />
      </main>
    </>
  );
}
