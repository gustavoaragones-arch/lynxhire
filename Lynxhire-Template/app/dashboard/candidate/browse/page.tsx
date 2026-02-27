import { DashboardHeader } from "@/components/dashboard/header";

export default function BrowsePage() {
  return (
    <>
      <DashboardHeader
        title="Browse Jobs"
        subtitle="Find your next opportunity"
      />
      <main className="flex-1 p-6">
        <p className="text-muted-foreground">
          Job search with filters — coming in Prompt 5
        </p>
      </main>
    </>
  );
}
