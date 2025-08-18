"use client";

import { useState, useEffect } from 'react';
import { Users, Circle, MessageCircle, Wifi, WifiOff } from 'lucide-react';
import { useCollaboration } from '@/hooks/useCollaboration';

interface RealTimeCollaborationProps {
  fileId: string;
  className?: string;
}

export default function RealTimeCollaboration({ fileId, className = '' }: RealTimeCollaborationProps) {
  const {
    isConnected,
    collaborationState,
    typingUsers,
    connectionError,
    updatePresence
  } = useCollaboration(fileId);

  const [showDetails, setShowDetails] = useState(false);
  const [presenceStatus, setPresenceStatus] = useState<'online' | 'away' | 'offline'>('online');

  // Update presence when status changes
  useEffect(() => {
    updatePresence(presenceStatus);
  }, [presenceStatus, updatePresence]);

  // Auto-away detection
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleActivity = () => {
      if (presenceStatus === 'away') {
        setPresenceStatus('online');
        updatePresence('online');
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setPresenceStatus('away');
        updatePresence('away');
      }, 5 * 60 * 1000); // 5 minutes
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => document.addEventListener(event, handleActivity));

    return () => {
      events.forEach(event => document.removeEventListener(event, handleActivity));
      clearTimeout(timeout);
    };
  }, [presenceStatus, updatePresence]);

  const getPresenceColor = (status: 'online' | 'away' | 'offline') => {
    switch (status) {
      case 'online':
        return 'text-green-500';
      case 'away':
        return 'text-yellow-500';
      case 'offline':
        return 'text-gray-500';
    }
  };

  const getPresenceIcon = (status: 'online' | 'away' | 'offline') => {
    switch (status) {
      case 'online':
        return <Circle className="h-2 w-2 fill-current" />;
      case 'away':
        return <Circle className="h-2 w-2 fill-current" />;
      case 'offline':
        return <Circle className="h-2 w-2" />;
    }
  };

  if (!isConnected && !connectionError) {
    return null; // Don't show anything if not connected
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Connection Status */}
      <div className="flex items-center space-x-1">
        {isConnected ? (
          <Wifi className="h-4 w-4 text-green-500" />
        ) : (
          <WifiOff className="h-4 w-4 text-red-500" />
        )}
      </div>

      {/* Active Users Count */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Users className="h-4 w-4" />
        <span>{collaborationState.users.length}</span>
      </button>

      {/* Typing Indicator */}
      {typingUsers.size > 0 && (
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <MessageCircle className="h-4 w-4" />
          <span>
            {Array.from(typingUsers).slice(0, 2).join(', ')}
            {typingUsers.size > 2 && ` and ${typingUsers.size - 2} others`}
            {' typing...'}
          </span>
        </div>
      )}

      {/* Presence Status */}
      <div className="flex items-center space-x-1">
        <div className={`${getPresenceColor(presenceStatus)}`}>
          {getPresenceIcon(presenceStatus)}
        </div>
        <select
          value={presenceStatus}
          onChange={(e) => setPresenceStatus(e.target.value as 'online' | 'away' | 'offline')}
          className="text-xs border-none bg-transparent focus:ring-0 cursor-pointer"
        >
          <option value="online">Online</option>
          <option value="away">Away</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      {/* Connection Error */}
      {connectionError && (
        <div className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded">
          Connection failed
        </div>
      )}

      {/* Detailed Collaboration Panel */}
      {showDetails && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-3">Active Collaborators</h3>
            
            {collaborationState.users.length === 0 ? (
              <p className="text-sm text-gray-500">No active collaborators</p>
            ) : (
              <div className="space-y-2">
                {collaborationState.users.map((user) => (
                  <div key={user.id} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.displayName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    {typingUsers.has(user.email) && (
                      <span className="text-xs text-blue-500">typing...</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Cursor Positions */}
            {collaborationState.cursors.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-200">
                <h4 className="text-xs font-medium text-gray-700 mb-2">Active Cursors</h4>
                <div className="space-y-1">
                  {collaborationState.cursors.map((cursor) => {
                    const user = collaborationState.users.find(u => u.id === cursor.userId);
                    return (
                      <div key={cursor.userId} className="text-xs text-gray-600">
                        {user?.displayName || 'Unknown user'}: ({cursor.x}, {cursor.y})
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Connection Info */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Status:</span>
                <span className={isConnected ? 'text-green-600' : 'text-red-600'}>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Users:</span>
                <span>{collaborationState.users.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
