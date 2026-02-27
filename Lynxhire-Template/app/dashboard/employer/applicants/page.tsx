import { DashboardHeader } from "@/components/dashboard/header";

export default function ApplicantsPage() {
  return (
    <>
      <DashboardHeader
        title="Applicants"
        subtitle="Review and manage applicants"
      />
      <main className="flex-1 p-6">
        <p className="text-muted-foreground">
          Applicant pipeline — coming in Prompt 6
        </p>
      </main>
    </>
  );
}
