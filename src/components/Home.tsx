import { useQuery } from '@apollo/client'
import { Typography } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import React from 'react'
import { ME } from '../graphql/queries'
import { User } from '../types'

interface MeData {
  me: User
  loggedIn: boolean
}

const Home: React.FC = () => {
  const { data, loading } = useQuery<MeData, boolean>(ME)
  console.log("ME DATA IS", data)
  

  if (loading) {
    return (
      <div>
        WE LOADING UP
      </div>
    )
  }

  return (
    <>
      <Typography variant='h2'>Hello, world!</Typography>
      {data?.loggedIn && (
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        <Alert onClose={() => { }}>
          <AlertTitle>Logged in</AlertTitle>
          Welcome back, {data.me.username}!
        </Alert>
      )}
    </>
  )
}

export default Home