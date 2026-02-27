import { DashboardHeader } from "@/components/dashboard/header";

export default function JobsPage() {
  return (
    <>
      <DashboardHeader
        title="My Jobs"
        subtitle="Manage your job postings"
      />
      <main className="flex-1 p-6">
        <p className="text-muted-foreground">
          Job list and ATS — coming in Prompt 5
        </p>
      </main>
    </>
  );
}
