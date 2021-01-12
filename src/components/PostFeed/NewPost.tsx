import { useMutation, useQuery } from '@apollo/client'
import { Box, CircularProgress, Typography } from '@material-ui/core'
import { Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import { NEW_POST } from '../../graphql/mutations'
import { ME } from '../../graphql/queries'
import { MeData } from '../Home'
import NewPostForm from './NewPostForm'

const validationSchema = yup.object().shape({
  text: yup
    .string()
    .max(200, 'You cannot write more than 200 characters in a post.')
    .required('You need to give information about what you\'re looking for.'),
  games: yup
    .array()
    .of(yup.string().length(24))
    .max(3, 'You cannot choose more than 3 games to base your recommendations from.'),
  platforms: yup
    .array()
    .of(yup.string())
})

interface PostFormValues {
  text: string
  games: string[]
  platforms: string[]
}

const initialValues: PostFormValues = {
  text: '',
  games: [],
  platforms: [],
}

const NewPost: React.FC = () => {
  const meResult = useQuery<MeData>(ME)
  const [newPost] = useMutation(NEW_POST)
  if (meResult.loading) return <CircularProgress size='50%' />

  const createPost = async (
    text: string, games: string[], platforms: string[]
  ) => {
    try {
      const postResult = await newPost({
        variables: {
          username: meResult.data?.me.username,
          text,
          games,
          platforms,
        }
      })
      console.log(postResult)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box>
      <Typography variant='h4'>
        Post a recommendation request!
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const { text, games, platforms } = values
          setSubmitting(true)
          createPost(text, games, platforms)
          setSubmitting(false)
        }}>
        {({ submitForm, isSubmitting }) => (
          <NewPostForm submitForm={submitForm} isSubmitting={isSubmitting} />
        )}
      </Formik>
    </Box>
  )
}

export default NewPost