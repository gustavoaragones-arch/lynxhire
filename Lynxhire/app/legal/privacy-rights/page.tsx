import { LegalPage } from "@/components/legal/legal-page";

export const metadata = { title: "Your Privacy Rights (PIPEDA) — LynxHire" };

export default function PrivacyRightsPage() {
  return (
    <LegalPage
      title="Your Privacy Rights Under PIPEDA"
      effectiveDate="January 1, 2026"
      lastUpdated="March 1, 2026"
      intro="As a Canadian resident, you have rights under the Personal Information Protection and Electronic Documents Act (PIPEDA). This page explains those rights and how to exercise them."
      sections={[
        {
          heading: "1. Right to Access",
          content:
            "You have the right to request a copy of all personal information LynxHire holds about you. We will provide this within 30 days of a verified request. To request access: email privacy@lynxhire.ca with subject \"Data Access Request\" and proof of identity.",
        },
        {
          heading: "2. Right to Correction",
          content:
            "You have the right to request correction of any inaccurate or incomplete personal information. Most profile data can be updated directly in your dashboard settings. For account-level corrections, contact privacy@lynxhire.ca.",
        },
        {
          heading: "3. Right to Deletion",
          content:
            "You have the right to request deletion of your personal information (\"right to be forgotten\"). To delete your account and all associated data, email privacy@lynxhire.ca with subject \"Account Deletion Request\". Deletion is completed within 30 days. Some data may be retained where legally required (e.g., billing records for 7 years).",
        },
        {
          heading: "4. Right to Withdraw Consent",
          content:
            "Where processing is based on consent (e.g., marketing emails), you may withdraw consent at any time. Use the unsubscribe link in any marketing email, or contact privacy@lynxhire.ca. Withdrawal does not affect processing completed before withdrawal.",
        },
        {
          heading: "5. Right to Data Portability",
          content:
            "You may request a copy of your data in a structured, machine-readable format (JSON or CSV). Email privacy@lynxhire.ca with subject \"Data Portability Request\".",
        },
        {
          heading: "6. Right to File a Complaint",
          content:
            "If you believe LynxHire has not handled your personal information in accordance with PIPEDA, you may file a complaint with the Office of the Privacy Commissioner of Canada (OPC) at priv.gc.ca or 1-800-282-1376. We encourage you to contact us first at privacy@lynxhire.ca — we aim to resolve all privacy concerns directly.",
        },
        {
          heading: "7. Response Timelines",
          content: [
            "Access requests: 30 days",
            "Correction requests: 14 days",
            "Deletion requests: 30 days",
            "Portability requests: 30 days",
            "Urgent requests (breach-related): 72 hours",
          ],
        },
        {
          heading: "8. Contact",
          content:
            "Privacy Officer: privacy@lynxhire.ca\nOffice of the Privacy Commissioner of Canada: priv.gc.ca",
        },
      ]}
    />
  );
}
