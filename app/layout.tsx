import type { Metadata } from "next";
import "./globals.css";
import { literata, inter, quirk } from "@/lib/fonts";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Grain } from "@/components/atmosphere/grain";
import { OverflowDetector } from "@/components/dev/overflow-detector";

export const metadata: Metadata = {
  title: {
    default: "Quint Home — Air Elevated",
    template: "%s · Quint Home",
  },
  description:
    "Waterless home fragrance from Mumbai. Concentrated IFRA-compliant oils and silent electronic diffusers, designed to be displayed.",
  metadataBase: new URL("https://quinthome.in"),
  openGraph: {
    type: "website",
    title: "Quint Home — Air Elevated",
    description:
      "Waterless home fragrance from Mumbai. Designed for the considered Indian home.",
    siteName: "Quint Home",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${literata.variable} ${inter.variable} ${quirk.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[color:var(--color-white)] text-[color:var(--color-charcoal)]">
        <LenisProvider />
        <Grain />
        {/* Dev-only: outlines + logs any element that overflows the viewport
            horizontally. Gated on NODE_ENV so it is inert in production. */}
        {process.env.NODE_ENV !== "production" && <OverflowDetector />}
        <Header />
        <main className="min-w-0 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
