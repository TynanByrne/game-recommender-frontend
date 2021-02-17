import { useQuery } from '@apollo/client'
import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { GET_DBGAME, GET_USER } from '../../graphql/queries'
import { DatabaseGameData, Post } from '../../types'
import { platformIcon } from '../GameLibrary/LibraryItem'
import { Link } from 'react-router-dom'
import { GameVars, UserData, UserVars } from '../PostFeed/PostItem'
import { formatDistanceToNow } from 'date-fns'
import NewRecommendation from './NewRecommendation'
import RecommendationItem from './RecommendationItem'

interface PostProps {
  post: Post
}


const useStyles = makeStyles({
  root: {
    width: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'left',
    marginTop: '4rem',
  },
  container: {
    marginLeft: '20%',
    marginRight: '20%',
  },
  text: {
    margin: '1rem',
    padding: '1rem',
  }

})

const FullPost: React.FC<PostProps> = ({ post }) => {
  const classes = useStyles()
  const dbGameResult = useQuery<DatabaseGameData, GameVars>(GET_DBGAME, {
    variables: { gameId: post.game }
  })
  const posterResult = useQuery<UserData, UserVars>(GET_USER, {
    variables: { userId: post.poster }
  })
  return (
    <Paper elevation={3} className={classes.root}>
      <Box className={classes.container}>
        <Typography variant='h5' color='primary'>
          {post.title}
        </Typography>
        <Typography variant='body1' color='textSecondary'>
          Posted by {posterResult.data?.getUser.username}, {formatDistanceToNow(new Date(post.timestamp))} ago
        </Typography>
        {post.game &&
          <>
            <img
              src={dbGameResult.data?.fetchGameData.background_image}
              height='300' />
            <Typography variant='h6' color='textSecondary'>
              User has previously played: <Link to={`/games/singlegame/${dbGameResult.data?.fetchGameData.numberId}`}>
                {dbGameResult.data?.fetchGameData.name}
              </Link>
            </Typography>
            <Typography variant='h6' color='textSecondary'>
              Desired platforms: {post.platforms.map(p => platformIcon(p))}
            </Typography>
          </>
        }
        <Paper elevation={8} className={classes.text}>
          <Typography variant='body2'>
            {post.text}
          </Typography>
        </Paper>
        <NewRecommendation post={post} />
        {post.recommendations.map(recommendation => (
          <RecommendationItem
            recommendation={recommendation}
            key={recommendation.id} />
        ))}
      </Box>
    </Paper>
  )
}

export default FullPost