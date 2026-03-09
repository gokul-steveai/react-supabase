import { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import Button from '../ui/Button';

interface MessageInputProps {
  onSend: (message: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 sm:p-4 md:p-6 bg-white border-t border-gray-200">
      <div className="flex gap-2 sm:gap-3 items-end">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Type a message..."
            rows={1}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
          />
        </div>
        <Button
          type="submit"
          disabled={!message.trim()}
          className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-medium hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <IoSend className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
}
