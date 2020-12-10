export interface SearchedGames {
  count: number
  next: string
  previous?: string
  results: GameDetails[]
}

export interface SearchedGamesData {
  searchGames: SearchedGames
}

export interface SearchedGamesVars {
  searchTerm: string
}

export interface GameDetails {
  id: string
  name: string
  rating: number
  background_image: string
}
