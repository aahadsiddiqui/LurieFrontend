'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Star, 
  StarOff,
  FileText,
  File,
  Folder,
  FolderOpen,
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
  Edit,
  Copy,
  Share,
  Download,
  Grid,
  List,
  SortAsc,
  SortDesc,
  RefreshCw,
  Settings,
  User,
  Lock,
  Globe,
  Link,
  Image,
  Video,
  Phone,
  Hash,
  MessageSquare,
  Bell,
  Paperclip,
  Smile,
  ThumbsUp,
  ThumbsDown,
  Reply,
  FileText as FileIcon,
  Send,
  Play,
  Pause,
  Square,
  Circle,
  Triangle,
  Diamond,
  Zap,
  Target,
  Brain,
  Lightbulb,
  Workflow,
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  HelpCircle,
  PlusCircle,
  MinusCircle,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  RotateCcw,
  RotateCw,
  Maximize,
  Minimize,
  ExternalLink,
  Upload,
  Download as DownloadIcon,
  Save,
  Loader,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/ui/utils';

interface WorkflowNode {
  id: string;
  type: 'start' | 'process' | 'decision' | 'document' | 'ai' | 'collaboration' | 'end';
  title: string;
  description: string;
  position: { x: number; y: number };
  connections: string[];
  data: any;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
}

interface WorkflowSession {
  id: string;
  title: string;
  description: string;
  type: 'clinical' | 'research' | 'process' | 'brainstorm' | 'collaboration';
  lastModified: Date;
  modifiedBy: string;
  nodeCount: number;
  isStarred: boolean;
  isPinned: boolean;
  isShared: boolean;
  tags: string[];
  category: string;
  collaborators: string[];
  thumbnail?: string;
  nodes: WorkflowNode[];
  connections: { from: string; to: string }[];
  status: 'draft' | 'active' | 'completed' | 'archived';
}

