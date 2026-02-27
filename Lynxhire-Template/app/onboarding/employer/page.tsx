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

const COMPANY_SIZES = [
  { value: "1-10", label: "1–10 employees" },
  { value: "11-50", label: "11–50 employees" },
  { value: "51-200", label: "51–200 employees" },
  { value: "201-500", label: "201–500 employees" },
  { value: "500+", label: "500+ employees" },
];

const STEPS = ["Company Info", "Culture & Description", "Hiring Plan"];

export default function EmployerStep1() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: "",
    website: "",
    industry: "",
    size: "",
    city: "",
    province: "",
  });

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.industry || !form.size) {
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

    let logo_url: string | undefined;

    if (logoFile) {
      const ext = logoFile.name.split(".").pop();
      const path = `${user.id}/logo.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("logos")
        .upload(path, logoFile, { upsert: true });
      if (!uploadError) {
        const { data } = supabase.storage.from("logos").getPublicUrl(path);
        logo_url = data.publicUrl;
      }
    }

    const slug = form.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const { error: err } = await supabase.from("companies").upsert(
      {
        profile_id: user.id,
        name: form.name,
        slug: `${slug}-${user.id.slice(0, 6)}`,
        website: form.website || null,
        industry: form.industry,
        size: form.size,
        city: form.city || null,
        province: form.province || null,
        ...(logo_url && { logo_url }),
      },
      { onConflict: "profile_id" }
    );

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    router.push("/onboarding/employer/step-2");
  }

  return (
    <main className="px-4 py-10">
      <div className="max-w-lg mx-auto">
        <OnboardingProgress currentStep={1} totalSteps={3} steps={STEPS} />

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-1">
            Company Information
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            Set up your company profile to start posting jobs.
          </p>

          <form onSubmit={handleNext} className="space-y-5">
            {/* Logo upload */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Company Logo{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </label>
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all ${
                    logoFile ? "border-primary/40" : "border-border"
                  }`}
                >
                  {logoFile ? (
                    <img
                      src={URL.createObjectURL(logoFile)}
                      alt="Logo preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl">🏢</span>
                  )}
                </div>
                <label className="cursor-pointer px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:border-primary/40 transition-all">
                  Upload Logo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && file.size <= 2 * 1024 * 1024)
                        setLogoFile(file);
                      else if (file) setError("Logo must be under 2MB.");
                    }}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Company Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Acme Corp"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Website{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </label>
              <input
                type="url"
                value={form.website}
                onChange={(e) => set("website", e.target.value)}
                placeholder="https://acmecorp.ca"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  Industry <span className="text-destructive">*</span>
                </label>
                <select
                  required
                  value={form.industry}
                  onChange={(e) => set("industry", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
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
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  Company Size <span className="text-destructive">*</span>
                </label>
                <select
                  required
                  value={form.size}
                  onChange={(e) => set("size", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                >
                  <option value="">Select...</option>
                  {COMPANY_SIZES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  placeholder="Vancouver"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  Province
                </label>
                <select
                  value={form.province}
                  onChange={(e) => set("province", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
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
