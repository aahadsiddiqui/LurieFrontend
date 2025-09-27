'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Star, 
  StarOff,
  BookOpen,
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
  FileImage,
  FileVideo,
  FilePdf,
  FileSpreadsheet,
  FileType,
  FileCode,
  NotebookPen,
  PenTool,
  Highlighter,
  Eraser,
  Palette,
  Layers,
  Zap,
  Brain,
  Lightbulb,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart
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
    title: 'Emergency Protocols',
    description: 'Emergency response protocols and procedures documentation',
    type: 'team',
    lastModified: new Date(Date.now() - 900000),
    modifiedBy: 'Dr. James Wilson',
    pageCount: 16,
    isStarred: true,
    isPinned: false,
    isShared: true,
    tags: ['Emergency', 'Protocols', 'Procedures'],
    category: 'Emergency',
    collaborators: ['Dr. Maria Rodriguez', 'Nurse Tom'],
    sections: [
      { id: '3-1', title: 'Triage Procedures', type: 'text', content: 'Emergency triage procedures and protocols...', lastModified: new Date(Date.now() - 900000), pageNumber: 1 },
      { id: '3-2', title: 'Response Flowchart', type: 'diagram', content: 'Emergency response flowchart...', lastModified: new Date(Date.now() - 1800000), pageNumber: 2 },
      { id: '3-3', title: 'Contact Information', type: 'table', content: 'Emergency contact information and resources...', lastModified: new Date(Date.now() - 2700000), pageNumber: 3 }
    ]
  },
  {
    id: '4',
    title: 'Personal Medical Notes',
    description: 'Personal medical notes and learning observations',
    type: 'personal',
    lastModified: new Date(Date.now() - 1200000),
    modifiedBy: 'Dr. Emily Davis',
    pageCount: 32,
    isStarred: false,
    isPinned: true,
    isShared: false,
    tags: ['Personal', 'Learning', 'Notes'],
    category: 'Personal',
    collaborators: [],
    sections: [
      { id: '4-1', title: 'Learning Objectives', type: 'text', content: 'Personal learning objectives and goals...', lastModified: new Date(Date.now() - 1200000), pageNumber: 1 },
      { id: '4-2', title: 'Case Studies', type: 'text', content: 'Interesting case studies and observations...', lastModified: new Date(Date.now() - 2400000), pageNumber: 2 },
      { id: '4-3', title: 'Research Ideas', type: 'text', content: 'Research ideas and potential studies...', lastModified: new Date(Date.now() - 3600000), pageNumber: 3 }
    ]
  },
  {
    id: '5',
    title: 'Clinical Trial Template',
    description: 'Template for clinical trial documentation and procedures',
    type: 'template',
    lastModified: new Date(Date.now() - 1800000),
    modifiedBy: 'Dr. Anna Smith',
    pageCount: 12,
    isStarred: false,
    isPinned: false,
    isShared: true,
    tags: ['Template', 'Clinical Trial', 'Documentation'],
    category: 'Research',
    collaborators: ['Dr. Michael Taylor'],
    sections: [
      { id: '5-1', title: 'Trial Design', type: 'text', content: 'Clinical trial design template...', lastModified: new Date(Date.now() - 1800000), pageNumber: 1 },
      { id: '5-2', title: 'Data Collection', type: 'table', content: 'Data collection forms and procedures...', lastModified: new Date(Date.now() - 3600000), pageNumber: 2 },
      { id: '5-3', title: 'Reporting', type: 'text', content: 'Trial reporting and documentation...', lastModified: new Date(Date.now() - 5400000), pageNumber: 3 }
    ]
  }
];

const notebookIcons = {
  clinical: Stethoscope,
  research: Activity,
  personal: User,
  team: Users,
  template: FileType
};

const notebookColors = {
  clinical: 'from-blue-500 to-cyan-500',
  research: 'from-purple-500 to-violet-500',
  personal: 'from-green-500 to-emerald-500',
  team: 'from-orange-500 to-red-500',
  template: 'from-pink-500 to-rose-500'
};

const categoryColors = {
  Clinical: 'from-blue-500 to-cyan-500',
  Research: 'from-purple-500 to-violet-500',
  Emergency: 'from-red-500 to-pink-500',
  Personal: 'from-green-500 to-emerald-500'
};

const sectionIcons = {
  text: FileText,
  image: Image,
  chart: BarChart3,
  table: FileSpreadsheet,
  diagram: Layers,
  code: FileCode
};

