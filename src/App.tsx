import { useCallback, useEffect, useState } from 'react'
import SeasonButtons from './components/SeasonButtons'
import IntroModal from './components/IntroModal'
import SeasonDecor from './components/SeasonDecor'
import MapBoard from './components/MapBoard'
import type { Season } from './types'
import { getCurrentSeason } from './lib/getCurrentSeason'

function App() {
  const [season, setSeason] = useState<Season>(() => getCurrentSeason(new Date()));
  const [introOpen, setIntroOpen] = useState(true)

  const [hoveredTackId, setHoveredTackId] = useState<string | null>(null)
  const [lockedTackId, setLockedTackId] = useState<string | null>(null)
  const [itemIndex, setItemIndex] = useState(0)

  // Changing season clears any open card, so a card never outlives its tacks.
  const selectSeason = (next: Season) => {
    setSeason(next)
    setHoveredTackId(null)
    setLockedTackId(null)
    setItemIndex(0)
  }

  // Clicking a tack locks its card; opening a different tack starts at its first item.
  const clickTack = (id: string) => {
    if (id !== lockedTackId) setItemIndex(0)
    setLockedTackId(id)
  }

  // useCallback keeps this function the same between redraws, so the click-outside
  // listener isn't removed and re-added on every render.
  const closeCard = useCallback(() => setLockedTackId(null), [])

  useEffect(() => {
    document.documentElement.dataset.season = season
  }, [season])

  return (
    <>
      <SeasonDecor season={season} />
      <header className="page-header">
        <h1>Four Seasons of Canada</h1>
        <div className="page-intro">
          <p className="blurb">
            Explore Canada and see what makes it unique in every season.
          </p>
          <SeasonButtons active={season} onSelect={selectSeason} />
        </div>
      </header>
      {/* The board mounts when the intro closes, which starts the tack fly-in */}
      {!introOpen && (
        <MapBoard
          season={season}
          hoveredTackId={hoveredTackId}
          lockedTackId={lockedTackId}
          itemIndex={itemIndex}
          onHover={setHoveredTackId}
          onClickTack={clickTack}
          onNext={() => setItemIndex((i) => i + 1)}
          onClose={closeCard}
        />
      )}
      {introOpen && <IntroModal onClose={() => setIntroOpen(false)} />}
    </>
  )
}

export default App