interface WorkflowBuilderInterfaceProps {
  userInfo?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const mockWorkflowSessions: WorkflowSession[] = [
  {
    id: '1',
    title: 'Patient Care Workflow - Cardiology',
    description: 'Complete patient care workflow from admission to discharge',
    type: 'clinical',
    lastModified: new Date(Date.now() - 300000),
    modifiedBy: 'Dr. Sarah Chen',
    nodeCount: 12,
    isStarred: true,
    isPinned: true,
    isShared: true,
    tags: ['Cardiology', 'Workflow', 'Patient Care'],
    category: 'Clinical',
    collaborators: ['Dr. Mike Johnson', 'Dr. Lisa Park'],
    status: 'active',
    nodes: [
      { id: 'n1', type: 'start', title: 'Patient Admission', description: 'Initial patient assessment', position: { x: 100, y: 100 }, connections: ['n2'], data: {}, status: 'completed' },
      { id: 'n2', type: 'process', title: 'Vital Signs Check', description: 'Record vital signs and initial assessment', position: { x: 300, y: 100 }, connections: ['n3'], data: {}, status: 'completed' },
      { id: 'n3', type: 'decision', title: 'Critical Assessment', description: 'Determine if patient needs immediate care', position: { x: 500, y: 100 }, connections: ['n4', 'n5'], data: {}, status: 'in-progress' }
    ],
    connections: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n3', to: 'n5' }
    ]
  },
  {
    id: '2',
    title: 'Research Data Analysis Workflow',
    description: 'Complete research data analysis workflow from collection to publication',
    type: 'research',
    lastModified: new Date(Date.now() - 600000),
    modifiedBy: 'Dr. Robert Kim',
    nodeCount: 8,
    isStarred: false,
    isPinned: false,
    isShared: true,
    tags: ['Research', 'Data Analysis', 'Workflow'],
    category: 'Research',
    collaborators: ['Dr. Jennifer Lee', 'Dr. David Brown'],
    status: 'draft',
    nodes: [
      { id: 'n1', type: 'start', title: 'Data Collection', description: 'Gather research data from various sources', position: { x: 100, y: 100 }, connections: ['n2'], data: {}, status: 'completed' },
      { id: 'n2', type: 'ai', title: 'AI Data Processing', description: 'Use AI to clean and process data', position: { x: 300, y: 100 }, connections: ['n3'], data: {}, status: 'in-progress' },
      { id: 'n3', type: 'process', title: 'Statistical Analysis', description: 'Perform statistical analysis on processed data', position: { x: 500, y: 100 }, connections: ['n4'], data: {}, status: 'pending' }
    ],
    connections: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' }
    ]
  },
  {
    id: '3',
    title: 'Emergency Response Workflow',
    description: 'Complete emergency response workflow from alert to resolution',
    type: 'process',
    lastModified: new Date(Date.now() - 900000),
    modifiedBy: 'Dr. James Wilson',
    nodeCount: 15,
    isStarred: true,
    isPinned: false,
    isShared: true,
    tags: ['Emergency', 'Response', 'Workflow'],
    category: 'Emergency',
    collaborators: ['Dr. Maria Rodriguez', 'Nurse Tom'],
    status: 'active',
    nodes: [
      { id: 'n1', type: 'start', title: 'Emergency Alert', description: 'Receive emergency alert and assess situation', position: { x: 100, y: 100 }, connections: ['n2'], data: {}, status: 'completed' },
      { id: 'n2', type: 'collaboration', title: 'Team Notification', description: 'Notify emergency response team', position: { x: 300, y: 100 }, connections: ['n3'], data: {}, status: 'completed' },
      { id: 'n3', type: 'process', title: 'Response Execution', description: 'Execute emergency response procedures', position: { x: 500, y: 100 }, connections: ['n4'], data: {}, status: 'in-progress' }
    ],
    connections: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' }
    ]
  },
  {
    id: '4',
    title: 'Brainstorming Session - New Treatment',
    description: 'Collaborative brainstorming session for new treatment protocols',
    type: 'brainstorm',
    lastModified: new Date(Date.now() - 1200000),
    modifiedBy: 'Dr. Emily Davis',
    nodeCount: 6,
    isStarred: false,
    isPinned: true,
    isShared: false,
    tags: ['Brainstorm', 'Treatment', 'Innovation'],
    category: 'Personal',
    collaborators: [],
    status: 'draft',
    nodes: [
      { id: 'n1', type: 'start', title: 'Problem Definition', description: 'Define the problem and objectives', position: { x: 100, y: 100 }, connections: ['n2'], data: {}, status: 'completed' },
      { id: 'n2', type: 'process', title: 'Idea Generation', description: 'Generate creative solutions and ideas', position: { x: 300, y: 100 }, connections: ['n3'], data: {}, status: 'in-progress' },
      { id: 'n3', type: 'ai', title: 'AI Analysis', description: 'Use AI to analyze and refine ideas', position: { x: 500, y: 100 }, connections: ['n4'], data: {}, status: 'pending' }
    ],
    connections: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' }
    ]
  },
  {
    id: '5',
    title: 'Collaborative Research Workflow',
    description: 'Multi-team collaborative research workflow',
    type: 'collaboration',
    lastModified: new Date(Date.now() - 1500000),
    modifiedBy: 'Dr. Anna Smith',
    nodeCount: 10,
    isStarred: false,
    isPinned: false,
    isShared: true,
    tags: ['Collaboration', 'Research', 'Multi-team'],
    category: 'Team',
    collaborators: ['Dr. David Brown', 'Dr. Michael Taylor'],
    status: 'active',
    nodes: [
      { id: 'n1', type: 'start', title: 'Research Planning', description: 'Plan research objectives and methodology', position: { x: 100, y: 100 }, connections: ['n2'], data: {}, status: 'completed' },
      { id: 'n2', type: 'collaboration', title: 'Team Coordination', description: 'Coordinate with multiple research teams', position: { x: 300, y: 100 }, connections: ['n3'], data: {}, status: 'in-progress' },
      { id: 'n3', type: 'ai', title: 'AI Research Assistant', description: 'Use AI to assist with research tasks', position: { x: 500, y: 100 }, connections: ['n4'], data: {}, status: 'pending' }
    ],
    connections: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' }
    ]
  }
];

