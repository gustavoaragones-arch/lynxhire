import { LegalPage } from "@/components/legal/legal-page";

export const metadata = { title: "Responsible AI Charter — LynxHire" };

export default function ResponsibleAIPage() {
  return (
    <LegalPage
      title="Responsible AI Charter"
      effectiveDate="January 1, 2026"
      lastUpdated="March 1, 2026"
      intro="LynxHire is committed to deploying AI in a manner that is fair, transparent, accountable, and respectful of Canadian values and human rights. This Charter outlines our principles and commitments."
      sections={[
        {
          heading: "1. Our Principles",
          content: [
            "Fairness: We actively work to identify and reduce bias in AI outputs. Protected characteristics are never used as ranking factors.",
            "Transparency: We disclose when AI is being used and provide explainability on request.",
            "Accountability: Humans remain in control of all hiring decisions. AI assists, never decides.",
            "Privacy by Design: AI systems are built with data minimization and privacy protection from the ground up.",
            "Continuous Improvement: We review AI performance and update models and policies regularly.",
          ],
        },
        {
          heading: "2. Regulatory Alignment",
          content: [
            "PIPEDA (Canada): AI data processing complies with consent, purpose limitation, and accountability requirements.",
            "Canadian Human Rights Act: AI matching does not discriminate on protected grounds.",
            "GDPR (EU): GDPR-ready architecture for EU residents including lawful basis, data subject rights, and SCCs.",
            "Emerging AI Governance: We monitor the Canadian AI and Data Act (AIDA) and will adapt as regulations evolve.",
          ],
        },
        {
          heading: "3. Algorithmic Bias Mitigation",
          content: [
            "Regular audits of AI match score distributions across demographic proxies.",
            "Input feature review to exclude or neutralize potentially discriminatory signals.",
            "Ongoing monitoring for disparate impact patterns.",
            "Feedback mechanisms for users to report perceived bias.",
          ],
        },
        {
          heading: "4. Data Governance",
          content: [
            "Personal data used for AI matching is processed under strict access controls.",
            "We do not train custom AI models on LynxHire user data.",
            "AI inference is performed at request time; outputs are not permanently stored beyond operational necessity.",
            "Subprocessor (Anthropic) is bound by data processing agreements.",
          ],
        },
        {
          heading: "5. Human Oversight",
          content:
            "Every AI feature on LynxHire is designed as a decision support tool, not a decision-making authority. Employers must review AI match scores critically and make independent hiring assessments. We provide explainability on request to support informed human oversight.",
        },
        {
          heading: "6. Contact & Feedback",
          content:
            "AI governance questions: legal@lynxhire.ca\nTo report AI bias or concerns: safety@lynxhire.ca",
        },
      ]}
    />
  );
}
