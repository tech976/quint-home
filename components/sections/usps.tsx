import { FadeUp } from "@/components/motion/fade-up";
import { SectionHeader } from "@/components/ui/section-header";

/**
 * USPs — the brand's unique selling points, from the brief. Sits between the
 * smart-home (green) section and the product showcase.
 */
const usps = [
  {
    n: "01",
    lead: "Waterless cold-air nebulization",
    body: "Technically superior to standard ultrasonic diffusers — no water dilution, richer scent, and larger room coverage.",
  },
  {
    n: "02",
    lead: "App-controlled and smart-home integrated",
    body: "Works with Apple Home, Amazon Alexa and Google Home. Set your schedule once and forget it.",
  },
  {
    n: "03",
    lead: "Luxury hotel scents, now for the home",
    body: "No other Indian brand offers this. IFRA-compliant, 70–90% concentrated oils, blended top, heart and base — not a synthetic air freshener.",
  },
  {
    n: "04",
    lead: "A decor object, not an appliance",
    body: "A sculptural form designed to sit on your shelf with poise and flair.",
  },
];

export function USPs() {
  return (
    <section className="border-y border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <SectionHeader
          chapter="The Difference"
          chapterTitle="Why Quint"
          headline={
            <>
              Not like the diffuser
              <br />
              <em className="not-italic text-[color:var(--color-aerial-deep)]">
                you already know.
              </em>
            </>
          }
          meta={
            <>
              Four things that set it apart
              <br />
              from everything else on the shelf.
            </>
          }
        />

        <FadeUp delay={0.06}>
          <ul className="mt-12 grid grid-cols-1 border-l border-t border-[color:var(--color-rule)] md:mt-16 md:grid-cols-2">
            {usps.map((u) => (
              <li
                key={u.n}
                className="group flex min-w-0 gap-5 border-b border-r border-[color:var(--color-rule)] bg-[color:var(--color-white)] p-7 transition-colors duration-500 hover:bg-[color:var(--color-ivory)] md:p-10"
              >
                <span
                  className="shrink-0 tabular-nums text-[color:var(--color-clay)]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-2xl)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {u.n}
                </span>
                <div className="min-w-0">
                  <p
                    className="text-[color:var(--color-charcoal)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-xl)",
                      lineHeight: 1.2,
                      letterSpacing: "-0.012em",
                    }}
                  >
                    {u.lead}
                  </p>
                  <p className="mt-3 max-w-[44ch] text-[0.92rem] leading-[1.65] text-[color:var(--color-charcoal-soft)]">
                    {u.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
