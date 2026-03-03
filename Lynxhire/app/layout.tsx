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
    default: "LynxHire — Canadian Job Platform Powered by AI",
    template: "%s — LynxHire",
  },
  description:
    "Find your next job or hire top Canadian talent with AI-powered matching. LynxHire connects employers and candidates across Canada.",
  keywords: [
    "Canadian jobs",
    "job board Canada",
    "AI hiring",
    "job search Canada",
    "hire in Canada",
    "Canadian recruitment",
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
    title: "LynxHire — Canadian Job Platform Powered by AI",
    description:
      "Find your next job or hire top Canadian talent with AI-powered matching.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LynxHire — Canadian Job Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LynxHire — Canadian Job Platform Powered by AI",
    description:
      "Find your next job or hire top Canadian talent with AI-powered matching.",
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
