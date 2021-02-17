import { useQuery } from '@apollo/client'
import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, CircularProgress, Divider, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { GET_DBGAME, GET_USER } from '../../graphql/queries'
import { DatabaseGameData, Post, User } from '../../types'
import { formatDistanceToNow } from 'date-fns'
import { platformIcon } from '../GameLibrary/LibraryItem'
import { useHistory } from 'react-router'

interface Props {
  post: Post
}

export interface GameVars {
  gameId: string
}
export interface UserData {
  getUser: User
}
export interface UserVars {
  userId: string
}

const useStyles = makeStyles({
  root: {
    width: '60%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
    margin: 'auto',
    textAlign: 'left'
  },
  header: {

  },
  content: {
    marginHorizontal: '2rem'
  },
  divider: {
    marginTop: '1rem',
    marginBottom: '1rem',
  }
})

const PostItem: React.FC<Props> = ({ post }) => {
  console.log(post)
  const classes = useStyles()
  const history = useHistory()
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
      className={classes.root}
      onClick={() => history.push(`/posts/${post._id}`)}>
      <CardActionArea>
        <CardHeader
          className={classes.header}
          title={post.title}
          subheader={
            `Posted by: ${posterResult.data?.getUser.username} ${formatDistanceToNow(new Date(post.timestamp))} ago`
          }
        />
        {post.game && <CardMedia
          component='img'
          alt={dbGameResult.data?.fetchGameData.name}
          height='150'
          width='50vw'
          image={dbGameResult.data?.fetchGameData.background_image}
        />}
        <CardContent>
          <Box>
            {post.game && <Typography variant='caption'>
              User has played: {dbGameResult.data?.fetchGameData.name}
            </Typography>}
          </Box>
          <Box>
            <Typography variant='caption'>
              Desired platforms: {post.platforms.map(p => platformIcon(p))}
            </Typography>
          </Box>
          <Divider light variant='fullWidth' className={classes.divider} />
          <Typography variant='body1'>
            {post.text}
          </Typography>
          <Typography variant='body2'>
            {post.recommendations.length} recommendations
        </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default PostItem