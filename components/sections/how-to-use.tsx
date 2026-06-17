import Image from "next/image";
import { FadeUp } from "@/components/motion/fade-up";
import { SectionHeader } from "@/components/ui/section-header";

/**
 * How it works — the five-step ritual from the brief's "How to Use —
 * Electronic Diffuser", as an editorial numbered layout.
 */
const steps = [
  {
    n: "01",
    title: "Fill the reservoir",
    body: "Add your chosen Quint Home fragrance oil. No water, no dilution — just the oil.",
  },
  {
    n: "02",
    title: "Connect the app",
    body: "Pair the diffuser with the companion app once. Physical controls sit on the device too.",
  },
  {
    n: "03",
    title: "Set your schedule",
    body: "Pick when it runs each day and how strong, in the app.",
  },
  {
    n: "04",
    title: "It runs itself",
    body: "The diffuser follows your schedule automatically. No daily interaction required.",
  },
  {
    n: "05",
    title: "Refill & swap",
    body: "Top up the oil as needed; change scents by season or mood through the app.",
  },
];

export function HowToUse() {
  return (
    <section className="bg-[color:var(--color-white)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <SectionHeader
          chapter="The Ritual"
          chapterTitle="How it works"
          headline={
            <>
              Set it once,
              <br />
              <em className="not-italic text-[color:var(--color-aerial-deep)]">
                then forget about it.
              </em>
            </>
          }
          meta={
            <>
              Five steps,
              <br />
              and the room does the rest.
            </>
          }
        />

        <div className="mt-14 grid items-center gap-12 md:mt-20 lg:grid-cols-2 lg:gap-20">
          {/* The companion app — two phones, layered */}
          <FadeUp>
            <div className="relative mx-auto w-full max-w-[30rem] lg:mx-0">
              <div className="relative aspect-[4/5] w-[72%] overflow-hidden border border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] shadow-[0_30px_70px_-40px_rgba(58,53,50,0.5)]">
                <Image
                  src="/images/ritual/app-home.webp"
                  alt="The Quint Home app — diffuser controls and schedule"
                  fill
                  sizes="(min-width: 1024px) 22rem, 72vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 right-0 aspect-[4/5] w-[48%] overflow-hidden border border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] shadow-[0_30px_70px_-40px_rgba(58,53,50,0.5)] ring-[6px] ring-[color:var(--color-white)]">
                <Image
                  src="/images/ritual/app-timer.webp"
                  alt="The Quint Home app — set a timer and intensity"
                  fill
                  sizes="(min-width: 1024px) 15rem, 48vw"
                  className="object-cover"
                />
              </div>
            </div>
          </FadeUp>

          {/* The five steps */}
          <div className="grid gap-6">
            {steps.map((s, i) => (
              <FadeUp key={s.n} delay={i * 0.05}>
                <div className="flex gap-5 border-t border-[color:var(--color-rule)] pt-5">
                  <span
                    className="shrink-0 tabular-nums text-[color:var(--color-aerial-deep)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-2xl)",
                      lineHeight: 1,
                      fontWeight: 400,
                    }}
                  >
                    {s.n}
                  </span>
                  <div className="min-w-0">
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-xl)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.012em",
                        fontWeight: 400,
                      }}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-[40ch] text-[0.92rem] leading-[1.6] text-[color:var(--color-charcoal-soft)]">
                      {s.body}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
