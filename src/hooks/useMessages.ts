import { useEffect, useState } from 'react';
import { supabase } from '../db/client';
import type { Database } from '../db/schema';
import type { RealtimeChannel } from '@supabase/supabase-js';

type Message = Database['public']['Tables']['messages']['Row'] & {
  users: { username: string | null } | null;
};

export function useMessages(channelId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!channelId) return;

    let subscription: RealtimeChannel | undefined;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*, users(username)")
        .eq("channel_id", channelId)
        .order("inserted_at", { ascending: true });

      if (!error && data) {
        setMessages(data as Message[]);
      }

      setLoading(false);
    };

    const subscribeToMessages = () => {
      subscription = supabase
        .channel(`messages-${channelId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `channel_id=eq.${channelId}`,
          },
          (payload) => {
            const newMessage = payload.new as Message;
            setMessages((prev: Message[]) => {
              if (prev.find((m) => m.id === newMessage.id)) return prev;
              return [...prev, newMessage];
            });
          }
        )
        .subscribe();
    };

    fetchMessages();
    subscribeToMessages();

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [channelId]);

  return { messages, loading, setMessages };
}
