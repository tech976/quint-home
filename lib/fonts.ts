import { Literata, Inter } from "next/font/google";
import localFont from "next/font/local";

export const literata = Literata({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-literata",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const quirk = localFont({
  src: "../public/fonts/Quirk-Regular.ttf",
  display: "swap",
  variable: "--font-quirk",
  weight: "400",
  style: "normal",
  fallback: ["Literata", "Georgia", "serif"],
});

export const fontVars = `${literata.variable} ${inter.variable} ${quirk.variable}`;
