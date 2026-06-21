import CalendarDownload from "../CalendarDownload";
import Countdown from "../Countdown";
import CopyAddressButton from "../CopyAddressButton";
import { weddingVenue } from "~/lib/wedding-details";

export default function WhenWhereSection() {
  return (
    <section id="when" className="scroll-mt-20">
      <div className="text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-wedding-accent">
          When &amp; Where
        </p>
        <h2 className="font-script text-4xl text-white sm:text-5xl">
          Save the Date
        </h2>
      </div>

      <div className="mx-auto mt-10 max-w-lg rounded-2xl border-2 border-wedding-ink/10 bg-white p-8 text-wedding-ink shadow-xl">
        <div className="text-center font-serif text-3xl text-wedding-ink">
          {weddingVenue.dateLabel}
        </div>
        <p className="mt-2 text-center text-base text-wedding-muted">
          {weddingVenue.timeLabel}
        </p>
        <p className="mt-4 text-center font-serif text-base leading-relaxed text-wedding-ink">
          {weddingVenue.name}
          <br />
          {weddingVenue.addressLines.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={weddingVenue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-wedding-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-wedding-green-hover"
          >
            Open in Maps
          </a>
          <CopyAddressButton text={weddingVenue.fullAddress} />
        </div>
      </div>

      <Countdown dateISO={weddingVenue.dateISO} />

      <div className="mx-auto mt-12 max-w-4xl rounded-2xl border-2 border-wedding-ink/10 bg-white p-8 text-wedding-ink shadow-xl">
        <h3 className="mb-8 text-center font-serif text-2xl font-semibold text-wedding-ink">
          Add to Your Calendar
        </h3>
        <CalendarDownload />
      </div>
    </section>
  );
}
