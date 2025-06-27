import { NextResponse } from "next/server";
// Used for simulation; for production, use a separate backend service.
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Not available in production" },
      { status: 403 }
    );
  }
  const rolePermissions = {
    "/admin": ["admin"],
    "/admin/settings": ["admin"],
    "/dashboard": ["admin", "user"],
    "/profile": ["admin", "user"],
  };

  return NextResponse.json(rolePermissions);
}
