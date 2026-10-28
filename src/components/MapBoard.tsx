import { tacksForSeason } from '../data/seasons'
import type { Season } from '../types'
import Tack from './Tack'
import TackCard from './TackCard'
import { assetUrl } from '../lib/assetUrl'

type Props = {
  season: Season
  hoveredTackId: string | null
  lockedTackId: string | null
  itemIndex: number
  onHover: (id: string | null) => void
  onClickTack: (id: string) => void
  onNext: () => void
  onClose: () => void
}

function MapBoard({
  season,
  hoveredTackId,
  lockedTackId,
  itemIndex,
  onHover,
  onClickTack,
  onNext,
  onClose,
}: Props) {
  const seasonTacks = tacksForSeason(season)
  // A locked card wins over a hover card, so only one card is ever open.
  const openId = lockedTackId ?? hoveredTackId
  const openTack = seasonTacks.find((t) => t.id === openId)

  return (
    <main className="board">
      <div className="map">
        <img className="map-image" src={assetUrl('/images/canada-map.svg')} alt="Map of Canada" />
        {/* key={season} replaces the tacks instantly when the season changes */}
        <div className="tacks" key={season}>
          {seasonTacks.map((t, i) => (
            <Tack
              key={t.id}
              tack={t}
              index={i}
              activated={t.id === lockedTackId}
              onHover={onHover}
              onClick={onClickTack}
            />
          ))}
          {openTack && (
            <TackCard
              key={openTack.id}
              tack={openTack}
              itemIndex={openTack.id === lockedTackId ? itemIndex : 0}
              locked={openTack.id === lockedTackId}
              onNext={onNext}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default MapBoard
