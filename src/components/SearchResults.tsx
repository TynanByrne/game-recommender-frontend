import { useQuery } from '@apollo/client'
import React from 'react'
import { useHistory } from 'react-router'
import { SEARCH_GAMES } from '../graphql/queries'
import { SearchedGames, SearchedGamesData } from './Searchbar'

interface SearchedGamesVars {
  searchTerm: string
}

const SearchResults: React.FC<{search: string}> = ({ search }) => {
  const history = useHistory()
  const { loading, data } = useQuery<SearchedGamesData, SearchedGamesVars>(
    SEARCH_GAMES,
    { variables: { searchTerm: search }}
  )
  if (!data) {
    return null
  }
  const games: SearchedGames = data.searchGames
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