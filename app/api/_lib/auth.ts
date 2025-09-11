import { jwtVerify, createRemoteJWKSet } from 'jose';

const JWKS = createRemoteJWKSet(
  new URL(`https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_TENANT_ID}/discovery/v2.0/keys`)
);

export interface AuthResult {
  roles: string[];
  name: string;
  oid: string;
}

export async function verifyToken(token: string): Promise<AuthResult> {
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_TENANT_ID}/v2.0`,
      audience: process.env.AZURE_API_CLIENT_ID,
    });

    const roles = (payload.roles as string[]) || [];
    const name = (payload.name as string) || (payload.preferred_username as string) || 'Unknown User';
    const oid = (payload.oid as string) || '';

    return { roles, name, oid };
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new Error('Invalid token');
  }
}

export function getBearerToken(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}
