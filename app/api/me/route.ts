import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getBearerToken } from '../_lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = getBearerToken(authHeader);

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const { roles, name, oid } = await verifyToken(token);

    return NextResponse.json({
      ok: true,
      name,
      roles,
      oid,
    });
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }
}
