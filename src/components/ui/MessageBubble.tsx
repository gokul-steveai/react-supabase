import Avatar from './Avatar';

interface MessageBubbleProps {
  username: string;
  message: string;
  timestamp: string;
  isCurrentUser?: boolean;
}

export default function MessageBubble({ username, message, timestamp, isCurrentUser = false }: MessageBubbleProps) {
  return (
    <div className={`group rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all ${isCurrentUser ? 'flex justify-end' : ''}`}>
      <div className={`flex items-start gap-2 sm:gap-3 ${isCurrentUser ? 'max-w-[55%]' : 'max-w-[65%]'}`}>
        {!isCurrentUser && <Avatar name={username} size="sm" />}
        <div className="flex-1 min-w-0">
          <div className={`flex items-center gap-2 mb-1 ${isCurrentUser ? 'justify-end' : ''}`}>
            <strong className="text-sm sm:text-base text-gray-900 font-semibold truncate">{isCurrentUser ? 'You' : username}</strong>
            <span className="text-xs text-gray-500 flex-shrink-0">{timestamp}</span>
          </div>
          <div className={`text-sm sm:text-base break-words rounded-2xl px-4 py-2 ${isCurrentUser ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-auto' : 'bg-white text-gray-900 shadow-sm'}`}>{message}</div>
        </div>
        {isCurrentUser && <Avatar name={username} size="sm" />}
      </div>
    </div>
  );
}
