import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Shell } from "@/components/layout/shell";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://www.lynxhire.ca"
  ),
  title: {
    default: "LynxHire — AI-Powered Recruitment Canada | PIPEDA Compliant Job Board",
    template: "%s — LynxHire",
  },
  description:
    "AI-powered recruitment Canada: skilled trades hiring platform and PIPEDA compliant job board. Canadian workforce optimization with skills-based matching software. Reduce resume spam for employers—ethical AI hiring tools for Canadian SMEs.",
  keywords: [
    "AI-powered recruitment Canada",
    "skilled trades hiring platform",
    "PIPEDA compliant job board",
    "Canadian workforce optimization",
    "skills-based matching software",
    "reduce resume spam for Canadian employers",
    "ethical AI hiring tools Canada",
    "precision recruitment for Canadian SMEs",
    "verified candidate matching Alberta",
    "high-skill immigrant recruitment tools",
    "internal trade labor matching",
    "Canadian industrial recruitment technology",
    "qualified talent acquisition Canada",
    "automated candidate screening for Canadian businesses",
    "Canadian jobs",
    "job board Canada",
    "AI hiring",
    "hire in Canada",
  ],
  authors: [{ name: "LynxHire", url: "https://www.lynxhire.ca" }],
  creator: "Albor Digital LLC",
  publisher: "LynxHire",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://www.lynxhire.ca",
    siteName: "LynxHire",
    title: "LynxHire — AI-Powered Recruitment Canada | PIPEDA Compliant Job Board",
    description:
      "Canadian workforce optimization with skills-based matching. PIPEDA compliant job board and ethical AI hiring tools for Canadian SMEs. Reduce resume spam, find qualified talent.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LynxHire — AI-powered recruitment Canada, PIPEDA compliant job board and skilled trades hiring platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LynxHire — AI-Powered Recruitment Canada | PIPEDA Compliant Job Board",
    description:
      "Canadian workforce optimization with skills-based matching. PIPEDA compliant job board and ethical AI hiring tools for Canadian SMEs.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo-icon.png",
    shortcut: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased", inter.className)}>
        <Shell>{children}</Shell>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
