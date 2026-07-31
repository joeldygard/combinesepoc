import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { organizationSchema, webSiteSchema } from './src/lib/seo'

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

export default defineConfig({
  plugins: [react(), jsonLd()],
  build: {
    target: 'es2022',
    cssTarget: 'chrome111',
  },
})
