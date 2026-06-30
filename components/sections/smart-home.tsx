import { FadeUp } from "@/components/motion/fade-up";
import { Monogram } from "@/components/brand/logo";

// Per the brief: "smart home integrated — Apple Home, Amazon Alexa, Google Home".
const integrations = ["Apple Home", "Amazon Alexa", "Google Home"];

export function SmartHome() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-verdant)] py-[var(--spacing-section)] text-[color:var(--color-stardust)]">
      {/* Atmospheric radial bloom — soft sage light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(119,145,141,0.30) 0%, rgba(41,51,41,0) 55%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(180deg, rgba(41,51,41,0) 0%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-6 text-center md:px-10">
        <FadeUp>
          <div className="mx-auto flex items-center justify-center gap-4 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-stardust)]/65">
            <span className="h-px w-12 bg-[color:var(--color-stardust)]/25" />
            <span className="inline-flex items-center gap-2">
              <Monogram className="h-[0.9em] w-[0.9em]" />
              Five · Controls
            </span>
            <span className="h-px w-12 bg-[color:var(--color-stardust)]/25" />
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2
            className="mx-auto mt-12 max-w-[30ch] text-balance"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-3xl)",
              lineHeight: 1.14,
              letterSpacing: "-0.018em",
              fontWeight: 400,
              color: "var(--color-stardust)",
            }}
          >
            Beautifully designed waterless diffusers, curated scent blends, and
            smart technology that makes exceptional scenting{" "}
            <em className="not-italic text-[color:var(--color-aerial-soft)]">
              effortless.
            </em>
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p
            className="mx-auto mt-8 max-w-[60ch] text-[var(--text-base)] leading-[1.85]"
            style={{ color: "rgba(238, 228, 216, 0.92)" }}
          >
            We make electronic, waterless diffusers that sit at the intersection
            of technology, design, and fragrance. Because a beautifully scented
            room shouldn&rsquo;t require compromise — on aesthetics, on
            performance, or on how it makes you feel.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mt-20 border-t border-[color:var(--color-stardust)]/15 pt-12">
            <p className="mx-auto text-center text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-stardust)]/50">
              Works with
            </p>
            <div className="mx-auto mt-8 grid max-w-[40rem] grid-cols-3 gap-6">
              {integrations.map((name) => (
                <div key={name} className="flex items-center justify-center">
                  <span className="text-[0.86rem] uppercase tracking-[0.18em] text-[color:var(--color-stardust)]/90">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
