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
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/ui/utils';

interface ClinicalMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  suggestions?: string[];
  metadata?: {
    sources?: string[];
    confidence?: number;
    clinicalContext?: string;
    riskLevel?: 'low' | 'medium' | 'high';
  };
}

interface ClinicalAssistantInterfaceProps {
  userInfo?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const clinicalSuggestions = [
  "Analyze patient symptoms",
  "Review medication interactions",
  "Suggest diagnostic tests",
  "Compare treatment options",
  "Assess patient risk factors",
  "Generate care plan recommendations",
  "Review clinical guidelines",
  "Analyze lab results"
];

const clinicalCapabilities = [
  {
    icon: Stethoscope,
    title: "Diagnostic Support",
    description: "AI-powered diagnostic assistance based on symptoms and medical history",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Heart,
    title: "Patient Monitoring",
    description: "Continuous monitoring of patient vitals and health indicators",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "Comprehensive risk analysis for treatment planning and patient safety",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Activity,
    title: "Treatment Optimization",
    description: "Evidence-based treatment recommendations and protocol optimization",
    color: "from-purple-500 to-violet-500"
  }
];

const mockMessages: ClinicalMessage[] = [
  {
    id: '1',
    type: 'assistant',
    content: "Hello! I'm your Clinical Assistant, specialized in diagnostic support, patient monitoring, and treatment optimization. I can help you analyze patient data, review clinical guidelines, and provide evidence-based recommendations. How can I assist you today?",
    timestamp: new Date(Date.now() - 300000),
    suggestions: [
      "Analyze patient symptoms",
      "Review medication interactions",
      "Suggest diagnostic tests"
    ],
    metadata: {
      sources: ['Clinical Guidelines', 'Medical Literature', 'Patient Database'],
      confidence: 0.95,
      clinicalContext: 'General Practice',
      riskLevel: 'low'
    }
  }
];

export function ClinicalAssistantInterface({ userInfo }: ClinicalAssistantInterfaceProps) {
  const [messages, setMessages] = useState<ClinicalMessage[]>(mockMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
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

    const userMessage: ClinicalMessage = {
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
      const assistantMessage: ClinicalMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateClinicalResponse(content),
        timestamp: new Date(),
        metadata: {
          sources: ['Clinical Guidelines', 'Medical Literature', 'Patient Database'],
          confidence: 0.88,
          clinicalContext: 'Cardiology',
          riskLevel: 'medium'
        },
        suggestions: [
          "Review patient history",
          "Order additional tests",
          "Consult specialist"
        ]
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateClinicalResponse = (query: string): string => {
    const responses = [
      "Based on the clinical data analysis, I recommend considering the following diagnostic approach. The patient's symptoms align with several potential conditions, and I suggest ordering specific lab tests to narrow down the diagnosis. The risk assessment indicates moderate concern, requiring close monitoring.",
      "After reviewing the patient's medical history and current symptoms, I've identified key risk factors that warrant immediate attention. The treatment protocol should be adjusted based on the patient's age, comorbidities, and medication history. I recommend scheduling follow-up within 48 hours.",
      "The clinical guidelines suggest a systematic approach to this case. Based on the evidence-based protocols, I recommend specific diagnostic tests and treatment options. The patient's response to previous treatments should be carefully monitored.",
      "I've analyzed the patient's condition using the latest clinical decision support tools. The findings suggest a multi-factorial approach to treatment, with particular attention to drug interactions and potential side effects. Regular monitoring is essential."
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

  const getRiskColor = (riskLevel?: string) => {
    switch (riskLevel) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Clinical Assistant</h1>
                <p className="text-sm text-gray-500">Specialized in diagnostic support and patient care</p>
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

        {/* Clinical Capabilities */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {clinicalCapabilities.map((capability, index) => {
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
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                      <Stethoscope className="w-4 h-4" />
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
                          {message.metadata.riskLevel && (
                            <Badge className={cn("text-xs px-2 py-1", getRiskColor(message.metadata.riskLevel))}>
                              {message.metadata.riskLevel.toUpperCase()} RISK
                            </Badge>
                          )}
                        </div>
                        {message.metadata.clinicalContext && (
                          <p className="text-xs text-gray-500">Context: {message.metadata.clinicalContext}</p>
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
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                  <Stethoscope className="w-4 h-4" />
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

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="max-w-4xl mx-auto">
            {/* Quick Suggestions */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Clinical suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {clinicalSuggestions.slice(0, 4).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={cn(
                      "text-xs px-3 py-1 rounded-full transition-colors",
                      selectedSuggestion === suggestion
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
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
                  placeholder="Ask about patient diagnosis, treatment options, or clinical guidelines..."
                  className="pr-12 py-3 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                  className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white"
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
