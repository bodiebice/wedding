import Image from "next/image";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default async function Home() {
  return (
    
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <header className="text-center">
          <SpeedInsights />
          <p className="text-xs uppercase tracking-[0.2em] text-[#b54714]/80">Our story</p>
          <h1 className="mt-2 text-5xl tracking-tight font-[var(--font-serif)]">Bodie & Abby</h1>
          <p className="mt-3 text-neutral-400 max-w-2xl mx-auto">Two lives, one adventure. Here’s a glimpse into our journey together — from the first hello to a lifetime of tomorrows.</p>
        </header>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative col-span-2 overflow-hidden rounded-2xl ring-1 ring-white/10">
            <div className="aspect-[16/9]"></div>
            <Image
              src="/engage 1.JPG"
              alt="Engagement photo 1"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw"
            />
          </div>

          <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
            <div className="aspect-[3/4]"></div>
            <Image
              src="/engage 2.JPG"
              alt="Engagement photo 2"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
            <div className="aspect-[3/4]"></div>
            <Image
              src="/engage 3.JPG"
              alt="Engagement photo 3"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          <div className="relative col-span-2 overflow-hidden rounded-2xl ring-1 ring-white/10">
            <div className="aspect-[16/9]"></div>
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
          <a href="/savethedate" className="inline-flex items-center px-8 py-3 rounded-xl bg-[#30703d] text-white font-medium hover:bg-[#2a5f35] transition-colors">Save the Date</a>
        </section>

        <footer className="mt-20 border-t border-white/10 pt-8 text-center text-neutral-400 text-sm">
          Questions? Email <a className="text-[#b54714] hover:text-[#a54012]" href="mailto:bodieandabbybice@gmail.com">bodieandabbybice@gmail.com</a>
        </footer>
      </div>
    </main>
  );
}
