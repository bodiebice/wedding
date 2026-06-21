import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ADMIN_SESSION_COOKIE,
  isValidAdminSession,
} from "~/lib/admin-auth";

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isValidAdminSession(session)) {
    redirect("/admin/login?next=/admin/rsvp");
  }

  return children;
}
