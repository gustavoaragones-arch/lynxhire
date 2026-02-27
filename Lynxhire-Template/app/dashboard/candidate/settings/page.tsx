import { DashboardHeader } from "@/components/dashboard/header";

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader
        title="Settings"
        subtitle="Account and preferences"
      />
      <main className="flex-1 p-6">
        <p className="text-muted-foreground">
          Settings — coming soon
        </p>
      </main>
    </>
  );
}
