type Props = {
  title: string
}

// A simple drawn stand-in, in the season's colors, for a picture that is missing or failed to load.
function PlaceholderArt({ title }: Props) {
  return (
    <svg className="placeholder-art" viewBox="0 0 200 120" role="img" aria-label={title}>
      <rect width="200" height="120" fill="var(--accent)" />
      <circle cx="152" cy="34" r="16" fill="#fff" opacity="0.75" />
      <path d="M0 120 L0 84 Q40 50 80 84 Q120 58 160 84 Q185 70 200 84 L200 120 Z" fill="var(--bg)" />
      <text
        x="100"
        y="108"
        textAnchor="middle"
        fontSize="13"
        fill="var(--text)"
        fontFamily="'Patrick Hand', cursive"
      >
        {title}
      </text>
    </svg>
  )
}

export default PlaceholderArt
