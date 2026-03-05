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
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 pt-28 pb-12">
        <div className="grid gap-10 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Legal & Trust
              </p>
              <nav className="space-y-1">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm">
                <p className="mb-1 text-xs font-medium text-neutral-900">
                  Legal questions?
                </p>
                <a
                  href="mailto:legal@lynxhire.ca"
                  className="text-xs text-[#FF6B2B] hover:underline"
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
