import { useQuery } from '@apollo/client'
import { CircularProgress, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { GET_LIBRARY, ME } from '../../graphql/queries'
import { MyLibraryData } from '../../types'
import { MeData } from '../Home'
import CategoryFilters from './CategoryFilters'
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
  const [categories, setCategories] = useState({
    playing: true,
    unfinished: true,
    notStarted: true,
    completed: true,
    wishlist: true,
  })
  const [search, setSearch] = useState<string>('')

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
        <CategoryFilters
          categories={categories}
          setCategories={setCategories}
          setSearch={setSearch}
          search={search} />
        <LibraryList
          library={library}
          categoryState={categories}
          search={search} />
      </>
    )
  }

  return <Typography>Something went wrong...</Typography>


}

export default GameLibrary