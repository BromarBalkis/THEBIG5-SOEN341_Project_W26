import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // ⚠️ DISABLED - Allow all routes
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/recipes/:path*',
    '/meal-planner/:path*',
    '/grocery-list/:path*',
    '/login',
    '/register',
  ],
}