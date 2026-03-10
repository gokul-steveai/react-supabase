import { useEffect, useState, useRef } from 'react';
import { supabase } from '../db/client';
import { MessageEncryption } from '../utils/encryption';
import type { Database } from '../db/schema';
import type { RealtimeChannel } from '@supabase/supabase-js';

type Message = Database['public']['Tables']['messages']['Row'] & {
  users: { username: string | null } | null;
};

export function useMessages(channelId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const encryptionKeyRef = useRef<CryptoKey | null>(null);

  useEffect(() => {
    const initEncryption = async (): Promise<void> => {
      const key = await MessageEncryption.getSharedKey();
      encryptionKeyRef.current = key;
    };
    initEncryption();
  }, []);

  useEffect(() => {
    if (!channelId) return;

    let channel: RealtimeChannel;

    const setup = async (): Promise<void> => {
      const { data } = await supabase
        .from("messages")
        .select("*, users(username)")
        .eq("channel_id", channelId)
        .order("inserted_at", { ascending: true });

      if (data && encryptionKeyRef.current) {
        const decryptedMessages = await Promise.all(
          data.map(async (msg) => ({
            ...msg,
            message: msg.message ? await MessageEncryption.decrypt(msg.message, encryptionKeyRef.current!) : null
          }))
        );
        setMessages(decryptedMessages as Message[]);
      }
      setLoading(false);

      channel = supabase
        .channel(`room:${channelId}`)
        .on('broadcast', { event: 'new_message' }, ({ payload }: { payload: Message }) => {
          setMessages((prev) => 
            prev.some(m => m.id === payload.id) ? prev : [...prev, payload]
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
