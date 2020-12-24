import { Container, CssBaseline } from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Searchbar from './components/Searchbar'
import SearchResults from './components/SearchResults';
import SignUp from './components/SignUp';

const App: React.FC = () => {
  return (
    <CssBaseline>
      <NavBar />
      <Container maxWidth='md'>
        <Searchbar />
        <Switch>
          <Route path='/games/:search'>
            <SearchResults />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Container>
    </CssBaseline>
  )
}

export default App;
