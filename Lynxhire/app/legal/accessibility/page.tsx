import { LegalPage } from "@/components/legal/legal-page";

export const metadata = { title: "Accessibility Statement — LynxHire" };

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility Statement"
      effectiveDate="January 1, 2026"
      lastUpdated="March 1, 2026"
      intro="LynxHire is committed to making our platform accessible to all Canadians, including those with disabilities."
      sections={[
        {
          heading: "1. Our Commitment",
          content:
            "We are working toward compliance with WCAG 2.1 Level AA accessibility standards. We believe all Canadians deserve equal access to employment opportunities through our platform.",
        },
        {
          heading: "2. Current Accessibility Features",
          content: [
            "Semantic HTML structure for screen reader compatibility.",
            "Keyboard navigation support for all interactive elements.",
            "Sufficient colour contrast ratios (minimum 4.5:1 for text).",
            "Alt text on all meaningful images.",
            "Form labels explicitly associated with all input fields.",
            "Visible focus indicators for keyboard users.",
          ],
        },
        {
          heading: "3. Known Limitations",
          content:
            "We are actively working to improve accessibility across the platform. Some complex interactive components (e.g., real-time messaging) are still being optimised for full screen reader compatibility.",
        },
        {
          heading: "4. Feedback & Assistance",
          content:
            "If you experience accessibility barriers, please contact us at accessibility@lynxhire.ca. We will work with you directly to ensure you can access the services you need. Response time: 2 business days.",
        },
        {
          heading: "5. Ongoing Improvement",
          content:
            "We conduct periodic accessibility audits and prioritize accessibility improvements in our development roadmap. We welcome feedback from users with disabilities to help us improve.",
        },
      ]}
    />
  );
}
