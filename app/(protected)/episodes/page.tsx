'use client';

import { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Play, Users } from 'lucide-react';

interface UserInfo {
  name: string;
  roles: string[];
  oid: string;
}

export default function EpisodesPage() {
  const { apiCall } = useApi();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
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
            <Skeleton className="h-10 w-32" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Episodes</h1>
          <p className="text-muted-foreground">Manage and analyze your data episodes</p>
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
        <h1 className="text-3xl font-bold tracking-tight">Episodes</h1>
        <p className="text-muted-foreground">Manage and analyze your data episodes</p>
      </motion.div>

      {/* User info card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Information
            </CardTitle>
            <CardDescription>
              Your current session details and permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Name</h3>
              <p className="text-sm text-muted-foreground">{userInfo?.name}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Roles</h3>
              <div className="flex flex-wrap gap-2">
                {userInfo?.roles && userInfo.roles.length > 0 ? (
                  userInfo.roles.map((role, index) => (
                    <Badge key={index} variant="secondary">
                      {role}
                    </Badge>
                  ))
                ) : (
                  <Badge variant="outline">No roles assigned</Badge>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">User ID</h3>
              <p className="text-sm text-muted-foreground font-mono">{userInfo?.oid}</p>
            </div>

            <div className="pt-4">
              <Button className="w-full sm:w-auto">
                <Play className="mr-2 h-4 w-4" />
                Explain Drivers
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Empty state card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-medium">No episodes yet</h3>
                <p className="text-muted-foreground">
                  Your data episodes will appear here once you start creating them.
                </p>
              </div>
              <Button variant="outline">
                Create First Episode
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
