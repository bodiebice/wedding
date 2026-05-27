import Link from "next/link";

export default function Success() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="mx-auto max-w-md text-center">
        <div className="rounded-2xl border-2 border-wedding-ink/10 bg-white p-8 text-wedding-ink shadow-xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-wedding-green shadow-sm">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="mb-4 font-serif text-2xl font-semibold text-wedding-ink">
            Thank You!
          </h1>
          <p className="mb-6 leading-relaxed text-wedding-muted">
            We&apos;ve received your information and will keep you updated about
            our wedding plans. We can&apos;t wait to celebrate with you!
          </p>

          <div className="mb-6 rounded-2xl border border-neutral-200 bg-wedding-cream/40 p-6">
            <h2 className="mb-2 font-medium text-wedding-ink">
              Don&apos;t forget to save the date:
            </h2>
            <p className="font-serif text-xl font-semibold text-wedding-ink">
              October 17th, 2026
            </p>
            <p className="mt-1 text-sm text-wedding-muted">Saturday at 2:00 PM</p>
          </div>

          <div className="space-y-3">
            <Link
              href="/save-the-date"
              className="block w-full rounded-full bg-wedding-green px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-wedding-green-hover hover:shadow-md"
            >
              Back to Save the Date
            </Link>
            <Link
              href="/save-the-date"
              className="block w-full rounded-full border-2 border-wedding-ink/15 px-6 py-3 font-semibold text-wedding-ink transition hover:bg-neutral-50"
            >
              Add to Calendar Again
            </Link>
          </div>

          <div className="mt-8 border-t border-neutral-200 pt-6">
            <p className="text-sm text-wedding-muted">
              Questions? Contact us at{" "}
              <a
                href="mailto:bodieandabbybice@gmail.com"
                className="font-medium text-wedding-accent transition hover:text-wedding-accent-hover"
              >
                bodieandabbybice@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
