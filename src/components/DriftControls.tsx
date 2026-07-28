import { useState } from 'react'
import { DRIFT_DEFAULTS } from './driftConfig'
import type { DriftConfig } from './driftConfig'
import './DriftControls.css'

type NumKey = {
  [K in keyof DriftConfig]: DriftConfig[K] extends number ? K : never
}[keyof DriftConfig]

type BoolKey = {
  [K in keyof DriftConfig]: DriftConfig[K] extends boolean ? K : never
}[keyof DriftConfig]

type Dial = {
  key: NumKey
  label: string
  min: number
  max: number
  step: number
  /** Shown under the label when the value needs context. */
  hint?: string
}

type Check = { key: BoolKey; label: string; hint?: string }
type Group = { title: string; dials: Dial[]; checks?: Check[] }

const GROUPS: Group[] = [
  {
    title: 'Motion',
    dials: [
      { key: 'speed', label: 'Speed', min: 0, max: 4, step: 0.01 },
      { key: 'wander', label: 'Wander', min: 0, max: 1, step: 0.005, hint: 'how much paths curve' },
      { key: 'maxSpeed', label: 'Near speed', min: 0, max: 40, step: 0.5 },
      { key: 'minSpeed', label: 'Far speed', min: 0, max: 40, step: 0.5 },
    ],
  },
  {
    title: 'Depth',
    dials: [
      { key: 'density', label: 'Density', min: 2, max: 90, step: 1, hint: 'dots per 100k px²' },
      { key: 'layers', label: 'Planes', min: 1, max: 12, step: 1 },
      { key: 'maxRadius', label: 'Near size', min: 0.3, max: 8, step: 0.1 },
      { key: 'minRadius', label: 'Far size', min: 0.2, max: 8, step: 0.1 },
      { key: 'maxAlpha', label: 'Near opacity', min: 0.05, max: 1, step: 0.01 },
      { key: 'minAlpha', label: 'Far opacity', min: 0.02, max: 1, step: 0.01 },
    ],
  },
  {
    title: 'Constellations',
    dials: [
      { key: 'resistance', label: 'Resistance', min: 0, max: 1, step: 0.01, hint: 'how stubbornly links hold' },
      { key: 'maxLinks', label: 'Max links / dot', min: 1, max: 16, step: 1 },
      { key: 'maxRange', label: 'Near reach', min: 10, max: 400, step: 2 },
      { key: 'minRange', label: 'Far reach', min: 10, max: 400, step: 2 },
      { key: 'linkWidth', label: 'Line width', min: 0.05, max: 1.2, step: 0.01, hint: 'fraction of dot radius' },
      { key: 'linkAlpha', label: 'Line opacity', min: 0, max: 1, step: 0.01 },
    ],
  },
  {
    title: 'Bonds',
    dials: [
      { key: 'pull', label: 'Pull', min: 0, max: 80, step: 0.5, hint: '0 = links only observe' },
      { key: 'core', label: 'Core spacing', min: 0, max: 0.6, step: 0.01, hint: 'personal space; 0 aggregates' },
      { key: 'holdMs', label: 'Min hold', min: 0, max: 4000, step: 50, hint: 'ms a new link cannot dim' },
      { key: 'cooldownMs', label: 'Reconnect lockout', min: 0, max: 4000, step: 50, hint: 'ms before a pair may re-link' },
    ],
    checks: [
      { key: 'governor', label: 'Speed governor', hint: 'off: depth cue breaks down' },
    ],
  },
  {
    title: 'Glow',
    dials: [
      { key: 'dotGlow', label: 'Dot glow', min: 0, max: 1, step: 0.01 },
      { key: 'linkGlow', label: 'Link glow', min: 0, max: 1, step: 0.01 },
    ],
  },
]

const fmt = (v: number, step: number) =>
  step >= 1 ? String(Math.round(v)) : v.toFixed(step >= 0.1 ? 1 : 2)

export type DriftControlsProps = {
  value: DriftConfig
  onChange: (next: DriftConfig) => void
}

export default function DriftControls({ value, onChange }: DriftControlsProps) {
  const [open, setOpen] = useState(true)
  const [copied, setCopied] = useState(false)

  const set = <K extends keyof DriftConfig>(key: K, v: DriftConfig[K]) =>
    onChange({ ...value, [key]: v })

  const copyProps = async () => {
    const changed = (Object.keys(DRIFT_DEFAULTS) as (keyof DriftConfig)[])
      .filter((k) => value[k] !== DRIFT_DEFAULTS[k])
      .map((k) =>
        typeof value[k] === 'string'
          ? `  ${k}="${value[k]}"`
          : `  ${k}={${JSON.stringify(value[k])}}`,
      )
    const jsx = changed.length
      ? `<DriftField\n${changed.join('\n')}\n/>`
      : '<DriftField />'
    try {
      await navigator.clipboard.writeText(jsx)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <aside className={`dc${open ? '' : ' dc--closed'}`}>
      <header className="dc__bar">
        <button
          type="button"
          className="dc__toggle"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="dc__chevron" aria-hidden="true">
            {open ? '−' : '+'}
          </span>
          Dials
        </button>
        {open && (
          <div className="dc__bar-actions">
            <button type="button" className="dc__ghost" onClick={copyProps}>
              {copied ? 'Copied' : 'Copy JSX'}
            </button>
            <button
              type="button"
              className="dc__ghost"
              onClick={() => onChange({ ...DRIFT_DEFAULTS })}
            >
              Reset
            </button>
          </div>
        )}
      </header>

      {open && (
        <div className="dc__body">
          <section className="dc__group">
            <h3 className="dc__title">Colour</h3>
            <label className="dc__swatch">
              <input
                type="color"
                value={value.color}
                onChange={(e) => set('color', e.target.value)}
              />
              <span>Foreground</span>
              <code>{value.color}</code>
            </label>
            <label className="dc__swatch">
              <input
                type="color"
                value={value.background}
                onChange={(e) => set('background', e.target.value)}
              />
              <span>Background</span>
              <code>{value.background}</code>
            </label>
            <label className="dc__check">
              <input
                type="checkbox"
                checked={value.connect}
                onChange={(e) => set('connect', e.target.checked)}
              />
              <span>Draw links</span>
            </label>
          </section>

          {GROUPS.map((group) => (
            <section className="dc__group" key={group.title}>
              <h3 className="dc__title">{group.title}</h3>
              {group.dials.map((d) => (
                <label className="dc__dial" key={d.key}>
                  <span className="dc__label">
                    {d.label}
                    <code>{fmt(value[d.key], d.step)}</code>
                  </span>
                  <input
                    type="range"
                    min={d.min}
                    max={d.max}
                    step={d.step}
                    value={value[d.key]}
                    onChange={(e) => set(d.key, Number(e.target.value))}
                  />
                  {d.hint && <small className="dc__hint">{d.hint}</small>}
                </label>
              ))}
              {group.checks?.map((c) => (
                <label className="dc__check" key={c.key}>
                  <input
                    type="checkbox"
                    checked={value[c.key]}
                    onChange={(e) => set(c.key, e.target.checked)}
                  />
                  <span>
                    {c.label}
                    {c.hint && <small className="dc__hint">{c.hint}</small>}
                  </span>
                </label>
              ))}
            </section>
          ))}
        </div>
      )}
    </aside>
  )
}