const workflowIcons = {
  clinical: Stethoscope,
  research: Activity,
  process: Workflow,
  brainstorm: Lightbulb,
  collaboration: Users
};

const workflowColors = {
  clinical: 'from-blue-500 to-cyan-500',
  research: 'from-purple-500 to-violet-500',
  process: 'from-orange-500 to-red-500',
  brainstorm: 'from-yellow-500 to-orange-500',
  collaboration: 'from-green-500 to-emerald-500'
};

const categoryColors = {
  Clinical: 'from-blue-500 to-cyan-500',
  Research: 'from-purple-500 to-violet-500',
  Emergency: 'from-red-500 to-pink-500',
  Personal: 'from-green-500 to-emerald-500',
  Team: 'from-indigo-500 to-purple-500'
};

const nodeIcons = {
  start: Play,
  process: Settings,
  decision: GitBranch,
  document: FileText,
  ai: Brain,
  collaboration: Users,
  end: Square
};

const statusColors = {
  pending: 'bg-gray-100 text-gray-600',
  'in-progress': 'bg-blue-100 text-blue-600',
  completed: 'bg-green-100 text-green-600',
  blocked: 'bg-red-100 text-red-600'
};

export function WorkflowBuilderInterface({ userInfo }: WorkflowBuilderInterfaceProps) {
  const [workflowSessions, setWorkflowSessions] = useState<WorkflowSession[]>(mockWorkflowSessions);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newWorkflowType, setNewWorkflowType] = useState<string>('clinical');

  const toggleStar = (sessionId: string) => {
    setWorkflowSessions(prev => 
      prev.map(session => 
        session.id === sessionId 
          ? { ...session, isStarred: !session.isStarred }
          : session
      )
    );
  };

  const togglePin = (sessionId: string) => {
    setWorkflowSessions(prev => 
      prev.map(session => 
        session.id === sessionId 
          ? { ...session, isPinned: !session.isPinned }
          : session
      )
    );
  };

  const toggleSelection = (sessionId: string) => {
    setSelectedSessions(prev => 
      prev.includes(sessionId) 
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const createNewWorkflow = (type: string) => {
    const newWorkflow: WorkflowSession = {
      id: Date.now().toString(),
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Workflow`,
      description: `A new ${type} workflow session`,
      type: type as any,
      lastModified: new Date(),
      modifiedBy: userInfo?.name || 'User',
      nodeCount: 0,
      isStarred: false,
      isPinned: false,
      isShared: false,
      tags: ['New', type],
      category: type.charAt(0).toUpperCase() + type.slice(1),
      collaborators: [],
      status: 'draft',
      nodes: [],
      connections: []
    };
    setWorkflowSessions(prev => [newWorkflow, ...prev]);
    setShowCreateModal(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const filteredSessions = workflowSessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        session.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || session.type === filterType;
    const matchesCategory = filterCategory === 'all' || session.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const sortedSessions = [...filteredSessions].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b.lastModified.getTime() - a.lastModified.getTime();
      case 'name':
        return a.title.localeCompare(b.title);
      case 'modified':
        return b.lastModified.getTime() - a.lastModified.getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Workflow Builder</h1>
            <p className="text-sm text-gray-500">Create, manage, and collaborate on workflow sessions with drag-and-drop visual editor</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Workflow
            </Button>
            <Button variant="outline" size="sm">
              <Workflow className="w-4 h-4 mr-2" />
              Templates
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
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search workflows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="clinical">Clinical</option>
              <option value="research">Research</option>
              <option value="process">Process</option>
              <option value="brainstorm">Brainstorm</option>
              <option value="collaboration">Collaboration</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Clinical">Clinical</option>
              <option value="Research">Research</option>
              <option value="Emergency">Emergency</option>
              <option value="Personal">Personal</option>
              <option value="Team">Team</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="recent">Recent</option>
              <option value="name">Name</option>
              <option value="modified">Modified</option>
            </select>
            <div className="flex items-center space-x-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Sessions Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence>
              {sortedSessions.map((session, index) => {
                const Icon = workflowIcons[session.type];
                const categoryColor = categoryColors[session.category as keyof typeof categoryColors] || 'from-gray-500 to-gray-600';
                
                return (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer border-0 bg-white">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center text-white",
                              `bg-gradient-to-br ${categoryColor}`
                            )}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 truncate">{session.title}</h3>
                              <p className="text-sm text-gray-500 truncate">{session.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {session.isStarred && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                            {session.isPinned && (
                              <Pin className="w-4 h-4 text-blue-500" />
                            )}
                            <Button variant="ghost" size="icon" className="w-6 h-6">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">{session.nodeCount} nodes</span>
                            <span className="text-gray-500">{formatTimeAgo(session.lastModified)}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {session.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {session.type}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={cn("text-xs", statusColors[session.status])}
                            >
                              {session.status}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">Modified by:</span>
                              <span className="text-xs font-medium text-gray-700">{session.modifiedBy}</span>
                            </div>
                          </div>

                          {session.collaborators.length > 0 && (
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">Collaborators:</span>
                              <div className="flex -space-x-1">
                                {session.collaborators.slice(0, 3).map((collaborator, idx) => (
                                  <Avatar key={idx} className="w-6 h-6 border-2 border-white">
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-xs">
                                      {getInitials(collaborator)}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                                {session.collaborators.length > 3 && (
                                  <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                                    <span className="text-xs font-medium text-gray-600">+{session.collaborators.length - 3}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-1">
                            {session.tags.slice(0, 3).map((tag, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {session.tags.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{session.tags.length - 3}
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center space-x-2 pt-2 border-t">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Play className="w-3 h-3 mr-1" />
                              Open
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence>
              {sortedSessions.map((session, index) => {
                const Icon = workflowIcons[session.type];
                const categoryColor = categoryColors[session.category as keyof typeof categoryColors] || 'from-gray-500 to-gray-600';
                
                return (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="group"
                  >
                    <Card className="hover:shadow-md transition-all duration-200 cursor-pointer border-0 bg-white">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center text-white",
                            `bg-gradient-to-br ${categoryColor}`
                          )}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium text-gray-900 truncate">{session.title}</h3>
                              {session.isStarred && (
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              )}
                              {session.isPinned && (
                                <Pin className="w-4 h-4 text-blue-500" />
                              )}
                            </div>
                            <p className="text-sm text-gray-500 truncate mt-1">{session.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs text-gray-500">{session.nodeCount} nodes</span>
                              <span className="text-xs text-gray-500">{formatTimeAgo(session.lastModified)}</span>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs">
                                  {session.category}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {session.type}
                                </Badge>
                                <Badge 
                                  variant="outline" 
                                  className={cn("text-xs", statusColors[session.status])}
                                >
                                  {session.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Play className="w-3 h-3 mr-1" />
                              Open
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="w-6 h-6">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Create Workflow Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Plus className="w-4 h-4 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Create New Workflow</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowCreateModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Choose Workflow Type</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(workflowIcons).map(([type, Icon]) => (
                      <button
                        key={type}
                        onClick={() => createNewWorkflow(type)}
                        className={cn(
                          "p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md",
                          newWorkflowType === type 
                            ? "border-blue-500 bg-blue-50" 
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center text-white",
                            `bg-gradient-to-br ${workflowColors[type as keyof typeof workflowColors]}`
                          )}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-gray-900 capitalize">{type}</div>
                            <div className="text-sm text-gray-500">
                              {type === 'clinical' && 'Patient care and medical workflows'}
                              {type === 'research' && 'Research and data analysis workflows'}
                              {type === 'process' && 'Operational and process workflows'}
                              {type === 'brainstorm' && 'Creative brainstorming sessions'}
                              {type === 'collaboration' && 'Team collaboration workflows'}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">AI-Powered Workflow Builder</h4>
                      <p className="text-sm text-blue-700">
                        Create intelligent workflows with AI assistance, automatic node suggestions, 
                        and smart connections for optimal process design.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => createNewWorkflow(newWorkflowType)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Workflow
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
