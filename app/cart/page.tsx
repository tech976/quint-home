import { FadeUp } from "@/components/motion/fade-up";
import { Monogram } from "@/components/brand/logo";

export default function CartPage() {
  return (
    <div className="mx-auto flex max-w-[var(--container-content)] flex-col items-center px-6 py-[var(--spacing-section)] text-center md:px-10">
      <FadeUp>
        <p className="font-eyebrow"><Monogram className="mr-1.5 inline-block h-[0.9em] w-[0.9em] align-[-0.12em]" />Bag</p>
        <h1
          className="mt-7 max-w-[18ch]"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--text-4xl)",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
          }}
        >
          Your bag is currently empty.
        </h1>
        <p className="mt-8 max-w-[44ch] text-[var(--text-base)] leading-[1.75] text-[color:var(--color-charcoal-soft)]">
          Cart and checkout will be wired to Shopify in the next phase.
        </p>
      </FadeUp>
    </div>
  );
}
