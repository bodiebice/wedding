import { type Metadata } from "next";
import { Suspense } from "react";

import AdminLoginForm from "./_components/AdminLoginForm";
import { env } from "~/env";

export const metadata: Metadata = {
  title: "Admin Sign In | Bodie & Abby's Wedding",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-md">
        <div className="rounded-[2rem] border-2 border-wedding-ink/10 bg-white p-8 text-wedding-ink shadow-xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-wedding-accent">
            Private
          </p>
          <h1 className="mt-2 font-script text-4xl text-wedding-ink">
            Admin sign in
          </h1>
          <p className="mt-3 font-serif text-sm text-wedding-muted">
            RSVP dashboard for Bodie &amp; Abby only.
          </p>

          <div className="mt-8">
            <Suspense fallback={<p className="text-sm text-wedding-muted">Loading…</p>}>
              <AdminLoginForm isConfigured={Boolean(env.ADMIN_PASSWORD)} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
