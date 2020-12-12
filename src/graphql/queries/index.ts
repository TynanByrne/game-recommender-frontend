import { gql } from '@apollo/client'
import { GAME_BASICS } from '../fragments'

export const SEARCH_GAMES = gql`
  query searchGames($searchTerm: String!) {
    searchGames(searchTerm: $searchTerm) {
      count
      next
      previous
      results {
        id
        name
        rating
        background_image
      }
    }
  }
`

export const NEXT_SET = gql`
  query nextSet($url: String!) {
    nextSet(url: $url) {
      count
      next
      previous
      ...GameBasics
    }
  }
  ${GAME_BASICS}
`