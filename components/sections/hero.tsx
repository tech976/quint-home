import Image from "next/image";
import Link from "next/link";
import { FadeUp, RevealLines } from "@/components/motion/fade-up";

/**
 * Home Hero — editorial masthead matched to the PDP design language.
 * Top breadcrumb row, eyebrow chapter, big serif headline with italic emphasis,
 * key-facts dl, CTAs, image collage on the right. Bottom hairline strip with
 * full spec metadata. Reads as the opening spread of an issue.
 */
export function Hero() {
  return (
    <section className="border-b border-[color:var(--color-rule)] bg-[color:var(--color-white)] pt-10 md:pt-14">
      {/* === Editorial split === */}
      <div className="mx-auto mt-2 grid max-w-[var(--container-full)] gap-12 px-6 pb-14 md:mt-6 md:grid-cols-12 md:gap-16 md:px-10 md:pb-20">
        {/* Type column — 7 cols */}
        <div className="md:col-span-7">
          <FadeUp>
            <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              Home Fragrance · Mumbai
            </p>
          </FadeUp>

          <div className="mt-8">
            <RevealLines
              lines={["Air,", "Elevated."]}
              delayStart={0.4}
              className="block text-[color:var(--color-charcoal)]"
              lineStyle={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-display)",
                lineHeight: 0.96,
                letterSpacing: "-0.024em",
                fontWeight: 400,
              }}
            />
          </div>

          <FadeUp delay={0.08}>
            <p
              className="mt-8 max-w-[28ch] text-balance"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-2xl)",
                lineHeight: 1.18,
                letterSpacing: "-0.012em",
                fontStyle: "italic",
                color: "var(--color-aerial-deep)",
              }}
            >
              Five seconds in a hotel corridor and the room changes character.
            </p>
          </FadeUp>

          <FadeUp delay={0.14}>
            <p className="mt-8 max-w-[48ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
              Quint Home makes the hotel-grade scenting you remember available
              for the considered Indian home. Waterless, silent, app-controlled
              — and built to be displayed, not hidden.
            </p>
          </FadeUp>

          {/* Key facts dl — PDP-style grid */}
          <FadeUp delay={0.2}>
            <dl className="mt-12 grid grid-cols-2 gap-y-5 border-y border-[color:var(--color-rule)] py-6 text-[0.75rem] md:grid-cols-4">
              <div>
                <dt className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  Designed in
                </dt>
                <dd className="mt-2">Mumbai · 2026</dd>
              </div>
              <div>
                <dt className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  Range
                </dt>
                <dd className="mt-2">4 diffusers · 9 oils</dd>
              </div>
              <div>
                <dt className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  Compliance
                </dt>
                <dd className="mt-2">IFRA · 70–90%</dd>
              </div>
              <div>
                <dt className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  Operation
                </dt>
                <dd className="mt-2">&lt; 18 dB · silent</dd>
              </div>
            </dl>
          </FadeUp>

          {/* CTAs */}
          <FadeUp delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-3">
              <Link
                href="/shop?category=diffusers"
                className="group inline-flex items-center gap-3 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] transition-colors duration-500 hover:text-[color:var(--color-clay)] hover:border-[color:var(--color-clay)]"
              >
                Discover the diffuser
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/about"
                className="text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] hover:text-[color:var(--color-charcoal)] transition-colors duration-500"
              >
                The founder&rsquo;s letter
              </Link>
            </div>
          </FadeUp>
        </div>

        {/* Image collage — 5 cols, vertically anchored top, height matched to type column */}
        <div className="md:col-span-5">
          <FadeUp delay={0.06}>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <figure className="col-span-2">
                <div className="relative aspect-[5/4] overflow-hidden bg-[color:var(--color-stardust-soft)]">
                  <Image
                    src="/images/vibe/vibe-05.jpg"
                    alt="Golden hour wildflowers"
                    fill
                    priority
                    sizes="(min-width: 768px) 38vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: "center 38%" }}
                  />
                </div>
              </figure>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-stardust-soft)]">
                  <Image
                    src="/images/diffusers/monolith/03.png"
                    alt="The Monolith on a sideboard"
                    fill
                    sizes="(min-width: 768px) 19vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </figure>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-stardust-soft)]">
                  <Image
                    src="/images/vibe/vibe-22.jpg"
                    alt="Interior light, late afternoon"
                    fill
                    sizes="(min-width: 768px) 19vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </figure>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* === Bottom hairline metadata strip === */}
      <div className="mx-auto max-w-[var(--container-full)] border-t border-[color:var(--color-rule)] px-6 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5 text-[0.6rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
          <span>Hotel-grade fragrance</span>
          <span className="hidden md:inline">Waterless · Silent</span>
          <span className="hidden md:inline">App-controlled</span>
          <span className="hidden md:inline">IFRA-compliant · 70–90%</span>
          <span>Made in India</span>
        </div>
      </div>
    </section>
  );
}
