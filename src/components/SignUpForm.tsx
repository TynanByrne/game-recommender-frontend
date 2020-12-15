
import { Button, TextField } from '@material-ui/core'
import React from 'react'

const SignUpForm: React.FC<{ formik: any }> = ({ formik }) => {
  return (
    <>
      <TextField
        id='username'
        name='username'
        label='Username'
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
      />
      <TextField
        id='password'
        name='password'
        label='Password'
        type='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
      />
      <TextField
        id='password-confirmation'
        name='password-confirmation'
        label='Password confirmation'
        type='password'
        value={formik.values.passwordConfirmation}
        onChange={formik.handleChange}
        error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
      />
      <Button color='primary' variant='contained' type='submit'>
        Sign up
      </Button>
    </>
  )
}

export default SignUpForm