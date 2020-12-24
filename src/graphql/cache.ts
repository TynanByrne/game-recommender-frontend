import { InMemoryCache, makeVar, ReactiveVar } from '@apollo/client'
import { GameDetails } from '../types'
export const extraGamesVar: ReactiveVar<GameDetails[]> = makeVar<GameDetails[]>([])
export const currentNextVar: ReactiveVar<string> = makeVar<string>('')
const localToken = localStorage.getItem('user-token')
const token = localToken ? localToken : ''
export const tokenVar: ReactiveVar<string> = makeVar<string>(token)
const loggedIn = tokenVar() ? true : false
export const loggedInVar: ReactiveVar<boolean> = makeVar<boolean>(loggedIn)

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
        },
        loggedIn: {
          read() {
            return loggedInVar()
          }
        }
      }
    }
  }
})