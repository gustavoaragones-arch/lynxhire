import { DashboardHeader } from "@/components/dashboard/header";

export default function ProfilePage() {
  return (
    <>
      <DashboardHeader
        title="Profile"
        subtitle="Manage your candidate profile"
      />
      <main className="flex-1 p-6">
        <p className="text-muted-foreground">
          Profile editor — coming in Prompt 5
        </p>
      </main>
    </>
  );
}
