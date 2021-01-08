import { useMutation } from '@apollo/client'
import { Button, CircularProgress, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { ADD_GAME, EDIT_GAME } from '../../graphql/mutations'
import { GET_GAME_OBJECTID, GET_LIBRARY } from '../../graphql/queries'
import { GameCategory, SingleGame } from '../../types'

interface GameLists {
  inCompleted: boolean
  inUnfinished: boolean
  inNotStarted: boolean
  inPlaying: boolean
  inWishlist: boolean
}

interface ButtonProps {
  currCategory: GameCategory | undefined
  alreadyAdded: boolean
  game: SingleGame
  username: string
  libraryId: string
  gameLists: GameLists
  resetLists: () => void
}
interface AddGameVars {
  username: string
  gameCategory: GameCategory
  gameId: number
}
interface EditGameVars {
  username: string
  newCategory: string
  oldCategory: string
  gameId: number
}

const useStyles = makeStyles({
  button: {
    flex: 1,
    padding: '10rem'
  }
})

const AddGameButton: React.FC<ButtonProps> = ({
  currCategory, alreadyAdded, game, username, gameLists, resetLists, libraryId
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const refetcher = () => [
    {
      query: GET_LIBRARY,
      variables: { libraryId }
    },
    {
      query: GET_GAME_OBJECTID,
      variables: { gameRawgId: Number(game.id) }
    }
  ]
  const [addGame, { loading, data }] = useMutation<AddGameVars>(ADD_GAME, {
    refetchQueries: refetcher()
  })
  const [editGame, editResult] = useMutation<EditGameVars>(EDIT_GAME, {
    refetchQueries: refetcher()
  })

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAddGame = async (gameCategory: GameCategory, oldCategory: GameCategory | undefined): Promise<void> => {
    try {
      if (!alreadyAdded) {
        await addGame({
          variables: {
            username,
            gameCategory,
            gameId: Number(game.id),
          }
        })
      } else {
        await editGame({
          variables: {
            username,
            newCategory: gameCategory,
            oldCategory,
            gameId: Number(game.id)
          }
        })
        resetLists()
      }
    } catch (error) {
      console.error(error)
    }
    setTimeout(() => {
      handleClose()
    }, 2000)
  }

  return (
    <>
      <Button 
        className={classes.button}
        aria-controls="add-menu"
        aria-haspopup="true"
        onClick={handleClick}>
        {alreadyAdded ? "Edit collection" : "Add to collection"}
      </Button>
      <Menu
        id="add-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => handleAddGame('playing', currCategory)}
          disabled={gameLists.inPlaying}>
          Playing
        </MenuItem>
        <MenuItem
          onClick={() => handleAddGame('completed', currCategory)}
          disabled={gameLists.inCompleted}>
          Completed
        </MenuItem>
        <MenuItem
          onClick={() => handleAddGame('not started', currCategory)}
          disabled={gameLists.inNotStarted}>
          Not started
        </MenuItem>
        <MenuItem
          onClick={() => handleAddGame('unfinished', currCategory)}
          disabled={gameLists.inUnfinished}>
          Unfinished
        </MenuItem>
        <MenuItem
          onClick={() => handleAddGame('wishlist', currCategory)}
          disabled={gameLists.inWishlist}>
          Wishlist
        </MenuItem>
        {(loading || editResult.loading) && <CircularProgress />}
        {(data && !editResult.data) && <Typography>{game.name} added to collection.</Typography>}
        {editResult.data && <Typography>{game.name} moved lists.</Typography>}
      </Menu>
    </>
  )
}

export default AddGameButton