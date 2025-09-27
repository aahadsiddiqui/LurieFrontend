'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus,
  FileText,
  FileSpreadsheet,
  FileType,
  FileCode,
  Image,
  Video,
  Mic,
  Camera,
  Brain,
  Workflow,
  MessageSquare,
  Users,
  Calendar,
  Clock,
  Star,
  Heart,
  Stethoscope,
  Activity,
  Shield,
  Zap,
  Target,
  Lightbulb,
  BookOpen,
  Database,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  GitBranch,
  Play,
  Settings,
  Download,
  Upload,
  Share,
  Copy,
  Edit,
  Trash2,
  Archive,
  Folder,
  FolderOpen,
  File,
  Link,
  ExternalLink,
  Check,
  X,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  Search,
  Filter,
  Grid,
  List,
  MoreHorizontal,
  Bell,
  User,
  Lock,
  Globe,
  Eye,
  EyeOff,
  Pin,
  PinOff,
  Bookmark,
  BookmarkCheck,
  RefreshCw,
  RotateCcw,
  RotateCw,
  Maximize,
  Minimize,
  Loader,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
  PlusCircle,
  MinusCircle,
  Circle,
  Square,
  Triangle,
  Diamond,
  Hexagon,
  Octagon,
  Pentagon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/ui/utils';

interface CreateOption {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  category: string;
  isPopular?: boolean;
  isNew?: boolean;
  action: () => void;
}

