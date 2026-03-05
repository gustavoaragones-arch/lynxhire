import { LegalPage } from "@/components/legal/legal-page";

export const metadata = { title: "Job Posting Policy — LynxHire" };

export default function JobPostingPolicyPage() {
  return (
    <LegalPage
      title="Job Posting Policy"
      effectiveDate="January 1, 2026"
      lastUpdated="March 1, 2026"
      intro="All job postings on LynxHire must meet these requirements to maintain a high-quality, trustworthy marketplace."
      sections={[
        {
          heading: "1. Eligibility",
          content: [
            "Only verified employer accounts may post jobs.",
            "Jobs must represent real, currently available positions.",
            "The employer must have legitimate authority to hire for the posted position.",
          ],
        },
        {
          heading: "2. Required Information",
          content: [
            "Job title and accurate description of responsibilities.",
            "Employment type (full-time, part-time, contract, internship).",
            "Location or remote work status.",
            "Salary range (required for Ontario positions under Pay Transparency Act; strongly recommended for all postings).",
            "Required skills and qualifications.",
          ],
        },
        {
          heading: "3. Prohibited Content in Job Postings",
          content: [
            "Discriminatory requirements or language.",
            "Requests for payment, financial information, or personal ID from applicants.",
            "Misleading salary information or hidden fees.",
            "Vague or deceptive role descriptions designed to attract applications under false pretenses.",
            "Postings for illegal activities or roles.",
          ],
        },
        {
          heading: "4. Job Posting Duration",
          content:
            "Job postings are active for 60 days by default. Employers may pause, edit, or close postings at any time from their dashboard. Expired postings are automatically removed from public search results.",
        },
        {
          heading: "5. Moderation",
          content:
            "LynxHire reviews flagged postings and may remove any posting that violates this policy without notice. Employers may appeal removals by contacting safety@lynxhire.ca.",
        },
        {
          heading: "6. Contact",
          content:
            "Job posting questions: support@lynxhire.ca\nTo report a violating posting: safety@lynxhire.ca",
        },
      ]}
    />
  );
}
