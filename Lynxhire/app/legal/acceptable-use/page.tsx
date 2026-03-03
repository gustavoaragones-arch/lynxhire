import { LegalPage } from "@/components/legal/legal-page";

export const metadata = { title: "Acceptable Use Policy — LynxHire" };

export default function AcceptableUsePage() {
  return (
    <LegalPage
      title="Acceptable Use Policy"
      effectiveDate="January 1, 2026"
      lastUpdated="March 1, 2026"
      intro="This Acceptable Use Policy defines what users may and may not do on the LynxHire platform."
      sections={[
        {
          heading: "1. Permitted Uses",
          content: [
            "Posting legitimate job opportunities at your verified company.",
            "Creating a genuine candidate profile to find employment.",
            "Communicating professionally with matched candidates or employers.",
            "Using AI tools to assist in drafting job descriptions.",
            "Reviewing candidate profiles and applications for legitimate hiring purposes.",
          ],
        },
        {
          heading: "2. Prohibited Uses",
          content: [
            "Posting fake, misleading, or fraudulent job offers.",
            "Harvesting candidate data for purposes other than legitimate hiring.",
            "Using the platform to send unsolicited bulk messages (spam).",
            "Impersonating another person, company, or brand.",
            "Reverse engineering, scraping, or crawling the platform.",
            "Attempting to access accounts or data that do not belong to you.",
            "Using the platform to recruit for illegal, unsafe, or exploitative work.",
            "Sharing your account credentials with others.",
          ],
        },
        {
          heading: "3. Content Standards",
          content: [
            "All content must be accurate and not misleading.",
            "Job postings must describe real, available positions.",
            "Candidate profiles must accurately represent the individual's qualifications.",
            "Communications must be professional and respectful.",
          ],
        },
        {
          heading: "4. Consequences of Violation",
          content: [
            "Content removal without notice.",
            "Account warning and temporary suspension.",
            "Permanent account ban for serious or repeat violations.",
            "Legal action where violations constitute criminal activity.",
          ],
        },
        {
          heading: "5. Contact",
          content: "To report an acceptable use violation: safety@lynxhire.ca",
        },
      ]}
    />
  );
}
