import type { CSSProperties } from 'react'
import type { Season } from '../types'

type Props = {
  season: Season
}

// Spread values out evenly without Math.random, so a redraw never moves them.
const spread = (i: number, count: number) => (i * 100) / count + ((i * 37) % 7)
const pick = (i: number, a: number, b: number) => a + ((i * 53) % 100) / 100 * (b - a)

const vars = (v: Record<string, string | number>) => v as CSSProperties

const GRASS_GREENS = ['#7fbf6a', '#5fa653', '#98d07f', '#6db55d']

// Each clump is a few curved blades. The offsets are fixed per index (no Math.random).
function Grass() {
  return (
    <>
      {Array.from({ length: 34 }, (_, i) => (
        <svg
          key={i}
          className="grass"
          viewBox="0 0 60 80"
          preserveAspectRatio="none"
          style={vars({
            '--x': `${spread(i, 34)}%`,
            '--delay': `${-pick(i, 0, 3)}s`,
            '--grow': `${(i % 8) * 0.12}s`,
            '--size': `${pick(i + 4, 70, 120)}px`,
            '--height': `${pick(i + 6, 34, 50)}px`,
          })}
        >
          {[-20, -12, -4, 4, 12, 20].map((dx, k) => {
            const lean = ((i + k) % 3 - 1) * 9
            return (
              <path
                key={k}
                d={`M${30 + dx} 80 Q${30 + dx + lean} 45 ${30 + dx + lean * 1.8} ${14 + ((i * 7 + k * 11) % 20)}`}
                stroke={GRASS_GREENS[(i + k) % GRASS_GREENS.length]}
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
            )
          })}
        </svg>
      ))}
    </>
  )
}

// Trees stand still from the start; only their blossoms or leaves grow in.
const BRANCHES = [
  'M100 300 C98 250 104 200 100 140',
  'M101 215 C85 190 60 175 38 150',
  'M100 185 C120 165 145 150 165 118',
  'M100 150 C92 120 82 100 70 70',
  'M62 168 C52 160 44 140 30 128',
  'M133 158 C142 138 160 128 182 124',
  'M100 235 C118 222 138 208 158 192',
  'M99 112 C102 92 112 74 126 52',
]
const CROWN: [number, number, number][] = [
  [38, 150, 14], [30, 126, 11], [60, 172, 9], [165, 118, 14], [182, 124, 10],
  [146, 150, 9], [70, 70, 13], [82, 100, 9], [100, 138, 12], [54, 140, 8],
  [120, 168, 8], [90, 118, 8], [110, 95, 10], [150, 135, 8], [45, 105, 8],
  [158, 192, 12], [140, 208, 9], [126, 52, 12], [114, 74, 9], [136, 72, 9],
  [172, 150, 9], [58, 90, 9], [20, 148, 8], [128, 118, 9], [104, 190, 8],
]
const PINK = ['#f6b6c8', '#fff4f7', '#f6b6c8']
const GREEN = ['#7fbf6a', '#5fa653', '#98d07f']

// x = left edge in vw, h = height in vh. Trees stand in pairs at either side of the board.
const TREES = [
  { kind: 'pink', x: -9, h: 76, flip: false, delay: 0.8 },
  { kind: 'green', x: 4, h: 68, flip: true, delay: 1.6 },
  { kind: 'pink', x: 70, h: 78, flip: true, delay: 2.4 },
  { kind: 'green', x: 83, h: 72, flip: false, delay: 3.2 },
]

function Tree({ kind, x, h, flip, delay }: (typeof TREES)[number]) {
  const colors = kind === 'pink' ? PINK : GREEN
  const grow = kind === 'pink' ? 1 : 1.5
  return (
    <svg
      className="tree"
      viewBox="0 0 200 300"
      style={vars({ '--x': `${x}vw`, '--h': `${h}vh`, '--flip': flip ? -1 : 1 })}
    >
      {BRANCHES.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="#8a6a52"
          strokeWidth={i === 0 ? 9 : 4}
          strokeLinecap="round"
          fill="none"
        />
      ))}
      {CROWN.map(([cx, cy, r], i) => (
        <circle
          key={i}
          className="blossom"
          cx={cx}
          cy={cy}
          r={r * grow}
          fill={colors[i % colors.length]}
          style={vars({ '--t': `${delay + i * 0.2}s` })}
        />
      ))}
    </svg>
  )
}

const FLOWER_COLORS = ['#f26b8a', '#fff', '#ff9f43', '#c77dff']

