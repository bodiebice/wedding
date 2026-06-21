"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type StoryStat, storyStats } from "~/lib/story-stats";

const accentClasses: Record<StoryStat["accent"], string> = {
  green:
    "border-2 border-white bg-white text-wedding-ink shadow-xl ring-1 ring-wedding-green-hover/30",
  accent: "bg-wedding-accent text-white shadow-lg",
  cream: "bg-wedding-cream text-wedding-ink shadow-lg",
  ink: "bg-wedding-ink text-white shadow-lg",
};

const headlineClasses: Record<StoryStat["accent"], string> = {
  green: "text-wedding-green",
  accent: "",
  cream: "",
  ink: "",
};

type OurStoryWrappedProps = {
  stats?: StoryStat[];
};

export default function OurStoryWrapped({
  stats = storyStats,
}: OurStoryWrappedProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const updateScrollHints = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateScrollHints();

    const onWheel = (event: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      if (delta === 0) return;

      event.preventDefault();
      el.scrollLeft += delta;
    };

    el.addEventListener("scroll", updateScrollHints, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", updateScrollHints);

    return () => {
      el.removeEventListener("scroll", updateScrollHints);
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", updateScrollHints);
    };
  }, [updateScrollHints, stats.length]);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;

    const card = el.querySelector("article");
    const amount = card
      ? card.getBoundingClientRect().width + 16
      : el.clientWidth * 0.8;

    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || event.button !== 0) return;

    dragState.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: el.scrollLeft,
    };
    el.setPointerCapture(event.pointerId);
    el.classList.add("cursor-grabbing");
    el.classList.remove("cursor-grab");
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !dragState.current.active) return;

    const delta = event.clientX - dragState.current.startX;
    el.scrollLeft = dragState.current.scrollLeft - delta;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !dragState.current.active) return;

    dragState.current.active = false;
    el.releasePointerCapture(event.pointerId);
    el.classList.remove("cursor-grabbing");
    el.classList.add("cursor-grab");
  };

  return (
    <section id="story" className="scroll-mt-20">
      <div className="text-center">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-wedding-accent">
          Our Story
        </p>
        <h2 className="font-script text-4xl text-white sm:text-5xl">
          By the numbers
        </h2>
      </div>

      <div className="relative mt-8">
        {canScrollLeft ? (
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-wedding-green to-transparent sm:w-16"
            aria-hidden
          />
        ) : null}
        {canScrollRight ? (
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-wedding-green to-transparent sm:w-16"
            aria-hidden
          />
        ) : null}

        {canScrollLeft ? (
          <button
            type="button"
            onClick={() => scrollByAmount("left")}
            className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/30 bg-white/95 p-2 text-wedding-ink shadow-md transition hover:bg-white md:inline-flex"
            aria-label="Scroll story cards left"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        ) : null}

        {canScrollRight ? (
          <button
            type="button"
            onClick={() => scrollByAmount("right")}
            className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/30 bg-white/95 p-2 text-wedding-ink shadow-md transition hover:bg-white md:inline-flex"
            aria-label="Scroll story cards right"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        ) : null}

        <div
          ref={scrollerRef}
          className="flex cursor-grab gap-4 overflow-x-auto overscroll-x-contain pb-4 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {stats.map((stat) => (
            <article
              key={stat.headline}
              draggable={false}
              className={`flex min-h-52 w-[min(85vw,280px)] shrink-0 snap-center flex-col justify-end rounded-2xl p-6 select-none sm:min-h-56 sm:w-[300px] lg:w-[340px] ${accentClasses[stat.accent]}`}
            >
              <p
                className={`font-script text-4xl leading-none sm:text-5xl ${headlineClasses[stat.accent]}`}
              >
                {stat.headline}
              </p>
              <p
                className={`mt-3 font-serif text-sm leading-relaxed ${stat.accent === "green" ? "text-wedding-muted" : "opacity-90"}`}
              >
                {stat.subtext}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-2 text-center font-serif text-xs text-white/60 md:hidden">
          Swipe to explore
        </p>
        <p className="mt-2 hidden text-center font-serif text-xs text-white/60 md:block">
          Scroll, drag, or use the arrows to explore
        </p>
      </div>

    </section>
  );
}
