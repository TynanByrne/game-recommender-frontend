import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import Searchbar from './components/Searchbar'
import SearchResults from './components/SearchResults';

const App: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  return (
    <div>
      <Searchbar setSearch={setSearch} search={search} />
      <Switch>
        <Route path='/games/:search'>
          <SearchResults />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
