import { tacksForSeason } from '../data/seasons'
import type { Season } from '../types'
import Tack from './Tack'

type Props = {
  season: Season
}

function MapBoard({ season }: Props) {
  return (
    <main className="board">
      <div className="map">
        <img className="map-image" src="/images/canada-map.svg" alt="Map of Canada" />
        {/* key={season} replaces the tacks instantly when the season changes */}
        <div className="tacks" key={season}>
          {tacksForSeason(season).map((t) => (
            <Tack key={t.id} tack={t} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default MapBoard
