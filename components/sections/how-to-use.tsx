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
              Fill it, set it,
              <br />
              <em className="not-italic text-[color:var(--color-aerial-deep)]">
                and leave it alone.
              </em>
            </>
          }
          meta={
            <>
              Five steps from oil
              <br />
              to a room that runs on schedule.
            </>
          }
        />

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5 md:mt-20">
          {steps.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.06}>
              <div className="border-t border-[color:var(--color-charcoal)] pt-5">
                <span
                  className="block tabular-nums text-[color:var(--color-aerial-deep)]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-3xl)",
                    lineHeight: 1,
                    fontWeight: 400,
                  }}
                >
                  {s.n}
                </span>
                <h3
                  className="mt-5"
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
                <p className="mt-3 text-[0.9rem] leading-[1.65] text-[color:var(--color-charcoal-soft)]">
                  {s.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
