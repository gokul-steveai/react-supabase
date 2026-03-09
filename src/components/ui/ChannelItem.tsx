import { HiHashtag } from 'react-icons/hi';

interface ChannelItemProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

export default function ChannelItem({ name, isActive, onClick }: ChannelItemProps) {
  return (
    <div
      onClick={onClick}
      className={`group px-4 py-3 rounded-xl cursor-pointer transition-all ${
        isActive
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg scale-[1.02]'
          : 'hover:bg-gray-700/50 hover:scale-[1.01] active:scale-[0.99]'
      }`}
    >
      <div className="flex items-center gap-3">
        <HiHashtag className="text-xl flex-shrink-0" />
        <span className="font-medium truncate">{name}</span>
      </div>
    </div>
  );
}
