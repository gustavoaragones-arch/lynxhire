import { LegalPage } from "@/components/legal/legal-page";

export const metadata = { title: "Trust & Safety — LynxHire" };

export default function TrustSafetyPage() {
  return (
    <LegalPage
      title="Trust & Safety Policy"
      effectiveDate="January 1, 2026"
      lastUpdated="March 1, 2026"
      intro="LynxHire is committed to maintaining a safe, fraud-free, and discrimination-free job marketplace for all Canadians. This policy explains our standards, enforcement, and reporting procedures."
      sections={[
        {
          heading: "1. Our Commitment",
          content:
            "We believe every Canadian deserves access to legitimate job opportunities in a safe environment. We maintain active moderation, automated detection, and community reporting to protect our platform.",
        },
        {
          heading: "2. Prohibited Content & Behaviour",
          content: [
            "Discriminatory job listings based on any characteristic protected under the Canadian Human Rights Act.",
            "Fake, fraudulent, or scam job offers.",
            "Pyramid schemes, multi-level marketing recruitment disguised as employment.",
            "Requests for money, personal financial information, or government ID during the application process.",
            "Sexual harassment, threats, or abusive language in platform communications.",
            "Misrepresentation of company identity, size, or legitimacy.",
            "Posting adult content, illegal offers, or unsafe working conditions.",
          ],
        },
        {
          heading: "3. Employer Verification",
          content: [
            "Company email domain verification on signup.",
            "Automated fraud signal detection on new employer accounts.",
            "Manual review triggered for flagged or high-risk accounts.",
            "Verified employers receive a trust badge on their company profile.",
          ],
        },
        {
          heading: "4. Enforcement",
          content: [
            "Content removal: Violating posts are removed within 24 hours of detection or report.",
            "Account suspension: Accounts in violation receive a warning and temporary suspension.",
            "Permanent ban: Repeat offenders or severe violations result in permanent account termination.",
            "Legal referral: Illegal activity including fraud and harassment is reported to relevant Canadian authorities.",
          ],
        },
        {
          heading: "5. Reporting Abuse",
          content:
            "To report a job posting, employer, or user: safety@lynxhire.ca\nFor urgent safety concerns: safety@lynxhire.ca with subject \"URGENT\"\nWe review all reports within 24 business hours.",
        },
        {
          heading: "6. Anti-Discrimination",
          content:
            "LynxHire prohibits all discriminatory hiring practices. Job postings must not specify or imply preference based on race, national or ethnic origin, colour, religion, age, sex, sexual orientation, marital status, family status, disability, or conviction for which a pardon has been granted, as protected under the Canadian Human Rights Act.",
        },
        {
          heading: "7. Contact",
          content:
            "Trust & Safety: safety@lynxhire.ca\nLegal: legal@lynxhire.ca",
        },
      ]}
    />
  );
}
