"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LynxHireLogo } from "@/components/logo";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Search,
  FileText,
  Bookmark,
  User,
  MessageSquare,
  Settings,
  PlusCircle,
  Briefcase,
  Users,
  CreditCard,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const candidateNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/candidate", icon: LayoutDashboard },
  { label: "Browse Jobs", href: "/dashboard/candidate/browse", icon: Search },
  {
    label: "My Applications",
    href: "/dashboard/candidate/applications",
    icon: FileText,
  },
  { label: "Saved Jobs", href: "/dashboard/candidate/saved", icon: Bookmark },
  { label: "Profile", href: "/dashboard/candidate/profile", icon: User },
  {
    label: "Messages",
    href: "/dashboard/candidate/messages",
    icon: MessageSquare,
  },
];

const employerNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/employer", icon: LayoutDashboard },
  {
    label: "Post a Job",
    href: "/dashboard/employer/post-job",
    icon: PlusCircle,
  },
  { label: "My Jobs", href: "/dashboard/employer/jobs", icon: Briefcase },
  {
    label: "Applicants",
    href: "/dashboard/employer/applicants",
    icon: Users,
  },
  {
    label: "Messages",
    href: "/dashboard/employer/messages",
    icon: MessageSquare,
  },
];

interface SidebarProps {
  type: "candidate" | "employer";
}

export function DashboardSidebar({ type }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const navItems = type === "candidate" ? candidateNav : employerNav;
  const basePath = `/dashboard/${type}`;

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="fixed left-0 top-0 h-screen z-40 flex flex-col transition-all duration-300 ease-in-out"
      style={{
        width: expanded ? "240px" : "64px",
        backgroundColor: "var(--sidebar-bg)",
        borderRight: "1px solid var(--sidebar-border)",
      }}
    >
      {/* Logo */}
      <div
        className="h-16 flex items-center px-4 overflow-hidden"
        style={{ borderBottom: "1px solid var(--sidebar-border)" }}
      >
        {expanded ? (
          <LynxHireLogo variant="dark" />
        ) : (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <span className="text-white font-black text-sm">L</span>
          </div>
        )}
      </div>

      {/* Main nav */}
      <nav className="flex-1 py-4 overflow-hidden">
        <div className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== basePath && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group"
                style={{
                  backgroundColor: isActive
                    ? "var(--sidebar-accent)"
                    : "transparent",
                  color: isActive
                    ? "var(--sidebar-text-active)"
                    : "var(--sidebar-text)",
                }}
                title={!expanded ? item.label : undefined}
              >
                <Icon
                  size={18}
                  style={{
                    color: isActive ? "var(--primary)" : "inherit",
                    flexShrink: 0,
                  }}
                />
                {expanded && (
                  <span className="text-sm font-medium whitespace-nowrap transition-opacity duration-200">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom nav */}
      <div
        className="py-4 px-2 space-y-1"
        style={{ borderTop: "1px solid var(--sidebar-border)" }}
      >
        <Link
          href={`${basePath}/settings`}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
          style={{ color: "var(--sidebar-text)" }}
        >
          <Settings size={18} style={{ flexShrink: 0 }} />
          {expanded && (
            <span className="text-sm font-medium whitespace-nowrap">
              Settings
            </span>
          )}
        </Link>

        {type === "employer" && (
          <Link
            href="/dashboard/employer/billing"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
            style={{ color: "var(--sidebar-text)" }}
          >
            <CreditCard size={18} style={{ flexShrink: 0 }} />
            {expanded && (
              <span className="text-sm font-medium whitespace-nowrap">
                Billing
              </span>
            )}
          </Link>
        )}

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left"
          style={{ color: "var(--sidebar-text)" }}
        >
          <LogOut size={18} style={{ flexShrink: 0 }} />
          {expanded && (
            <span className="text-sm font-medium whitespace-nowrap">
              Log Out
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
