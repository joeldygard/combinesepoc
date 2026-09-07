# Combine website

A Vite and React implementation of the Combine website direction supplied in
`reference/` on 31 August 2026. The published positioning is “AI for the
physical world”, supported by the approved message spine, page copy and visual
language in that folder.

The `reference/` directory is intentionally untracked. It is source material,
not a runtime dependency, and is not copied into the production build.

## Setup

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

Node 20.19+ or 22.12+.

## Routes

The public route table lives in `src/content/site.ts`:

| Page | Path |
|---|---|
| Home | `/` |
| Services | `/services/` |
| Projects | `/projects/` |
| How we build | `/ai-for-the-physical-world/` |
| Products | `/products/` |
| Insights | `/insights/` |
| Company | `/company/` |
| Contact | `/contact/` |

`vite.config.ts` emits an HTML document for every path and the build prerenders
the matching React page into it. This lets a static host serve complete deep
links without a rewrite rule and gives each route its own title, description,
canonical URL and Open Graph metadata.

## Rendering architecture

`App` receives the current route as data and never reads the URL during render.
`src/entry-server.tsx` renders the same root tree into every route document,
then the browser hydrates that markup. Internal links progressively enhance to
History API navigation, keeping the shared React tree mounted; ordinary anchor
navigation remains the fallback when JavaScript is unavailable.

The interactive hero is isolated to `Hero` and `DriftHero`. Its browser APIs
are used only inside effects. Interior routes use static page heroes. This keeps
the content tree server-renderable while preserving the existing hero motion.

## Content and release gates

Approved site copy, navigation, route metadata, company facts and project names
live in `src/content/site.ts`. Page composition lives in
`src/components/pages/Pages.tsx`.

The source documents explicitly leave several areas open. The implementation
does not publish temporary prose for them:

- Customer logos remain absent until permission is confirmed.
- Project pages show approved names and industries, but no unapproved bodies.
- Insights contains no fabricated posts or authors.
- PumpHälsa remains absent until launch and customer approval.
- Company and Contact use only supplied facts and existing contact details.
- ISO 42001 and ISO 27001 are not presented as certifications.

Before launch, confirm renewal of ISO 9001 and ISO 14001 past September 2026,
the current PhD share, logo permissions, project publication scope, named
insight authors and the production HubSpot form.

## Design system

Design tokens are defined in `src/styles/tokens.css`. Global layout, field and
accessibility rules live in `src/styles/global.css`, while type roles live in
`src/styles/typography.css`.

The implementation keeps the established proof-of-concept language:

- Host Grotesk and IBM Plex Mono
- black, white, off-white and plum sectional fields
- cyan only as a measurement signal
- clipped primary actions and section markers derived from the logo geometry
- one animated particle field, confined to the homepage hero
- a detached navigation state after scrolling

The field tuning components remain available in the source tree, but are not
mounted by the public app.

## SEO and feeds

The homepage metadata is in `index.html`. Route shells get route-specific
metadata during the production build. Organization and WebSite JSON-LD are
generated from `src/content/site.ts` by `src/lib/seo.ts`.

`public/sitemap.xml` enumerates the current public routes. `public/rss.xml`
contains only channel metadata until publishable insight posts exist.

## Verification

The expected checks are:

```bash
npm run build
npm run lint
npx vite build --ssr src/entry-server.tsx --outDir .tmp-ssr-check
```

The temporary SSR output can be imported in Node and `render('build')` called
to verify that the server tree contains the approved message spine. Remove the
temporary output after the check.
