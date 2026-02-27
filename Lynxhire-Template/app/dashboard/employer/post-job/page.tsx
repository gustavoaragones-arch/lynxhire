import { DashboardHeader } from "@/components/dashboard/header";

export default function PostJobPage() {
  return (
    <>
      <DashboardHeader
        title="Post a Job"
        subtitle="Create a new job listing"
      />
      <main className="flex-1 p-6">
        <p className="text-muted-foreground">
          AI job posting form — coming in Prompt 5
        </p>
      </main>
    </>
  );
}
