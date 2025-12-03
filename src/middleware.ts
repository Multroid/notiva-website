import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const path = request.nextUrl.pathname

  // Public routes that don't require authentication
  const publicRoutes = [
    '/login',
    '/register',
    '/onboarding',
    '/examples',
    '/pricing',
    '/api/auth',
    '/invitations',
    '/forgot-password',
    '/reset-password',
  ]

  // Marketing pages that should be public
  const publicMarketingPrefixes = [
    '/blog',
    '/help',
    '/compare',
    '/security',
    '/contact',
    '/about',
    '/use-cases',
    '/privacy',
    '/terms',
    '/license',
  ]

  // Check if the path matches any public route
  const isPublicRoute = publicRoutes.some(route => path.startsWith(route))
  const isPublicMarketing = publicMarketingPrefixes.some(prefix => path.startsWith(prefix))
  
  // Homepage is always public
  const isHomepage = path === '/'

  // If accessing public route without session, or if accessing API/payment routes, allow
  if (isPublicRoute || isPublicMarketing || isHomepage || path.startsWith('/api/') || path.startsWith('/payment/')) {
    return NextResponse.next()
  }

  // Require authentication for all other routes
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', path)
    return NextResponse.redirect(loginUrl)
  }

  // Check admin access for /admin/* routes
  if (path.startsWith('/admin')) {
    // Admin check is handled in the admin layout for better UX
    // This is just a basic check - detailed check happens in the layout
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
