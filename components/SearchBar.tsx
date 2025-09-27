'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mic, Camera, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <h1 className="text-4xl font-semibold text-gray-900 mb-2">
            Find insights across your organization
          </h1>
          <p className="text-lg text-gray-600">
            Search for a patient record, clinical note, or dataset from your organization.
          </p>
        </motion.div>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder || "Search patient records, clinical notes, research data..."}
              className={`
                w-full h-14 pl-12 pr-32 text-lg border-2 rounded-xl search-focus
                transition-all duration-200 ease-in-out
                ${isFocused 
                  ? 'border-blue-500 shadow-lg shadow-blue-100' 
                  : 'border-gray-200 hover:border-gray-300'
                }
                focus:outline-none focus:ring-0
              `}
            />
            
            {/* Action Buttons */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-gray-100"
                title="Voice search"
              >
                <Mic className="w-4 h-4" />
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-gray-100"
                title="Image search"
              >
                <Camera className="w-4 h-4" />
              </Button>
              
              <Button
                type="submit"
                className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </form>

        {/* Search Suggestions */}
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10"
          >
            <div className="p-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Quick searches</p>
              <div className="space-y-2">
                {[
                  "Patient discharge summaries",
                  "Lab results for John Smith",
                  "Cardiology research papers",
                  "Pediatric growth charts",
                  "Oncology treatment protocols"
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(suggestion)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Search Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 text-center"
      >
        <p className="text-sm text-gray-500">
          Try searching for: <span className="font-medium">"patient records"</span>, 
          <span className="font-medium"> "clinical trials"</span>, or 
          <span className="font-medium"> "research data"</span>
        </p>
      </motion.div>
    </div>
  );
}
