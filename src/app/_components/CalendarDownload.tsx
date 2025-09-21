"use client";

import { useState } from "react";

export default function CalendarDownload() {
  // no local copy state needed

  // Wedding details - you can customize these
  const weddingDate = "20261017T200000Z"; // October 17th, 2026 at 2:00 PM CST (which is 8:00 PM UTC)
  const weddingEndDate = "20261018T040000Z"; // October 17th, 2026 at 10:00 PM CST (which is 4:00 AM UTC on Oct 18th)
  const title = "Bodie and Abby's Wedding";
  const description = "Join us as we celebrate our special day!";
  const location = "Sacred Heart Catholic Church, 111 Fourth St NW, Waseca, Minnesota, 56093";

  // Generate Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${weddingDate}/${weddingEndDate}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

  // Generate Apple Calendar URL (ICS format)
  const generateICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding//Wedding Event//EN
BEGIN:VEVENT
UID:wedding-${Date.now()}bodieandabbybice.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${weddingDate}
DTEND:${weddingEndDate}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'bodie-abby-wedding.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // clipboard actions are handled in dedicated components elsewhere

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Google Calendar */}
        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 shadow-sm hover:shadow-md transition-colors">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-[#30703d] rounded-lg flex items-center justify-center mr-4 shadow-md">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Google Calendar</h3>
          </div>
          <p className="text-gray-600 mb-4">Add to your Google Calendar</p>
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-[#30703d] text-white rounded-lg hover:bg-[#2a5f35] transition-colors font-medium shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
            Add to Google Calendar
          </a>
        </div>

        {/* Apple Calendar */}
        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 shadow-sm hover:shadow-md transition-colors">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-[#b54714] rounded-lg flex items-center justify-center mr-4 shadow-md">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Apple Calendar</h3>
          </div>
          <p className="text-gray-600 mb-4">Download for Apple Calendar</p>
          <button
            onClick={generateICS}
            className="inline-flex items-center px-6 py-3 bg-[#b54714] text-white rounded-lg hover:bg-[#9d3a11] transition-colors font-medium shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
            Download for Apple
          </button>
        </div>
      </div>

      {/* Manual Add Option */}
      <div className="border-t border-white/10 pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Or add manually:</h4>
        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 shadow-sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Date & Time</label>
              <p className="text-sm text-gray-600 font-medium">October 17th, 2026 at 2:00 PM</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Location</label>
              <p className="text-sm text-gray-600">Sacred Heart Catholic Church, 111 Fourth St NW, Waseca, Minnesota</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
