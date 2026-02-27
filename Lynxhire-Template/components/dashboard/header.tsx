import { Bell } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export async function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", user?.id ?? "")
    .single();

  const initials =
    profile?.full_name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ?? "?";

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-background">
      <div>
        <h1 className="font-heading font-bold text-foreground text-lg leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          type="button"
          className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-card transition-all relative"
        >
          <Bell size={16} className="text-muted-foreground" />
          {/* Unread dot */}
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" />
        </button>

        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-primary-foreground"
          style={{ backgroundColor: "var(--primary)" }}
        >
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt=""
              className="w-full h-full rounded-lg object-cover"
            />
          ) : (
            initials
          )}
        </div>
      </div>
    </header>
  );
}
