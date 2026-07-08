// Editorial marquee – a slow, continuous tagline ribbon between Hero and Brand Statement.
// Quiet by design: small caps, low contrast, single line.

const tokens = [
  "Air Elevated",
  "Mumbai, est. 2026",
  "70–90% concentrate",
  "Waterless · Silent · App-controlled",
  "IFRA-Compliant",
  "Set once, from the app",
];

// Repeat the loop so transform: translateX(-50%) creates seamless cycle.
const SEQUENCE = [...tokens, ...tokens];

export function MarqueeTagline() {
  return (
    <section
      aria-hidden="true"
      className="overflow-hidden border-y border-[color:var(--color-rule)] bg-[color:var(--color-white)] py-5"
    >
      <div className="flex w-max gap-12 animate-marquee whitespace-nowrap px-12 text-[0.7rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)] md:gap-20 md:px-20">
        {SEQUENCE.map((t, i) => (
          <span key={i} className="flex items-center gap-12 md:gap-20">
            {t}
            <span className="block h-[6px] w-[6px] rotate-45 border border-[color:var(--color-charcoal-soft)]/60" />
          </span>
        ))}
      </div>
    </section>
  );
}
