"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <p className="text-4xl mb-4">⚠️</p>
      <h2 className="font-heading font-bold text-foreground text-xl mb-2">
        Something went wrong
      </h2>
      <p className="text-muted-foreground text-sm mb-6 max-w-sm">
        An error occurred while loading this page. Your data is safe.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 bg-gradient-to-b from-neutral-700 to-neutral-900 text-white font-medium rounded-xl text-sm shadow-sm hover:from-neutral-800 hover:to-black transition-all duration-200"
        >
          Try Again
        </button>
        <Link
          href="/dashboard/candidate"
          className="px-5 py-2.5 border border-neutral-200 text-neutral-700 font-medium rounded-xl text-sm hover:bg-neutral-50 transition-all duration-200"
        >
          Go to Dashboard
        </Link>
      </div>
      {error.digest && (
        <p className="text-xs text-muted-foreground mt-4">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
