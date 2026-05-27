"use client";

import { useState } from "react";

export default function CopyAddressButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded-full border-2 border-wedding-ink px-4 py-2.5 text-sm font-medium text-wedding-ink transition hover:bg-wedding-cream"
      type="button"
    >
      {copied ? "Copied!" : "Copy Address"}
    </button>
  );
}
