import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'

/* ────────────────────────────────────────────────────────────────────────────
   DriftHero — the frozen, production cut of DriftField.
   Every dial is a compile-time constant, which buys optimisations the tunable
   version can't have: pair-wise maths is precomputed into 6×6 lookup tables,
   per-dot rotation is precomputed against a fixed timestep (no trig in the hot
   loop), and links live in fixed-degree adjacency slots instead of a hash table.

   Baked settings — edit DriftField + DriftControls if you want to tune by hand:
     density 32 · minRadius 0.7 · maxSpeed 12 · speed 1.6 · minAlpha 0.33
     wander 0.16 · dotGlow 0 · range 90–180 · linkWidth 0.61
     linkAlpha 0.8 · linkGlow 0 · maxLinks 6 · resistance 1 · pull 14
     core 0.18 · hold 3s · cooldown 3s · color #91f9f7 on #141414
   ──────────────────────────────────────────────────────────────────────────── */

const PLANES = 6
const DENSITY = 32
const R_NEAR = 2.6
const R_FAR = 0.7
const V_NEAR = 12
const V_FAR = 1.5
const SPEED = 1.6
const A_NEAR = 1
const A_FAR = 0.33
const WANDER = 0.16
const DOT_GLOW = 0
const RANGE_NEAR = 180
const RANGE_FAR = 90
const LINK_WIDTH = 0.61
const LINK_ALPHA = 0.8
const LINK_GLOW = 0
const MAX_LINKS = 6
const RESISTANCE = 1
/**
 * Molecular soup. A link tugs both endpoints along its axis, weighted by the
 * link's own opacity, so bright (close) bonds pull harder. PULL is the peak
 * acceleration in css px/s² applied to a near-plane dot.
 *
 * The force only ever steers — see the governor in `advance()`, which restores
 * each dot's assigned speed afterwards. Without that, near dots decelerate to
 * ~0.45x and far dots overshoot to ~1.34x, which destroys the size↔speed depth
 * cue the whole effect rests on.
 */
const PULL = 14
/**
 * Short-range core, as a fraction of a pair's link range. Beyond ~1.6x this the
 * force is pure attraction; inside it eases through zero and turns repulsive.
 * Net attraction alone is an aggregating process: over ten minutes it drives the
 * closest pair to ~1px (visibly overlapping glows). This keeps a floor under the
 * spacing while leaving the mid-range behaviour untouched.
 */
const CORE = 0.18
/**
 * Anti-flicker hysteresis, in seconds.
 *
 * HOLD: once formed, a link may not dim or be released for this long — not by
 * drifting out of range, and not by losing the degree cap.
 * COOLDOWN: once broken, that exact pair may not reconnect for this long.
 *
 * Together they put a floor of HOLD + COOLDOWN on any single pair's on/off
 * cycle, which is what actually kills twinkling. Opacity easing alone only
 * smooths each transition; it does nothing about their frequency.
 */
const HOLD = 3
const COOLDOWN = 3
/**
 * Recently-broken peers remembered per dot. A dot can shed at most MAX_LINKS
 * links per HOLD window, so this must be >= MAX_LINKS or the refractory entries
 * evict each other and pairs reconnect early, breaking the cooldown guarantee.
 */
const COOL_SLOTS = MAX_LINKS + 2
const FG = '#91f9f7'
const BG = '#141414'

/** Opacity time constant, and the hysteresis gap between forming and breaking. */
const TAU = 0.015 * Math.pow(60, RESISTANCE)
const FORM = 1 - 0.3 * RESISTANCE
/** Below this opacity a link is released. */
const EPS = 0.004
/** Sprite extent as a multiple of dot radius, widened to fit the glow. */
const SPRITE_K = 1.35 + DOT_GLOW * 3.2

/** Stroke batching. Alpha-major so the glow pass can walk contiguous ranges. */
const W_BINS = 4
const A_BINS = 6
const N_BINS = W_BINS * A_BINS
const HALO_GROUPS = A_BINS / 2

