import { FadeUp } from "@/components/motion/fade-up";

const credentials = [
  { value: "IFRA", label: "Compliant Oils", sub: "International Fragrance Assoc." },
  { value: "70 → 90%", label: "Concentration", sub: "Versus 1–3% for ultrasonic" },
  { value: "< 18 dB", label: "Near Silent", sub: "Safe for bedrooms" },
  { value: "Two yrs", label: "Device Lifespan", sub: "Refill oil approx. 45–60 days" },
];

export function TrustRow() {
  return (
    <section className="border-y border-[color:var(--color-rule)] bg-[color:var(--color-white)] py-24">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <FadeUp>
          <div className="mb-14 flex items-center justify-center gap-4 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
            <span className="h-px w-16 bg-[color:var(--color-rule)]" />
            <span>What you are buying</span>
            <span className="h-px w-16 bg-[color:var(--color-rule)]" />
          </div>
        </FadeUp>

        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {credentials.map((c, i) => (
            <FadeUp key={c.label} delay={i * 0.06}>
              <div className="flex flex-col items-center gap-3 text-center">
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-3xl)",
                    lineHeight: 1,
                    letterSpacing: "-0.022em",
                  }}
                >
                  {c.value}
                </span>
                <span className="text-[0.68rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  {c.label}
                </span>
                <span className="text-[0.62rem] tracking-[0.04em] text-[color:var(--color-charcoal-soft)]/70">
                  {c.sub}
                </span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
