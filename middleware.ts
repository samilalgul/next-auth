import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getRolePermissions } from "./lib/services/roleService";

// Access control map
const accessControlMap: Record<string, string[]> = {
  "/admin": ["admin"],
  "/admin/settings": ["admin"],
  "/dashboard": ["admin", "user"],
  "/profile": ["admin", "user"],
};

function hasAccess(pathname: string, role: string | undefined): boolean {
  for (const path in accessControlMap) {
    if (pathname.startsWith(path)) {
      const allowedRoles = accessControlMap[path];
      return allowedRoles.includes(role || "");
    }
  }
  return true; // default public
}

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  // prevent unnecesarry login when  authenticated user exists
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // /login and /api/auth are public so should be reachable for anyone
  const isPublicPath =
    pathname === "/login" || pathname.startsWith("/api/auth") || pathname.startsWith("/api/rolePermission");
  if (isPublicPath) {
    return NextResponse.next();
  }
  // if non-authenticated user try to reach except of public path redirect to login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const rolePermissions = await getRolePermissions();
  const allowedRoles = rolePermissions[pathname];
  if (allowedRoles && !allowedRoles.includes(token?.role ?? "")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
