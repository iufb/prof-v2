import { routing } from "@/src/shared/config/routing";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

// Locale middleware setup
const intlMiddleware = createMiddleware(routing);

// Authentication and redirection middleware
function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  const locale = pathname.split("/")[1];

  if (pathname.startsWith(`/${locale}`)) {
    if (token && pathname === `/${locale}/login`) {
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }
    if (!token && pathname !== `/${locale}/login`) {
      return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }
  }

  // If no redirect is needed, allow the request to proceed
  return NextResponse.next();
}

export function middleware(req: NextRequest) {
  // Apply the authentication middleware first
  const authResponse = authMiddleware(req);
  if (authResponse && authResponse.status !== 200) {
    // If authMiddleware returns a response (redirect), return it
    return authResponse;
  }

  // Then apply the locale middleware
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/", // Root
    "/(ru|kz)", // Locales
    "/(ru|kz)/:path*", // All paths under a locale
  ],
};
