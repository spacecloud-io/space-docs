---
title: "Limitations"
description: "Limitations"
date: 2020-04-02T18:30:15+05:30
draft: false
weight: 2
---

We took some architectural decisions while designing the realtime module of Space Cloud to make it performant and scalable. This means that you need to abide by some rules while designing your app for realtime subscriptions.

Following are the rules that you need to follow for realtime subscriptions to work correctly:

- The table/collection should have a unique identity (primary key or a unique key) in its schema.
- All mutations (inserts, updates and deletes) have to take place via Space Cloud.
- All updates and deletes can be made on a single document only using the unique identity (primary/unique fields) in the where clause.
- Another request should not update the fields used in the where clause of `liveQuery`.


**For example**, the realtime subscriptions on the `pokemons` table will not work for the following use case because the mutation query does not include the primary field in the `where` clause:

Schema:

{{< highlight graphql>}}
type pokemon {
  id: ID! @primary
  name: String!
  combat_power: Integer!
}
{{< /highlight >}}


Mutation query (for which the subscription won't work):

{{< highlight graphql>}}
mutation {
  update_pokemons (where: {name: {_eq: $pokemonName}}, set: {combat_power: 500}) @postgres {
    status
    error
  }
}
{{< /highlight >}}

To fix this mutation, we need to use the unique identity (`id` field in this case) in the `where` clause like this:

{{< highlight graphql>}}
mutation {
  update_pokemons (where: {id: {_eq: $pokemonId}}, set: {combat_power: 500}) @postgres {
    status
    error
  }
}
{{< /highlight >}}

> **These limitations are only applicable to those tables for which you want the realtime functionality.**

