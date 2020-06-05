---
title: "Setting up graphql"
description: "Setting up a GraphQL Client"
date: 2019-09-26T09:23:36+05:30
draft: false
weight: 1
---

This guide is for setting up Apollo client in your javascript projects.

## Basic setup

> **The basic setup uses the HTTP link only. If you want to use realtime subscriptions in your app then you must check out [advanced setup](/introduction/setting-up-project/graphql#advanced-setup).**

### Installing dependencies

{{< highlight bash >}}
npm install --save npm i graphql apollo-boost subscriptions-transport-ws apollo-link-context
{{< /highlight >}}

### Creating client

The `URI` for the client takes two parameters: 

- **PROJECT_ID:** Unique identifier of a project. It's derived by converting your project name to lowercase. For example `TodoApp` becomes `todoapp`.
- **SPACE_CLOUD_URL:** This is the URL of your `space-cloud` binary. It's `http://localhost:4122` or `https://localhost:4126` for HTTP and HTTPS endpoints respectively.

> **Note:** Replace `localhost` with the address of your Space Cloud if you are not running it locally.

**Example:**

{{< highlight javascript >}}
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const httpLink = new HttpLink({
  uri: 'http://localhost:4122/v1/api/PROJECT_ID/graphql'
})

// Middleware to pass token in each HTTP request
const httpAuthLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // replace the below implementation to get token from wherever you might have stored it.
  const token = localStorage.getItem("token")

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ""
    }
  }
});

// Instantiate client
const client = new ApolloClient({
  cache: new InMemoryCache({ addTypename: false }),
  link: httpAuthLink.concat(httpLink)
})
{{< /highlight >}}

### Making your first query

{{< highlight javascript >}}
import gql from "graphql-tag";

client
  .query({
    query: gql`
      query {
        pokemons @mydb {
          name
        }
      }
    `
  })
  .then(({ data }) => console.log(data.pokemons));
{{< /highlight >}}

> **Note:** To query a database, you need to mention a `@<db-alias-name>` directive (`@mydb` in the above example) specifying which database you want to query.

The alias name identifies a database in your project uniquely. You can find out the alias name for your database from the database selector of the topbar in the Database section of Mission Control.

## Advanced client

This client setup uses both the HTTP and WebSocket links smartly based on the type of request. You should use this configuration if you want to use GraphQL subscriptions along with queries and mutations.

### Installing dependencies

{{< highlight bash >}}
npm install --save npm i graphql apollo-boost subscriptions-transport-ws apollo-link-context apollo-link-ws
{{< /highlight >}}

### Creating client

We are using the capability of splitting links to choose a link based on the operation dynamically. 

All queries and mutations go over the HTTP link, whereas the subscriptions go over the WebSocket link.  

**Example:**

{{< highlight javascript >}}
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';

// Create HTTP link that will be used for queries and mutations
const httpLink = new HttpLink({
  uri: "http://localhost:4122/v1/api/PROJECT_ID/graphql", // use https for secure endpoint
});

// Create Websocket link that will be used for subscriptions
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4122/v1/api/PROJECT_ID/graphql/socket", // use wss for a secure endpoint
  options: {
    reconnect: true
  }
});

wsLink.subscriptionClient.onReconnected(() => console.log("Reconnected"))

// Subscription middleware that adds token to each subscription request
const subscriptionAuthMiddleware = {
  applyMiddleware: async (options, next) => {
    options.authToken = getToken()
    next()
  }
}

// Add the subscription auth middleware to the web socket link
wsLink.subscriptionClient.use([subscriptionAuthMiddleware])

// Using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// Middleware to pass token in each HTTP request
const httpAuthLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ""
    }
  }
});

// Instantiate client
const client = new ApolloClient({
  cache: new InMemoryCache({ addTypename: false }),
  link: httpAuthLink.concat(link)
});
{{< /highlight >}}

### Subscribing to data

{{< highlight javascript >}}
import gql from "graphql-tag";

const subscription = client
  .subscribe({
    query: gql`
      subscription {
        pokemons(
          where: {trainer_id: TRAINER_ID}
        ) @mydb {
          type
          payload # Contains the actual document
          find # Object containing the unique fields of the concerned document 
        }
      }
    `
  }).subscribe(({ data }) => {
    const { type, payload, find } = data.pokemons
    console.log("Subscription data: ", type, payload, find)
  }, (error) => console.log("Subscription error: ", error.message));  
{{< /highlight >}}

> **Note:** To query a database, you need to mention a `@<db-alias-name>` directive (`@mydb` in the above example) specifying which database you want to query.

The alias name identifies a database in your project uniquely. You can find out the alias name for your database from the database selector of the topbar in the Database section of Mission Control.

## Next steps

Great! You have initialized the graphql client in your project.

Feel free to check out various capabalities of `space-cloud`:

- Perform database [queries](/storage/database/queries)
- [Mutate](/storage/database/mutations) data
- [Realtime](/storage/database/subscriptions) data sync across all devices
- Manage files with ease using [File Storage](/storage/filestore) module
- [Authenticate](/user-management) your users
- Write [custom business logic](/microservices/graphql)