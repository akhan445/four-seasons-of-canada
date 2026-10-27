import type { CSSProperties } from 'react'
import type { Tack as TackData } from '../types'

type Props = {
  tack: TackData
  index: number // position in the season's list; sets when this tack pins itself
}

function Tack({ tack, index }: Props) {
  // Tacks in the left half of the map fly in from the left of the page, the rest from the right.
  const fromX = tack.x < 50 ? '-60vw' : '60vw'

  return (
    <button
      className="tack"
      style={
        {
          left: `${tack.x}%`,
          top: `${tack.y}%`,
          '--from-x': fromX,
          '--delay': `${0.3 + index * 0.45}s`,
        } as CSSProperties
      }
      aria-label={tack.items[0].title}
    >
      <svg viewBox="0 0 24 32" width="100%" height="100%">
        <path d="M12 16 L12 31" stroke="#777" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="10" r="9" fill="#d8402f" stroke="#7b1d12" strokeWidth="1.5" />
        <circle cx="9" cy="7" r="2.5" fill="#fff" opacity="0.6" />
      </svg>
    </button>
  )
}

export default Tack
