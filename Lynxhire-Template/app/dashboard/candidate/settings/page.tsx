import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { CandidateSettingsForm } from "@/components/dashboard/candidate-settings-form";

export default async function CandidateSettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user.id)
    .single();

  const { data: candidateProfile } = await supabase
    .from("candidate_profiles")
    .select(
      "work_authorization, desired_salary_min, desired_salary_max, desired_work_type"
    )
    .eq("profile_id", user.id)
    .single();

  return (
    <>
      <DashboardHeader
        title="Settings"
        subtitle="Manage your account preferences"
      />
      <main className="flex-1 p-6 max-w-2xl">
        <CandidateSettingsForm
          userId={user.id}
          email={profile?.email ?? ""}
          initialProfile={candidateProfile ?? null}
        />
      </main>
    </>
  );
}
