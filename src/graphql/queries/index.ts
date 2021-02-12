import { gql } from '@apollo/client'
import { DATABASE_GAME, GAME_BASICS, LIBRARY_GAMES, POST_DETAILS, SINGLE_GAME, USER_DETAILS } from '../fragments'

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
      clip {
        clip
      }
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
      id
      library
    }
    loggedIn @client
  }
`

export const GET_SINGLE_GAME = gql`
  query singleGame($id: Int!) {
    singleGame(id: $id) {
      ...SingleGameDetails
    }   
  }
  ${SINGLE_GAME}
`

export const GET_LIBRARY = gql`
  query myLibrary($libraryId: String!) {
    myLibrary(libraryId: $libraryId) {
      ...LibraryGames
    }
  }
  ${LIBRARY_GAMES}
`

export const GET_DBGAME = gql`
  query fetchGameData($gameId: String!) {
    fetchGameData(gameId: $gameId) {
      numberId
      ...DatabaseGame
    }
  }
  ${DATABASE_GAME}
`

export const GET_GAME_OBJECTID = gql`
  query fetchGameObjectId($gameRawgId: Int!) {
    fetchGameObjectId(gameRawgId: $gameRawgId)
  }
`

export const GET_POSTS = gql`
  query allPosts {
    allPosts {
      ...PostDetails
    }
  }
  ${POST_DETAILS}
`

export const GET_USER = gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`