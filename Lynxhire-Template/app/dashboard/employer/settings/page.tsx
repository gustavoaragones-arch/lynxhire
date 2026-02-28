import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { CompanySettingsForm } from "@/components/dashboard/company-settings-form";

export default async function EmployerSettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: company } = await supabase
    .from("companies")
    .select("*")
    .eq("profile_id", user.id)
    .single();

  return (
    <>
      <DashboardHeader
        title="Company Settings"
        subtitle="Update your company information"
      />
      <main className="flex-1 p-6 max-w-2xl">
        <CompanySettingsForm userId={user.id} initialCompany={company ?? null} />
      </main>
    </>
  );
}
