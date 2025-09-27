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
  FileImage,
  FileVideo,
  FileText as FilePdf,
  FileSpreadsheet,
  FileType,
  FileCode,
  Brain,
  Lightbulb,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/ui/utils';

interface Document {
  id: string;
  title: string;
  type: 'document' | 'spreadsheet' | 'presentation' | 'form' | 'notebook' | 'template';
  description: string;
  lastModified: Date;
  modifiedBy: string;
  size: string;
  isStarred: boolean;
  isPinned: boolean;
  isShared: boolean;
  tags: string[];
  category: string;
  collaborators: string[];
  thumbnail?: string;
  content?: string;
  aiSummary?: string;
  aiInsights?: string[];
  aiKeywords?: string[];
  aiSentiment?: 'positive' | 'neutral' | 'negative';
  aiConfidence?: number;
}

interface DocumentsInterfaceProps {
  userInfo?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Patient Care Protocol - Cardiology',
    type: 'document',
    description: 'Comprehensive cardiology patient care protocols and guidelines',
    lastModified: new Date(Date.now() - 300000),
    modifiedBy: 'Dr. Sarah Chen',
    size: '2.4 MB',
    isStarred: true,
    isPinned: true,
    isShared: true,
    tags: ['Cardiology', 'Protocols', 'Patient Care'],
    category: 'Clinical',
    collaborators: ['Dr. Mike Johnson', 'Dr. Lisa Park', 'Nurse Amy'],
    content: 'This document outlines the comprehensive patient care protocols for cardiology patients...',
    aiSummary: 'This document provides comprehensive cardiology patient care protocols including diagnostic procedures, treatment guidelines, and follow-up care recommendations. Key focus areas include acute myocardial infarction management, heart failure protocols, and preventive care measures.',
    aiInsights: ['High priority for emergency protocols', 'Contains critical care guidelines', 'Includes medication protocols'],
    aiKeywords: ['cardiology', 'patient care', 'protocols', 'treatment', 'diagnosis'],
    aiSentiment: 'positive',
    aiConfidence: 0.92
  },
  {
    id: '2',
    title: 'Research Data Analysis - Oncology',
    type: 'spreadsheet',
    description: 'Statistical analysis of oncology research data and patient outcomes',
    lastModified: new Date(Date.now() - 600000),
    modifiedBy: 'Dr. Robert Kim',
    size: '1.8 MB',
    isStarred: false,
    isPinned: false,
    isShared: true,
    tags: ['Research', 'Oncology', 'Data Analysis'],
    category: 'Research',
    collaborators: ['Dr. Jennifer Lee', 'Dr. David Brown'],
    content: 'Comprehensive analysis of oncology research data including patient demographics, treatment outcomes, and survival rates...',
    aiSummary: 'Statistical analysis of oncology research data showing patient demographics, treatment outcomes, and survival rates. Contains detailed data visualization and trend analysis for cancer treatment effectiveness.',
    aiInsights: ['Contains statistical significance data', 'Shows treatment outcome trends', 'Includes survival rate analysis'],
    aiKeywords: ['oncology', 'research', 'data analysis', 'statistics', 'survival rates'],
    aiSentiment: 'neutral',
    aiConfidence: 0.88
  },
  {
    id: '3',
    title: 'Emergency Response Procedures',
    type: 'document',
    description: 'Emergency response procedures and protocols for critical situations',
    lastModified: new Date(Date.now() - 900000),
    modifiedBy: 'Dr. James Wilson',
    size: '3.2 MB',
    isStarred: true,
    isPinned: false,
    isShared: false,
    tags: ['Emergency', 'Procedures', 'Critical Care'],
    category: 'Emergency',
    collaborators: ['Dr. Maria Rodriguez', 'Nurse Tom'],
    content: 'Detailed emergency response procedures for various critical medical situations...',
    aiSummary: 'Comprehensive emergency response procedures covering critical medical situations including trauma protocols, cardiac emergencies, and mass casualty procedures. Contains step-by-step guidelines for emergency medical response.',
    aiInsights: ['Critical for emergency situations', 'Contains life-saving protocols', 'High priority for medical staff'],
    aiKeywords: ['emergency', 'procedures', 'trauma', 'cardiac', 'response'],
    aiSentiment: 'positive',
    aiConfidence: 0.95
  },
  {
    id: '4',
    title: 'Clinical Trial Results - Phase II',
    type: 'presentation',
    description: 'Presentation of Phase II clinical trial results and findings',
    lastModified: new Date(Date.now() - 1200000),
    modifiedBy: 'Dr. Anna Smith',
    size: '4.1 MB',
    isStarred: false,
    isPinned: true,
    isShared: true,
    tags: ['Clinical Trial', 'Phase II', 'Results'],
    category: 'Research',
    collaborators: ['Dr. Michael Taylor', 'Dr. Jennifer Lee'],
    content: 'Comprehensive presentation of Phase II clinical trial results including efficacy data, safety profiles, and patient outcomes...',
    aiSummary: 'Phase II clinical trial results presentation covering efficacy data, safety profiles, and patient outcomes. Contains detailed analysis of treatment effectiveness, adverse events, and patient response rates.',
    aiInsights: ['Shows promising trial results', 'Contains safety profile data', 'Includes efficacy metrics'],
    aiKeywords: ['clinical trial', 'phase II', 'efficacy', 'safety', 'outcomes'],
    aiSentiment: 'positive',
    aiConfidence: 0.89
  },
  {
    id: '5',
    title: 'Patient Assessment Form',
    type: 'form',
    description: 'Standardized patient assessment form for initial evaluation',
    lastModified: new Date(Date.now() - 1800000),
    modifiedBy: 'Dr. Emily Davis',
    size: '856 KB',
    isStarred: false,
    isPinned: false,
    isShared: true,
    tags: ['Assessment', 'Form', 'Patient Evaluation'],
    category: 'Clinical',
    collaborators: ['Dr. Sarah Chen', 'Nurse Amy'],
    content: 'Standardized patient assessment form covering medical history, symptoms, vital signs, and initial evaluation...',
    aiSummary: 'Standardized patient assessment form designed for comprehensive initial evaluation including medical history, current symptoms, vital signs, and clinical observations. Structured for efficient data collection and patient triage.',
    aiInsights: ['Standardized data collection', 'Improves patient triage', 'Comprehensive assessment tool'],
    aiKeywords: ['assessment', 'form', 'patient evaluation', 'medical history', 'vital signs'],
    aiSentiment: 'neutral',
    aiConfidence: 0.85
  },
  {
    id: '6',
    title: 'Medical Research Notebook',
    type: 'notebook',
    description: 'Research notes and observations from ongoing medical studies',
    lastModified: new Date(Date.now() - 2400000),
    modifiedBy: 'Dr. David Brown',
    size: '1.2 MB',
    isStarred: true,
    isPinned: false,
    isShared: false,
    tags: ['Research', 'Notes', 'Observations'],
    category: 'Research',
    collaborators: ['Dr. Anna Smith'],
    content: 'Detailed research notes and observations from ongoing medical studies including methodology, findings, and insights...',
    aiSummary: 'Comprehensive research notebook containing detailed notes, observations, and insights from ongoing medical studies. Includes methodology documentation, research findings, and analytical insights for medical research projects.',
    aiInsights: ['Contains research methodology', 'Includes study findings', 'Documents research insights'],
    aiKeywords: ['research', 'notebook', 'methodology', 'findings', 'insights'],
    aiSentiment: 'positive',
    aiConfidence: 0.87
  }
];

