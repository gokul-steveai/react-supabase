import { useState, useEffect } from 'react';
import { supabase } from '../db/client';
import { useAuth } from '../contexts/AuthContext';
import { useChannels } from '../hooks/useChannels';
import { useMessages } from '../hooks/useMessages';
import ChatLayout from '../components/layouts/ChatLayout';
import Sidebar from '../components/chat/Sidebar';
import ChatHeader from '../components/chat/ChatHeader';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MessageInput';
import EmptyState from '../components/chat/EmptyState';
import { useNavigate } from 'react-router-dom';

export default function Chat() {
  const { user, signOut } = useAuth();
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [totalMembers, setTotalMembers] = useState(0);
  const [onlineMembers, setOnlineMembers] = useState(0);
  const channels = useChannels();
  const {messages, setMessages} = useMessages(selectedChannel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserStats = async () => {
      const { count: total } = await supabase.from('users').select('*', { count: 'exact', head: true });
      const { count: online } = await supabase.from('users').select('*', { count: 'exact', head: true }).eq('status', 'ONLINE');
      setTotalMembers(total || 0);
      setOnlineMembers(online || 0);
    };
    fetchUserStats();
  }, []);

  useEffect(() => {
    if (user) {
      supabase
        .from('users')
        .select('username')
        .eq('id', user.id)
        .single()
        .then(({ data }) => setUsername(data?.username || user.email || ''));
    }
  }, [user]);

  useEffect(() => {
    if (channels.length > 0 && !selectedChannel) {
      setSelectedChannel(channels[0].id);
    }
  }, [channels, selectedChannel]);

  const handleSend = async (message: string) => {
    if (!selectedChannel || !user) return;
    
    const { data } = await supabase.from('messages').insert({ 
      message, 
      user_id: user.id, 
      channel_id: selectedChannel 
    }).select('*, users(username)').single() ;
    
    if (data) {
      setMessages((prev) => [...prev, data]);
    }
  };

  const handleSelectChannel = (channelId: string) => {
    setSelectedChannel(channelId);
    setSidebarOpen(false);
  };

  const selectedChannelData = channels.find(c => c.id === selectedChannel);

  const signOutUser = async () => {
    await signOut();
    navigate('/');
  }

  return (
    <ChatLayout>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:transform-none ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <Sidebar
          channels={channels}
          selectedChannel={selectedChannel}
          onSelectChannel={handleSelectChannel}
          onSignOut={signOutUser}
          onClose={() => setSidebarOpen(false)}
          username={username}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {selectedChannel ? (
          <>
            <ChatHeader 
              channelName={selectedChannelData?.slug || ''} 
              totalMembers={totalMembers}
              onlineMembers={onlineMembers}
              onMenuClick={() => setSidebarOpen(true)}
            />
            <MessageList messages={messages} currentUserId={user?.id || ''} />
            <MessageInput onSend={handleSend} />
          </>
        ) : (
          <EmptyState onMenuClick={() => setSidebarOpen(true)} />
        )}
      </div>
    </ChatLayout>
  );
}
