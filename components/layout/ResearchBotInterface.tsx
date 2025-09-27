'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  Paperclip, 
  MoreHorizontal, 
  ThumbsUp, 
  ThumbsDown,
  Copy,
  Edit,
  Trash2,
  Sparkles,
  Bot,
  User,
  Heart,
  Stethoscope,
  Activity,
  Shield,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  FileText,
  Users,
  Calendar,
  Zap,
  Search,
  BookOpen,
  Database,
  BarChart3,
  Globe,
  Lightbulb,
  Target,
  Filter,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/ui/utils';

interface ResearchMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  suggestions?: string[];
  metadata?: {
    sources?: string[];
    confidence?: number;
    researchContext?: string;
    publicationYear?: number;
    citationCount?: number;
    impactFactor?: number;
  };
}

interface ResearchBotInterfaceProps {
  userInfo?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const researchSuggestions = [
  "Find latest research on cardiology",
  "Analyze clinical trial results",
  "Compare treatment protocols",
  "Search medical literature",
  "Generate research summary",
  "Identify research gaps",
  "Review systematic reviews",
  "Extract key findings"
];

const researchCapabilities = [
  {
    icon: Search,
    title: "Literature Search",
    description: "Comprehensive search across medical databases and research papers",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: BarChart3,
    title: "Data Analysis",
    description: "Statistical analysis and interpretation of research data",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: BookOpen,
    title: "Systematic Reviews",
    description: "Automated systematic review generation and meta-analysis",
    color: "from-purple-500 to-violet-500"
  },
  {
    icon: Target,
    title: "Research Insights",
    description: "AI-powered research insights and trend analysis",
    color: "from-orange-500 to-red-500"
  }
];

const mockResearchData = [
  {
    title: "Cardiovascular Disease Prevention",
    authors: "Smith, J., Johnson, A., Williams, B.",
    journal: "New England Journal of Medicine",
    year: 2023,
    impactFactor: 8.9,
    citations: 1247,
    abstract: "A comprehensive study on cardiovascular disease prevention strategies...",
    keywords: ["Cardiology", "Prevention", "Risk Factors"],
    doi: "10.1056/NEJM.2023.1234"
  },
  {
    title: "AI in Medical Diagnosis",
    authors: "Chen, L., Davis, M., Brown, K.",
    journal: "Nature Medicine",
    year: 2023,
    impactFactor: 12.1,
    citations: 892,
    abstract: "Artificial intelligence applications in medical diagnosis and treatment...",
    keywords: ["AI", "Diagnosis", "Machine Learning"],
    doi: "10.1038/s41591-023-12345"
  }
];

const mockMessages: ResearchMessage[] = [
  {
    id: '1',
    type: 'assistant',
    content: "Hello! I'm your Research Bot, specialized in medical literature analysis, clinical research, and data interpretation. I can help you find relevant studies, analyze research data, generate systematic reviews, and provide evidence-based insights. What research topic would you like to explore?",
    timestamp: new Date(Date.now() - 300000),
    suggestions: [
      "Find latest research on cardiology",
      "Analyze clinical trial results",
      "Generate research summary"
    ],
    metadata: {
      sources: ['PubMed', 'Cochrane Library', 'Medical Literature'],
      confidence: 0.94,
      researchContext: 'Medical Research',
      publicationYear: 2023,
      citationCount: 0,
      impactFactor: 0
    }
  }
];

export function ResearchBotInterface({ userInfo }: ResearchBotInterfaceProps) {
  const [messages, setMessages] = useState<ResearchMessage[]>(mockMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [showResearchData, setShowResearchData] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ResearchMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ResearchMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateResearchResponse(content),
        timestamp: new Date(),
        metadata: {
          sources: ['PubMed', 'Cochrane Library', 'Medical Literature'],
          confidence: 0.91,
          researchContext: 'Cardiology Research',
          publicationYear: 2023,
          citationCount: 1247,
          impactFactor: 8.9
        },
        suggestions: [
          "View full research paper",
          "Find related studies",
          "Generate summary report"
        ]
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      setShowResearchData(true);
    }, 2500);
  };

  const generateResearchResponse = (query: string): string => {
    const responses = [
      "I've found 47 relevant research papers on this topic. The most recent studies show significant findings in cardiovascular disease prevention. Based on the systematic analysis, I recommend focusing on the latest meta-analyses published in high-impact journals. The evidence suggests a strong correlation between lifestyle interventions and reduced cardiovascular risk.",
      "After analyzing the research database, I've identified key trends in this field. The data shows a 23% improvement in patient outcomes with the new treatment protocol. The systematic review indicates strong evidence for this approach, with a confidence interval of 95%. I recommend reviewing the latest Cochrane review for comprehensive evidence.",
      "Based on the literature search, I found 23 peer-reviewed studies addressing your query. The research indicates promising results with statistical significance (p < 0.05). The most cited paper in this area has 1,247 citations and was published in a high-impact journal. The evidence supports the effectiveness of this intervention.",
      "I've conducted a comprehensive analysis of the available research. The findings suggest that this treatment approach has shown consistent positive results across multiple studies. The meta-analysis reveals a significant effect size with low heterogeneity, indicating robust evidence for clinical implementation."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSelectedSuggestion(suggestion);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Research Bot</h1>
                <p className="text-sm text-gray-500">Specialized in medical literature and research analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Active
              </Badge>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Research Capabilities */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {researchCapabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${capability.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{capability.title}</p>
                    <p className="text-xs text-gray-500 truncate">{capability.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex items-start space-x-3",
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.type === 'assistant' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-violet-500 text-white">
                      <Search className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={cn(
                  "max-w-3xl",
                  message.type === 'user' ? 'order-1' : 'order-2'
                )}>
                  <div className={cn(
                    "rounded-2xl px-4 py-3",
                    message.type === 'user' 
                      ? "bg-blue-600 text-white" 
                      : "bg-white border border-gray-200 shadow-sm"
                  )}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {message.metadata && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Sources: {message.metadata.sources?.join(', ')}</span>
                            <span>Confidence: {Math.round((message.metadata.confidence || 0) * 100)}%</span>
                          </div>
                          {message.metadata.impactFactor && (
                            <Badge className="text-xs px-2 py-1 bg-purple-100 text-purple-700">
                              Impact: {message.metadata.impactFactor}
                            </Badge>
                          )}
                        </div>
                        {message.metadata.researchContext && (
                          <p className="text-xs text-gray-500">Context: {message.metadata.researchContext}</p>
                        )}
                        {message.metadata.citationCount && (
                          <p className="text-xs text-gray-500">Citations: {message.metadata.citationCount.toLocaleString()}</p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {message.suggestions && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    {message.type === 'assistant' && (
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {message.type === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={userInfo?.avatar} alt={userInfo?.name} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {userInfo?.name ? getInitials(userInfo.name) : <User className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start space-x-3"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-violet-500 text-white">
                  <Search className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Research Data Display */}
          {showResearchData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Research Results</h3>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
              
              <div className="space-y-4">
                {mockResearchData.map((paper, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-sm font-medium text-gray-900 mb-2">
                            {paper.title}
                          </CardTitle>
                          <p className="text-xs text-gray-600 mb-1">
                            {paper.authors} • {paper.journal} ({paper.year})
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Impact Factor: {paper.impactFactor}</span>
                            <span>Citations: {paper.citations.toLocaleString()}</span>
                            <span>DOI: {paper.doi}</span>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700">
                          {paper.impactFactor} Impact
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-gray-700 mb-3 line-clamp-2">
                        {paper.abstract}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {paper.keywords.map((keyword, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="max-w-4xl mx-auto">
            {/* Quick Suggestions */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Research suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {researchSuggestions.slice(0, 4).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={cn(
                      "text-xs px-3 py-1 rounded-full transition-colors",
                      selectedSuggestion === suggestion
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    )}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex items-end space-x-3"
            >
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search medical literature, analyze research data, or generate research insights..."
                  className="pr-12 py-3 text-sm border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-gray-100"
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-gray-100"
                >
                  <Mic className="w-4 h-4" />
                </Button>
                <Button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="h-10 px-4 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
