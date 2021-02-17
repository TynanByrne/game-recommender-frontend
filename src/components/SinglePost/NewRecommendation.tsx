import { useMutation, useQuery } from '@apollo/client'
import { Box, CircularProgress, Typography } from '@material-ui/core'
import { Formik } from 'formik'
import React from 'react'
import { FcSalesPerformance } from 'react-icons/fc'
import * as yup from 'yup'
import { NEW_RECOMMENDATION } from '../../graphql/mutations'
import { ME } from '../../graphql/queries'
import { Post } from '../../types'
import { MeData } from '../Home'
import NewRecommendationForm from './NewRecommendationForm'

const validationSchema = yup.object().shape({
    game: yup
        .number()
        .required('You must choose a game to recommend.'),
    text: yup
        .string()
        .max(200, 'You cannot write more than 200 characters for your recommendation.')
        .required('You need to tell the original poster why they should play this game.'),
})

interface RecommendationFormValues {
    game: number
    text: string
}
const initialValues: RecommendationFormValues = {
    game: -1,
    text: '',
}

interface Props {
    post: Post
}

const NewRecommendation: React.FC<Props> = ({ post }) => {
    const meResult = useQuery<MeData>(ME)
    const [newRecommendation] = useMutation(NEW_RECOMMENDATION)
    if (meResult.loading) return <CircularProgress />
    const addRecommendation = async (
        text: string,
        game: number,
    ) => {
        try {
            const recommendationResult = await newRecommendation({
                variables: {
                    username: meResult.data?.me.username,
                    text,
                    game,
                    postId: post._id
                }
            })
            console.log(recommendationResult)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Box>
            <Typography variant='h6'>
                Post a recommendation
            </Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    const { text, game } = values
                    console.log("game", game)
                    setSubmitting(true)
                    addRecommendation(text, game)
                    setSubmitting(false)
                }}>
                {({ submitForm, isSubmitting }) => (
                    <NewRecommendationForm submitForm={submitForm} isSubmitting={isSubmitting} />
                )}
            </Formik>
        </Box>
    )
}

export default NewRecommendation