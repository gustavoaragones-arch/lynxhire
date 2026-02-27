import Link from "next/link";
import { LynxHireLogo } from "@/components/logo";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Minimal header — logo only */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <LynxHireLogo variant="light" />
        </Link>
        <span className="text-xs text-muted-foreground">
          Need help?{" "}
          <a
            href="mailto:support@lynxhire.ca"
            className="text-primary hover:underline"
          >
            support@lynxhire.ca
          </a>
        </span>
      </header>
      {children}
    </div>
  );
}
