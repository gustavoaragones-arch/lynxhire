"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { OnboardingProgress } from "@/components/onboarding/progress";

const STEPS = ["Personal Info", "Skills & Resume", "Experience", "Preferences"];

const WORK_TYPES = [
  { value: "full-time", label: "🏢 Full-Time" },
  { value: "part-time", label: "⏰ Part-Time" },
  { value: "contract", label: "📝 Contract" },
  { value: "remote", label: "🌐 Remote" },
];

export default function CandidateStep4() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [workTypes, setWorkTypes] = useState<string[]>([]);
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");

  function toggleWorkType(type: string) {
    setWorkTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  async function handleComplete(e: React.FormEvent) {
    e.preventDefault();
    if (workTypes.length === 0) {
      setError("Select at least one work type.");
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

    // Save preferences
    const { error: prefError } = await supabase
      .from("candidate_profiles")
      .upsert(
        {
          profile_id: user.id,
          desired_work_type: workTypes,
          desired_salary_min: salaryMin ? parseInt(salaryMin, 10) : null,
          desired_salary_max: salaryMax ? parseInt(salaryMax, 10) : null,
        },
        { onConflict: "profile_id" }
      );
    if (prefError) {
      setError(prefError.message);
      setLoading(false);
      return;
    }

    // Mark onboarding complete
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        onboarding_complete: true,
        ...(user.user_metadata?.full_name && {
          full_name: user.user_metadata.full_name as string,
        }),
      })
      .eq("id", user.id);
    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    router.push("/onboarding/candidate/complete");
  }

  return (
    <main className="px-4 py-10">
      <div className="max-w-lg mx-auto">
        <OnboardingProgress currentStep={4} totalSteps={4} steps={STEPS} />

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-1">
            Job Preferences
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            This is what powers your AI job matches.
          </p>

          <form onSubmit={handleComplete} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Work Type <span className="text-destructive">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {WORK_TYPES.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => toggleWorkType(type.value)}
                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                      workTypes.includes(type.value)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-foreground hover:border-primary/40"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Desired Salary Range{" "}
                <span className="text-muted-foreground font-normal">
                  (CAD / year — optional)
                </span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="number"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    placeholder="Min (e.g. 60000)"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    placeholder="Max (e.g. 90000)"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3.5 py-2.5">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.push("/onboarding/candidate/step-3")}
                className="flex-1 py-2.5 border border-border text-foreground font-medium rounded-lg text-sm hover:bg-card transition-all"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg text-sm hover:bg-primary/90 disabled:opacity-60 transition-all"
              >
                {loading ? "Finishing..." : "Complete Setup 🎉"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
