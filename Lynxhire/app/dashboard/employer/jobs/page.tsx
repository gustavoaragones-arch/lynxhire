import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import Link from "next/link";

export default async function MyJobsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: jobs } = await supabase
    .from("job_postings")
    .select(
      "id, title, status, work_type, location_type, city, province, applications_count, created_at, expires_at, salary_min, salary_max"
    )
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false });

  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    paused: "bg-yellow-100 text-yellow-700",
    expired: "bg-red-100 text-red-700",
    draft: "bg-gray-100 text-gray-700",
  };

  return (
    <>
      <DashboardHeader
        title="My Jobs"
        subtitle="Manage your job postings"
      />
      <main className="max-w-4xl flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {jobs?.length ?? 0} total postings
          </p>
          <Link
            href="/dashboard/employer/post-job"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            + Post New Job
          </Link>
        </div>

        {!jobs?.length ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <p className="mb-3 text-4xl">📋</p>
            <p className="font-heading font-bold text-foreground mb-1">
              No job postings yet
            </p>
            <p className="text-muted-foreground text-sm mb-5">
              Post your first job and start receiving applications from top
              Canadian candidates.
            </p>
            <Link
              href="/dashboard/employer/post-job"
              className="inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Post Your First Job
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/dashboard/employer/jobs/${job.id}`}
                className="flex items-center justify-between p-5 transition-all hover:bg-muted/30"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-foreground">
                      {job.title}
                    </p>
                    <span
                      className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[job.status]}`}
                    >
                      {job.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {[job.location_type, job.city, job.province]
                      .filter(Boolean)
                      .join(" · ")}
                    {job.salary_min &&
                      ` · CAD $${job.salary_min.toLocaleString()}+`}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 text-right">
                  <p className="text-sm font-bold text-foreground">
                    {job.applications_count ?? 0}
                  </p>
                  <p className="text-xs text-muted-foreground">applicants</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
