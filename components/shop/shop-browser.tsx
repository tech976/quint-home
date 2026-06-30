"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Monogram } from "@/components/brand/logo";

/**
 * In-page category navigator. Pick a category and the page jumps straight to
 * that section (the curated Diffusers / Oils grids further down) — no duplicate
 * product grid here. Reed Diffusers & Candles isn't live yet, so it shows a
 * short "coming soon" note instead.
 */

type CategoryKey = "diffusers" | "oils" | "other";

const CATEGORIES: { key: CategoryKey; label: string; target?: string }[] = [
  { key: "diffusers", label: "Diffusers", target: "diffusers" },
  { key: "oils", label: "Fragrance Oils", target: "oils" },
  { key: "other", label: "Reed Diffusers & Candles" },
];

export function ShopBrowser() {
  const [category, setCategory] = useState<CategoryKey>("diffusers");
  const [open, setOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);

  // Close the category menu on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const currentLabel =
    CATEGORIES.find((c) => c.key === category)?.label ?? "Diffusers";

  function choose(c: { key: CategoryKey; target?: string }) {
    setCategory(c.key);
    setOpen(false);
    if (c.target) {
      const id = c.target;
      // Jump to the curated section further down the page.
      requestAnimationFrame(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  return (
    <section
      id="browse"
      className="scroll-mt-24 border-b border-[color:var(--color-rule)] bg-[color:var(--color-white)]"
    >
      <div className="mx-auto max-w-[var(--container-full)] px-6 py-12 md:px-10 md:py-16">
        <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
          Browse by category
        </p>

        {/* Category selector — jumps to the matching section */}
        <div className="mt-7 flex flex-col gap-6 border-b border-[color:var(--color-rule)] pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="relative" ref={ddRef}>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={open}
              className="group inline-flex min-w-[16rem] items-center justify-between gap-6 border-b border-[color:var(--color-charcoal)] pb-2 text-left text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--color-charcoal)] transition-colors duration-300"
            >
              <span className="flex items-center gap-2.5">
                <Monogram
                  className="h-4 w-4 shrink-0 text-[color:var(--color-aerial)]"
                  aria-hidden="true"
                />
                <span>{currentLabel}</span>
              </span>
              <ChevronDown
                className={`h-4 w-4 text-[color:var(--color-charcoal-soft)] transition-transform duration-300 ease-[var(--ease-quint)] ${
                  open ? "rotate-180 text-[color:var(--color-clay)]" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            <ul
              role="listbox"
              className={`absolute left-0 top-full z-30 mt-3 w-[18rem] origin-top overflow-hidden border border-[color:var(--color-rule)] bg-[color:var(--color-white)] shadow-[0_18px_50px_-20px_rgba(58,53,50,0.28)] transition-all duration-300 ease-[var(--ease-quint)] ${
                open
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
            >
              {CATEGORIES.map((c) => {
                const active = category === c.key;
                return (
                  <li key={c.key}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => choose(c)}
                      className={`flex w-[100%] items-center justify-between gap-4 px-5 py-3.5 text-left text-[0.72rem] uppercase tracking-[0.24em] transition-colors duration-200 ${
                        active
                          ? "bg-[color:var(--color-stardust-soft)] text-[color:var(--color-charcoal)]"
                          : "text-[color:var(--color-charcoal-soft)] hover:bg-[color:var(--color-stardust-soft)] hover:text-[color:var(--color-clay)]"
                      }`}
                    >
                      {c.label}
                      <span
                        className={`h-1.5 w-1.5 rounded-full bg-[color:var(--color-clay)] transition-opacity duration-200 ${
                          active ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <p className="max-w-[34ch] text-[0.8rem] leading-[1.6] text-[color:var(--color-charcoal-soft)] lg:text-right">
            Pick a category to jump straight to it.
          </p>
        </div>

        {/* Reed Diffusers & Candles — not live yet */}
        {category === "other" && (
          <div className="mt-10 border-t border-[color:var(--color-rule)] pt-10">
            <p
              className="max-w-[30ch] text-balance"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-2xl)",
                lineHeight: 1.1,
                letterSpacing: "-0.014em",
                fontWeight: 400,
              }}
            >
              Reed diffusers &amp; candles{" "}
              <em className="text-[color:var(--color-aerial-deep)]">
                are coming soon.
              </em>
            </p>
            <p className="mt-3 max-w-[42ch] text-[0.92rem] leading-[1.65] text-[color:var(--color-charcoal-soft)]">
              We&rsquo;re finishing the range. In the meantime, explore the
              diffusers and fragrance oils.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
              <button
                type="button"
                onClick={() => choose(CATEGORIES[0])}
                className="border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.24em] transition-colors duration-300 hover:border-[color:var(--color-clay)] hover:text-[color:var(--color-clay)]"
              >
                View diffusers →
              </button>
              <button
                type="button"
                onClick={() => choose(CATEGORIES[1])}
                className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--color-charcoal-soft)] transition-colors duration-300 hover:text-[color:var(--color-charcoal)]"
              >
                View oils →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
