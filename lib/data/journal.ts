import type { JournalPost } from "../types";

export const journal: JournalPost[] = [
  {
    slug: "the-taj-lake-palace",
    title: "The Taj Lake Palace, and the question that started Quint Home",
    eyebrow: "Founder Letter",
    excerpt:
      "Three years ago, I checked into one of India's most celebrated hotels in Udaipur. What I didn't expect was to stop in the corridor and stand there, trying to understand what I was breathing.",
    body: [
      "The fragrance was everywhere and nowhere. It wasn't a candle. It wasn't a spray. It was woven into the air of the entire palace — warm, unhurried, completely unlike anything I had ever smelled in someone's home.",
      "I asked the staff. They smiled politely. The scent, they explained, was proprietary.",
      "Las Vegas, a year later. The Aria. A different continent, a different aesthetic — but the same arrested moment in a lobby. Same answer.",
      "It kept happening. The Four Seasons Safari Lodge in the Serengeti — warm baobab wood and wild earth. Alila Fort Bishangarh in Rajasthan — jasmine and ancient stone, a 236-year-old warrior fort reimagined into something quietly sacred. The Ritz-Carlton in Nusa Dua — Balinese frangipani on a sea breeze.",
      "Each time, I tried to find the scent. Each time: proprietary.",
      "Hotels understand something most of us don't. Scent is the invisible layer of luxury. It sets the tone before you see anything, before you touch anything. So why do we accept that our homes — the spaces where we spend the majority of our lives — smell like nothing in particular?",
      "Quint Home exists because I couldn't stop thinking about that.",
    ],
    cover: "/images/vibe/vibe-21.jpg",
    publishedAt: "2026-03-12",
    readMinutes: 4,
  },
  {
    slug: "what-is-a-waterless-diffuser",
    title: "Why we don't use water — and why it matters for the air you breathe",
    eyebrow: "Education",
    excerpt:
      "The diffuser sitting on most Indian bedside tables tonight uses water and ultrasonic vibration. That's not how the great hotels do it. Here is the difference, in one paragraph.",
    body: [
      "Ultrasonic diffusers dilute fragrance oil into water and then mist that water into the room. The scent that reaches you is roughly 1–3% fragrance by volume. The rest is water vapour. The room smells faintly of the scent, and noticeably of humidified air.",
      "Waterless cold-air nebulisation atomises the oil directly using air pressure. No water, no heat, no dilution. What reaches the room is the fragrance itself, at 70–90% concentration. The result is more potent, sits in the air longer, and carries the full architecture of top, heart, and base notes — the same approach used in fine perfumery.",
      "It is also quieter. There is no gurgle, no fan. A Quint Home diffuser in a sleeping bedroom is genuinely silent.",
    ],
    cover: "/images/vibe/vibe-17.jpg",
    publishedAt: "2026-03-28",
    readMinutes: 3,
  },
  {
    slug: "the-architecture-of-scent",
    title: "Top, heart, base — the architecture of a hotel-grade fragrance",
    eyebrow: "Notes",
    excerpt:
      "Every Quint Home oil is built like a perfume. Three layers, three lifespans, one room. Here is how to read a scent profile when you're choosing one.",
    body: [
      "Top notes are the first impression — bright, evaporative, lasting fifteen to thirty minutes. They are usually citrus, herbs, or light spices. They are what greets you when you walk in.",
      "Heart notes carry the room. They are the floral, fruity, and softly resinous notes that hold for several hours. The heart is the personality of the fragrance.",
      "Base notes are the architecture. Woods, musks, ambers, resins. They give the fragrance its weight and its memory — they are what you notice on the cushions the morning after.",
      "Read a Quint Home scent profile by reading downward. It will tell you exactly what the room will feel like at minute one, hour three, and the next day.",
    ],
    cover: "/images/vibe/vibe-21.jpg",
    publishedAt: "2026-04-10",
    readMinutes: 3,
  },
];

export function getJournalPost(slug: string) {
  return journal.find((p) => p.slug === slug);
}
