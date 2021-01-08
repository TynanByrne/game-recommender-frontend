export interface SearchedGames {
  count: number
  next: string
  previous?: string
  results: GameDetails[]
}

export interface SearchedGamesData {
  searchGames: SearchedGames
}

export interface NextSetData {
  nextSet: SearchedGames
}

export interface SearchedGamesVars {
  searchTerm: string
}

export interface GameDetails {
  id: string
  name: string
  rating: number
  background_image: string
  clip: Clip
}

export interface NextSetVars {
  url: string
}

export interface User {
  username: string
  id: string
  library: string
}
export interface SingleGameVars {
  id: number
}
export interface SingleGameData {
  singleGame: SingleGame
}

export interface SingleGame {
  id: number
  slug: string
  name: string
  description: string
  metacritic: number
  released: string
  background_image: string
  background_image_additional: string
  website: string
  reddit_url: string
  reddit_name: string
  alternative_names: [string]
  parent_platforms: [ParentPlatform]
  stores: [Store]
  developers: [Developer]
  genres: [Genre]
  tags: [Tag]
  esrb_rating: ESRBRating
  clip: Clip
}

interface Developer {
  id: number
  name: string
}

interface ESRBRating {
  id: number
  name: string
  slug: string
}

interface PlatformDetail {
  id: number
  name: string
  slug: string
  image?: string
  year_end?: string | number | undefined
  year_start?: string | number | undefined
  games_count: number
  image_background: string
}

type ParentPlatform = Pick<PlatformDetail, 'id' | 'name' | 'slug'>

interface Genre {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
}

interface Store {
  id: number
  name: string
  store: StoreDetail
}

interface StoreDetail {
  id: number
  name: string
  slug: string
  domain: string
  games_count: number
  image_background: string
}

interface Clip {
  clip: string
  clips: {
    320: string
    640: string
    full: string
  }
  video: string
  preview: string
}

interface Tag {
  id: number
  name: string
  slug: string
  language: string
  games_count: number
  image_background: string
}
export interface GameObjectID {
  _id: string
}
export interface GameCollections {
  wishlist: GameObjectID[]
  unfinished: GameObjectID[]
  notStarted: GameObjectID[]
  playing: GameObjectID[]
  completed: GameObjectID[]
}

export interface MyLibraryData {
  myLibrary: Library
}
interface Library {
  games: GameCollections
  totalGames: number
}


export type GameCategory = 'unfinished' | 'wishlist' | 'not started' | 'playing' | 'completed'