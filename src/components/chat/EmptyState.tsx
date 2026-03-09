import { HiMenu } from 'react-icons/hi';
import { IoChatbubbles } from 'react-icons/io5';
import Button from '../ui/Button';

interface EmptyStateProps {
  onMenuClick: () => void;
}

export default function EmptyState({ onMenuClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-400 px-4">
      <Button
        onClick={onMenuClick}
        className="lg:hidden mb-6 p-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
      >
        <HiMenu className="w-6 h-6" />
      </Button>
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mb-4 sm:mb-6">
        <IoChatbubbles className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2 text-center">No Channel Selected</h3>
      <p className="text-sm sm:text-base text-gray-500 text-center">Choose a channel to start chatting</p>
    </div>
  );
}
