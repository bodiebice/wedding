import Link from "next/link";

export default function QuickActions() {
  return (
    <section className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      <Link
        href="/rsvp"
        className="inline-flex items-center rounded-full bg-wedding-accent px-7 py-3 font-semibold text-white shadow-md transition hover:bg-wedding-accent-hover"
      >
        RSVP
      </Link>
      <a
        href="#registry"
        className="inline-flex items-center rounded-full bg-white px-7 py-3 font-semibold text-wedding-ink shadow-md transition hover:bg-wedding-cream"
      >
        Registry
      </a>
      <a
        href="#when"
        className="inline-flex items-center rounded-full border-2 border-white/60 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
      >
        Add to Calendar
      </a>
    </section>
  );
}
