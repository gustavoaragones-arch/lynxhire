import { DashboardHeader } from "@/components/dashboard/header";

export default function SavedPage() {
  return (
    <>
      <DashboardHeader
        title="Saved Jobs"
        subtitle="Jobs you've saved for later"
      />
      <main className="flex-1 p-6">
        <p className="text-muted-foreground">
          Saved jobs list — coming in Prompt 5
        </p>
      </main>
    </>
  );
}
