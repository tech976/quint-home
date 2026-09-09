import type { Metadata } from "next";

/**
 * Metadata for the whole back office, gated pages and sign-in alike.
 *
 * The root layout sets a "%s · Quint Home" title template plus Open Graph and
 * Twitter cards naming the brand, and those inherit down. Overriding them here
 * is what keeps the sign-in page anonymous: a bare title, an absolute template
 * so the brand cannot be appended, and the social cards emptied so a pasted
 * link unfurls into nothing.
 */
export const metadata: Metadata = {
  title: { absolute: "Sign in" },
  description: "",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  openGraph: { title: "Sign in", description: "", siteName: "", images: [] },
  twitter: { card: "summary", title: "Sign in", description: "", images: [] },
  alternates: {},
};

export default function AdminSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Marks the subtree so globals.css can hide the storefront chrome the root
  // layout renders around it.
  return <div data-admin-shell>{children}</div>;
}
