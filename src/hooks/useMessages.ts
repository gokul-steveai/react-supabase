import { useEffect, useState, useMemo } from 'react';
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

    let channel: RealtimeChannel;

    const setup = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*, users(username)")
        .eq("channel_id", channelId)
        .order("inserted_at", { ascending: true });

      if (data) setMessages(data as Message[]);
      setLoading(false);

      channel = supabase
        .channel(`room:${channelId}`)
        .on('broadcast', { event: 'new_message' }, ({ payload }) => {
          setMessages((prev) => 
            prev.some(m => m.id === payload.id) ? prev : [...prev, payload as Message]
          );
        })
        .subscribe();
    };

    setup();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [channelId]);

  return { messages, loading, setMessages };
}
