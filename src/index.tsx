/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloClient, ApolloProvider, createHttpLink
} from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { cache } from './graphql/cache'
import { setContext } from 'apollo-link-context';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
  }
})

const httpLink = createHttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink as any) as any // TypeScript and Apollo not playing nice here
})

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);