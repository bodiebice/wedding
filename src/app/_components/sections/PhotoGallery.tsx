"use client";

import Link from "next/link";

type PhotoGalleryProps = {
  compact?: boolean;
  uploadEndpoint?: string;
};

export default function PhotoGallery({
  compact = false,
  uploadEndpoint = process.env.NEXT_PUBLIC_PHOTO_UPLOAD_URL,
}: PhotoGalleryProps) {
  const isConnected = Boolean(uploadEndpoint);

  if (compact) {
    return (
      <section id="photos" className="scroll-mt-20">
        <div className="text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-wedding-accent">
            Wedding Photos
          </p>
          <h2 className="font-script text-4xl text-white sm:text-5xl">
            Share the moments
          </h2>
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border-2 border-dashed border-white/40 bg-white/10 p-8 text-center backdrop-blur-sm">
          <p className="font-serif text-white/90">
            {isConnected
              ? "Upload and browse photos from our celebration."
              : "Photo sharing is coming soon — check back after the wedding!"}
          </p>
          <Link
            href="/photos"
            className="mt-6 inline-flex items-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-wedding-ink shadow-md transition hover:bg-wedding-cream"
          >
            {isConnected ? "View gallery" : "Learn more"}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl">
      <div className="rounded-2xl border-2 border-wedding-ink/10 bg-white p-8 text-wedding-ink shadow-xl sm:p-10">
        <h1 className="text-center font-script text-4xl text-wedding-ink sm:text-5xl">
          Wedding Photos
        </h1>
        <p className="mt-4 text-center font-serif text-wedding-muted">
          {isConnected
            ? "Upload your favorite moments from our day."
            : "We're setting up a place for everyone to share photos from the wedding. Check back soon!"}
        </p>

        {isConnected ? (
          <div className="mt-8 rounded-xl border border-wedding-ink/10 bg-wedding-cream/40 p-6 text-center">
            <p className="font-serif text-sm text-wedding-muted">
              Connected to{" "}
              <span className="font-medium text-wedding-ink">
                {uploadEndpoint}
              </span>
            </p>
            <button
              type="button"
              className="mt-4 inline-flex items-center rounded-full bg-wedding-green px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-wedding-green-hover"
              disabled
            >
              Upload photos (coming soon)
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl border-2 border-dashed border-wedding-ink/15 bg-wedding-cream/30"
                aria-hidden
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
