import { useQuery } from '@apollo/client';
import { Box, makeStyles } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { GET_GAME_OBJECTID, GET_LIBRARY } from '../../graphql/queries';
import { GameCategory, SingleGame, MyLibraryData, GameObjectID } from '../../types'
import AddGameButton from './AddGameButton';
import RemoveGameButton from './RemoveGameButton';

interface ButtonProps {
  game: SingleGame
  username: string
  libraryId: string
}
interface LibraryVars {
  libraryId: string
}
interface ObjectIdVars {
  gameRawgId: number
}
interface ObjectIdData {
  fetchGameObjectId: string
}

const inCollection = (id: string, gameList: GameObjectID[]): boolean => {
  const gameArray: string[] = gameList.map(game => game['_id'])
  return gameArray.includes(id)
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 'wrap',
  }
})

const CollectionButtons: React.FC<ButtonProps> = ({ game, username, libraryId }) => {
  const classes = useStyles()
  const { data: libraryData } = useQuery<MyLibraryData, LibraryVars>(GET_LIBRARY, {
    variables: { libraryId },
    fetchPolicy: 'cache-and-network',
  })

  const { data: objectIdData } = useQuery<ObjectIdData, ObjectIdVars>(GET_GAME_OBJECTID, {
    variables: { gameRawgId: Number(game.id) }
  })

  const [inPlaying, setInPlaying] = useState<boolean>(false)
  const [inWishlist, setInWishlist] = useState<boolean>(false)
  const [inCompleted, setInCompleted] = useState<boolean>(false)
  const [inUnfinished, setInUnfinished] = useState<boolean>(false)
  const [inNotStarted, setInNotStarted] = useState<boolean>(false)
  const [alreadyAdded, setAlreadyAdded] = useState<boolean>(true)
  const gameLists = { inPlaying, inUnfinished, inCompleted, inNotStarted, inWishlist }

  const currentCategory = (): GameCategory | undefined => {
    if (inPlaying) return 'playing'
    if (inWishlist) return 'wishlist'
    if (inCompleted) return 'completed'
    if (inUnfinished) return 'unfinished'
    if (inNotStarted) return 'not started'
    return undefined
  }

  const currCategory = currentCategory()

  const resetLists = (): void => {
    setInPlaying(false)
    setInWishlist(false)
    setInCompleted(false)
    setInUnfinished(false)
    setInNotStarted(false)
  }

  const library = libraryData?.myLibrary?.games
  const objectId = objectIdData?.fetchGameObjectId

  useEffect((): void => {
    if (library) {
      console.log("useEffect FIRED")
      if (objectId) {
        setAlreadyAdded(true)
        if (inCollection(objectId, library.playing)) {
          setInPlaying(true)
        } else if (inCollection(objectId, library.wishlist)) {
          setInWishlist(true)
        } else if (inCollection(objectId, library.completed)) {
          setInCompleted(true)
        } else if (inCollection(objectId, library.unfinished)) {
          setInUnfinished(true)
        } else if (inCollection(objectId, library.notStarted)) {
          setInNotStarted(true)
        } else {
          setAlreadyAdded(false)
        }
        console.log("Set!!")
      } else {
        console.log("Nothing set.")
        setAlreadyAdded(false)
      }
    }
  }, [libraryData, objectIdData])

  


  return (
    <Box className={classes.root}>
      <AddGameButton
        gameLists={gameLists}
        resetLists={resetLists}
        currCategory={currCategory}
        alreadyAdded={alreadyAdded}
        game={game}
        username={username}
        libraryId={libraryId}
         />
      <RemoveGameButton
        game={game}
        username={username}
        alreadyAdded={alreadyAdded}
        resetLists={resetLists}
        libraryId={libraryId}
      />
    </Box>
  )
}

export default CollectionButtons