import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth';


export default auth((req) => {
  const protectedRoutes = ['/', '/details', '/documents']
  const {pathname} = req.nextUrl;
  
  if(protectedRoutes.includes(pathname) && !req.auth) {
    console.log("Unauthorized access!!");
    
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin))
  }
  if(pathname==='/login' && req.auth) {
    console.log("Already Authorized.");
    
    return NextResponse.redirect(new URL('/', req.nextUrl.origin))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Match all API routes except /api/auth
    '/api/:path*',
    '/',
    '/details',
    '/documents',
    '/login',
    '/((?!/api/auth|_next/static|_next/image|favicon.ico|).*)'
  ]
}





// export function middleware(request: NextRequest) {
//   // Add a new header x-current-path which passes the path to downstream components
//   const headers = new Headers(request.headers);

//   headers.set("x-current-path", request.nextUrl.pathname);
//   return NextResponse.next({ headers });
// }

// // Configure which routes to run middleware on
// export const config = {
//   matcher: [
//     // Match all paths except api routes, static files, etc
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// }
