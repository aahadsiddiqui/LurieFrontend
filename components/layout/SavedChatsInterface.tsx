'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Star, 
  StarOff,
  MessageSquare,
  Bot,
  User,
  Clock,
  ChevronRight,
  Plus,
  Archive,
  Trash2,
  Pin,
  PinOff,
  Eye,
  EyeOff,
  Calendar,
  Tag,
  Users,
  Heart,
  Stethoscope,
  Activity,
  Shield,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/ui/utils';

interface SavedChat {
  id: string;
  title: string;
  type: 'chat' | 'agent' | 'team' | 'clinical' | 'research' | 'diagnostic';
  lastMessage: string;
  timestamp: Date;
  isPinned: boolean;
  participants: string[];
  messageCount: number;
  tags: string[];
  context?: string;
  savedDate: Date;
  notes?: string;
}

interface SavedChatsInterfaceProps {
  userInfo?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const mockSavedChats: SavedChat[] = [
  {
    id: '1',
    title: 'Cardiology Treatment Protocols',
    type: 'clinical',
    lastMessage: 'The new treatment protocol has shown 15% improvement in patient outcomes...',
    timestamp: new Date(Date.now() - 300000),
    isPinned: true,
    participants: ['Dr. Sarah Chen', 'Dr. Mike Johnson'],
    messageCount: 45,
    tags: ['Cardiology', 'Treatment', 'Protocols'],
    context: 'Clinical Assistant',
    savedDate: new Date(Date.now() - 86400000),
    notes: 'Important discussion about new cardiology protocols'
  },
  {
    id: '2',
    title: 'Oncology Research Findings',
    type: 'research',
    lastMessage: 'The meta-analysis reveals significant improvements in survival rates...',
    timestamp: new Date(Date.now() - 600000),
    isPinned: false,
    participants: ['Dr. Robert Kim', 'Dr. Lisa Park'],
    messageCount: 32,
    tags: ['Research', 'Oncology', 'Meta-analysis'],
    context: 'Research Bot',
    savedDate: new Date(Date.now() - 172800000),
    notes: 'Key research findings for oncology treatment'
  },
  {
    id: '3',
    title: 'Emergency Diagnostic Guidelines',
    type: 'diagnostic',
    lastMessage: 'Critical symptoms that require immediate attention include chest pain, shortness of breath...',
    timestamp: new Date(Date.now() - 900000),
    isPinned: true,
    participants: ['Dr. Sarah Chen'],
    messageCount: 28,
    tags: ['Emergency', 'Diagnosis', 'Guidelines'],
    context: 'Diagnostic Helper',
    savedDate: new Date(Date.now() - 259200000),
    notes: 'Essential emergency diagnostic protocols'
  },
  {
    id: '4',
    title: 'Team Discussion - Patient Safety',
    type: 'team',
    lastMessage: 'We need to implement new safety protocols for high-risk patients...',
    timestamp: new Date(Date.now() - 1200000),
    isPinned: false,
    participants: ['Dr. Sarah Chen', 'Dr. Mike Johnson', 'Dr. Lisa Park', 'Nurse Amy'],
    messageCount: 67,
    tags: ['Team', 'Safety', 'Protocols'],
    context: 'Team Discussion',
    savedDate: new Date(Date.now() - 345600000),
    notes: 'Important team discussion about patient safety'
  },
  {
    id: '5',
    title: 'General Healthcare AI Chat',
    type: 'chat',
    lastMessage: 'How can I help you with your healthcare needs today?',
    timestamp: new Date(Date.now() - 1800000),
    isPinned: false,
    participants: ['Dr. Sarah Chen'],
    messageCount: 15,
    tags: ['General', 'AI Assistant'],
    context: 'Healthcare AI Assistant',
    savedDate: new Date(Date.now() - 432000000),
    notes: 'Useful AI assistant conversation'
  }
];

const conversationIcons = {
  chat: MessageSquare,
  agent: Bot,
  team: Users,
  clinical: Stethoscope,
  research: Activity,
  diagnostic: Shield
};

const conversationColors = {
  chat: 'from-blue-500 to-cyan-500',
  agent: 'from-purple-500 to-violet-500',
  team: 'from-green-500 to-emerald-500',
  clinical: 'from-blue-500 to-cyan-500',
  research: 'from-purple-500 to-violet-500',
  diagnostic: 'from-red-500 to-pink-500'
};

export function SavedChatsInterface({ userInfo }: SavedChatsInterfaceProps) {
  const [savedChats, setSavedChats] = useState<SavedChat[]>(mockSavedChats);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'pinned' | 'saved'>('saved');

  const filteredChats = savedChats.filter(chat => {
    const matchesSearch = chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chat.notes?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || chat.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const sortedChats = [...filteredChats].sort((a, b) => {
    switch (sortBy) {
      case 'pinned':
        return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
      case 'recent':
        return b.timestamp.getTime() - a.timestamp.getTime();
      default:
        return b.savedDate.getTime() - a.savedDate.getTime();
    }
  });

  const togglePin = (id: string) => {
    setSavedChats(prev => prev.map(chat => 
      chat.id === id ? { ...chat, isPinned: !chat.isPinned } : chat
    ));
  };

  const removeFromSaved = (id: string) => {
    setSavedChats(prev => prev.filter(chat => chat.id !== id));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Saved Chats</h1>
              <p className="text-sm text-gray-500">Your favorited and bookmarked conversations</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Chat
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search saved chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="chat">Chat</option>
                <option value="clinical">Clinical</option>
                <option value="research">Research</option>
                <option value="diagnostic">Diagnostic</option>
                <option value="team">Team</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="saved">Recently Saved</option>
                <option value="pinned">Pinned</option>
                <option value="recent">Recent Activity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Saved Chats List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-3">
            <AnimatePresence>
              {sortedChats.map((chat, index) => {
                const Icon = conversationIcons[chat.type];
                const gradientClass = conversationColors[chat.type];
                
                return (
                  <motion.div
                    key={chat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={cn(
                      "bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer",
                      chat.isPinned && "border-yellow-200 bg-yellow-50"
                    )}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-sm font-medium text-gray-900 truncate">
                                {chat.title}
                              </h3>
                              {chat.isPinned && (
                                <Pin className="w-3 h-3 text-yellow-500" />
                              )}
                              <BookmarkCheck className="w-3 h-3 text-blue-500" />
                            </div>
                            
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                              {chat.lastMessage}
                            </p>

                            {chat.notes && (
                              <p className="text-xs text-gray-500 italic mb-2">
                                Note: {chat.notes}
                              </p>
                            )}

                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>{chat.context}</span>
                              <span>{chat.messageCount} messages</span>
                              <span>Saved {formatTime(chat.savedDate)}</span>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {chat.tags.map((tag, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-1 ml-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePin(chat.id);
                              }}
                            >
                              {chat.isPinned ? (
                                <PinOff className="w-4 h-4" />
                              ) : (
                                <Pin className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromSaved(chat.id);
                              }}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
