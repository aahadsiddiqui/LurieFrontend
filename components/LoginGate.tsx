'use client';

import { useMsal } from '@azure/msal-react';
import { loginRequest } from '@/lib/msal';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LoginGateProps {
  children: React.ReactNode;
}

export function LoginGate({ children }: LoginGateProps) {
  const { instance, accounts, inProgress } = useMsal();
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Check if Azure is properly configured
    const clientId = process.env.NEXT_PUBLIC_AZURE_CLIENT_ID;
    const tenantId = process.env.NEXT_PUBLIC_AZURE_TENANT_ID;
    
    if (clientId && tenantId && !clientId.includes('your-') && !tenantId.includes('your-')) {
      setIsConfigured(true);
    } else {
      setIsConfigured(false);
    }
  }, []);

  useEffect(() => {
    if (isConfigured && !inProgress && accounts.length === 0) {
      instance.loginRedirect(loginRequest);
    }
  }, [instance, accounts, inProgress, isConfigured]);

  if (inProgress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-4">Azure Configuration Required</h2>
          <p className="text-muted-foreground mb-4">
            Please configure your Azure Entra ID settings in the .env.local file to enable authentication.
          </p>
          <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
            <p className="font-medium mb-2">Required environment variables:</p>
            <ul className="text-left space-y-1">
              <li>• NEXT_PUBLIC_AZURE_TENANT_ID</li>
              <li>• NEXT_PUBLIC_AZURE_CLIENT_ID</li>
              <li>• AZURE_API_CLIENT_ID</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Redirecting to login...</h2>
          <p className="text-muted-foreground">Please wait while we redirect you to Microsoft login.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
