import type { Diffuser } from "../types";

export const diffusers: Diffuser[] = [
  {
    slug: "the-monolith",
    name: "The Monolith",
    category: "diffuser",
    tier: "entry",
    tagline: "A slender brass line, sized to disappear or to be displayed.",
    description:
      "A single seamless cylinder in brushed champagne brass, machined from solid stock and finished by hand. Sits on a low ceramic disc that decouples vibration so the body of the object never trembles. Designed to be displayed on a shelf the way a small sculpture is — quiet, deliberate, alive only when you choose.",
    priceINR: 13999,
    coverageSqFt: [80, 220],
    image: "/images/diffusers/monolith/03.png",
    gallery: [
      "/images/diffusers/monolith/03.png",
      "/images/diffusers/monolith/01.png",
      "/images/diffusers/monolith/02.png",
      "/images/diffusers/monolith/04.png",
      "/images/diffusers/monolith/05.png",
      "/images/diffusers/monolith/06.png",
    ],
    finish: "Brushed champagne brass on cast ceramic base",
    height: "228 mm × Ø34 mm body · Ø96 mm base",
    smartHome: ["apple", "alexa", "google"],
    specs: [
      { label: "Technology", value: "Cold-air nebulisation — no water, no heat, no wick" },
      { label: "Coverage", value: "30 to 220 sq ft (bedroom · study · entryway)" },
      { label: "Operation", value: "Silent — under 18 dB, safe for sleeping rooms" },
      { label: "Connectivity", value: "Wi-Fi 6 · Bluetooth 5.3 · HomeKit · Matter" },
      { label: "Schedule", value: "Morning + evening profiles, set once via app" },
      { label: "Oil cycle", value: "Approx. 60–90 days per 100 ml refill" },
      { label: "Materials", value: "Solid brass body, glazed ceramic base, soft-touch top" },
      { label: "Power", value: "USB-C, included adapter (5 V · 2 A)" },
      { label: "Weight", value: "640 g" },
      { label: "Origin", value: "Designed in Mumbai · Assembled in India" },
    ],
  },
  {
    slug: "the-ember",
    name: "The Ember",
    category: "diffuser",
    tier: "entry",
    tagline: "Smoked glass and a low amber glow. A bedside or desk companion.",
    description:
      "A compact smoked-glass vessel with a soft amber inner glow and a discreet LED display. Built for the bedside or desk — programmed in under a minute, then forgotten about. The display fades automatically at night. Visible only when you look for it.",
    priceINR: 15999,
    coverageSqFt: [120, 320],
    image: "/images/diffusers/ember/01.png",
    gallery: [
      "/images/diffusers/ember/01.png",
      "/images/diffusers/ember/02.png",
      "/images/diffusers/ember/03.png",
      "/images/diffusers/ember/04.png",
      "/images/diffusers/ember/05.png",
      "/images/diffusers/ember/06.png",
    ],
    finish: "Smoked glass vessel with anodised aluminium top",
    height: "168 mm × 124 mm × 96 mm",
    smartHome: ["apple", "alexa", "google"],
    specs: [
      { label: "Technology", value: "Cold-air nebulisation — no water, no heat, no wick" },
      { label: "Coverage", value: "120 to 320 sq ft (study · home office · medium bedroom)" },
      { label: "Operation", value: "Silent — under 16 dB, ambient amber glow at night" },
      { label: "Display", value: "Edge-lit LED with auto-dim and night mode" },
      { label: "Connectivity", value: "Wi-Fi 6 · Bluetooth 5.3 · HomeKit · Matter" },
      { label: "Schedule", value: "Up to four daily profiles via app" },
      { label: "Oil cycle", value: "Approx. 75–110 days per 100 ml refill" },
      { label: "Materials", value: "Smoked borosilicate glass, anodised aluminium top" },
      { label: "Power", value: "USB-C, included adapter (5 V · 3 A)" },
      { label: "Weight", value: "1.1 kg" },
      { label: "Origin", value: "Designed in Mumbai · Assembled in India" },
    ],
  },
  {
    slug: "the-pillar",
    name: "The Pillar",
    category: "diffuser",
    tier: "premium",
    tagline: "Twin cylinders, ceramic and brass. For open-plan living.",
    description:
      "A larger sculptural object intended for living rooms, hallways, and reception spaces. Twin cast-ceramic cylinders meet a single brass cap. The base is a glazed disc that holds the entire form steady on hardwood, stone, or marble. Specified by interior architects across Mumbai.",
    priceINR: 22999,
    coverageSqFt: [320, 720],
    image: "/images/diffusers/pillar/01.png",
    gallery: [
      "/images/diffusers/pillar/01.png",
      "/images/diffusers/pillar/02.png",
      "/images/diffusers/pillar/03.png",
      "/images/diffusers/pillar/04.png",
      "/images/diffusers/pillar/05.png",
      "/images/diffusers/pillar/06.png",
    ],
    finish: "Cast cream ceramic with brushed brass cap, glazed base",
    height: "284 mm × Ø162 mm body · Ø192 mm base",
    smartHome: ["apple", "alexa", "google"],
    specs: [
      { label: "Technology", value: "Twin-chamber cold-air nebulisation" },
      { label: "Coverage", value: "320 to 720 sq ft (open-plan living · hallway)" },
      { label: "Operation", value: "Whisper — under 18 dB at full intensity" },
      { label: "Connectivity", value: "Wi-Fi 6 · Bluetooth 5.3 · HomeKit · Matter · Thread" },
      { label: "Schedule", value: "Multi-zone profiles, location-aware, layered scents" },
      { label: "Oil cycle", value: "Approx. 110–160 days per twin 100 ml refill set" },
      { label: "Materials", value: "Cast ceramic body, brushed brass cap, glazed base" },
      { label: "Power", value: "DC 12 V, included adapter" },
      { label: "Weight", value: "2.4 kg" },
      { label: "Origin", value: "Designed in Mumbai · Assembled in India" },
    ],
  },
];

export function getDiffuser(slug: string) {
  return diffusers.find((d) => d.slug === slug);
}

export function getRelatedOils() {
  return ["first-light", "temple-dusk", "the-drawing-room", "the-carlton-room"];
}
