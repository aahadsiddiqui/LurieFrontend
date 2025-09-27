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
  Download,
  Brain,
  Eye,
  Microscope,
  Thermometer,
  Pulse,
  XRay,
  Pill,
  Cross
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/ui/utils';

interface DiagnosticMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  suggestions?: string[];
  metadata?: {
    sources?: string[];
    confidence?: number;
    diagnosticContext?: string;
    urgencyLevel?: 'low' | 'medium' | 'high' | 'critical';
    differentialDiagnosis?: string[];
  };
}

interface DiagnosticHelperInterfaceProps {
  userInfo?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const diagnosticSuggestions = [
  "Analyze patient symptoms",
  "Suggest diagnostic tests",
  "Review medical history",
  "Compare differential diagnoses",
  "Assess symptom severity",
  "Recommend specialist referral",
  "Review lab results",
  "Generate diagnostic report"
];

const diagnosticCapabilities = [
  {
    icon: Brain,
    title: "Symptom Analysis",
    description: "AI-powered analysis of patient symptoms and complaints",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Microscope,
    title: "Test Recommendations",
    description: "Evidence-based diagnostic test suggestions and protocols",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Target,
    title: "Differential Diagnosis",
    description: "Comprehensive differential diagnosis generation and ranking",
    color: "from-purple-500 to-violet-500"
  },
  {
    icon: AlertCircle,
    title: "Urgency Assessment",
    description: "Patient urgency evaluation and triage recommendations",
    color: "from-red-500 to-pink-500"
  }
];

const mockDiagnosticData = [
  {
    condition: "Acute Myocardial Infarction",
    probability: 0.85,
    urgency: "critical",
    symptoms: ["Chest pain", "Shortness of breath", "Nausea"],
    tests: ["ECG", "Troponin levels", "Chest X-ray"],
    treatment: "Immediate cardiac intervention required"
  },
  {
    condition: "Pneumonia",
    probability: 0.72,
    urgency: "high",
    symptoms: ["Fever", "Cough", "Chest pain"],
    tests: ["Chest X-ray", "Blood culture", "Sputum analysis"],
    treatment: "Antibiotic therapy and supportive care"
  },
  {
    condition: "Gastroenteritis",
    probability: 0.68,
    urgency: "medium",
    symptoms: ["Nausea", "Vomiting", "Diarrhea"],
    tests: ["Stool culture", "Blood tests", "Electrolyte panel"],
    treatment: "Fluid replacement and symptomatic care"
  }
];

const mockMessages: DiagnosticMessage[] = [
  {
    id: '1',
    type: 'assistant',
    content: "Hello! I'm your Diagnostic Helper, specialized in symptom analysis, differential diagnosis, and diagnostic test recommendations. I can help you analyze patient symptoms, suggest appropriate tests, and generate diagnostic insights. What symptoms or diagnostic challenge can I help you with?",
    timestamp: new Date(Date.now() - 300000),
    suggestions: [
      "Analyze patient symptoms",
      "Suggest diagnostic tests",
      "Review medical history"
    ],
    metadata: {
      sources: ['Medical Literature', 'Clinical Guidelines', 'Diagnostic Protocols'],
      confidence: 0.96,
      diagnosticContext: 'General Medicine',
      urgencyLevel: 'low',
      differentialDiagnosis: []
    }
  }
];

export function DiagnosticHelperInterface({ userInfo }: DiagnosticHelperInterfaceProps) {
  const [messages, setMessages] = useState<DiagnosticMessage[]>(mockMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [showDiagnosticData, setShowDiagnosticData] = useState(false);
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

    const userMessage: DiagnosticMessage = {
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
      const assistantMessage: DiagnosticMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateDiagnosticResponse(content),
        timestamp: new Date(),
        metadata: {
          sources: ['Medical Literature', 'Clinical Guidelines', 'Diagnostic Protocols'],
          confidence: 0.89,
          diagnosticContext: 'Cardiology',
          urgencyLevel: 'high',
          differentialDiagnosis: ['Acute MI', 'Unstable Angina', 'Aortic Dissection']
        },
        suggestions: [
          "Order diagnostic tests",
          "Consult cardiology",
          "Monitor patient closely"
        ]
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      setShowDiagnosticData(true);
    }, 3000);
  };

