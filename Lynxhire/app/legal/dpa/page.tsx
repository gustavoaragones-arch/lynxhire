import { LegalPage } from "@/components/legal/legal-page";

export const metadata = { title: "Data Processing Agreement — LynxHire" };

export default function DPAPage() {
  return (
    <LegalPage
      title="Data Processing Agreement (DPA)"
      effectiveDate="January 1, 2026"
      lastUpdated="March 1, 2026"
      intro="This Data Processing Addendum applies to employers (Controllers) using LynxHire (Processor) to process candidate personal data. This DPA is incorporated into the Terms of Service."
      sections={[
        {
          heading: "1. Definitions",
          content: [
            "Controller: The employer entity using LynxHire to process candidate data.",
            "Processor: LynxHire (Albor Digital LLC).",
            "Personal Data: Any data relating to an identifiable individual processed through the Platform.",
            "Processing: Any operation performed on personal data including collection, storage, use, and deletion.",
          ],
        },
        {
          heading: "2. Scope",
          content:
            "This DPA applies to all processing of candidate personal data that occurs through the LynxHire Platform at the Controller's direction, including job posting, application review, and candidate messaging.",
        },
        {
          heading: "3. Processor Obligations",
          content: [
            "Process personal data only on documented instructions from the Controller (i.e., the Platform's intended functions).",
            "Implement appropriate technical and organizational security measures.",
            "Ensure all personnel with access to personal data are bound by confidentiality obligations.",
            "Assist Controllers in fulfilling data subject rights requests within 30 days.",
            "Delete or return all personal data upon termination of the relationship, unless legally required to retain.",
            "Notify Controllers within 72 hours of becoming aware of a personal data breach.",
          ],
        },
        {
          heading: "4. Subprocessors",
          content: [
            "LynxHire engages the following subprocessors: Supabase Inc. (database hosting), Stripe Inc. (payment processing), Anthropic PBC (AI inference).",
            "All subprocessors are bound by data processing agreements.",
            "LynxHire will notify Controllers of any material changes to subprocessors with reasonable advance notice.",
          ],
        },
        {
          heading: "5. Data Subject Rights",
          content:
            "LynxHire will assist employers in responding to candidate data subject rights requests including access, correction, deletion, and portability. Requests should be directed to privacy@lynxhire.ca.",
        },
        {
          heading: "6. International Transfers",
          content:
            "Where personal data is transferred outside Canada, LynxHire will ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) as required by GDPR for EU residents.",
        },
        {
          heading: "7. Audit Rights",
          content:
            "Controllers may request written confirmation of compliance with this DPA annually. LynxHire will provide relevant documentation upon reasonable request.",
        },
        {
          heading: "8. Contact",
          content:
            "DPA and enterprise data questions: legal@lynxhire.ca\nPrivacy Officer: privacy@lynxhire.ca",
        },
      ]}
    />
  );
}
