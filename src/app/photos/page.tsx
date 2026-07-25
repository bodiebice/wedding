import { type Metadata } from "next";
import Link from "next/link";
import SiteFooter from "../_components/SiteFooter";
import SiteNav from "../_components/SiteNav";
import PhotoGallery from "../_components/sections/PhotoGallery";
import { arePhotoUploadsEnabled } from "~/lib/photo-uploads";

export const metadata: Metadata = {
  title: "Wedding Photos | Bodie & Abby's Wedding",
  description: "Share and browse photos from Bodie and Abby's wedding.",
};

export default function PhotosPage() {
  const uploadsEnabled = arePhotoUploadsEnabled();

  return (
    <>
      <SiteNav />
      <main className="min-h-screen px-4 py-12 sm:px-6 sm:py-16">
        <PhotoGallery uploadsEnabled={uploadsEnabled} />

        <p className="mx-auto mt-10 max-w-4xl text-center">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-wedding-ink shadow-md transition hover:bg-wedding-cream"
          >
            Back to home
          </Link>
        </p>

        <div className="mx-auto max-w-4xl">
          <SiteFooter />
        </div>
      </main>
    </>
  );
}
