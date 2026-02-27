import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("type")
    .eq("id", user.id)
    .single();

  const type = (profile?.type ?? "candidate") as "candidate" | "employer";

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar type={type} />
      {/* Content pushes right of the 64px collapsed sidebar */}
      <div className="flex-1 flex flex-col ml-16 min-w-0">
        {children}
      </div>
    </div>
  );
}
