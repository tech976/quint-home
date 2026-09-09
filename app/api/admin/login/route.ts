import crypto from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { OAUTH_STATE_COOKIE, REQUIRED_SCOPES, apiKey, oauthConfigured, shopDomain } from "@/lib/shopify/oauth";

export const dynamic = "force-dynamic";

/**
 * Starts the staff sign-in. Same OAuth dance the one-time install uses, but it
 * returns to /api/admin/callback, which issues a session cookie instead of
 * printing a token.
 */
export async function GET(request: NextRequest) {
  if (!oauthConfigured()) {
    return NextResponse.redirect(new URL("/admin/login?error=config", request.url), 303);
  }

  const state = crypto.randomBytes(16).toString("hex");
  (await cookies()).set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 600,
  });

  const origin = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
  const authorize = new URL(`https://${shopDomain()}/admin/oauth/authorize`);
  authorize.searchParams.set("client_id", apiKey() as string);
  authorize.searchParams.set("scope", REQUIRED_SCOPES);
  authorize.searchParams.set("redirect_uri", `${origin}/api/admin/callback`);
  authorize.searchParams.set("state", state);

  return NextResponse.redirect(authorize.toString(), 302);
}
