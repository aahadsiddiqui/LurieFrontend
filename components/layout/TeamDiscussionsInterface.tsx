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
  BookmarkCheck,
  Hash,
  Bell,
  BellOff,
  Settings,
  Video,
  Phone,
  Share,
  Download,
  Edit,
  Reply,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Image,
  FileText,
  Paperclip,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/ui/utils';
import React from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen: Date;
}

interface Team {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isActive: boolean;
  lastActivity: Date;
  channels: Channel[];
  color: string;
  members: TeamMember[];
}

interface Channel {
  id: string;
  name: string;
  description: string;
  messageCount: number;
  lastMessage: string;
  lastActivity: Date;
  isUnread: boolean;
  isPinned: boolean;
  type: 'general' | 'clinical' | 'research' | 'admin' | 'casual';
}

interface TeamMessage {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  isEdited: boolean;
  reactions: { emoji: string; count: number; users: string[] }[];
  replies: number;
  attachments?: string[];
}

interface TeamDiscussionsInterfaceProps {
  userInfo?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Cardiology Department',
    description: 'Cardiology team discussions and patient care coordination',
    memberCount: 12,
    isActive: true,
    lastActivity: new Date(Date.now() - 300000),
    color: 'from-red-500 to-pink-500',
    members: [
      { id: '1-1', name: 'Dr. Sarah Chen', role: 'Cardiologist', isOnline: true, lastSeen: new Date(Date.now() - 300000) },
      { id: '1-2', name: 'Dr. Mike Johnson', role: 'Cardiologist', isOnline: true, lastSeen: new Date(Date.now() - 600000) },
      { id: '1-3', name: 'Dr. Lisa Park', role: 'Cardiologist', isOnline: false, lastSeen: new Date(Date.now() - 1800000) },
      { id: '1-4', name: 'Nurse Amy', role: 'Cardiac Nurse', isOnline: true, lastSeen: new Date(Date.now() - 900000) },
      { id: '1-5', name: 'Dr. Robert Kim', role: 'Cardiologist', isOnline: false, lastSeen: new Date(Date.now() - 3600000) }
    ],
    channels: [
      {
        id: '1-1',
        name: 'general',
        description: 'General cardiology discussions',
        messageCount: 156,
        lastMessage: 'The new treatment protocol is showing excellent results...',
        lastActivity: new Date(Date.now() - 300000),
        isUnread: true,
        isPinned: true,
        type: 'general'
      },
      {
        id: '1-2',
        name: 'patient-care',
        description: 'Patient care coordination and updates',
        messageCount: 89,
        lastMessage: 'Patient in room 304 requires immediate attention...',
        lastActivity: new Date(Date.now() - 600000),
        isUnread: true,
        isPinned: false,
        type: 'clinical'
      },
      {
        id: '1-3',
        name: 'research',
        description: 'Cardiology research and studies',
        messageCount: 45,
        lastMessage: 'New research paper on heart failure treatment...',
        lastActivity: new Date(Date.now() - 1200000),
        isUnread: false,
        isPinned: false,
        type: 'research'
      }
    ]
  },
  {
    id: '2',
    name: 'Emergency Medicine',
    description: 'Emergency department coordination and protocols',
    memberCount: 8,
    isActive: true,
    lastActivity: new Date(Date.now() - 900000),
    color: 'from-orange-500 to-red-500',
    members: [
      { id: '2-1', name: 'Dr. James Wilson', role: 'Emergency Physician', isOnline: true, lastSeen: new Date(Date.now() - 900000) },
      { id: '2-2', name: 'Dr. Maria Rodriguez', role: 'Emergency Physician', isOnline: true, lastSeen: new Date(Date.now() - 1200000) },
      { id: '2-3', name: 'Nurse Tom', role: 'Emergency Nurse', isOnline: false, lastSeen: new Date(Date.now() - 2400000) },
      { id: '2-4', name: 'Dr. Emily Davis', role: 'Emergency Physician', isOnline: true, lastSeen: new Date(Date.now() - 1800000) }
    ],
    channels: [
      {
        id: '2-1',
        name: 'general',
        description: 'General emergency medicine discussions',
        messageCount: 234,
        lastMessage: 'Trauma case incoming - prepare OR 2...',
        lastActivity: new Date(Date.now() - 900000),
        isUnread: true,
        isPinned: true,
        type: 'general'
      },
      {
        id: '2-2',
        name: 'protocols',
        description: 'Emergency protocols and procedures',
        messageCount: 67,
        lastMessage: 'Updated triage protocol for mass casualties...',
        lastActivity: new Date(Date.now() - 1800000),
        isUnread: false,
        isPinned: false,
        type: 'admin'
      }
    ]
  },
  {
    id: '3',
    name: 'Research Team',
    description: 'Medical research collaboration and studies',
    memberCount: 15,
    isActive: false,
    lastActivity: new Date(Date.now() - 3600000),
    color: 'from-purple-500 to-violet-500',
    members: [
      { id: '3-1', name: 'Dr. Jennifer Lee', role: 'Research Director', isOnline: false, lastSeen: new Date(Date.now() - 3600000) },
      { id: '3-2', name: 'Dr. David Brown', role: 'Research Scientist', isOnline: false, lastSeen: new Date(Date.now() - 7200000) },
      { id: '3-3', name: 'Dr. Anna Smith', role: 'Research Scientist', isOnline: false, lastSeen: new Date(Date.now() - 10800000) },
      { id: '3-4', name: 'Dr. Michael Taylor', role: 'Research Scientist', isOnline: false, lastSeen: new Date(Date.now() - 14400000) }
    ],
    channels: [
      {
        id: '3-1',
        name: 'general',
        description: 'General research discussions',
        messageCount: 123,
        lastMessage: 'Clinical trial results are promising...',
        lastActivity: new Date(Date.now() - 3600000),
        isUnread: false,
        isPinned: false,
        type: 'general'
      },
      {
        id: '3-2',
        name: 'studies',
        description: 'Active research studies and trials',
        messageCount: 78,
        lastMessage: 'Phase II trial enrollment is complete...',
        lastActivity: new Date(Date.now() - 7200000),
        isUnread: false,
        isPinned: false,
        type: 'research'
      }
    ]
  }
];

