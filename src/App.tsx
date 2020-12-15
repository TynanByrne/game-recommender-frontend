import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import Searchbar from './components/Searchbar'
import SearchResults from './components/SearchResults';
import SignUp from './components/SignUp';

const App: React.FC = () => {
  return (
    <div>
      <Searchbar />
      <Switch>
        <Route path='/games/:search'>
          <SearchResults />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
