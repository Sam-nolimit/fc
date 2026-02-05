import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if the route is under (dashboard)
  const isDashboardRoute = /^\/(dashboard|customer|farmers|logistics|orders)/.test(pathname);
  
  if (isDashboardRoute) {
    const token = request.cookies.get('access_token')?.value;
    
    if (!token) {
      // No token, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
