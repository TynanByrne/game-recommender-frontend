import { Box, Checkbox, FormControlLabel, FormGroup, makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import { CategoryState } from './LibraryList'

interface Props {
  setCategories: React.Dispatch<React.SetStateAction<CategoryState>>
  categories: CategoryState
  setSearch: React.Dispatch<React.SetStateAction<string>>
  search: string
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'column wrap',
  },
  checkboxes: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
  }

})
const CategoryFilters: React.FC<Props> = ({ setCategories, categories, setSearch, search }) => {
  const classes = useStyles()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategories({ ...categories, [event.target.name]: event.target.checked })
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearch(event.target.value)
  }
  return (
    <Box className={classes.root}>
      <FormGroup row className={classes.checkboxes}>
        <FormControlLabel
          control={<Checkbox checked={categories.playing} onChange={handleChange} name='playing' />}
          label='Playing'
          labelPlacement='top' />
        <FormControlLabel
          control={<Checkbox checked={categories.completed} onChange={handleChange} name='completed' />}
          label='Completed'
          labelPlacement='top' />
        <FormControlLabel
          control={<Checkbox checked={categories.notStarted} onChange={handleChange} name='notStarted' />}
          label='Not started'
          labelPlacement='top' />
        <FormControlLabel
          control={<Checkbox checked={categories.wishlist} onChange={handleChange} name='wishlist' />}
          label='Wishlist'
          labelPlacement='top' />
        <FormControlLabel
          control={<Checkbox checked={categories.unfinished} onChange={handleChange} name='unfinished' />}
          label='Unfinished'
          labelPlacement='top' />
      </FormGroup>
      <TextField
        value={search}
        onChange={handleInputChange}
        label='Filter games'
        fullWidth />
    </Box>

  )
}

export default CategoryFilters