/**
 * Quality ladder. `scale` multiplies the backing-store resolution, `step` is the
 * fixed simulation/render period, `halo` toggles the link bloom pass. Index 0 is
 * best; the runtime only ever walks downward, so it can never oscillate.
 */
const TIERS = [
  { scale: 1, step: 1 / 60, halo: true },
  { scale: 0.82, step: 1 / 60, halo: true },
  { scale: 0.72, step: 1 / 30, halo: true },
  { scale: 0.6, step: 1 / 30, halo: false },
] as const

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/** Hex → rgb, so gradient stops need no DOM round-trip. */
function hexRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const s = h.length === 3 ? h[0] + h[0] + h[1] + h[1] + h[2] + h[2] : h
  const n = parseInt(s, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const RGB = hexRgb(FG)
const rgba = (a: number) => `rgba(${RGB[0]},${RGB[1]},${RGB[2]},${a})`

/** One dot, pre-rendered with opacity and glow baked in. Blitted with no state changes. */
function makeSprite(radius: number, alpha: number, dpr: number) {
  const half = radius * SPRITE_K
  const size = Math.max(2, Math.ceil(half * 2 * dpr))
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  const ctx = c.getContext('2d')!
  ctx.scale(dpr, dpr)
  const g = ctx.createRadialGradient(half, half, 0, half, half, half)
  const coreIn = (radius * 0.9) / half
  const coreOut = (radius * 1.25) / half
  g.addColorStop(0, rgba(1))
  g.addColorStop(coreIn, rgba(1))
  g.addColorStop(coreOut, rgba(0.34 * DOT_GLOW))
  g.addColorStop(lerp(coreOut, 1, 0.45), rgba(0.1 * DOT_GLOW))
  g.addColorStop(1, rgba(0))
  ctx.globalAlpha = alpha
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(half, half, half, 0, Math.PI * 2)
  ctx.fill()
  return c
}

/* ── Per-plane and per-plane-pair constants, resolved once at module load ──── */

const planeT: number[] = []
const planeR = new Float32Array(PLANES)
const planeA = new Float32Array(PLANES)
const planeV = new Float32Array(PLANES)
const planeHalf = new Float32Array(PLANES)
const planeWeight = new Float32Array(PLANES)
let weightSum = 0
for (let i = 0; i < PLANES; i++) {
  const t = i / (PLANES - 1)
  planeT.push(t)
  planeR[i] = lerp(R_NEAR, R_FAR, t)
  planeA[i] = lerp(A_NEAR, A_FAR, t)
  // Depth speed and the global multiplier fold together here, so the
  // integration loop is a plain multiply-add.
  planeV[i] = lerp(V_NEAR, V_FAR, t) * SPEED
  planeHalf[i] = planeR[i] * SPRITE_K
  planeWeight[i] = 1 + t * 2.2 // farther planes pack more dots
  weightSum += planeWeight[i]
}

// Everything a pair of planes needs, indexed a * PLANES + b. Collapses the
// inner loop's per-pair maths to a handful of array reads.
const pairRange2 = new Float32Array(PLANES * PLANES)
const pairForm2 = new Float32Array(PLANES * PLANES)
const pairInvRange = new Float32Array(PLANES * PLANES)
const pairAlpha = new Float32Array(PLANES * PLANES)
const pairBin = new Uint8Array(PLANES * PLANES)
const pairCore = new Float32Array(PLANES * PLANES)
const binLineWidth = new Float32Array(W_BINS)
{
  const w = new Float32Array(PLANES * PLANES)
  let wMin = Infinity
  let wMax = 0
  for (let a = 0; a < PLANES; a++) {
    for (let b = 0; b < PLANES; b++) {
      const k = a * PLANES + b
      const range =
        (lerp(RANGE_NEAR, RANGE_FAR, planeT[a]) +
          lerp(RANGE_NEAR, RANGE_FAR, planeT[b])) *
        0.5
      pairRange2[k] = range * range
      pairForm2[k] = range * FORM * (range * FORM)
      pairInvRange[k] = 1 / range
      pairCore[k] = range * CORE
      // The link-opacity multiplier folds in linkAlpha too.
      pairAlpha[k] = Math.min(planeA[a], planeA[b]) * LINK_ALPHA
      w[k] = (planeR[a] + planeR[b]) * 0.5 * LINK_WIDTH
      if (w[k] < wMin) wMin = w[k]
      if (w[k] > wMax) wMax = w[k]
    }
  }
  const span = wMax - wMin || 1
  const sum = new Float32Array(W_BINS)
  const cnt = new Int32Array(W_BINS)
  for (let k = 0; k < w.length; k++) {
    const b = Math.min(W_BINS - 1, (((w[k] - wMin) / span) * W_BINS) | 0)
    pairBin[k] = b
    sum[b] += w[k]
    cnt[b]++
  }
  // Representative width = mean of the widths actually in the bin.
  for (let b = 0; b < W_BINS; b++) {
    binLineWidth[b] = cnt[b] ? sum[b] / cnt[b] : lerp(wMin, wMax, (b + 0.5) / W_BINS)
  }
}
/** Halo stroke width: one value for all links — the bloom is too diffuse to tell apart. */
const HALO_WIDTH = ((binLineWidth[0] + binLineWidth[W_BINS - 1]) * 0.5) * (1 + LINK_GLOW * 5)

export type DriftHeroProps = {
  className?: string
  style?: CSSProperties
}

export default function DriftHero({ className, style }: DriftHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true })
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rawDpr = Math.min(window.devicePixelRatio || 1, 2)

    // Start conservatively on hardware that is likely to struggle; the ladder
    // below only descends, so a wrong guess costs quality, never smoothness.
    const cores = navigator.hardwareConcurrency || 4
    const coarse = window.matchMedia('(pointer: coarse)').matches
    let tier = 0
    if (coarse) tier++
    if (cores <= 4) tier++
    if ((window.devicePixelRatio || 1) > 2.5) tier++
    if (tier > 2) tier = 2

    let width = 0
    let height = 0
    let raf = 0
    /*
     * Two independent reasons to pause, ANDed. They must stay separate: the
     * IntersectionObserver only fires when the element's intersection actually
     * changes, and switching tabs doesn't move anything. Folding both into one
     * flag means `visibilitychange` clears it on tab-out and nothing ever sets
     * it back — the animation latches off for good.
     */
    let onScreen = true
    let tabVisible = !document.hidden

    let sprites: HTMLCanvasElement[] = []
    let spriteDpr = 0
    let count = 0

    // Flat particle store. dotHalf and dotPlane are denormalised per dot so the
    // hot loops never chase a second indirection.
    let px = new Float32Array(0)
    let py = new Float32Array(0)
    let vx = new Float32Array(0)
    let vy = new Float32Array(0)
    let rotC = new Float32Array(0)
    let rotS = new Float32Array(0)
    let turn = new Float32Array(0)
    let dotHalf = new Float32Array(0)
    let dotPlane = new Uint8Array(0)
    // Link forces accumulate here during relink() and are consumed by advance().
    let accX = new Float32Array(0)
    let accY = new Float32Array(0)
    /** The speed the governor restores each step — this dot's share of its plane. */
    let dotSpeed = new Float32Array(0)
    /** Depth-scaled force response, so near dots turn as readily as they drift. */
    let dotPull = new Float32Array(0)

    // Uniform grid, intrusive linked list. Cell size is the constant max range.
    let cols = 0
    let rows = 0
    let cellHead = new Int32Array(0)
    const CELL = RANGE_NEAR
    let cellNext = new Int32Array(0)

    /**
     * Fixed-degree adjacency. Each dot owns MAX_LINKS slots holding a peer index
     * and that link's opacity; both endpoints keep a mirrored copy. A lookup is
     * a scan of three, the degree cap holds by construction, and incumbency is
     * automatic — a slot's owner keeps it until the link actually fades out.
     * No hashing, no probing, no whole-table sweep.
     */
    let peer = new Int32Array(0)
    let str = new Float32Array(0)
    let fresh = new Uint8Array(0)
    let slotBin = new Uint8Array(0)
    /** Sim time at which each slot's link formed, for the HOLD window. */
    let slotBorn = new Float32Array(0)

    // Refractory memory: per dot, a few recently-broken peers and when each is
    // allowed back. Small fixed fan-out, so checking it is O(COOL_SLOTS).
    let coolPeer = new Int32Array(0)
    let coolUntil = new Float32Array(0)

    /** Fixed-step clock. Advances with the sim, so it pauses when the tab does. */
    let simTime = 0

    // Segments, counting-sorted into one buffer by (alpha, width) bin.
    let seg = new Float32Array(0)
    const binCount = new Int32Array(N_BINS)
    const binStart = new Int32Array(N_BINS)
    const binFill = new Int32Array(N_BINS)
    const groupStart = new Int32Array(HALO_GROUPS)
    const groupEnd = new Int32Array(HALO_GROUPS)

    // Fixed timestep, so per-dot rotation and the easing rates are constants.
    let step = TIERS[tier].step
    let rise = 0
    let fall = 0
    let accum = 0

    const applyRates = () => {
      rise = 1 - Math.exp(-step / TAU)
      fall = 1 - Math.exp(-step / (TAU * 1.5))
      for (let i = 0; i < count; i++) {
        const a = turn[i] * step
        rotC[i] = Math.cos(a)
        rotS[i] = Math.sin(a)
      }
    }

    const resizeBacking = () => {
      const s = rawDpr * TIERS[tier].scale
      canvas.width = Math.max(1, Math.round(width * s))
      canvas.height = Math.max(1, Math.round(height * s))
      ctx.setTransform(s, 0, 0, s, 0, 0)
      // Sprites are rasterised for the current effective density.
      if (Math.abs(s - spriteDpr) > 0.01) {
        spriteDpr = s
        sprites = []
        for (let i = 0; i < PLANES; i++) sprites.push(makeSprite(planeR[i], planeA[i], s))
      }
    }

    const build = (w: number, h: number) => {
      const scaleX = width ? w / width : 0
      const scaleY = height ? h / height : 0
      const had = count > 0
      width = w
      height = h
      resizeBacking()

      const budget = Math.max(PLANES, Math.round(((w * h) / 100000) * DENSITY))
      const counts: number[] = []
      let total = 0
      for (let i = 0; i < PLANES; i++) {
        const n = Math.max(1, Math.round((budget * planeWeight[i]) / weightSum))
        counts.push(n)
        total += n
      }

      const oCount = count
      const ox = px
      const oy = py
      const ovx = vx
      const ovy = vy
      const oturn = turn
      const oplane = dotPlane

      count = total
      px = new Float32Array(total)
      py = new Float32Array(total)
      vx = new Float32Array(total)
      vy = new Float32Array(total)
      rotC = new Float32Array(total)
      rotS = new Float32Array(total)
      turn = new Float32Array(total)
      dotHalf = new Float32Array(total)
      dotPlane = new Uint8Array(total)
      accX = new Float32Array(total)
      accY = new Float32Array(total)
      dotSpeed = new Float32Array(total)
      dotPull = new Float32Array(total)
      cellNext = new Int32Array(total)

      peer = new Int32Array(total * MAX_LINKS).fill(-1)
      str = new Float32Array(total * MAX_LINKS)
      fresh = new Uint8Array(total * MAX_LINKS)
      slotBin = new Uint8Array(total * MAX_LINKS)
      slotBorn = new Float32Array(total * MAX_LINKS)
      coolPeer = new Int32Array(total * COOL_SLOTS).fill(-1)
      coolUntil = new Float32Array(total * COOL_SLOTS)
      seg = new Float32Array(((total * MAX_LINKS) >> 1) * 4 + 4)

      let k = 0
      for (let i = 0; i < PLANES; i++) {
        for (let j = 0; j < counts[i]; j++, k++) {
          dotPlane[k] = i
          dotHalf[k] = planeHalf[i]
          // Near planes respond more strongly, matching how they also drift faster.
          dotPull[k] = PULL * (planeV[i] / planeV[0])
          if (had && k < oCount && oplane[k] === i) {
            // Keep the field's state across a resize; just remap positions.
            px[k] = ox[k] * scaleX
            py[k] = oy[k] * scaleY
            vx[k] = ovx[k]
            vy[k] = ovy[k]
            turn[k] = oturn[k]
            dotSpeed[k] = Math.sqrt(ovx[k] * ovx[k] + ovy[k] * ovy[k]) || planeV[i]
            continue
          }
          const ang = Math.random() * Math.PI * 2
          const v = planeV[i] * (0.55 + Math.random() * 0.9)
          px[k] = Math.random() * w
          py[k] = Math.random() * h
          vx[k] = Math.cos(ang) * v
          vy[k] = Math.sin(ang) * v
          dotSpeed[k] = v
          turn[k] = (Math.random() * 2 - 1) * WANDER * SPEED
        }
      }

      cols = Math.max(1, Math.ceil(w / CELL) + 1)
      rows = Math.max(1, Math.ceil(h / CELL) + 1)
      cellHead = new Int32Array(cols * rows)
      applyRates()
    }

    /** True while this pair is still serving its post-break refractory period. */
    const cooling = (a: number, b: number) => {
      const a0 = a * COOL_SLOTS
      for (let k = a0; k < a0 + COOL_SLOTS; k++) {
        if (coolPeer[k] === b) return coolUntil[k] > simTime
      }
      return false
    }

    /** Records the refractory period on one endpoint, evicting the stalest entry. */
    const noteCool = (a: number, b: number, until: number) => {
      const a0 = a * COOL_SLOTS
      let victim = a0
      let stalest = Infinity
      for (let k = a0; k < a0 + COOL_SLOTS; k++) {
        if (coolPeer[k] === b) {
          coolUntil[k] = until
          return
        }
        if (coolUntil[k] < stalest) {
          stalest = coolUntil[k]
          victim = k
        }
      }
      coolPeer[victim] = b
      coolUntil[victim] = until
    }

    /** Clears both halves of a link and opens the refractory window on the pair. */
    const release = (slot: number, i: number, j: number) => {
      peer[slot] = -1
      const sj0 = j * MAX_LINKS
      for (let t = sj0; t < sj0 + MAX_LINKS; t++) {
        if (peer[t] === i) {
          peer[t] = -1
          break
        }
      }
      const until = simTime + COOLDOWN
      noteCool(i, j, until)
      noteCool(j, i, until)
    }

    /**
     * One fixed step: rotate the heading by a precomputed angle, add the link
     * force, renormalise back to the dot's assigned speed, translate, wrap.
     *
     * The renormalisation is what makes this safe. Direction is fully open to
     * influence; magnitude never moves, so depth stays legible.
     */
    const advance = () => {
      simTime += step
      for (let i = 0; i < count; i++) {
        const c = rotC[i]
        const s = rotS[i]
        const ox = vx[i]
        const oy = vy[i]
        let nx = ox * c - oy * s
        let ny = ox * s + oy * c
        nx += accX[i] * step
        ny += accY[i] * step
        const sp = Math.sqrt(nx * nx + ny * ny)
        if (sp > 1e-6) {
          const g = dotSpeed[i] / sp
          nx *= g
          ny *= g
        }
        vx[i] = nx
        vy[i] = ny
        const half = dotHalf[i]
        let x = px[i] + nx * step
        let y = py[i] + ny * step
        if (x < -half) x += width + half * 2
        else if (x > width + half) x -= width + half * 2
        if (y < -half) y += height + half * 2
        else if (y > height + half) y -= height + half * 2
        px[i] = x
        py[i] = y
      }
    }

    /**
     * Refreshes existing links, forms new ones into free slots, and decays the
     * rest. Pairs are visited exactly once by scanning only the forward half of
     * each cell's neighbourhood.
     */
    const relink = () => {
      cellHead.fill(-1)
      for (let i = 0; i < count; i++) {
        let cx = (px[i] / CELL) | 0
        let cy = (py[i] / CELL) | 0
        if (cx < 0) cx = 0
        else if (cx >= cols) cx = cols - 1
        if (cy < 0) cy = 0
        else if (cy >= rows) cy = rows - 1
        const c = cy * cols + cx
        cellNext[i] = cellHead[c]
        cellHead[c] = i
      }
      fresh.fill(0)
      accX.fill(0)
      accY.fill(0)

      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          for (let i = cellHead[cy * cols + cx]; i !== -1; i = cellNext[i]) {
            const xi = px[i]
            const yi = py[i]
            const si0 = i * MAX_LINKS

            for (let n = -1; n < 4; n++) {
              let j: number
              if (n === -1) {
                j = cellNext[i] // same cell, forward only
              } else {
                // (+1,0) (-1,+1) (0,+1) (+1,+1)
                const ax = cx + (n === 1 ? -1 : n === 2 ? 0 : 1)
                const ay = cy + (n === 0 ? 0 : 1)
                if (ax < 0 || ax >= cols || ay < 0 || ay >= rows) continue
                j = cellHead[ay * cols + ax]
              }

              for (; j !== -1; j = cellNext[j]) {
                const dx = px[j] - xi
                const dy = py[j] - yi
                const d2 = dx * dx + dy * dy
                const pk = dotPlane[i] * PLANES + dotPlane[j]
                if (d2 > pairRange2[pk]) continue

                // Find j among i's slots, remembering a free one on the way.
                let si = -1
                let siFree = -1
                for (let s = si0; s < si0 + MAX_LINKS; s++) {
                  const p = peer[s]
                  if (p === j) {
                    si = s
                    break
                  }
                  if (p === -1 && siFree === -1) siFree = s
                }

                if (si === -1) {
                  // Hysteresis: a new link has to get closer than the distance
                  // at which an established one lets go.
                  if (d2 > pairForm2[pk]) continue
                  if (siFree === -1) continue
                  // Refractory: this pair broke too recently to reconnect.
                  if (cooling(i, j) || cooling(j, i)) continue
                  const sj0 = j * MAX_LINKS
                  let sjFree = -1
                  for (let s = sj0; s < sj0 + MAX_LINKS; s++) {
                    if (peer[s] === -1) {
                      sjFree = s
                      break
                    }
                  }
                  if (sjFree === -1) continue
                  si = siFree
                  peer[si] = j
                  peer[sjFree] = i
                  str[si] = 0
                  str[sjFree] = 0
                  slotBorn[si] = simTime
                  slotBorn[sjFree] = simTime
                }

                // Mirror slot, for keeping both copies in lockstep.
                let sj = -1
                const sj0 = j * MAX_LINKS
                for (let s = sj0; s < sj0 + MAX_LINKS; s++) {
                  if (peer[s] === i) {
                    sj = s
                    break
                  }
                }
                if (sj === -1) {
                  peer[si] = -1
                  continue
                }

                const d = Math.sqrt(d2)
                const prox = 1 - d * pairInvRange[pk]
                let target = prox * prox * pairAlpha[pk]
                const prev = str[si]
                // Inside the HOLD window a link may brighten but never dim.
                if (target < prev && simTime - slotBorn[si] < HOLD) target = prev
                const v = prev + (target - prev) * (target > prev ? rise : fall)
                str[si] = v
                str[sj] = v
                fresh[si] = 1
                fresh[sj] = 1

                // Steering force, weighted by how bright the bond is. Positive
                // pulls together; inside the core it eases through zero and pushes.
                if (d > 1e-3) {
                  const core = pairCore[pk]
                  let t = (d - core) / (core * 0.6)
                  if (t > 1) t = 1
                  else if (t < -1) t = -1
                  const w = (v / LINK_ALPHA) * t
                  const ux = (dx / d) * w
                  const uy = (dy / d) * w
                  accX[i] += ux * dotPull[i]
                  accY[i] += uy * dotPull[i]
                  accX[j] -= ux * dotPull[j]
                  accY[j] -= uy * dotPull[j]
                }
              }
            }
          }
        }
      }

      // Anything not refreshed drifted apart or wrapped: fade it, then release
      // both slots together so a half-link can never be drawn.
      const n = count * MAX_LINKS
      for (let s = 0; s < n; s++) {
        const j = peer[s]
        if (j === -1 || fresh[s] === 1) continue
        // Held links keep their opacity even out of range, so a pair that
        // drifts apart early still reads as connected for the full window.
        if (simTime - slotBorn[s] < HOLD) continue
        const v = str[s] * (1 - fall)
        if (v > EPS) {
          str[s] = v
          continue
        }
        release(s, (s / MAX_LINKS) | 0, j)
      }
    }

    /**
     * Counting-sorts live links into `seg` by bin so each bin strokes as one
     * path. Bins are alpha-major, which leaves the glow pass three contiguous
     * spans to walk instead of re-reading everything.
     */
    const sortSegments = () => {
      binCount.fill(0)
      const n = count * MAX_LINKS
      const invA = A_BINS / LINK_ALPHA // link opacity never exceeds LINK_ALPHA
      const maxLen2 = (CELL * 2.5) * (CELL * 2.5)

      for (let s = 0; s < n; s++) {
        const j = peer[s]
        const i = (s / MAX_LINKS) | 0
        // Only the canonical half of each mirrored pair emits a segment.
        if (j <= i) continue
        const a = str[s]
        if (a <= EPS) continue
        const dx = px[j] - px[i]
        const dy = py[j] - py[i]
        // Drop links stretched by a screen wrap instead of drawing across the canvas.
        if (dx * dx + dy * dy > maxLen2) continue
        let ab = (a * invA) | 0
        if (ab >= A_BINS) ab = A_BINS - 1
        const bin = ab * W_BINS + pairBin[dotPlane[i] * PLANES + dotPlane[j]]
        slotBin[s] = bin + 1 // +1 so 0 means "not drawn this frame"
        binCount[bin]++
      }

      let acc = 0
      for (let b = 0; b < N_BINS; b++) {
        binStart[b] = acc
        binFill[b] = acc
        acc += binCount[b] * 4
      }
      for (let g = 0; g < HALO_GROUPS; g++) {
        const first = g * 2 * W_BINS
        groupStart[g] = binStart[first]
        let end = binStart[first]
        for (let b = first; b < first + 2 * W_BINS; b++) end += binCount[b] * 4
        groupEnd[g] = end
      }

      for (let s = 0; s < n; s++) {
        const tag = slotBin[s]
        if (tag === 0) continue
        slotBin[s] = 0
        const b = tag - 1
        const i = (s / MAX_LINKS) | 0
        const j = peer[s]
        const o = binFill[b]
        seg[o] = px[i]
        seg[o + 1] = py[i]
        seg[o + 2] = px[j]
        seg[o + 3] = py[j]
        binFill[b] = o + 4
      }
    }

    const strokeSpan = (from: number, to: number) => {
      ctx.beginPath()
      for (let o = from; o < to; o += 4) {
        ctx.moveTo(seg[o], seg[o + 1])
        ctx.lineTo(seg[o + 2], seg[o + 3])
      }
      ctx.stroke()
    }

    const draw = () => {
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, width, height)
      ctx.strokeStyle = FG

      if (LINK_GLOW > 0 && TIERS[tier].halo) {
        // Bloom: three wide, faint strokes over contiguous alpha spans.
        ctx.lineWidth = HALO_WIDTH
        for (let g = 0; g < HALO_GROUPS; g++) {
          if (groupEnd[g] === groupStart[g]) continue
          ctx.globalAlpha =
            ((LINK_ALPHA * (g * 2 + 1)) / A_BINS) * 0.16 * LINK_GLOW
          strokeSpan(groupStart[g], groupEnd[g])
        }
      }

      for (let ab = 0; ab < A_BINS; ab++) {
        ctx.globalAlpha = (LINK_ALPHA * (ab + 0.5)) / A_BINS
        for (let wb = 0; wb < W_BINS; wb++) {
          const b = ab * W_BINS + wb
          if (binCount[b] === 0) continue
          ctx.lineWidth = binLineWidth[wb]
          strokeSpan(binStart[b], binStart[b] + binCount[b] * 4)
        }
      }

      ctx.globalAlpha = 1
      for (let i = 0; i < count; i++) {
        const half = dotHalf[i]
        const size = half * 2
        ctx.drawImage(sprites[dotPlane[i]], px[i] - half, py[i] - half, size, size)
      }
    }

    const renderOnce = () => {
      relink()
      sortSegments()
      draw()
    }

    /* ── Adaptive quality ────────────────────────────────────────────────────
       Measured on the interval between rendered frames, which reflects total
       frame cost including rasterisation — CPU timing alone would miss a GPU
       bottleneck. Tiers we leave are locked out, so quality can't oscillate. */
    let lastRender = 0
    let intervalEma = 0
    let framesAtTier = 0
    const lockedOut = new Uint8Array(TIERS.length)

    const applyTier = () => {
      step = TIERS[tier].step
      applyRates()
      resizeBacking()
      intervalEma = 0
      framesAtTier = 0
      lastRender = 0
    }

    const gauge = (now: number) => {
      if (lastRender !== 0) {
        const gap = now - lastRender
        // Ignore stalls (tab switch, GC pause) so one hiccup can't demote us.
        if (gap < 250) {
          intervalEma = intervalEma === 0 ? gap : intervalEma * 0.94 + gap * 0.06
        }
      }
      lastRender = now
      framesAtTier++

      const target = step * 1000
      if (framesAtTier > 90 && intervalEma > target * 1.35 && tier < TIERS.length - 1) {
        lockedOut[tier] = 1
        tier++
        applyTier()
      } else if (
        framesAtTier > 420 &&
        intervalEma > 0 &&
        intervalEma < target * 1.06 &&
        tier > 0 &&
        !lockedOut[tier - 1]
      ) {
        tier--
        applyTier()
      }
    }

    let prev = 0
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!onScreen || !tabVisible) {
        prev = now
        return
      }
      if (prev === 0) prev = now
      // Clamp so a backgrounded tab doesn't teleport the field on return.
      let dt = (now - prev) / 1000
      prev = now
      if (dt > 0.25) dt = 0.25
      accum += dt
      if (accum < step) return // e.g. a 120 Hz panel still renders at 60

      let steps = 0
      while (accum >= step && steps < 2) {
        advance()
        accum -= step
        steps++
      }
      if (accum > step) accum = step
      renderOnce()
      gauge(now)
    }

    /* ── Sizing. Debounced, and small height-only changes are ignored so a
       mobile URL bar sliding away doesn't trigger a rebuild. ─────────────── */
    let resizeTimer = 0
    const ro = new ResizeObserver(([entry]) => {
      const box = entry.contentRect
      const w = Math.max(1, Math.round(box.width))
      const h = Math.max(1, Math.round(box.height))
      if (w === width && h === height) return
      if (width && h !== height && w === width && Math.abs(h - height) < height * 0.2) {
        return
      }
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        if (w === width && h === height) return
        build(w, h)
        renderOnce()
      }, 150)
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
      },
      { rootMargin: '64px' },
    )
    io.observe(canvas)

    const onVisibility = () => {
      tabVisible = !document.hidden
      if (tabVisible) {
        // Discard the time spent hidden so the field resumes instead of
        // lurching, and drop the stale frame-pacing sample.
        prev = 0
        accum = 0
        lastRender = 0
        intervalEma = 0
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    build(
      Math.max(1, Math.round(canvas.clientWidth)),
      Math.max(1, Math.round(canvas.clientHeight)),
    )
    renderOnce()

    if (!reduced) raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
