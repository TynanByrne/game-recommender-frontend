import { gql } from '@apollo/client'

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