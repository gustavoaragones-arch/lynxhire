import Link from "next/link";
import { LynxHireLogo } from "@/components/logo";

export default function EmployerOnboardingComplete() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-8">
          <LynxHireLogo variant="light" />
        </div>
        <div className="bg-card border border-border rounded-2xl p-10 shadow-sm">
          <div className="text-5xl mb-4">🚀</div>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
            Company profile ready!
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            Your company is live on LynxHire. Post your first job and let AI
            find your ideal candidates across Canada.
          </p>
          <Link
            href="/dashboard/employer"
            className="block w-full py-3 bg-primary text-primary-foreground font-medium rounded-xl text-sm hover:bg-primary/90 transition-all"
          >
            Go to Employer Dashboard →
          </Link>
          <Link
            href="/dashboard/employer/post-job"
            className="block mt-3 text-sm text-primary hover:underline"
          >
            Post a job now
          </Link>
        </div>
      </div>
    </main>
  );
}
