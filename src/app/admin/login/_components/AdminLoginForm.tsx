"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type AdminLoginFormProps = {
  isConfigured: boolean;
};

export default function AdminLoginForm({ isConfigured }: AdminLoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isConfigured) {
    return (
      <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Admin access is not configured yet. Set{" "}
        <code className="font-mono">ADMIN_PASSWORD</code> in your environment.
      </p>
    );
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error ?? "Unable to sign in.");
        return;
      }

      const next = searchParams.get("next") ?? "/admin/rsvp";
      router.push(next);
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="admin-password"
          className="mb-2 block text-sm font-medium text-wedding-ink"
        >
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border-2 border-neutral-200 bg-white px-4 py-3 font-serif text-wedding-ink placeholder:text-wedding-muted focus:outline-none focus:ring-2 focus:ring-wedding-green"
          placeholder="Enter admin password"
          required
        />
      </div>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-wedding-green px-6 py-3 font-serif font-semibold text-white transition hover:bg-wedding-green-hover disabled:opacity-50"
      >
        {isSubmitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
