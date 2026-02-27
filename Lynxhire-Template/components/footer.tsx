import Link from "next/link";
import { LynxHireLogo } from "./logo";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandFacebook,
} from "@tabler/icons-react";

export function Footer() {
  const platform = [
    { title: "Browse Jobs", href: "/jobs" },
    { title: "Post a Job", href: "/employers" },
    { title: "Pricing", href: "/pricing" },
    { title: "For Employers", href: "/employers" },
    { title: "How It Works", href: "/#product" },
  ];

  const company = [
    { title: "About LynxHire", href: "/#home" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/#home" },
    { title: "Careers", href: "/#home" },
    { title: "Press", href: "/#home" },
  ];

  const legal = [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
    { title: "PIPEDA Rights", href: "/privacy" },
    { title: "Cookie Policy", href: "/privacy" },
    { title: "AI Disclaimer", href: "/privacy" },
  ];

  return (
    <footer className="w-full max-w-7xl mx-auto rounded-xl m-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="flex items-start flex-col">
            <LynxHireLogo variant="light" />
            <h2 className="text-2xl font-medium mt-8 max-w-md">
            Find quality candidates. Hire verified talent. Built for Canada.
            </h2>
          </div>

          <div className="grid justify-self-end grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h3 className="font-semibold">Platform</h3>
              <ul className="space-y-3">
                {platform.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="font-semibold">Company</h3>
              <ul className="space-y-3">
                {company.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="font-semibold">Legal</h3>
              <ul className="space-y-3">
                {legal.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-16 max-w-xs mx-auto">
          <p className="text-sm text-muted-foreground">© 2026 LynxHire | Albor Digital LLC | Built for Canada 🇨🇦</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <IconBrandTwitter size={20} />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <IconBrandLinkedin size={20} />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <IconBrandGithub size={20} />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <IconBrandFacebook size={20} />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <IconBrandInstagram size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
