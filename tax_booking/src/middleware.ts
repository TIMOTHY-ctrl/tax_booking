import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const isApiRoute = req.nextUrl.pathname.startsWith('/api');
  const isAdminRoute = req.nextUrl.pathname.startsWith('/dashboard');
  const isAdminUser = token?.role === 'admin';

  console.log('DEBUG: Middleware executing for path:', req.nextUrl.pathname);
  console.log('DEBUG: Token exists:', !!token);
  console.log('DEBUG: User role:', token?.role);
  console.log('DEBUG: Is authenticated:', isAuthenticated);
  console.log('DEBUG: Is admin route:', isAdminRoute);
  console.log('DEBUG: Is admin user:', isAdminUser);

  // Redirect unauthenticated users to login
  if (!isAuthenticated) {
    console.log('DEBUG: Redirecting unauthenticated user to /login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Protect admin routes
  if (isAdminRoute && !isAdminUser) {
    console.log('DEBUG: Non-admin user accessing admin route, redirecting to home');
    return NextResponse.redirect(new URL('/', req.url));
  }

  console.log('DEBUG: Middleware allowing request to proceed');
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/admin/:path*',
    '/forms/:path*',
    '/tables/:path*'
  ]
};