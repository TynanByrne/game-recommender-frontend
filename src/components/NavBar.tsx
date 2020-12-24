import { useApolloClient } from '@apollo/client'
import { AppBar, Button, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { loggedInVar, tokenVar } from '../graphql/cache'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const NavBar: React.FC = () => {
  const client = useApolloClient()
  const classes = useStyles()
  const logOut = (): void => {
    tokenVar('')
    localStorage.clear()
    client.resetStore()
  }
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant='h4' className={classes.title}>Game Recommender</Typography>
        <Button color='inherit' component={RouterLink} to='/'>Home</Button>
        {loggedInVar() && <Button variant='contained' onClick={logOut}>
          Log out
        </Button>}
        {!loggedInVar() && (
          <>
            <Button color='inherit' component={RouterLink} to='/login'>
              Log in
            </Button>
            <Button color='inherit' component={RouterLink} to='/signup'>
              Sign up
            </Button>
          </>)}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar