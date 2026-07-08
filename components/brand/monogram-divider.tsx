import { Monogram } from "@/components/brand/logo";

/**
 * MonogramDivider – a quiet section break: the Quint monogram centred between
 * two hairlines. Inherits color from the surrounding text, so it works on both
 * light and inverted (verdant) sections. Decorative only.
 */
export function MonogramDivider({
  className = "",
  tone = "default",
}: {
  className?: string;
  /** "inverted" tints the rules + mark for dark backgrounds. */
  tone?: "default" | "inverted";
}) {
  const rule =
    tone === "inverted"
      ? "bg-[color:var(--color-stardust)]/20"
      : "bg-[color:var(--color-rule)]";
  const mark =
    tone === "inverted"
      ? "text-[color:var(--color-stardust)]/70"
      : "text-[color:var(--color-aerial)]";

  return (
    <div
      className={`mx-auto flex max-w-[var(--container-content)] items-center gap-6 px-6 md:px-10 ${className}`}
      aria-hidden="true"
    >
      <span className={`h-px flex-1 ${rule}`} />
      <Monogram className={`h-5 w-5 shrink-0 ${mark}`} />
      <span className={`h-px flex-1 ${rule}`} />
    </div>
  );
}
