"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { OnboardingProgress } from "@/components/onboarding/progress";

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

const WORK_AUTH_OPTIONS = [
  { value: "citizen", label: "🇨🇦 Canadian Citizen" },
  { value: "permanent_resident", label: "🍁 Permanent Resident" },
  { value: "open_work_permit", label: "📋 Open Work Permit" },
  { value: "employer_specific_permit", label: "📄 Employer-Specific Permit" },
  { value: "student_visa", label: "🎓 Student Visa (Co-op/Intern)" },
  { value: "other", label: "🌐 Other / Not Yet Authorized" },
];

const STEPS = ["Personal Info", "Skills & Resume", "Experience", "Preferences"];

export default function CandidateStep1() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    phone: "",
    city: "",
    province: "",
    work_authorization: "",
  });

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (!form.province || !form.work_authorization) {
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

    const { error: err } = await supabase.from("candidate_profiles").upsert(
      {
        profile_id: user.id,
        phone: form.phone || null,
        city: form.city || null,
        province: form.province,
        work_authorization: form.work_authorization,
      },
      { onConflict: "profile_id" }
    );

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    router.push("/onboarding/candidate/step-2");
  }

  return (
    <main className="px-4 py-10">
      <div className="max-w-lg mx-auto">
        <OnboardingProgress currentStep={1} totalSteps={4} steps={STEPS} />

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-1">
            Tell us about yourself
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            This helps employers find you for relevant roles.
          </p>

          <form onSubmit={handleNext} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  placeholder="Toronto"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  Province <span className="text-destructive">*</span>
                </label>
                <select
                  required
                  value={form.province}
                  onChange={(e) => set("province", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                >
                  <option value="">Select province</option>
                  {CANADIAN_PROVINCES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Phone Number{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+1 (416) 555-0123"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Canadian Work Authorization{" "}
                <span className="text-destructive">*</span>
              </label>
              <div className="space-y-2">
                {WORK_AUTH_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => set("work_authorization", opt.value)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                      form.work_authorization === opt.value
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-background text-foreground hover:border-primary/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3.5 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-lg text-sm hover:bg-primary/90 disabled:opacity-60 transition-all"
            >
              {loading ? "Saving..." : "Continue →"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
