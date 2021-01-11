import { List, Typography } from '@material-ui/core'
import React from 'react'
import { GameCategory, GameCollections, GameObjectID } from '../../types'
import LibraryItem from './LibraryItem'


interface CategoryState {
  playing: boolean;
  unfinished: boolean;
  notStarted: boolean;
  completed: boolean;
  wishlist: boolean;
}
interface ListProps {
  library: GameCollections
  categoryState: CategoryState
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



const LibraryList: React.FC<ListProps> = ({ library, categoryState }) => {
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
      <List>
        {newGameList.flat().filter(game => categoryFilter(game, categoryState)).map(game => (
          <LibraryItem
            gameId={game._id}
            key={game._id}
            category={game.category} />
        ))}
      </List>
    </>
  )

}

export default LibraryList