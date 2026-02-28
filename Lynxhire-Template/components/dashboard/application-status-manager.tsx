"use client";

import { useState, useTransition } from "react";
import {
  updateApplicationStatus,
  type ApplicationStatus,
} from "@/app/actions/update-application-status";

const STATUSES: { value: ApplicationStatus; label: string; color: string }[] = [
  {
    value: "new",
    label: "📥 New",
    color: "border-blue-200 bg-blue-100 text-blue-700",
  },
  {
    value: "reviewed",
    label: "👀 Reviewed",
    color: "border-yellow-200 bg-yellow-100 text-yellow-700",
  },
  {
    value: "interview",
    label: "🎙️ Interview",
    color: "border-purple-200 bg-purple-100 text-purple-700",
  },
  {
    value: "offer",
    label: "🎉 Offer",
    color: "border-green-200 bg-green-100 text-green-700",
  },
  {
    value: "rejected",
    label: "❌ Rejected",
    color: "border-red-200 bg-red-100 text-red-700",
  },
];

interface Props {
  applicationId: string;
  jobId: string;
  currentStatus: string;
}

export function ApplicationStatusManager({
  applicationId,
  jobId,
  currentStatus,
}: Props) {
  const [status, setStatus] = useState<ApplicationStatus>(
    currentStatus as ApplicationStatus
  );
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleStatusChange(newStatus: ApplicationStatus) {
    if (newStatus === status) return;
    setError(null);

    startTransition(async () => {
      const result = await updateApplicationStatus(
        applicationId,
        newStatus,
        jobId
      );
      if (result.success) {
        setStatus(newStatus);
      } else {
        setError(result.error ?? "Update failed");
      }
    });
  }

  const current = STATUSES.find((s) => s.value === status);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Application Status
      </p>

      <div
        className={`mb-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium ${current?.color ?? "border-border bg-muted text-muted-foreground"}`}
      >
        {current?.label ?? status}
      </div>

      <div className="space-y-2">
        {STATUSES.map((s) => (
          <button
            key={s.value}
            type="button"
            onClick={() => handleStatusChange(s.value)}
            disabled={isPending || s.value === status}
            className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-all disabled:cursor-default ${
              s.value === status
                ? `border-current ${s.color}`
                : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/5 disabled:opacity-60"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {isPending && (
        <p className="mt-2 text-xs text-muted-foreground">Updating...</p>
      )}
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
