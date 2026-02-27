import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import Link from "next/link";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: job } = await supabase
    .from("job_postings")
    .select("*, companies(name, logo_url)")
    .eq("id", id)
    .eq("profile_id", user.id)
    .single();

  if (!job) notFound();

  const { data: applications } = await supabase
    .from("applications")
    .select("id, status, created_at, ai_match_score, candidate_id")
    .eq("job_id", id)
    .order("ai_match_score", { ascending: false });

  const candidateIds =
    applications?.map((a) => a.candidate_id).filter(Boolean) ?? [];
  const { data: candidateProfiles } =
    candidateIds.length > 0
      ? await supabase
          .from("candidate_profiles")
          .select("profile_id, skills, years_experience, education_level")
          .in("profile_id", candidateIds)
      : { data: [] };

  const profileIds = candidateIds.length > 0 ? candidateIds : [];
  const { data: profiles } =
    profileIds.length > 0
      ? await supabase
          .from("profiles")
          .select("id, full_name, email")
          .in("id", profileIds)
      : { data: [] };

  const profileMap = new Map(
    profiles?.map((p) => [p.id, p]) ?? []
  );
  const candidateProfileMap = new Map(
    candidateProfiles?.map((cp) => [cp.profile_id, cp]) ?? []
  );

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    reviewed: "bg-yellow-100 text-yellow-700",
    interview: "bg-purple-100 text-purple-700",
    offer: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <>
      <DashboardHeader
        title={job.title}
        subtitle={`${applications?.length ?? 0} applicants · ${job.status}`}
      />

      <main className="max-w-4xl flex-1 space-y-6 p-6">
        {/* Job meta */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                {[
                  job.work_type,
                  job.location_type,
                  job.province,
                  job.experience_level,
                ]
                  .filter(Boolean)
                  .map((tag) => (
                    <span
                      key={String(tag)}
                      className="rounded-full bg-muted px-2.5 py-1 text-xs capitalize text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              {(job.salary_min || job.salary_max) && (
                <p className="text-sm font-medium text-foreground">
                  CAD $
                  {job.salary_min?.toLocaleString() ?? "—"} – $
                  {job.salary_max?.toLocaleString() ?? "—"}/year
                </p>
              )}
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusColors[job.status] ?? "bg-muted text-muted-foreground"}`}
            >
              {job.status}
            </span>
          </div>

          <div className="prose prose-sm max-w-none text-foreground">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              {job.description}
            </p>
          </div>
        </div>

        {/* Applicants */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-heading font-bold text-foreground mb-5">
            Applicants ({applications?.length ?? 0})
          </h2>

          {!applications?.length ? (
            <div className="py-10 text-center">
              <p className="mb-2 text-3xl">📭</p>
              <p className="text-sm text-muted-foreground">
                No applications yet. Share your job posting to get candidates!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => {
                const userProfile = profileMap.get(app.candidate_id);
                const candidateProfile = candidateProfileMap.get(
                  app.candidate_id
                );
                const skills = candidateProfile?.skills;
                const skillsPreview = Array.isArray(skills)
                  ? skills.slice(0, 3).join(", ")
                  : "";
                return (
                  <Link
                    key={app.id}
                    href={`/dashboard/employer/applicants/${app.id}`}
                    className="flex items-center justify-between rounded-xl border border-border p-4 transition-all hover:border-primary/40 hover:bg-primary/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {userProfile?.full_name?.[0]?.toUpperCase() ?? "?"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {userProfile?.full_name ?? "Candidate"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {candidateProfile?.years_experience
                            ? `${candidateProfile.years_experience} yrs exp`
                            : ""}
                          {skillsPreview ? ` · ${skillsPreview}` : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {app.ai_match_score != null && (
                        <div className="text-center">
                          <p className="text-sm font-bold text-primary">
                            {app.ai_match_score}%
                          </p>
                          <p className="text-xs text-muted-foreground">
                            match
                          </p>
                        </div>
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
        </div>
      </main>
    </>
  );
}
