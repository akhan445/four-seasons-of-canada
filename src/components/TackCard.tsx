import { useRef, useState } from 'react'
import type { Tack } from '../types'
import { useClickOutside } from '../hooks/useClickOutside'
import PlaceholderArt from './PlaceholderArt'

type Props = {
  tack: Tack
  itemIndex: number
  locked: boolean
  onNext: () => void
  onClose: () => void
}

function TackCard({ tack, itemIndex, locked, onNext, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [failedImage, setFailedImage] = useState<string | null>(null)

  // Only a locked card closes on an outside click; a hover card just follows the mouse.
  useClickOutside(cardRef, onClose, locked)

  const item = tack.items[itemIndex % tack.items.length]
  const showPlaceholder = failedImage === item.image

  // Open on the side with more room, and line the card up so the tack's point
  // sits at the same fraction of the card's height as it does of the map's.
  const opensRight = tack.x < 50
  const gap = 6
  const side = opensRight ? { left: `${tack.x + gap}%` } : { right: `${100 - tack.x + gap}%` }

  return (
    <>
      <svg className="card-line" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line
          x1={tack.x}
          y1={tack.y}
          x2={opensRight ? tack.x + gap : tack.x - gap}
          y2={tack.y}
        />
      </svg>
      <div
        ref={cardRef}
        className={locked ? 'tack-card locked' : 'tack-card'}
        style={{ ...side, top: `${tack.y}%`, transform: `translateY(-${tack.y}%)` }}
      >
        {showPlaceholder ? (
          <PlaceholderArt title={item.title} />
        ) : (
          <img
            className="card-image"
            src={item.image}
            alt={item.title}
            onError={() => setFailedImage(item.image)}
          />
        )}
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        {locked && tack.items.length > 1 && (
          <button className="card-next" onClick={onNext}>
            Next ({(itemIndex % tack.items.length) + 1}/{tack.items.length}) ›
          </button>
        )}
      </div>
    </>
  )
}

export default TackCard
