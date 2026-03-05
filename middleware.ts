import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all dashboard routes except login
  if (
    pathname.startsWith('/dashboard') &&
    !pathname.startsWith('/dashboard/login')
  ) {
    const auth = request.cookies.get('dashboard_auth');
    if (!auth || auth.value !== 'true') {
      return NextResponse.redirect(new URL('/dashboard/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
