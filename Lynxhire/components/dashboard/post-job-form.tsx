"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Sparkles, Loader2 } from "lucide-react";

const CANADIAN_PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
];

const WORK_TYPES = ["full-time", "part-time", "contract", "internship"] as const;
const LOCATION_TYPES = ["in-person", "hybrid", "remote"] as const;
const EXPERIENCE_LEVELS = [
  "entry",
  "mid",
  "senior",
  "lead",
  "executive",
] as const;

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance & Banking",
  "Retail",
  "Hospitality & Tourism",
  "Education",
  "Construction",
  "Manufacturing",
  "Real Estate",
  "Legal",
  "Marketing & Advertising",
  "Non-Profit",
  "Government",
  "Transportation",
  "Other",
];

export function PostJobForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiBullets, setAiBullets] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    nice_to_have: "",
    skills_required: "" as string,
    work_type: "full-time" as (typeof WORK_TYPES)[number],
    location_type: "in-person" as (typeof LOCATION_TYPES)[number],
    city: "",
    province: "",
    salary_min: "",
    salary_max: "",
    experience_level: "mid" as (typeof EXPERIENCE_LEVELS)[number],
    industry: "",
  });

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function generateWithAI() {
    if (!form.title) {
      setError("Please enter a job title before generating.");
      return;
    }
    if (!aiBullets.trim()) {
      setError("Please enter some bullet points for the AI to expand.");
      return;
    }
    setAiLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/generate-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          bullets: aiBullets,
          workType: form.work_type,
          location: form.city || form.province,
          experienceLevel: form.experience_level,
          salaryMin: form.salary_min ? parseInt(form.salary_min, 10) : null,
          salaryMax: form.salary_max ? parseInt(form.salary_max, 10) : null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      set("description", data.description);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setAiLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.description || !form.industry) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/auth/login");
      return;
    }

    const { data: company } = await supabase
      .from("companies")
      .select("id")
      .eq("profile_id", user.id)
      .single();

    if (!company) {
      setError("Company profile not found. Please complete onboarding.");
      setLoading(false);
      return;
    }

    const skills = form.skills_required
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const slug = `${form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;

    const { data: job, error: insertError } = await supabase
      .from("job_postings")
      .insert({
        company_id: company.id,
        profile_id: user.id,
        title: form.title,
        slug,
        description: form.description,
        requirements: form.requirements || null,
        nice_to_have: form.nice_to_have || null,
        skills_required: skills,
        work_type: form.work_type,
        location_type: form.location_type,
        city: form.city || null,
        province: form.province || null,
        salary_min: form.salary_min ? parseInt(form.salary_min, 10) : null,
        salary_max: form.salary_max ? parseInt(form.salary_max, 10) : null,
        experience_level: form.experience_level,
        industry: form.industry,
        status: "active",
        ai_generated: !!aiBullets,
      })
      .select("id")
      .single();

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push(`/dashboard/employer/jobs/${job.id}`);
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40";
  const selectClass =
    "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40";
  const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

  return (
    <main className="max-w-3xl flex-1 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-5 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-heading font-bold text-foreground">
            Job Details
          </h2>

          <div>
            <label className={labelClass}>
              Job Title <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Senior Software Engineer"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Industry <span className="text-destructive">*</span>
              </label>
              <select
                required
                value={form.industry}
                onChange={(e) => set("industry", e.target.value)}
                className={selectClass}
              >
                <option value="">Select...</option>
                {INDUSTRIES.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Experience Level</label>
              <select
                value={form.experience_level}
                onChange={(e) => set("experience_level", e.target.value)}
                className={selectClass}
              >
                {EXPERIENCE_LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l.charAt(0).toUpperCase() + l.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Work Type</label>
              <select
                value={form.work_type}
                onChange={(e) => set("work_type", e.target.value)}
                className={selectClass}
              >
                {WORK_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Location Type</label>
              <select
                value={form.location_type}
                onChange={(e) => set("location_type", e.target.value)}
                className={selectClass}
              >
                {LOCATION_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Province</label>
              <select
                value={form.province}
                onChange={(e) => set("province", e.target.value)}
                className={selectClass}
              >
                <option value="">Any</option>
                {CANADIAN_PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>City</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              placeholder="e.g. Toronto"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Salary Min (CAD)</label>
              <input
                type="number"
                value={form.salary_min}
                onChange={(e) => set("salary_min", e.target.value)}
                placeholder="60000"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Salary Max (CAD)</label>
              <input
                type="number"
                value={form.salary_max}
                onChange={(e) => set("salary_max", e.target.value)}
                placeholder="90000"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Required Skills{" "}
              <span className="font-normal text-muted-foreground">
                (comma-separated)
              </span>
            </label>
            <input
              type="text"
              value={form.skills_required}
              onChange={(e) => set("skills_required", e.target.value)}
              placeholder="React, TypeScript, Node.js"
              className={inputClass}
            />
          </div>
        </div>

        {/* AI Description Generator */}
        <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Sparkles size={18} style={{ color: "var(--ai-highlight)" }} />
            <h2 className="font-heading font-bold text-foreground">
              AI Job Description
            </h2>
            <span
              className="rounded-full px-2 py-0.5 text-xs font-medium"
              style={{
                backgroundColor: "var(--ai-highlight)",
                color: "var(--sidebar-bg)",
              }}
            >
              Powered by Claude
            </span>
          </div>

          <div>
            <label className={labelClass}>
              Key points to include{" "}
              <span className="font-normal text-muted-foreground">
                (AI will expand these)
              </span>
            </label>
            <textarea
              value={aiBullets}
              onChange={(e) => setAiBullets(e.target.value)}
              rows={4}
              placeholder={`- Experience with distributed systems\n- Lead a team of 3-5 engineers\n- Work closely with product and design\n- Must know TypeScript and React`}
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="button"
            onClick={generateWithAI}
            disabled={aiLoading}
            className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all disabled:opacity-60"
            style={{
              backgroundColor: "var(--ai-highlight)",
              color: "var(--sidebar-bg)",
            }}
          >
            {aiLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Sparkles size={14} />
            )}
            {aiLoading ? "Generating..." : "Generate with AI"}
          </button>

          <div>
            <label className={labelClass}>
              Job Description <span className="text-destructive">*</span>
              <span className="ml-2 font-normal text-muted-foreground">
                (edit the AI output or write your own)
              </span>
            </label>
            <textarea
              required
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={10}
              placeholder="Describe the role, responsibilities, and ideal candidate..."
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        {/* Additional Sections */}
        <div className="space-y-5 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-heading font-bold text-foreground">
            Additional Details{" "}
            <span className="text-sm font-normal text-muted-foreground">
              (optional)
            </span>
          </h2>

          <div>
            <label className={labelClass}>
              Requirements / Qualifications
            </label>
            <textarea
              value={form.requirements}
              onChange={(e) => set("requirements", e.target.value)}
              rows={4}
              placeholder="Minimum 3 years of experience, Bachelor's degree in CS or related field..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className={labelClass}>Nice to Have</label>
            <textarea
              value={form.nice_to_have}
              onChange={(e) => set("nice_to_have", e.target.value)}
              rows={3}
              placeholder="Experience with GraphQL, contributions to open source..."
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        {error && (
          <p className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="flex gap-3 pb-6">
          <button
            type="button"
            onClick={() => router.push("/dashboard/employer/jobs")}
            className="flex-1 rounded-xl border border-border py-3 text-sm font-medium text-foreground transition-all hover:bg-card"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? "Publishing..." : "Publish Job Posting"}
          </button>
        </div>
      </form>
    </main>
  );
}
