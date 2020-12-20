
import { Button, LinearProgress } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { Field, Form } from 'formik'
import React from 'react'

interface FormProps {
  isSubmitting: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitForm: (() => Promise<void>) & (() => Promise<any>)
}

const SignUpForm: React.FC<FormProps> = ({ isSubmitting, submitForm }) => {
  return (
    <Form>
      <Field
        component={TextField}
        type='text'
        name='username'
        label='Username' />
      <br />
      <Field
        component={TextField}
        type='password'
        name='password'
        label='Password' />
      <br />
      <Field
        component={TextField}
        type='password'
        name='passwordConfirmation'
        label='Password confirmation' />
      {isSubmitting && <LinearProgress />}
      <br />
      <Button 
        color='primary'
        variant='contained'
        onClick={submitForm}
        disabled={isSubmitting}
      >
        Sign up
      </Button>
    </Form>
  )
}

export default SignUpForm