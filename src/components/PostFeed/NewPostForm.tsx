import { Box, Button, Checkbox, Chip, Input, LinearProgress, ListItemText, MenuItem } from '@material-ui/core'
import { TextField, Select } from 'formik-material-ui'
import { Field, Form } from 'formik'
import React, { useState } from 'react'
import { platformIcon } from '../GameLibrary/LibraryItem'
import SmallSearchbar from './SmallSearchbar'

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
  return (
    <>
      <Form>
        <Field
          component={TextField}
          type='text'
          name='title'
          fullWidth
          label='Post title' />
        <Field
          component={TextField}
          type='text'
          name='text'
          multiline
          fullWidth
          label='Recommendation request (140 characters max)' />
        <Field
          component={Select}
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
        {/* Have a hidden field and have the form submit that! */}
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
    </>
  )
}

export default NewPostForm