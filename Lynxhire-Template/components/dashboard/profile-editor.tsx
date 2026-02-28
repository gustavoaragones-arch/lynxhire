"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

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

const POPULAR_SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "SQL",
  "Project Management",
  "Marketing",
  "Sales",
  "Customer Service",
  "Data Analysis",
  "Excel",
  "UX Design",
  "AWS",
  "Docker",
  "Figma",
];

interface InitialCandidate {
  city?: string | null;
  province?: string | null;
  bio?: string | null;
  skills?: string[] | null;
  linkedin_url?: string | null;
  portfolio_url?: string | null;
  resume_url?: string | null;
  resume_filename?: string | null;
}

interface Props {
  userId: string;
  initialProfile: { full_name: string; email: string };
  initialCandidate: InitialCandidate | null;
}

export function ProfileEditor({
  userId,
  initialProfile,
  initialCandidate,
}: Props) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingResume, setUploadingResume] = useState(false);

  const [fullName, setFullName] = useState(initialProfile.full_name);
  const [city, setCity] = useState(initialCandidate?.city ?? "");
  const [province, setProvince] = useState(initialCandidate?.province ?? "");
  const [bio, setBio] = useState(initialCandidate?.bio ?? "");
  const [skills, setSkills] = useState<string[]>(
    initialCandidate?.skills ?? []
  );
  const [skillInput, setSkillInput] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState(
    initialCandidate?.linkedin_url ?? ""
  );
  const [portfolioUrl, setPortfolioUrl] = useState(
    initialCandidate?.portfolio_url ?? ""
  );
  const [resumeUrl, setResumeUrl] = useState(
    initialCandidate?.resume_url ?? ""
  );
  const [resumeFilename, setResumeFilename] = useState(
    initialCandidate?.resume_filename ?? ""
  );

  function toggleSkill(skill: string) {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  }

  function addCustomSkill(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      const s = skillInput.trim();
      if (!skills.includes(s)) setSkills((prev) => [...prev, s]);
      setSkillInput("");
    }
  }

  async function handleResumeUpload(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      setError("Resume must be under 5MB.");
      return;
    }
    setUploadingResume(true);
    setError(null);
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `${userId}/resume.${ext ?? "pdf"}`;
    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(path, file, { upsert: true });
    if (uploadError) {
      setError("Upload failed. Please try again.");
      setUploadingResume(false);
      return;
    }
    const { data } = supabase.storage.from("resumes").getPublicUrl(path);
    setResumeUrl(data.publicUrl);
    setResumeFilename(file.name);
    setUploadingResume(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError(null);
    const supabase = createClient();

    const [
      { error: profileError },
      { error: candidateError },
    ] = await Promise.all([
      supabase.from("profiles").update({ full_name: fullName }).eq("id", userId),
      supabase.from("candidate_profiles").upsert(
        {
          profile_id: userId,
          city: city || null,
          province: province || null,
          bio: bio || null,
          skills,
          linkedin_url: linkedinUrl || null,
          portfolio_url: portfolioUrl || null,
          resume_url: resumeUrl || null,
          resume_filename: resumeFilename || null,
        },
        { onConflict: "profile_id" }
      ),
    ]);

    if (profileError || candidateError) {
      setError(
        (profileError ?? candidateError)?.message ?? "Save failed"
      );
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40";
  const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-heading font-bold text-foreground">
          Basic Information
        </h2>
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Toronto"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Province</label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className={inputClass}
            >
              <option value="">Select...</option>
              {CANADIAN_PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass}>
            Bio{" "}
            <span className="font-normal text-muted-foreground">
              (shown to employers)
            </span>
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            maxLength={500}
            placeholder="Brief summary of who you are and what you're looking for..."
            className={`${inputClass} resize-none`}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            {bio.length}/500
          </p>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-heading font-bold text-foreground">Skills</h2>
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={addCustomSkill}
          placeholder="Type a skill and press Enter..."
          className={inputClass}
        />
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className="ml-1 text-primary/60 hover:text-primary"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        <div>
          <p className="mb-2 text-xs text-muted-foreground">Quick add:</p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SKILLS.filter((s) => !skills.includes(s))
              .slice(0, 12)
              .map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground transition-all hover:border-primary/40"
                >
                  + {skill}
                </button>
              ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-heading font-bold text-foreground">
          Resume & Links
        </h2>

        <div>
          <label className={labelClass}>Resume</label>
          {resumeUrl ? (
            <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
              <span className="flex-1 text-sm text-foreground">
                📄 {resumeFilename || "Resume uploaded"}
              </span>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline"
              >
                View
              </a>
              <label className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
                Replace
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleResumeUpload(f);
                  }}
                />
              </label>
            </div>
          ) : (
            <label className="block cursor-pointer rounded-xl border-2 border-dashed border-border p-6 text-center transition-all hover:border-primary/30">
              <p className="text-sm text-muted-foreground">
                {uploadingResume ? (
                  "Uploading..."
                ) : (
                  <>
                    Drop PDF/DOCX or{" "}
                    <span className="font-medium text-primary">browse</span>
                  </>
                )}
              </p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleResumeUpload(f);
                }}
              />
            </label>
          )}
        </div>

        <div>
          <label className={labelClass}>LinkedIn URL</label>
          <input
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="https://linkedin.com/in/yourname"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Portfolio / Website</label>
          <input
            type="url"
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            placeholder="https://yourportfolio.com"
            className={inputClass}
          />
        </div>
      </div>

      {error && (
        <p className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3 pb-6">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
        {saved && (
          <span className="text-sm font-medium text-green-600">
            ✓ Profile saved!
          </span>
        )}
      </div>
    </form>
  );
}
