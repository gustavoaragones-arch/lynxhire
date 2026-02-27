import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { MapPin, Briefcase } from "lucide-react";

export default async function PublicJobsPage() {
  const supabase = await createClient();
  const { data: jobs } = await supabase
    .from("job_postings")
    .select(
      "id, title, work_type, location_type, city, province, salary_min, salary_max, experience_level, created_at, companies(name, logo_url)"
    )
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            Jobs in Canada
          </h1>
          <p className="text-muted-foreground">
            {jobs?.length ?? 0} active positions
          </p>
        </div>

        {!jobs?.length ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <p className="mb-3 text-4xl">📋</p>
            <p className="font-heading font-bold text-foreground mb-1">
              No jobs posted yet
            </p>
            <p className="text-muted-foreground text-sm mb-5">
              Be the first employer to post on LynxHire.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Post a Job
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => {
              const company = Array.isArray(job.companies)
                ? job.companies[0]
                : job.companies;
              return (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="block rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30"
                >
                  <div className="flex items-center gap-3">
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
                    <div className="min-w-0 flex-1">
                      <p className="font-heading font-semibold text-foreground">
                        {job.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {company?.name}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs capitalize text-primary">
                        {job.location_type}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                    {job.work_type && (
                      <span className="flex items-center gap-1">
                        <Briefcase size={11} /> {job.work_type}
                      </span>
                    )}
                    {(job.city || job.province) && (
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />{" "}
                        {[job.city, job.province].filter(Boolean).join(", ")}
                      </span>
                    )}
                    {job.salary_min && (
                      <span>
                        CAD ${job.salary_min.toLocaleString()}+
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
