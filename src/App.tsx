import { useEffect, useState } from 'react'
import SeasonButtons from './components/SeasonButtons'
import IntroModal from './components/IntroModal'
import type { Season } from './types'
import { getCurrentSeason } from './lib/getCurrentSeason'

function App() {
  const [season, setSeason] = useState<Season>(getCurrentSeason(new Date()));
  const [introOpen, setIntroOpen] = useState(true)

  useEffect(() => {
    document.documentElement.dataset.season = season
  }, [season])

  return (
    <>
      <header className="page-header">
        <h1>Four Seasons of Canada</h1>
        <p className="blurb">
          Explore Canada and see what makes it unique in every season.
        </p>
        <SeasonButtons active={season} onSelect={setSeason} />
      </header>
      {introOpen && <IntroModal onClose={() => setIntroOpen(false)} />}
    </>
  )
}

export default App
