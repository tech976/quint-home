export interface Review {
  quote: string;
  name: string;
  city: string;
  product: string;
  rating: number; // out of 5
}

/**
 * Customer reviews. Placeholder copy for now — swap for real verified reviews
 * (and a real average / count) before launch.
 */
export const reviews: Review[] = [
  {
    quote:
      "The first thing guests ask is what the scent is. It carries through the whole living room without ever turning heavy.",
    name: "Aarav Mehta",
    city: "Mumbai",
    product: "Tabletop A326, Gold",
    rating: 5,
  },
  {
    quote:
      "I set a morning and an evening schedule once and forgot about it. Months later it still just runs.",
    name: "Priya Nair",
    city: "Bengaluru",
    product: "Dual-Mist AT302",
    rating: 5,
  },
  {
    quote:
      "It looks like something I chose for the shelf, not a gadget I had to hide in a corner.",
    name: "Kabir Shah",
    city: "New Delhi",
    product: "Clock AT370",
    rating: 5,
  },
  {
    quote:
      "Temple Dusk turned the bedroom into the room everyone drifts to at the end of the night.",
    name: "Ananya Rao",
    city: "Pune",
    product: "Temple Dusk, 100 ml",
    rating: 5,
  },
  {
    quote:
      "The concentration is the whole point. My old reed sticks never reached past the hallway.",
    name: "Rohan Desai",
    city: "Hyderabad",
    product: "Plug-In A815",
    rating: 4,
  },
  {
    quote:
      "The oils last far longer than I expected, and the refill plan means I never run out.",
    name: "Meera Krishnan",
    city: "Chennai",
    product: "First Light, 100 ml",
    rating: 5,
  },
];

/** Aggregate shown in the section header. Replace with the real figure at launch. */
export const reviewAverage = 4.9;
