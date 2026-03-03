import Link from "next/link";
import { LynxHireLogo } from "@/components/logo";

export default function CandidateOnboardingComplete() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-8">
          <LynxHireLogo variant="light" />
        </div>
        <div className="bg-card border border-border rounded-2xl p-10 shadow-sm">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
            You&apos;re all set!
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            Your profile is live. LynxHire&apos;s AI is already finding jobs
            that match your skills across Canada.
          </p>
          <Link
            href="/dashboard/candidate"
            className="block w-full py-3 bg-primary text-primary-foreground font-medium rounded-xl text-sm hover:bg-primary/90 transition-all"
          >
            Go to My Dashboard →
          </Link>
          <Link
            href="/jobs"
            className="block mt-3 text-sm text-primary hover:underline"
          >
            Browse jobs first
          </Link>
        </div>
      </div>
    </main>
  );
}
