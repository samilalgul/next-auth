import { NextResponse } from "next/server";
// Used for simulation; for production, use a separate backend service.
export async function GET() {
  const rolePermissions = {
    "/admin": ["admin"],
    "/admin/settings": ["admin"],
    "/dashboard": ["admin", "user"],
    "/profile": ["admin", "user"],
  };

  return NextResponse.json(rolePermissions);
}
