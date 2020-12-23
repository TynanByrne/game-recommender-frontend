import { useApolloClient, useQuery } from '@apollo/client'
import { Typography } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
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
        <Typography variant='h2'>Hello, world!</Typography>
      </div>
      {data?.loggedIn && (
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        <Alert onClose={() => {}}>
          <AlertTitle>Logged in</AlertTitle>
          Welcome back, {data.me.username}!
        </Alert>
      )}
    </>
  )
}

export default Home