import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import React from 'react'

interface Props {
  setCategories: React.Dispatch<React.SetStateAction<{
    playing: boolean;
    unfinished: boolean;
    notStarted: boolean;
    completed: boolean;
    wishlist: boolean;
  }>>
  categories: {
    playing: boolean;
    unfinished: boolean;
    notStarted: boolean;
    completed: boolean;
    wishlist: boolean;
  }
}



const CategoryFilters: React.FC<Props> = ({ setCategories, categories }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategories({ ...categories, [event.target.name]: event.target.checked })
  }
  return (
    <FormGroup row>
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
  )
}

export default CategoryFilters