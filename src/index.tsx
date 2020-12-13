import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloClient, ApolloProvider, HttpLink
} from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { cache } from './graphql/cache'

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
})

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);