'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/ui/utils';

interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
}

interface HealthcareSidebarProps {
  userInfo?: UserInfo | null;
  onSignOut?: () => void;
}

const navigationItems = [
  { 
    name: 'Search', 
    href: '/search', 
    icon: Search,
    isActive: true
  },
  { 
    name: 'Chat', 
    href: '/chat', 
    icon: MessageSquare 
  },
  { 
    name: 'Agents', 
    icon: Bot,
    hasSubmenu: true,
    submenu: [
      { name: 'Clinical Assistant', href: '/agents/clinical' },
      { name: 'Research Bot', href: '/agents/research' },
      { name: 'Diagnostic Helper', href: '/agents/diagnostic' }
    ]
  },
  { 
    name: 'Chats', 
    icon: MessageSquare,
    hasSubmenu: true,
    submenu: [
      { name: 'Recent Conversations', href: '/chats/recent' },
      { name: 'Saved Chats', href: '/chats/saved' },
      { name: 'Team Discussions', href: '/chats/team' }
    ]
  },
  { 
    name: 'Documents', 
    href: '/documents', 
    icon: FileText 
  },
  { 
    name: 'Notebooks', 
    href: '/notebooks', 
    icon: BookOpen 
  },
  { 
    name: 'Create', 
    href: '/create', 
    icon: Plus 
  },
  { 
    name: 'Apps', 
    href: '/apps', 
    icon: Grid3X3 
  }
];

const medicalIcons = {
  heart: Heart,
  stethoscope: Stethoscope,
  activity: Activity,
  shield: Shield
};

export function HealthcareSidebar({ userInfo, onSignOut }: HealthcareSidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const isItemActive = (href: string) => {
    if (href === '/search') return pathname === '/search' || pathname === '/';
    return pathname === href;
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="fixed inset-y-0 left-0 z-50 bg-gray-100 border-r border-gray-200 flex flex-col hidden lg:flex"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <motion.div
          initial={false}
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          className="flex items-center"
        >
          <div className="w-12 h-12 rounded-lg overflow-hidden">
            <img 
              src="/logo.webp" 
              alt="Lurie AI" 
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
        
        <div className="flex items-center space-x-2">
          {/* Logo for collapsed state */}
          <motion.div
            initial={false}
            animate={{ opacity: isCollapsed ? 1 : 0 }}
            className={cn("w-12 h-12 rounded-lg overflow-hidden", isCollapsed ? "block" : "hidden")}
          >
            <img 
              src="/logo.webp" 
              alt="Lurie AI" 
              className="w-full h-full object-contain"
            />
          </motion.div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            <ChevronRight className={cn("w-4 h-4 transition-transform", isCollapsed && "rotate-180")} />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto healthcare-scrollbar">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = isItemActive(item.href || '');
          const isExpanded = expandedItems.includes(item.name);
          
          return (
            <div key={item.name}>
              {item.hasSubmenu ? (
                <div>
                  <button
                    onClick={() => toggleExpanded(item.name)}
                    className={cn(
                      "w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg sidebar-item",
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <motion.span
                      initial={false}
                      animate={{ opacity: isCollapsed ? 0 : 1 }}
                      className="flex-1 text-left"
                    >
                      {item.name}
                    </motion.span>
                    {!isCollapsed && (
                      <motion.div
                        initial={false}
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {isExpanded && !isCollapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-6 space-y-1 mt-1">
                          {item.submenu?.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={item.href || '#'}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg sidebar-item",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <motion.span
                    initial={false}
                    animate={{ opacity: isCollapsed ? 0 : 1 }}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* AI Usage Stats Card */}
      <motion.div
        initial={false}
        animate={{ opacity: isCollapsed ? 0 : 1 }}
        className="mx-4 mb-4"
      >
        <div className="bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <Activity className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-medium text-gray-700">AI Usage</span>
            </div>
            <span className="text-xs text-gray-500">Today</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Queries</span>
              <span className="text-sm font-semibold text-blue-600">47</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Tokens Used</span>
              <span className="text-sm font-semibold text-teal-600">12.3K</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-1.5 rounded-full" style={{ width: '68%' }}></div>
            </div>
            <p className="text-xs text-gray-500">68% of daily limit</p>
          </div>
        </div>
      </motion.div>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={userInfo?.avatar} alt={userInfo?.name} />
            <AvatarFallback>
              {userInfo?.name ? userInfo.name.split(' ').map(n => n[0]).join('').toUpperCase() : <User className="w-4 h-4" />}
            </AvatarFallback>
          </Avatar>
          
          <motion.div
            initial={false}
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            className="flex-1 min-w-0"
          >
            <p className="text-sm font-medium text-gray-900 truncate">
              {userInfo?.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {userInfo?.email || 'user@lurie.org'}
            </p>
          </motion.div>
          
          {!isCollapsed && onSignOut && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onSignOut}
              className="h-8 w-8"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
