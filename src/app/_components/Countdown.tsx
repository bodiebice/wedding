"use client";

import { useEffect, useState } from "react";

function getTimeParts(target: Date) {
  const diff = target.getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  const days = Math.floor(clamped / (1000 * 60 * 60 * 24));
  const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((clamped / (1000 * 60)) % 60);
  return { days, hours, minutes };
}

export default function Countdown({ dateISO }: { dateISO: string }) {
  const target = new Date(dateISO);
  const [t, setT] = useState(() => getTimeParts(target));

  useEffect(() => {
    const id = setInterval(() => setT(getTimeParts(target)), 60_000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="mt-6 flex items-center justify-center gap-4 text-center">
      <div className="min-w-20 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
        <div className="text-2xl font-[var(--font-serif)]">{t.days}</div>
        <div className="text-xs text-neutral-300">days</div>
      </div>
      <div className="min-w-20 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
        <div className="text-2xl font-[var(--font-serif)]">{t.hours}</div>
        <div className="text-xs text-neutral-300">hours</div>
      </div>
      <div className="min-w-20 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
        <div className="text-2xl font-[var(--font-serif)]">{t.minutes}</div>
        <div className="text-xs text-neutral-300">mins</div>
      </div>
    </div>
  );
}


