import { NextResponse, type NextRequest } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  getAdminSessionCookieValue,
  isAdminConfigured,
  verifyAdminPassword,
} from "~/lib/admin-auth";

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin access is not configured." },
      { status: 503 },
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const sessionValue = getAdminSessionCookieValue();
  if (!sessionValue) {
    return NextResponse.json(
      { error: "Admin access is not configured." },
      { status: 503 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, sessionValue, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
