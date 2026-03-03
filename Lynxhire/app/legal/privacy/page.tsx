import { LegalPage } from "@/components/legal/legal-page";

export const metadata = { title: "Privacy Policy — LynxHire" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      effectiveDate="January 1, 2026"
      lastUpdated="March 1, 2026"
      intro="LynxHire respects your privacy. This Policy explains how we collect, use, disclose, and protect personal information in compliance with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA) and the General Data Protection Regulation (GDPR) for EU residents."
      sections={[
        {
          heading: "1. Who We Are",
          content:
            'LynxHire is operated by Albor Digital LLC ("we," "us," "our"). Our Privacy Officer can be reached at privacy@lynxhire.ca. We are the data controller for personal information collected through the Platform.',
        },
        {
          heading: "2. Data We Collect",
          content: [
            "Personal Data (Candidates): Full name, email address, phone number, city and province, resume and employment history, work authorization status, skills and education.",
            "Personal Data (Employers): Company name, contact name, business email, company details, billing information (processed by Stripe — we do not store card numbers).",
            "Usage Data: IP address, device type, browser, pages visited, session duration, referral source.",
            "AI Data: Profile attributes and preferences used to generate job match scores and recommendations.",
            "Communications: Messages sent between users through the in-platform messaging system.",
          ],
        },
        {
          heading: "3. Legal Basis for Processing (GDPR)",
          content: [
            "Consent: For marketing communications and optional data processing.",
            "Contract Performance: To provide the job matching and platform services you signed up for.",
            "Legitimate Interest: For fraud prevention, platform security, and product improvement.",
            "Legal Obligation: Where required by Canadian or applicable law.",
          ],
        },
        {
          heading: "4. How We Use Your Data",
          content: [
            "To provide, operate, and improve the LynxHire platform and its features.",
            "To generate AI-powered job matches and candidate recommendations.",
            "To process payments and manage subscriptions.",
            "To send transactional emails (application updates, account alerts).",
            "To send marketing communications (with your explicit opt-in consent).",
            "To prevent fraud, abuse, and platform misuse.",
            "To comply with applicable laws and legal obligations.",
          ],
        },
        {
          heading: "5. Data Sharing",
          content: [
            "With Employers: Candidate profile data is shared with employers only when a candidate applies to their job posting.",
            "Service Providers: We engage trusted subprocessors including Supabase (database), Stripe (payments), and Anthropic (AI). These providers are bound by data processing agreements.",
            "Legal Authorities: We may disclose data where required by law, court order, or government request.",
            "We never sell personal data to third parties. We never share data for advertising purposes.",
          ],
        },
        {
          heading: "6. Data Storage & Location",
          content:
            "Data is stored on secure servers operated by Supabase. Data may be processed in Canada, the United States, or other jurisdictions. Where data is transferred internationally, we ensure appropriate safeguards including Standard Contractual Clauses (SCCs) where required by GDPR.",
        },
        {
          heading: "7. Data Retention",
          content: [
            "Account data is retained while your account is active.",
            "Upon account deletion, personal data is deleted within 30 days, except where retention is required by law.",
            "Anonymised, aggregated data may be retained indefinitely for platform improvement.",
            "Employer billing records are retained for 7 years for tax and legal compliance.",
          ],
        },
        {
          heading: "8. Your Rights (PIPEDA & GDPR)",
          content: [
            "Access: Request a copy of all personal data we hold about you.",
            "Correction: Request correction of inaccurate or incomplete data.",
            "Deletion: Request deletion of your personal data (\"right to be forgotten\").",
            "Portability: Receive your data in a structured, machine-readable format.",
            "Withdrawal of Consent: Withdraw consent for optional data processing at any time.",
            "Complaint: Lodge a complaint with the Office of the Privacy Commissioner of Canada (OPC) at priv.gc.ca.",
            "To exercise any of these rights, email privacy@lynxhire.ca. We will respond within 30 days.",
          ],
        },
        {
          heading: "9. Security Safeguards",
          content: [
            "All data is encrypted in transit (TLS) and at rest.",
            "Access to personal data is restricted to authorised personnel only.",
            "We maintain an incident response plan and breach notification procedures.",
            "In the event of a data breach affecting your personal information, we will notify you and the OPC within 72 hours as required by PIPEDA.",
          ],
        },
        {
          heading: "10. Cookies",
          content:
            "We use essential cookies for authentication and session management. See our full Cookie Notice at /legal/cookies for details on how to manage cookie preferences.",
        },
        {
          heading: "11. Children's Privacy",
          content:
            "LynxHire is not directed at individuals under 18 years of age. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal data, contact privacy@lynxhire.ca immediately.",
        },
        {
          heading: "12. Contact & Privacy Officer",
          content:
            "Privacy Officer: privacy@lynxhire.ca\nLynxHire (Albor Digital LLC)\nFor urgent privacy matters or breach reports, email privacy@lynxhire.ca with subject \"URGENT: Privacy\".",
        },
      ]}
    />
  );
}
