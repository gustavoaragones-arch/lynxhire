"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const WORK_AUTH_OPTIONS = [
  { value: "citizen", label: "🇨🇦 Canadian Citizen" },
  { value: "permanent_resident", label: "🍁 Permanent Resident" },
  { value: "open_work_permit", label: "📋 Open Work Permit" },
  { value: "employer_specific_permit", label: "📄 Employer-Specific Permit" },
  { value: "student_visa", label: "🎓 Student Visa" },
  { value: "other", label: "🌐 Other" },
];

const WORK_TYPES = [
  { value: "full-time", label: "Full-Time" },
  { value: "part-time", label: "Part-Time" },
  { value: "contract", label: "Contract" },
  { value: "remote", label: "Remote" },
];

interface Props {
  userId: string;
  email: string;
  initialProfile: {
    work_authorization: string | null;
    desired_salary_min: number | null;
    desired_salary_max: number | null;
    desired_work_type: string[] | null;
  } | null;
}

export function CandidateSettingsForm({
  userId,
  email,
  initialProfile,
}: Props) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [workAuth, setWorkAuth] = useState(
    initialProfile?.work_authorization ?? ""
  );
  const [workTypes, setWorkTypes] = useState<string[]>(
    initialProfile?.desired_work_type ?? []
  );
  const [salaryMin, setSalaryMin] = useState(
    initialProfile?.desired_salary_min?.toString() ?? ""
  );
  const [salaryMax, setSalaryMax] = useState(
    initialProfile?.desired_salary_max?.toString() ?? ""
  );

  const i =
    "w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all";

  function toggleWorkType(type: string) {
    setWorkTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase
      .from("candidate_profiles")
      .upsert(
        {
          profile_id: userId,
          work_authorization: workAuth || null,
          desired_work_type: workTypes,
          desired_salary_min: salaryMin ? parseInt(salaryMin, 10) : null,
          desired_salary_max: salaryMax ? parseInt(salaryMax, 10) : null,
        },
        { onConflict: "profile_id" }
      );
    if (error) {
      setError(error.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="font-heading font-bold text-foreground">Account</h2>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            disabled
            className={i + " opacity-60 cursor-not-allowed"}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Contact support to change your email address.
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
        <h2 className="font-heading font-bold text-foreground">
          Job Preferences
        </h2>

        <div>
          <label className="text-sm font-medium text-foreground block mb-2">
            Work Authorization
          </label>
          <div className="space-y-2">
            {WORK_AUTH_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setWorkAuth(opt.value)}
                className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all ${
                  workAuth === opt.value
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-background text-foreground hover:border-primary/40"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground block mb-2">
            Preferred Work Types
          </label>
          <div className="grid grid-cols-2 gap-2">
            {WORK_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => toggleWorkType(type.value)}
                className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
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
            Desired Salary Range (CAD/year)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              value={salaryMin}
              onChange={(e) => setSalaryMin(e.target.value)}
              placeholder="Min (e.g. 60000)"
              className={i}
            />
            <input
              type="number"
              value={salaryMax}
              onChange={(e) => setSalaryMax(e.target.value)}
              placeholder="Max (e.g. 90000)"
              className={i}
            />
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3 pb-6">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl text-sm hover:bg-primary/90 disabled:opacity-60 transition-all"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
        {saved && (
          <span className="text-sm text-green-600 font-medium">
            ✓ Settings saved!
          </span>
        )}
      </div>
    </form>
  );
}
