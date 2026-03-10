import { useEffect, useState } from 'react';
import { supabase } from '../db/client';
import type { Database } from '../db/schema';

type Channel = Database['public']['Tables']['channels']['Row'];

export function useChannels() {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const fetchChannels = async () => {
      const { data, error } = await supabase
        .from('channels')
        .select('*')
        .order('inserted_at');
      
      if (error) console.error('Error fetching channels:', error);
      if (data) setChannels(data);
    };

    fetchChannels();
    
    const sub = supabase
      .channel('channels')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'channels' }, fetchChannels)
      .subscribe();
    
    return () => {
      sub.unsubscribe();
    };
  }, []);

  return channels;
}
