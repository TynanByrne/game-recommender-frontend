import { Button, Checkbox, Input, LinearProgress, ListItemText, MenuItem, Select } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { Field, Form } from 'formik'
import React from 'react'

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
  const [platforms, setPlatforms] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPlatforms(event.target.value as string[])
  };
  return (
    <Form>
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
        label='Platforms'
        value={platforms}
        onChange={handleChange}
        input={<Input />}
        renderValue={(selected: string[]) => (selected as string[]).join(', ')}
      >
        {platformOptions.map(platform => (
          <MenuItem key={platform} value={platform}>
            <Checkbox checked={platforms.includes(platform)} />
            <ListItemText primary={platform} />
          </MenuItem>
        ))}
      </Field>
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
  )
}

export default NewPostForm