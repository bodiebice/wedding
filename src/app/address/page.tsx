"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function AddressQuickSubmit() {
  const [addressText, setAddressText] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const create = api.guests.addressCreate.useMutation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await create.mutateAsync({ addressText: addressText.trim(), name: name.trim() || undefined });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 text-center">
          <p className="text-lg">Thank you! We’ve got your address.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-[var(--font-serif)]">We Need Your Address!</h1>
          <p className="text-sm text-neutral-400">Bodie and Abby are getting Married!</p>
          <p className="text-sm text-neutral-400">We need your address to send you an invitation.</p>
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (optional)"
          className="w-full rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#30703d]"
        />

        <textarea
          value={addressText}
          onChange={(e) => setAddressText(e.target.value)}
          placeholder={`Street, City, State, ZIP`}
          rows={3}
          className="w-full rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#30703d]"
          required
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-[#30703d] px-6 py-3 font-medium text-white hover:bg-[#2a5f35] transition-colors"
        >
          Submit Address
        </button>
      </form>
    </main>
  );
}
