import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function withAuth(
  request: NextRequest,
  requiredRole: 'admin' | 'user' = 'user'
) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized - No token' },
      { status: 401 }
    );
  }

  if (requiredRole === 'admin' && token.role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden - Admin access required' },
      { status: 403 }
    );
  }

  return null; // Continue with the request
}

export function createAuthHandler(
  handler: (req: NextRequest, context?: any) => Promise<NextResponse>,
  requiredRole: 'admin' | 'user' = 'admin'
) {
  return async (req: NextRequest, context?: any) => {
    const authError = await withAuth(req, requiredRole);
    if (authError) {
      return authError;
    }
    return handler(req, context);
  };
}
