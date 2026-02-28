import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { Messaging } from "@/components/dashboard/messaging";
import { getConversations } from "@/lib/get-conversations";

export default async function CandidateMessagesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const conversations = await getConversations(user.id);

  return (
    <>
      <DashboardHeader
        title="Messages"
        subtitle="Conversations with employers"
      />
      <main className="flex-1 p-6 max-w-4xl">
        <Messaging userId={user.id} conversations={conversations} />
      </main>
    </>
  );
}
