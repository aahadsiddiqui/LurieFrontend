'use client';

import { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3, Database, Info } from 'lucide-react';

interface UserInfo {
  name: string;
  roles: string[];
  oid: string;
}

export default function AnalystPage() {
  const { apiCall } = useApi();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await apiCall('/api/me');
        setUserInfo(data);
      } catch (err) {
        setError('Failed to load user information');
        console.error('Error fetching user info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [apiCall]);

  const handleQuerySubmit = () => {
    // Placeholder for future NL→SQL functionality
    console.log('Query submitted:', query);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analyst</h1>
          <p className="text-muted-foreground">Natural language to SQL query interface</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-destructive">
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Analyst</h1>
        <p className="text-muted-foreground">Natural language to SQL query interface</p>
      </motion.div>

      {/* User roles card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Your Permissions
            </CardTitle>
            <CardDescription>
              Your assigned roles determine what you can access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userInfo?.roles && userInfo.roles.length > 0 ? (
                userInfo.roles.map((role, index) => (
                  <Badge key={index} variant="default">
                    {role}
                  </Badge>
                ))
              ) : (
                <Badge variant="outline">No roles assigned</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Query interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Natural Language Query
            </CardTitle>
            <CardDescription>
              Ask questions in plain English and get SQL queries
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="e.g., Show me all users who signed up last month"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled
                className="h-12"
              />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>This feature is coming soon. Stay tuned!</span>
              </div>
            </div>
            
            <Button 
              onClick={handleQuerySubmit}
              disabled
              className="w-full sm:w-auto"
            >
              Generate SQL Query
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Coming soon card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.3 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-medium">Advanced Analytics Coming Soon</h3>
                <p className="text-muted-foreground">
                  We're working on powerful natural language to SQL capabilities 
                  that will make data analysis effortless.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary">Natural Language Processing</Badge>
                <Badge variant="secondary">SQL Generation</Badge>
                <Badge variant="secondary">Data Visualization</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