  const generateDiagnosticResponse = (query: string): string => {
    const responses = [
      "Based on the symptom analysis, I've identified several potential diagnoses. The most likely condition is acute myocardial infarction with a probability of 85%. I recommend immediate ECG, troponin levels, and chest X-ray. The patient requires urgent cardiac evaluation and possible intervention. The differential diagnosis includes unstable angina and aortic dissection.",
      "After analyzing the patient's symptoms and medical history, I recommend the following diagnostic approach: Start with basic laboratory tests including CBC, metabolic panel, and inflammatory markers. Based on the clinical presentation, I suggest chest imaging and cardiac evaluation. The urgency level is high, requiring close monitoring and specialist consultation.",
      "The symptom pattern suggests a respiratory condition with high probability. I recommend immediate chest X-ray, arterial blood gas analysis, and sputum culture. The patient should be monitored for respiratory distress and may require oxygen therapy. Consider infectious disease consultation for antibiotic selection.",
      "Based on the clinical presentation, I've generated a differential diagnosis list with probability rankings. The most likely diagnosis has a 72% probability based on symptom correlation. I recommend specific diagnostic tests to confirm the diagnosis and rule out other conditions. The patient requires close monitoring and follow-up."
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

  const getUrgencyColor = (urgencyLevel?: string) => {
    switch (urgencyLevel) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
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
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <Cross className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Diagnostic Helper</h1>
                <p className="text-sm text-gray-500">Specialized in symptom analysis and diagnostic support</p>
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

        {/* Diagnostic Capabilities */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {diagnosticCapabilities.map((capability, index) => {
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
                    <AvatarFallback className="bg-gradient-to-br from-red-500 to-pink-500 text-white">
                      <Cross className="w-4 h-4" />
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
                          {message.metadata.urgencyLevel && (
                            <Badge className={cn("text-xs px-2 py-1", getUrgencyColor(message.metadata.urgencyLevel))}>
                              {message.metadata.urgencyLevel.toUpperCase()} URGENCY
                            </Badge>
                          )}
                        </div>
                        {message.metadata.diagnosticContext && (
                          <p className="text-xs text-gray-500">Context: {message.metadata.diagnosticContext}</p>
                        )}
                        {message.metadata.differentialDiagnosis && message.metadata.differentialDiagnosis.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-500 mb-1">Differential Diagnosis:</p>
                            <div className="flex flex-wrap gap-1">
                              {message.metadata.differentialDiagnosis.map((diagnosis, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {diagnosis}
                                </Badge>
                              ))}
                            </div>
                          </div>
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
                <AvatarFallback className="bg-gradient-to-br from-red-500 to-pink-500 text-white">
                  <Cross className="w-4 h-4" />
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

          {/* Diagnostic Data Display */}
          {showDiagnosticData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Diagnostic Analysis</h3>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
              
              <div className="space-y-4">
                {mockDiagnosticData.map((diagnosis, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-sm font-medium text-gray-900 mb-2">
                            {diagnosis.condition}
                          </CardTitle>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                            <span>Probability: {Math.round(diagnosis.probability * 100)}%</span>
                            <Badge className={cn("text-xs px-2 py-1", getUrgencyColor(diagnosis.urgency))}>
                              {diagnosis.urgency.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {Math.round(diagnosis.probability * 100)}%
                          </div>
                          <div className="text-xs text-gray-500">Probability</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-medium text-gray-700 mb-1">Key Symptoms:</p>
                          <div className="flex flex-wrap gap-1">
                            {diagnosis.symptoms.map((symptom, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-700 mb-1">Recommended Tests:</p>
                          <div className="flex flex-wrap gap-1">
                            {diagnosis.tests.map((test, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {test}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-700 mb-1">Treatment:</p>
                          <p className="text-xs text-gray-600">{diagnosis.treatment}</p>
                        </div>
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
              <p className="text-sm text-gray-600 mb-2">Diagnostic suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {diagnosticSuggestions.slice(0, 4).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={cn(
                      "text-xs px-3 py-1 rounded-full transition-colors",
                      selectedSuggestion === suggestion
                        ? "bg-red-100 text-red-700 border border-red-200"
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
                  placeholder="Describe patient symptoms, review test results, or ask for diagnostic guidance..."
                  className="pr-12 py-3 text-sm border-gray-300 focus:border-red-500 focus:ring-red-500"
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
                  className="h-10 px-4 bg-red-600 hover:bg-red-700 text-white"
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
