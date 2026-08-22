import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin but NOT /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const authCookie = req.cookies.get("admin_auth");

    if (!authCookie || authCookie.value !== "true") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
