import { Box, Button, Checkbox, CircularProgress, Input, LinearProgress, ListItemText, MenuItem, Select, TextField } from '@material-ui/core'
import { TextField as FormikTextField, Select as FormikSelect } from 'formik-material-ui'
import { Field, Form } from 'formik'
import React, { useState } from 'react'
import { platformIcon } from '../GameLibrary/LibraryItem'
import SmallSearchbar from './SmallSearchbar'
import { useLazyQuery } from '@apollo/client'
import { SearchedGamesData, SearchedGamesVars } from '../../types'
import { SEARCH_GAMES } from '../../graphql/queries'

interface FormProps {
  isSubmitting: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitForm: (() => Promise<void>) & (() => Promise<any>)
}

const platformOptions = [
  'Xbox',
  'PlayStation',
  'Nintendo',
  'Apple Macintosh',
  'Linux',
  'PC',
  'iOS',
  'Android'
]

const NewPostForm: React.FC<FormProps> = ({ isSubmitting, submitForm }) => {
  const [platforms, setPlatforms] = useState<string[]>([])
  const [game, setGame] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [searchGames, { loading, data }] = useLazyQuery<SearchedGamesData, SearchedGamesVars>(
    SEARCH_GAMES, {
    variables: { searchTerm: search }
  })
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearch(event.target.value)
  }

  const handleGameChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setGame(event.target.value as string)
  }

  return (
    <>
      <Form>
        <Field
          component={FormikTextField}
          type='text'
          name='title'
          fullWidth
          label='Post title' />
        <Field
          component={FormikTextField}
          type='text'
          name='text'
          multiline
          fullWidth
          label='Recommendation request (140 characters max)' />
        <Field
          component={FormikSelect}
          multiple
          type='text'
          name='platforms'
          label='Platforms'
          fullWidth
          input={<Input />}
          renderValue={(selected: string[]) => {
            setPlatforms(selected)
            return selected.map(v => (
              <Box key={v}>{platformIcon(v)}</Box>
            ))
          }}
        >
          {platformOptions.map(platform => (
            <MenuItem key={platform} value={platform}>
              <Checkbox checked={platforms.includes(platform)} />
              <ListItemText primary={platform} />
            </MenuItem>
          ))}
        </Field>
        <Box>
          <TextField
            value={search}
            onChange={handleInputChange}
            label='Search games' />
          <Button onClick={() => searchGames()}>search</Button>
          <Field
            component={FormikSelect}
            name='game'
            label='Similar game'
            type='text'
          >
            {loading && <CircularProgress />}
            {data?.searchGames.results.map(game => (
              <MenuItem key={game.id} value={game.id}>
                <ListItemText primary={game.name} />
              </MenuItem>
            ))}
          </Field>
        </Box>
        {isSubmitting && <LinearProgress />}
        <Button
          color='primary'
          variant='contained'
          onClick={submitForm}
          disabled={isSubmitting}
          type='button'
        >
          Post recommendation request
        </Button>
      </Form>
      <div>{game}</div>
    </>
  )
}

export default NewPostForm