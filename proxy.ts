import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from '@/lib/admin-session'

// Gates the internal ops console. Swap for real multi-user auth (magic link /
// SSO) before more than one ops person needs access — see lib/admin-session.ts.
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin/login') return NextResponse.next()

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value
  const authed = await verifyAdminSessionToken(token)

  if (!authed) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
