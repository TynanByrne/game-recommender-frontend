import { useApolloClient } from '@apollo/client'
import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { loggedInVar, tokenVar } from '../graphql/cache'

const NavBar: React.FC = () => {
  const client = useApolloClient()
  const logOut = (): void => {
    tokenVar('')
    localStorage.clear()
    client.resetStore()
  }
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu'>
          <MenuIcon />
        </IconButton>
        <Button variant='contained' component={RouterLink} to='/'>home</Button>
        {loggedInVar() && <Button variant='contained' onClick={logOut}>
          Log out
          </Button>}
        {!loggedInVar() && (
          <>
            <Button variant='contained' component={RouterLink} to='/login'>
              Log in
            </Button>
            <Button variant='contained' component={RouterLink} to='/signup'>
              Sign up
            </Button>
          </>)}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar