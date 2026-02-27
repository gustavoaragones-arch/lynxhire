import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Shell } from "@/components/layout/shell";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LynxHire | Find quality candidates. Built for Canada.",
  description:
    "Find quality candidates. Hire verified talent. Built for Canada.",
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