const channelIcons = {
  general: Hash,
  clinical: Stethoscope,
  research: Activity,
  admin: Settings,
  casual: Users
};

const channelColors = {
  general: 'from-gray-500 to-gray-600',
  clinical: 'from-blue-500 to-cyan-500',
  research: 'from-purple-500 to-violet-500',
  admin: 'from-green-500 to-emerald-500',
  casual: 'from-orange-500 to-red-500'
};

export function TeamDiscussionsInterface({ userInfo }: TeamDiscussionsInterfaceProps) {
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(teams[0]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(teams[0]?.channels[0] || null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleChannelPin = (teamId: string, channelId: string) => {
    setTeams(prev => prev.map(team => 
      team.id === teamId 
        ? {
            ...team,
            channels: team.channels.map(channel =>
              channel.id === channelId 
                ? { ...channel, isPinned: !channel.isPinned }
                : channel
            )
          }
        : team
    ));
  };

  const markChannelAsRead = (teamId: string, channelId: string) => {
    setTeams(prev => prev.map(team => 
      team.id === teamId 
        ? {
            ...team,
            channels: team.channels.map(channel =>
              channel.id === channelId 
                ? { ...channel, isUnread: false }
                : channel
            )
          }
        : team
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
      {/* Teams Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Teams</h2>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Join
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Teams List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {filteredTeams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={cn(
                  "p-3 rounded-lg cursor-pointer transition-all",
                  selectedTeam?.id === team.id 
                    ? "bg-blue-50 border border-blue-200" 
                    : "hover:bg-gray-50"
                )}
                onClick={() => setSelectedTeam(team)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${team.color} flex items-center justify-center`}>
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {team.name}
                      </h3>
                      {team.isActive && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {team.memberCount} members • {formatTime(team.lastActivity)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Channels and Messages */}
      <div className="flex-1 flex flex-col">
        {selectedTeam ? (
          <>
            {/* Team Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedTeam.color} flex items-center justify-center`}>
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900">{selectedTeam.name}</h1>
                    <p className="text-sm text-gray-500">{selectedTeam.description}</p>
                  </div>
                </div>
            <div className="flex items-center space-x-4">
              {/* Team Members Avatars */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Members:</span>
                <div className="flex -space-x-2">
                  {selectedTeam.members.slice(0, 4).map((member, index) => (
                    <Avatar key={member.id} className="w-8 h-8 border-2 border-white">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-xs">
                        {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {selectedTeam.members.length > 4 && (
                    <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">+{selectedTeam.members.length - 4}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Video className="w-4 h-4 mr-2" />
                  Meet
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>
            </div>
              </div>
            </div>

            <div className="flex flex-1">
              {/* Channels Sidebar */}
              <div className="w-64 bg-gray-50 border-r border-gray-200">
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Channels</h3>
                  <div className="space-y-1">
                    {selectedTeam.channels.map((channel, index) => {
                      const Icon = channelIcons[channel.type];
                      const gradientClass = channelColors[channel.type];
                      
                      return (
                        <motion.div
                          key={channel.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={cn(
                            "flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-all",
                            selectedChannel?.id === channel.id 
                              ? "bg-blue-100 text-blue-700" 
                              : "hover:bg-gray-100"
                          )}
                          onClick={() => {
                            setSelectedChannel(channel);
                            markChannelAsRead(selectedTeam.id, channel.id);
                          }}
                        >
                          <div className={`w-6 h-6 rounded bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
                            <Icon className="w-3 h-3 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-1">
                              <span className="text-sm font-medium truncate">
                                #{channel.name}
                              </span>
                              {channel.isUnread && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                              {channel.isPinned && (
                                <Pin className="w-3 h-3 text-yellow-500" />
                              )}
                            </div>
                            <p className="text-xs text-gray-500 truncate">
                              {channel.messageCount} messages
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 flex flex-col">
                {selectedChannel ? (
                  <>
                    {/* Channel Header */}
                    <div className="bg-white border-b border-gray-200 px-6 py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-6 h-6 rounded bg-gradient-to-br ${channelColors[selectedChannel.type]} flex items-center justify-center`}>
                            {React.createElement(channelIcons[selectedChannel.type], { className: "w-3 h-3 text-white" })}
                          </div>
                          <h2 className="text-lg font-semibold text-gray-900">
                            #{selectedChannel.name}
                          </h2>
                          <Badge variant="secondary" className="text-xs">
                            {selectedChannel.type}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Bell className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pin className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{selectedChannel.description}</p>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="space-y-4">
                        {/* Sample Messages */}
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-blue-600 text-white">
                              SC
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm font-medium text-gray-900">Dr. Sarah Chen</span>
                              <span className="text-xs text-gray-500">{formatTime(new Date(Date.now() - 300000))}</span>
                            </div>
                            <p className="text-sm text-gray-700">{selectedChannel.lastMessage}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <ThumbsUp className="w-3 h-3 mr-1" />
                                Like
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <Reply className="w-3 h-3 mr-1" />
                                Reply
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <Smile className="w-3 h-3 mr-1" />
                                React
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="bg-white border-t border-gray-200 p-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Paperclip className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Image className="w-4 h-4" />
                        </Button>
                        <div className="flex-1">
                          <Input
                            placeholder={`Message #${selectedChannel.name}`}
                            className="w-full"
                          />
                        </div>
                        <Button size="sm">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Select a channel</h3>
                      <p className="text-gray-500">Choose a channel to start the conversation</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a team</h3>
              <p className="text-gray-500">Choose a team to view discussions</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
