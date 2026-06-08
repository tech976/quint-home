"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

export interface Slide {
  src: string;
  alt: string;
  eyebrow?: string;
  caption?: string;
  aspect?: "portrait" | "square" | "landscape";
}

interface Props {
  slides: Slide[];
  align?: "start" | "center";
  /** width per slide on desktop in px */
  slideWidth?: number;
  /** width per slide on mobile in px */
  slideWidthMobile?: number;
  withPlateNumbers?: boolean;
}

/**
 * Editorial drag-scroll carousel.
 * No dots, no auto-play. Drag, peek, snap. Inline page navigation arrows at bottom-right.
 */
export function EditorialCarousel({
  slides,
  align = "start",
  slideWidth = 380,
  slideWidthMobile = 260,
  withPlateNumbers = true,
}: Props) {
  const [emblaRef, embla] = useEmblaCarousel({
    align,
    containScroll: "trimSnaps",
    dragFree: false,
    slidesToScroll: 1,
    loop: false,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => {
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
      setSelected(embla.selectedScrollSnap());
    };
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
  }, [embla]);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <div className="relative">
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex gap-5 md:gap-7">
          {slides.map((s, i) => (
            <figure
              key={`${s.src}-${i}`}
              className="shrink-0"
              style={{
                width: `min(${slideWidthMobile}px, 78vw)`,
              }}
            >
              <style>{`
                @media (min-width: 768px) {
                  figure[data-edx-slide="true"] {
                    width: ${slideWidth}px !important;
                  }
                }
              `}</style>
              <div
                data-edx-slide="true"
                style={{ width: "100%" }}
                className={cn(
                  "relative w-full overflow-hidden bg-[color:var(--color-stardust-soft)]",
                  s.aspect === "square"
                    ? "aspect-square"
                    : s.aspect === "landscape"
                      ? "aspect-[3/2]"
                      : "aspect-[3/4]"
                )}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes={`(min-width: 768px) ${slideWidth}px, ${slideWidthMobile}px`}
                  className="object-cover"
                  draggable={false}
                />
                {withPlateNumbers && (
                  <div className="absolute left-4 top-4 text-[0.58rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)] mix-blend-difference tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                )}
              </div>
              {(s.eyebrow || s.caption) && (
                <figcaption className="mt-5 grid gap-1.5">
                  {s.eyebrow && (
                    <span className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                      {s.eyebrow}
                    </span>
                  )}
                  {s.caption && (
                    <span className="max-w-[34ch] text-[0.92rem] leading-[1.55] text-[color:var(--color-charcoal)]">
                      {s.caption}
                    </span>
                  )}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>

      {/* Bottom-right inline navigation */}
      <div className="mt-8 flex items-center justify-between gap-6">
        <span className="text-[0.6rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)] tabular-nums">
          {String(selected + 1).padStart(2, "0")}
          <span className="mx-2 opacity-60">/</span>
          {String(slides.length).padStart(2, "0")}
        </span>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canPrev}
            aria-label="Previous"
            className={cn(
              "group flex h-10 w-10 items-center justify-center border border-[color:var(--color-rule)] transition-colors duration-300",
              canPrev
                ? "hover:border-[color:var(--color-charcoal)] hover:text-[color:var(--color-clay)]"
                : "opacity-30 cursor-not-allowed"
            )}
          >
            <span className="transition-transform duration-500 group-hover:-translate-x-0.5">
              ←
            </span>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext}
            aria-label="Next"
            className={cn(
              "group flex h-10 w-10 items-center justify-center border border-[color:var(--color-rule)] transition-colors duration-300",
              canNext
                ? "hover:border-[color:var(--color-charcoal)] hover:text-[color:var(--color-clay)]"
                : "opacity-30 cursor-not-allowed"
            )}
          >
            <span className="transition-transform duration-500 group-hover:translate-x-0.5">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
