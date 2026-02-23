import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  const userCookie = request.cookies.get('mealmajor_authenticated')
  
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register')
  const isProtectedPage = pathname.startsWith('/dashboard') || 
                          pathname.startsWith('/profile') || 
                          pathname.startsWith('/recipes') || 
                          pathname.startsWith('/meal-planner') || 
                          pathname.startsWith('/grocery-list')
  
  if (isProtectedPage && !userCookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (isAuthPage && userCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
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