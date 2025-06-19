import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // In real app, this would check Supabase auth and user role
    // For demo, we'll allow access to login page but protect upload
    if (request.nextUrl.pathname === "/admin/upload") {
      // Mock auth check - in real app would verify JWT token
      const isAuthenticated = request.cookies.get("admin-session")

      if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}
