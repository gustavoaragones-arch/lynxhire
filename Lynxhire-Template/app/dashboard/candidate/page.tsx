import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { StatCard } from "@/components/dashboard/stat-card";
import Link from "next/link";

export default async function CandidateDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const { data: candidateProfile } = await supabase
    .from("candidate_profiles")
    .select("skills, work_authorization")
    .eq("profile_id", user.id)
    .single();

  const { count: applicationCount } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true })
    .eq("candidate_id", user.id);

  const { count: savedCount } = await supabase
    .from("saved_jobs")
    .select("*", { count: "exact", head: true })
    .eq("candidate_id", user.id);

  const { data: recentApplications } = await supabase
    .from("applications")
    .select(
      `
      id, status, created_at,
      job_postings (title, companies (name, logo_url))
    `
    )
    .eq("candidate_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const firstName = profile?.full_name?.split(" ")[0] ?? "there";

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
        title={`Welcome back, ${firstName} 👋`}
        subtitle="Here's what's happening with your job search"
      />

      <main className="flex-1 space-y-6 p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon="📋"
            label="Applications Sent"
            value={applicationCount ?? 0}
          />
          <StatCard icon="🔖" label="Saved Jobs" value={savedCount ?? 0} />
          <StatCard icon="🎯" label="Profile Views" value="—" />
          <StatCard icon="💬" label="Messages" value="0" accent />
        </div>

        {/* Profile completeness */}
        {!candidateProfile?.skills?.length && (
          <div className="flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/10 p-5">
            <div>
              <p className="text-sm font-medium text-foreground">
                Complete your profile to get better matches
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Add skills, experience, and a resume to unlock AI matching.
              </p>
            </div>
            <Link
              href="/dashboard/candidate/profile"
              className="ml-4 whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Complete Profile
            </Link>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Applications */}
          <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-heading font-bold text-foreground">
                Recent Applications
              </h2>
              <Link
                href="/dashboard/candidate/applications"
                className="text-xs text-primary hover:underline"
              >
                View all
              </Link>
            </div>

            {!recentApplications?.length ? (
              <div className="py-10 text-center">
                <p className="mb-2 text-3xl">📭</p>
                <p className="text-sm text-muted-foreground">
                  No applications yet
                </p>
                <Link
                  href="/dashboard/candidate/browse"
                  className="mt-3 inline-block rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90"
                >
                  Browse Jobs
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentApplications.map((app) => {
                  const job = Array.isArray(app.job_postings)
                    ? app.job_postings[0]
                    : app.job_postings;
                  const companies = job?.companies;
                  const companyName =
                    companies != null && !Array.isArray(companies)
                      ? (companies as { name?: string }).name
                      : Array.isArray(companies) && companies[0]
                        ? (companies[0] as { name?: string }).name
                        : undefined;
                  return (
                    <div
                      key={app.id}
                      className="flex items-center justify-between border-b border-border py-3 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {(job as { title?: string } | undefined)?.title ??
                            "Job"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {companyName ?? "—"}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusColors[app.status] ?? "bg-muted text-muted-foreground"}`}
                      >
                        {app.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading font-bold text-foreground mb-5">
              Quick Actions
            </h2>
            <div className="space-y-2">
              {[
                {
                  label: "Browse New Jobs",
                  href: "/dashboard/candidate/browse",
                  icon: "🔍",
                },
                {
                  label: "Update Profile",
                  href: "/dashboard/candidate/profile",
                  icon: "✏️",
                },
                {
                  label: "View Saved Jobs",
                  href: "/dashboard/candidate/saved",
                  icon: "🔖",
                },
                {
                  label: "Check Messages",
                  href: "/dashboard/candidate/messages",
                  icon: "💬",
                },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 rounded-xl border border-border p-3 transition-all hover:border-primary/40 hover:bg-primary/5"
                >
                  <span className="text-lg">{action.icon}</span>
                  <span className="text-sm font-medium text-foreground">
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
