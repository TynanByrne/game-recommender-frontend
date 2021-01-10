import { List, Typography } from '@material-ui/core'
import React from 'react'
import { GameCategory, GameCollections, GameObjectID } from '../../types'
import LibraryItem from './LibraryItem'

interface ListProps {
  library: GameCollections
}

interface CategoriedGame {
  _id: string
  category: GameCategory
}



const LibraryList: React.FC<ListProps> = ({ library }) => {
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
  if (newGameList.length === 0) {
    return (
      <Typography variant='h5'>
        This list is empty!
      </Typography>
    )
  }

  return (
    <>
      <List>
        {newGameList.flat().map(game => (
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