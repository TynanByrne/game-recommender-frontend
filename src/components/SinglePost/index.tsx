import { useQuery } from '@apollo/client'
import { Typography } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router'
import { GET_POST } from '../../graphql/queries'
import { SinglePostData, SinglePostVars } from '../../types'
import FullPost from './FullPost'

const SinglePost: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { loading, data } = useQuery<SinglePostData, SinglePostVars>(GET_POST, {
    variables: { postId: id }
  })
  const post = data?.getPost
  console.log(post)

  if (!loading && !data) {
    return <Typography variant='h2'>Something went wrong!</Typography>
  }
  if (post) {
    return (
      <FullPost post={post} />
    )
  }
  return (
    <Typography variant='h2' color='error'>
      No post was found...
    </Typography>
  )
}

export default SinglePost