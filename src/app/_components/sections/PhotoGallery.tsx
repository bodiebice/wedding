"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { compressImageFiles } from "~/lib/compress-image";
import { UploadDropzone } from "~/lib/uploadthing";
import { api } from "~/trpc/react";

type PhotoGalleryProps = {
  compact?: boolean;
  uploadsEnabled?: boolean;
};

export default function PhotoGallery({
  compact = false,
  uploadsEnabled = false,
}: PhotoGalleryProps) {
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
            {uploadsEnabled
              ? "Upload and browse photos from our celebration."
              : "Photo sharing opens closer to the wedding — check back soon!"}
          </p>
          <Link
            href="/photos"
            className="mt-6 inline-flex items-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-wedding-ink shadow-md transition hover:bg-wedding-cream"
          >
            {uploadsEnabled ? "View gallery" : "Learn more"}
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
          {uploadsEnabled
            ? "Upload your favorite moments from our day. Photos are compressed automatically to keep things light."
            : "We're saving a spot for everyone to share photos from the wedding. Check back closer to October 17th!"}
        </p>

        {uploadsEnabled ? (
          <LiveGallery />
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

function LiveGallery() {
  const [uploaderName, setUploaderName] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const utils = api.useUtils();
  const { data: photos, isLoading } = api.photos.list.useQuery();

  return (
    <div className="mt-8 space-y-8">
      <div className="rounded-xl border border-wedding-ink/10 bg-wedding-cream/40 p-5 sm:p-6">
        <label
          htmlFor="uploader-name"
          className="block font-serif text-sm text-wedding-muted"
        >
          Your name (optional)
        </label>
        <input
          id="uploader-name"
          type="text"
          maxLength={80}
          value={uploaderName}
          onChange={(e) => setUploaderName(e.target.value)}
          placeholder="So we know who shared these"
          className="mt-2 w-full rounded-full border-2 border-neutral-200 bg-white px-5 py-2.5 font-serif text-wedding-ink placeholder:text-wedding-muted focus:outline-none focus:ring-2 focus:ring-wedding-green"
        />

        <UploadDropzone
          endpoint="weddingPhoto"
          input={{ uploaderName: uploaderName.trim() || undefined }}
          onBeforeUploadBegin={async (files) => {
            setStatus("Compressing photos…");
            const compressed = await compressImageFiles(files);
            setStatus("Uploading…");
            return compressed;
          }}
          onClientUploadComplete={async () => {
            setStatus("Thanks — your photos are in the gallery!");
            await utils.photos.list.invalidate();
          }}
          onUploadError={(error: Error) => {
            const message = error.message.toLowerCase();
            if (
              message.includes("storage") ||
              message.includes("limit") ||
              message.includes("quota")
            ) {
              setStatus(
                "The gallery is full right now. Please try again later or text us your photos.",
              );
              return;
            }
            setStatus(error.message || "Upload failed. Please try again.");
          }}
          appearance={{
            container:
              "mt-5 border-2 border-dashed border-wedding-ink/20 bg-white ut-uploading:opacity-90",
            uploadIcon: "text-wedding-green",
            label: "font-serif text-wedding-ink",
            allowedContent: "font-serif text-xs text-wedding-muted",
            button:
              "rounded-full bg-wedding-green font-semibold text-white after:bg-wedding-accent ut-ready:bg-wedding-green ut-readying:bg-wedding-green/70 ut-uploading:bg-wedding-green/80",
          }}
          content={{
            label: "Choose photos or drag them here",
            allowedContent: "Images up to 8MB each · up to 12 at a time",
            button({ ready, isUploading }) {
              if (isUploading) return "Uploading…";
              if (ready) return "Upload photos";
              return "Getting ready…";
            },
          }}
        />

        {status ? (
          <p
            className="mt-4 text-center font-serif text-sm text-wedding-muted"
            role="status"
          >
            {status}
          </p>
        ) : null}
      </div>

      <div>
        <h2 className="text-center font-serif text-lg text-wedding-ink">
          Guest gallery
        </h2>

        {isLoading ? (
          <p className="mt-4 text-center font-serif text-sm text-wedding-muted">
            Loading photos…
          </p>
        ) : !photos?.length ? (
          <p className="mt-4 text-center font-serif text-sm text-wedding-muted">
            No photos yet — be the first to share one!
          </p>
        ) : (
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
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
        )}
      </div>
    </div>
  );
}
