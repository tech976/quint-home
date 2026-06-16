export type ProductCategory = "diffuser" | "oil";

export interface ScentNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface HotelCredential {
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

/** A colour/finish variant of a diffuser (same model, different finish + photos). */
export interface DiffuserColor {
  name: string;
  /** CSS colour for the selector swatch. */
  swatch: string;
  finish: string;
  image: string;
  gallery: string[];
}

export interface Diffuser {
  slug: string;
  /** Manufacturer model code from the product catalogue, e.g. "A815". */
  model: string;
  name: string;
  category: "diffuser";
  tier: "entry" | "premium";
  tagline: string;
  description: string;
  priceINR: number;
  /** Bluetooth companion-app control. 5 of 6 catalogue models support it (A815 does not). */
  bluetooth: boolean;
  coverageSqFt: [number, number];
  /** Display string for coverage, verbatim/derived from the catalogue (e.g. "Up to 100 m² (≈1,075 sq ft)"). */
  coverageLabel: string;
  /** Catalogue "BEST FOR" placement tags. */
  bestFor: string[];
  /** Catalogue "KEY FEATURES" bullet list, verbatim. */
  keyFeatures: string[];
  image: string;
  gallery: string[];
  /** Optional product video (vertical, muted autoplay loop) for the PDP. */
  video?: string;
  finish: string;
  height: string;
  /** Present when the model ships in more than one colour/finish. The top-level
   *  image/gallery/finish mirror colors[0] (the default). */
  colors?: DiffuserColor[];
  smartHome?: ("apple" | "alexa" | "google")[];
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
