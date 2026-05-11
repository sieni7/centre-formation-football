import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // refreshing the auth token
  const { data: { user } } = await supabase.auth.getUser()

  const url = request.nextUrl.clone()

  // 1. Protected routes: /dashboard
  if (url.pathname.startsWith('/(dashboard)') && !user) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 2. Role-based redirection (simplistic for now)
  if (user && url.pathname === '/') {
    // We would fetch the role from the profile here
    // For now, redirect to a generic dashboard or player dashboard
    url.pathname = '/PLAYER'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
