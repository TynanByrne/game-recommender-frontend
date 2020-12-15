import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import SignUpForm from './SignUpForm'


const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Usernames must be at least of length 1')
    .max(30, 'Usernames cannot exceed a length of 30')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Passwords must be at least of length 8')
    .max(50, 'Passwords must not exceed a length of 50')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Password confirmation is required'),
})

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
}

const SignUp: React.FC = () => {
  const onSubmit = (values: { username: string, password: string }): void => {
    const { username, password } = values
    console.log("Username is", username, "password is", password)
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return (
    <div>
      <h1>This is a form</h1>
      <form>
        <SignUpForm formik={formik}/>
      </form>
    </div>
  )
}

export default SignUp