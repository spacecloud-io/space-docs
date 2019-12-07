---
title: "Joins / nested queries"
date: 2019-09-17T07:20:48+05:30
draft: true
weight: 7
---

You can join data from **different data sources** by making nested queries. Joins can be performed based on the [relations](/essentials/data-modelling/relations) described in your schema.

These join work for **any database** even if it is not relational (e.g., MongoDB).

> **Note:** The joins capability is available only via GraphQL as of now. If you instead want to join data from our client SDKs or have some complex join operations, we recommend to make views on your tables and query them as regular tables.

## Same database joins

**Example:** Fetch a list of trainers along with their caught pokemons:

To fetch trainers along with their pokemons, we first need to describe the relationship between trainer and pokemon using the `@link` directive: 

{{< highlight graphql "hl_lines=4">}}
type trainer {
  id: ID! @primary
  name: String!
  pokemons: [pokemon] @link(table: "pokemon", from: "id", to: "trainer_id")
}

type pokemon {
  id: ID! @primary
  name: String!
  trainer_id: ID! @foreign(table: "trainer", field: "id")
}
{{< /highlight >}}

Now, you can query a list of trainers along with their pokemons:

{{< highlight graphql >}}
query {
  trainer @postgres {
    id
    name
    pokemons {
      name
    }
  }
}
{{< /highlight >}}

The above GraphQL query joins the `trainer` and the `pokemon` table on the backend with the condition `trainer.id == pokemon.trainer_id`. Space Cloud derives this condition from the arguments (`table`, `from` and `to`) you provide to the `@link` directive.

> **Note:** You can even sort and paginate the nested queries.

## Performing joins on the fly

It's not necessary to mention the `@link` directive to join data from two tables/sources. You can even perform joins directly by specifying the join condition on the frontend:

{{< highlight graphql "hl_lines=5">}}
query {
  trainer @postgres {
    id
    name
    pokemons (where: { trainer_id: "trainer.id" }) @mongo {
      name
    }
  }
}
{{< /highlight >}}

If you would have noticed, you can access the parent query's data in your nested query. 

The where clause that you specify here `trainer_id: trainer.id` results into the same join operation on the backend as earlier with the condition `trainer.id == pokemon.trainer_id`. The only difference is that here we are specifying the condition in the query rather than the schema. In the above example, we used `trainers._id` in our nested query.

> **Note:** The join operation is always performed on backend only irrespective of where you describe the relation.

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