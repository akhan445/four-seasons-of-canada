type Props = {
  onClose: () => void
}

function IntroModal({ onClose }: Props) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h2>Welcome!</h2>
        <p>
          Explore a bulletin board map of Canada and discover what makes each
          season special here. Pick a season, then hover over the tacks to
          learn something new.
        </p>
      </div>
    </div>
  )
}

export default IntroModal
