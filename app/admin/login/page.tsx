import { redirect } from "next/navigation";
import { adminPasswordConfigured, currentStaffShop } from "@/lib/admin/session";
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
            : error === "badpass"
              ? "That passphrase was not correct."
              : error === "throttled"
                ? "Too many attempts. Please wait a few minutes and try again."
                : error === "nopass"
                  ? "Passphrase sign-in is not enabled on this deployment."
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

      {/* Passphrase, for somebody who needs the invoices but has no Shopify
          account — an accountant, typically. Hidden entirely when unset, so an
          unconfigured deployment shows no way in rather than a dead form. */}
      {adminPasswordConfigured() && (
        <>
          <div className="mt-10 flex items-center gap-4">
            <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
            <span className="text-[0.56rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)]">
              or
            </span>
            <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
          </div>

          <form action="/api/admin/password" method="post" className="mt-8">
            <label className="block">
              <span className="text-[0.56rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)]">
                Passphrase
              </span>
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                className="mt-2 w-[100%] border-b border-[color:var(--color-charcoal)] bg-transparent py-2.5 text-[0.95rem] outline-none transition-colors focus:border-[color:var(--color-clay)]"
              />
            </label>
            <button
              type="submit"
              className="mt-6 w-[100%] border border-[color:var(--color-charcoal)] px-8 py-3.5 text-[0.68rem] uppercase tracking-[0.28em] transition-colors hover:bg-[color:var(--color-charcoal)] hover:text-[color:var(--color-ivory)]"
            >
              Sign in with passphrase
            </button>
          </form>
        </>
      )}
    </div>
  );
}
