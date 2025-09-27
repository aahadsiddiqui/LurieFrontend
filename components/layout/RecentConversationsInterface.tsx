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
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/ui/utils';

interface Conversation {
  id: string;
  title: string;
  type: 'chat' | 'agent' | 'team' | 'clinical' | 'research' | 'diagnostic';
  lastMessage: string;
  timestamp: Date;
  isUnread: boolean;
  isPinned: boolean;
  isStarred: boolean;
  participants: string[];
  messageCount: number;
  tags: string[];
  context?: string;
}

interface RecentConversationsInterfaceProps {
  userInfo?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Patient Diagnosis Discussion',
    type: 'clinical',
    lastMessage: 'Based on the symptoms, I recommend ordering an ECG and troponin levels...',
    timestamp: new Date(Date.now() - 300000),
    isUnread: true,
    isPinned: true,
    isStarred: false,
    participants: ['Dr. Sarah Chen', 'Dr. Mike Johnson'],
    messageCount: 12,
    tags: ['Cardiology', 'Emergency'],
    context: 'Clinical Assistant'
  },
  {
    id: '2',
    title: 'Research Paper Analysis',
    type: 'research',
    lastMessage: 'The meta-analysis shows significant improvement in patient outcomes...',
    timestamp: new Date(Date.now() - 600000),
    isUnread: false,
    isPinned: false,
    isStarred: true,
    participants: ['Dr. Robert Kim', 'Dr. Lisa Park'],
    messageCount: 8,
    tags: ['Research', 'Oncology'],
    context: 'Research Bot'
  },
  {
    id: '3',
    title: 'Symptom Analysis - Chest Pain',
    type: 'diagnostic',
    lastMessage: 'The differential diagnosis includes acute MI, unstable angina, and aortic dissection...',
    timestamp: new Date(Date.now() - 900000),
    isUnread: true,
    isPinned: false,
    isStarred: false,
    participants: ['Dr. Sarah Chen'],
    messageCount: 5,
    tags: ['Diagnosis', 'Cardiology'],
    context: 'Diagnostic Helper'
  },
  {
    id: '4',
    title: 'General Healthcare Chat',
    type: 'chat',
    lastMessage: 'How can I help you with your healthcare needs today?',
    timestamp: new Date(Date.now() - 1200000),
    isUnread: false,
    isPinned: false,
    isStarred: false,
    participants: ['Dr. Sarah Chen'],
    messageCount: 3,
    tags: ['General'],
    context: 'Healthcare AI Assistant'
  },
  {
    id: '5',
    title: 'Team Discussion - Cardiology Department',
    type: 'team',
    lastMessage: 'The new treatment protocol has shown promising results in our latest cases...',
    timestamp: new Date(Date.now() - 1800000),
    isUnread: false,
    isPinned: true,
    isStarred: true,
    participants: ['Dr. Sarah Chen', 'Dr. Mike Johnson', 'Dr. Lisa Park', 'Nurse Amy'],
    messageCount: 24,
    tags: ['Team', 'Cardiology'],
    context: 'Team Discussion'
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

export function RecentConversationsInterface({ userInfo }: RecentConversationsInterfaceProps) {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'unread' | 'starred'>('recent');

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || conv.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const sortedConversations = [...filteredConversations].sort((a, b) => {
    switch (sortBy) {
      case 'unread':
        return (b.isUnread ? 1 : 0) - (a.isUnread ? 1 : 0);
      case 'starred':
        return (b.isStarred ? 1 : 0) - (a.isStarred ? 1 : 0);
      default:
        return b.timestamp.getTime() - a.timestamp.getTime();
    }
  });

  const toggleStar = (id: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === id ? { ...conv, isStarred: !conv.isStarred } : conv
    ));
  };

  const togglePin = (id: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === id ? { ...conv, isPinned: !conv.isPinned } : conv
    ));
  };

  const markAsRead = (id: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === id ? { ...conv, isUnread: false } : conv
    ));
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
              <h1 className="text-2xl font-semibold text-gray-900">Recent Conversations</h1>
              <p className="text-sm text-gray-500">Your recent chat history and conversations</p>
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
                placeholder="Search conversations..."
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
                <option value="recent">Recent</option>
                <option value="unread">Unread</option>
                <option value="starred">Starred</option>
              </select>
            </div>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-3">
            <AnimatePresence>
              {sortedConversations.map((conversation, index) => {
                const Icon = conversationIcons[conversation.type];
                const gradientClass = conversationColors[conversation.type];
                
                return (
                  <motion.div
                    key={conversation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={cn(
                      "bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer",
                      conversation.isUnread && "border-blue-200 bg-blue-50",
                      conversation.isPinned && "border-yellow-200 bg-yellow-50"
                    )}
                    onClick={() => markAsRead(conversation.id)}
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
                                {conversation.title}
                              </h3>
                              {conversation.isPinned && (
                                <Pin className="w-3 h-3 text-yellow-500" />
                              )}
                              {conversation.isUnread && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                            
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                              {conversation.lastMessage}
                            </p>

                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>{conversation.context}</span>
                              <span>{conversation.messageCount} messages</span>
                              <span>{formatTime(conversation.timestamp)}</span>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {conversation.tags.map((tag, idx) => (
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
                                toggleStar(conversation.id);
                              }}
                            >
                              {conversation.isStarred ? (
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              ) : (
                                <StarOff className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePin(conversation.id);
                              }}
                            >
                              {conversation.isPinned ? (
                                <PinOff className="w-4 h-4" />
                              ) : (
                                <Pin className="w-4 h-4" />
                              )}
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
