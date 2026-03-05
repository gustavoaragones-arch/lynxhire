import Link from "next/link";
import { LynxHireLogo } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-8">
        <LynxHireLogo variant="light" height={36} />
      </div>

      <div className="relative mb-6">
        <p
          className="text-8xl font-heading font-bold"
          style={{ color: "var(--primary)", opacity: 0.15 }}
        >
          404
        </p>
        <p className="absolute inset-0 flex items-center justify-center text-8xl font-heading font-bold text-foreground">
          404
        </p>
      </div>

      <h1 className="font-heading font-bold text-foreground text-2xl mb-3">
        Page not found
      </h1>
      <p className="text-muted-foreground text-sm mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="flex gap-3">
        <Link
          href="/"
          className="px-5 py-2.5 bg-gradient-to-b from-neutral-700 to-neutral-900 text-white font-medium rounded-xl text-sm shadow-sm hover:from-neutral-800 hover:to-black transition-all duration-200"
        >
          Go Home
        </Link>
        <Link
          href="/jobs"
          className="px-5 py-2.5 border border-neutral-200 text-neutral-700 font-medium rounded-xl text-sm hover:bg-neutral-50 transition-all duration-200"
        >
          Browse Jobs
        </Link>
      </div>
    </div>
  );
}
