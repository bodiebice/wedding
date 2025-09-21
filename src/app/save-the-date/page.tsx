import { api, HydrateClient } from "~/trpc/server";
import AddressCollector from "../_components/AddressCollector";
import CalendarDownload from "../_components/CalendarDownload";
import Countdown from "../_components/Countdown";
import CopyAddressButton from "../_components/CopyAddressButton";

export default async function SaveTheDate() {
  return (
    <HydrateClient>
      <main className="min-h-screen">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="mb-4 text-s uppercase tracking-[0.2em] text-[#b54714] font-bold">Save the date</p>

              {/* Monogram */}
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ring-1 ring-white/20 bg-white/5">
                <span className="font-[var(--font-serif)] text-xl">B + A</span>
              </div>
              <div className="text-5xl sm:text-6xl tracking-tight text-white font-[var(--font-serif)]">Bodie and Abby</div>
              <div className="mt-2 text-lg text-neutral-400">
                are getting married!
              </div>
              
              {/* Details card */}
              <div className="mt-10 rounded-2xl bg-white/5 p-8 ring-1 ring-white/10 shadow-sm">
                <div className="text-3xl text-white font-[var(--font-serif)]">
                  October 17th, 2026
                </div>
                <div className="mt-2 text-base text-neutral-400">
                  Saturday at 2:00 PM
                </div>
                <div className="mt-4 text-base text-neutral-300 leading-relaxed">
                  Sacred Heart Catholic Church<br />
                  111 Fourth St NW<br />
                  Waseca, Minnesota, 56093
                </div>
                <div className="mt-6 flex items-center justify-center gap-4">
                  <a
                    href="https://maps.apple.com/?q=Sacred+Heart+Catholic+Church+Waseca+MN"
                    target="_blank"
                    className="rounded-lg bg-[#30703d] px-4 py-2 text-sm text-white hover:bg-[#2a5f35]"
                  >
                    Open in Maps
                  </a>
                  <CopyAddressButton text="Sacred Heart Catholic Church, 111 Fourth St NW, Waseca, Minnesota, 56093" />
                </div>
              </div>

              <Countdown dateISO="2026-10-17T14:00:00-05:00" />
            </div>
          </div>
        </div>

        {/* Calendar Download Section */}
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-8 ring-1 ring-neutral-200 shadow-sm">
            <h2 className="text-2xl font-semibold text-center text-gray-900 mb-8">
              Add to Your Calendar
            </h2>
            <CalendarDownload />
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-8 ring-1 ring-neutral-200 shadow-sm">
            <h2 className="text-2xl font-semibold text-center text-gray-900">
              Help Us Stay Connected
            </h2>
            <p className="text-center text-gray-500 mt-2">
              Please share your contact information so we can send you updates and invitations.
            </p>
            <AddressCollector />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-200 py-12">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-lg text-gray-900 font-medium">
              We can't wait to celebrate with you!
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Questions? Contact us at <span className="text-[#30703d]">bodieandabbybice@gmail.com</span>
            </p>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}