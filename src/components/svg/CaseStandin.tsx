import type { ImageRef } from '../../content/types'
import './CaseStandin.css'

/**
 * Case imagery stand-ins. Each communicates the intended final content rather
 * than reading as a placeholder box. They are informative, so each exposes the
 * entry's `intent` as its accessible description.
 */
export default function CaseStandin({ image }: { image: ImageRef }) {
  const titleId = `standin-${image.standin}-title`
  const descId = `standin-${image.standin}-desc`
  const common = {
    className: 'standin',
    role: 'img' as const,
    'aria-labelledby': `${titleId} ${descId}`,
  }

  if (image.standin === 'ocean') {
    return (
      <svg {...common} viewBox="0 0 320 200">
        <title id={titleId}>Underwater video analysis frame</title>
        <desc id={descId}>{image.intent}</desc>
        <rect className="standin__plate" x="0" y="0" width="320" height="200" />
        {/* Depth banding, standing in for a seabed video frame */}
        {[0, 1, 2, 3].map((i) => (
          <rect
            className="standin__band"
            key={i}
            x="0"
            y={40 + i * 40}
            width="320"
            height="40"
            opacity={0.1 + i * 0.06}
          />
        ))}
        {/* Detections */}
        <g className="standin__det">
          <rect x="42" y="66" width="52" height="38" />
          <text className="standin__tag" x="44" y="61">
            0.94
          </text>
          <rect x="146" y="98" width="40" height="30" />
          <text className="standin__tag" x="148" y="93">
            0.88
          </text>
          <rect x="222" y="58" width="46" height="34" />
          <text className="standin__tag" x="224" y="53">
            0.71
          </text>
        </g>
        {/* Species markers */}
        {[68, 166, 245].map((x, i) => (
          <circle className="standin__marker" key={x} cx={x} cy={85 + i * 12} r="3" />
        ))}
        {/* Timeline */}
        <rect className="standin__timeline" x="0" y="170" width="320" height="30" />
        <path className="standin__axis" d="M12 185h296" />
        {Array.from({ length: 24 }, (_, i) => (
          <path
            className="standin__tick"
            key={i}
            d={`M${14 + i * 12.7} 181v8`}
            opacity={i % 4 === 0 ? 0.9 : 0.4}
          />
        ))}
        <rect className="standin__playhead" x="118" y="176" width="3" height="18" />
      </svg>
    )
  }

  if (image.standin === 'flow-network') {
    return (
      <svg {...common} viewBox="0 0 320 200">
        <title id={titleId}>Wastewater flow network</title>
        <desc id={descId}>{image.intent}</desc>
        <rect className="standin__plate" x="0" y="0" width="320" height="200" />
        {/* Network */}
        <path
          className="standin__pipe"
          d="M24 150h44l26 -40h48l26 42h44l24 -34h32"
        />
        <path className="standin__pipe standin__pipe--branch" d="M94 110V64h60" />
        {/* Pump nodes */}
        {[
          [68, 150],
          [142, 110],
          [216, 152],
          [268, 118],
        ].map(([x, y]) => (
          <rect
            className="standin__pump"
            key={`${x}-${y}`}
            x={x - 7}
            y={y - 7}
            width="14"
            height="14"
          />
        ))}
        {/* One node in an overflow state — marked by shape and label, not colour alone */}
        <g className="standin__overflow">
          <path d="M154 50l9 16h-18z" />
          <text className="standin__tag standin__tag--alert" x="168" y="64">
            OVERFLOW
          </text>
        </g>
        {/* Signal traces */}
        <g className="standin__trace">
          <path d="M24 40q16 -14 32 0t32 0" />
          <path d="M24 26q10 -8 20 4t20 -6 20 8" opacity="0.55" />
        </g>
        <text className="standin__tag" x="24" y="18">
          FLOW ESTIMATE · 1B+ READINGS
        </text>
      </svg>
    )
  }

  if (image.standin === 'rail-measurement') {
    return (
      <svg {...common} viewBox="0 0 320 200">
        <title id={titleId}>Loaded track geometry measurement</title>
        <desc id={descId}>{image.intent}</desc>
        <rect className="standin__plate" x="0" y="0" width="320" height="200" />

        {/* Rails and sleepers converge toward the measurement vehicle. */}
        <path className="standin__rail" d="M24 190L126 96M296 190L194 96" />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const y = 112 + i * 14
          const inset = 108 - i * 17
          return (
            <path
              className="standin__sleeper"
              key={i}
              d={`M${inset} ${y}H${320 - inset}`}
            />
          )
        })}

        {/* Track-bound machine and its sensor bar. */}
        <g className="standin__vehicle">
          <path d="M118 48h84l16 44H102z" />
          <rect x="126" y="57" width="28" height="18" />
          <rect x="164" y="57" width="26" height="18" />
          <circle cx="122" cy="96" r="7" />
          <circle cx="198" cy="96" r="7" />
          <path d="M106 106h108" />
        </g>

        {/* Measured points and live geometry trace. */}
        <g className="standin__scan">
          <path d="M126 106l-18 35M160 106v46M194 106l18 35" />
          <circle cx="108" cy="141" r="3" />
          <circle cx="160" cy="152" r="3" />
          <circle cx="212" cy="141" r="3" />
        </g>
        <path
          className="standin__measure-trace"
          d="M20 31h22l8 -7 10 15 12 -10 13 2h17"
        />
        <text className="standin__tag" x="20" y="18">
          TRACK GEOMETRY · LIVE
        </text>

        {/* Compact field report output. */}
        <g className="standin__report">
          <rect x="232" y="18" width="70" height="54" />
          <path d="M240 31h38M240 41h54M240 51h44M240 61h50" />
          <rect x="284" y="26" width="10" height="8" />
        </g>
      </svg>
    )
  }

  return (
    <svg {...common} viewBox="0 0 320 200">
      <title id={titleId}>Vessel cargo cross-section</title>
      <desc id={descId}>{image.intent}</desc>
      <rect className="standin__plate" x="0" y="0" width="320" height="200" />
      {/* Hull */}
      <path className="standin__hull" d="M16 62h224l32 62H44z" />
      {/* Tank blocks with fill levels */}
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 34 + i * 42
        const fill = [0.8, 0.55, 0.9, 0.35, 0.6][i]
        return (
          <g key={i}>
            <rect className="standin__tank" x={x} y="72" width="34" height="42" />
            <rect
              className="standin__tank-fill"
              x={x}
              y={72 + 42 * (1 - fill)}
              width="34"
              height={42 * fill}
            />
            <text className="standin__tag" x={x + 17} y="128" textAnchor="middle">
              T{i + 1}
            </text>
          </g>
        )
      })}
      {/* Pump and valve routes */}
      <path className="standin__pipe" d="M34 140h210" />
      {[51, 93, 135, 177, 219].map((x) => (
        <g key={x}>
          <path className="standin__pipe" d={`M${x} 114v26`} />
          <circle className="standin__valve" cx={x} cy={140} r="4" />
        </g>
      ))}
      {/* API output panel */}
      <rect className="standin__panel" x="240" y="150" width="72" height="42" />
      <text className="standin__tag" x="246" y="164">
        API
      </text>
      <path className="standin__axis" d="M246 170h60M246 178h44M246 186h52" />
      <path className="standin__pipe standin__pipe--branch" d="M244 140h32v10" />
    </svg>
  )
}