const pageIcons = {
  document: FileText,
  spreadsheet: FileSpreadsheet,
  presentation: FileType,
  form: FileCode,
  notebook: File,
  template: FileImage
};

const pageColors = {
  document: 'from-blue-500 to-cyan-500',
  spreadsheet: 'from-green-500 to-emerald-500',
  presentation: 'from-purple-500 to-violet-500',
  form: 'from-orange-500 to-red-500',
  notebook: 'from-gray-500 to-gray-600',
  template: 'from-pink-500 to-rose-500'
};

const categoryColors = {
  Clinical: 'from-blue-500 to-cyan-500',
  Research: 'from-purple-500 to-violet-500',
  Emergency: 'from-red-500 to-pink-500',
  Admin: 'from-green-500 to-emerald-500'
};

export function DocumentsInterface({ userInfo }: DocumentsInterfaceProps) {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [aiAction, setAiAction] = useState<'summarize' | 'analyze' | 'insights' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'size' | 'modified'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPages, setSelectedPages] = useState<string[]>([]);

  const filteredDocuments = documents.filter(document => {
    const matchesSearch = document.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         document.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         document.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || document.type === filterType;
    const matchesCategory = filterCategory === 'all' || document.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'size':
        return parseFloat(b.size) - parseFloat(a.size);
      case 'modified':
        return b.lastModified.getTime() - a.lastModified.getTime();
      default:
        return b.lastModified.getTime() - a.lastModified.getTime();
    }
  });

  const toggleStar = (id: string) => {
    setDocuments(prev => prev.map(document => 
      document.id === id ? { ...document, isStarred: !document.isStarred } : document
    ));
  };

  const togglePin = (id: string) => {
    setDocuments(prev => prev.map(document => 
      document.id === id ? { ...document, isPinned: !document.isPinned } : document
    ));
  };

  const toggleSelection = (id: string) => {
    setSelectedPages(prev => 
      prev.includes(id) 
        ? prev.filter(documentId => documentId !== id)
        : [...prev, id]
    );
  };

  const handleAIAction = (document: Document, action: 'summarize' | 'analyze' | 'insights') => {
    setSelectedDocument(document);
    setAiAction(action);
    setShowAIPanel(true);
  };

  const [showFileImport, setShowFileImport] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileImport = (files: FileList) => {
    Array.from(files).forEach(file => {
      const newDocument: Document = {
        id: Date.now().toString() + Math.random(),
        title: file.name.replace(/\.[^/.]+$/, ""),
        type: getDocumentTypeFromFile(file),
        description: `Imported ${file.type || 'file'} - ${(file.size / 1024 / 1024).toFixed(2)} MB`,
        lastModified: new Date(),
        modifiedBy: userInfo?.name || 'User',
        size: formatFileSize(file.size),
        isStarred: false,
        isPinned: false,
        isShared: false,
        tags: ['Imported', getFileCategory(file)],
        category: 'Clinical',
        collaborators: [],
        content: `Imported file: ${file.name}`,
        aiSummary: `AI analysis of imported ${file.type || 'file'}: This document has been automatically processed and analyzed for key insights, content structure, and important information.`,
        aiInsights: ['Imported document', 'AI processed', 'Ready for analysis'],
        aiKeywords: ['imported', 'file', 'ai', 'processed'],
        aiSentiment: 'positive',
        aiConfidence: 0.88
      };
      setDocuments(prev => [newDocument, ...prev]);
    });
    setShowFileImport(false);
  };

  const getDocumentTypeFromFile = (file: File): 'document' | 'spreadsheet' | 'presentation' | 'form' | 'notebook' | 'template' => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extension || '')) return 'document';
    if (['xls', 'xlsx', 'csv'].includes(extension || '')) return 'spreadsheet';
    if (['ppt', 'pptx'].includes(extension || '')) return 'presentation';
    if (['form', 'survey'].includes(extension || '')) return 'form';
    return 'document';
  };

  const getFileCategory = (file: File): string => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (['pdf', 'doc', 'docx'].includes(extension || '')) return 'Document';
    if (['xls', 'xlsx', 'csv'].includes(extension || '')) return 'Data';
    if (['ppt', 'pptx'].includes(extension || '')) return 'Presentation';
    return 'File';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileImport(files);
    }
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
              <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
              <p className="text-sm text-gray-500">Your documents, spreadsheets, and presentations with AI-powered insights</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setShowFileImport(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Import Files
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowAIPanel(true)}>
                <Brain className="w-4 h-4 mr-2" />
                AI Assistant
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
                placeholder="Search pages..."
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
                <option value="document">Documents</option>
                <option value="spreadsheet">Spreadsheets</option>
                <option value="presentation">Presentations</option>
                <option value="form">Forms</option>
                <option value="notebook">Notebooks</option>
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
                <option value="Admin">Admin</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">Recent</option>
                <option value="name">Name</option>
                <option value="size">Size</option>
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

        {/* Documents Content */}
        <div 
          className={cn(
            "flex-1 overflow-y-auto px-6 py-4 transition-colors",
            dragOver && "bg-blue-50 border-2 border-dashed border-blue-300"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence>
                {sortedDocuments.map((document, index) => {
                  const Icon = pageIcons[document.type];
                  const gradientClass = pageColors[document.type];
                  const categoryGradient = categoryColors[document.category as keyof typeof categoryColors];
                  
                  return (
                    <motion.div
                      key={document.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={cn(
                        "bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer",
                        selectedPages.includes(document.id) && "border-blue-200 bg-blue-50"
                      )}
                      onClick={() => toggleSelection(document.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center space-x-1">
                          {document.isPinned && <Pin className="w-3 h-3 text-yellow-500" />}
                          {document.isStarred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                          {document.isShared && <Share className="w-3 h-3 text-blue-500" />}
                        </div>
                      </div>

                      <div className="mb-3">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                          {document.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {document.description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{document.size}</span>
                          <span>{formatTime(document.lastModified)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge className={`text-xs px-2 py-1 bg-gradient-to-r ${categoryGradient} text-white`}>
                            {document.category}
                          </Badge>
                          <span className="text-xs text-gray-500">{document.type}</span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-500">Modified by:</span>
                          <span className="text-xs font-medium text-gray-700">{document.modifiedBy}</span>
                        </div>

                        {document.collaborators.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">Collaborators:</span>
                            <div className="flex -space-x-1">
                              {document.collaborators.slice(0, 3).map((collaborator, idx) => (
                                <div key={idx} className="w-4 h-4 rounded-full bg-gray-300 border border-white flex items-center justify-center">
                                  <span className="text-xs text-gray-600">{collaborator.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                                </div>
                              ))}
                              {document.collaborators.length > 3 && (
                                <div className="w-4 h-4 rounded-full bg-gray-100 border border-white flex items-center justify-center">
                                  <span className="text-xs text-gray-600">+{document.collaborators.length - 3}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1">
                          {document.tags.slice(0, 2).map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {document.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{document.tags.length - 2}
                            </Badge>
                          )}
                        </div>

                        {/* AI Summary */}
                        {document.aiSummary && (
                          <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                            <div className="flex items-center space-x-1 mb-1">
                              <Brain className="w-3 h-3 text-blue-600" />
                              <span className="text-xs font-medium text-blue-800">AI Summary</span>
                              <Badge variant="outline" className="text-xs text-blue-600">
                                {Math.round((document.aiConfidence || 0) * 100)}% confidence
                              </Badge>
                            </div>
                            <p className="text-xs text-blue-700 line-clamp-2">{document.aiSummary}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAIAction(document, 'summarize');
                                }}
                              >
                                <Brain className="w-3 h-3 mr-1" />
                                Summarize
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAIAction(document, 'analyze');
                                }}
                              >
                                <Activity className="w-3 h-3 mr-1" />
                                Analyze
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {sortedDocuments.map((document, index) => {
                  const Icon = pageIcons[document.type];
                  const gradientClass = pageColors[document.type];
                  const categoryGradient = categoryColors[document.category as keyof typeof categoryColors];
                  
                  return (
                    <motion.div
                      key={document.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={cn(
                        "bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer",
                        selectedPages.includes(document.id) && "border-blue-200 bg-blue-50"
                      )}
                      onClick={() => toggleSelection(document.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {document.title}
                            </h3>
                            {document.isPinned && <Pin className="w-3 h-3 text-yellow-500" />}
                            {document.isStarred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                            {document.isShared && <Share className="w-3 h-3 text-blue-500" />}
                          </div>
                          
                          <p className="text-sm text-gray-600 line-clamp-1 mb-2">
                            {document.description}
                          </p>

                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{document.size}</span>
                            <span>Modified by {document.modifiedBy}</span>
                            <span>{formatTime(document.lastModified)}</span>
                            <Badge className={`text-xs px-2 py-1 bg-gradient-to-r ${categoryGradient} text-white`}>
                              {document.category}
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
                              toggleStar(document.id);
                            }}
                          >
                            {document.isStarred ? (
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
                              togglePin(document.id);
                            }}
                          >
                            {document.isPinned ? (
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

      {/* AI Panel */}
      {showAIPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">AI Document Assistant</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowAIPanel(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {selectedDocument && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">{selectedDocument.title}</h3>
                    <p className="text-sm text-gray-600">{selectedDocument.description}</p>
                  </div>

                  {aiAction === 'summarize' && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">AI Summary</h4>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">{selectedDocument.aiSummary}</p>
                        <div className="mt-2 flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            Confidence: {Math.round((selectedDocument.aiConfidence || 0) * 100)}%
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Sentiment: {selectedDocument.aiSentiment}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}

                  {aiAction === 'analyze' && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">AI Analysis</h4>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h5 className="font-medium text-green-800 mb-2">Key Insights:</h5>
                        <ul className="space-y-1">
                          {selectedDocument.aiInsights?.map((insight, idx) => (
                            <li key={idx} className="text-sm text-green-700 flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h5 className="font-medium text-purple-800 mb-2">Keywords:</h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedDocument.aiKeywords?.map((keyword, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {aiAction === 'insights' && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">AI Insights</h4>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h5 className="font-medium text-yellow-800 mb-2">Document Insights:</h5>
                        <ul className="space-y-1">
                          {selectedDocument.aiInsights?.map((insight, idx) => (
                            <li key={idx} className="text-sm text-yellow-700 flex items-center space-x-2">
                              <Lightbulb className="w-3 h-3 text-yellow-600" />
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 pt-4 border-t">
                    <Button variant="outline" onClick={() => setShowAIPanel(false)}>
                      Close
                    </Button>
                    <Button onClick={() => setShowAIPanel(false)}>
                      <Download className="w-4 h-4 mr-2" />
                      Export Analysis
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* File Import Modal */}
      {showFileImport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Plus className="w-4 h-4 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Import Documents</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowFileImport(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* File Import Area */}
              <div className="space-y-6">
                {/* Drag and Drop Area */}
                <div 
                  className={cn(
                    "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-colors hover:border-blue-400 hover:bg-blue-50",
                    dragOver && "border-blue-400 bg-blue-50"
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to browse</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Support for PDF, Word, Excel, PowerPoint, CSV, and more
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt,.rtf"
                        onChange={(e) => e.target.files && handleFileImport(e.target.files)}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button variant="outline" className="cursor-pointer">
                          <Plus className="w-4 h-4 mr-2" />
                          Choose Files
                        </Button>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Supported File Types */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Supported File Types</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-gray-600">PDF Documents</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">Word Documents</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileSpreadsheet className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Excel Spreadsheets</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileType className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-600">PowerPoint Presentations</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileSpreadsheet className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-gray-600">CSV Files</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Text Files</span>
                    </div>
                  </div>
                </div>

                {/* AI Processing Info */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">AI-Powered Processing</h4>
                      <p className="text-sm text-blue-700">
                        All imported documents will be automatically analyzed by AI to extract key insights, 
                        generate summaries, and identify important information for better organization and searchability.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowFileImport(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowFileImport(false)}>
                    <Download className="w-4 h-4 mr-2" />
                    Import Files
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