function Flowers() {
  return (
    <>
      {Array.from({ length: 9 }, (_, i) => (
        <svg
          key={i}
          className="flower"
          viewBox="-20 -20 40 70"
          style={vars({
            '--x': `${spread(i, 9)}%`,
            '--delay': `${-pick(i, 0, 3)}s`,
            '--size': `${pick(i + 5, 50, 90)}px`,
            '--petal': FLOWER_COLORS[i % FLOWER_COLORS.length],
          })}
        >
          <line x1="0" y1="0" x2="0" y2="50" stroke="#4f9a4a" strokeWidth="3" />
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx="0"
              cy="-9"
              rx="5.5"
              ry="9"
              fill="var(--petal)"
              stroke="#555"
              strokeWidth="1"
              transform={`rotate(${a})`}
            />
          ))}
          <circle r="5" fill="#ffd23f" stroke="#555" strokeWidth="1" />
        </svg>
      ))}
    </>
  )
}

const LEAF_COLORS = ['#b3361d', '#d9822b', '#e8b830', '#c24a1a']

// Half of a maple leaf outline (right side, top to stem); the left side is the mirror image.
const HALF_LEAF: [number, number][] = [
  [0, -50], [7, -34], [13, -37], [12, -19], [26, -28], [30, -22], [23, -8],
  [42, -14], [40, -4], [26, 7], [30, 12], [9, 10], [7, 21], [2, 19], [2, 46],
]
const LEAF_PATH =
  'M' +
  [...HALF_LEAF, ...HALF_LEAF.slice(1, -1).reverse().map(([x, y]): [number, number] => [-x, y])]
    .map(([x, y]) => `${x} ${y}`)
    .join(' L') +
  ' Z'

// A few spots around the border where leaves pop out (x, y in %), and which way they drift.
const LEAF_SPOTS = [
  { x: 4, y: 12, dx: 1 },
  { x: 96, y: 30, dx: -1 },
  { x: 8, y: 78, dx: 1 },
  { x: 92, y: 88, dx: -1 },
]

function Leaves() {
  return (
    <>
      {LEAF_SPOTS.flatMap((spot, s) =>
        Array.from({ length: 4 }, (_, k) => {
          const i = s * 4 + k
          return (
            <svg
              key={i}
              className="leaf"
              viewBox="-48 -52 96 100"
              style={vars({
                '--x': `${spot.x}%`,
                '--y': `${spot.y}%`,
                '--dx': `${spot.dx * pick(i, 18, 38)}vw`,
                '--dy': `${pick(i + 2, 12, 34)}vh`,
                '--spin': `${spot.dx * pick(i + 4, 240, 540)}deg`,
                '--delay': `${-pick(i + 1, 0, 6)}s`,
                '--dur': `${pick(i + 6, 5, 8)}s`,
                '--size': `${pick(i, 36, 58)}px`,
              })}
            >
              <path
                d={LEAF_PATH}
                fill={LEAF_COLORS[i % LEAF_COLORS.length]}
                stroke="#5a1f0c"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          )
        }),
      )}
    </>
  )
}

function Snow() {
  return (
    <>
      {Array.from({ length: 24 }, (_, i) => (
        <svg
          key={i}
          className="snowflake"
          viewBox="-10 -10 20 20"
          style={vars({
            '--x': `${spread(i, 24)}%`,
            '--delay': `${-pick(i * 7 + 3, 0, 20)}s`,
            '--dur': `${pick(i + 7, 14, 24)}s`,
            '--drift': `${pick(i * 5 + 1, -22, 22)}vw`,
            '--size': `${pick(i + 2, 18, 34)}px`,
          })}
        >
          {[0, 60, 120].map((a) => (
            <g key={a} transform={`rotate(${a})`} stroke="#8fa5bd" strokeWidth="1.3" strokeLinecap="round">
              <line x1="0" y1="-9" x2="0" y2="9" />
              <polyline points="-2.5,-6.5 0,-4 2.5,-6.5" fill="none" />
              <polyline points="-2.5,6.5 0,4 2.5,6.5" fill="none" />
            </g>
          ))}
          </svg>
        ))}
    </>
  )
}

function SeasonDecor({ season }: Props) {
  return (
    // key={season} makes React replace the shapes on a switch, restarting the animations
    <div className="decor" key={season} aria-hidden="true">
      {season === 'spring' && (
        <>
          {TREES.map((t, i) => (
            <Tree key={i} {...t} />
          ))}
          <Grass />
        </>
      )}
      {season === 'summer' && <Flowers />}
      {season === 'autumn' && <Leaves />}
      {season === 'winter' && <Snow />}
    </div>
  )
}

export default SeasonDecor
