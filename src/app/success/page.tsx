import Link from "next/link";

export default function Success() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="rounded-2xl bg-white p-8 ring-1 ring-neutral-200 shadow-sm">

          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#30703d] mb-6 shadow-sm">
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

          {/* Success Message */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Thank You!
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We've received your information and will keep you updated about our wedding plans. 
            We can't wait to celebrate with you!
          </p>

          {/* Wedding Details Reminder */}
          <div className="rounded-2xl bg-white p-6 ring-1 ring-neutral-200 shadow-sm mb-6">
            <h2 className="font-medium text-gray-900 mb-2">Don't forget to save the date:</h2>
            <p className="text-xl font-semibold text-gray-900">October 17th, 2026</p>
            <p className="text-sm text-gray-600 mt-1">Saturday at 2:00 PM</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/save-the-date"
              className="block w-full px-6 py-3 bg-[#30703d] text-white font-semibold rounded-xl hover:bg-[#2a5f35] transition-colors shadow-sm hover:shadow-md"
            >
              Back to Save the Date
            </Link>
            <Link
              href="/save-the-date"
              className="block w-full px-6 py-3 ring-1 ring-inset ring-neutral-200 text-gray-700 font-semibold rounded-xl hover:bg-neutral-50 transition-colors"
            >
              Add to Calendar Again
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <p className="text-sm text-gray-600">
              Questions? Contact us at{" "}
              <a
                href="mailto:bodieandabbybice@gmail.com"
                className="text-[#30703d] hover:text-[#2a5f35] font-medium"
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
