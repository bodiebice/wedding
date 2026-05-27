"use client";

export default function CalendarDownload() {
  const weddingDate = "20261017T200000Z";
  const weddingEndDate = "20261018T040000Z";
  const title = "Bodie and Abby's Wedding";
  const description = "Join us as we celebrate our special day!";
  const location =
    "Sacred Heart Catholic Church, 111 Fourth St NW, Waseca, Minnesota, 56093";

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${weddingDate}/${weddingEndDate}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

  const generateICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding//Wedding Event//EN
BEGIN:VEVENT
UID:wedding-${Date.now()}bodieandabbybice.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${weddingDate}
DTEND:${weddingEndDate}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "bodie-abby-wedding.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-wedding-cream/50 p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-4 flex items-center">
            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-wedding-green shadow-md">
              <svg
                className="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-wedding-ink">
              Google Calendar
            </h3>
          </div>
          <p className="mb-4 text-wedding-muted">Add to your Google Calendar</p>
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-wedding-green px-6 py-3 font-medium text-white shadow-sm transition hover:bg-wedding-green-hover hover:shadow-md"
          >
            <svg
              className="mr-2 h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
            </svg>
            Add to Google Calendar
          </a>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-wedding-cream/50 p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-4 flex items-center">
            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-wedding-accent shadow-md">
              <svg
                className="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-wedding-ink">
              Apple Calendar
            </h3>
          </div>
          <p className="mb-4 text-wedding-muted">Download for Apple Calendar</p>
          <button
            type="button"
            onClick={generateICS}
            className="inline-flex items-center rounded-lg bg-wedding-accent px-6 py-3 font-medium text-white shadow-sm transition hover:bg-wedding-accent-pressed hover:shadow-md"
          >
            <svg
              className="mr-2 h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
            </svg>
            Download for Apple
          </button>
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-6">
        <h4 className="mb-4 text-lg font-semibold text-wedding-ink">
          Or add manually:
        </h4>
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <span className="mb-2 block text-sm font-medium text-wedding-ink">
                Date &amp; Time
              </span>
              <p className="text-sm font-medium text-wedding-muted">
                October 17th, 2026 at 2:00 PM
              </p>
            </div>
            <div>
              <span className="mb-2 block text-sm font-medium text-wedding-ink">
                Location
              </span>
              <p className="text-sm text-wedding-muted">
                Sacred Heart Catholic Church, 111 Fourth St NW, Waseca,
                Minnesota
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
