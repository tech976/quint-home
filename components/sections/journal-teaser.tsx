import Link from "next/link";
import Image from "next/image";
import { journal } from "@/lib/data/journal";
import { FadeUp } from "@/components/motion/fade-up";
import { SectionHeader } from "@/components/ui/section-header";

export function JournalTeaser() {
  return (
    <section className="bg-[color:var(--color-ivory)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <SectionHeader
          chapter="§ Seven"
          chapterTitle="The Journal"
          headline={
            <>
              Writing on scent,
              <br />
              <em className="not-italic text-[color:var(--color-aerial-deep)]">
                the device, and the home.
              </em>
            </>
          }
          meta={
            <>
              Plain notes on how scent works,
              <br />
              and how to live with it. New posts monthly.
            </>
          }
        />

        <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-10">
          {journal.map((p, i) => (
            <FadeUp key={p.slug} delay={i * 0.08}>
              <Link href={`/journal/${p.slug}`} className="group block">
                <div className="relative aspect-[5/6] overflow-hidden bg-[color:var(--color-aerial-soft)]">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute left-5 top-5 text-[0.58rem] uppercase tracking-[0.36em] text-[color:var(--color-stardust)]/85">
                    №{String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <p className="mt-7 text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  {p.eyebrow}
                </p>
                <h3
                  className="mt-3 text-balance transition-colors duration-500 group-hover:text-[color:var(--color-clay)]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-xl)",
                    lineHeight: 1.18,
                    letterSpacing: "-0.008em",
                    fontWeight: 400,
                  }}
                >
                  {p.title}
                </h3>
                <p className="mt-3 max-w-[44ch] text-[0.92rem] leading-[1.7] text-[color:var(--color-charcoal-soft)]">
                  {p.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  <span>{p.readMinutes} min</span>
                  <span className="h-px w-6 bg-[color:var(--color-rule)]" />
                  <span>Read</span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
