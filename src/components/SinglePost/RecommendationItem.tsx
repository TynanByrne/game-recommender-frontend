import { useQuery } from '@apollo/client'
import { makeStyles, Paper, Typography } from '@material-ui/core'
import { formatDistanceToNow } from 'date-fns'
import React from 'react'
import { GET_DBGAME, GET_USER } from '../../graphql/queries'
import { DatabaseGameData, Recommendation } from '../../types'
import { GameVars, UserData, UserVars } from '../PostFeed/PostItem'

interface Props {
    recommendation: Recommendation
}

const useStyles = makeStyles({
    recommendation: {
        marginTop: '1rem',
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
    }
})

const RecommendationItem: React.FC<Props> = ({ recommendation }) => {
    const classes = useStyles()
    const posterResult = useQuery<UserData, UserVars>(GET_USER, {
        variables: { userId: recommendation.recommender }
    })
    const dbGameResult = useQuery<DatabaseGameData, GameVars>(GET_DBGAME, {
        variables: { gameId: String(recommendation.game) }
    })
    return (
        <Paper elevation={8} className={classes.recommendation}>
            <Typography variant='h6' color='primary'>
                {dbGameResult.data?.fetchGameData.name}
            </Typography>
            <Typography variant='body1' color='textSecondary'>
                Posted by {posterResult.data?.getUser.username}, {formatDistanceToNow(new Date(recommendation.timestamp))} ago
            </Typography>
            <Typography variant='body1'>
                {recommendation.text}
            </Typography>
            <Typography variant='body2'>
                {recommendation.likes && `${recommendation.likes} likes`}
            </Typography>
        </Paper>
    )
}

export default RecommendationItem