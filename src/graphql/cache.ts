import { InMemoryCache, makeVar, ReactiveVar } from '@apollo/client'
import { GameDetails } from '../types'
export const extraGamesVar: ReactiveVar<GameDetails[]> = makeVar<GameDetails[]>([])
export const currentNextVar: ReactiveVar<string> = makeVar<string>('')

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        extraGames: {
          read() {
            return extraGamesVar()
          }
        },
        currentNext: {
          read() {
            return currentNextVar()
          }
        }
      }
    }
  }
})