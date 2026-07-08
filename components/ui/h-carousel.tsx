"use client";

import { useRef, type ReactNode } from "react";

/**
 * HCarousel – a single-line horizontal, snap-scrolling carousel with arrows.
 * Children are the cards (each should be `shrink-0 snap-start` with a fixed
 * width). Scrollbar is hidden; arrows show on large screens, swipe on touch.
 */
export function HCarousel({
  children,
  ariaLabel,
  arrowTop = "top-1/2",
}: {
  children: ReactNode;
  ariaLabel?: string;
  /** Vertical position of the arrows (Tailwind top-* class). */
  arrowTop?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollByView = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const arrowBase =
    "absolute z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--color-rule)] bg-[color:var(--color-white)] text-[color:var(--color-charcoal)] shadow-[0_12px_32px_-14px_rgba(58,53,50,0.45)] transition-colors duration-300 hover:text-[color:var(--color-clay)] lg:flex";

  return (
    <div className="relative">
      <div
        ref={ref}
        aria-label={ariaLabel}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3 md:gap-7 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => scrollByView(-1)}
        aria-label="Previous"
        className={`${arrowBase} left-2 ${arrowTop}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => scrollByView(1)}
        aria-label="Next"
        className={`${arrowBase} right-2 ${arrowTop}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
