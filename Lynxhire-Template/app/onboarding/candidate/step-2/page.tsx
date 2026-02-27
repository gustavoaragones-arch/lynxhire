"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { OnboardingProgress } from "@/components/onboarding/progress";

const STEPS = ["Personal Info", "Skills & Resume", "Experience", "Preferences"];

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
  "Photoshop",
  "UX Design",
  "AWS",
  "Docker",
];

export default function CandidateStep2() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  function toggleSkill(skill: string) {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  }

  function addCustomSkill(e: React.KeyboardEvent) {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      const s = skillInput.trim();
      if (!skills.includes(s)) setSkills((prev) => [...prev, s]);
      setSkillInput("");
    }
  }

  async function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (skills.length === 0) {
      setError("Please add at least one skill.");
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

    let resume_url: string | undefined;
    let resume_filename: string | undefined;

    if (resumeFile) {
      setUploading(true);
      const ext = resumeFile.name.split(".").pop();
      const path = `${user.id}/resume.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(path, resumeFile, { upsert: true });
      if (uploadError) {
        setError("Resume upload failed. Try again.");
        setLoading(false);
        setUploading(false);
        return;
      }
      const { data } = supabase.storage.from("resumes").getPublicUrl(path);
      resume_url = data.publicUrl;
      resume_filename = resumeFile.name;
      setUploading(false);
    }

    const { error: err } = await supabase.from("candidate_profiles").upsert(
      {
        profile_id: user.id,
        skills,
        ...(resume_url && { resume_url, resume_filename }),
      },
      { onConflict: "profile_id" }
    );

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    router.push("/onboarding/candidate/step-3");
  }

  return (
    <main className="px-4 py-10">
      <div className="max-w-lg mx-auto">
        <OnboardingProgress currentStep={2} totalSteps={4} steps={STEPS} />

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-1">
            Skills & Resume
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            Add your top skills and optionally upload your resume.
          </p>

          <form onSubmit={handleNext} className="space-y-6">
            {/* Skills */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Your Skills <span className="text-destructive">*</span>
              </label>

              {/* Custom skill input */}
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={addCustomSkill}
                placeholder="Type a skill and press Enter..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all mb-3"
              />

              {/* Selected skills */}
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-xs rounded-full"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className="text-primary/60 hover:text-primary ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Popular skills */}
              <p className="text-xs text-muted-foreground mb-2">
                Popular skills (click to add):
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SKILLS.filter((s) => !skills.includes(s)).map(
                  (skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className="px-3 py-1 bg-background border border-border text-foreground text-xs rounded-full hover:border-primary/40 transition-all"
                    >
                      + {skill}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Resume upload */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Resume{" "}
                <span className="text-muted-foreground font-normal">
                  (PDF or DOCX, max 5MB — optional)
                </span>
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                  resumeFile
                    ? "border-primary/40 bg-primary/5"
                    : "border-border hover:border-primary/30"
                }`}
              >
                {resumeFile ? (
                  <div>
                    <p className="text-sm text-foreground font-medium">
                      📄 {resumeFile.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => setResumeFile(null)}
                      className="text-xs text-muted-foreground hover:text-destructive mt-1"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <p className="text-sm text-muted-foreground">
                      Drag & drop or{" "}
                      <span className="text-primary font-medium">
                        browse files
                      </span>
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && file.size <= 5 * 1024 * 1024)
                          setResumeFile(file);
                        else if (file) setError("File too large. Max 5MB.");
                      }}
                    />
                  </label>
                )}
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
                onClick={() => router.push("/onboarding/candidate")}
                className="flex-1 py-2.5 border border-border text-foreground font-medium rounded-lg text-sm hover:bg-card transition-all"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg text-sm hover:bg-primary/90 disabled:opacity-60 transition-all"
              >
                {uploading
                  ? "Uploading..."
                  : loading
                    ? "Saving..."
                    : "Continue →"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
