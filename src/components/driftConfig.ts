/**
 * Single source of truth for every DriftField dial. The controls panel reads
 * this too. Defaults match the frozen hero in DriftHero.tsx, so the dials rig
 * opens on the shipped look and you tweak outward from there.
 */
export const DRIFT_DEFAULTS = {
  /** Number of discrete depth planes. More = smoother depth, slightly more cost. */
  layers: 6,
  /** Dots per 100 000 css px² (scales with viewport so density feels constant). */
  density: 32,
  /** Radius in css px of the farthest / nearest dots. */
  minRadius: 0.7,
  maxRadius: 2.6,
  /** Base drift speed in css px/s for the farthest / nearest dots. */
  minSpeed: 1.5,
  maxSpeed: 12,
  /** Global multiplier over the above. Live — never rebuilds the field. */
  speed: 1.6,
  /** Opacity of the farthest / nearest dots. */
  minAlpha: 0.33,
  maxAlpha: 1,
  /** How much each dot's heading curves, in radians per second. */
  wander: 0.16,
  /** Soft bloom around each dot, 0 = crisp. Baked into the sprite. */
  dotGlow: 0,

  /** Draw constellation lines between nearby dots. */
  connect: true,
  /** Link distance in css px for the farthest / nearest dots. */
  minRange: 90,
  maxRange: 180,
  /** Line width as a fraction of the pair's mean dot radius. Keep < 1. */
  linkWidth: 0.61,
  /** Overall opacity multiplier for links. */
  linkAlpha: 0.8,
  /** Soft bloom around each link, 0 = crisp. */
  linkGlow: 0,
  /** Soft cap on links per dot — keeps dense clusters from turning into hairballs. */
  maxLinks: 6,
  /**
   * How stubbornly a link holds its state, 0..1. Drives both a time constant on
   * every link's opacity and a hysteresis gap between forming and breaking, so
   * constellations hold their shape instead of strobing.
   */
  resistance: 1,

  /* ── Bond dynamics ───────────────────────────────────────────────────────
     A link tugs both endpoints along its axis, weighted by the link's own
     opacity, so bright (close) bonds pull harder. Set pull to 0 for the
     original read-only links.                                              */

  /** Peak steering acceleration in css px/s², applied to a near-plane dot. */
  pull: 14,
  /**
   * Short-range floor, as a fraction of a pair's link range. Beyond ~1.6x this
   * the force is pure attraction; inside it eases through zero and turns
   * repulsive. 0 disables it — which looks fine for a minute, then aggregates
   * until dots visibly overlap.
   */
  core: 0.18,
  /**
   * Renormalise each dot back to its assigned speed every step, so bonds steer
   * but never accelerate. Turn this off to see why it exists: near dots decay
   * to ~0.45x and far dots overshoot to ~1.34x, and the size↔speed depth cue
   * — the whole premise — falls apart.
   */
  governor: true,

  /* ── Anti-flicker hysteresis ─────────────────────────────────────────────
     Opacity easing smooths each transition; these bound how OFTEN a given pair
     may transition at all, which is what actually stops twinkling.           */

  /** Once formed, a link may not dim or be released for this long (ms). */
  holdMs: 3000,
  /** Once broken, that exact pair may not reconnect for this long (ms). */
  cooldownMs: 3000,

  color: '#91f9f7',
  background: '#141414',
}

export type DriftConfig = typeof DRIFT_DEFAULTS
