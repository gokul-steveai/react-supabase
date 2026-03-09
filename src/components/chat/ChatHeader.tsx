import { HiHashtag, HiMenu } from 'react-icons/hi';
import IconButton from '../ui/IconButton';

interface ChatHeaderProps {
  channelName: string;
  totalMembers: number;
  onlineMembers: number;
  onMenuClick: () => void;
}

export default function ChatHeader({ channelName, totalMembers, onlineMembers, onMenuClick }: ChatHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
      <div className="flex items-center gap-3">
        <IconButton
          icon={<HiMenu className="w-6 h-6 text-gray-600" />}
          onClick={onMenuClick}
          className="lg:hidden"
        />
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
          <HiHashtag className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{channelName}</h2>
          <p className="text-xs sm:text-sm text-gray-500">{totalMembers} members, {onlineMembers} online</p>
        </div>
      </div>
    </div>
  );
}
