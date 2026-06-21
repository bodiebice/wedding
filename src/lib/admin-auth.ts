import { createHmac, timingSafeEqual } from "crypto";

import { env } from "~/env";

export const ADMIN_SESSION_COOKIE = "wedding_admin_session";
const SESSION_SALT = "wedding-admin-session-v1";

export function isAdminConfigured(): boolean {
  return Boolean(env.ADMIN_PASSWORD);
}

function getExpectedSessionToken(): string | null {
  if (!env.ADMIN_PASSWORD) return null;
  return createHmac("sha256", env.ADMIN_PASSWORD)
    .update(SESSION_SALT)
    .digest("hex");
}

export function verifyAdminPassword(password: string): boolean {
  if (!env.ADMIN_PASSWORD) return false;

  const expected = Buffer.from(env.ADMIN_PASSWORD);
  const actual = Buffer.from(password);

  if (expected.length !== actual.length) return false;

  return timingSafeEqual(expected, actual);
}

export function isValidAdminSession(session: string | undefined): boolean {
  const expected = getExpectedSessionToken();
  if (!expected || !session) return false;

  try {
    return timingSafeEqual(
      Buffer.from(session),
      Buffer.from(expected),
    );
  } catch {
    return false;
  }
}

export function parseSessionCookie(
  cookieHeader: string | null,
): string | undefined {
  if (!cookieHeader) return undefined;

  const pattern = new RegExp(`(?:^|; )${ADMIN_SESSION_COOKIE}=([^;]*)`);
  const match = pattern.exec(cookieHeader);

  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

export function getAdminSessionCookieValue(): string | null {
  return getExpectedSessionToken();
}
