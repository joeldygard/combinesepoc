import { useState } from 'react'
import DriftField from './DriftField'
import DriftControls from './DriftControls'
import { DRIFT_DEFAULTS } from './driftConfig'
import type { DriftConfig } from './driftConfig'
import './DialsLab.css'

/**
 * The tuning rig for the particle field, kept out of the shipped page.
 * Rendered only when `import.meta.env.DEV` is true, so the bundler drops it —
 * along with DriftField and DriftControls — from the production build.
 */
export default function DialsLab() {
  const [open, setOpen] = useState(false)
  const [config, setConfig] = useState<DriftConfig>({ ...DRIFT_DEFAULTS })

  if (!open) {
    return (
      <button type="button" className="lab-toggle" onClick={() => setOpen(true)}>
        Field dials
      </button>
    )
  }

  return (
    <div className="lab" role="dialog" aria-label="Particle field tuning rig">
      <div className="lab__canvas" style={{ background: config.background }}>
        <DriftField {...config} />
      </div>
      <DriftControls value={config} onChange={setConfig} />
      <button type="button" className="lab-toggle" onClick={() => setOpen(false)}>
        Close dials
      </button>
    </div>
  )
}