interface CreateInterfaceProps {
  userInfo?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const createOptions: CreateOption[] = [
  // Document Creation
  {
    id: 'document',
    title: 'New Document',
    description: 'Create a new document with AI assistance',
    icon: FileText,
    color: 'from-blue-500 to-cyan-500',
    category: 'Documents',
    isPopular: true,
    action: () => console.log('Create document')
  },
  {
    id: 'spreadsheet',
    title: 'New Spreadsheet',
    description: 'Create a new spreadsheet for data analysis',
    icon: FileSpreadsheet,
    color: 'from-green-500 to-emerald-500',
    category: 'Documents',
    action: () => console.log('Create spreadsheet')
  },
  {
    id: 'presentation',
    title: 'New Presentation',
    description: 'Create a new presentation with templates',
    icon: FileType,
    color: 'from-purple-500 to-violet-500',
    category: 'Documents',
    action: () => console.log('Create presentation')
  },
  {
    id: 'form',
    title: 'New Form',
    description: 'Create a new form for data collection',
    icon: FileCode,
    color: 'from-orange-500 to-red-500',
    category: 'Documents',
    action: () => console.log('Create form')
  },

  // Media Creation
  {
    id: 'image',
    title: 'AI Image Generator',
    description: 'Generate images using AI for medical illustrations',
    icon: Image,
    color: 'from-pink-500 to-rose-500',
    category: 'Media',
    isNew: true,
    action: () => console.log('Generate image')
  },
  {
    id: 'video',
    title: 'Video Creator',
    description: 'Create educational videos and presentations',
    icon: Video,
    color: 'from-indigo-500 to-purple-500',
    category: 'Media',
    action: () => console.log('Create video')
  },
  {
    id: 'audio',
    title: 'Audio Recording',
    description: 'Record audio notes and dictations',
    icon: Mic,
    color: 'from-teal-500 to-cyan-500',
    category: 'Media',
    action: () => console.log('Record audio')
  },
  {
    id: 'screenshot',
    title: 'Screenshot Tool',
    description: 'Capture and annotate screenshots',
    icon: Camera,
    color: 'from-yellow-500 to-orange-500',
    category: 'Media',
    action: () => console.log('Take screenshot')
  },

  // AI-Powered Creation
  {
    id: 'ai-document',
    title: 'AI Document Assistant',
    description: 'Create documents with AI-powered content generation',
    icon: Brain,
    color: 'from-blue-600 to-indigo-600',
    category: 'AI Tools',
    isPopular: true,
    action: () => console.log('AI document assistant')
  },
  {
    id: 'workflow',
    title: 'Workflow Builder',
    description: 'Create visual workflows and processes',
    icon: Workflow,
    color: 'from-green-600 to-teal-600',
    category: 'AI Tools',
    action: () => console.log('Create workflow')
  },
  {
    id: 'chat-session',
    title: 'AI Chat Session',
    description: 'Start a new AI-powered conversation',
    icon: MessageSquare,
    color: 'from-purple-600 to-violet-600',
    category: 'AI Tools',
    isPopular: true,
    action: () => console.log('Start AI chat')
  },
  {
    id: 'ai-analysis',
    title: 'AI Data Analysis',
    description: 'Create AI-powered data analysis reports',
    icon: BarChart3,
    color: 'from-orange-600 to-red-600',
    category: 'AI Tools',
    action: () => console.log('AI data analysis')
  },

  // Collaboration
  {
    id: 'team-meeting',
    title: 'Team Meeting',
    description: 'Schedule and create team meeting sessions',
    icon: Users,
    color: 'from-cyan-500 to-blue-500',
    category: 'Collaboration',
    action: () => console.log('Create team meeting')
  },
  {
    id: 'project',
    title: 'New Project',
    description: 'Create a new collaborative project',
    icon: Folder,
    color: 'from-emerald-500 to-green-500',
    category: 'Collaboration',
    action: () => console.log('Create project')
  },
  {
    id: 'calendar-event',
    title: 'Calendar Event',
    description: 'Create a new calendar event',
    icon: Calendar,
    color: 'from-violet-500 to-purple-500',
    category: 'Collaboration',
    action: () => console.log('Create calendar event')
  },
  {
    id: 'reminder',
    title: 'Reminder',
    description: 'Create a new reminder or task',
    icon: Clock,
    color: 'from-rose-500 to-pink-500',
    category: 'Collaboration',
    action: () => console.log('Create reminder')
  },

  // Healthcare-Specific
  {
    id: 'patient-record',
    title: 'Patient Record',
    description: 'Create a new patient medical record',
    icon: Stethoscope,
    color: 'from-blue-500 to-cyan-500',
    category: 'Healthcare',
    isPopular: true,
    action: () => console.log('Create patient record')
  },
  {
    id: 'clinical-note',
    title: 'Clinical Note',
    description: 'Create a new clinical observation note',
    icon: FileText,
    color: 'from-green-500 to-emerald-500',
    category: 'Healthcare',
    action: () => console.log('Create clinical note')
  },
  {
    id: 'research-study',
    title: 'Research Study',
    description: 'Create a new research study framework',
    icon: Activity,
    color: 'from-purple-500 to-violet-500',
    category: 'Healthcare',
    action: () => console.log('Create research study')
  },
  {
    id: 'treatment-plan',
    title: 'Treatment Plan',
    description: 'Create a comprehensive treatment plan',
    icon: Target,
    color: 'from-orange-500 to-red-500',
    category: 'Healthcare',
    action: () => console.log('Create treatment plan')
  },

  // Templates
  {
    id: 'template-document',
    title: 'Document Template',
    description: 'Create from document templates',
    icon: FileText,
    color: 'from-gray-500 to-gray-600',
    category: 'Templates',
    action: () => console.log('Document template')
  },
  {
    id: 'template-workflow',
    title: 'Workflow Template',
    description: 'Create from workflow templates',
    icon: Workflow,
    color: 'from-gray-500 to-gray-600',
    category: 'Templates',
    action: () => console.log('Workflow template')
  },
  {
    id: 'template-form',
    title: 'Form Template',
    description: 'Create from form templates',
    icon: FileCode,
    color: 'from-gray-500 to-gray-600',
    category: 'Templates',
    action: () => console.log('Form template')
  },
  {
    id: 'template-presentation',
    title: 'Presentation Template',
    description: 'Create from presentation templates',
    icon: FileType,
    color: 'from-gray-500 to-gray-600',
    category: 'Templates',
    action: () => console.log('Presentation template')
  }
];

const categories = [
  { id: 'all', name: 'All', icon: Grid },
  { id: 'Documents', name: 'Documents', icon: FileText },
  { id: 'Media', name: 'Media', icon: Image },
  { id: 'AI Tools', name: 'AI Tools', icon: Brain },
  { id: 'Collaboration', name: 'Collaboration', icon: Users },
  { id: 'Healthcare', name: 'Healthcare', icon: Stethoscope },
  { id: 'Templates', name: 'Templates', icon: File }
];

export function CreateInterface({ userInfo }: CreateInterfaceProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredOptions = createOptions.filter(option => {
    const matchesCategory = selectedCategory === 'all' || option.category === selectedCategory;
    const matchesSearch = option.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         option.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Create</h1>
            <p className="text-sm text-gray-500">Create documents, workflows, media, and more with AI assistance</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
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
                placeholder="Search creation options..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-1"
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </Button>
              ))}
            </div>
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

      {/* Create Options Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence>
              {filteredOptions.map((option, index) => {
                const Icon = option.icon;
                
                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="group"
                  >
                    <Card 
                      className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer border-0 bg-white"
                      onClick={option.action}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={cn(
                              "w-12 h-12 rounded-lg flex items-center justify-center text-white",
                              `bg-gradient-to-br ${option.color}`
                            )}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-medium text-gray-900 truncate">{option.title}</h3>
                                {option.isPopular && (
                                  <Badge variant="secondary" className="text-xs">
                                    Popular
                                  </Badge>
                                )}
                                {option.isNew && (
                                  <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                                    New
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 truncate mt-1">{option.description}</p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {option.category}
                            </Badge>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
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
              {filteredOptions.map((option, index) => {
                const Icon = option.icon;
                
                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="group"
                  >
                    <Card 
                      className="hover:shadow-md transition-all duration-200 cursor-pointer border-0 bg-white"
                      onClick={option.action}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center text-white",
                            `bg-gradient-to-br ${option.color}`
                          )}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium text-gray-900 truncate">{option.title}</h3>
                              {option.isPopular && (
                                <Badge variant="secondary" className="text-xs">
                                  Popular
                                </Badge>
                              )}
                              {option.isNew && (
                                <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                                  New
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 truncate mt-1">{option.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {option.category}
                              </Badge>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
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
    </div>
  );
}
