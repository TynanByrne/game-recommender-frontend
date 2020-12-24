import { TextField } from 'formik-material-ui'
import { Button, LinearProgress } from '@material-ui/core'
import { Field, Form } from 'formik'
import React from 'react'

interface FormProps {
  isSubmitting: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitForm: (() => Promise<void>) & (() => Promise<any>)
}

const LoginForm: React.FC<FormProps> = ({ isSubmitting, submitForm }) => {
  return (
    <Form onSubmit={submitForm}>
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
      {isSubmitting && <LinearProgress />}
      <br />
      <Button 
        color='primary'
        variant='contained'
        onClick={submitForm}
        disabled={isSubmitting}
      >
        Log in
      </Button>
    </Form>
  )
}

export default LoginForm