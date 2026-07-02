"use client";

import { useState } from "react";
import { Monogram } from "@/components/brand/logo";

/**
 * Slim category bar. Pick a category and the page jumps to that section (the
 * curated grids below) — no duplicate product grid, no wasted space. Reed
 * Diffusers & Candles isn't live yet, so it reveals a short note inline.
 */

type CategoryKey = "diffusers" | "oils" | "other";

const CATEGORIES: { key: CategoryKey; label: string; target?: string }[] = [
  { key: "diffusers", label: "Diffusers", target: "diffusers" },
  { key: "oils", label: "Fragrance Oils", target: "oils" },
  { key: "other", label: "Reed Diffusers & Candles" },
];

export function ShopBrowser() {
  const [soon, setSoon] = useState(false);

  function go(c: { target?: string }) {
    if (c.target) {
      setSoon(false);
      const el = document.getElementById(c.target);
      if (!el) return;
      // Route through Lenis when active so its internal scroll position stays in
      // sync (a raw scrollIntoView desyncs Lenis and snaps back on next wheel).
      if (window.__lenis) window.__lenis.scrollTo(el);
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setSoon((s) => !s);
    }
  }

  return (
    <section
      id="browse"
      className="scroll-mt-24 border-b border-[color:var(--color-rule)] bg-[color:var(--color-white)]"
    >
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2 py-4">
          <span className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
            <Monogram className="h-3.5 w-3.5 shrink-0 text-[color:var(--color-aerial)]" />
            Browse
          </span>
          <span className="hidden h-3 w-px bg-[color:var(--color-rule)] sm:block" />
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => go(c)}
              className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-charcoal)] transition-colors duration-300 hover:text-[color:var(--color-clay)]"
            >
              {c.label}
            </button>
          ))}
        </div>

        {soon && (
          <p className="max-w-[52ch] pb-4 text-[0.82rem] leading-[1.6] text-[color:var(--color-charcoal-soft)]">
            Reed diffusers &amp; candles are{" "}
            <span className="text-[color:var(--color-aerial-deep)]">
              coming soon
            </span>{" "}
            — meanwhile, browse the diffusers and fragrance oils below.
          </p>
        )}
      </div>
    </section>
  );
}
