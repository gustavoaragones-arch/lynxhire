"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type ApplyResult =
  | { success: true; applicationId: string }
  | { success: false; error: string };

export async function submitApplication(
  jobId: string,
  coverLetter?: string | null
): Promise<ApplyResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "You must be logged in to apply." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("type")
    .eq("id", user.id)
    .single();

  if (profile?.type !== "candidate") {
    return { success: false, error: "Only candidates can apply to jobs." };
  }

  const { data: existing } = await supabase
    .from("applications")
    .select("id")
    .eq("job_id", jobId)
    .eq("candidate_id", user.id)
    .single();

  if (existing) {
    return { success: false, error: "You have already applied to this job." };
  }

  const { data: job } = await supabase
    .from("job_postings")
    .select("id")
    .eq("id", jobId)
    .eq("status", "active")
    .single();

  if (!job) {
    return {
      success: false,
      error: "Job not found or no longer accepting applications.",
    };
  }

  const { data: candidateProfile } = await supabase
    .from("candidate_profiles")
    .select("resume_url")
    .eq("profile_id", user.id)
    .single();

  const resumeUrl = candidateProfile?.resume_url ?? null;

  const { data: application, error: insertError } = await supabase
    .from("applications")
    .insert({
      job_id: jobId,
      candidate_id: user.id,
      resume_url: resumeUrl,
      cover_letter: coverLetter?.trim() || null,
      status: "new",
    })
    .select("id")
    .single();

  if (insertError) {
    return { success: false, error: insertError.message };
  }

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/dashboard/candidate/applications");
  revalidatePath(`/dashboard/employer/jobs/${jobId}`);

  return { success: true, applicationId: application.id };
}
