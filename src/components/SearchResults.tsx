import { useQuery } from '@apollo/client'
import React from 'react'
import { useHistory, useParams } from 'react-router'
import { SEARCH_GAMES } from '../graphql/queries'
import { SearchedGames} from '../types'

const SearchResults: React.FC = () => {
  const { search } = useParams<{ search: string }>()
  console.log(search)
  const history = useHistory()
  const { loading, data } = useQuery(SEARCH_GAMES,
    { variables: { searchTerm: search }}
  )
  if (loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  console.log(data)
  const games: SearchedGames = data?.searchGames
  console.log(games)
  return (
    <>
      <button onClick={(): void => history.push('/')}>Go home</button>
      {games?.results.map(game => (
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