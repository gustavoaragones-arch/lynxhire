import { LegalPage } from "@/components/legal/legal-page";

export const metadata = { title: "Anti-Discrimination Policy — LynxHire" };

export default function AntiDiscriminationPage() {
  return (
    <LegalPage
      title="Anti-Discrimination Policy"
      effectiveDate="January 1, 2026"
      lastUpdated="March 1, 2026"
      intro="LynxHire is committed to providing a platform that supports fair, equitable, and legal hiring practices across Canada."
      sections={[
        {
          heading: "1. Our Commitment",
          content:
            "LynxHire prohibits discrimination in all forms on our platform. This applies to job postings, candidate profiles, AI matching, and all user interactions.",
        },
        {
          heading: "2. Protected Grounds (Canadian Human Rights Act)",
          content: [
            "Race and colour",
            "National or ethnic origin",
            "Religion",
            "Age",
            "Sex and gender identity or expression",
            "Sexual orientation",
            "Marital or family status",
            "Disability (physical or mental)",
            "Conviction for which a pardon has been granted",
            "Genetic characteristics",
          ],
        },
        {
          heading: "3. Prohibited Job Posting Content",
          content: [
            "Requirements that exclude applicants based on protected grounds unless a bona fide occupational requirement exists.",
            "Language that discourages applicants from protected groups (e.g., \"young and energetic,\" \"native English speaker\").",
            "Age restrictions not justified by legitimate operational requirements.",
            "Gender specifications not justified by occupational requirements.",
          ],
        },
        {
          heading: "4. AI Non-Discrimination",
          content:
            "Our AI matching system is designed to rank candidates on skills, experience, and stated preferences only. Protected characteristics are excluded from all ranking algorithms. We conduct periodic audits for disparate impact and adjust our systems accordingly.",
        },
        {
          heading: "5. Ontario Pay Transparency Compliance",
          content:
            "Job postings for positions in Ontario include a salary range field in compliance with Ontario's Pay Transparency Act. Employers posting Ontario positions are required to provide salary information.",
        },
        {
          heading: "6. Reporting Discrimination",
          content:
            "To report a discriminatory job posting or interaction: safety@lynxhire.ca\nFor legal inquiries: legal@lynxhire.ca\nExternal complaints: Canadian Human Rights Commission at chrc-ccdp.gc.ca",
        },
        {
          heading: "7. Enforcement",
          content:
            "Discriminatory job postings will be removed immediately upon detection or report. Repeat violations result in permanent account suspension. LynxHire cooperates with the Canadian Human Rights Commission and provincial equivalents.",
        },
      ]}
    />
  );
}
