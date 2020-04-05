---
title: "Setting up graphql"
date: 2019-09-26T09:23:36+05:30
draft: false
weight: 1
---

This guide is for setting up Apollo client in your javascript projects.

## Basic client

The basic client uses the HTTP link which is enough if you don't intend to use subscriptions. See [advanced client](/getting-started/setting-up-project/graphql#advanced-client) for subscriptions. 
### Installing dependencies

{{< highlight bash >}}
npm install --save apollo-client apollo-cache-inmemory apollo-link-http graphql-tag
{{< /highlight >}}

### Creating client

The `URI` for the client takes two parameters: 

- **PROJECT_ID:** Unique identifier of a project. It's derived by converting your project name to lowercase and replacing all spaces and hyphens to underscores. For example `Todo App` becomes `todo_app`.
- **SPACE_CLOUD_URL:** This is the URL of your `space-cloud` binary. It's `http://localhost:4122` or `https://localhost:4126` for HTTP and HTTPS endpoints respectively.

> **Note:** Replace `localhost` with the address of your Space Cloud if you are not running it locally.

**Example:**

{{< highlight javascript >}}
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const link = new HttpLink({
  uri: 'http://localhost:4122/v1/api/PROJECT_ID/graphql'
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})
{{< /highlight >}}

### Making your first query

{{< highlight javascript >}}
import gql from "graphql-tag";

client
  .query({
    query: gql`
      query {
        pokemons @mongo {
          name
        }
      }
    `
  })
  .then(result => console.log(result));
{{< /highlight >}}

> **Note:** To query a database, you need to mention a `@directive` to specify which database you want to query.

The directives for databases are:

- `@mongo`: For MongoDB
- `@postgres` : For PostgreSQL and PostgreSQL compatible databases (eg: CockroachDB, Yugabyte)
- `@mysql`: For MySQL and MySQL compatible databases (eg: TiDB)
- `@sqlserver`: For SQL Server

## Advanced client

This client setup uses both the HTTP and WebSocket links smartly based on the type of request.

### Installing dependencies

{{< highlight bash >}}
npm install --save apollo-client apollo-link-ws apollo-link-http apollo-link apollo-utilities apollo-cache-inmemory subscriptions-transport-ws graphql-tag
{{< /highlight >}}

### Creating client

We are using the capability of splitting links to choose a link based on the operation dynamically. 

All queries and mutations go over the HTTP link, whereas the subscriptions go over the WebSocket link.  

**Example:**

{{< highlight javascript >}}
import ApolloClient from "apollo-client";
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';


const httpLink = new HttpLink({
  uri: "http://localhost:4122/v1/api/PROJECT_ID/graphql", // use https for secure endpoint
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4122/v1/api/PROJECT_ID/graphql/socket", // use wss for a secure endpoint
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

// Instantiate client
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})
{{< /highlight >}}

### Subscribing to data

{{< highlight javascript >}}
import gql from "graphql-tag";

const subscription = client
  .subscribe({
    query: gql`
      subscription {
        caught_pokemons(
          where: {trainer_id: TRAINER_ID}
        ) @mongo {
          type
          payload # Contains the actual document
          find # Object containing the unique fields of the concerned document 
        }
      }
    `
  })

subscription.subscribe(value => console.log(value));  

{{< /highlight >}}

> **Note:** To query a database, you need to mention a `@directive` to specify which database you want to query.

The directives for databases are:

- `@mongo`: For MongoDB
- `@postgres` : For PostgreSQL and PostgreSQL compatible databases (eg: CockroachDB, Yugabyte)
- `@mysql`: For MySQL and MySQL compatible databases (eg: TiDB)
- `@sqlserver`: For SQL Server


## Next steps

Great! You have initialized the graphql client in your project.

Feel free to check out various capabalities of `space-cloud`:

- Perform database [queries](/storage/database/queries)
- [Mutate](/storage/database/mutations) data
- [Realtime](/storage/database/subscriptions) data sync across all devices
- Manage files with ease using [File Storage](/storage/file-storage) module
- [Authenticate](/auth/authentication) your users
- [Deploy your custom services](/microservices/deployments)