import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { DRIFT_DEFAULTS } from './driftConfig'
import type { DriftConfig } from './driftConfig'

export type DriftFieldProps = Partial<DriftConfig> & {
  className?: string
  style?: CSSProperties
}

type Plane = {
  sprite: HTMLCanvasElement
  /** Half the sprite's css-px extent: centering offset and wrap margin. */
  half: number
  radius: number
  alpha: number
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

/** Quantization buckets for link stroke state, so we batch instead of restyling per line. */
const W_BINS = 5
const A_BINS = 7
/** Link table is sized for this degree so maxLinks stays live-tunable. */
const DEGREE_CAP = 16
/** Below this opacity a link is considered gone and its slot is released. */
const EPS = 0.004
/** Speed ceiling, as a multiple of a dot's assigned speed, when the governor is off. */
const UNGOVERNED_LIMIT = 8
/**
 * Recently-broken peers remembered per dot. A dot can shed at most `maxLinks`
 * links per hold window, and maxLinks is live up to DEGREE_CAP — so this is
 * sized for the worst case. Any smaller and refractory entries evict one
 * another at high maxLinks, letting pairs reconnect early.
 */
const COOL_SLOTS = DEGREE_CAP + 2

const nextPow2 = (n: number) => {
  let p = 1
  while (p < n) p <<= 1
  return p
}

/** Normalizes any CSS colour to rgb triplet so we can build rgba gradient stops. */
function toRgb(color: string): [number, number, number] {
  const c = document.createElement('canvas')
  c.width = 1
  c.height = 1
  const x = c.getContext('2d')!
  x.fillStyle = '#000000'
  x.fillStyle = color
  x.fillRect(0, 0, 1, 1)
  const d = x.getImageData(0, 0, 1, 1).data
  return [d[0], d[1], d[2]]
}

/**
 * Pre-renders one dot as a soft radial sprite with its opacity and glow baked
 * in, so dots can be blitted with zero canvas state changes.
 */
function makeSprite(
  radius: number,
  alpha: number,
  glow: number,
  rgb: [number, number, number],
  dpr: number,
): HTMLCanvasElement {
  const g0 = clamp01(glow)
  // Sprite grows with glow to leave room for the halo.
  const half = radius * (1.35 + g0 * 3.2)
  const size = Math.max(2, Math.ceil(half * 2 * dpr))
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  const ctx = c.getContext('2d')!
  ctx.scale(dpr, dpr)

  const rgba = (a: number) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`
  const g = ctx.createRadialGradient(half, half, 0, half, half, half)
  const coreIn = (radius * 0.9) / half
  const coreOut = (radius * 1.25) / half
  g.addColorStop(0, rgba(1))
  g.addColorStop(coreIn, rgba(1))
  g.addColorStop(coreOut, rgba(0.34 * g0))
  if (g0 > 0.01) g.addColorStop(lerp(coreOut, 1, 0.45), rgba(0.1 * g0))
  g.addColorStop(1, rgba(0))

  ctx.globalAlpha = alpha
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(half, half, half, 0, Math.PI * 2)
  ctx.fill()
  return c
}

export default function DriftField(props: DriftFieldProps) {
  const { className, style } = props
  const cfg: DriftConfig = { ...DRIFT_DEFAULTS, ...props }
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Live dials are read fresh each frame, so dragging a slider never resets
  // the field. Only the structural ones below are in the effect's deps.
  const live = useRef(cfg)
  live.current = cfg

  const {
    layers,
    density,
    minRadius,
    maxRadius,
    minSpeed,
    maxSpeed,
    minAlpha,
    maxAlpha,
    wander,
    dotGlow,
    color,
  } = cfg

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rgb = toRgb(color)

    let width = 0
    let height = 0
    let raf = 0
    let last = 0
    /*
     * Two independent reasons to pause, ANDed. The IntersectionObserver only
     * fires when intersection actually changes, and a tab switch doesn't move
     * anything — so a single shared flag would be cleared on tab-out and never
     * restored, freezing the field permanently.
     */
    let onScreen = true
    let tabVisible = !document.hidden

    let planes: Plane[] = []
    let count = 0
    // Flat typed-array particle store — no per-dot objects, cache-friendly passes.
    let px = new Float32Array(0)
    let py = new Float32Array(0)
    let vx = new Float32Array(0)
    let vy = new Float32Array(0)
    let turn = new Float32Array(0)
    let plane = new Uint8Array(0)
    let degree = new Uint8Array(0)
    // Bond forces accumulate here in resolveLinks() and are consumed by advance().
    let accX = new Float32Array(0)
    let accY = new Float32Array(0)
    /** Assigned speed before the live `speed` multiplier — what the governor restores. */
    let dotBase = new Float32Array(0)
    /** Depth-scaled force response, so near dots turn as readily as they drift. */
    let dotPullScale = new Float32Array(0)

    // Uniform grid as an intrusive linked list: zero allocation per frame.
    let cell = 0
    let cols = 0
    let rows = 0
    let cellHead = new Int32Array(0)
    let cellNext = new Int32Array(0)

    // Candidate pairs found this frame, before the degree cap is applied.
    let candI = new Int32Array(0)
    let candJ = new Int32Array(0)
    let candTarget = new Float32Array(0)
    let candPrev = new Float32Array(0)
    let candAcc = new Uint8Array(0)
    // Unit axis, separation and core distance, carried so the force can be
    // applied after the degree cap decides which links actually exist.
    let candUx = new Float32Array(0)
    let candUy = new Float32Array(0)
    let candD = new Float32Array(0)
    let candCore = new Float32Array(0)
    /** 1 when the pair already had a table entry when the frame started. */
    let candExisting = new Uint8Array(0)
    let candCount = 0

    /**
     * In-range pairs grow with range², so no fixed capacity is safe once the
     * range dials are opened up. Truncating the scan meant an arbitrary subset
     * of links went unrefreshed each frame — they decayed, were released, then
     * hit their reconnect cooldown, which reads as heavy flicker. Grow instead.
     */
    const growCandidates = () => {
      const next = Math.max(1024, candI.length * 2)
      const gi = new Int32Array(next)
      gi.set(candI)
      candI = gi
      const gj = new Int32Array(next)
      gj.set(candJ)
      candJ = gj
      const gt = new Float32Array(next)
      gt.set(candTarget)
      candTarget = gt
      const gp = new Float32Array(next)
      gp.set(candPrev)
      candPrev = gp
      const ga = new Uint8Array(next)
      ga.set(candAcc)
      candAcc = ga
      const gux = new Float32Array(next)
      gux.set(candUx)
      candUx = gux
      const guy = new Float32Array(next)
      guy.set(candUy)
      candUy = guy
      const gd = new Float32Array(next)
      gd.set(candD)
      candD = gd
      const gc = new Float32Array(next)
      gc.set(candCore)
      candCore = gc
      const gb = new Float32Array(next)
      gb.set(candBorn)
      candBorn = gb
      const ge = new Uint8Array(next)
      ge.set(candExisting)
      candExisting = ge
    }

    // Persistent link opacities, in two ping-ponged open-addressed hash tables.
    // Keyed by the ordered pair id, so a link keeps its identity across frames.
    let tabCap = 0
    let keyCur = new Int32Array(0)
    let strCur = new Float32Array(0)
    let seenCur = new Uint8Array(0)
    let keyNxt = new Int32Array(0)
    let strNxt = new Float32Array(0)
    let seenNxt = new Uint8Array(0)
    /** Sim time at which each link formed, parallel to the strength tables. */
    let bornCur = new Float32Array(0)
    let bornNxt = new Float32Array(0)

    // Refractory memory: per dot, a few recently-broken peers and when each is
    // allowed back. Fixed fan-out, so a check is O(COOL_SLOTS).
    let coolPeer = new Int32Array(0)
    let coolUntil = new Float32Array(0)

    /** Sim clock, advanced with the field so it pauses when the tab does. */
    let simTime = 0
    let candBorn = new Float32Array(0)

    // Segment buffers, one per (width bin, alpha bin). Reused across frames.
    const bins: number[][] = Array.from({ length: W_BINS * A_BINS }, () => [])
    let binWidth = 1
    let binSpan = 1

    /** Linear-probe slot for a key. Safe because the table is never over half full. */
    const findSlot = (keys: Int32Array, key: number) => {
      let h = (Math.imul(key, 2654435761) >>> 0) & (tabCap - 1)
      for (;;) {
        const k = keys[h]
        if (k === key || k === -1) return h
        h = (h + 1) & (tabCap - 1)
      }
    }

    const build = (w: number, h: number) => {
      const scaleX = width ? w / width : 0
      const scaleY = height ? h / height : 0
      const hadDots = count > 0
      width = w
      height = h

      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Farther planes hold more dots — distance packs them together.
      const weights = Array.from({ length: layers }, (_, i) => {
        const t = layers === 1 ? 0 : i / (layers - 1)
        return 1 + t * 2.2
      })
      const weightSum = weights.reduce((a, b) => a + b, 0)
      const budget = Math.max(layers, Math.round(((w * h) / 100000) * density))

      const counts: number[] = []
      const speeds: number[] = []
      planes = weights.map((weight, i) => {
        const t = layers === 1 ? 0 : i / (layers - 1)
        const radius = lerp(maxRadius, minRadius, t)
        const alpha = lerp(maxAlpha, minAlpha, t)
        counts.push(Math.max(1, Math.round((budget * weight) / weightSum)))
        speeds.push(lerp(maxSpeed, minSpeed, t))
        return {
          sprite: makeSprite(radius, alpha, dotGlow, rgb, dpr),
          half: radius * (1.35 + clamp01(dotGlow) * 3.2),
          radius,
          alpha,
        }
      })

      const total = counts.reduce((a, b) => a + b, 0)
      const oldCount = count
      const ox = px
      const oy = py
      const ovx = vx
      const ovy = vy
      const oturn = turn
      const oplane = plane

      count = total
      px = new Float32Array(total)
      py = new Float32Array(total)
      vx = new Float32Array(total)
      vy = new Float32Array(total)
      turn = new Float32Array(total)
      plane = new Uint8Array(total)
      degree = new Uint8Array(total)
      accX = new Float32Array(total)
      accY = new Float32Array(total)
      dotBase = new Float32Array(total)
      dotPullScale = new Float32Array(total)
      cellNext = new Int32Array(total)

      const nearSpeed = speeds[0] || 1
      let k = 0
      for (let i = 0; i < planes.length; i++) {
        for (let j = 0; j < counts[i]; j++, k++) {
          plane[k] = i
          dotPullScale[k] = speeds[i] / nearSpeed
          if (hadDots && k < oldCount && oplane[k] === i) {
            // Preserve motion across resizes, just remap the position.
            px[k] = ox[k] * scaleX
            py[k] = oy[k] * scaleY
            vx[k] = ovx[k]
            vy[k] = ovy[k]
            turn[k] = oturn[k]
            dotBase[k] =
              Math.sqrt(ovx[k] * ovx[k] + ovy[k] * ovy[k]) || speeds[i]
            continue
          }
          const angle = Math.random() * Math.PI * 2
          const v = speeds[i] * (0.55 + Math.random() * 0.9)
          px[k] = Math.random() * w
          py[k] = Math.random() * h
          vx[k] = Math.cos(angle) * v
          vy[k] = Math.sin(angle) * v
          dotBase[k] = v
          turn[k] = (Math.random() * 2 - 1) * wander
        }
      }

      const candCap = total * DEGREE_CAP
      candI = new Int32Array(candCap)
      candJ = new Int32Array(candCap)
      candTarget = new Float32Array(candCap)
      candPrev = new Float32Array(candCap)
      candAcc = new Uint8Array(candCap)
      candUx = new Float32Array(candCap)
      candUy = new Float32Array(candCap)
      candD = new Float32Array(candCap)
      candCore = new Float32Array(candCap)
      candBorn = new Float32Array(candCap)
      candExisting = new Uint8Array(candCap)

      // Half-load factor: accepted links peak near total * DEGREE_CAP / 2.
      tabCap = nextPow2(Math.max(64, total * DEGREE_CAP))
      keyCur = new Int32Array(tabCap).fill(-1)
      strCur = new Float32Array(tabCap)
      seenCur = new Uint8Array(tabCap)
      keyNxt = new Int32Array(tabCap).fill(-1)
      strNxt = new Float32Array(tabCap)
      seenNxt = new Uint8Array(tabCap)
      bornCur = new Float32Array(tabCap)
      bornNxt = new Float32Array(tabCap)
      coolPeer = new Int32Array(total * COOL_SLOTS).fill(-1)
      coolUntil = new Float32Array(total * COOL_SLOTS)
      cell = 0
    }

    /** Grid resolution follows the current max link range, so it can be live. */
    const ensureGrid = (needCell: number) => {
      const target = Math.max(12, needCell)
      if (Math.abs(target - cell) < 0.5) return
      cell = target
      cols = Math.max(1, Math.ceil(width / cell) + 1)
      rows = Math.max(1, Math.ceil(height / cell) + 1)
      cellHead = new Int32Array(cols * rows)
    }

    /** True while this pair is still serving its post-break refractory period. */
    const cooling = (a: number, b: number) => {
      const a0 = a * COOL_SLOTS
      for (let k = a0; k < a0 + COOL_SLOTS; k++) {
        if (coolPeer[k] === b) return coolUntil[k] > simTime
      }
      return false
    }

    /** Records the refractory period on both endpoints, evicting stalest entries. */
    const noteCool = (i: number, j: number, until: number) => {
      for (let pass = 0; pass < 2; pass++) {
        const a = pass === 0 ? i : j
        const b = pass === 0 ? j : i
        const a0 = a * COOL_SLOTS
        let victim = a0
        let stalest = Infinity
        let done = false
        for (let k = a0; k < a0 + COOL_SLOTS; k++) {
          if (coolPeer[k] === b) {
            coolUntil[k] = until
            done = true
            break
          }
          if (coolUntil[k] < stalest) {
            stalest = coolUntil[k]
            victim = k
          }
        }
        if (!done) {
          coolPeer[victim] = b
          coolUntil[victim] = until
        }
      }
    }

    const advance = (dt: number) => {
      simTime += dt
      const s = live.current.speed
      const governed = live.current.governor
      const pulling = live.current.pull > 0
      for (let i = 0; i < count; i++) {
        const t = turn[i] * dt * s
        if (t !== 0) {
          const c = Math.cos(t)
          const sn = Math.sin(t)
          const rvx = vx[i] * c - vy[i] * sn
          vy[i] = vx[i] * sn + vy[i] * c
          vx[i] = rvx
        }
        if (pulling) {
          vx[i] += accX[i] * dt
          vy[i] += accY[i] * dt
        }
        if (governed) {
          // Bonds may steer, but never change how fast a dot travels, which is
          // what keeps size and speed correlated.
          const sp = Math.sqrt(vx[i] * vx[i] + vy[i] * vy[i])
          if (sp > 1e-6) {
            const g = dotBase[i] / sp
            vx[i] *= g
            vy[i] *= g
          }
        } else if (pulling) {
          // Ungoverned, sustained attraction has nothing bounding it. This is a
          // safety clamp only — far looser than the governor, so the runaway is
          // still plainly visible.
          const lim = dotBase[i] * UNGOVERNED_LIMIT
          const sp = Math.sqrt(vx[i] * vx[i] + vy[i] * vy[i])
          if (sp > lim && sp > 1e-6) {
            const g = lim / sp
            vx[i] *= g
            vy[i] *= g
          }
        }
        const half = planes[plane[i]].half
        let x = px[i] + vx[i] * dt * s
        let y = py[i] + vy[i] * dt * s
        if (x < -half) x += width + half * 2
        else if (x > width + half) x -= width + half * 2
        if (y < -half) y += height + half * 2
        else if (y > height + half) y -= height + half * 2
        px[i] = x
        py[i] = y
      }
    }

    /**
     * Finds every in-range pair via the uniform grid. Each unordered pair is
     * visited exactly once by scanning only the forward half of a cell's
     * neighbourhood. No cap applied yet — that needs to know incumbency first.
     */
    const collectCandidates = () => {
      const p = live.current
      const near = Math.max(p.minRange, p.maxRange)
      const far = Math.min(p.minRange, p.maxRange)
      const nPlanes = planes.length
      // Per-plane link range, recomputed each frame so the sliders stay live.
      const ranges: number[] = []
      for (let i = 0; i < nPlanes; i++) {
        ranges.push(lerp(near, far, nPlanes === 1 ? 0 : i / (nPlanes - 1)))
      }
      ensureGrid(near)

      cellHead.fill(-1)
      for (let i = 0; i < count; i++) {
        const cx = Math.min(cols - 1, Math.max(0, (px[i] / cell) | 0))
        const cy = Math.min(rows - 1, Math.max(0, (py[i] / cell) | 0))
        const c = cy * cols + cx
        cellNext[i] = cellHead[c]
        cellHead[c] = i
      }

      // Hysteresis: a fresh link must get this much closer than the distance at
      // which an established one lets go. That gap is what stops the strobing.
      const formFactor = 1 - 0.3 * clamp01(p.resistance)
      const offX = [1, -1, 0, 1]
      const offY = [0, 1, 1, 1]
      candCount = 0

      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          for (let i = cellHead[cy * cols + cx]; i !== -1; i = cellNext[i]) {
            const ri = ranges[plane[i]]
            const ai = planes[plane[i]].alpha
            const xi = px[i]
            const yi = py[i]

            for (let n = -1; n < 4; n++) {
              let j: number
              if (n === -1) {
                j = cellNext[i] // same cell, forward only
              } else {
                const ax = cx + offX[n]
                const ay = cy + offY[n]
                if (ax < 0 || ax >= cols || ay < 0 || ay >= rows) continue
                j = cellHead[ay * cols + ax]
              }

              for (; j !== -1; j = cellNext[j]) {
                if (candCount >= candI.length) growCandidates()
                const dx = px[j] - xi
                const dy = py[j] - yi
                const range = (ri + ranges[plane[j]]) * 0.5
                const d2 = dx * dx + dy * dy
                if (d2 > range * range) continue

                const lo = i < j ? i : j
                const hi = i < j ? j : i
                const key = lo * count + hi
                const slot = findSlot(keyCur, key)
                /*
                 * findSlot returns an EMPTY slot when the key is absent, and
                 * only keyNxt is cleared between frames — strNxt and bornNxt
                 * keep whatever a previous occupant left behind. Reading them
                 * unconditionally made a brand-new pair inherit a stale
                 * strength (so it counted as "established", skipping both the
                 * formation hysteresis and the cooldown) and a stale birth time
                 * (so its hold had often already expired). Check the key.
                 */
                const exists = keyCur[slot] === key
                const prev = exists ? strCur[slot] : 0
                /*
                 * Presence in the table IS the link; strength is only how
                 * visible it is. Defining `established` as `strength > EPS`
                 * meant a link in its first frames — strength still climbing
                 * from zero, which at resistance 1 takes several frames to pass
                 * EPS — was treated as non-existent, re-ran the formation gate,
                 * and could be released by the sweep inside its hold window.
                 */
                const established = exists
                let born = exists ? bornCur[slot] : simTime

                const d = Math.sqrt(d2)
                if (!established) {
                  if (d > range * formFactor) continue
                  // Refractory: this pair broke too recently to reconnect.
                  if (cooling(lo, hi)) continue
                  born = simTime
                }

                // Squared falloff, so links ease in as dots approach.
                const prox = 1 - d / range
                const target =
                  prox * prox * Math.min(ai, planes[plane[j]].alpha) * p.linkAlpha

                candI[candCount] = lo
                candJ[candCount] = hi
                candTarget[candCount] = target
                candPrev[candCount] = prev
                candBorn[candCount] = born
                candExisting[candCount] = exists ? 1 : 0
                candAcc[candCount] = 0
                // Axis points lo -> hi, matching the sign convention below.
                const inv = d > 1e-3 ? 1 / d : 0
                const sgn = lo === i ? 1 : -1
                candUx[candCount] = dx * inv * sgn
                candUy[candCount] = dy * inv * sgn
                candD[candCount] = d
                candCore[candCount] = range * p.core
                candCount++
              }
            }
          }
        }
      }
    }

    /**
     * Applies the degree cap, then eases every link toward its target and
     * rebuilds the persistent table. Links that lost the cap or fell out of
     * range fade out over `resistance` rather than popping.
     */
    const resolveLinks = (dt: number) => {
      const p = live.current
      const maxDeg = Math.max(1, Math.min(DEGREE_CAP, Math.round(p.maxLinks)))
      degree.fill(0)

      // Incumbents claim their slots first, so an established constellation
      // isn't torn apart by a newcomer that happened to be iterated earlier.
      for (let c = 0; c < candCount; c++) {
        if (candExisting[c] === 0) continue
        const i = candI[c]
        const j = candJ[c]
        if (degree[i] >= maxDeg || degree[j] >= maxDeg) continue
        candAcc[c] = 1
        degree[i]++
        degree[j]++
      }
      for (let c = 0; c < candCount; c++) {
        if (candAcc[c] === 1 || candExisting[c] === 1) continue
        const i = candI[c]
        const j = candJ[c]
        if (degree[i] >= maxDeg || degree[j] >= maxDeg) continue
        candAcc[c] = 1
        degree[i]++
        degree[j]++
      }

      const hold = Math.max(0, p.holdMs) / 1000
      const cool = Math.max(0, p.cooldownMs) / 1000

      // Exponential time constant: 15ms at resistance 0, ~0.9s at 1.
      const tau = 0.015 * Math.pow(60, clamp01(p.resistance))
      const rise = 1 - Math.exp(-dt / tau)
      const fall = 1 - Math.exp(-dt / (tau * 1.5)) // let go slower than grab

      keyNxt.fill(-1)
      seenCur.fill(0)
      const pull = p.pull
      if (pull > 0) {
        accX.fill(0)
        accY.fill(0)
      }
      // Linear probing needs headroom; never let the table pass half full.
      const insertCap = tabCap >> 1
      let inserted = 0

      for (let c = 0; c < candCount; c++) {
        const key = candI[c] * count + candJ[c]
        seenCur[findSlot(keyCur, key)] = 1
        const prev = candPrev[c]
        const existing = candExisting[c] === 1
        let target = candAcc[c] === 1 ? candTarget[c] : 0
        // Inside the hold window a link may brighten but never dim — not by
        // drifting apart, and not by losing the degree cap.
        const held = existing && simTime - candBorn[c] < hold
        if (held && target < prev) target = prev
        const s =
          prev + (target - prev) * (target > prev ? rise : fall)

        if (pull > 0 && candAcc[c] === 1 && s > EPS) {
          const core = candCore[c]
          let t = 1
          if (core > 1e-3) {
            // Attract beyond the core, ease through zero at it, push inside it.
            t = (candD[c] - core) / (core * 0.6)
            if (t > 1) t = 1
            else if (t < -1) t = -1
          }
          const w = (s / (p.linkAlpha || 1)) * t * pull
          const i = candI[c]
          const j = candJ[c]
          const fx = candUx[c] * w
          const fy = candUy[c] * w
          accX[i] += fx * dotPullScale[i]
          accY[i] += fy * dotPullScale[i]
          accX[j] -= fx * dotPullScale[j]
          accY[j] -= fy * dotPullScale[j]
        }

        // In range but it lost the degree cap on its first frame: it never
        // formed, so it neither breaks nor earns a refractory window. Recording
        // these as breaks carpet-bombed the cooldown table — thousands per
        // frame at long range — evicting genuine entries from each dot's few
        // slots and blocking real pairs at random. That was the flicker.
        if (!existing && candAcc[c] !== 1) continue

        // A held link is never released, whatever its strength.
        if (!held && s <= EPS && target === 0) {
          noteCool(candI[c], candJ[c], simTime + cool)
          continue
        }
        if (inserted >= insertCap) break
        const slot = findSlot(keyNxt, key)
        keyNxt[slot] = key
        strNxt[slot] = s
        bornNxt[slot] = candBorn[c]
        inserted++
      }

      // Sweep for links that vanished from candidacy entirely (drifted apart or
      // wrapped) and keep fading them so they never blink out.
      for (let s = 0; s < tabCap; s++) {
        const key = keyCur[s]
        if (key === -1 || seenCur[s] === 1) continue
        const born = bornCur[s]
        /*
         * Held links keep their opacity even once out of range, so a pair that
         * drifts apart early still reads as connected for the full window — and
         * critically, they are carried over WITHOUT the EPS release test. That
         * test used to fire on a link's second frame, while its strength was
         * still below EPS on the way up, killing it inside its hold.
         */
        if (simTime - born < hold) {
          if (inserted >= insertCap) break
          const heldSlot = findSlot(keyNxt, key)
          keyNxt[heldSlot] = key
          strNxt[heldSlot] = strCur[s]
          bornNxt[heldSlot] = born
          inserted++
          continue
        }
        const v = strCur[s] * (1 - fall)
        if (v <= EPS) {
          const i = (key / count) | 0
          noteCool(i, key - i * count, simTime + cool)
          continue
        }
        if (inserted >= insertCap) break
        const slot = findSlot(keyNxt, key)
        keyNxt[slot] = key
        strNxt[slot] = v
        bornNxt[slot] = born
        inserted++
      }

      // Ping-pong the tables.
      const tk = keyCur
      keyCur = keyNxt
      keyNxt = tk
      const ts = strCur
      strCur = strNxt
      strNxt = ts
      const tn = seenCur
      seenCur = seenNxt
      seenNxt = tn
      const tb = bornCur
      bornCur = bornNxt
      bornNxt = tb
    }

    /** Files each live link into a (width, alpha) bin so strokes batch. */
    const binLinks = () => {
      const p = live.current
      for (let b = 0; b < bins.length; b++) bins[b].length = 0

      let thin = Infinity
      let wide = 0
      for (const pl of planes) {
        const w = pl.radius * p.linkWidth
        if (w < thin) thin = w
        if (w > wide) wide = w
      }
      binWidth = thin
      binSpan = wide - thin || 1
      // Drop links stretched by a screen wrap rather than drawing across the canvas.
      const maxLen2 = (cell * 2.5) * (cell * 2.5)

      for (let s = 0; s < tabCap; s++) {
        const key = keyCur[s]
        if (key === -1) continue
        const a = strCur[s]
        if (a <= EPS) continue
        const i = (key / count) | 0
        const j = key - i * count
        const dx = px[j] - px[i]
        const dy = py[j] - py[i]
        if (dx * dx + dy * dy > maxLen2) continue

        const w =
          (planes[plane[i]].radius + planes[plane[j]].radius) * 0.5 * p.linkWidth
        const wb = Math.min(W_BINS - 1, (((w - thin) / binSpan) * W_BINS) | 0)
        const ab = Math.min(A_BINS - 1, (clamp01(a) * A_BINS) | 0)
        bins[wb * A_BINS + ab].push(px[i], py[i], px[j], py[j])
      }
    }

    const draw = () => {
      const p = live.current
      ctx.fillStyle = p.background
      ctx.fillRect(0, 0, width, height)

      if (p.connect) {
        ctx.strokeStyle = color
        const glow = clamp01(p.linkGlow)
        // Halo pass first, then the crisp line on top of it.
        const passes = glow > 0.01 ? 2 : 1
        for (let pass = 0; pass < passes; pass++) {
          const halo = passes === 2 && pass === 0
          for (let wb = 0; wb < W_BINS; wb++) {
            // Bin centre, so every line in the bin shares one lineWidth.
            const w = binWidth + ((wb + 0.5) / W_BINS) * binSpan
            for (let ab = 0; ab < A_BINS; ab++) {
              const buf = bins[wb * A_BINS + ab]
              if (buf.length === 0) continue
              const a = (ab + 0.5) / A_BINS
              ctx.lineWidth = halo ? w * (1 + glow * 5) : w
              ctx.globalAlpha = halo ? a * 0.16 * glow : a
              ctx.beginPath()
              for (let k = 0; k < buf.length; k += 4) {
                ctx.moveTo(buf[k], buf[k + 1])
                ctx.lineTo(buf[k + 2], buf[k + 3])
              }
              ctx.stroke()
            }
          }
        }
        ctx.globalAlpha = 1
      }

      for (let i = 0; i < count; i++) {
        const pl = planes[plane[i]]
        const size = pl.half * 2
        ctx.drawImage(pl.sprite, px[i] - pl.half, py[i] - pl.half, size, size)
      }
    }

    const render = (dt: number) => {
      if (live.current.connect) {
        collectCandidates()
        resolveLinks(dt)
        binLinks()
      } else {
        keyCur.fill(-1)
        for (let b = 0; b < bins.length; b++) bins[b].length = 0
      }
      draw()
    }

    const step = (now: number) => {
      raf = requestAnimationFrame(step)
      if (!onScreen || !tabVisible) {
        last = now
        return
      }
      // Clamp so a backgrounded tab doesn't teleport everything on return.
      const dt = Math.min((now - last) / 1000, 1 / 20)
      last = now
      advance(dt)
      render(dt)
    }

    const ro = new ResizeObserver(([entry]) => {
      const box = entry.contentRect
      const w = Math.max(1, Math.round(box.width))
      const h = Math.max(1, Math.round(box.height))
      if (w === width && h === height) return
      build(w, h)
      render(1 / 60)
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
    })
    io.observe(canvas)

    const onVisibility = () => {
      tabVisible = !document.hidden
      // Discard the time spent hidden so the field resumes instead of lurching.
      if (tabVisible) last = performance.now()
    }
    document.addEventListener('visibilitychange', onVisibility)

    build(
      Math.max(1, Math.round(canvas.clientWidth)),
      Math.max(1, Math.round(canvas.clientHeight)),
    )
    render(1 / 60)

    if (!reduced) {
      last = performance.now()
      raf = requestAnimationFrame(step)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [
    layers,
    density,
    minRadius,
    maxRadius,
    minSpeed,
    maxSpeed,
    minAlpha,
    maxAlpha,
    wander,
    dotGlow,
    color,
  ])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
