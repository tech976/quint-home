export type ProductCategory = "diffuser" | "oil";

export interface ScentNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface HotelCredential {
  hotel: "Hilton" | "Ritz-Carlton";
  line: string;
  story: string;
}

export interface FragranceOil {
  slug: string;
  name: string;
  category: "oil";
  tier: "standard" | "hotel-credential";
  tagline: string;
  description: string;
  priceINR: number;
  volumeML: number;
  notes: ScentNotes;
  mood: string;
  origin: string;
  credential?: HotelCredential;
  image: string;
  swatch: string;
  textColor: string;
}

export interface Diffuser {
  slug: string;
  name: string;
  category: "diffuser";
  tier: "entry" | "premium";
  tagline: string;
  description: string;
  priceINR: number;
  coverageSqFt: [number, number];
  image: string;
  gallery: string[];
  finish: string;
  height: string;
  smartHome: ("apple" | "alexa" | "google")[];
  specs: { label: string; value: string }[];
}

export type Product = Diffuser | FragranceOil;

export interface JournalPost {
  slug: string;
  title: string;
  eyebrow: string;
  excerpt: string;
  body: string[];
  cover: string;
  publishedAt: string;
  readMinutes: number;
}
