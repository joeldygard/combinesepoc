import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { organizationSchema, webSiteSchema } from './src/lib/seo'

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

export default defineConfig({
  base,
  plugins: [react(), jsonLd(), previewNoindex()],
  build: {
    target: 'es2022',
    cssTarget: 'chrome111',
  },
})
