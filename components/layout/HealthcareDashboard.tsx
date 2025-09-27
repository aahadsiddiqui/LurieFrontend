'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HealthcareSidebar } from './HealthcareSidebar';
import { SearchBar } from '@/components/SearchBar';
import { RecommendedSection } from '@/components/RecommendedCard';
import { QuickAccessSection } from '@/components/QuickAccess';

interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
}

interface HealthcareDashboardProps {
  userInfo?: UserInfo | null;
  onSignOut?: () => void;
}

// Mock data for recommended cards
const recommendedCards = [
  {
    title: 'Patient Episode Summaries',
    subtitle: 'Cardiology Department',
    description: 'Comprehensive summaries of patient episodes including diagnosis, treatment plans, and outcomes for cardiology patients.',
    tags: ['Cardiology', 'Patient Care', 'Episodes'],
    updatedBy: 'Dr. Sarah Chen',
    updatedAt: '2 hours ago',
    type: 'patient' as const
  },
  {
    title: 'Clinical Trial Results',
    subtitle: 'Oncology Research',
    description: 'Latest results from Phase II clinical trials for new cancer treatments, including efficacy data and patient responses.',
    tags: ['Research', 'Oncology', 'Clinical Trials'],
    updatedBy: 'Dr. Robert Kim',
    updatedAt: '1 day ago',
    type: 'research' as const
  },
  {
    title: 'Lab Report Analysis',
    subtitle: 'Pathology Department',
    description: 'Automated analysis of lab reports with AI-powered insights for faster diagnosis and treatment recommendations.',
    tags: ['Pathology', 'AI Analysis', 'Diagnostics'],
    updatedBy: 'Dr. Lisa Park',
    updatedAt: '3 hours ago',
    type: 'analytics' as const
  },
  {
    title: 'Emergency Protocols',
    subtitle: 'Emergency Medicine',
    description: 'Updated emergency response protocols and procedures for critical care situations and trauma cases.',
    tags: ['Emergency', 'Protocols', 'Critical Care'],
    updatedBy: 'Dr. Mike Johnson',
    updatedAt: '5 hours ago',
    type: 'clinical' as const
  },
  {
    title: 'Pediatric Growth Charts',
    subtitle: 'Pediatrics Department',
    description: 'Interactive growth charts and developmental milestones tracking for pediatric patients across different age groups.',
    tags: ['Pediatrics', 'Growth Tracking', 'Development'],
    updatedBy: 'Dr. Amy Wilson',
    updatedAt: '6 hours ago',
    type: 'patient' as const
  },
  {
    title: 'Medication Interaction Database',
    subtitle: 'Pharmacy Services',
    description: 'Comprehensive database of drug interactions, contraindications, and dosage recommendations for safe medication management.',
    tags: ['Pharmacy', 'Drug Safety', 'Interactions'],
    updatedBy: 'Dr. Tom Wilson',
    updatedAt: '1 day ago',
    type: 'clinical' as const
  }
];

export function HealthcareDashboard({ userInfo, onSignOut }: HealthcareDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
    // Here you would implement actual search functionality
  };

  const handleViewAllRecommended = () => {
    console.log('View all recommended items');
    // Navigate to recommended items page
  };

  const handleViewAllQuickAccess = () => {
    console.log('View all quick access items');
    // Navigate to quick access page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: mobileMenuOpen ? 0 : '-100%' }}
        className="fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 flex flex-col lg:hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Lurie AI</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(false)}
            className="h-8 w-8"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 px-3 py-4">
          <p className="text-sm text-gray-600 px-3 py-2">Mobile navigation would go here</p>
        </div>
      </motion.div>

      {/* Desktop Sidebar */}
      <HealthcareSidebar userInfo={userInfo} onSignOut={onSignOut} />

      {/* Main Content */}
      <div className="lg:pl-80">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            className="h-8 w-8"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Lurie AI</span>
          </div>
          <div className="w-8" />
        </div>
        <div className="min-h-screen">
          {/* Main Content Area */}
          <main className="px-4 sm:px-6 py-6 sm:py-8">
            <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
              {/* Search Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center"
              >
                <SearchBar 
                  onSearch={handleSearch}
                  placeholder="Search patient records, clinical notes, research data..."
                />
              </motion.div>

              {/* Recommended Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <RecommendedSection
                  title="Recommended for you"
                  cards={recommendedCards}
                  onViewAll={handleViewAllRecommended}
                />
              </motion.div>

              {/* Quick Access Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <QuickAccessSection
                  title="Quick access"
                  onViewAll={handleViewAllQuickAccess}
                />
              </motion.div>

              {/* Additional Healthcare Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-xl border border-gray-200 p-8"
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Healthcare AI Insights
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Discover patterns and insights across your organization's healthcare data
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">Patient Analytics</h4>
                      <p className="text-sm text-gray-600">AI-powered patient outcome predictions and risk assessments</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">Clinical Efficiency</h4>
                      <p className="text-sm text-gray-600">Optimize workflows and reduce administrative burden</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">Research Insights</h4>
                      <p className="text-sm text-gray-600">Discover trends and patterns in medical research data</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
