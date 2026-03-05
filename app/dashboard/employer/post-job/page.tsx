import { DashboardHeader } from "@/components/dashboard/header";
import { PostJobForm } from "@/components/dashboard/post-job-form";

export default function PostJobPage() {
  return (
    <>
      <DashboardHeader
        title="Post a Job"
        subtitle="Create a new job listing"
      />
      <PostJobForm />
    </>
  );
}
