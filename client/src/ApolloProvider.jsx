import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const API_URI =
  window.location.hostname === 'localhost'
    ? 'http://localhost:1337/graphql'
    : 'https://audiustree-graphql.vercel.app/graphql';

const client = new ApolloClient({
  uri: API_URI,
  cache: new InMemoryCache(),
});

export default () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};
