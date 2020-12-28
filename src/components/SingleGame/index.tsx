import { useQuery } from '@apollo/client'
import { CircularProgress, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory, useParams } from 'react-router'
import { GET_SINGLE_GAME, ME } from '../../graphql/queries'
import { SingleGameData, SingleGameVars, User } from '../../types'
import CollectionButton from './CollectionButton'

export interface MeData {
  me: User
  loggedIn: boolean
}

const SingleGame: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const numberId = Number(id)
  const history = useHistory()
  const { loading, data } = useQuery<SingleGameData, SingleGameVars>(GET_SINGLE_GAME, {
    variables: { id: numberId }
  })
  const { data: meData, loading: meLoading } = useQuery<MeData, boolean>(ME, {
    pollInterval: 1000,
  })

  if (!loading && !data) {
    return <Typography variant='h2'>Something went wrong!</Typography>
  }

  const game = data?.singleGame
  console.log(game)
  console.log(meData)
  if (meLoading) {
    return (
      <CircularProgress />
    )
  }
  if (game && meData?.me) {
    return (
      <>
        <Typography variant='h1'>
          {game?.name}
        </Typography>
        <img width='600px' src={game?.background_image} />
        <div>
          {game.metacritic}
        </div>
        <div>
          {game.released}
        </div>
        <div>
          {game.description}
        </div>
        <CollectionButton game={game} username={meData?.me.username} />
      </>
    )
  }

  return (
    <Typography variant='h1'>
      No game was found...
    </Typography>
  )

}

export default SingleGame