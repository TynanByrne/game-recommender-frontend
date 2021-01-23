import { gql } from '@apollo/client'
import { LIBRARY_GAMES, POST_DETAILS } from '../fragments'

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

export const EDIT_GAME = gql`
  mutation editGame(
    $username: String!,
    $newCategory: String!,
    $oldCategory: String!,
    $gameId: Int!
  ) {
    editGame(
      username: $username,
      newCategory: $newCategory,
      oldCategory: $oldCategory,
      gameId: $gameId,
    ) {
      ...LibraryGames
    }
  }
  ${LIBRARY_GAMES}
`

export const REMOVE_GAME = gql`
  mutation removeGame($username: String!, $gameId: Int!) {
    removeGame(username: $username, gameId: $gameId) {
      ...LibraryGames
    }
  }
  ${LIBRARY_GAMES}
`

export const NEW_POST = gql`
  mutation newPost(
    $username: String!,
    $title: String!
    $text: String!,
    $game: Int,
    $platforms: [String]
  ) {
    newPost(
      username: $username,
      title: $title,
      text: $text,
      game: $game,
      platforms: $platforms,
    ) {
      ...PostDetails
    }
  }
  ${POST_DETAILS}
`