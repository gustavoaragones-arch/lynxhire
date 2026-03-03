import Link from "next/link";

const legalLinks = [
  { href: "/legal/terms", label: "Terms of Service" },
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/cookies", label: "Cookie Notice" },
  { href: "/legal/ai-disclaimer", label: "AI Disclaimer" },
  { href: "/legal/responsible-ai", label: "Responsible AI" },
  { href: "/legal/dpa", label: "Data Processing Agreement" },
  { href: "/legal/trust-safety", label: "Trust & Safety" },
  { href: "/legal/security", label: "Security" },
  { href: "/legal/privacy-rights", label: "PIPEDA Rights" },
  { href: "/legal/anti-discrimination", label: "Anti-Discrimination" },
  { href: "/legal/acceptable-use", label: "Acceptable Use" },
  { href: "/legal/job-posting-policy", label: "Job Posting Policy" },
  { href: "/legal/accessibility", label: "Accessibility" },
];

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Legal & Trust
              </p>
              <nav className="space-y-1">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 rounded-xl border border-border bg-card p-4">
                <p className="mb-1 text-xs font-medium text-foreground">
                  Legal questions?
                </p>
                <a
                  href="mailto:legal@lynxhire.ca"
                  className="text-xs text-primary hover:underline"
                >
                  legal@lynxhire.ca
                </a>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">{children}</main>
        </div>
      </div>
    </div>
  );
}
