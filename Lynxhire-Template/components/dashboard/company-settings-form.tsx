"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const INDUSTRIES = [
  "Technology", "Healthcare", "Finance & Banking", "Retail", "Hospitality & Tourism",
  "Education", "Construction", "Manufacturing", "Real Estate", "Legal",
  "Marketing & Advertising", "Non-Profit", "Government", "Transportation", "Other",
];
const SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"];
const PROVINCES = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick",
  "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia",
  "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon",
];

interface CompanyRow {
  name?: string | null;
  website?: string | null;
  industry?: string | null;
  size?: string | null;
  city?: string | null;
  province?: string | null;
  description?: string | null;
  culture?: string | null;
}

interface Props {
  userId: string;
  initialCompany: CompanyRow | null;
}

export function CompanySettingsForm({ userId, initialCompany: c }: Props) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(c?.name ?? "");
  const [website, setWebsite] = useState(c?.website ?? "");
  const [industry, setIndustry] = useState(c?.industry ?? "");
  const [size, setSize] = useState(c?.size ?? "");
  const [city, setCity] = useState(c?.city ?? "");
  const [province, setProvince] = useState(c?.province ?? "");
  const [description, setDescription] = useState(c?.description ?? "");
  const [culture, setCulture] = useState(c?.culture ?? "");

  const i = "w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all";
  const l = "text-sm font-medium text-foreground block mb-1.5";

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase
      .from("companies")
      .update({
        name,
        website: website || null,
        industry,
        size,
        city: city || null,
        province: province || null,
        description: description || null,
        culture: culture || null,
      })
      .eq("profile_id", userId);
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
        <h2 className="font-heading font-bold text-foreground">Company Details</h2>
        <div>
          <label className={l}>Company Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={i} />
        </div>
        <div>
          <label className={l}>Website</label>
          <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://yourcompany.ca" className={i} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={l}>Industry</label>
            <select value={industry} onChange={(e) => setIndustry(e.target.value)} className={i}>
              <option value="">Select...</option>
              {INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
            </select>
          </div>
          <div>
            <label className={l}>Company Size</label>
            <select value={size} onChange={(e) => setSize(e.target.value)} className={i}>
              <option value="">Select...</option>
              {SIZES.map((s) => <option key={s} value={s}>{s} employees</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={l}>City</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Vancouver" className={i} />
          </div>
          <div>
            <label className={l}>Province</label>
            <select value={province} onChange={(e) => setProvince(e.target.value)} className={i}>
              <option value="">Select...</option>
              {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="font-heading font-bold text-foreground">About Your Company</h2>
        <div>
          <label className={l}>Company Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} maxLength={1000} className={i + " resize-none"} placeholder="What your company does, your mission..." />
          <p className="text-xs text-muted-foreground mt-1">{description.length}/1000</p>
        </div>
        <div>
          <label className={l}>Culture & Benefits</label>
          <textarea value={culture} onChange={(e) => setCulture(e.target.value)} rows={4} maxLength={500} className={i + " resize-none"} placeholder="Remote work policy, team culture, perks..." />
        </div>
      </div>
      {error && <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">{error}</p>}
      <div className="flex items-center gap-3 pb-6">
        <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl text-sm hover:bg-primary/90 disabled:opacity-60 transition-all">
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {saved && <span className="text-sm text-green-600 font-medium">✓ Changes saved!</span>}
      </div>
    </form>
  );
}
