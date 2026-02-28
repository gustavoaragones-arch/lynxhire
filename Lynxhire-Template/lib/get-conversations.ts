import { createClient } from "@/lib/supabase/server";

export async function getConversations(userId: string) {
  const supabase = await createClient();

  const { data: msgs } = await supabase
    .from("messages")
    .select("sender_id, recipient_id, content, created_at, is_read")
    .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
    .order("created_at", { ascending: false });

  if (!msgs?.length) return [];

  const seen = new Set<string>();
  const conversations: {
    other_user_id: string;
    last_message: string;
    last_message_at: string;
    unread_count: number;
  }[] = [];

  for (const msg of msgs) {
    const otherId =
      msg.sender_id === userId ? msg.recipient_id : msg.sender_id;
    if (seen.has(otherId)) continue;
    seen.add(otherId);

    const unreadCount = msgs.filter(
      (m) =>
        m.sender_id === otherId &&
        m.recipient_id === userId &&
        !m.is_read
    ).length;

    conversations.push({
      other_user_id: otherId,
      last_message: msg.content,
      last_message_at: msg.created_at,
      unread_count: unreadCount,
    });
  }

  const partnerIds = conversations.map((c) => c.other_user_id);
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name")
    .in("id", partnerIds);

  const nameMap = Object.fromEntries(
    profiles?.map((p) => [p.id, p.full_name ?? "Unknown"]) ?? []
  );

  return conversations.map((c) => ({
    ...c,
    other_user_name: nameMap[c.other_user_id] ?? "Unknown",
  }));
}
