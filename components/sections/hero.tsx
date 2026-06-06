import Image from "next/image";
import Link from "next/link";
import { FadeUp, RevealLines } from "@/components/motion/fade-up";

/**
 * Home Hero — editorial masthead matched to the PDP design language.
 * Type column on the left, a compact image collage on the right, with a
 * hairline metadata strip beneath. Reads as the opening spread of an issue.
 */
export function Hero() {
  return (
    <section className="border-b border-[color:var(--color-rule)] bg-[color:var(--color-white)] pt-8 md:pt-10">
      {/* === Editorial split === */}
      <div className="mx-auto grid max-w-[var(--container-full)] items-center gap-10 px-6 pb-10 md:grid-cols-12 md:gap-12 md:px-10 md:pb-14">
        {/* Type column */}
        <div className="md:col-span-7">
          <FadeUp>
            <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              Waterless Home Fragrance · Mumbai
            </p>
          </FadeUp>

          <div className="mt-6">
            <RevealLines
              lines={["Air,", "Elevated."]}
              delayStart={0.4}
              className="block text-[color:var(--color-charcoal)]"
              lineStyle={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-5xl)",
                lineHeight: 0.98,
                letterSpacing: "-0.024em",
                fontWeight: 400,
              }}
            />
          </div>

          <FadeUp delay={0.08}>
            <p
              className="mt-6 max-w-[30ch] text-balance"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-xl)",
                lineHeight: 1.22,
                letterSpacing: "-0.012em",
                fontStyle: "italic",
                color: "var(--color-aerial-deep)",
              }}
            >
              You spend years on how a home looks and almost no thought on how it
              smells. This is for the part you breathe.
            </p>
          </FadeUp>

          <FadeUp delay={0.14}>
            <p className="mt-5 max-w-[46ch] text-[0.95rem] leading-[1.75] text-[color:var(--color-charcoal-soft)]">
              Waterless diffusers and concentrated oils, blended at 70–90%
              concentration. App-controlled, silent, and made to sit on the
              shelf — not hidden in a corner.
            </p>
          </FadeUp>

          {/* CTAs */}
          <FadeUp delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-3">
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

        {/* Image collage — compact */}
        <div className="md:col-span-5">
          <FadeUp delay={0.06}>
            <div className="grid grid-cols-2 gap-2.5 md:gap-3">
              <figure className="col-span-2">
                <div className="relative aspect-[16/9] overflow-hidden bg-[color:var(--color-stardust-soft)]">
                  <Image
                    src="/images/vibe/vibe-05.jpg"
                    alt="Golden hour wildflowers"
                    fill
                    priority
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: "center 38%" }}
                  />
                </div>
              </figure>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-stardust-soft)]">
                  <Image
                    src="/images/diffusers/a326-gold/01.png"
                    alt="A Quint Home diffuser on a sideboard"
                    fill
                    sizes="(min-width: 768px) 15vw, 50vw"
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
                    sizes="(min-width: 768px) 15vw, 50vw"
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
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4 text-[0.6rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
          <span>Displayed, not hidden</span>
          <span className="hidden md:inline">Waterless · Silent</span>
          <span className="hidden md:inline">App-controlled</span>
          <span className="hidden md:inline">IFRA-compliant · 70–90%</span>
          <span>Made in India</span>
        </div>
      </div>
    </section>
  );
}
