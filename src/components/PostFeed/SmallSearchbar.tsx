import { useLazyQuery } from '@apollo/client'
import { CircularProgress, ListItemText, MenuItem, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { SEARCH_GAMES } from '../../graphql/queries'
import { SearchedGamesData, SearchedGamesVars } from '../../types'

const SmallSearchbar: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [searchGames, { loading, data }] = useLazyQuery<SearchedGamesData, SearchedGamesVars>(
    SEARCH_GAMES, {
    variables: { searchTerm: search }
  })

  const [games, setGames] = useState<string[]>([])

  useEffect(() => {
    const newGames = data?.searchGames.results
    if (newGames) {
      const allGames = ([...newGames.map(g => g.name), ...games])
      setGames(allGames.filter((a, b) => allGames.indexOf(a) === b))
    }
  }, [data?.searchGames.results])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearch(event.target.value)
    searchGames()
  }

  return (
    <>
      <TextField
        value={search}
        onChange={handleInputChange}
        label='Search games' />
      {loading && <CircularProgress />}
      {games.map(game => (
        <MenuItem key={game} value={game}>
          <ListItemText primary={game} />
        </MenuItem>
      ))}
    </>
  )
}

export default SmallSearchbar