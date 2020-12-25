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

export const SINGLE_GAME = gql`
  fragment SingleGameDetails on SingleGame {
    id
    slug
    name
    description
    metacritic
    released
    background_image
    background_image_additional
    website
    reddit_url
    reddit_name
    alternative_names
    parent_platforms {
      platform {
        id
        name
        slug
      }
    }
    stores {
      id
      url
      store {
        id
        name
        slug
        domain
        games_count
        image_background
      }
    }
    developers {
      id
      name
    }
    genres {
      id
      slug
      name
      games_count
      image_background
    }
    tags {
      id
      name
    }
    esrb_rating {
      id
      name
      slug
    }
  }
`