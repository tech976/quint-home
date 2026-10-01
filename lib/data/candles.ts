import type { Candle } from "../types";

// ============================================================
//  Quint Home – Soy wax candles
//  Source of truth: the printed sleeves and the A3 label sheet
//  (Candle Sleeve Vertical.*.pdf, Candle Label Inverted.Print.A3.pdf).
//  Weight, burn time, wax and the two-note fragrance line are
//  transcribed from the labels. Swatches are the label grounds.
//
//  NOTE: the labels carry a two-note line ("Bergamot & Vetiver"),
//  not a top/heart/base pyramid like the fragrance oils. Nothing
//  further is invented here – the printed line is what the page
//  shows.
// ============================================================

/** Printed on every sleeve, identical across the three candles. */
export const CANDLE_CARE =
  "Trim the wick to 5 mm before each burn. For indoor use only. Keep away from children, pets and direct sunlight. Never leave a burning candle unattended.";

export const CANDLE_MAKE =
  "Hand-poured in India from 100% natural soy wax with IFRA-compliant fragrance oils, for a clean, long-lasting scent.";

export const candles: Candle[] = [
  {
    slug: "the-forest",
    name: "The Forest",
    category: "candle",
    notesLine: "Bergamot & Vetiver",
    tagline: "A green, wooded calm.",
    description:
      "Bergamot over vetiver – bright at the top, cool and rooted underneath. The quiet of standing among trees, brought indoors for a living room or a study.",
    placement: "Living rooms · Studies",
    priceINR: 1499,
    volumeML: 300,
    burnHours: 45,
    image: "/images/candles/the-forest-01.webp",
    gallery: [
      "/images/candles/the-forest-01.webp",
      "/images/candles/the-forest-02.webp",
      "/images/candles/the-forest-03.webp",
    ],
    mood: [
      {
        src: "/images/candles/mood/the-forest-1.webp",
        caption: "Looking up, for once",
        alt: "Sunlight through a canopy of tall trees, seen from below",
      },
      {
        src: "/images/candles/mood/the-forest-2.webp",
        caption: "Cool to the touch",
        alt: "A mossy tree trunk in dappled forest light",
      },
      {
        src: "/images/candles/mood/the-forest-3.webp",
        caption: "The hour before dark",
        alt: "Birch trunks in a wood at golden hour",
      },
      {
        src: "/images/candles/mood/the-forest-4.webp",
        caption: "The day letting go",
        alt: "Golden ripples spreading across dark, still water",
      },
    ],
    scenes: {
      heading: "Cool air, and light through it.",
      headingItalic: "Green, all the way down.",
      lede: "Bergamot carries the light, vetiver the ground beneath it. Four places the scent would already be at home – canopy, bark, late sun on water.",
    },
    swatch: "#33402F",
    textColor: "#F5EFE6",
  },
  {
    slug: "the-palace",
    name: "The Palace",
    category: "candle",
    notesLine: "Violet & Amber",
    tagline: "Quietly ceremonial.",
    description:
      "Violet over amber – powdery and floral at first, warm and resinous as it settles. The register of a room built to receive people, for an entrance or a bedroom.",
    placement: "Entrances · Bedrooms",
    priceINR: 1499,
    volumeML: 300,
    burnHours: 45,
    image: "/images/candles/the-palace-01.webp",
    gallery: [
      "/images/candles/the-palace-01.webp",
      "/images/candles/the-palace-02.webp",
      "/images/candles/the-palace-03.webp",
      "/images/candles/the-palace-04.webp",
    ],
    mood: [
      {
        src: "/images/candles/mood/the-palace-1.webp",
        caption: "Before you knock",
        alt: "A carved white marble doorway with a weathered green door",
      },
      {
        src: "/images/candles/mood/the-palace-2.webp",
        caption: "An entrance, made properly",
        alt: "A yellow palace archway with a vintage car parked beneath it",
      },
      {
        src: "/images/candles/mood/the-palace-3.webp",
        caption: "Taking the long way",
        alt: "Sunlight pooling along a sandstone colonnade",
      },
      {
        src: "/images/candles/mood/the-palace-4.webp",
        caption: "Dressed, and nearly ready",
        alt: "A henna-painted hand resting against gold",
      },
    ],
    scenes: {
      heading: "Cool stone, warm gold.",
      headingItalic: "Someone is expected.",
      lede: "Violet opens cool, amber settles warm behind it. Four places where arriving is the whole occasion – carved marble, sunlit sandstone, gold at the wrist.",
    },
    swatch: "#334064",
    textColor: "#F5EFE6",
  },
  {
    slug: "the-study",
    name: "The Study",
    category: "candle",
    notesLine: "Oud & Wood",
    tagline: "Smoky, deep and unhurried.",
    description:
      "Oud over dry wood – smoky, deep and unhurried. The register of a room lined with books, for an evening in with the door closed.",
    placement: "Studies · Evenings in",
    priceINR: 1499,
    volumeML: 300,
    burnHours: 45,
    image: "/images/candles/the-study-01.webp",
    gallery: [
      "/images/candles/the-study-01.webp",
      "/images/candles/the-study-02.webp",
      "/images/candles/the-study-03.webp",
      "/images/candles/the-study-04.webp",
    ],
    mood: [
      {
        src: "/images/candles/mood/the-study-1.webp",
        caption: "Nothing you came for",
        alt: "The interior of a secondhand bookshop at dusk",
      },
      {
        src: "/images/candles/mood/the-study-2.webp",
        caption: "Light enough to read by",
        alt: "A woman reading by a window above the sea",
      },
      {
        src: "/images/candles/mood/the-study-3.webp",
        caption: "Later than intended",
        alt: "A desk at night with papers and a lamp",
      },
      {
        src: "/images/candles/mood/the-study-4.webp",
        caption: "All of it, waiting",
        alt: "A library wall of old books",
      },
    ],
    scenes: {
      heading: "Dry wood, smoke, old paper.",
      headingItalic: "An evening nobody interrupts.",
      lede: "Smoke from the oud, dryness from the wood, and the evening going nowhere. Four rooms where that is enough – dusk, lamplight, old spines.",
    },
    swatch: "#6B3A1E",
    textColor: "#F5EFE6",
  },
];

export function getCandle(slug: string) {
  return candles.find((c) => c.slug === slug);
}
