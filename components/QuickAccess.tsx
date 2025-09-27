'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Share2, 
  Star, 
  FileText, 
  Table, 
  MessageSquare, 
  Users,
  Calendar,
  Download,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface QuickAccessItem {
  id: string;
  title: string;
  type: 'document' | 'spreadsheet' | 'meeting' | 'chat';
  updatedAt: string;
  updatedBy: string;
  collaborators: string[];
  size?: string;
  isShared?: boolean;
  isFavorite?: boolean;
}

interface QuickAccessTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function QuickAccessTabs({ activeTab, onTabChange }: QuickAccessTabsProps) {
  const tabs = [
    { id: 'recent', label: 'Recent', icon: Clock },
    { id: 'shared', label: 'Shared', icon: Share2 },
    { id: 'favorites', label: 'Favorites', icon: Star }
  ];

  return (
    <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${isActive 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

interface QuickAccessListProps {
  items: QuickAccessItem[];
  onItemClick?: (item: QuickAccessItem) => void;
}

export function QuickAccessList({ items, onItemClick }: QuickAccessListProps) {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'spreadsheet': return Table;
      case 'meeting': return MessageSquare;
      case 'chat': return Users;
      default: return FileText;
    }
  };

  const getFileColor = (type: string) => {
    switch (type) {
      case 'document': return 'text-blue-600';
      case 'spreadsheet': return 'text-green-600';
      case 'meeting': return 'text-purple-600';
      case 'chat': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const Icon = getFileIcon(item.type);
        const iconColor = getFileColor(item.type);
        
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => onItemClick?.(item)}
            className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            {/* File Icon */}
            <div className="flex-shrink-0">
              <div className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {item.title}
                </h3>
                {item.isShared && (
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    Shared
                  </Badge>
                )}
                {item.isFavorite && (
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>Updated {item.updatedAt}</span>
                {item.size && <span>{item.size}</span>}
                <span>by {item.updatedBy}</span>
              </div>
            </div>

            {/* Collaborators */}
            <div className="flex items-center space-x-1">
              {item.collaborators.slice(0, 3).map((collaborator, idx) => (
                <Avatar key={idx} className="w-6 h-6 border-2 border-white">
                  <AvatarImage src="" alt={collaborator} />
                  <AvatarFallback className="text-xs">
                    {collaborator.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
              {item.collaborators.length > 3 && (
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600">
                  +{item.collaborators.length - 3}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

interface QuickAccessSectionProps {
  title: string;
  onViewAll?: () => void;
}

export function QuickAccessSection({ title, onViewAll }: QuickAccessSectionProps) {
  const [activeTab, setActiveTab] = useState('recent');

  // Mock data for different tabs
  const mockData = {
    recent: [
      {
        id: '1',
        title: 'Discharge Summary – Cardiology',
        type: 'document' as const,
        updatedAt: '2 hours ago',
        updatedBy: 'Dr. Sarah Chen',
        collaborators: ['Dr. Sarah Chen', 'Dr. Mike Johnson', 'Nurse Amy'],
        size: '2.4 MB',
        isShared: true
      },
      {
        id: '2',
        title: 'Pediatric Growth Charts (Excel)',
        type: 'spreadsheet' as const,
        updatedAt: '4 hours ago',
        updatedBy: 'Dr. Lisa Park',
        collaborators: ['Dr. Lisa Park', 'Dr. Tom Wilson'],
        size: '1.8 MB'
      },
      {
        id: '3',
        title: 'Oncology Research Notes',
        type: 'document' as const,
        updatedAt: '1 day ago',
        updatedBy: 'Dr. Robert Kim',
        collaborators: ['Dr. Robert Kim', 'Dr. Sarah Chen'],
        size: '3.2 MB',
        isShared: true
      },
      {
        id: '4',
        title: 'Weekly Care Team Meeting (Teams)',
        type: 'meeting' as const,
        updatedAt: '2 days ago',
        updatedBy: 'Dr. Sarah Chen',
        collaborators: ['Dr. Sarah Chen', 'Dr. Mike Johnson', 'Nurse Amy', 'Dr. Lisa Park'],
        isShared: true
      }
    ],
    shared: [
      {
        id: '5',
        title: 'Clinical Trial Results - Phase II',
        type: 'document' as const,
        updatedAt: '3 hours ago',
        updatedBy: 'Dr. Robert Kim',
        collaborators: ['Dr. Robert Kim', 'Dr. Sarah Chen', 'Dr. Mike Johnson'],
        size: '4.1 MB',
        isShared: true
      },
      {
        id: '6',
        title: 'Patient Safety Protocol',
        type: 'document' as const,
        updatedAt: '1 day ago',
        updatedBy: 'Dr. Lisa Park',
        collaborators: ['Dr. Lisa Park', 'Nurse Amy', 'Dr. Tom Wilson'],
        size: '2.8 MB',
        isShared: true
      }
    ],
    favorites: [
      {
        id: '7',
        title: 'Emergency Response Guidelines',
        type: 'document' as const,
        updatedAt: '1 week ago',
        updatedBy: 'Dr. Sarah Chen',
        collaborators: ['Dr. Sarah Chen', 'Dr. Mike Johnson'],
        size: '1.5 MB',
        isShared: true,
        isFavorite: true
      },
      {
        id: '8',
        title: 'Medical Equipment Inventory',
        type: 'spreadsheet' as const,
        updatedAt: '3 days ago',
        updatedBy: 'Dr. Lisa Park',
        collaborators: ['Dr. Lisa Park', 'Nurse Amy'],
        size: '2.1 MB',
        isFavorite: true
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            View all
          </button>
        )}
      </div>

      <QuickAccessTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <QuickAccessList 
            items={mockData[activeTab as keyof typeof mockData]} 
            onItemClick={(item) => console.log('Clicked item:', item)}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
