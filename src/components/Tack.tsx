import type { Tack as TackData } from '../types'

type Props = {
  tack: TackData
}

function Tack({ tack }: Props) {
  return (
    <button
      className="tack"
      style={{ left: `${tack.x}%`, top: `${tack.y}%` }}
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
