import { useLazyQuery } from '@apollo/client'
import React, { Dispatch } from 'react'
import { useHistory } from 'react-router-dom'
import { SEARCH_GAMES } from '../graphql/queries'
import { SearchedGamesData, SearchedGamesVars } from '../types'

const Searchbar: React.FC<{
  setSearch: Dispatch<string>,
  search: string,
  setGamesData: Dispatch<SearchedGamesData> }> = ({ setSearch, search, setGamesData }) => {
  const history = useHistory()
  const [searchGames] = useLazyQuery<SearchedGamesData, SearchedGamesVars>(
    SEARCH_GAMES,
    { onCompleted: data => setGamesData(data) }
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearch(event.target.value)
  }

  const handleSubmit = () => {
    searchGames({ variables: { searchTerm: search } })
    history.push('/games')
  }

  return (
    <form onSubmit={handleSubmit}>
      search game<input value={search} onChange={handleInputChange} />
      <button type='submit'>submit</button>
    </form>
  )
}

export default Searchbar