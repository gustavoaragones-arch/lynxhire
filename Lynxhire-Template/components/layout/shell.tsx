"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const BARE_PATHS = ["/onboarding", "/dashboard"];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBare = BARE_PATHS.some((p) => pathname?.startsWith(p));

  if (isBare) {
    return <>{children}</>;
  }
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
