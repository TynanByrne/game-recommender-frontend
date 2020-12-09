import { gql } from '@apollo/client'

export const GAME_BASICS = gql`
  fragment GameDetails on GamesResult {
    results {
      id
      name
      slug
      background_image
      rating
      metacritic
      released
      parent_platforms {
        name
        id
        slug
      }
      genres {
        id
        name
        slug
      }
    }
  }
`