import { useMutation } from '@apollo/client';
import { Button, CircularProgress, ListItem, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import React from 'react'
import { REMOVE_GAME } from '../../graphql/mutations';
import { GET_GAME_OBJECTID, GET_LIBRARY } from '../../graphql/queries';
import { SingleGame } from '../../types'

interface ButtonProps {
  game: SingleGame
  username: string
  alreadyAdded: boolean
  resetLists: () => void
  libraryId: string
}

interface RemoveGameVars {
  username: string
  gameId: number
}

const useStyles = makeStyles({
  button: {
    flex: 1,
    padding: '2rem'
  }
})

const RemoveGameButton: React.FC<ButtonProps> = ({ game, username, alreadyAdded, resetLists, libraryId }) => {
  const classes = useStyles()
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
  const [removeGame, { data, loading }] = useMutation<RemoveGameVars>(REMOVE_GAME, {
    refetchQueries: refetcher()
  })
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveGame = async (): Promise<void> => {
    try {
      await removeGame({
        variables: {
          username,
          gameId: Number(game.id)
        }
      })
      resetLists()
    } catch (error) {
      console.error(error)
    }
    setTimeout(() => {
      handleClose()
    }, 1500)
  }

  return (
    <>
      <Button
        className={classes.button}
        aria-controls="simple-menu"
        aria-haspopup="true"
        disabled={!alreadyAdded}
        onClick={handleClick}>
        Remove from collection
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ListItem>Are you sure?</ListItem>
        <MenuItem onClick={() => handleRemoveGame()}>Yes</MenuItem>
        <MenuItem onClick={handleClose}>No</MenuItem>
        {loading && <CircularProgress />}
        {data && <Typography>{game.name} removed from collection.</Typography>}
      </Menu>
    </>
  )
}

export default RemoveGameButton