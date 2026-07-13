import Link from "next/link";
import Image from "next/image";
import { journal } from "@/lib/data/journal";
import { FadeUp } from "@/components/motion/fade-up";
import { SectionHeader } from "@/components/ui/section-header";

export function JournalTeaser() {
  return (
    <section className="bg-[color:var(--color-ivory)] py-[var(--spacing-section-sm)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <SectionHeader
          chapter="§"
          chapterTitle="The Journal"
          headline={
            <>
              Writing on scent,
              <br />
              <em className="not-italic text-[color:var(--color-aerial-deep)]">
                hotels, and homes.
              </em>
            </>
          }
          meta={
            <>
              Notes on fragrance and the rooms it lives in.
              <br />
              A new piece every month.
            </>
          }
        />

        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {journal.map((p, i) => (
            <FadeUp key={p.slug} delay={i * 0.08}>
              <Link href={`/journal/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--color-aerial-soft)]">
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
                <p className="mt-5 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  {p.eyebrow}
                </p>
                <h3
                  className="mt-2 text-balance transition-colors duration-500 group-hover:text-[color:var(--color-clay)]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-lg)",
                    lineHeight: 1.18,
                    letterSpacing: "-0.008em",
                    fontWeight: 400,
                  }}
                >
                  {p.title}
                </h3>
                <p className="mt-2 max-w-[44ch] text-[0.84rem] leading-[1.6] text-[color:var(--color-charcoal-soft)] line-clamp-2">
                  {p.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  <span>{p.readMinutes} min</span>
                  <span className="h-px w-6 bg-[color:var(--color-rule)]" />
                  <span>Read</span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2}>
          <div className="mt-12 flex justify-center">
            <Link
              href="/journal"
              className="group inline-flex items-center gap-3 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] transition-colors duration-500 hover:border-[color:var(--color-clay)] hover:text-[color:var(--color-clay)]"
            >
              Read more in the Journal
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
