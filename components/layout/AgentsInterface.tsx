'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MessageSquare, 
  Bot, 
  ChevronRight,
  ChevronDown,
  FileText, 
  BookOpen, 
  Plus,
  Grid3X3,
  User,
  LogOut,
  Heart,
  Stethoscope,
  Activity,
  Shield,
  Users,
  Calendar,
  Clock,
  Star,
  Pin,
  Eye,
  MoreHorizontal,
  ArrowRight,
  Play,
  Settings,
  Download,
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
  ChevronUp,
  ChevronLeft,
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
  Pentagon,
  Zap,
  Target,
  Lightbulb,
  Brain,
  Workflow,
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  Bell,
  Paperclip,
  Smile,
  ThumbsUp,
  ThumbsDown,
  Reply,
  FileText as FileIcon,
  Send,
  Video,
  Phone,
  Hash,
  MessageSquare as MessageSquareIcon,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  Database,
  Globe,
  Lock,
  EyeOff,
  PinOff,
  Bookmark,
  BookmarkCheck,
  Filter,
  SortAsc,
  SortDesc,
  Grid,
  List,
  MoreVertical,
  Menu,
  X as XIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/ui/utils';

interface Agent {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  category: 'lurie' | 'org' | 'featured';
  author?: string;
  isPopular?: boolean;
  isNew?: boolean;
  tags?: string[];
  lastUsed?: Date;
  usageCount?: number;
}

