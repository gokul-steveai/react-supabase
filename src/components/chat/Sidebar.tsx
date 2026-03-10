import { IoChatbubbles } from 'react-icons/io5';
import { IoLogOut, IoClose } from 'react-icons/io5';
import ChannelItem from '../ui/ChannelItem';
import Button from '../ui/Button';
import IconButton from '../ui/IconButton';
import type { Database } from '../../db/schema';

type Channel = Database['public']['Tables']['channels']['Row'];

interface SidebarProps {
  channels: Channel[];
  selectedChannel: string | null;
  onSelectChannel: (id: string) => void;
  onSignOut: () => void;
  onClose?: () => void;
  username: string;
}

export default function Sidebar({ channels, selectedChannel, onSelectChannel, onSignOut, onClose, username }: SidebarProps) {
  return (
    <div className="w-72 sm:w-80 lg:w-72 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">
      <div className="p-4 sm:p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <IoChatbubbles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Channels</h3>
              <p className="text-xs text-gray-400">{channels.length} available</p>
            </div>
          </div>
          {onClose && (
            <IconButton
              icon={<IoClose className="w-6 h-6" />}
              onClick={onClose}
              className="lg:hidden hover:bg-gray-700 text-white"
            />
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {channels.map((channel) => (
          <ChannelItem
            key={channel.id}
            name={channel.slug}
            isActive={selectedChannel === channel.id}
            onClick={() => onSelectChannel(channel.id)}
          />
        ))}
      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{username}</p>
            <p className="text-xs text-green-400">● Online</p>
          </div>
        </div>
        <Button
          variant="danger"
          onClick={onSignOut}
          className="w-full flex items-center justify-center gap-2"
        >
          <IoLogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
}
