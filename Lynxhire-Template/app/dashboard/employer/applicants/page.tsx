import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import Link from "next/link";

export default async function AllApplicantsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: jobs } = await supabase
    .from("job_postings")
    .select("id, title")
    .eq("profile_id", user.id);

  const jobIds = jobs?.map((j) => j.id) ?? [];
  const jobTitleMap = Object.fromEntries(jobs?.map((j) => [j.id, j.title]) ?? []);

  const { data: applications } =
    jobIds.length > 0
      ? await supabase
          .from("applications")
          .select(
            "id, status, created_at, ai_match_score, candidate_id, job_id"
          )
          .in("job_id", jobIds)
          .order("created_at", { ascending: false })
      : { data: [] };

  const candidateIds = [
    ...new Set(applications?.map((a) => a.candidate_id) ?? []),
  ];

  const { data: candidateProfiles } =
    candidateIds.length > 0
      ? await supabase
          .from("candidate_profiles")
          .select("profile_id, skills, years_experience")
          .in("profile_id", candidateIds)
      : { data: [] };

  const { data: candidateUsers } =
    candidateIds.length > 0
      ? await supabase
          .from("profiles")
          .select("id, full_name")
          .in("id", candidateIds)
      : { data: [] };

  const profileMap = Object.fromEntries(
    candidateProfiles?.map((p) => [p.profile_id, p]) ?? []
  );
  const userMap = Object.fromEntries(
    candidateUsers?.map((u) => [u.id, u]) ?? []
  );

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    reviewed: "bg-yellow-100 text-yellow-700",
    interview: "bg-purple-100 text-purple-700",
    offer: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    withdrawn: "bg-gray-100 text-gray-700",
  };

  return (
    <>
      <DashboardHeader
        title="All Applicants"
        subtitle={`${applications?.length ?? 0} total applications`}
      />
      <main className="max-w-4xl flex-1 p-6">
        {!applications?.length ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <p className="mb-3 text-4xl">👥</p>
            <p className="font-heading font-bold text-foreground mb-1">
              No applications yet
            </p>
            <p className="text-muted-foreground text-sm mb-5">
              Post a job to start receiving applications from Canadian
              candidates.
            </p>
            <Link
              href="/dashboard/employer/post-job"
              className="inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Post a Job
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {applications.map((app) => {
              const profile = profileMap[app.candidate_id];
              const candidateUser = userMap[app.candidate_id];
              return (
                <Link
                  key={app.id}
                  href={`/dashboard/employer/applicants/${app.id}`}
                  className="flex items-center justify-between p-5 transition-all hover:bg-muted/30"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-primary-foreground"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      {candidateUser?.full_name?.[0]?.toUpperCase() ?? "?"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {candidateUser?.full_name ?? "Candidate"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {jobTitleMap[app.job_id] ?? "Job"}{" "}
                        {profile?.years_experience
                          ? `· ${profile.years_experience} yrs`
                          : ""}{" "}
                        {profile?.skills?.slice(0, 2).join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-3">
                    {app.ai_match_score != null && (
                      <span className="text-xs font-medium text-primary">
                        {app.ai_match_score}% match
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusColors[app.status] ?? "bg-muted text-muted-foreground"}`}
                    >
                      {app.status}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
