"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { OnboardingProgress } from "@/components/onboarding/progress";

const STEPS = ["Personal Info", "Skills & Resume", "Experience", "Preferences"];

const EDUCATION_LEVELS = [
  { value: "high_school", label: "High School / GED" },
  { value: "some_college", label: "Some College" },
  { value: "diploma", label: "College Diploma" },
  { value: "bachelors", label: "Bachelor's Degree" },
  { value: "masters", label: "Master's Degree" },
  { value: "phd", label: "PhD / Doctorate" },
  { value: "trade", label: "Trade / Apprenticeship" },
];

export default function CandidateStep3() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    years_experience: "",
    education_level: "",
    bio: "",
    linkedin_url: "",
    portfolio_url: "",
  });

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (!form.education_level) {
      setError("Please select your education level.");
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

    const { error: err } = await supabase.from("candidate_profiles").upsert(
      {
        profile_id: user.id,
        years_experience: form.years_experience
          ? parseInt(form.years_experience, 10)
          : null,
        education_level: form.education_level,
        bio: form.bio || null,
        linkedin_url: form.linkedin_url || null,
        portfolio_url: form.portfolio_url || null,
      },
      { onConflict: "profile_id" }
    );

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    router.push("/onboarding/candidate/step-4");
  }

  return (
    <main className="px-4 py-10">
      <div className="max-w-lg mx-auto">
        <OnboardingProgress currentStep={3} totalSteps={4} steps={STEPS} />

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-1">
            Experience & Background
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            Help employers understand your background.
          </p>

          <form onSubmit={handleNext} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  Years of Experience
                </label>
                <select
                  value={form.years_experience}
                  onChange={(e) => set("years_experience", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                >
                  <option value="">Select...</option>
                  {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(
                    (y) => (
                      <option key={y} value={y}>
                        {y === "10"
                          ? "10+"
                          : y === "0"
                            ? "Less than 1"
                            : y}{" "}
                        year{y !== "1" ? "s" : ""}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  Education Level{" "}
                  <span className="text-destructive">*</span>
                </label>
                <select
                  required
                  value={form.education_level}
                  onChange={(e) => set("education_level", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                >
                  <option value="">Select...</option>
                  {EDUCATION_LEVELS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Bio{" "}
                <span className="text-muted-foreground font-normal">
                  (optional — shown to employers)
                </span>
              </label>
              <textarea
                value={form.bio}
                onChange={(e) => set("bio", e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="Brief summary of who you are and what you're looking for..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {form.bio.length}/500
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                LinkedIn URL{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </label>
              <input
                type="url"
                value={form.linkedin_url}
                onChange={(e) => set("linkedin_url", e.target.value)}
                placeholder="https://linkedin.com/in/yourname"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Portfolio / Website{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </label>
              <input
                type="url"
                value={form.portfolio_url}
                onChange={(e) => set("portfolio_url", e.target.value)}
                placeholder="https://yourportfolio.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3.5 py-2.5">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.push("/onboarding/candidate/step-2")}
                className="flex-1 py-2.5 border border-border text-foreground font-medium rounded-lg text-sm hover:bg-card transition-all"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg text-sm hover:bg-primary/90 disabled:opacity-60 transition-all"
              >
                {loading ? "Saving..." : "Continue →"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
