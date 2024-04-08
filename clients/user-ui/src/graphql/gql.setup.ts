import { ApolloClient, InMemoryCache } from '@apollo/client';

console.log('process.env.SERVER_URI', process.env.SERVER_URI);
export const graphqlClient = new ApolloClient({
  uri: process.env.SERVER_URI,
  cache: new InMemoryCache(),
});
