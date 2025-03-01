import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add a new header x-current-path which passes the path to downstream components
  const headers = new Headers(request.headers);

  headers.set("x-current-path", request.nextUrl.pathname);
  return NextResponse.next({ headers });
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    // Match all paths except api routes, static files, etc
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
