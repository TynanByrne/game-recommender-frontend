import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import Searchbar from './components/Searchbar'
import SearchResults from './components/SearchResults';

const App: React.FC = () => {
const [search, setSearch] = useState<string>('')
  return (
    <Router>
      <div>
        <Searchbar setSearch={setSearch} search={search} />
        <Switch>
          <Route path='/games'>
            <SearchResults search={search} />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
