import { useQuery } from '@apollo/client'
import { CircularProgress, Typography } from '@material-ui/core'
import { getTime } from 'date-fns'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { GET_POSTS } from '../../graphql/queries'
import { Post } from '../../types'
import PostItem from './PostItem'

interface PostData {
  allPosts: Post[]
}

const PostList: React.FC = () => {
  const { data, loading } = useQuery<PostData>(GET_POSTS)
  const unsortedPosts = data?.allPosts
  const posts = unsortedPosts?.slice().sort((a, b) => getTime(b.timestamp) - getTime(a.timestamp))
  console.log(posts)
  if (loading) return <CircularProgress size='60vw' />
  const fetchMore = () => {
    console.log('fetched more')
  }
  const hasMore = () => {
    return false
  }
  return (
    <>
      {posts && <InfiniteScroll
        dataLength={posts.length}
        next={fetchMore}
        hasMore={hasMore()}
        loader={<CircularProgress />}
        endMessage={
          <Typography variant='body1'>No more posts</Typography>
        }
      >
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}  
      </InfiniteScroll>}
    </>
  )
}
export default PostList