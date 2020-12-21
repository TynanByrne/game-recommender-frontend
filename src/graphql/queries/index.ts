import { gql } from '@apollo/client'
import { GAME_BASICS } from '../fragments'

export const SEARCH_GAMES = gql`
  query searchGames($searchTerm: String!) {
    searchGames(searchTerm: $searchTerm) {
      count
      next
      previous
      ...GameBasics
    }
  }
  ${GAME_BASICS}
`

export const GET_EXTRA_GAMES = gql`
  query getExtraGames {
    extraGames @client {
      id
      name
      slug
      rating
    }
  }
`

export const GET_CURRENT_NEXT = gql`
  query getCurrentNext {
    currentNext @client
  }
`

export const ME = gql`
  query me {
    me {
      username
    }
    loggedIn @client
  }
`