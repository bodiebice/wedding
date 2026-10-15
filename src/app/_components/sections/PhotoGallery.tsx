"use client";

import Image from "next/image";
import Link from "next/link";

import { api } from "~/trpc/react";

type PhotoGalleryProps = {
  compact?: boolean;
};

export default function PhotoGallery({ compact = false }: PhotoGalleryProps) {
  if (compact) {
    return (
      <section id="photos" className="scroll-mt-20">
        <div className="text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-wedding-accent">
            Wedding Photos
          </p>
          <h2 className="font-script text-4xl text-white sm:text-5xl">
            Relive the day
          </h2>
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border-2 border-dashed border-white/40 bg-white/10 p-8 text-center backdrop-blur-sm">
          <p className="font-serif text-white/90">
            Browse photos from our celebration — a keepsake for friends and
            family.
          </p>
          <Link
            href="/photos"
            className="mt-6 inline-flex items-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-wedding-ink shadow-md transition hover:bg-wedding-cream"
          >
            View gallery
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl">
      <div className="rounded-2xl border-2 border-wedding-ink/10 bg-white p-8 text-wedding-ink shadow-xl sm:p-10">
        <h1 className="text-center font-script text-4xl text-wedding-ink sm:text-5xl">
          Wedding Memories
        </h1>
        <p className="mt-4 text-center font-serif text-wedding-muted">
          Scroll through photos from our day — shared with love for friends and
          family.
        </p>

        <MemoriesGallery />
      </div>
    </section>
  );
}

function MemoriesGallery() {
  const { data: photos, isLoading } = api.photos.list.useQuery();

  if (isLoading) {
    return (
      <p className="mt-8 text-center font-serif text-sm text-wedding-muted">
        Loading photos…
      </p>
    );
  }

  if (!photos?.length) {
    return (
      <div className="mt-8 rounded-xl border border-dashed border-wedding-ink/15 bg-wedding-cream/30 p-8 text-center">
        <p className="font-serif text-sm text-wedding-muted">
          Photos from the wedding will appear here soon.
        </p>
      </div>
    );
  }

  return (
    <ul className="mt-8 grid max-h-[70vh] grid-cols-2 gap-3 overflow-y-auto overscroll-contain pr-1 sm:grid-cols-3 sm:gap-4">
      {photos.map((photo) => (
        <li key={photo.id}>
          <a
            href={photo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden rounded-xl bg-wedding-cream/50"
          >
            <Image
              src={photo.url}
              alt={
                photo.uploaderName
                  ? `Photo from ${photo.uploaderName}`
                  : "Wedding guest photo"
              }
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            {photo.uploaderName ? (
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-2 pb-2 pt-6 font-serif text-xs text-white opacity-0 transition group-hover:opacity-100">
                {photo.uploaderName}
              </span>
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
