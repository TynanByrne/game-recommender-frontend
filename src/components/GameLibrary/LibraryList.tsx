import { List, Typography } from '@material-ui/core'
import React from 'react'
import { GameCollections } from '../../types'
import LibraryItem from './LibraryItem'

interface ListProps {
  library: GameCollections
}



const LibraryList: React.FC<ListProps> = ({ library }) => {
  const gameList: string[] = Object.values(library)
  if (gameList.length === 0) {
    return (
      <Typography variant='h5'>
        This list is empty!
      </Typography>
    )
  }

  return (
    <>
      <List>
        {gameList.map(game => <LibraryItem gameId={game} key={game} />)}
      </List>
    </>
  )

}

export default LibraryList