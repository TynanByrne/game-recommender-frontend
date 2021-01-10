import { useQuery } from '@apollo/client'
import { Card, CardContent, CardMedia, CircularProgress, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { GET_DBGAME } from '../../graphql/queries'
import { DatabaseGameData, GameCategory } from '../../types'
import { IoLogoPlaystation } from 'react-icons/io'

interface Props {
  gameId: string
  category: GameCategory
}
interface GameVars {
  gameId: string
}

const useStyles = makeStyles({
  root: {
    maxWidth: '60vh',
    paddingVertical: '20px',
    display: 'flex',
    flexWrap: 'nowrap'
  },
  media: {
    flex: 2,
  },
  mainContent: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    flex: 2,
  },
  extra: {
    flex: 1,
  },
  platforms: {
    flex: 1,
    display: 'flex',
    margin: '20px'
  },
  category: {
    flex: 2,
    margin: '20px'
  },

})

const LibraryItem: React.FC<Props> = ({ gameId, category }) => {
  const classes = useStyles()
  const { data, loading } = useQuery<DatabaseGameData, GameVars>(GET_DBGAME, {
    variables: { gameId }
  })

  const game = data?.fetchGameData

  if (!game) {
    return (
      <Typography variant='h4'>
        Game could not be found in the database...
      </Typography>
    )
  }
  if (loading) {
    return (
      <CircularProgress size='40vh' />
    )
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        component='img'
        alt={game.name}
        height='300'
        image={game.background_image}
      />
      <CardContent className={classes.mainContent}>
        <Typography className={classes.title} variant='h4'>
          {game.name}
        </Typography>
        <Typography className={classes.extra} variant='body1'>
          Released: {game.released} {game.metacritic && `| Metacritic: ${game.metacritic}`}
        </Typography>
      </CardContent>
      <CardContent className={classes.platforms}>
        {game.parent_platforms.map(p => {
          if (p.platform.name === 'PlayStation') {
            return (
              <IoLogoPlaystation />
            )
          }
          return (
            <Typography variant='body1' key={p.platform.name}>
              {p.platform.name}
            </Typography>
          )

        })}
      </CardContent>
      <CardContent className={classes.category}>
        <Typography variant='h5'>
          {category}
        </Typography>
      </CardContent>

    </Card>
  )
}

export default LibraryItem