import React, { Dispatch } from 'react'
import { useHistory } from 'react-router-dom'

export interface SearchedGames {
  count: number
  next: string
  previous?: string
  results: GameDetails[]
}

export interface SearchedGamesData {
  searchGames: SearchedGames
}

export interface GameDetails {
  id: string
  name: string
  rating: number
  background_image: string
}



const Searchbar: React.FC<{ setSearch: Dispatch<string>, search: string }> = ({ setSearch, search }) => {
  const history = useHistory()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleSubmit = () => {
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