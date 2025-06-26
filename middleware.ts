import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /login and /api/auth are public so should be reachable for anyone
  const isPublicPath =
    pathname === "/login" || pathname.startsWith("/api/auth");

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // if non-authenticated user try to reach except of public path redirect to login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  // prevent login when no needed

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // regular flow
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
