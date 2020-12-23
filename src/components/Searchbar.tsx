import { Button, TextField } from '@material-ui/core'
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
      <TextField value={search} onChange={handleInputChange} label='Search games' />
      <Button type='submit' variant='contained'>Search</Button>
    </form>
  )
}

export default Searchbar