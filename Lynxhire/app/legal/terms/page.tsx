import { LegalPage } from "@/components/legal/legal-page";

export const metadata = { title: "Terms of Service — LynxHire" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      effectiveDate="January 1, 2026"
      lastUpdated="March 1, 2026"
      intro="Please read these Terms of Service carefully before using the LynxHire platform. By creating an account or using our services, you agree to be bound by these Terms."
      sections={[
        {
          heading: "1. Platform Role & Core Legal Positioning",
          content:
            "LynxHire is a technology service that enables employers and job seekers to connect. The Company is not an employer, recruitment agency, or employment service provider. LynxHire does not participate in hiring decisions, does not negotiate employment contracts, and does not represent candidates. Use of this Platform does not create an employment, agency, or professional relationship between LynxHire and any user.",
        },
        {
          heading: "2. Acceptance of Terms",
          content: [
            "By registering an account, you explicitly accept these Terms.",
            "Continued use of the Platform constitutes ongoing acceptance.",
            "Users must be 18 years of age or older. Minors are prohibited from using the Platform without verifiable guardian consent.",
            "These Terms are governed by the laws of Alberta, Canada.",
          ],
        },
        {
          heading: "3. User Roles & Responsibilities",
          content: [
            "Employers: Responsible for the accuracy, legality, and completeness of all job postings. Must comply with Canadian federal and provincial labour laws. Must not post discriminatory, fraudulent, or misleading job listings.",
            "Candidates: Responsible for the accuracy of all profile information, resumes, and credentials submitted. Misrepresentation of qualifications is prohibited.",
            "Both roles: Must not use the Platform for any unlawful purpose or in any manner that could harm LynxHire, other users, or third parties.",
          ],
        },
        {
          heading: "4. Prohibited Use",
          content: [
            "Posting discriminatory job listings based on race, gender, religion, national origin, age, disability, or any other protected characteristic under Canadian human rights law.",
            "Posting fake, fraudulent, scam, or pyramid scheme job offers.",
            "Scraping, crawling, or systematically harvesting data from the Platform.",
            "Harassing, threatening, or abusing other users.",
            "Using automated bots or scripts to interact with the Platform.",
            "Misrepresenting identity, credentials, or company affiliation.",
            "Sharing, selling, or transferring account access to third parties.",
            "Circumventing any security, access control, or rate-limiting mechanism.",
          ],
        },
        {
          heading: "5. AI Matching & Recommendations",
          content:
            "LynxHire uses artificial intelligence to assist in job matching, candidate ranking, and recommendations. These AI outputs are informational tools only and do not constitute professional, legal, or hiring advice. LynxHire does not guarantee the accuracy, suitability, or completeness of any AI-generated recommendation. Employers and candidates are solely responsible for all hiring and employment decisions. See our full AI Disclaimer at /legal/ai-disclaimer.",
        },
        {
          heading: "6. Intellectual Property & Data Ownership",
          content: [
            "Users retain ownership of all content they submit (resumes, job postings, messages).",
            "By submitting content, users grant LynxHire a non-exclusive, royalty-free licence to process, display, and use that content to provide the Platform services.",
            "LynxHire retains all rights to its platform, AI models, algorithms, design, and underlying technology.",
            "Users may not reproduce, modify, or distribute LynxHire's proprietary content without written permission.",
          ],
        },
        {
          heading: "7. Subscription & Payments",
          content: [
            "Employer subscriptions are billed monthly in Canadian dollars (CAD) via Stripe.",
            "Subscriptions auto-renew unless cancelled before the billing period end.",
            "Free tier limitations apply as described on the Pricing page.",
            "Refunds are not provided for partial billing periods. Cancellations take effect at the end of the current billing period.",
            "LynxHire reserves the right to modify pricing with 30 days written notice.",
          ],
        },
        {
          heading: "8. Privacy & Data",
          content:
            "We collect, process, and store personal data in accordance with our Privacy Policy and Canadian PIPEDA requirements. By using the Platform, you consent to the data practices described in our Privacy Policy at /legal/privacy.",
        },
        {
          heading: "9. Disclaimers",
          content:
            'The Platform is provided "as is" without warranties of any kind, either express or implied. LynxHire does not guarantee uninterrupted service, job placement success, candidate quality, or employer legitimacy. We do not verify the accuracy of job postings beyond our automated systems.',
        },
        {
          heading: "10. Limitation of Liability",
          content:
            "To the maximum extent permitted by applicable law, LynxHire and its affiliates, directors, employees, and licensors are not liable for: hiring decisions made by employers or candidates, employment disputes between parties, lost profits or business opportunities, inaccurate data submitted by users, platform downtime or service interruptions, or actions of third parties. Our total aggregate liability shall not exceed the fees paid by you in the 12 months preceding the claim.",
        },
        {
          heading: "11. Indemnification",
          content:
            "You agree to indemnify, defend, and hold harmless LynxHire, Albor Digital LLC, and their respective officers, directors, and employees from any claims, damages, losses, or expenses (including legal fees) arising from your use of the Platform, your violation of these Terms, or your violation of any third-party rights.",
        },
        {
          heading: "12. Termination & Moderation",
          content: [
            "LynxHire reserves the right to remove any job posting, profile, or content that violates these Terms.",
            "We may suspend or permanently ban accounts for violations without prior notice.",
            "We may report illegal activity to relevant authorities.",
            "You may terminate your account at any time by contacting support@lynxhire.ca.",
            "Upon termination, your data will be handled in accordance with our Privacy Policy.",
          ],
        },
        {
          heading: "13. Governing Law & Dispute Resolution",
          content:
            "These Terms are governed by the laws of Alberta, Canada, without regard to conflict of laws principles. Any dispute arising from these Terms shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to binding arbitration under Canadian arbitration rules. Both parties waive the right to participate in class action proceedings to the extent permitted by Canadian law.",
        },
        {
          heading: "14. Changes to Terms",
          content:
            "LynxHire reserves the right to modify these Terms at any time. We will provide 30 days notice for material changes via email or in-platform notification. Continued use after the effective date constitutes acceptance of the revised Terms.",
        },
        {
          heading: "15. Contact",
          content:
            "Legal Contact: legal@lynxhire.ca\nPrivacy Officer: privacy@lynxhire.ca\nMailing Address: Albor Digital LLC, operating as LynxHire, Canada",
        },
      ]}
    />
  );
}
