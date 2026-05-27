import Image from "next/image";

export default async function Home() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <header className="text-center">
          <h1 className="mt-2 font-script text-5xl leading-tight text-white sm:text-6xl sm:leading-tight">
            Bodie &amp; Abby
          </h1>
          <p className="mt-4 max-w-2xl mx-auto font-serif text-lg text-wedding-cream/90">
            are getting married on October 17th, 2026!
          </p>
        </header>

        <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="relative col-span-2 overflow-hidden rounded-2xl border-2 border-white/30 bg-white shadow-lg">
            <div className="aspect-[16/9]" />
            <Image
              src="/engage 1.JPG"
              alt="Engagement photo 1"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw"
            />
          </div>

          <div className="relative overflow-hidden rounded-2xl border-2 border-white/30 bg-white shadow-lg">
            <div className="aspect-[3/4]" />
            <Image
              src="/engage 2.JPG"
              alt="Engagement photo 2"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          <div className="relative overflow-hidden rounded-2xl border-2 border-white/30 bg-white shadow-lg">
            <div className="aspect-[3/4]" />
            <Image
              src="/engage 3.JPG"
              alt="Engagement photo 3"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          <div className="relative col-span-2 overflow-hidden rounded-2xl border-2 border-white/30 bg-white shadow-lg">
            <div className="aspect-[16/9]" />
            <Image
              src="/engage 4.JPG"
              alt="Engagement photo 4"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw"
            />
          </div>
        </section>

        <section className="mt-16 text-center">
          <a
            href="/savethedate"
            className="inline-flex items-center rounded-full bg-white px-8 py-3.5 font-semibold text-wedding-ink shadow-md transition hover:bg-wedding-cream"
          >
            Wedding Information
          </a>
        </section>

        <footer className="mt-20 border-t border-white/20 pt-8 text-center text-sm text-white/80">
          Questions? Email{" "}
          <a
            className="font-medium text-wedding-accent transition hover:text-wedding-accent-hover"
            href="mailto:bodieandabbybice@gmail.com"
          >
            bodieandabbybice@gmail.com
          </a>
        </footer>
      </div>
    </main>
  );
}
