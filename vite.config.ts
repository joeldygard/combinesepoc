import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { defineConfig, type Plugin, type ResolvedConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {
  breadcrumbSchema,
  caseStudySchema,
  organizationSchema,
  webSiteSchema,
} from './src/lib/seo'
import { site } from './src/content/site'
import { caseBySlug } from './src/content/cases'
import { allRoutes, routeMeta, routeTrail, type Route } from './src/lib/routes'

/**
 * GitHub Pages serves a project site from https://<user>.github.io/<repo>/, so
 * the build needs a matching base path or every hashed asset 404s. In Actions
 * the repo name comes from GITHUB_REPOSITORY, so nothing has to be hardcoded;
 * set VITE_BASE=/ explicitly once this moves to a custom domain or to
 * combine.se itself.
 */
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = process.env.VITE_BASE ?? (repo ? `/${repo}/` : '/')

/**
 * Injects Organization and WebSite JSON-LD into index.html at build time.
 *
 * The schemas are derived from src/content/site.ts, so the structured data can
 * never drift from the content layer — which is the failure mode of pasting
 * JSON-LD into the HTML by hand.
 */
function jsonLd(): Plugin {
  return {
    name: 'combine-json-ld',
    transformIndexHtml() {
      return [organizationSchema(), webSiteSchema()].map((schema) => ({
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        children: JSON.stringify(schema),
        injectTo: 'head' as const,
      }))
    },
  }
}

/**
 * The Pages deployment publishes copy that also lives on combine.se, so it asks
 * search engines to stay out rather than letting a POC compete with the real
 * site. The canonical link still points at combine.se; this makes the intent
 * explicit for crawlers that ignore canonicals across hosts.
 *
 * Only active when VITE_NOINDEX is set, so a production build off the same
 * source is still indexable.
 */
function previewNoindex(): Plugin {
  return {
    name: 'combine-preview-noindex',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        if (!process.env.VITE_NOINDEX) return html
        return html.replace(
          /<meta name="robots"[^>]*>/,
          '<meta name="robots" content="noindex, nofollow" />',
        )
      },
    },
  }
}

const htmlEscape = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

/**
 * Vite builds one client entry. Emit a document for every route in `allRoutes`
 * so a static host can serve deep links, and give each one its own head. The
 * post-build prerender pass then fills each document's root with the matching
 * route markup.
 *
 * Metadata comes from `routeMeta` — the same function the client effect and the
 * server renderer call — so a case study added to content/cases.ts gets a URL,
 * a document, a correct title and canonical, structured data and a sitemap
 * entry without a line changing here.
 */
function routeShells(): Plugin {
  let config: ResolvedConfig

  const ldScript = (schema: unknown) =>
    `<script type="application/ld+json">${JSON.stringify(schema)}</script>`

  /** Structured data that depends on which route this document is. */
  const routeLd = (route: Route) => {
    const tags: string[] = []
    const trail = routeTrail(route)
    // A one-item trail is just the homepage, and a breadcrumb of one says nothing.
    if (trail.length > 1) tags.push(ldScript(breadcrumbSchema(trail)))
    if (route.kind === 'case') tags.push(ldScript(caseStudySchema(route.slug)))
    return tags.join('')
  }

  /** Only case routes carry a date we can honestly claim as a modification. */
  const lastmod = (route: Route) => {
    if (route.kind !== 'case') return undefined
    const entry = caseBySlug(route.slug)
    return entry?.updatedAt ?? entry?.publishedAt
  }

  /*
   * `priority` is deliberately absent: search engines ignore it, and the eight
   * hand-written priorities in the file this replaces meant nothing.
   */
  const sitemap = () =>
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...allRoutes.map((route) => {
        const loc = new URL(routeMeta(route).path, site.url).toString()
        const modified = lastmod(route)
        return `  <url><loc>${loc}</loc>${
          modified ? `<lastmod>${modified}</lastmod>` : ''
        }</url>`
      }),
      '</urlset>',
      '',
    ].join('\n')

  return {
    name: 'combine-route-shells',
    apply: 'build',
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    async closeBundle() {
      if (config.build.ssr) return

      const outputDirectory = resolve(config.root, config.build.outDir)
      const indexPath = resolve(outputDirectory, 'index.html')
      // Read once, up front: the home route is written from this same template.
      const index = await readFile(indexPath, 'utf8')

      for (const route of allRoutes) {
        const meta = routeMeta(route)
        const canonical = new URL(meta.path, site.url).toString()

        const source = index
          .replace(/<title>[^<]*<\/title>/, `<title>${htmlEscape(meta.title)}</title>`)
          .replace(
            /(<meta\s+name="description"\s+content=")[^"]*("\s*\/>)/,
            `$1${htmlEscape(meta.description)}$2`,
          )
          .replace(
            /(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/>)/,
            `$1${canonical}$2`,
          )
          .replace(
            /(<meta\s+property="og:url"\s+content=")[^"]*("\s*\/>)/,
            `$1${canonical}$2`,
          )
          .replace(
            /(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/>)/,
            `$1${htmlEscape(meta.title)}$2`,
          )
          .replace(
            /(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/>)/,
            `$1${htmlEscape(meta.description)}$2`,
          )
          .replace('</head>', `${routeLd(route)}</head>`)

        const directory = meta.path.replace(/^\/|\/$/g, '')
        const outputPath = directory
          ? resolve(outputDirectory, directory, 'index.html')
          : indexPath
        await mkdir(dirname(outputPath), { recursive: true })
        await writeFile(outputPath, source, 'utf8')
      }

      // Overwrites the dev-server placeholder copied out of public/.
      await writeFile(resolve(outputDirectory, 'sitemap.xml'), sitemap(), 'utf8')
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), jsonLd(), previewNoindex(), routeShells()],
  build: {
    target: 'es2022',
    cssTarget: 'chrome111',
  },
})
