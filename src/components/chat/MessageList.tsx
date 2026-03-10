import { useEffect, useRef } from 'react';
import MessageBubble from '../ui/MessageBubble';
import type { Database } from '../../db/schema';

type Message = Database['public']['Tables']['messages']['Row'] & {
  users: { username: string | null } | null;
};

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export default function MessageList({ messages, currentUserId }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3">
      {messages.map((msg, idx) => (
        <div
          key={msg.id}
          className="animate-fadeIn"
          style={{ animationDelay: `${idx * 0.05}s` }}
        >
          <MessageBubble
            username={msg.users?.username || 'Unknown'}
            message={msg.message || ''}
            timestamp={new Date(msg.inserted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            isCurrentUser={msg.user_id === currentUserId}
          />
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
