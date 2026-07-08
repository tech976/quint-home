"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const BANNERS = [
  "/images/banners/banner-01.webp",
  "/images/banners/banner-02.webp",
  "/images/banners/banner-03.webp",
  "/images/banners/banner-04.webp",
  "/images/banners/banner-05.webp",
  "/images/banners/banner-06.webp",
];

const INTERVAL = 5000;

/**
 * Top-of-home promotional banner. Calm auto-crossfade through the designed
 * banner set – no dots, no arrows, one easing curve. Links to the shop.
 */
export function Banner() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setActive((p) => (p + 1) % BANNERS.length),
      INTERVAL
    );
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="border-b border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)]">
      <Link
        href="/shop?category=diffusers"
        aria-label="Explore the Quint Home collection"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="group relative block overflow-hidden"
        style={{ width: "100%", maxWidth: "none", aspectRatio: "1744 / 902" }}
      >
        {BANNERS.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt="Quint Home – Air, Elevated"
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn(
              "object-cover transition-opacity duration-[1200ms] ease-[var(--ease-quint)]",
              i === active ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
      </Link>
    </section>
  );
}
