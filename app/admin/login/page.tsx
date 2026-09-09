import { redirect } from "next/navigation";
import { currentStaffShop } from "@/lib/admin/session";
import { oauthConfigured } from "@/lib/shopify/oauth";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sign in", robots: { index: false, follow: false } };

/**
 * Sign-in is Shopify's own: completing the OAuth round trip proves the person
 * can log into this store's admin, so there is no separate password to manage
 * or leak.
 */
export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await currentStaffShop()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[26rem] flex-col justify-center px-6">
      <p className="text-[0.58rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
        Quint Home
      </p>
      <h1 className="mt-4" style={{ fontFamily: "var(--font-serif)", fontSize: "1.9rem", lineHeight: 1.1 }}>
        GST &amp; Invoices
      </h1>
      <p className="mt-4 text-[0.85rem] leading-[1.7] text-[color:var(--color-charcoal-soft)]">
        Sign in with the Shopify account that manages this store.
      </p>

      {error && (
        <p className="mt-5 border-l-2 border-[color:var(--color-clay)] bg-[color:var(--color-stardust-soft)] p-3 text-[0.78rem] leading-[1.6]">
          {error === "denied"
            ? "Shopify did not confirm that account."
            : "Sign-in could not be completed. Please try again."}
        </p>
      )}

      {oauthConfigured() ? (
        <a
          href="/api/admin/login"
          className="mt-8 inline-flex items-center justify-center gap-3 bg-[color:var(--color-charcoal)] px-8 py-4 text-[0.72rem] uppercase tracking-[0.3em] text-[color:var(--color-ivory)] transition-colors hover:bg-[color:var(--color-clay-deep)]"
        >
          Continue with Shopify →
        </a>
      ) : (
        <p className="mt-8 border-l-2 border-[color:var(--color-clay)] bg-[color:var(--color-stardust-soft)] p-4 text-[0.78rem] leading-[1.6]">
          Shopify OAuth is not configured. Set <code>SHOPIFY_API_KEY</code> and{" "}
          <code>SHOPIFY_API_SECRET</code> in Vercel, then redeploy.
        </p>
      )}
    </div>
  );
}
