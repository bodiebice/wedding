"use client";

import { useEffect, useMemo, useState } from "react";

function getTimeParts(target: Date) {
  const diff = target.getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  const days = Math.floor(clamped / (1000 * 60 * 60 * 24));
  const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((clamped / (1000 * 60)) % 60);
  return { days, hours, minutes };
}

export default function Countdown({ dateISO }: { dateISO: string }) {
  const target = useMemo(() => new Date(dateISO), [dateISO]);
  const [t, setT] = useState(() => getTimeParts(target));

  useEffect(() => {
    const id = setInterval(() => setT(getTimeParts(target)), 60_000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-center sm:gap-4">
      <div className="min-w-20 rounded-xl border-2 border-white/40 bg-white/95 px-4 py-3 shadow-md">
        <div className="font-serif text-2xl text-wedding-green">{t.days}</div>
        <div className="text-xs text-wedding-muted">days</div>
      </div>
      <div className="min-w-20 rounded-xl border-2 border-white/40 bg-white/95 px-4 py-3 shadow-md">
        <div className="font-serif text-2xl text-wedding-green">{t.hours}</div>
        <div className="text-xs text-wedding-muted">hours</div>
      </div>
      <div className="min-w-20 rounded-xl border-2 border-white/40 bg-white/95 px-4 py-3 shadow-md">
        <div className="font-serif text-2xl text-wedding-green">{t.minutes}</div>
        <div className="text-xs text-wedding-muted">mins</div>
      </div>
    </div>
  );
}
