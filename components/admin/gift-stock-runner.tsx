"use client";

import { useState } from "react";

interface Result {
  oil: string;
  status: string;
  sku?: string;
  variantId?: number;
  inventorySet?: number;
  detail?: string;
}

/** Runs the gift-variant setup and reports what happened to each oil. */
export function GiftStockRunner() {
  const [qty, setQty] = useState(50);
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<Result[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setBusy(true);
    setError(null);
    setResults(null);
    try {
      const res = await fetch(`/api/admin/gift-variants?qty=${qty}`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `Request failed (${res.status})`);
      setResults(json.results as Result[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-end gap-4">
        <label className="block">
          <span className="text-[0.56rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)]">
            Bottles per oil
          </span>
          <input
            type="number"
            min={0}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="mt-2 w-28 border-b border-[color:var(--color-charcoal)] bg-transparent py-2 text-[0.95rem] tabular-nums outline-none focus:border-[color:var(--color-clay)]"
          />
        </label>
        <button
          type="button"
          onClick={run}
          disabled={busy}
          className="bg-[color:var(--color-charcoal)] px-7 py-3 text-[0.68rem] uppercase tracking-[0.28em] text-[color:var(--color-ivory)] transition-colors hover:bg-[color:var(--color-clay-deep)] disabled:opacity-50"
        >
          {busy ? "Working…" : "Create & stock gift variants"}
        </button>
      </div>

      {error && (
        <p className="mt-6 border-l-2 border-[color:var(--color-clay)] bg-[color:var(--color-stardust-soft)] p-4 text-[0.8rem]">
          {error}
        </p>
      )}

      {results && (
        <table className="mt-8 w-[100%] border-collapse text-[0.85rem]">
          <thead>
            <tr className="border-b border-[color:var(--color-charcoal)] text-left">
              {["Oil", "Result", "SKU", "Stock set"].map((h) => (
                <th
                  key={h}
                  className="py-3 pr-4 text-[0.56rem] uppercase tracking-[0.22em] text-[color:var(--color-charcoal-soft)]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.oil} className="border-b border-[color:var(--color-rule)]">
                <td className="py-3 pr-4">{r.oil}</td>
                <td className="py-3 pr-4">
                  {r.status}
                  {r.detail && (
                    <span className="block text-[0.72rem] text-[color:var(--color-charcoal-soft)]">
                      {r.detail}
                    </span>
                  )}
                </td>
                <td className="py-3 pr-4 text-[color:var(--color-charcoal-soft)]">
                  {r.sku ?? "—"}
                </td>
                <td className="py-3 pr-4 tabular-nums">{r.inventorySet ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
