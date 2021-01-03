import { useMutation } from '@apollo/client';
import { Button, CircularProgress, Menu, MenuItem } from '@material-ui/core'
import React from 'react'
import { ADD_GAME } from '../../graphql/mutations';
import { GameCategory, SingleGame } from '../../types'

interface ButtonProps {
  game: SingleGame
  username: string
}
interface AddGameVars {
  username: string
  gameCategory: GameCategory
  gameId: number
}

const CollectionButton: React.FC<ButtonProps> = ({ game, username }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [addGame, { loading }] = useMutation<AddGameVars>(ADD_GAME)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  return (
    <>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={async () => {
          try {
            const result = await addGame({
              variables: {
                username,
                gameCategory: 'playing',
                gameId: Number(game.id),
              }
            })
            console.log(result)
          } catch (error) {
            console.error(error)
          }
        }}>Playing</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
        {loading && <CircularProgress />}
      </Menu>
    </>
  )
}

export default CollectionButton