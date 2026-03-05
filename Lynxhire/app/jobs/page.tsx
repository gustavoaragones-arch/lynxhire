// STYLE RULE: Never invent new styles. Always copy from existing template components.
// Buttons: bg-neutral-900 text-white rounded-full (primary) | border border-neutral-200 rounded-full (secondary)
// Orange: #FF6B2B only
// Badge/pill: border border-neutral-200 text-neutral-500 text-xs rounded-full px-4 py-1.5
// Cards: bg-white border border-neutral-100 rounded-2xl shadow-sm
// Body text: text-neutral-500
// Headings: font-bold text-neutral-900
// Page hero top padding: pt-36 minimum (fixed navbar clearance)

import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Briefcase } from "lucide-react";

export const metadata = {
  title: "Browse Jobs in Canada — Skills-Based Matching | LynxHire",
  description:
    "Canadian workforce optimization: find jobs with skills-based matching software. PIPEDA compliant job board for skilled trades, qualified talent acquisition Canada. Updated daily.",
  keywords: ["jobs Canada", "skills-based matching software", "Canadian workforce optimization", "PIPEDA compliant job board", "skilled trades hiring platform", "qualified talent acquisition Canada"],
};

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
            Jobs in Canada — skills-based matching
          </h1>
          <p className="text-muted-foreground">
            {jobs?.length ?? 0} active positions · qualified talent acquisition Canada
          </p>
        </div>

        {!jobs?.length ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 mb-6">
              <Image src="/logo-icon.png" alt="LynxHire" width={64} height={64} className="w-full h-full object-contain opacity-30" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">No jobs posted yet</h3>
            <p className="text-neutral-500 text-sm mb-6">Be the first employer to post on LynxHire.</p>
            <Link href="/auth/signup"
              className="bg-neutral-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-neutral-800 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
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
