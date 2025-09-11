'use client';

import { useMsal } from '@azure/msal-react';
import { useApi } from '@/hooks/useApi';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  FileText, 
  Settings, 
  LogOut, 
  User,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/ui/utils';

interface UserInfo {
  name: string;
  roles: string[];
}

interface AppShellProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Episodes', href: '/episodes', icon: FileText },
  { name: 'Analyst', href: '/analyst', icon: BarChart3 },
  { name: 'Admin', href: '/admin', icon: Settings, disabled: true },
];

export function AppShell({ children }: AppShellProps) {
  const { instance, accounts } = useMsal();
  const { apiCall } = useApi();
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await apiCall('/api/me');
        setUserInfo(data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      } finally {
        setLoading(false);
      }
    };

    if (accounts.length > 0) {
      fetchUserInfo();
    }
  }, [accounts, apiCall]);

  const handleSignOut = () => {
    instance.logoutRedirect();
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
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r lg:translate-x-0 lg:static lg:inset-0",
          "transform transition-transform duration-200 ease-in-out"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between px-6 border-b">
            <h1 className="text-xl font-semibold">Lurie</h1>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.disabled ? '#' : item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : item.disabled
                      ? "text-muted-foreground cursor-not-allowed"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                  {item.disabled && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Soon
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={userInfo?.name} />
                      <AvatarFallback>
                        {userInfo?.name ? getInitials(userInfo.name) : <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userInfo?.name || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userInfo?.roles?.join(', ') || 'No roles'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
