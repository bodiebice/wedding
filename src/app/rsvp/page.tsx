import { type Metadata } from "next";

import RsvpForm from "~/app/rsvp/_components/RsvpForm";
import { HydrateClient } from "~/trpc/server";
import WeddingDetailsGrid from "../_components/sections/WeddingDetailsGrid";

export const metadata: Metadata = {
  title: "RSVP | Bodie & Abby's Wedding",
  description: "Respond to your invitation — October 17th, 2026.",
};

export default function RsvpPage() {
  return (
    <HydrateClient>
      <main className="min-h-screen">
        <div className="relative mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-wedding-accent">
              RSVP
            </p>
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white bg-white/10 font-serif text-2xl text-white backdrop-blur-sm">
              B + A
            </div>
            <h1 className="font-script text-4xl leading-tight text-white sm:text-5xl sm:leading-tight">
              We hope you can join us
            </h1>
            <p className="mt-4 font-serif text-lg text-wedding-cream/90">
              October 17th, 2026
            </p>
            <p className="mt-1 font-serif text-wedding-cream/80">
              Sacred Heart Catholic Church, Waseca, MN
            </p>
            <p className="mt-4 font-serif text-sm text-wedding-cream/75">
              RSVPs are closed, Please reach out to Abby or Bodie directly if you have any questions about your RSVP.
            </p>
          </div>

          {/* <RsvpForm /> */}

          <p className="mt-12 text-center text-sm text-white/80">
            Questions?{" "}
            <a
              href="mailto:bodieandabbybice@gmail.com"
              className="font-medium text-wedding-accent transition hover:text-wedding-accent-hover"
            >
              bodieandabbybice@gmail.com
            </a>
          </p>
        </div>
      </main>
    </HydrateClient>
  );
}
