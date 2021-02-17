import { useLazyQuery } from '@apollo/client'
import { Field, Form } from 'formik'
import React, { useState } from 'react'
import { SEARCH_GAMES } from '../../graphql/queries'
import { TextField as FormikTextField, Select as FormikSelect } from 'formik-material-ui'
import { Button, CircularProgress, LinearProgress, ListItemText, MenuItem, TextField } from '@material-ui/core'
import { SearchedGamesData, SearchedGamesVars } from '../../types'

interface FormProps {
    isSubmitting: boolean
    submitForm: (() => Promise<void>) & (() => Promise<any>)
}

const NewRecommendationForm: React.FC<FormProps> = ({ isSubmitting, submitForm }) => {
    const [game, setGame] = useState<number>(-1)
    const [search, setSearch] = useState<string>('')
    const [searchGames, { loading, data }] = useLazyQuery<SearchedGamesData, SearchedGamesVars>(
        SEARCH_GAMES, {
        variables: { searchTerm: search }
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setSearch(event.target.value)
    }

    return (
        <>
            <Form>
                <TextField
                    value={search}
                    onChange={handleInputChange}
                    label='Search games' />
                <Button onClick={() => searchGames()}>search</Button>
                <Field
                    component={FormikSelect}
                    name='game'
                    label='Game to recommend'
                    type='number'
                >
                    {loading && <CircularProgress />}
                    {data?.searchGames.results.map(game => (
                        <MenuItem key={game.id} value={Number(game.id)}>
                            <ListItemText primary={game.name} />
                        </MenuItem>
                    ))}
                </Field>
                <Field
                    component={FormikTextField}
                    type='text'
                    name='text'
                    fullWidth
                    label='Tell them why they should play this game' />
                {isSubmitting && <LinearProgress />}
                <Button
                    color='primary'
                    variant='contained'
                    onClick={submitForm}
                    disabled={isSubmitting}
                    type='button'
                >
                    Post recommendation
                </Button>
            </Form>
        </>
    )
}

export default NewRecommendationForm