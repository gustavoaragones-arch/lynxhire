"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type ApplicationStatus =
  | "new"
  | "reviewed"
  | "interview"
  | "offer"
  | "rejected"
  | "withdrawn";

export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus,
  jobId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Unauthorized" };

  const { data: app } = await supabase
    .from("applications")
    .select("job_id, job_postings(profile_id)")
    .eq("id", applicationId)
    .single();

  if (!app) return { success: false, error: "Application not found" };

  const jobPostings = app.job_postings;
  const jobOwnerId =
    Array.isArray(jobPostings) && jobPostings[0]
      ? (jobPostings[0] as { profile_id?: string }).profile_id
      : (jobPostings as { profile_id?: string } | null)?.profile_id;

  if (jobOwnerId !== user.id) {
    return { success: false, error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", applicationId);

  if (error) return { success: false, error: error.message };

  revalidatePath(`/dashboard/employer/jobs/${jobId}`);
  revalidatePath(`/dashboard/employer/applicants/${applicationId}`);
  revalidatePath("/dashboard/employer/applicants");

  return { success: true };
}
