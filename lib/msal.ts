import { Configuration, PublicClientApplication } from '@azure/msal-browser';

const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID!,
    authority: process.env.NEXT_PUBLIC_AZURE_AUTHORITY!,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
  scopes: ['openid', 'profile', process.env.NEXT_PUBLIC_AZURE_API_SCOPE!],
};

export const tokenRequest = {
  scopes: [process.env.NEXT_PUBLIC_AZURE_API_SCOPE!],
};
