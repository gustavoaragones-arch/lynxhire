import { DashboardHeader } from "@/components/dashboard/header";

export default function BillingPage() {
  return (
    <>
      <DashboardHeader
        title="Billing"
        subtitle="Manage your subscription"
      />
      <main className="flex-1 p-6">
        <p className="text-muted-foreground">
          Stripe billing — coming in Prompt 7
        </p>
      </main>
    </>
  );
}
