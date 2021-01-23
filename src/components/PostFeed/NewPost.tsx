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
  title: yup
    .string()
    .max(50, 'Your title can not be longer than 50 characters.')
    .required('You need to provide a title'),
  text: yup
    .string()
    .max(200, 'You cannot write more than 200 characters in a post.')
    .required('You need to give information about what you\'re looking for.'),
  game: yup
    .number(),
  platforms: yup
    .array()
    .of(yup.string())
})

interface PostFormValues {
  title: string
  text: string
  game: number
  platforms: string[]
}

const initialValues: PostFormValues = {
  title: '',
  text: '',
  game: -1,
  platforms: [],
}

const NewPost: React.FC = () => {
  const meResult = useQuery<MeData>(ME)
  const [newPost] = useMutation(NEW_POST)
  if (meResult.loading) return <CircularProgress size='50%' />

  const createPost = async (
    title: string,
    text: string,
    game: number,
    platforms: string[],
  ) => {
    try {
      const postResult = await newPost({
        variables: {
          username: meResult.data?.me.username,
          title,
          text,
          game,
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
          const { title, text, game, platforms } = values
          console.log("game is", game)
          setSubmitting(true)
          createPost(title, text, Number(game), platforms)
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