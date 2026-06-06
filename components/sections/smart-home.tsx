import { FadeUp } from "@/components/motion/fade-up";

const integrations = [
  { name: "Companion App", note: "iOS · Android" },
  { name: "Bluetooth", note: "Pair once" },
  { name: "Schedules", note: "Morning · Evening" },
  { name: "Intensity", note: "Set & forget" },
];

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
            <span>§ Set Once</span>
            <span className="h-px w-12 bg-[color:var(--color-stardust)]/25" />
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2
            className="mx-auto mt-12 max-w-[22ch] text-balance"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-4xl)",
              lineHeight: 1.04,
              letterSpacing: "-0.022em",
              fontWeight: 400,
              color: "var(--color-stardust)",
            }}
          >
            Run it from your phone.
            <br />
            <em className="not-italic text-[color:var(--color-aerial-soft)]">
              Set it once and forget it.
            </em>
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p
            className="mx-auto mt-10 max-w-[54ch] text-[var(--text-base)] leading-[1.85]"
            style={{ color: "rgba(238, 228, 216, 0.92)" }}
          >
            Pair the diffuser over Bluetooth, then set a morning and an evening
            schedule in the app. It runs on its own from there. Nothing to
            light, nothing to top up with water, nothing to remember.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mt-20 grid grid-cols-2 gap-y-10 border-t border-[color:var(--color-stardust)]/15 pt-12 md:grid-cols-4">
            {integrations.map((i) => (
              <div key={i.name} className="flex flex-col items-center gap-2">
                <span className="text-[0.86rem] uppercase tracking-[0.18em] text-[color:var(--color-stardust)]/90">
                  {i.name}
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)]/45">
                  {i.note}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
