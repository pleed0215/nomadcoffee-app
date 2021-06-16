import { makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_NAME } from "../constants";

import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import { apolloCache } from "./cache";

//const HTTP_ENDPOINT = `https://nomadcoffee.herokuapp.com/graphql`;
//const WS_ENDPOINT = `wss://nomadcoffee.herokuapp.com/graphql`;
const HTTP_ENDPOINT = `https://nomadcoffee.herokuapp.com/graphql`;
const WS_ENDPOINT = `wss://nomadcoffee.herokuapp.com/graphql`;

const uploadLink = createUploadLink({ uri: HTTP_ENDPOINT });

// vars
export const getTokenFromStorage = () => AsyncStorage.getItem(AUTH_TOKEN_NAME);
export const setTokenToStorage = (token: string) =>
  AsyncStorage.setItem(AUTH_TOKEN_NAME, token);
export const removeTokenFromStorage = () =>
  AsyncStorage.removeItem(AUTH_TOKEN_NAME);
export const isLoggedInVar = makeVar(false);
export const authTokenVar = makeVar("");
export const makeLogin = (token: string) => {
  setTokenToStorage(token);
  isLoggedInVar(true);
  authTokenVar(token);
};
export const makeLogout = async () => {
  removeTokenFromStorage();
  isLoggedInVar(false);
  authTokenVar("");
  await apolloClient.clearStore();
};

const wsLink = new WebSocketLink({
  uri: WS_ENDPOINT,
  options: {
    reconnect: true,
    connectionParams: {
      "x-jwt": authTokenVar() || "",
    },
  },
});
const authLink = setContext((request, prevContext) => {
  return {
    headers: {
      ...prevContext.headers,
      "x-jwt": authTokenVar() || "",
    },
  };
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(errorLink).concat(uploadLink)
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: apolloCache,
});
