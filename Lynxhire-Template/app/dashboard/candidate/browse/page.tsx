import { DashboardHeader } from "@/components/dashboard/header";
import { BrowseJobs } from "@/components/dashboard/browse-jobs";

export default function BrowsePage() {
  return (
    <>
      <DashboardHeader
        title="Browse Jobs"
        subtitle="Find your next opportunity in Canada"
      />
      <BrowseJobs />
    </>
  );
}
