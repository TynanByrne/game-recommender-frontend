import { useQuery } from '@apollo/client'
import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, CircularProgress, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { GET_DBGAME } from '../../graphql/queries'
import { DatabaseGameData, GameCategory } from '../../types'
import { IoLogoAndroid, IoLogoApple, IoLogoPlaystation, IoLogoXbox } from 'react-icons/io'
import { HiDesktopComputer } from 'react-icons/hi'
import { SiNintendo, SiIos } from 'react-icons/si'
import { FcLinux } from 'react-icons/fc'
import { useHistory } from 'react-router-dom'
import { IconType } from 'react-icons'
import { androidGreen, cyberpunkYellow, nintendoRed, playstationBlue, xboxGreen } from '../../theme'

interface Props {
  gameId: string
  category: GameCategory
  search: string
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  category: {
    flex: 1,
    margin: '20px'
  },
})

export const platformIcon = (platformName: string): IconType | JSX.Element => {
  switch (platformName) {
    case 'PlayStation':
      return <IoLogoPlaystation color={playstationBlue} size='1.5rem' />
    case 'Xbox':
      return <IoLogoXbox color={xboxGreen} size='1.5rem' />
    case 'PC':
      return <HiDesktopComputer color={cyberpunkYellow} size='1.5rem' aria-label={platformName} />
    case 'Linux':
      return <FcLinux size='1.5rem' />
    case 'Apple Macintosh':
      return <IoLogoApple color='#FFFFFF' size='1.5rem' />
    case 'Nintendo':
      return <SiNintendo color={nintendoRed} size='1.5rem' />
    case 'Android':
      return <IoLogoAndroid color={androidGreen} size='1.5rem' />
    case 'iOS':
      return <SiIos color='#FFFFFF' size='1.5rem' aria-label={platformName} />
    default:
      return <Typography variant='body1'>{platformName}</Typography>
  }
}

const LibraryItem: React.FC<Props> = ({ gameId, category, search }) => {
  const classes = useStyles()
  const history = useHistory()
  const { data, loading } = useQuery<DatabaseGameData, GameVars>(GET_DBGAME, {
    variables: { gameId }
  })

  const game = data?.fetchGameData
  console.log(game)

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
  if (!game.name.toLowerCase().includes(search.toLowerCase())) return null

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
              const icon = platformIcon(p.platform.name)
              return <Box key={p.platform.id}>{icon}</Box>
            })}
          </Box>
          <Chip className={classes.category} label={category} />
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default LibraryItem