import { gql } from '@apollo/client'

export const GAME_BASICS = gql`
  fragment GameBasics on GamesResult {
    results {
      id
      name
      slug
      background_image
      rating
      metacritic
      released
      platforms {
        platform {
          name
          id
        }
      }
      genres {
        id
        name
        slug
      }
    }
  }
`