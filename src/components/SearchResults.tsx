import React from 'react'
import { useHistory } from 'react-router'
import { SearchedGames, SearchedGamesData } from '../types'

const SearchResults: React.FC<{ gamesData: SearchedGamesData | undefined }> = ({ gamesData }) => {
  const history = useHistory()
  if (!gamesData) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  const games: SearchedGames = gamesData.searchGames
  return (
    <>
      <button onClick={(): void => history.push('/')}>Go home</button>
      {games.results.map(game => (
        <div key={game.id}>
          <div>{game.name}</div>
          <div>{game.rating}</div>
          <img src={game.background_image} />
        </div>
      ))}
    </>
  )
}

export default SearchResults