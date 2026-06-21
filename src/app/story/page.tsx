import { type Metadata } from "next";
import Link from "next/link";
import SiteFooter from "../_components/SiteFooter";
import SiteNav from "../_components/SiteNav";
import OurStoryWrapped from "../_components/sections/OurStoryWrapped";
import { storyStatsExtended } from "~/lib/story-stats";

export const metadata: Metadata = {
  title: "Our Story | Bodie & Abby's Wedding",
  description: "The story of Bodie and Abby — wrapped in love.",
};

export default function StoryPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <header className="text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-wedding-accent">
              Our Story
            </p>
            <h1 className="font-script text-5xl text-white sm:text-6xl">
              Bodie &amp; Abby
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-serif text-lg text-wedding-cream/90">
              A few of our favorite chapters — more to come at the wedding.
            </p>
          </header>

          <div className="mt-12">
            <OurStoryWrapped
              stats={storyStatsExtended}
              showFullStoryLink={false}
              showHeader={false}
            />
          </div>

          <p className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-wedding-ink shadow-md transition hover:bg-wedding-cream"
            >
              Back to home
            </Link>
          </p>

          <SiteFooter />
        </div>
      </main>
    </>
  );
}
