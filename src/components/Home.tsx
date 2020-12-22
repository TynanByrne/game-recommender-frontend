import { useApolloClient, useQuery } from '@apollo/client'
import React from 'react'
import { useHistory } from 'react-router'
import { tokenVar } from '../graphql/cache'
import { ME } from '../graphql/queries'
import { User } from '../types'

interface MeData {
  me: User
  loggedIn: boolean
}

const Home: React.FC = () => {
  const history = useHistory()
  const client = useApolloClient()
  const { data, loading } = useQuery<MeData, boolean>(ME)
  console.log("ME DATA IS", data)

  const logOut = (): void => {
    tokenVar('')
    localStorage.clear()
    client.resetStore()
  }

  if (loading) {
    return (
      <div>
        WE LOADING UP
      </div>
    )
  }

  const signInButtons = () => {
    return (
      <>
        <button onClick={() => history.push('/signup')}>Sign up</button>
        <button onClick={() => history.push('login')}>Log in</button>
      </>
    )
  }

  return (
    <>
      {!data?.loggedIn && signInButtons()}
      {data?.loggedIn && <button onClick={logOut}>Log out</button>}
      <div>
        <h1>Hello, world!</h1>
      </div>
      {data?.loggedIn && (
        <div>
          Welcome back, {data.me.username}!
        </div>
      )}
    </>
  )
}

export default Home