# Combine homepage POC

A production-shaped proof of concept for the Combine homepage, built from
`combine-homepage-poc-brief.md`. The brief is the source of truth; this file
records how the code implements it and where it deliberately diverges.

---

## Setup

```bash
npm install
npm run dev      # dev server, includes the field tuning rig
npm run build    # typecheck + production bundle to dist/
npm run preview  # serve dist/
npm run lint
```

Node 20.19+ or 22.12+.

---

## Divergences from the brief

Three, all deliberate. Everything else follows the brief.

**1. Vite + React instead of Astro.** Requested directly. The consequence is
real and worth stating plainly: Astro would have emitted the eight sections as
static HTML with React hydrating only the hero. This build ships a client-
rendered page, so the acceptance criterion *"main content is in generated HTML"*
is **not** met. Everything else that criterion protects has been preserved:

- Content lives in a typed layer, not in components.
- **The whole tree renders server-side today.** I compiled it and ran
  `renderToStaticMarkup(<App />)` under Node with no DOM: it produced 30.3 kB of
  markup containing every heading, case, article, capability and pipeline stage.
  So the prerender step below is a build-config change, not a refactor.
- No component reads `window` or `document` during render. Media queries go
  through `useSyncExternalStore` with a server snapshot, which is what makes the
  above work.
- Metadata, Open Graph, canonical, JSON-LD, `robots.txt`, `sitemap.xml` and
  `rss.xml` are all static and present without executing the bundle.

**2. Hero simulation colours are not brief tokens.** `--color-ink` (`#0b0b0d`)
and `--color-signal` (`#8ceef0`) govern the page. The canvas uses `#141414` and
`#91f9f7`, tuned by eye over many iterations and baked into `DriftHero.tsx` as
constants for performance. They are exposed as `--hero-field` and
`--hero-signal` in `tokens.css` and documented there. Snapping them to the brief
tokens is a two-constant change if you want exact alignment.

**3. Nav "About" points off-site.** The POC is homepage-only. In-page anchors
cover the five sections that exist; `About` links to the live
`combine.se/about-us/` so the page contains no dead links.

**4. Section order departs from the brief.** The delivery platform is third,
directly after the proof, rather than fifth. Accelerator + CTP is the actual
differentiator; buried halfway down, the first two screens said only "we do AI
well". Everything else keeps the brief's order.

---

## Architecture

```
index.html                  static metadata, OG, canonical, font preload
src/
├── main.tsx                entry; mounts App
├── App.tsx                 the eight sections, in order
├── styles/
│   ├── tokens.css          every colour, type step, space and radius
│   ├── typography.css      type roles (.u-display, .u-h2, .u-mono …)
│   └── global.css          reset, fields, grid, focus, reduced motion
├── content/                the typed content layer — all copy lives here
│   ├── types.ts            normalized domain models
│   ├── site.ts             nav + every section's copy
│   ├── cases.ts            3 cases
│   ├── articles.ts         4 articles
│   ├── capabilities.ts     3 capability groups
│   └── authors.ts          bylines
├── lib/
│   ├── seo.ts              JSON-LD builders (build-time only)
│   └── motion.ts           reduced-motion, enter-once, fine-pointer hooks
└── components/
    ├── base/               Button, SectionIntro
    ├── layout/             SiteHeader, SiteFooter
    ├── home/               the eight sections
    ├── svg/                diagram and case stand-ins
    ├── DriftHero.tsx       the hero simulation (frozen config, adaptive)
    ├── DriftField.tsx      the tunable simulation (dev rig only)
    ├── DriftControls.tsx   the dials (dev rig only)
    └── driftConfig.ts      shared simulation defaults
```

### Design tokens

`src/styles/tokens.css` is the only file permitted to declare a raw colour.
Components reference semantic roles (`--color-text-secondary`,
`--color-surface-brand`) rather than ramp steps, so a palette change is a
single-file edit.

Sectional fields are four classes — `.field-default`, `.field-subtle`,
`.field-inverse`, `.field-brand` — and the page alternates them deliberately:
dark hero → white → **plum** → off-white → white → off-white → white → black.

### Logo geometry

One clipped corner, derived from the angled cuts in the Combine letterforms,
defined once as `--clip-corner`. It appears on the primary button, the section
marker, image crops, the system-story diagram terminals, the platform diagram
frame and the nav hover indicator. Nowhere else, and never on a control in a way
that shrinks its hit area.

### Motion

In the brief's priority order:

1. **Hero simulation** — canvas, hero only.
2. **System story** — one contained explanation. Each stage arms once as it
   enters the viewport via `IntersectionObserver`; the highlight is monotonic so
   scrolling back does not replay it. Not pinned, no scroll-jacking. The diagram
   is complete and legible with JavaScript disabled.
3. **Header state** — one class flip at a scroll threshold.
4. **Section entrance** — `.enter` / `.is-in`, one opacity and one transform,
   once per section, never per card.
5. Everything else static.

Under `prefers-reduced-motion: reduce` the simulation paints a single static
frame and never starts its loop, all stages are active from first paint, and
transitions collapse to 0.01ms.

### The hero simulation

Lives only behind the hero. It fades at the boundary via one
`IntersectionObserver` on a sentinel near the hero's foot — a class flip plus a
CSS transition, so simulation state is never coupled to scroll position. The
canvas is `aria-hidden`, stops when the tab is hidden **or** when scrolled out of
view, caps DPR at 2, scales particle count by viewport area, and steps down
through four quality tiers (resolution, then frame rate, then the glow pass)
based on measured frame intervals. There is no pointer interaction at all, on any
device.

`DriftField` + `DriftControls` (the tuning rig) render only under
`import.meta.env.DEV`, so the bundler drops them from production.

---

## Content editing

All copy is in `src/content/`. Nothing is hard-coded in a component.

- **Section copy and nav** — `site.ts`
- **Cases** — `cases.ts`. Ordering is explicit and stable: featured first, then
  `featuredOrder`, then slug.
- **Articles** — `articles.ts`. Newest first, slug as tiebreaker.
- **Capabilities** — `capabilities.ts`
- **Bylines** — `authors.ts`

Word limits from the brief (hero headline 5–11 words, case summary 30–65, no
paragraph over 80) are not enforced by code. If this outlives the POC, they
belong in a schema validator.

### Provenance of every claim

Publicly sourced, verified against the live pages:

| Claim | Source |
|---|---|
| 1B+ sensor measurements; flow estimation without flow meters; pump-efficiency KPI; overflow prediction from pump run time (>9h ahead in some cases); data-quality monitoring; rain/flow correlation; designed to run in real time; SmartWater at Sweco | `combine.se/blog/sewage-system-management-what-the-data-reveals` |
| 5× less analysis time; 20 years of footage; Kosterhavet / Koster Seafloor Observatory; storage + metadata infrastructure; citizen-science annotation; YOLO object detection; researcher web application; Ocean Data Factory Sweden | `combine.se/cases/uncovering-ocean-secrets-...` |
| ACHT 2.0 (Trafikverket-funded, RISE-coordinated, with Kockumation, Bureau Veritas, Metstech); proof-of-concept model recommending historical cargo plans; API to Kockumation's Loadmaster X5; UI designed with Kockumation; simulator testing with bridge officers | `combine.se/blog/the-foundations-for-ai-at-sea-from-data-to-decisions` |
| CTP: data-pipeline building blocks, automated quality checks, APIs, a dashboard, GitLab repo setup, CI building blocks, documented ways of working; lightweight, open-source, runs locally | `combine.se/blog/combine-technology-platform-...` |

**From internal knowledge, not a public page** — check before publishing:

- **Accelerator** as the named pipeline-execution layer. It appears nowhere on
  combine.se; the public article describes CTP alone.
- **CTP providing reusable React components and authentication.** The public
  article says "APIs" and "a dashboard"; it does not mention React or auth.
- The five-layer stack (data → Accelerator → project logic → CTP → application).

Deliberately conservative wording: the processing layer is described as
**traceable and reproducible**, never *auditable*, which would imply formal
compliance certification. Change it only if that is a claim engineering will
defend.

Also not real:

- **Reading times** are estimates, not measured from final copy.
- **Bylines are discipline teams**, not named individuals. Attributing an article
  to a person who did not write it would be fabrication; `Author.kind` already
  distinguishes `'team'` from `'person'` so real authors slot in later.
- **Image stand-ins** are inline SVG that communicate the intended content — an
  underwater frame with detections and a timeline, a pump-station network with a
  developing overflow, a vessel cross-section with an API panel. Each carries its
  intent as its accessible description.
- No client logos, testimonials, awards or ratings appear anywhere.

---

## SEO

`index.html` holds the title, description, canonical, robots, Open Graph and
Twitter card. Organization and WebSite JSON-LD are **injected at build time** by
a small Vite plugin (`vite.config.ts`) that calls `src/lib/seo.ts`, so the
structured data is generated from `src/content/site.ts` and cannot drift from the
content layer.

`src/lib/seo.ts` also has `blogPostingSchema()` and `breadcrumbSchema()` ready
for the Edge and case routes.

