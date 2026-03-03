import { LegalPage } from "@/components/legal/legal-page";

export const metadata = { title: "Cookie Notice — LynxHire" };

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Notice"
      effectiveDate="January 1, 2026"
      lastUpdated="March 1, 2026"
      intro="This Cookie Notice explains how LynxHire uses cookies and similar technologies when you visit our platform."
      sections={[
        {
          heading: "1. What Are Cookies",
          content:
            "Cookies are small text files stored on your device by your browser when you visit a website. They help websites remember your preferences and sessions.",
        },
        {
          heading: "2. Cookies We Use",
          content: [
            "Authentication Cookies (Essential): Used to keep you logged in during your session. Without these, the platform cannot function. These cannot be disabled.",
            "Session Cookies (Essential): Temporary cookies that expire when you close your browser, used to maintain your session state.",
            "Preference Cookies (Functional): Remember your settings and preferences such as dark/light mode.",
            "Analytics Cookies (Optional): If enabled, help us understand how the platform is used to improve our service. These are only activated with your consent.",
          ],
        },
        {
          heading: "3. We Do Not Use",
          content: [
            "Advertising or tracking cookies.",
            "Third-party marketing cookies.",
            "Cross-site tracking technologies.",
            "Fingerprinting or device tracking.",
          ],
        },
        {
          heading: "4. Managing Cookies",
          content:
            "You can control cookies through your browser settings. Disabling essential cookies will prevent you from logging in and using the platform. Most browsers allow you to view, delete, and block cookies via Settings → Privacy.",
        },
        {
          heading: "5. Contact",
          content: "Questions about cookies: privacy@lynxhire.ca",
        },
      ]}
    />
  );
}
