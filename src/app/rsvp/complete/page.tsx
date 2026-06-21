import { type Metadata } from "next";
import WeddingDetailsGrid from "../../_components/sections/WeddingDetailsGrid";

export const metadata: Metadata = {
  title: "RSVP Complete | Bodie & Abby's Wedding",
  description: "Thank you for your RSVP — details for our wedding day.",
};

export default function RsvpCompletePage() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-center font-script text-4xl text-white sm:text-5xl">
          RSVP Complete
        </h1>
        <p className="mt-4 text-center font-serif text-white/85">
          Thank you — here are the details for our wedding day.
        </p>

        <div className="mt-12">
          <WeddingDetailsGrid />
        </div>

        <p className="mt-12 text-center font-serif text-sm text-white/85">
          Thank you again — we can&apos;t wait to celebrate with you.
        </p>
      </div>
    </main>
  );
}
