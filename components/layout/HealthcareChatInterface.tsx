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
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/ui/utils';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  suggestions?: string[];
  metadata?: {
    sources?: string[];
    confidence?: number;
  };
}

interface HealthcareChatInterfaceProps {
  userInfo?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const healthcareSuggestions = [
  "Analyze patient discharge summaries",
  "Find clinical trial results for oncology",
  "Summarize lab report findings",
  "Compare treatment protocols",
  "Generate patient care recommendations",
  "Research medication interactions",
  "Review emergency procedures",
  "Analyze patient outcomes data"
];

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    type: 'assistant',
    content: "Hello! I'm your healthcare AI assistant. I can help you analyze patient data, research clinical information, and provide insights across your organization. What would you like to explore today?",
    timestamp: new Date(Date.now() - 300000),
    suggestions: [
      "Show me recent patient episodes",
      "Analyze lab results trends",
      "Find research papers on cardiology"
    ]
  }
];

export function HealthcareChatInterface({ userInfo }: HealthcareChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
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

    const userMessage: ChatMessage = {
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
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateHealthcareResponse(content),
        timestamp: new Date(),
        metadata: {
          sources: ['Patient Database', 'Clinical Guidelines', 'Research Papers'],
          confidence: 0.92
        },
        suggestions: [
          "Show related patient cases",
          "Analyze similar conditions",
          "Find treatment protocols"
        ]
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateHealthcareResponse = (query: string): string => {
    const responses = [
      "Based on the clinical data analysis, I found several relevant insights. The patient's condition shows improvement with the current treatment protocol. Here are the key findings from the latest lab results and clinical notes...",
      "I've analyzed the patient records and identified patterns that suggest this treatment approach is effective. The data shows a 15% improvement in outcomes compared to previous cases. Would you like me to dive deeper into specific metrics?",
      "After reviewing the clinical guidelines and patient history, I recommend considering the updated treatment protocol. The evidence suggests this approach has shown positive results in similar cases. Here's what I found...",
      "I've cross-referenced the patient data with current research and clinical best practices. The analysis reveals important insights about treatment effectiveness and potential areas for optimization."
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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Healthcare AI Assistant</h1>
                <p className="text-sm text-gray-500">Powered by Lurie AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </Badge>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>
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
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-teal-500 text-white">
                      <Bot className="w-4 h-4" />
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
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Sources: {message.metadata.sources?.join(', ')}</span>
                          <span>Confidence: {Math.round((message.metadata.confidence || 0) * 100)}%</span>
                        </div>
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
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-teal-500 text-white">
                  <Bot className="w-4 h-4" />
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
              <p className="text-sm text-gray-600 mb-2">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {healthcareSuggestions.slice(0, 4).map((suggestion, index) => (
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
                  placeholder="Ask about patient data, clinical research, or healthcare insights..."
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
