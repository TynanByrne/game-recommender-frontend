import { gql } from '@apollo/client'
import { LIBRARY_GAMES } from '../fragments'

export const SIGN_UP = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      username
      passwordHash
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ADD_GAME = gql`
  mutation addGame(
    $username: String!,
    $gameCategory: String!,
    $gameId: Int!) {
    addGame(username: $username, gameCategory: $gameCategory, gameId: $gameId) {
      ...LibraryGames
    }
  }
  ${LIBRARY_GAMES}
`