export function NotebooksInterface({ userInfo }: NotebooksInterfaceProps) {
  const [notebooks, setNotebooks] = useState<Notebook[]>(mockNotebooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'pages' | 'modified'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedNotebooks, setSelectedNotebooks] = useState<string[]>([]);

  const filteredNotebooks = notebooks.filter(notebook => {
    const matchesSearch = notebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notebook.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notebook.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || notebook.type === filterType;
    const matchesCategory = filterCategory === 'all' || notebook.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const sortedNotebooks = [...filteredNotebooks].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'pages':
        return b.pageCount - a.pageCount;
      case 'modified':
        return b.lastModified.getTime() - a.lastModified.getTime();
      default:
        return b.lastModified.getTime() - a.lastModified.getTime();
    }
  });

  const toggleStar = (id: string) => {
    setNotebooks(prev => prev.map(notebook => 
      notebook.id === id ? { ...notebook, isStarred: !notebook.isStarred } : notebook
    ));
  };

  const togglePin = (id: string) => {
    setNotebooks(prev => prev.map(notebook => 
      notebook.id === id ? { ...notebook, isPinned: !notebook.isPinned } : notebook
    ));
  };

  const toggleSelection = (id: string) => {
    setSelectedNotebooks(prev => 
      prev.includes(id) 
        ? prev.filter(notebookId => notebookId !== id)
        : [...prev, id]
    );
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
              <h1 className="text-2xl font-semibold text-gray-900">Notebooks</h1>
              <p className="text-sm text-gray-500">Your digital notebooks and documentation</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Notebook
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
                placeholder="Search notebooks..."
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
                <option value="clinical">Clinical</option>
                <option value="research">Research</option>
                <option value="personal">Personal</option>
                <option value="team">Team</option>
                <option value="template">Template</option>
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
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">Recent</option>
                <option value="name">Name</option>
                <option value="pages">Pages</option>
                <option value="modified">Modified</option>
              </select>
              <div className="flex items-center space-x-1 border border-gray-300 rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 px-2"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 px-2"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Notebooks Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence>
                {sortedNotebooks.map((notebook, index) => {
                  const Icon = notebookIcons[notebook.type];
                  const gradientClass = notebookColors[notebook.type];
                  const categoryGradient = categoryColors[notebook.category as keyof typeof categoryColors];
                  
                  return (
                    <motion.div
                      key={notebook.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={cn(
                        "bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer",
                        selectedNotebooks.includes(notebook.id) && "border-blue-200 bg-blue-50"
                      )}
                      onClick={() => toggleSelection(notebook.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center space-x-1">
                          {notebook.isPinned && <Pin className="w-3 h-3 text-yellow-500" />}
                          {notebook.isStarred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                          {notebook.isShared && <Share className="w-3 h-3 text-blue-500" />}
                        </div>
                      </div>

                      <div className="mb-3">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                          {notebook.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {notebook.description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{notebook.pageCount} pages</span>
                          <span>{formatTime(notebook.lastModified)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge className={`text-xs px-2 py-1 bg-gradient-to-r ${categoryGradient} text-white`}>
                            {notebook.category}
                          </Badge>
                          <span className="text-xs text-gray-500">{notebook.type}</span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-500">Modified by:</span>
                          <span className="text-xs font-medium text-gray-700">{notebook.modifiedBy}</span>
                        </div>

                        {notebook.collaborators.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">Collaborators:</span>
                            <div className="flex -space-x-1">
                              {notebook.collaborators.slice(0, 3).map((collaborator, idx) => (
                                <div key={idx} className="w-4 h-4 rounded-full bg-gray-300 border border-white flex items-center justify-center">
                                  <span className="text-xs text-gray-600">{collaborator.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                                </div>
                              ))}
                              {notebook.collaborators.length > 3 && (
                                <div className="w-4 h-4 rounded-full bg-gray-100 border border-white flex items-center justify-center">
                                  <span className="text-xs text-gray-600">+{notebook.collaborators.length - 3}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1">
                          {notebook.tags.slice(0, 2).map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {notebook.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{notebook.tags.length - 2}
                            </Badge>
                          )}
                        </div>

                        {/* Sections Preview */}
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">Sections:</p>
                          <div className="flex flex-wrap gap-1">
                            {notebook.sections.slice(0, 3).map((section, idx) => {
                              const SectionIcon = sectionIcons[section.type];
                              return (
                                <div key={idx} className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                  <SectionIcon className="w-3 h-3" />
                                  <span>{section.title}</span>
                                </div>
                              );
                            })}
                            {notebook.sections.length > 3 && (
                              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                +{notebook.sections.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {sortedNotebooks.map((notebook, index) => {
                  const Icon = notebookIcons[notebook.type];
                  const gradientClass = notebookColors[notebook.type];
                  const categoryGradient = categoryColors[notebook.category as keyof typeof categoryColors];
                  
                  return (
                    <motion.div
                      key={notebook.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={cn(
                        "bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer",
                        selectedNotebooks.includes(notebook.id) && "border-blue-200 bg-blue-50"
                      )}
                      onClick={() => toggleSelection(notebook.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {notebook.title}
                            </h3>
                            {notebook.isPinned && <Pin className="w-3 h-3 text-yellow-500" />}
                            {notebook.isStarred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                            {notebook.isShared && <Share className="w-3 h-3 text-blue-500" />}
                          </div>
                          
                          <p className="text-sm text-gray-600 line-clamp-1 mb-2">
                            {notebook.description}
                          </p>

                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{notebook.pageCount} pages</span>
                            <span>Modified by {notebook.modifiedBy}</span>
                            <span>{formatTime(notebook.lastModified)}</span>
                            <Badge className={`text-xs px-2 py-1 bg-gradient-to-r ${categoryGradient} text-white`}>
                              {notebook.category}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStar(notebook.id);
                            }}
                          >
                            {notebook.isStarred ? (
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
                              togglePin(notebook.id);
                            }}
                          >
                            {notebook.isPinned ? (
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
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
