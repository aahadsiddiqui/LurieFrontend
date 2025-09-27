'use client';

import { usePathname } from 'next/navigation';
import { HealthcareDashboard } from '@/components/layout/HealthcareDashboard';
import { HealthcareSidebar } from '@/components/layout/HealthcareSidebar';
import { WorkflowBuilderInterface } from '@/components/layout/WorkflowBuilderInterface';
import { CreateInterface } from '@/components/layout/CreateInterface';
import { AgentsInterface } from '@/components/layout/AgentsInterface';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Mock user info for demo purposes
  const mockUserInfo = {
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@lurie.org',
    avatar: undefined
  };

  const handleSignOut = () => {
    console.log('Sign out clicked');
    // In a real app, this would handle sign out
  };

  // For chat page, render the chat interface with sidebar
  if (pathname === '/chat') {
    return (
      <div className="min-h-screen bg-gray-50">
        <HealthcareSidebar userInfo={mockUserInfo} onSignOut={handleSignOut} />
        <div className="lg:pl-80">
          {children}
        </div>
      </div>
    );
  }

  // For clinical assistant page, render the clinical interface with sidebar
  if (pathname === '/agents/clinical') {
    return (
      <div className="min-h-screen bg-gray-50">
        <HealthcareSidebar userInfo={mockUserInfo} onSignOut={handleSignOut} />
        <div className="lg:pl-80">
          {children}
        </div>
      </div>
    );
  }

  // For research bot page, render the research interface with sidebar
  if (pathname === '/agents/research') {
    return (
      <div className="min-h-screen bg-gray-50">
        <HealthcareSidebar userInfo={mockUserInfo} onSignOut={handleSignOut} />
        <div className="lg:pl-80">
          {children}
        </div>
      </div>
    );
  }

  // For diagnostic helper page, render the diagnostic interface with sidebar
  if (pathname === '/agents/diagnostic') {
    return (
      <div className="min-h-screen bg-gray-50">
        <HealthcareSidebar userInfo={mockUserInfo} onSignOut={handleSignOut} />
        <div className="lg:pl-80">
          {children}
        </div>
      </div>
    );
  }

  // For chat pages, render the chat interfaces with sidebar
  if (pathname.startsWith('/chats/')) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HealthcareSidebar userInfo={mockUserInfo} onSignOut={handleSignOut} />
        <div className="lg:pl-80">
          {children}
        </div>
      </div>
    );
  }

  // For documents and notebooks, render the interfaces with sidebar
  if (pathname === '/documents' || pathname === '/notebooks') {
    return (
      <div className="min-h-screen bg-gray-50">
        <HealthcareSidebar userInfo={mockUserInfo} onSignOut={handleSignOut} />
        <div className="lg:pl-80">
          {children}
        </div>
      </div>
    );
  }

  // For notebooks page, render the workflow builder interface with sidebar
  if (pathname === '/notebooks') {
    return (
      <div className="min-h-screen bg-gray-50">
        <HealthcareSidebar userInfo={mockUserInfo} onSignOut={handleSignOut} />
        <div className="lg:pl-80">
          {children}
        </div>
      </div>
    );
  }

  // For create page, render the create interface with sidebar
  if (pathname === '/create') {
    return (
      <div className="min-h-screen bg-gray-50">
        <HealthcareSidebar userInfo={mockUserInfo} onSignOut={handleSignOut} />
        <div className="lg:pl-80">
          {children}
        </div>
      </div>
    );
  }

  // For agents page, render the agents interface with sidebar
  if (pathname === '/agents') {
    return (
      <div className="min-h-screen bg-gray-50">
        <HealthcareSidebar userInfo={mockUserInfo} onSignOut={handleSignOut} />
        <div className="lg:pl-80">
          {children}
        </div>
      </div>
    );
  }

  // For all other pages, render the search dashboard
  return (
    <HealthcareDashboard 
      userInfo={mockUserInfo} 
      onSignOut={handleSignOut}
    />
  );
}
