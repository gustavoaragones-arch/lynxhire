"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface ApplyButtonProps {
  jobId: string;
  userId: string | null;
  existingApplicationId: string | null;
  existingStatus: string | null;
  resumeUrl: string | null;
}

export function ApplyButton({
  jobId,
  userId,
  existingApplicationId,
  existingStatus,
  resumeUrl,
}: ApplyButtonProps) {
  const [showForm, setShowForm] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!userId) {
    return (
      <div className="flex items-center gap-3">
        <a
          href="/auth/signup"
          className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
        >
          Sign Up to Apply
        </a>
        <a
          href="/auth/login"
          className="text-sm text-primary hover:underline"
        >
          Already have an account?
        </a>
      </div>
    );
  }

  if (existingApplicationId) {
    return (
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-muted px-4 py-2.5 text-sm font-medium capitalize text-muted-foreground">
          ✓ Applied — {existingStatus}
        </span>
        <a
          href="/dashboard/candidate/applications"
          className="text-sm text-primary hover:underline"
        >
          View my applications
        </a>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-green-100 px-4 py-2.5 text-sm font-medium text-green-700">
          🎉 Application submitted!
        </span>
        <a
          href="/dashboard/candidate/applications"
          className="text-sm text-primary hover:underline"
        >
          Track your application
        </a>
      </div>
    );
  }

  async function handleApply() {
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: insertError } = await supabase.from("applications").insert({
      job_id: jobId,
      candidate_id: userId,
      resume_url: resumeUrl,
      cover_letter: coverLetter || null,
      status: "new",
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      {!showForm ? (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
        >
          Apply Now
        </button>
      ) : (
        <div className="space-y-4">
          {!resumeUrl && (
            <p className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
              ⚠️ No resume on file.{" "}
              <a
                href="/dashboard/candidate/profile"
                className="font-medium underline"
              >
                Upload a resume
              </a>{" "}
              to strengthen your application.
            </p>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Cover Letter{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={5}
              maxLength={2000}
              placeholder="Tell the employer why you're a great fit for this role..."
              className="w-full resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {coverLetter.length}/2000
            </p>
          </div>

          {error && (
            <p className="rounded-lg border border-destructive/20 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 rounded-xl border border-border py-2.5 text-sm font-medium text-foreground transition-all hover:bg-card"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={loading}
              className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
