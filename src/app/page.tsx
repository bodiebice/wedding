import Image from "next/image";
import SiteFooter from "./_components/SiteFooter";
import SiteNav from "./_components/SiteNav";
import FaqSection from "./_components/sections/FaqSection";
import OurStoryWrapped from "./_components/sections/OurStoryWrapped";
import PhotoGallery from "./_components/sections/PhotoGallery";
import QuickActions from "./_components/sections/QuickActions";
import WeddingDetailsGrid from "./_components/sections/WeddingDetailsGrid";
import WhenWhereSection from "./_components/sections/WhenWhereSection";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <header className="text-center">
            <h1 className="mt-2 font-script text-5xl leading-tight text-white sm:text-6xl sm:leading-tight">
              Bodie &amp; Abby
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-serif text-lg text-wedding-cream/90">
              are getting married on October 17th, 2026!
            </p>
          </header>

          <div className="mt-10">
            <QuickActions />
          </div>

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

          <div className="mt-20 space-y-20">
            <OurStoryWrapped />

            <WhenWhereSection />

            <section id="details" className="scroll-mt-20">
              <div className="mb-10 text-center">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-wedding-accent">
                  Wedding Details
                </p>
                <h2 className="font-script text-4xl text-white sm:text-5xl">
                  Everything you need to know
                </h2>
              </div>
              <WeddingDetailsGrid />
            </section>

            <section
              id="rsvp"
              className="scroll-mt-20 rounded-2xl border-2 border-white/30 bg-white/10 px-6 py-10 text-center backdrop-blur-sm sm:px-10"
            >
              <h2 className="font-script text-4xl text-white sm:text-5xl">
                Will you join us?
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-serif text-white/90">
                Please RSVP using the invite code from your invitation so we
                can plan for your party.
              </p>
              <a
                href="/rsvp"
                className="mt-8 inline-flex items-center rounded-full bg-wedding-accent px-8 py-3.5 font-semibold text-white shadow-md transition hover:bg-wedding-accent-hover"
              >
                RSVP Now
              </a>
            </section>

            <FaqSection />

            <PhotoGallery compact />
          </div>

          <SiteFooter />
        </div>
      </main>
    </>
  );
}
