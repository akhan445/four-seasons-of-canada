export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export type Item = { title: string; description: string; image: string }

export type Tack = {
  id: string
  season: Season
  x: number // percent of the map width
  y: number // percent of the map height
  items: Item[]
}
