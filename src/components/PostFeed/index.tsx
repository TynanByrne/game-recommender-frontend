import React from 'react'
import NewPost from './NewPost'
import PostList from './PostList'

const PostFeed: React.FC = (): JSX.Element => {
  return (
    <>
      <NewPost />
      <PostList />
    </>
  )
}

export default PostFeed