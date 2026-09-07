import { createRoot, hydrateRoot } from 'react-dom/client'
import AppRoot from './AppRoot'
import { resolveRoute } from './lib/routes'
import './styles/global.css'

const container = document.getElementById('root')
if (!container) throw new Error('Missing #root element')

const route = resolveRoute(window.location.pathname, import.meta.env.BASE_URL)

const tree = <AppRoot initialRoute={route} />

if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
