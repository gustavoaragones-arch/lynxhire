import { DashboardHeader } from "@/components/dashboard/header";

export default function ApplicationsPage() {
  return (
    <>
      <DashboardHeader
        title="My Applications"
        subtitle="Track your application status"
      />
      <main className="flex-1 p-6">
        <p className="text-muted-foreground">
          Application tracker — coming in Prompt 5
        </p>
      </main>
    </>
  );
}
