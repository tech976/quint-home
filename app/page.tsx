import { Hero } from "@/components/sections/hero";
import { DiffuserShowcase } from "@/components/sections/diffuser-showcase";
import { ScentLibrary } from "@/components/sections/scent-library";
import { HowToUse } from "@/components/sections/how-to-use";
import { Atmosphere } from "@/components/sections/atmosphere";
import { SmartHome } from "@/components/sections/smart-home";
import { USPs } from "@/components/sections/usps";
import { FounderTeaser } from "@/components/sections/founder-teaser";
import { JournalTeaser } from "@/components/sections/journal-teaser";
import { MonogramDivider } from "@/components/brand/monogram-divider";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Minimal white breathing space between the hero and the green section */}
      <div
        aria-hidden
        className="h-[clamp(1.25rem,3vh,2.25rem)] bg-[color:var(--color-white)]"
      />
      <SmartHome />
      <USPs />
      <DiffuserShowcase />
      <ScentLibrary />
      <HowToUse />
      <MonogramDivider className="py-[var(--spacing-section-sm)]" />
      <FounderTeaser />
      <Atmosphere />
      <JournalTeaser />
    </>
  );
}
