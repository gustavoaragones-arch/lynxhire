import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { ApplicationStatusManager } from "@/components/dashboard/application-status-manager";
import Link from "next/link";
import {
  FileText,
  MapPin,
  GraduationCap,
  Briefcase,
  Link as LinkIcon,
  Mail,
} from "lucide-react";

interface JobPostingRow {
  id: string;
  title: string;
  profile_id: string;
  company_id: string;
}

export default async function ApplicantDetailPage({
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

  const { data: app } = await supabase
    .from("applications")
    .select(
      `
      id, status, created_at, cover_letter, ai_match_score, candidate_id,
      job_postings (id, title, profile_id, company_id)
    `
    )
    .eq("id", id)
    .single();

  if (!app) notFound();

  const jobPostings = app.job_postings;
  const job: JobPostingRow | null = Array.isArray(jobPostings)
    ? (jobPostings[0] as JobPostingRow) ?? null
    : (jobPostings as unknown as JobPostingRow | null);

  if (job?.profile_id !== user.id) redirect("/dashboard/employer/applicants");

  const { data: candidateProfile } = await supabase
    .from("candidate_profiles")
    .select(
      "profile_id, skills, years_experience, education_level, bio, resume_url, resume_filename, linkedin_url, portfolio_url, city, province, work_authorization"
    )
    .eq("profile_id", app.candidate_id)
    .single();

  const { data: candidateUser } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", app.candidate_id)
    .single();

  const workAuthLabels: Record<string, string> = {
    citizen: "🇨🇦 Canadian Citizen",
    permanent_resident: "🍁 Permanent Resident",
    open_work_permit: "📋 Open Work Permit",
    employer_specific_permit: "📄 Employer-Specific Permit",
    student_visa: "🎓 Student Visa",
    other: "🌐 Other",
  };

  const educationLabels: Record<string, string> = {
    high_school: "High School / GED",
    some_college: "Some College",
    diploma: "College Diploma",
    bachelors: "Bachelor's Degree",
    masters: "Master's Degree",
    phd: "PhD / Doctorate",
    trade: "Trade / Apprenticeship",
  };

  return (
    <>
      <DashboardHeader
        title={candidateUser?.full_name ?? "Applicant"}
        subtitle={`Applied to ${job?.title} · ${new Date(app.created_at).toLocaleDateString("en-CA")}`}
      />

      <main className="max-w-4xl flex-1 p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: Candidate info */}
          <div className="space-y-5 lg:col-span-2">
            {app.ai_match_score !== null && (
              <div
                className="flex items-center gap-5 rounded-2xl border bg-card p-5"
                style={{
                  borderColor:
                    app.ai_match_score >= 70
                      ? "var(--primary)"
                      : "var(--border)",
                }}
              >
                <div className="relative h-16 w-16 flex-shrink-0">
                  <svg
                    viewBox="0 0 36 36"
                    className="h-16 w-16 -rotate-90"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9"
                      fill="none"
                      stroke="var(--border)"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="3"
                      strokeDasharray={`${app.ai_match_score} 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-foreground">
                      {app.ai_match_score}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground">
                    AI Match Score
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {app.ai_match_score >= 80
                      ? "Excellent match — highly recommended"
                      : app.ai_match_score >= 60
                        ? "Good match — worth reviewing"
                        : "Partial match — review carefully"}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
              <h2 className="font-heading font-bold text-foreground">
                Candidate Profile
              </h2>

              <div className="grid grid-cols-2 gap-4 text-sm">
                {(candidateProfile?.city || candidateProfile?.province) && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={14} />
                    <span>
                      {[candidateProfile.city, candidateProfile.province]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>
                )}
                {candidateProfile?.years_experience != null && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase size={14} />
                    <span>
                      {candidateProfile.years_experience} years experience
                    </span>
                  </div>
                )}
                {candidateProfile?.education_level && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GraduationCap size={14} />
                    <span>
                      {educationLabels[candidateProfile.education_level] ??
                        candidateProfile.education_level}
                    </span>
                  </div>
                )}
                {candidateProfile?.work_authorization && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>
                      {workAuthLabels[candidateProfile.work_authorization] ??
                        candidateProfile.work_authorization}
                    </span>
                  </div>
                )}
              </div>

              {candidateProfile?.bio && (
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Bio
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">
                    {candidateProfile.bio}
                  </p>
                </div>
              )}

              {candidateProfile?.skills && candidateProfile.skills.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {candidateProfile.skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="rounded-full bg-muted px-2.5 py-1 text-xs text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {candidateProfile?.resume_url && (
                  <a
                    href={candidateProfile.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/40"
                  >
                    <FileText size={12} /> Resume
                  </a>
                )}
                {candidateProfile?.linkedin_url && (
                  <a
                    href={candidateProfile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/40"
                  >
                    <LinkIcon size={12} /> LinkedIn
                  </a>
                )}
                {candidateProfile?.portfolio_url && (
                  <a
                    href={candidateProfile.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/40"
                  >
                    <LinkIcon size={12} /> Portfolio
                  </a>
                )}
                {candidateUser?.email && (
                  <a
                    href={`mailto:${candidateUser.email}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/40"
                  >
                    <Mail size={12} /> Email
                  </a>
                )}
              </div>
            </div>

            {app.cover_letter && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-heading font-bold text-foreground mb-3">
                  Cover Letter
                </h2>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                  {app.cover_letter}
                </p>
              </div>
            )}
          </div>

          {/* Right: Status management */}
          <div className="space-y-4">
            <ApplicationStatusManager
              applicationId={app.id}
              jobId={job?.id ?? ""}
              currentStatus={app.status}
            />

            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Quick Actions
              </p>
              <div className="space-y-2">
                <Link
                  href={`/dashboard/employer/jobs/${job?.id}`}
                  className="block w-full rounded-lg border border-border py-2 text-center text-xs font-medium text-foreground transition-all hover:border-primary/40"
                >
                  ← Back to Job
                </Link>
                <Link
                  href="/dashboard/employer/applicants"
                  className="block w-full rounded-lg border border-border py-2 text-center text-xs font-medium text-foreground transition-all hover:border-primary/40"
                >
                  All Applicants
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
