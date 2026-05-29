import Link from "next/link";
import Image from "next/image";
import { oils } from "@/lib/data/oils";
import { FadeUp } from "@/components/motion/fade-up";
import { SectionHeader } from "@/components/ui/section-header";
import { formatINR } from "@/lib/utils";

export function ScentLibrary() {
  return (
    <section className="bg-[color:var(--color-ivory)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <SectionHeader
          chapter="The Library"
          chapterTitle="9 Signatures"
          headline={
            <>
              Nine compositions,
              <br />
              <em className="not-italic text-[color:var(--color-aerial-deep)]">two of them
              hotel-credentialled.</em>
            </>
          }
          meta={
            <>
              Each scent is built like fine perfumery —
              <br />
              top, heart, base. 70–90% concentrate.
              <br />
              The room is the canvas.
            </>
          }
        />

        <div className="mt-20 grid gap-px overflow-hidden bg-[color:var(--color-rule)] sm:grid-cols-2 lg:grid-cols-3">
          {oils.map((o, i) => {
            // Every other tile is a photographic plate; rest are colored swatches.
            const photographic = i % 2 === 0;
            const tileBg = photographic
              ? { backgroundColor: "var(--color-stardust-soft)" }
              : { backgroundColor: o.swatch, color: o.textColor };
            const fg = photographic
              ? "text-[color:var(--color-stardust)]"
              : "";

            return (
              <FadeUp key={o.slug} delay={i * 0.04} className="contents">
                <Link
                  href={`/shop/${o.slug}`}
                  className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden p-7 transition-[padding] duration-700"
                  style={tileBg}
                >
                  {photographic && (
                    <>
                      <Image
                        src={o.image}
                        alt={`${o.name} — bottle study`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
                      <span className="rounded-full border border-current px-3 py-1 text-[0.54rem]">
                        Hotel Credential
                      </span>
                    )}
                  </div>

                  {/* Center / bottom name (centered on swatch, anchored to bottom on photographic) */}
                  <div className={`relative ${photographic ? "mt-auto" : "my-auto"}`}>
                    <h3
                      className={`text-balance transition-transform duration-700 ease-[var(--ease-quint)] group-hover:-translate-y-1 ${fg}`}
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-3xl)",
                        lineHeight: 1,
                        letterSpacing: "-0.022em",
                        fontWeight: 400,
                      }}
                    >
                      {o.name}
                    </h3>
                    <p className={`mt-4 max-w-[28ch] text-[0.84rem] leading-[1.55] opacity-80 ${fg}`}>
                      {o.tagline}
                    </p>

                    {/* Bottom row sits right after name on photographic tiles */}
                    <div className={`mt-5 flex items-end justify-between gap-4 opacity-80 ${fg}`}>
                      <span className="text-[0.62rem] uppercase tracking-[0.28em]">
                        {o.notes.heart[0]} · {o.notes.base[0]}
                      </span>
                      <span className="text-[0.78rem] tabular-nums">
                        {formatINR(o.priceINR)}
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
