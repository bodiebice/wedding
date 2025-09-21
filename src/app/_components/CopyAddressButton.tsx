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
      className="rounded-lg ring-1 ring-white/15 px-4 py-2 text-sm hover:bg-white/5"
      type="button"
    >
      {copied ? "Copied!" : "Copy Address"}
    </button>
  );
}


