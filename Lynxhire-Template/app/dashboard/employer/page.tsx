import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { StatCard } from "@/components/dashboard/stat-card";
import Link from "next/link";

export default async function EmployerDashboard() {
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

  const { data: company } = await supabase
    .from("companies")
    .select("name, logo_url, industry, size")
    .eq("profile_id", user.id)
    .single();

  const { count: activeJobsCount } = await supabase
    .from("job_postings")
    .select("*", { count: "exact", head: true })
    .eq("profile_id", user.id)
    .eq("status", "active");

  // Get employer's job IDs first, then count applications
  const { data: employerJobs } = await supabase
    .from("job_postings")
    .select("id")
    .eq("profile_id", user.id);

  const jobIds = employerJobs?.map((j) => j.id) ?? [];

  const { count: totalApplicationsCount } =
    jobIds.length > 0
      ? await supabase
          .from("applications")
          .select("*", { count: "exact", head: true })
          .in("job_id", jobIds)
      : { count: 0 };

  const { data: recentJobs } = await supabase
    .from("job_postings")
    .select(
      "id, title, status, applications_count, created_at, location_type, city"
    )
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const firstName = profile?.full_name?.split(" ")[0] ?? "there";

  const statusBadge: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    paused: "bg-yellow-100 text-yellow-700",
    expired: "bg-red-100 text-red-700",
    draft: "bg-gray-100 text-gray-700",
  };

  return (
    <>
      <DashboardHeader
        title={`${company?.name ?? "Your Company"} Dashboard`}
        subtitle={`Welcome back, ${firstName}`}
      />

      <main className="flex-1 space-y-6 p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon="📋"
            label="Active Job Postings"
            value={activeJobsCount ?? 0}
            accent
          />
          <StatCard
            icon="👥"
            label="Total Applications"
            value={totalApplicationsCount ?? 0}
          />
          <StatCard icon="⏱️" label="Avg. Time to Hire" value="—" />
          <StatCard icon="⭐" label="Match Quality" value="—" />
        </div>

        {/* No jobs CTA */}
        {!activeJobsCount && (
          <div className="flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/10 p-6">
            <div>
              <p className="font-medium text-foreground">
                Post your first job to start receiving applications
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                LynxHire AI will match your posting with top candidates.
              </p>
            </div>
            <Link
              href="/dashboard/employer/post-job"
              className="ml-4 whitespace-nowrap rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Post a Job →
            </Link>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Jobs */}
          <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-heading font-bold text-foreground">
                Active Postings
              </h2>
              <Link
                href="/dashboard/employer/jobs"
                className="text-xs text-primary hover:underline"
              >
                View all
              </Link>
            </div>

            {!recentJobs?.length ? (
              <div className="py-10 text-center">
                <p className="mb-2 text-3xl">📝</p>
                <p className="text-sm text-muted-foreground">
                  No job postings yet
                </p>
                <Link
                  href="/dashboard/employer/post-job"
                  className="mt-3 inline-block rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90"
                >
                  Post Your First Job
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentJobs.map(
                  (job: {
                    id: string;
                    title: string;
                    status: string;
                    location_type?: string;
                    city?: string | null;
                    applications_count?: number;
                  }) => (
                    <Link
                      key={job.id}
                      href={`/dashboard/employer/jobs/${job.id}`}
                      className="-mx-2 flex items-center justify-between rounded-lg border-b border-border py-3 px-2 transition-all last:border-0 hover:bg-muted/30"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {job.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {job.location_type}{" "}
                          {job.city ? `· ${job.city}` : ""} ·{" "}
                          {job.applications_count ?? 0} applicants
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusBadge[job.status] ?? "bg-muted text-muted-foreground"}`}
                      >
                        {job.status}
                      </span>
                    </Link>
                  )
                )}
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
                  label: "Post a New Job",
                  href: "/dashboard/employer/post-job",
                  icon: "➕",
                },
                {
                  label: "View All Applicants",
                  href: "/dashboard/employer/applicants",
                  icon: "👥",
                },
                {
                  label: "Company Settings",
                  href: "/dashboard/employer/settings",
                  icon: "🏢",
                },
                {
                  label: "Manage Billing",
                  href: "/dashboard/employer/billing",
                  icon: "💳",
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

            {/* Plan badge */}
            <div className="mt-6 rounded-xl bg-muted p-4">
              <p className="text-xs text-muted-foreground">Current Plan</p>
              <p className="font-heading font-bold text-foreground mt-0.5">
                Free
              </p>
              <Link
                href="/dashboard/employer/billing"
                className="mt-1 block text-xs text-primary hover:underline"
              >
                Upgrade →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
