---
title: "Joins / nested queries"
date: 2019-09-17T07:20:48+05:30
draft: true
weight: 7
---

You can join data from **different data sources** by making nested queries. 

These join work for **any database** even if it is not relational (e.g., MongoDB).

> **Note:** The joins capability is available only via GraphQL as of now. If you instead want to join data from our client SDKs or have some complex join operations, we recommend to make views on your tables and query them as regular tables.

## Same database joins

**Example:** Fetch a list of trainers along with their caught pokemons:

{{< highlight graphql >}}
query {
  trainers @mongo {
    _id
    name
    caught_pokemons(
      where: {trainer_id: "trainers._id"}
    ) @mongo {
      name
    }
  }
}
{{< /highlight >}}

If you would have noticed, you can access the parent query's data in your nested query. In the above example, we used `trainers._id` in our nested query.

> **Note:** You can even sort and paginate the nested queries.

## Cross-database joins

Cross-database joins are used to join **data from different databases**. 

For instance, some of our data can be in MongoDB, and some can be in PostgreSQL, and you want to query them in a single request.

**Example:** Fetch a list of trainers along with their caught pokemons (trainers is in PostgreSQL and caught pokemons in MongoDB):

{{< highlight graphql >}}
query {
  trainers @postgres {
    id
    name
    caught_pokemons(
      where: {trainer_id: {_eq: "trainers.id"}}
    ) @mongo {
      name
    }
  }
}
{{< /highlight >}}