import { gql } from '@apollo/client'

const typeDefs = gql`
  type Genre {
    id: ID!
    name: String
    slug: String
    games_count: Int!
    image_background: String
  }
  input ParentPlatformInput {
    platform: PlatformDetailsInput
  }
  input PlatformDetailsInput {
    id: ID
    name: String
    slug: String
  }
  """ input GameInput {
    id: ID!
    name: String!
    metacritic: Int
    released: String!
    background_image: String!
    parent_platforms: [ParentPlatformInput]
    genres: [GenreInput]
    tags: [TagInput]
  } """
  type GameObjectID {
    _id: String!
  }
  type LibraryGames {
    wishlist: [GameObjectID]
    completed: [GameObjectID]
    playing: [GameObjectID]
    unfinished: [GameObjectID]
    notStarted: [GameObjectID]
  }
  type Library {
    games: LibraryGames
    totalGames: Int!
  }
  type Tag {
    id: ID!
    name: String
    slug: String
    language: String
    games_count: Int
    image_background: String
  }
  
`

export default typeDefs