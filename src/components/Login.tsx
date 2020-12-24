import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import React from 'react'
import { useHistory } from 'react-router'
import * as yup from 'yup'
import { loggedInVar, tokenVar } from '../graphql/cache'
import { LOGIN } from '../graphql/mutations'
import LoginForm from './LoginForm'

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Usernames must be at least of length 1')
    .max(30, 'Usernames cannot exceed a length of 30')
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Passwords must be at least of length 8')
    .max(50, 'Passwords must not exceed a length of 50')
    .required('Password is required'),
})

interface MyFormValues {
  username: string
  password: string
}

const initialValues: MyFormValues = {
  username: '',
  password: '',
}

const Login: React.FC = () => {
  const [login] = useMutation(LOGIN)
  const history = useHistory()

  if (loggedInVar()) {
    history.push('/')
  }
  return (
    <div>
      <h1>Time to log in</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          const { username, password } = values
          try {
            const result = await login({
              variables: {
                username, password
              }
            })
            console.log(result)
            const token = result.data.login.value
            localStorage.setItem('user-token', token)
            tokenVar(token)
            history.push('/')
          } catch (error) {
            console.error(error.message)
          }
          setSubmitting(false)
          console.log('Logged in!')
        }}>
        {({ submitForm, isSubmitting }) => (
          <LoginForm submitForm={submitForm} isSubmitting={isSubmitting} />
        )}
      </Formik>
    </div>
  )
}

export default Login