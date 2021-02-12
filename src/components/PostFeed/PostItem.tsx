import { useQuery } from '@apollo/client'
import { Card, CardHeader, CircularProgress, makeStyles } from '@material-ui/core'
import React from 'react'
import { GET_DBGAME, GET_USER } from '../../graphql/queries'
import { DatabaseGameData, Post, User } from '../../types'
import { formatDistanceToNow } from 'date-fns'

interface Props {
  post: Post
}

interface GameVars {
  gameId: string
}
interface UserData {
  getUser: User
}
interface UserVars {
  userId: string
}

const useStyles = makeStyles({
  root: {
    width: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  header: {

  }
})

const PostItem: React.FC<Props> = ({ post }) => {
  console.log(post)
  const classes = useStyles()
  const dbGameResult = useQuery<DatabaseGameData, GameVars>(GET_DBGAME, {
    variables: { gameId: post.game }
  })
  const posterResult = useQuery<UserData, UserVars>(GET_USER, {
    variables: { userId: post.poster }
  })
  console.log(post)
  if (dbGameResult.loading || posterResult.loading) return <CircularProgress />
  return (
    <Card
      className={classes.root}>
      <CardHeader
        className={classes.header}
        title={post.title}
        subheader={
          `Posted by: ${posterResult.data?.getUser.username} ${formatDistanceToNow(new Date(post.timestamp))} ago`
        }
      />
    </Card>
  )
}

export default PostItem