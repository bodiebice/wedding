export default async function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#b54714]/80">Our story</p>
          <h1 className="mt-2 text-5xl tracking-tight font-[var(--font-serif)]">Bodie & Abby</h1>
          <p className="mt-3 text-neutral-400 max-w-2xl mx-auto">Two lives, one adventure. Here’s a glimpse into our journey together — from the first hello to a lifetime of tomorrows.</p>
        </header>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5">
            <div className="aspect-[16/9] bg-neutral-800"></div>
          </div>
          <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5">
            <div className="aspect-[3/4] bg-neutral-800"></div>
          </div>
          <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5">
            <div className="aspect-[3/4] bg-neutral-800"></div>
          </div>
          <div className="col-span-2 rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5">
            <div className="aspect-[16/9] bg-neutral-800"></div>
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
