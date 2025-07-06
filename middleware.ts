import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const maintenanceMode = false
  const pathname = request.nextUrl.pathname

  const isStaticFile = pathname.match(/\.(.*)$/)
  const isPublicAsset = pathname.startsWith("/images") || pathname.startsWith("/icons") || pathname.startsWith("/fonts")
  const isExcluded =
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"

  if (maintenanceMode && !isExcluded && !isStaticFile && !isPublicAsset) {
    return NextResponse.redirect(new URL("/maintenance", request.url))
  }

  return NextResponse.next()
}
