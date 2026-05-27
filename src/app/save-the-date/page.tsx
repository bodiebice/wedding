import { HydrateClient } from "~/trpc/server";
import CalendarDownload from "../_components/CalendarDownload";
import Countdown from "../_components/Countdown";
import CopyAddressButton from "../_components/CopyAddressButton";

export default async function SaveTheDate() {
  return (
    <HydrateClient>
      <main className="min-h-screen">
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-wedding-accent">
              Save the date
            </p>

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white bg-white/10 font-serif text-2xl text-white backdrop-blur-sm">
              B + A
            </div>
            <div className="font-script text-5xl leading-tight text-white sm:text-6xl sm:leading-tight">
              Bodie and Abby
            </div>
            <p className="mt-3 font-serif text-lg text-wedding-cream/90">
              are getting married!
            </p>

            <div className="mx-auto mt-10 max-w-lg rounded-2xl border-2 border-wedding-ink/10 bg-white p-8 text-wedding-ink shadow-xl">
              <div className="font-serif text-3xl text-wedding-ink">
                October 17th, 2026
              </div>
              <p className="mt-2 text-base text-wedding-muted">
                Saturday at 2:00 PM
              </p>
              <p className="mt-4 font-serif text-base leading-relaxed text-wedding-ink">
                Sacred Heart Catholic Church
                <br />
                111 Fourth St NW
                <br />
                Waseca, Minnesota, 56093
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://maps.apple.com/?q=Sacred+Heart+Catholic+Church+Waseca+MN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-wedding-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-wedding-green-hover"
                >
                  Open in Maps
                </a>
                <CopyAddressButton text="Sacred Heart Catholic Church, 111 Fourth St NW, Waseca, Minnesota, 56093" />
              </div>
            </div>

            <Countdown dateISO="2026-10-17T14:00:00-05:00" />
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-wedding-ink/10 bg-white p-8 text-wedding-ink shadow-xl">
            <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-wedding-ink">
              Add to Your Calendar
            </h2>
            <CalendarDownload />
          </div>
        </div>

        <div className="border-t border-white/20 py-12">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="font-serif text-lg font-medium text-white">
              We can&apos;t wait to celebrate with you!
            </p>
            <p className="mt-2 text-sm text-white/80">
              Questions? Contact us at{" "}
              <a
                href="mailto:bodieandabbybice@gmail.com"
                className="font-medium text-wedding-accent transition hover:text-wedding-accent-hover"
              >
                bodieandabbybice@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
