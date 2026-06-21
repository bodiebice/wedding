"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  isRoute?: boolean;
};

const homeNavItems: NavItem[] = [
  { label: "Story", href: "#story" },
  { label: "Details", href: "#details" },
  { label: "RSVP", href: "/rsvp", isRoute: true },
  { label: "FAQ", href: "#faq" },
  { label: "Photos", href: "/photos", isRoute: true },
];

export default function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const items = isHome
    ? homeNavItems
    : [
        { label: "Home", href: "/", isRoute: true },
        { label: "Story", href: "/#story", isRoute: true },
        { label: "RSVP", href: "/rsvp", isRoute: true },
        { label: "Photos", href: "/photos", isRoute: true },
      ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/15 bg-wedding-green/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="shrink-0 font-script text-xl text-white sm:text-2xl"
        >
          B &amp; A
        </Link>
        <ul className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
          {items.map((item) => (
            <li key={item.label}>
              {item.isRoute ? (
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-1.5 text-xs font-medium text-white/90 transition hover:bg-white/15 hover:text-white sm:px-4 sm:text-sm"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="rounded-full px-3 py-1.5 text-xs font-medium text-white/90 transition hover:bg-white/15 hover:text-white sm:px-4 sm:text-sm"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
