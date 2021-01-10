import { useQuery } from '@apollo/client'
import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, CircularProgress, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { GET_DBGAME } from '../../graphql/queries'
import { DatabaseGameData, GameCategory } from '../../types'
import { IoLogoPlaystation } from 'react-icons/io'
import { useHistory } from 'react-router-dom'

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
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    justifyItems: 'center',
    alignItems: 'center',
    alignContent: 'stretch',
    textAlign: 'center',
    marginTop: '4rem'
  },
  media: {
    flex: 1,
  },
  data: {
    flex: 0,
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mainContent: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    flex: 2,
    width: 'auto',
  },
  extra: {
    flex: 1,
  },
  platforms: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  category: {
    flex: 1,
    margin: '20px'
  },

})

const LibraryItem: React.FC<Props> = ({ gameId, category }) => {
  const classes = useStyles()
  const history = useHistory()
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
    <Card
      className={classes.root}
      onClick={() => history.push(`/games/singlegame/${game.numberId}`)}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component='img'
          alt={game.name}
          height='300'
          width='100%'
          image={game.background_image}
        />
        <CardContent className={classes.data}>
          <Box className={classes.mainContent}>
            <Typography color='primary' className={classes.title} variant='h4'>
              {game.name}
            </Typography>
            <Typography className={classes.extra} variant='body1'>
              Released: {game.released} {game.metacritic && `| Metacritic: ${game.metacritic}`}
            </Typography>
          </Box>
          <Box className={classes.platforms}>
            {game.parent_platforms.map(p => {
              console.log(p)
              if (p.platform.name === 'PlayStation') {
                return <IoLogoPlaystation />
              }
              return (
                <Typography variant='body1' key={p.platform.name}>
                  {p.platform.name}
                </Typography>
              )
            })}
          </Box>
          <Chip className={classes.category} label={category} />
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default LibraryItem