import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { NEXT_SET, SEARCH_GAMES } from '../graphql/queries'
import { GameDetails, NextSetData, NextSetVars, SearchedGamesData, SearchedGamesVars } from '../types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLazyQuery, useQuery } from '@apollo/client'
import Axios from 'axios'

const style = {
  border: "1px solid",
  margin: 6,
  padding: 8
}

const SearchResults: React.FC = () => {
  const { search } = useParams<{ search: string }>()
  const [games, setGames] = useState<GameDetails[]>([])
  const [nextLink, setNextLink] = useState<string>('')
  console.log(search)
  const history = useHistory()
  const { loading, data } = useQuery<SearchedGamesData, SearchedGamesVars>(SEARCH_GAMES,
    { variables: { searchTerm: search } }
  )
  useEffect(() => {
    if (data) {
      setGames(data.searchGames.results)
      setNextLink(data.searchGames.next)
    }

  }, [data])
  const [fetchGames] = useLazyQuery<NextSetData, NextSetVars>(NEXT_SET, {
    fetchPolicy: 'cache-and-network',
    variables: { url: nextLink },
    onCompleted: (data) => {
      console.log("data is", data)
      setGames(games.concat(data.nextSet.results))
      setNextLink(data.nextSet.next)
      console.log("GAMES ARE NOW", games)
      console.log("NEXT LINK IS NOW", nextLink)
    },
  })

  const fetchMore = async () => {
    /* fetchGames({ variables: { url: nextLink } }) */
    const { data } = await Axios.get<NextSetData>(nextLink)
    setGames(games.concat(data.nextSet.results))
    setNextLink(data.nextSet.next)
    console.log("FETCHED")
  }

  console.log("games are", games)
  return (
    <>
      <h1>Here are all the games that match that search</h1>
      <br />
      <button onClick={(): void => history.push('/')}>Go home</button>
      {loading && <div>Loading...</div>}
      {games && <InfiniteScroll
        dataLength={games.length}
        next={fetchMore}
        hasMore={true}
        loader={<h3>Loading...</h3>}
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