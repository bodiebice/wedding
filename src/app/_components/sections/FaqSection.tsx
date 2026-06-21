"use client";

import { useState } from "react";
import { faqItems } from "~/lib/faq";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20">
      <div className="text-center">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-wedding-accent">
          FAQ
        </p>
        <h2 className="font-script text-4xl text-white sm:text-5xl">
          Good to know
        </h2>
      </div>

      <div className="mx-auto mt-8 max-w-3xl space-y-3">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-2xl border-2 border-wedding-ink/10 bg-white text-wedding-ink shadow-xl"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-serif font-medium transition hover:bg-wedding-cream/50"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span
                  className={`shrink-0 text-wedding-accent transition-transform ${isOpen ? "rotate-45" : ""}`}
                  aria-hidden
                >
                  +
                </span>
              </button>
              {isOpen ? (
                <div className="border-t border-wedding-ink/10 px-6 py-4 font-serif text-sm leading-relaxed text-wedding-muted">
                  {item.answer}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
