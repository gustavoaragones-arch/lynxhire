"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Send } from "lucide-react";

interface Message {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

interface Conversation {
  other_user_id: string;
  other_user_name: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
}

interface MessagingProps {
  userId: string;
  conversations: Conversation[];
}

export function Messaging({
  userId,
  conversations: initialConversations,
}: MessagingProps) {
  const [conversations] = useState<Conversation[]>(initialConversations);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    initialConversations[0]?.other_user_id ?? null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState<string>(
    initialConversations[0]?.other_user_name ?? ""
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedUserId) return;
    const supabase = createClient();

    const filter = `and(sender_id.eq.${userId},recipient_id.eq.${selectedUserId}),and(sender_id.eq.${selectedUserId},recipient_id.eq.${userId})`;

    supabase
      .from("messages")
      .select("id, sender_id, content, created_at, is_read")
      .or(filter)
      .order("created_at", { ascending: true })
      .then(({ data }) => setMessages((data as Message[]) ?? []));

    supabase
      .from("messages")
      .update({ is_read: true })
      .eq("recipient_id", userId)
      .eq("sender_id", selectedUserId);

    const channel = supabase
      .channel(`messages-${userId}-${selectedUserId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `recipient_id=eq.${userId}`,
        },
        (payload) => {
          const newMsg = payload.new as Message;
          if (newMsg.sender_id === selectedUserId) {
            setMessages((prev) => [...prev, newMsg]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedUserId, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUserId) return;
    setSending(true);

    const supabase = createClient();
    const { data, error } = await supabase
      .from("messages")
      .insert({
        sender_id: userId,
        recipient_id: selectedUserId,
        content: newMessage.trim(),
        is_read: false,
      })
      .select("id, sender_id, content, created_at, is_read")
      .single();

    if (!error && data) {
      setMessages((prev) => [...prev, data as Message]);
      setNewMessage("");
    }
    setSending(false);
  }

  if (conversations.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-12 text-center">
        <p className="text-4xl mb-3">💬</p>
        <p className="font-heading font-bold text-foreground mb-1">
          No messages yet
        </p>
        <p className="text-muted-foreground text-sm">
          Messages from employers will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden flex h-[600px]">
      <div className="w-64 border-r border-border flex-shrink-0 overflow-y-auto">
        {conversations.map((conv) => (
          <button
            key={conv.other_user_id}
            onClick={() => {
              setSelectedUserId(conv.other_user_id);
              setSelectedUserName(conv.other_user_name);
            }}
            className={`w-full text-left p-4 border-b border-border transition-all ${
              selectedUserId === conv.other_user_id
                ? "bg-primary/5"
                : "hover:bg-muted/30"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {conv.other_user_name}
                </p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {conv.last_message}
                </p>
              </div>
              {conv.unread_count > 0 && (
                <span className="flex-shrink-0 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-primary-foreground bg-primary">
                  {conv.unread_count}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="px-5 py-4 border-b border-border">
          <p className="font-medium text-foreground text-sm">
            {selectedUserName}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => {
            const isOwn = msg.sender_id === userId;
            return (
              <div
                key={msg.id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${
                    isOwn
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  <p>{msg.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isOwn
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {new Date(msg.created_at).toLocaleTimeString("en-CA", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={sendMessage}
          className="p-4 border-t border-border flex gap-2"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            maxLength={1000}
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
          <button
            type="submit"
            disabled={sending || !newMessage.trim()}
            className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-60 transition-all"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
