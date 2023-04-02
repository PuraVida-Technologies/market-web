import { ApolloClient, InMemoryCache } from '@apollo/client';
import config from "@/config/environments";

const client = new ApolloClient({
  uri: config.provider.baseUrl,
  cache: new InMemoryCache(),
});

export default client;
