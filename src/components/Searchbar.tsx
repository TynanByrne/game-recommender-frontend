import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Searchbar: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const history = useHistory()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearch(event.target.value)
  }

  const handleSubmit = () => {
    console.log('clicked')
    history.push(`/games/${search}`)
    setSearch('')
  }

  return (
    <form onSubmit={handleSubmit}>
      search game<input value={search} onChange={handleInputChange} />
      <button type='submit'>submit</button>
    </form>
  )
}

export default Searchbar