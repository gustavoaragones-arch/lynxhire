import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ApplyButton } from "@/components/jobs/apply-button";
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Building2,
} from "lucide-react";

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: job } = await supabase
    .from("job_postings")
    .select(
      "*, companies(name, logo_url, website, description, industry, size)"
    )
    .eq("id", id)
    .eq("status", "active")
    .single();

  if (!job) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let existingApplication: { id: string; status: string } | null = null;
  let candidateProfile: { resume_url: string | null } | null = null;

  if (user) {
    const [
      { data: app },
      { data: cp },
    ] = await Promise.all([
      supabase
        .from("applications")
        .select("id, status")
        .eq("job_id", id)
        .eq("candidate_id", user.id)
        .maybeSingle(),
      supabase
        .from("candidate_profiles")
        .select("resume_url")
        .eq("profile_id", user.id)
        .maybeSingle(),
    ]);
    existingApplication = app ?? null;
    candidateProfile = cp ?? null;
  }

  const companies = job.companies;
  const company =
    companies != null && !Array.isArray(companies)
      ? companies
      : Array.isArray(companies)
        ? companies[0]
        : null;

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link
          href="/jobs"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to jobs
        </Link>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-muted text-xl font-bold text-muted-foreground">
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
            <div className="flex-1">
              <h1 className="font-heading text-2xl font-bold text-foreground">
                {job.title}
              </h1>
              <p className="mt-0.5 text-muted-foreground">{company?.name}</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {job.work_type && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Briefcase size={13} /> {job.work_type}
                  </span>
                )}
                {(job.city || job.province) && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin size={13} />{" "}
                    {[job.city, job.province].filter(Boolean).join(", ")}
                  </span>
                )}
                {job.location_type !== "in-person" && (
                  <span className="inline-flex items-center gap-1.5 text-sm capitalize text-primary">
                    <Clock size={13} /> {job.location_type}
                  </span>
                )}
                {(job.salary_min || job.salary_max) && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <DollarSign size={13} />
                    CAD $
                    {job.salary_min?.toLocaleString() ?? "?"}
                    {job.salary_max
                      ? `–$${job.salary_max.toLocaleString()}`
                      : "+"}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-border pt-5">
            <ApplyButton
              jobId={job.id}
              userId={user?.id ?? null}
              existingApplicationId={existingApplication?.id ?? null}
              existingStatus={existingApplication?.status ?? null}
              resumeUrl={candidateProfile?.resume_url ?? null}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-heading font-bold text-foreground mb-4">
            About this role
          </h2>
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {job.description}
          </div>

          {job.requirements && (
            <>
              <h3 className="font-heading font-semibold text-foreground mt-6 mb-3">
                Requirements
              </h3>
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {job.requirements}
              </div>
            </>
          )}

          {job.nice_to_have && (
            <>
              <h3 className="font-heading font-semibold text-foreground mt-6 mb-3">
                Nice to Have
              </h3>
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {job.nice_to_have}
              </div>
            </>
          )}

          {job.skills_required?.length > 0 && (
            <>
              <h3 className="font-heading font-semibold text-foreground mt-6 mb-3">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.skills_required.map((skill: string) => (
                  <span
                    key={skill}
                    className="rounded-full bg-muted px-3 py-1 text-sm text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {company && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 flex items-center gap-2">
              <Building2 size={16} className="text-muted-foreground" />
              <h2 className="font-heading font-bold text-foreground">
                About {company.name}
              </h2>
            </div>
            {company.description && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {company.description}
              </p>
            )}
            <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
              {company.industry && <span>🏢 {company.industry}</span>}
              {company.size && (
                <span>👥 {company.size} employees</span>
              )}
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  🌐 Website
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
