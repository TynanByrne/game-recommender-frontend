import { useQuery } from '@apollo/client'
import { CircularProgress, Typography } from '@material-ui/core'
import React from 'react'
import { GET_LIBRARY, ME } from '../../graphql/queries'
import { MyLibraryData } from '../../types'
import { MeData } from '../Home'
import LibraryList from './LibraryList'

interface LibraryVars {
  libraryId: string
}

const GameLibrary: React.FC = () => {
  const meResult = useQuery<MeData>(ME)
  console.log(meResult.data)
  const libraryResult = useQuery<MyLibraryData, LibraryVars>(GET_LIBRARY, {
    variables: { libraryId: meResult?.data?.me?.library || '' }
  })

  if (libraryResult.loading) {
    return (
      <>
        <Typography variant='h4'>
          Loading game library...
      </Typography>
        <CircularProgress size='60vw' />
      </>
    )
  }

  const library = libraryResult?.data?.myLibrary?.games

  if (library) {
    return (
      <>
        <Typography variant='h2'>
          This is your game library
        </Typography>
        <br />
        <LibraryList library={library} />
      </>
    )
  }

  return <Typography>Something went wrong...</Typography>


}

export default GameLibrary