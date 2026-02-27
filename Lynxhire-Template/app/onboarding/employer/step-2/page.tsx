"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { OnboardingProgress } from "@/components/onboarding/progress";

const STEPS = ["Company Info", "Culture & Description", "Hiring Plan"];

export default function EmployerStep2() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [culture, setCulture] = useState("");

  async function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) {
      setError("Please add a company description.");
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

    const { error: err } = await supabase
      .from("companies")
      .update({ description, culture: culture || null })
      .eq("profile_id", user.id);

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    router.push("/onboarding/employer/step-3");
  }

  return (
    <main className="px-4 py-10">
      <div className="max-w-lg mx-auto">
        <OnboardingProgress currentStep={2} totalSteps={3} steps={STEPS} />

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-1">
            Culture & Description
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            Great candidates research companies before applying. Make a strong
            impression.
          </p>

          <form onSubmit={handleNext} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                About Your Company{" "}
                <span className="text-destructive">*</span>
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                maxLength={1000}
                placeholder="Describe what your company does, your mission, and what makes you unique..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {description.length}/1000
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Company Culture & Benefits{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </label>
              <textarea
                value={culture}
                onChange={(e) => setCulture(e.target.value)}
                rows={4}
                maxLength={500}
                placeholder="Remote work policy, team culture, benefits, perks, growth opportunities..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
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
                onClick={() => router.push("/onboarding/employer")}
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
