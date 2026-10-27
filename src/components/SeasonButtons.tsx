import type { Season } from '../types'

const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter']

type Props = {
  active: Season
  onSelect: (season: Season) => void
}

function SeasonButtons({ active, onSelect }: Props) {
  return (
    <div className="season-buttons">
      {SEASONS.map((s) => (
        <button
          key={s}
          className={s === active ? 'season-button active' : 'season-button'}
          onClick={() => onSelect(s)}
        >
          {s}
        </button>
      ))}
    </div>
  )
}

export default SeasonButtons
