import type { Metadata } from "next";
import { ScentFinder } from "@/components/sections/scent-finder";

export const metadata: Metadata = {
  title: "Find Your Scent",
  description:
    "Answer two quick questions and we'll point you to one of the eight Quint Home fragrance oils.",
};

export default function FindYourScentPage() {
  return (
    <article className="bg-[color:var(--color-white)] pt-6 md:pt-10">
      <ScentFinder />
    </article>
  );
}
