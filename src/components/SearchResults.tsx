import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { GET_CURRENT_NEXT, GET_EXTRA_GAMES, SEARCH_GAMES } from '../graphql/queries'
import { GameDetails, SearchedGamesData, SearchedGamesVars, SearchedGames } from '../types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useQuery } from '@apollo/client'
import axios from 'axios'
import { extraGamesVar, currentNextVar } from '../graphql/cache'

const style = {
  border: "1px solid",
  margin: 6,
  padding: 8
}

interface ExtraGamesData {
  extraGames: GameDetails[]
}

interface CurrentNextData {
  currentNext: string
}

const SearchResults: React.FC = () => {
  const { search } = useParams<{ search: string }>()
  const history = useHistory()
  const [hasMore, setHasMore] = useState(true)
  const { loading, data } = useQuery<SearchedGamesData, SearchedGamesVars>(SEARCH_GAMES,
    { variables: { searchTerm: search } }
  )
  const { loading: extraLoading, data: extraData } = useQuery<ExtraGamesData>(GET_EXTRA_GAMES)
  const { loading: currentLoading, data: currentData } = useQuery<CurrentNextData>(GET_CURRENT_NEXT)
  useEffect(() => {
    currentNextVar(data?.searchGames.next)
  }, [data])

  if (!loading && !data) {
    return <div>Something went wrong!</div>
  }

  const extraGames = extraData ? extraData.extraGames : []
  const games = data ? [...data.searchGames.results, ...extraGames] : []


  const fetchMore = async () => {
    if (!currentData?.currentNext) {
      setHasMore(false)
      return
    }
    try {
      const { data } = await axios.get<SearchedGames>(currentNextVar())
      console.log(data)
      extraGamesVar([...extraGames, ...data.results])
      currentNextVar(data.next)
    } catch (error) {
      console.error("COULD NOT FETCH")
      console.log(error)
    }
  }

  console.log("games are", games)
  return (
    <>
      <h1>Here are all the games that match that search</h1>
      <br />
      <button onClick={(): void => history.push('/')}>Go home</button>
      {games && <InfiniteScroll
        dataLength={games.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h3>Loading...</h3>}
        endMessage={
          <div>
            <b>That is all, folks!</b>
          </div>
        }
      >
        {games.map(game => (
          <div style={style} key={game.id}>
            <p>{game.name}</p>
            <p>{game.rating}</p>
          </div>
        ))}
      </InfiniteScroll>}
    </>
  )
}

export default SearchResults