### Sitemap and RSS

`public/sitemap.xml` and `public/rss.xml` are hand-authored groundwork that
matches the content layer. They are static because the POC has no routes to
enumerate. Once cases and articles have real URLs, replace both with a build
step that imports `orderedCases` / `orderedArticles` and emits them — the
ordering helpers exist for exactly this.

---

## Accessibility

Targets WCAG 2.2 AA.

- One `h1` (the hero). Heading levels verified contiguous h1 → h2 → h3.
- `header` / `main` / `footer` landmarks, every `section` has
  `aria-labelledby`, every `nav` has an `aria-label`.
- Skip link to `#main`, visible on focus.
- Focus rings on every interactive element, switching to `--color-signal` on
  dark and plum fields so they stay visible.
- Controls are 44px minimum.
- Contrast measured on all 21 rendered token pairs. One failed: the brief's
  `--color-muted` on `--color-paper` is 4.27:1. Off-white fields therefore use
  `--color-text-secondary-on-subtle` (`#6f6f77`, 4.53:1) — the smallest
  correction on the same cool-grey ramp. `--color-muted` itself is unchanged.
- No state uses colour alone: the active system-story stage also shifts weight
  and moves its node; the overflow state in the flow diagram is a distinct shape
  plus a text label.
- The canvas is `aria-hidden`; informative diagrams use `role="img"` with
  `<title>` and `<desc>`; decorative ones are hidden.

### Responsive

No element declares a width over 360px. The only `min-width` is the platform
architecture diagram (480px), deliberately inside an `overflow-x: auto`
container so it scrolls rather than pushing the page. `img`, `svg` and `canvas`
are capped at `max-width: 100%` globally. Breakpoints are content-driven, and
nothing important is hover-only.

---

## Migrating to a CMS

The point of the content layer is that this migration touches no presentation
component.

```
today:  src/content/*.ts  →  normalized model  →  components
later:  Sanity            →  normalized model  →  components
```

1. Keep `src/content/types.ts` exactly as the contract.
2. Replace each `src/content/*.ts` with a fetch plus a mapping function that
   returns the same shapes. Sanity's `_id`, `_type` and reference expansion get
   normalized away in the mapper.
3. `ImageRef` is already an indirection: swap `kind: 'svg-standin'` for a real
   asset variant and update the stand-in components' fallback branch.
4. Components import from `src/content/`, never from a CMS client, so the import
   sites do not change.

### Adding prerendering

If the missing static HTML matters, the shortest correct path is:

1. `npm i -D vite-plugin-ssr` *or* add an SSR entry (`src/entry-server.tsx`)
   exporting `renderToString(<App />)`.
2. Build twice — client and SSR — then a small Node script injects the rendered
   markup into `dist/index.html` and swaps `createRoot` for `hydrateRoot`.

No component needs to change. The only things Node cannot resolve on its own are
the `.css` and `.png` imports, which any bundler-driven SSR build handles; in the
verification above they were stubbed with two lines of `require.extensions`.

---

## Verified

Run, not assumed:

- `tsc -b` clean across both projects (app + Vite config); `eslint` clean.
- **Server render executed.** `renderToStaticMarkup(<App />)` in Node with no
  DOM: 24 content assertions and 11 structural assertions pass — one `h1`, eight
  sections all `aria-labelledby`, canvas `aria-hidden`, dev rig absent from the
  output, no lorem ipsum, no `[IMAGE]` placeholders.
- **JSON-LD executed.** Builders compiled and run: `@id` values absolute, WebSite
  → Organization reference intact, team bylines map to `Organization` rather than
  `Person`, unknown slugs throw, output is valid JSON, and nothing emits
  `aggregateRating`, `review` or `award`.
- **Contrast measured** on all rendered token pairs, including the plum field's
  layered stack surfaces (composited alpha over plum). One original pair failed
  and was fixed; see Accessibility.
- **Overflow audited** by parsing every reachable stylesheet, distinguishing
  element declarations from media-query conditions and excluding `max-width`.
- **Import graph walked** from `src/main.tsx` to confirm what actually ships.

**Not verified:** `vite build` itself, and the page in a real browser. The
sandbox used to write this code could not run either — `node_modules` holds
Windows-only Rolldown binaries. Everything above was verified by compiling the
sources with `tsc` and executing them directly in Node. Run `npm run build` and
open it locally before trusting the visual result.

Five files from the earlier Vite playground are no longer imported and are safe
to delete: `src/App.css`, `src/index.css`, `src/components/SiteHeader.tsx`,
`src/components/SiteHeader.css`, `src/components/CombineMark.tsx`.
