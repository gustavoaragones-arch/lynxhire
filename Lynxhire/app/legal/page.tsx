import Link from "next/link";

export const metadata = { title: "Legal & Trust — LynxHire" };

const sections = [
  {
    title: "Core Legal",
    pages: [
      {
        href: "/legal/terms",
        title: "Terms of Service",
        desc: "Platform rules, user responsibilities, and liability.",
      },
      {
        href: "/legal/privacy",
        title: "Privacy Policy",
        desc: "PIPEDA & GDPR-compliant data practices.",
      },
      {
        href: "/legal/cookies",
        title: "Cookie Notice",
        desc: "How we use cookies and your options.",
      },
      {
        href: "/legal/privacy-rights",
        title: "Your Privacy Rights",
        desc: "PIPEDA rights: access, correction, deletion.",
      },
    ],
  },
  {
    title: "AI & Technology",
    pages: [
      {
        href: "/legal/ai-disclaimer",
        title: "AI Transparency & Disclaimer",
        desc: "How AI is used, its limitations, and your rights.",
      },
      {
        href: "/legal/responsible-ai",
        title: "Responsible AI Charter",
        desc: "Our principles for fair and ethical AI.",
      },
    ],
  },
  {
    title: "Trust & Safety",
    pages: [
      {
        href: "/legal/trust-safety",
        title: "Trust & Safety Policy",
        desc: "Platform standards, moderation, and reporting.",
      },
      {
        href: "/legal/anti-discrimination",
        title: "Anti-Discrimination Policy",
        desc: "Canadian Human Rights Act compliance.",
      },
      {
        href: "/legal/job-posting-policy",
        title: "Job Posting Policy",
        desc: "Rules for legitimate job postings.",
      },
      {
        href: "/legal/acceptable-use",
        title: "Acceptable Use Policy",
        desc: "What you may and may not do on LynxHire.",
      },
    ],
  },
  {
    title: "Enterprise & Compliance",
    pages: [
      {
        href: "/legal/dpa",
        title: "Data Processing Agreement",
        desc: "GDPR-ready DPA for employer data controllers.",
      },
      {
        href: "/legal/security",
        title: "Security Overview",
        desc: "Infrastructure security and breach notification.",
      },
      {
        href: "/legal/accessibility",
        title: "Accessibility Statement",
        desc: "WCAG 2.1 AA commitment and feedback.",
      },
    ],
  },
];

export default function LegalIndexPage() {
  return (
    <div>
      <div className="mb-8 border-b border-neutral-100 pb-6">
        <h1 className="font-heading text-3xl font-bold text-neutral-900 mb-2">
          Legal & Trust Centre
        </h1>
        <p className="text-sm text-neutral-500">
          LynxHire is built with privacy, AI governance, and legal compliance
          from day one. Governing law: Alberta, Canada.
        </p>
      </div>
      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-neutral-900 mb-4">
              {section.title}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {section.pages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm transition-all hover:border-[#FF6B2B]/40 hover:bg-neutral-50/50"
                >
                  <p className="text-sm font-medium text-neutral-900 mb-1">
                    {page.title}
                  </p>
                  <p className="text-xs text-neutral-500">{page.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 border-t border-neutral-100 pt-6">
        <p className="text-xs text-neutral-500">
          Questions? Contact{" "}
          <a
            href="mailto:legal@lynxhire.ca"
            className="text-[#FF6B2B] hover:underline"
          >
            legal@lynxhire.ca
          </a>{" "}
          · LynxHire is operated by Albor Digital LLC · Alberta, Canada
        </p>
      </div>
    </div>
  );
}
