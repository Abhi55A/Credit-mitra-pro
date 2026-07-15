import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const admin = request.cookies.get("admin");

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !admin
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};