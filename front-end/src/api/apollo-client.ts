import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AccessToken } from './access-token';

// GraphQL endpoint
const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql',
});

// Middleware for adding the token to the request headers
const authLink = setContext((_, { headers }) => {
  const token = AccessToken;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Creating the Apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
