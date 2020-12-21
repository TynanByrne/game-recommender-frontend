import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import React from 'react'
import { useHistory } from 'react-router'
import * as yup from 'yup'
import { tokenVar } from '../graphql/cache'
import { LOGIN, SIGN_UP } from '../graphql/mutations'
import SignUpForm from './SignUpForm'


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
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Password confirmation is required'),
})

interface MyFormValues {
  username: string
  password: string
  passwordConfirmation: string
}


const initialValues: MyFormValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
}

const SignUp: React.FC = () => {
  const [signUp] = useMutation(SIGN_UP)
  const [signIn] = useMutation(LOGIN)
  const history = useHistory()
  const signUpAndIn = async (username: string, password: string) => {
    try {
      const signUpData = await signUp({
        variables: {
          password,
          username
        }
      })
      console.log(signUpData)

      if (signUpData.data.addUser) {
        const result = await signIn({ variables: { username, password } })
        const token = result.data.login.value
        localStorage.setItem('user-token', token)
        tokenVar(token)
        history.push('/')
      }
    } catch (error) {
      console.error(error.message)
    }
  } 
  return (
    <div>
      <h1>This is a form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting} ) => {
          const { username, password } = values
          try {
            signUpAndIn(username, password)
          } catch (error) {
            console.error(error)
          }
          setSubmitting(false)
          console.log('Username is', username, ", password is", password)
        }}>
        {({ submitForm, isSubmitting }) => (
          <SignUpForm submitForm={submitForm} isSubmitting={isSubmitting} />
        )}
      </Formik>
    </div>
  )
}

export default SignUp