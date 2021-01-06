import { useMutation, useQuery } from '@apollo/client';
import { Button, CircularProgress, Menu, MenuItem, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { ADD_GAME } from '../../graphql/mutations';
import { GET_GAME_OBJECTID, GET_LIBRARY } from '../../graphql/queries';
import { GameCategory, SingleGame, MyLibraryData, GameObjectID } from '../../types'

interface ButtonProps {
  game: SingleGame
  username: string
  libraryId: string
}
interface AddGameVars {
  username: string
  gameCategory: GameCategory
  gameId: number
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
  console.log(id)
  const gameArray: string[] = gameList.map(game => game['_id'])
  console.log("gameArray is", gameArray)
  console.log(gameArray.includes(id))
  return gameArray.includes(id)
}

const CollectionButton: React.FC<ButtonProps> = ({ game, username, libraryId }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [addGame, { loading, data }] = useMutation<AddGameVars>(ADD_GAME)
  const { data: libraryData, loading: libraryLoading } = useQuery<MyLibraryData, LibraryVars>(GET_LIBRARY, {
    variables: { libraryId },
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

  useEffect(() => {
    if (libraryData?.myLibrary?.games && objectIdData?.fetchGameObjectId) {
      console.log("useEffect FIRED")
      const library = libraryData.myLibrary.games
      const objectId = objectIdData.fetchGameObjectId
      console.log(library)
      console.log(objectIdData)
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
        console.log("Nothing set.")
        setAlreadyAdded(false)
      }
    }
  }, [libraryData, objectIdData])





  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  const handleAddGame = async (gameCategory: string): Promise<void> => {
    try {
      const result = await addGame({
        variables: {
          username,
          gameCategory,
          gameId: Number(game.id),
        },
        refetchQueries: [
          {
            query: GET_LIBRARY,
            variables: { libraryId },
          }
        ]
      })
      console.log(result)
    } catch (error) {
      console.error(error)
    }
    setTimeout(() => {
      handleClose()
    }, 2000)
  }

  return (
    <>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Add to collection
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => handleAddGame('playing')}
          disabled={inPlaying}>
          Playing
        </MenuItem>
        <MenuItem
          onClick={() => handleAddGame('completed')}
          disabled={inCompleted}>
          Completed
        </MenuItem>
        <MenuItem
          onClick={() => handleAddGame('not started')}
          disabled={inNotStarted}>
          Not started
        </MenuItem>
        <MenuItem
          onClick={() => handleAddGame('unfinished')}
          disabled={inUnfinished}>
          Unfinished
        </MenuItem>
        <MenuItem
          onClick={() => handleAddGame('wishlist')}
          disabled={inWishlist}>
          Wishlist
        </MenuItem>
        {loading && <CircularProgress />}
        {data && <Typography>{game.name} added to collection.</Typography>}
      </Menu>
    </>
  )
}

export default CollectionButton