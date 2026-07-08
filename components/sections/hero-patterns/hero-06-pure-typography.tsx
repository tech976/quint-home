import Link from "next/link";
import { Monogram } from "@/components/brand/logo";
import { RevealLines } from "@/components/motion/fade-up";

/**
 * Hero 06 – Pure Typography.
 * Hermès / Loewe ultra-minimal. The whole hero is type and silence on stardust-soft.
 * No photography. A whisper of monogram, a single terracotta hairline, generous air.
 */
export function HeroPureTypography() {
  return (
    <section
      className="relative flex w-full flex-col bg-[color:var(--color-stardust-soft)] text-[color:var(--color-charcoal)]"
      style={{ minHeight: "90vh" }}
    >
      {/* Top meta strip – thin, restrained */}
      <header className="mx-auto flex w-full max-w-[var(--container-full)] items-center justify-between px-6 pt-8 md:px-12 md:pt-10">
        <span className="text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
          Volume 01
        </span>
        <Monogram
          className="h-7 w-7 text-[color:var(--color-clay)] opacity-80"
          aria-hidden="true"
        />
        <span className="text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
          The Mumbai Edition
        </span>
      </header>

      {/* Centered, silent stage */}
      <div className="relative mx-auto flex w-full max-w-[78rem] flex-1 flex-col items-center justify-center px-6 py-24 text-center md:py-32">
        {/* Tiny eyebrow */}
        <span
          className="mb-12 text-[0.6rem] uppercase tracking-[0.5em] text-[color:var(--color-charcoal-soft)] animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Quint Home · Est. 2026
        </span>

        {/* The headline – anchored center, massive, calm */}
        <h1>
          <RevealLines
            lines={["Air,", "Elevated."]}
            delayStart={0.35}
            className="block"
            lineStyle={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-display)",
              lineHeight: 0.92,
              letterSpacing: "-0.028em",
              fontWeight: 400,
            }}
          />
        </h1>

        {/* Single terracotta hairline – the only colour gesture */}
        <span
          aria-hidden="true"
          className="mt-14 block h-px w-20 bg-[color:var(--color-clay)] animate-fade-in"
          style={{ animationDelay: "0.95s" }}
        />

        {/* One italic subline – the room you make your home */}
        <p
          className="mt-14 max-w-[42ch] text-[var(--text-lg)] leading-[1.55] text-[color:var(--color-charcoal-soft)] animate-fade-up"
          style={{
            animationDelay: "1.1s",
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
          }}
        >
          Five seconds in a hotel corridor and the room changes character.
          We make that room your home.
        </p>

        {/* CTAs – almost incidental, paired below the silence */}
        <div
          className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 animate-fade-up"
          style={{ animationDelay: "1.3s" }}
        >
          <Link
            href="/shop?category=diffusers"
            className="group inline-flex items-center gap-3 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.34em] text-[color:var(--color-charcoal)] transition-colors duration-500 hover:border-[color:var(--color-clay)] hover:text-[color:var(--color-clay)]"
          >
            Discover the diffuser
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/about"
            className="text-[0.72rem] uppercase tracking-[0.34em] text-[color:var(--color-charcoal-soft)] transition-colors duration-500 hover:text-[color:var(--color-charcoal)]"
          >
            The founder&rsquo;s letter
          </Link>
        </div>
      </div>

      {/* Footer hairline */}
      <footer className="mx-auto w-full max-w-[var(--container-full)] border-t border-[color:var(--color-rule)] px-6 md:px-12">
        <div className="flex items-center justify-between py-5 text-[0.58rem] uppercase tracking-[0.4em] text-[color:var(--color-charcoal-soft)]">
          <span>Mumbai · India</span>
          <span className="hidden md:inline">An Editorial in Air</span>
          <span>No. 06 · Pure Type</span>
        </div>
      </footer>
    </section>
  );
}
