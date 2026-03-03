import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/jobs", "/jobs/", "/legal/"],
        disallow: ["/dashboard/", "/onboarding/", "/auth/", "/api/"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://www.lynxhire.ca"}/sitemap.xml`,
  };
}
