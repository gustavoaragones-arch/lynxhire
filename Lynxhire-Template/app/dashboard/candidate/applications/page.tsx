import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import Link from "next/link";

export default async function ApplicationsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: applications } = await supabase
    .from("applications")
    .select(
      `
      id, status, created_at, cover_letter, ai_match_score,
      job_postings (id, title, location_type, city, province, salary_min, salary_max,
        companies (name, logo_url)
      )
    `
    )
    .eq("candidate_id", user.id)
    .order("created_at", { ascending: false });

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    reviewed: "bg-yellow-100 text-yellow-700",
    interview: "bg-purple-100 text-purple-700",
    offer: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    withdrawn: "bg-gray-100 text-gray-700",
  };

  const statusLabel: Record<string, string> = {
    new: "Applied",
    reviewed: "Under Review",
    interview: "Interview",
    offer: "🎉 Offer",
    rejected: "Not Selected",
    withdrawn: "Withdrawn",
  };

  return (
    <>
      <DashboardHeader
        title="My Applications"
        subtitle={`${applications?.length ?? 0} applications total`}
      />
      <main className="max-w-3xl flex-1 p-6">
        {!applications?.length ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <p className="mb-3 text-4xl">📭</p>
            <p className="font-heading font-bold text-foreground mb-1">
              No applications yet
            </p>
            <p className="text-muted-foreground text-sm mb-5">
              Start applying to jobs to track your progress here.
            </p>
            <Link
              href="/dashboard/candidate/browse"
              className="inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {applications.map((app) => {
              const job = Array.isArray(app.job_postings)
                ? app.job_postings[0]
                : app.job_postings;
              const company = Array.isArray(job?.companies)
                ? job?.companies[0]
                : job?.companies;
              return (
                <div key={app.id} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted text-sm font-bold text-muted-foreground">
                        {company?.logo_url ? (
                          <img
                            src={company.logo_url}
                            alt={company.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          company?.name?.[0]?.toUpperCase() ?? "?"
                        )}
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/jobs/${job?.id}`}
                          className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                        >
                          {job?.title ?? "Job"}
                        </Link>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {company?.name}{" "}
                          {job?.city ? `· ${job.city}` : ""}{" "}
                          {job?.location_type !== "in-person"
                            ? `· ${job?.location_type}`
                            : ""}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Applied{" "}
                          {new Date(app.created_at).toLocaleDateString(
                            "en-CA",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[app.status] ?? "bg-muted text-muted-foreground"}`}
                    >
                      {statusLabel[app.status] ?? app.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
