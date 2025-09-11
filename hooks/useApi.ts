'use client';

import { useMsal } from '@azure/msal-react';
import { tokenRequest } from '@/lib/msal';
import { useCallback } from 'react';

export function useApi() {
  const { instance, accounts } = useMsal();

  const apiCall = useCallback(async (url: string, options: RequestInit = {}) => {
    if (accounts.length === 0) {
      throw new Error('No user account found');
    }

    try {
      const response = await instance.acquireTokenSilent({
        ...tokenRequest,
        account: accounts[0],
      });

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${response.accessToken}`,
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  }, [instance, accounts]);

  return { apiCall };
}