interface AgentsInterfaceProps {
  userInfo?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const lurieAgents: Agent[] = [
  {
    id: 'clinical-coach',
    title: 'Clinical Coach',
    description: 'Assist doctors with summarizing patient histories and clinical decision support',
    emoji: '🧑‍⚕️',
    color: 'from-blue-500 to-cyan-400', // Lurie Children's Blue
    category: 'lurie',
    author: 'Lurie AI Team',
    isPopular: true,
    tags: ['Clinical', 'Patient Care', 'Diagnosis'],
    lastUsed: new Date(Date.now() - 300000),
    usageCount: 1247
  },
  {
    id: 'research-coach',
    title: 'Research Coach',
    description: 'Provide quick analysis of trial data and journal findings for evidence-based medicine',
    emoji: '🧪',
    color: 'from-purple-600 to-violet-500', // Lurie Children's Grape
    category: 'lurie',
    author: 'Lurie AI Team',
    isPopular: true,
    tags: ['Research', 'Data Analysis', 'Evidence'],
    lastUsed: new Date(Date.now() - 600000),
    usageCount: 892
  },
  {
    id: 'documentation-coach',
    title: 'Documentation Coach',
    description: 'Generate structured discharge summaries and progress notes with AI assistance',
    emoji: '📝',
    color: 'from-teal-600 to-cyan-500', // Lurie Children's Ocean
    category: 'lurie',
    author: 'Lurie AI Team',
    isNew: true,
    tags: ['Documentation', 'Notes', 'Summaries'],
    lastUsed: new Date(Date.now() - 900000),
    usageCount: 634
  },
  {
    id: 'pharmacy-coach',
    title: 'Pharmacy Coach',
    description: 'Review prescriptions, drug interactions, and clinical guidelines for medication safety',
    emoji: '💊',
    color: 'from-green-600 to-emerald-500', // Lurie Children's Jungle
    category: 'lurie',
    author: 'Lurie AI Team',
    tags: ['Pharmacy', 'Medications', 'Safety'],
    lastUsed: new Date(Date.now() - 1200000),
    usageCount: 445
  },
  {
    id: 'wellness-coach',
    title: 'Wellness Coach',
    description: 'Guide patients with care plans, preventive health, and lifestyle recommendations',
    emoji: '❤️',
    color: 'from-orange-500 to-yellow-400', // Lurie Children's Sunshine
    category: 'lurie',
    author: 'Lurie AI Team',
    tags: ['Wellness', 'Prevention', 'Lifestyle'],
    lastUsed: new Date(Date.now() - 1500000),
    usageCount: 567
  },
  {
    id: 'diagnostic-assistant',
    title: 'Diagnostic Assistant',
    description: 'AI-powered diagnostic support with symptom analysis and differential diagnosis',
    emoji: '🔬',
    color: 'from-gray-600 to-slate-500', // Lurie Children's Silver
    category: 'lurie',
    author: 'Lurie AI Team',
    isNew: true,
    tags: ['Diagnosis', 'Symptoms', 'AI'],
    lastUsed: new Date(Date.now() - 1800000),
    usageCount: 723
  }
];

const orgAgents: Agent[] = [
  {
    id: 'patient-portal-manager',
    title: 'Patient Portal Manager',
    description: 'Access patient records and appointments with intelligent search and filtering',
    emoji: '🏥',
    color: 'from-blue-500 to-cyan-500',
    category: 'org',
    author: 'Lurie Children\'s Hospital',
    tags: ['Patient Records', 'Appointments', 'Portal'],
    lastUsed: new Date(Date.now() - 300000),
    usageCount: 2341
  },
  {
    id: 'population-health-insights',
    title: 'Population Health Insights',
    description: 'Track key health metrics across patient cohorts and demographic groups',
    emoji: '📊',
    color: 'from-green-500 to-emerald-500',
    category: 'org',
    author: 'Lurie Children\'s Hospital',
    tags: ['Population Health', 'Analytics', 'Metrics'],
    lastUsed: new Date(Date.now() - 600000),
    usageCount: 1876
  },
  {
    id: 'genomics-data-explorer',
    title: 'Genomics Data Explorer',
    description: 'Query genetic testing results and genomic data for personalized medicine',
    emoji: '🧬',
    color: 'from-purple-500 to-violet-500',
    category: 'org',
    author: 'Lurie Children\'s Hospital',
    tags: ['Genomics', 'Genetics', 'Personalized Medicine'],
    lastUsed: new Date(Date.now() - 900000),
    usageCount: 1234
  },
  {
    id: 'care-team-scheduler',
    title: 'Care Team Scheduler',
    description: 'Optimize multidisciplinary team meetings and care coordination',
    emoji: '📅',
    color: 'from-orange-500 to-red-500',
    category: 'org',
    author: 'Lurie Children\'s Hospital',
    tags: ['Scheduling', 'Care Teams', 'Coordination'],
    lastUsed: new Date(Date.now() - 1200000),
    usageCount: 987
  },
  {
    id: 'insurance-claims-assistant',
    title: 'Insurance & Claims Assistant',
    description: 'Support prior authorizations and claim tracking for insurance processes',
    emoji: '💼',
    color: 'from-indigo-500 to-purple-500',
    category: 'org',
    author: 'Lurie Children\'s Hospital',
    tags: ['Insurance', 'Claims', 'Authorization'],
    lastUsed: new Date(Date.now() - 1500000),
    usageCount: 1456
  },
  {
    id: 'ehr-automation-hub',
    title: 'EHR Automation Hub',
    description: 'Automate repetitive charting and billing tasks with intelligent workflows',
    emoji: '⚕️',
    color: 'from-teal-500 to-cyan-500',
    category: 'org',
    author: 'Lurie Children\'s Hospital',
    tags: ['EHR', 'Automation', 'Workflows'],
    lastUsed: new Date(Date.now() - 1800000),
    usageCount: 2103
  }
];

const featuredAgents: Agent[] = [
  {
    id: 'emergency-response-coach',
    title: 'Emergency Response Coach',
    description: 'Rapid triage and emergency protocol guidance for critical situations',
    emoji: '🚨',
    color: 'from-red-400 to-pink-400',
    category: 'featured',
    author: 'Emergency Medicine Team',
    isPopular: true,
    tags: ['Emergency', 'Triage', 'Protocols'],
    lastUsed: new Date(Date.now() - 300000),
    usageCount: 456
  },
  {
    id: 'pediatric-specialist',
    title: 'Pediatric Specialist',
    description: 'Specialized AI assistant for pediatric care and child development tracking',
    emoji: '👶',
    color: 'from-yellow-400 to-orange-400',
    category: 'featured',
    author: 'Pediatrics Department',
    tags: ['Pediatrics', 'Child Development', 'Specialized Care'],
    lastUsed: new Date(Date.now() - 600000),
    usageCount: 789
  },
  {
    id: 'mental-health-coach',
    title: 'Mental Health Coach',
    description: 'Support mental health assessments and therapeutic intervention planning',
    emoji: '🧠',
    color: 'from-purple-400 to-indigo-400',
    category: 'featured',
    author: 'Mental Health Services',
    isNew: true,
    tags: ['Mental Health', 'Therapy', 'Assessment'],
    lastUsed: new Date(Date.now() - 900000),
    usageCount: 234
  },
  {
    id: 'quality-assurance-bot',
    title: 'Quality Assurance Bot',
    description: 'Monitor care quality metrics and compliance with healthcare standards',
    emoji: '✅',
    color: 'from-green-400 to-teal-400',
    category: 'featured',
    author: 'Quality Assurance Team',
    tags: ['Quality', 'Compliance', 'Standards'],
    lastUsed: new Date(Date.now() - 1200000),
    usageCount: 567
  }
];

export function AgentsInterface({ userInfo }: AgentsInterfaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const allAgents = [...lurieAgents, ...orgAgents, ...featuredAgents];

  const filteredAgents = allAgents.filter(agent => {
    const matchesSearch = agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        agent.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

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
      {/* Header Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-4 h-4 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">Lurie AI Admin</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-purple-600" />
              </div>
              <span className="font-medium text-gray-900">Clinical Coach</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-cyan-600" />
              </div>
              <span className="font-medium text-gray-900">Research Coach</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-green-600" />
              </div>
              <span className="font-medium text-gray-900">Meeting Notes Coach</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              See more
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Button>
              <Button
                variant={selectedCategory === 'lurie' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory('lurie')}
              >
                Lurie
              </Button>
              <Button
                variant={selectedCategory === 'org' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory('org')}
              >
                Your Org
              </Button>
              <Button
                variant={selectedCategory === 'featured' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory('featured')}
              >
                Featured
              </Button>
            </div>
          </div>
        </div>

        {/* Built by Lurie Section */}
        {selectedCategory === 'all' || selectedCategory === 'lurie' ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Built by Lurie</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {lurieAgents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="group"
                  >
                    <Card className="h-full agent-card cursor-pointer border-0 bg-white group">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={cn(
                            "w-16 h-16 rounded-xl flex items-center justify-center text-3xl agent-icon",
                            `bg-gradient-to-br ${agent.color}`
                          )}>
                            {agent.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-gray-900 text-lg">{agent.title}</h3>
                              {agent.isPopular && (
                                <Badge variant="secondary" className="text-xs">
                                  Popular
                                </Badge>
                              )}
                              {agent.isNew && (
                                <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                                  New
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{agent.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">By {agent.author}</span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500">{agent.usageCount} uses</span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : null}

        {/* Built by Your Org Section */}
        {selectedCategory === 'all' || selectedCategory === 'org' ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Built by your org</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {orgAgents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer border-0 bg-white group">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center text-2xl",
                            `bg-gradient-to-br ${agent.color}`
                          )}>
                            {agent.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium text-gray-900">{agent.title}</h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{agent.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">{agent.author}</span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500">{agent.usageCount} uses</span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : null}

        {/* Featured Section */}
        {selectedCategory === 'all' || selectedCategory === 'featured' ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Featured</h2>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                See more
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {featuredAgents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="group"
                  >
                    <Card className="h-full agent-card cursor-pointer border-0 bg-white group">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center text-2xl agent-icon",
                            `bg-gradient-to-br ${agent.color}`
                          )}>
                            {agent.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium text-gray-900">{agent.title}</h3>
                              {agent.isPopular && (
                                <Badge variant="secondary" className="text-xs">
                                  Popular
                                </Badge>
                              )}
                              {agent.isNew && (
                                <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                                  New
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{agent.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">{agent.author}</span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500">{agent.usageCount} uses</span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
