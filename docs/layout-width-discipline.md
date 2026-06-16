# Layout Width Discipline

Rules to prevent the recurring "elements going too wide" / horizontal-overflow
bug. When something is wider than the viewport, the whole page gets a horizontal
scrollbar and the layout breaks (especially on mobile).

There are three layers of defense in this repo:

1. **Hard page guard** — `html, body { overflow-x: clip; }` in
   `app/globals.css`. A safety net only. It uses `clip` (not `hidden`) so
   `position: sticky` keeps working. Do not rely on it to hide bad layout —
   fix the root cause.
2. **Dev detector** — `components/dev/overflow-detector.tsx` outlines any
   overflowing element in red and logs it to the console in dev. Watch for the
   `[overflow-detector]` console group.
3. **These conventions** — follow them so the bug never appears.

---

## 1. Flex / grid children that shrink need `min-w-0`

Flex and grid items default to `min-width: auto`, which means they refuse to
shrink below their content's intrinsic size. A long word, a wide image, or a
`<select>` will then push the row wider than the viewport.

```tsx
// BAD — long content forces the row wider than the screen
<div className="flex gap-4">
  <aside className="w-64">…</aside>
  <main className="flex-1">{veryLongContent}</main>   {/* won't shrink */}
</div>

// GOOD — min-w-0 lets the flex child shrink
<div className="flex gap-4">
  <aside className="w-64 shrink-0">…</aside>
  <main className="min-w-0 flex-1">{veryLongContent}</main>
</div>
```

Same for grid items:

```tsx
<div className="grid grid-cols-[16rem_1fr]">
  <aside>…</aside>
  <main className="min-w-0">{content}</main>   {/* required */}
</div>
```

---

## 2. Native `<select>` needs `min-w-0` (and usually `truncate`)

A native `<select>` sizes itself to its **widest option**, ignoring the
container. Inside a flex/grid row this is a classic overflow source.

```tsx
// BAD — select grows to its longest option and blows out the row
<div className="flex">
  <select>{options}</select>
</div>

// GOOD — parent and select both allowed to shrink; text truncates
<div className="flex min-w-0">
  <select className="min-w-0 w-full truncate">{options}</select>
</div>
```

---

## 3. Don't put `w-full` + `aspect-ratio` directly in a `minmax(0, Nrem)` track

An element with `w-full` and an `aspect-ratio` inside a grid track defined as
`minmax(0, Nrem)` can resolve its width from the aspect ratio and overshoot the
track. Give it an explicit `max-width`, or wrap it in a constrained child.

```tsx
// BAD
<div className="grid grid-cols-[minmax(0,40rem)]">
  <img className="w-full aspect-[4/5]" />
</div>

// GOOD — explicit cap
<div className="grid grid-cols-[minmax(0,40rem)]">
  <img className="w-full max-w-[40rem] aspect-[4/5]" />
</div>

// ALSO GOOD — constrain the child, not the media
<div className="grid grid-cols-[minmax(0,40rem)]">
  <div className="min-w-0">
    <img className="w-full aspect-[4/5]" />
  </div>
</div>
```

---

## 4. Clip bounded card / box containers

For any card or box that has a fixed/bounded width, add
`overflow-hidden` or `overflow-x-clip` so internal content (images, long
strings, rotated/translated elements) can't spill past its edge.

```tsx
<article className="overflow-hidden rounded-lg ...">…</article>
```

---

## 5. Use container tokens, never `w-screen` / `100vw` for inner content

`100vw` includes the scrollbar gutter, so `w-screen` content is reliably a few
pixels wider than the usable viewport and triggers overflow. Use the design
tokens defined in `app/globals.css` instead.

```tsx
// BAD
<section className="w-screen">…</section>

// GOOD — token-based max width, centered
<section className="mx-auto w-full max-w-[var(--container-content)] px-6">
  …
</section>
```

Available tokens: `--container-narrow` (56rem), `--container-content` (72rem),
`--container-wide` (88rem), `--container-full` (100rem).

---

## Quick checklist before committing layout

- [ ] Every shrinkable flex/grid child has `min-w-0`.
- [ ] Every native `<select>` has `min-w-0` + a `min-w-0` parent (and `truncate`).
- [ ] No `w-full` + `aspect-ratio` directly inside a `minmax(0, Nrem)` track.
- [ ] Cards/boxes with bounded width clip their overflow.
- [ ] Inner content uses a container-width token such as
      `max-w-[var(--container-content)]`, not `w-screen` / `100vw`.
- [ ] Dev console shows no `[overflow-detector]` warnings at any breakpoint.
