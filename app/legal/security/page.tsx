import { LegalPage } from "@/components/legal/legal-page";

export const metadata = { title: "Security — LynxHire" };

export default function SecurityPage() {
  return (
    <LegalPage
      title="Security Overview"
      effectiveDate="January 1, 2026"
      lastUpdated="March 1, 2026"
      intro="LynxHire takes the security of your personal data seriously. This page outlines our security practices and how to report a vulnerability."
      sections={[
        {
          heading: "1. Infrastructure Security",
          content: [
            "All data is hosted on Supabase, which runs on enterprise-grade cloud infrastructure with SOC 2 Type II compliance.",
            "Data is encrypted in transit using TLS 1.2+ on all connections.",
            "Data is encrypted at rest using AES-256 encryption.",
            "Database access is restricted by Row Level Security (RLS) policies — users can only access their own data.",
          ],
        },
        {
          heading: "2. Authentication & Access Controls",
          content: [
            "Secure authentication via Supabase Auth with bcrypt password hashing.",
            "JWT-based session management with short expiry windows.",
            "API keys and secrets are stored as environment variables, never in source code.",
            "Role-based access controls separate candidate, employer, and admin permissions.",
          ],
        },
        {
          heading: "3. Payment Security",
          content:
            "All payment processing is handled by Stripe, a PCI DSS Level 1 certified payment processor. LynxHire never stores credit card numbers, CVVs, or full payment card data.",
        },
        {
          heading: "4. Breach Notification",
          content: [
            "LynxHire maintains an incident response plan.",
            "In the event of a confirmed personal data breach, affected users will be notified within 72 hours as required by PIPEDA.",
            "The Office of the Privacy Commissioner of Canada (OPC) will be notified for breaches posing real risk of significant harm.",
            "Notifications will include: what happened, what data was affected, what we are doing, and what you can do.",
          ],
        },
        {
          heading: "5. Responsible Disclosure",
          content:
            "If you discover a security vulnerability in LynxHire, please report it responsibly to security@lynxhire.ca. Include a description of the vulnerability and steps to reproduce. We will acknowledge receipt within 24 hours and work with you on a coordinated disclosure timeline. We do not pursue legal action against good-faith security researchers.",
        },
        {
          heading: "6. Contact",
          content:
            "Security reports: security@lynxhire.ca\nPrivacy breaches: privacy@lynxhire.ca",
        },
      ]}
    />
  );
}
