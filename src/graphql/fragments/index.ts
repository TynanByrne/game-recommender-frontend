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

export const DATABASE_GAME = gql`
  fragment DatabaseGame on DatabaseGame {
    name
    metacritic
    released
    background_image
    genres {
      id
      name
    }
    parent_platforms {
      platform {
        id
        name
      }
    }
    tags {
      id
      name
    }
  }
`

export const LIBRARY_GAMES = gql`
  fragment LibraryGames on Library {
    games {
        wishlist {
          _id
        }
        completed {
          _id
        }
        unfinished {
          _id
        }
        notStarted {
          _id
        }
        playing {
          _id
        }
      }
      totalGames
  }
`

export const POST_DETAILS = gql`
  fragment PostDetails on Post {
    _id
    poster
    title
    text
    platforms
    game
    recommendations {
      recommender
      game
      text
      comments {
        commenter
        text
      }
    }
    timestamp
  }
`

export const USER_DETAILS = gql`
  fragment UserDetails on User {
    id
    username
    passwordHash
    library
  }
`