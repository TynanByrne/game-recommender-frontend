import { List, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { GameCategory, GameCollections, GameObjectID } from '../../types'
import LibraryItem from './LibraryItem'


export interface CategoryState {
  playing: boolean;
  unfinished: boolean;
  notStarted: boolean;
  completed: boolean;
  wishlist: boolean;
}
interface ListProps {
  library: GameCollections
  categoryState: CategoryState
  search: string
}

interface CategoriedGame {
  _id: string
  category: GameCategory
}

const categoryFilter = (game: CategoriedGame, categoryState: CategoryState): boolean => {
  switch (game.category) {
    case 'completed':
      return categoryState.completed
    case 'not started':
      return categoryState.notStarted
    case 'playing':
      return categoryState.playing
    case 'unfinished':
      return categoryState.unfinished
    case 'wishlist':
      return categoryState.wishlist
    default:
      return false
  }
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
})

const LibraryList: React.FC<ListProps> = ({ library, categoryState, search }) => {
  const classes = useStyles()
  const gameList: GameObjectID[][] = Object.values(library)
  gameList.shift()
  const categories: GameCategory[] = ['wishlist', 'completed', 'unfinished', 'not started', 'playing']
  const newGameList: CategoriedGame[][] = gameList.map((gameArray, index) => {
    console.log(gameArray)
    return gameArray.map(game => {
      const newGame: CategoriedGame = {
        ...game, category: categories[index]
      }
      return newGame
    })
  })
  console.log(newGameList)
  if (newGameList.flat().length === 0) {
    return (
      <Typography variant='h5'>
        This list is empty!
      </Typography>
    )
  }

  return (
    <>
      <List className={classes.root}>
        {newGameList
          .flat()
          .filter(game => categoryFilter(game, categoryState))
          .map(game => (
            <LibraryItem
              gameId={game._id}
              key={game._id}
              category={game.category}
              search={search} />
          ))}
      </List>
    </>
  )

}

export default LibraryList