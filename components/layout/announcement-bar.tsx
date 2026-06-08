export function AnnouncementBar() {
  return (
    <div className="border-b border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] text-[color:var(--color-charcoal-soft)]">
      <div className="mx-auto flex max-w-[var(--container-full)] items-center justify-between gap-6 px-6 py-2.5 text-[0.68rem] uppercase tracking-[0.18em] md:px-10">
        <span className="hidden sm:inline">Launching Mumbai · 2026</span>
        <span className="text-center">
          Complimentary shipping on orders over ₹3,000
        </span>
        <span className="hidden sm:inline">English · ₹ INR</span>
      </div>
    </div>
  );
}
