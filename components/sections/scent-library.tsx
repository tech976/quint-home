import Link from "next/link";
import Image from "next/image";
import { oils } from "@/lib/data/oils";
import { FadeUp } from "@/components/motion/fade-up";
import { SectionHeader } from "@/components/ui/section-header";
import { HCarousel } from "@/components/ui/h-carousel";
import { formatINR } from "@/lib/utils";

export function ScentLibrary() {
  return (
    <section className="bg-[color:var(--color-ivory)] pt-[var(--spacing-section-sm)] pb-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <SectionHeader
          chapter="The Library"
          chapterTitle="Signature scents"
          headline={
            <>
              A scent library,
              <br />
              <em className="not-italic text-[color:var(--color-aerial-deep)]">
                made the way perfumers do.
              </em>
            </>
          }
          meta={
            <>
              Top, heart and base notes.
              <br />
              Two you&rsquo;ll recognise from hotel lobbies.
            </>
          }
        />

        <FadeUp>
          <div className="mt-12">
            <HCarousel ariaLabel="Fragrance oils">
              {oils.map((o, i) => {
                // Every tile is a photographic plate (uses the oil's image).
                const photographic = true;
                const tileBg = photographic
                  ? { backgroundColor: "var(--color-stardust-soft)" }
                  : { backgroundColor: o.swatch, color: o.textColor };
                const fg = photographic
                  ? "text-[color:var(--color-stardust)]"
                  : "";

                return (
                  <Link
                    key={o.slug}
                    href={`/shop/${o.slug}`}
                    className="group relative flex aspect-[4/5] w-[72%] shrink-0 snap-start flex-col justify-between overflow-hidden p-5 sm:w-[46%] lg:w-[calc((100%_-_3.5rem)/3)]"
                    style={tileBg}
                  >
                  {photographic && (
                    <>
                      <Image
                        src={o.image}
                        alt={`${o.name} — bottle study`}
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                        className="object-cover transition-transform duration-[1800ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(58,53,50,0.25) 0%, rgba(58,53,50,0.0) 35%, rgba(58,53,50,0.72) 100%)",
                        }}
                      />
                    </>
                  )}

                  {/* Top row */}
                  <div className={`relative flex items-start justify-between text-[0.6rem] uppercase tracking-[0.32em] opacity-80 ${fg}`}>
                    <span>№{String(i + 1).padStart(2, "0")}</span>
                    {o.tier === "hotel-credential" && (
                      <span className="rounded-full border border-current px-2 py-0.5 text-[0.5rem]">
                        Hotel Credential
                      </span>
                    )}
                  </div>

                  {/* Bottom text — name folded into the label group (no large heading) */}
                  <div className={`relative mt-auto ${fg}`}>
                    <h3
                      className="transition-transform duration-700 ease-[var(--ease-quint)] group-hover:-translate-y-0.5"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "0.95rem",
                        lineHeight: 1.15,
                        letterSpacing: "-0.01em",
                        fontWeight: 400,
                      }}
                    >
                      {o.name}
                    </h3>
                    <p className="mt-1.5 max-w-[26ch] text-[0.66rem] leading-[1.4] opacity-75">
                      {o.tagline}
                    </p>
                    <div className="mt-2.5 flex items-end justify-between gap-3 opacity-80">
                      <span className="text-[0.56rem] uppercase tracking-[0.24em]">
                        {o.notes.heart[0]} · {o.notes.base[0]}
                      </span>
                      <span className="text-[0.72rem] tabular-nums">
                        {formatINR(o.priceINR)}
                      </span>
                    </div>
                  </div>
                  </Link>
                );
              })}
            </HCarousel>
          </div>
        </FadeUp>

        {/* Closing links — browse the full range (after the oils) */}
        <FadeUp delay={0.2}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-[color:var(--color-rule)] pt-10">
            <Link
              href="/shop?category=diffusers"
              className="group inline-flex items-center gap-3 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] transition-colors duration-500 hover:text-[color:var(--color-clay)] hover:border-[color:var(--color-clay)]"
            >
              See every diffuser
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/shop?category=oils"
              className="text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] hover:text-[color:var(--color-charcoal)] transition-colors duration-500"
            >
              Or browse the oils →
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
