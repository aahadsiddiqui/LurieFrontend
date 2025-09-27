'use client';

import { motion } from 'framer-motion';
import { 
  FileText, 
  Users, 
  Calendar, 
  TrendingUp, 
  Heart, 
  Stethoscope, 
  Activity,
  Shield,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RecommendedCardProps {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  updatedBy: string;
  updatedAt: string;
  type: 'patient' | 'research' | 'clinical' | 'analytics';
  onClick?: () => void;
}

const cardIcons = {
  patient: Heart,
  research: Activity,
  clinical: Stethoscope,
  analytics: TrendingUp
};

const cardColors = {
  patient: 'from-pink-500 to-rose-500',
  research: 'from-blue-500 to-cyan-500',
  clinical: 'from-green-500 to-emerald-500',
  analytics: 'from-purple-500 to-violet-500'
};

export function RecommendedCard({
  title,
  subtitle,
  description,
  tags,
  updatedBy,
  updatedAt,
  type,
  onClick
}: RecommendedCardProps) {
  const Icon = cardIcons[type];
  const gradientClass = cardColors[type];

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="h-full border border-gray-200 hover:border-gray-300 hover:shadow-lg healthcare-card">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center medical-icon`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Updated</p>
              <p className="text-sm font-medium text-gray-900">{updatedAt}</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{subtitle}</p>
              <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700"
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-1">
                  +{tags.length - 3} more
                </Badge>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-xs text-gray-600">by {updatedBy}</span>
              </div>
              
              <div className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                <span className="text-sm font-medium mr-1">View</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface RecommendedSectionProps {
  title: string;
  cards: RecommendedCardProps[];
  onViewAll?: () => void;
}

export function RecommendedSection({ title, cards, onViewAll }: RecommendedSectionProps) {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <RecommendedCard {...card} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
