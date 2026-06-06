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
              Nine scents,
              <br />
              <em className="not-italic text-[color:var(--color-aerial-deep)]">nine ways
              a room can feel.</em>
            </>
          }
          meta={
            <>
              Each one is built like a fine perfume,
              <br />
              with top, heart and base notes,
              <br />
              at 70 to 90% concentration.
            </>
          }
        />

        {/* Compact 3×3 grid — every tile is a photographic plate (no flat colour swatches) */}
        <div className="mx-auto mt-12 grid max-w-[58rem] grid-cols-2 gap-px overflow-hidden bg-[color:var(--color-rule)] sm:grid-cols-3">
          {oils.map((o, i) => {
            const photographic = true;
            return (
              <FadeUp key={o.slug} delay={i * 0.03} className="contents">
                <Link
                  href={`/shop/${o.slug}`}
                  className="group relative flex aspect-square flex-col justify-between overflow-hidden p-4"
                  style={
                    photographic
                      ? { backgroundColor: "var(--color-stardust-soft)" }
                      : { backgroundColor: o.swatch, color: o.textColor }
                  }
                >
                  {photographic && (
                    <>
                      <Image
                        src={o.image}
                        alt={`${o.name} — bottle study`}
                        fill
                        sizes="(min-width: 640px) 19rem, 50vw"
                        className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-quint)] group-hover:scale-[1.05]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(58,53,50,0.18) 0%, rgba(58,53,50,0) 40%, rgba(58,53,50,0.72) 100%)",
                        }}
                      />
                    </>
                  )}

                  {/* Top — index + credential mark */}
                  <div
                    className={`relative flex items-start justify-between text-[0.52rem] uppercase tracking-[0.28em] ${
                      photographic ? "text-[color:var(--color-stardust)]" : ""
                    } opacity-80`}
                  >
                    <span className="tabular-nums">
                      №{String(i + 1).padStart(2, "0")}
                    </span>
                    {o.tier === "hotel-credential" && (
                      <span className="rounded-full border border-current px-1.5 py-0.5 text-[0.46rem]">
                        Credential
                      </span>
                    )}
                  </div>

                  {/* Bottom — name + note + price */}
                  <div
                    className={`relative ${
                      photographic ? "" : "mt-auto"
                    }`}
                  >
                    <h3
                      className={`text-balance transition-transform duration-700 ease-[var(--ease-quint)] group-hover:-translate-y-0.5 ${
                        photographic ? "text-[color:var(--color-stardust)]" : ""
                      }`}
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-xl)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.016em",
                        fontWeight: 400,
                      }}
                    >
                      {o.name}
                    </h3>
                    <div
                      className={`mt-2 flex items-end justify-between gap-2 text-[0.56rem] uppercase tracking-[0.2em] ${
                        photographic ? "opacity-85" : "opacity-70"
                      }`}
                    >
                      <span>{o.notes.heart[0]}</span>
                      <span className="tabular-nums tracking-normal text-[0.72rem]">
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
