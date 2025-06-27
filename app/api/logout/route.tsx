import { NextResponse } from "next/server";

export async function GET() {
  const domain = process.env.AUTH0_ISSUER;
  const clientId = process.env.AUTH0_CLIENT_ID;
  const returnTo = "http://localhost:3000";

  const logoutUrl = `${domain}/v2/logout?client_id=${clientId}&returnTo=${encodeURIComponent(returnTo)}`;

  return NextResponse.redirect(logoutUrl);
}
