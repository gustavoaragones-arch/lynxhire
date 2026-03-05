import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { ProfileEditor } from "@/components/dashboard/profile-editor";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const [
    { data: profile },
    { data: candidateProfile },
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, email")
      .eq("id", user.id)
      .single(),
    supabase
      .from("candidate_profiles")
      .select("*")
      .eq("profile_id", user.id)
      .single(),
  ]);

  return (
    <>
      <DashboardHeader
        title="My Profile"
        subtitle="Keep your profile updated to get better job matches"
      />
      <main className="max-w-2xl flex-1 p-6">
        <ProfileEditor
          userId={user.id}
          initialProfile={{
            full_name: profile?.full_name ?? "",
            email: profile?.email ?? "",
          }}
          initialCandidate={candidateProfile ?? null}
        />
      </main>
    </>
  );
}
