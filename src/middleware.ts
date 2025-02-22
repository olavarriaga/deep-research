import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const pathname = request.nextUrl.pathname
  
  // Debug logging
  console.log('Current path:', pathname)
  console.log('Has token:', !!token)

  // Define public and auth pages
  const PUBLIC_PAGES = ['/', '/technical-paper', '/presentation']
  const AUTH_PAGES = ['/login', '/signup']

  const isAuthPage = AUTH_PAGES.some(page => pathname.startsWith(page))
  const isPublicPage = PUBLIC_PAGES.some(page => pathname.startsWith(page))

  // Debug logging
  console.log('Is auth page:', isAuthPage)
  console.log('Is public page:', isPublicPage)

  // If on auth page and logged in, redirect to dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If not logged in and not on a public page, redirect to login
  if (!token && !isPublicPage) {
    console.log('Redirecting to login because:', { pathname, token: !!token, isPublicPage })
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Allow access to all other routes
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 