import { type Metadata } from "next";

import RsvpForm from "~/app/rsvp/_components/RsvpForm";
import { HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
  title: "RSVP | Bodie & Abby's Wedding",
  description: "Respond to your invitation — October 17th, 2026.",
};

export default function RsvpPage() {
  return (
    <HydrateClient>
      <main className="min-h-screen">
        <div className="relative mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#b54714] font-bold">
              RSVP
            </p>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ring-1 ring-white/20 bg-white/5">
              <span className="font-[var(--font-serif)] text-xl">B + A</span>
            </div>
            <h1 className="text-4xl sm:text-5xl tracking-tight text-white font-[var(--font-serif)]">
              We hope you can join us
            </h1>
            <p className="mt-3 text-neutral-400">
              October 17th, 2026 · Sacred Heart Catholic Church, Waseca, MN
            </p>
          </div>

          <RsvpForm />

          <p className="mt-12 text-center text-sm text-neutral-500">
            Questions?{" "}
            <a
              href="mailto:bodieandabbybice@gmail.com"
              className="text-[#30703d] hover:text-[#2a5f35]"
            >
              bodieandabbybice@gmail.com
            </a>
          </p>
        </div>
      </main>
    </HydrateClient>
  );
}
