import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import Searchbar from './components/Searchbar'
import SearchResults from './components/SearchResults';
import { SearchedGamesData } from './types';

const App: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [gamesData, setGamesData] = useState<SearchedGamesData | undefined>()
  console.log(gamesData)
  return (
    <div>
      <Searchbar setSearch={setSearch} search={search} setGamesData={setGamesData} />
      <Switch>
        <Route path='/games'>
          <SearchResults gamesData={gamesData} />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
