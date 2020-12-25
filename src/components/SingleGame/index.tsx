import { useQuery } from '@apollo/client'
import { Typography } from '@material-ui/core'
import React from 'react'
import { useHistory, useParams } from 'react-router'
import { GET_SINGLE_GAME } from '../../graphql/queries'
import { SingleGameData, SingleGameVars } from '../../types'

const SingleGame: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const numberId = Number(id)
  const history = useHistory()
  const { loading, data } = useQuery<SingleGameData, SingleGameVars>(GET_SINGLE_GAME, {
    variables: { id: numberId }
  })

  if (!loading && !data) {
    return <Typography variant='h2'>Something went wrong!</Typography>
  }

  const game = data?.singleGame
  console.log(game)

  return (
    <>
      <Typography variant='h1'>
        {game?.name}
      </Typography>
      <img src={game?.background_image} />
      <div>
        {game?.metacritic}
      </div>
      <div>
        {game?.released}
      </div>
      <div>
        {game?.description}
      </div>
      <video width='320' height='240' controls>
        <source src={game?.clip?.clip} type='video/mp4' />
      </video>
    </>
  )
}

export default SingleGame