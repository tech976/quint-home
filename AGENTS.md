<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Layout width discipline (horizontal-overflow prevention)

This site has a recurring "elements going too wide" bug. Before writing or
editing any layout, read `docs/layout-width-discipline.md`. Key rules:

- Every shrinkable flex/grid child needs `min-w-0` (items default to `min-width: auto`).
- Native `<select>` needs `min-w-0` + `truncate` inside a `min-w-0` flex parent.
- Don't put `w-full` + `aspect-ratio` directly in a `minmax(0, Nrem)` grid track — cap it.
- Clip bounded card/box containers; use a container-width token such as
  `max-w-[var(--container-content)]`, never `w-screen`/`100vw`.

Defenses already in place: `html, body { overflow-x: clip }` in `app/globals.css`
(safety net), and a dev-only `components/dev/overflow-detector.tsx` (mounted in
`app/layout.tsx`) that outlines offenders in red and logs them to the console.
The detector is inert in production. Don't let it mask real layout bugs.
