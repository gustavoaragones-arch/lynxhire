import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import Link from "next/link";
import { MapPin, Briefcase, DollarSign } from "lucide-react";

export default async function SavedJobsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: savedJobs } = await supabase
    .from("saved_jobs")
    .select(
      `
      id, created_at,
      job_postings (
        id, title, work_type, location_type, city, province,
        salary_min, salary_max, status, skills_required,
        companies (name, logo_url)
      )
    `
    )
    .eq("candidate_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <>
      <DashboardHeader
        title="Saved Jobs"
        subtitle={`${savedJobs?.length ?? 0} jobs saved`}
      />
      <main className="max-w-3xl flex-1 p-6">
        {!savedJobs?.length ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <p className="mb-3 text-4xl">🔖</p>
            <p className="font-heading font-bold text-foreground mb-1">
              No saved jobs yet
            </p>
            <p className="text-muted-foreground text-sm mb-5">
              Save jobs you&apos;re interested in and apply when you&apos;re
              ready.
            </p>
            <Link
              href="/dashboard/candidate/browse"
              className="inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {savedJobs.map((saved) => {
              const jobPostings = saved.job_postings;
              const job = Array.isArray(jobPostings)
                ? jobPostings[0]
                : jobPostings;
              const companies = job?.companies;
              const company = Array.isArray(companies)
                ? companies[0]
                : companies;
              if (!job || job.status !== "active") return null;
              const jobData = job as {
                id: string;
                title: string;
                work_type?: string;
                location_type?: string;
                city?: string | null;
                province?: string | null;
                salary_min?: number | null;
              };
              const companyData = company as {
                name?: string;
                logo_url?: string | null;
              } | null;
              return (
                <div
                  key={saved.id}
                  className="rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted text-sm font-bold text-muted-foreground">
                      {companyData?.logo_url ? (
                        <img
                          src={companyData.logo_url}
                          alt={companyData.name ?? ""}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        companyData?.name?.[0]?.toUpperCase() ?? "?"
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/jobs/${jobData.id}`}
                        className="font-heading font-semibold text-foreground transition-colors hover:text-primary"
                      >
                        {jobData.title}
                      </Link>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {companyData?.name}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        {jobData.work_type && (
                          <span className="flex items-center gap-1">
                            <Briefcase size={11} /> {jobData.work_type}
                          </span>
                        )}
                        {(jobData.city || jobData.province) && (
                          <span className="flex items-center gap-1">
                            <MapPin size={11} />{" "}
                            {[jobData.city, jobData.province]
                              .filter(Boolean)
                              .join(", ")}
                          </span>
                        )}
                        {jobData.salary_min != null && (
                          <span className="flex items-center gap-1">
                            <DollarSign size={11} /> CAD $
                            {jobData.salary_min.toLocaleString()}+
                          </span>
                        )}
                        {jobData.location_type !== "in-person" && (
                          <span className="capitalize text-primary">
                            {jobData.location_type}
                          </span>
                        )}
                      </div>
                    </div>
                    <Link
                      href={`/jobs/${jobData.id}`}
                      className="flex-shrink-0 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90"
                    >
                      View →
                    </Link>
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
