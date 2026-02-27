"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  X,
} from "lucide-react";
import Link from "next/link";

const LOCATION_TYPES = ["all", "remote", "hybrid", "in-person"] as const;
const WORK_TYPES = [
  "all",
  "full-time",
  "part-time",
  "contract",
  "internship",
] as const;
const EXPERIENCE_LEVELS = [
  "all",
  "entry",
  "mid",
  "senior",
  "lead",
  "executive",
] as const;

interface Job {
  id: string;
  title: string;
  work_type: string;
  location_type: string;
  city: string | null;
  province: string | null;
  salary_min: number | null;
  salary_max: number | null;
  experience_level: string;
  skills_required: string[];
  created_at: string;
  companies:
    | { name: string; logo_url: string | null }
    | { name: string; logo_url: string | null }[]
    | null;
}

export function BrowseJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [userId, setUserId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [locationType, setLocationType] = useState<string>("all");
  const [workType, setWorkType] = useState<string>("all");
  const [experienceLevel, setExperienceLevel] = useState<string>("all");

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();

    let query = supabase
      .from("job_postings")
      .select(
        "id, title, work_type, location_type, city, province, salary_min, salary_max, experience_level, skills_required, created_at, companies(name, logo_url)"
      )
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(50);

    if (locationType !== "all")
      query = query.eq("location_type", locationType);
    if (workType !== "all") query = query.eq("work_type", workType);
    if (experienceLevel !== "all")
      query = query.eq("experience_level", experienceLevel);
    if (search.trim()) query = query.ilike("title", `%${search.trim()}%`);

    const { data } = await query;
    setJobs((data as unknown as Job[]) ?? []);
    setLoading(false);
  }, [search, locationType, workType, experienceLevel]);

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data: saved } = await supabase
          .from("saved_jobs")
          .select("job_id")
          .eq("candidate_id", user.id);
        setSavedIds(new Set(saved?.map((s) => s.job_id) ?? []));
      }
    };
    init();
    fetchJobs();
  }, [fetchJobs]);

  async function toggleSave(jobId: string) {
    if (!userId) return;
    const supabase = createClient();
    const isSaved = savedIds.has(jobId);
    if (isSaved) {
      await supabase
        .from("saved_jobs")
        .delete()
        .eq("candidate_id", userId)
        .eq("job_id", jobId);
      setSavedIds((prev) => {
        const n = new Set(prev);
        n.delete(jobId);
        return n;
      });
    } else {
      await supabase
        .from("saved_jobs")
        .insert({ candidate_id: userId, job_id: jobId });
      setSavedIds((prev) => new Set([...prev, jobId]));
    }
  }

  function clearFilters() {
    setSearch("");
    setLocationType("all");
    setWorkType("all");
    setExperienceLevel("all");
  }

  const hasFilters =
    search ||
    locationType !== "all" ||
    workType !== "all" ||
    experienceLevel !== "all";

  const filterButtonClass = (active: boolean) =>
    `rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
      active
        ? "border-primary bg-primary/10 text-primary"
        : "border-border bg-background text-muted-foreground hover:border-primary/40"
    }`;

  return (
    <main className="flex-1 space-y-5 p-6">
      {/* Search + Filters */}
      <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search job titles..."
            className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-20 flex-shrink-0 text-xs text-muted-foreground">
              Location:
            </span>
            {LOCATION_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setLocationType(t)}
                className={filterButtonClass(locationType === t)}
              >
                {t === "all" ? "Any" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-20 flex-shrink-0 text-xs text-muted-foreground">
              Work Type:
            </span>
            {WORK_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setWorkType(t)}
                className={filterButtonClass(workType === t)}
              >
                {t === "all" ? "Any" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-20 flex-shrink-0 text-xs text-muted-foreground">
              Experience:
            </span>
            {EXPERIENCE_LEVELS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setExperienceLevel(l)}
                className={filterButtonClass(experienceLevel === l)}
              >
                {l === "all" ? "Any" : l.charAt(0).toUpperCase() + l.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-xs text-muted-foreground transition-all hover:text-foreground"
          >
            <X size={12} /> Clear all filters
          </button>
        )}
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {loading ? "Loading..." : `${jobs.length} jobs found`}
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-border bg-card p-5"
            >
              <div className="mb-2 h-4 w-1/3 rounded bg-muted" />
              <div className="h-3 w-1/4 rounded bg-muted" />
            </div>
          ))}
        </div>
      ) : !jobs.length ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center">
          <p className="mb-2 text-3xl">🔍</p>
          <p className="font-heading font-bold text-foreground mb-1">
            No jobs found
          </p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or check back soon.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => {
            const company = Array.isArray(job.companies)
              ? job.companies[0]
              : job.companies;
            const isSaved = savedIds.has(job.id);
            return (
              <div
                key={job.id}
                className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted text-sm font-bold text-muted-foreground">
                        {company?.logo_url ? (
                          <img
                            src={company.logo_url}
                            alt={company.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          (company?.name?.[0] ?? "?").toUpperCase()
                        )}
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="font-heading text-base font-bold text-foreground transition-colors hover:text-primary"
                        >
                          {job.title}
                        </Link>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {company?.name ?? "Company"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.location_type && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Briefcase size={11} /> {job.work_type}
                        </span>
                      )}
                      {(job.city || job.province) && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin size={11} />{" "}
                          {[job.city, job.province].filter(Boolean).join(", ")}
                        </span>
                      )}
                      {job.location_type !== "in-person" && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs capitalize text-primary">
                          {job.location_type}
                        </span>
                      )}
                      {(job.salary_min || job.salary_max) && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <DollarSign size={11} />
                          CAD $
                          {job.salary_min?.toLocaleString() ?? "?"}
                          {job.salary_max
                            ? `–$${job.salary_max.toLocaleString()}`
                            : "+"}
                        </span>
                      )}
                    </div>

                    {job.skills_required?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {job.skills_required.slice(0, 5).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills_required.length > 5 && (
                          <span className="text-xs text-muted-foreground">
                            +{job.skills_required.length - 5} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-shrink-0 flex-col items-end gap-2">
                    <button
                      type="button"
                      onClick={() => toggleSave(job.id)}
                      className="rounded-lg border border-border transition-all hover:border-primary/40"
                      title={isSaved ? "Unsave" : "Save job"}
                    >
                      <span className="flex p-2">
                        {isSaved ? (
                          <BookmarkCheck
                            size={16}
                            style={{ color: "var(--primary)" }}
                          />
                        ) : (
                          <Bookmark
                            size={16}
                            className="text-muted-foreground"
                          />
                        )}
                      </span>
                    </button>
                    <Link
                      href={`/jobs/${job.id}`}
                      className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90"
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
