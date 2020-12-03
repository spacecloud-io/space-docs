---
title: "Joins / nested queries"
description: "Joins / nested queries"
date: 2019-09-17T07:20:48+05:30
draft: false
weight: 6
---

Space Cloud allows you to join data from **different data sources** easily.

> **Note:** The joins capability is available only via GraphQL as of now. If you instead want to join data from our client SDKs or have some complex join operations, we recommend using [prepared queries](/storage/database/prepared-queries).

## Native SQL joins

Space Cloud allows you to perform native SQL joins easily via its GraphQL API.

**Example:** Fetch users along with their address:

{{< highlight graphql>}}
query {
  users(join: $join) @postgres {
    name
    address {
      country
      pincode
    }
  }
}
{{< /highlight >}}

Variables: 

{{< highlight json>}}
{
  "join": [
    {
      "type": "LEFT",
      "table": "address",
      "on": {"users.id": "address.user_id"}      
    }
  ]
}
{{< /highlight >}}

> You can use any `type` of joins (`LEFT`, `RIGHT`, `INNER`, `OUTER`, etc.) that your database supports.

### Joining multiple tables

No matter how many tables you want to join, Space Cloud will always fire a **single performant SQL query** under the hood when using the `join` clause.

**Example:** Fetch users along with their posts and address:

{{< highlight graphql>}}
query {
  users(join: $join) @postgres {
    name
    posts {
      title
      views {
        count
      }
    }
    address {
      country
      pincode
    }
  }
}
{{< /highlight >}}

Variables: 

{{< highlight json>}}
{
  "join": [
    {
      "type": "LEFT",
      "table": "posts",
      "on": {"users.id": "posts.user_id"},
      "join": [
        {
          "type": "LEFT",
          "table": "views",
          "on": {"posts.id": "views.post_id"}
        }
      ]    
    },
    {
      "type": "LEFT",
      "table": "address",
      "on": {"users.id": "address.user_id"}      
    }
  ]
}
{{< /highlight >}}

### Using join with other operations

You can use any other operation like filtering, sorting, limiting, etc. along with joins.

**Points to remember:**

- Any other argument like `where`, `sort`, `limit`, etc. even for the nested tables should be specified on the root table when using `join`.
- Field names while using joins are specified in the `<table-name>.<field-name>` format. However, if you are specifying the field names in the GraphQL query itself, you would have to use `<table-name>__<field-name>` format, since GraphQL query syntax does not allows the dot notation in the keys. 

**Example:** Fetch all users where country is `India`:

{{< highlight graphql>}}
query {
  users(join: $join, where: $where) @postgres {
    name
    address {
      country
      pincode
    }
  }
}
{{< /highlight >}}

Variables: 

{{< highlight json>}}
{
  "join": [
    {
      "type": "LEFT",
      "table": "address",
      "on": {"users.id": "address.user_id"}      
    }
  ],
  "where": {
    "address.country": "India"
  }
}
{{< /highlight >}}

### Returning flat response

In certain use cases, you might want a flat response instead of a nested one. To get a flat response, specify `returnType` in the query.

**Example:** Fetch users along with their address in a flat structure

{{< highlight graphql "hl_lines=2">}}
query {
  users(join: $join, returnType: table) @postgres {
    users__name
    address__country
    address__pincode
  }
}
{{< /highlight >}}

Variables: 

{{< highlight json>}}
{
  "join": [
    {
      "type": "LEFT",
      "table": "address",
      "on": {"users.id": "address.user_id"}      
    }
  ]
}
{{< /highlight >}}

## Performing on-the-fly joins

On-the-fly joins can be used to join data from any data source. Here are some of the use cases for on-the-fly joins:

- Joining data in NoSQL databases like MongoDB.
- Cross-database joins.
- Cross-database and microservice joins.

> **Native SQL joins are far more performant than on-the-fly joins and should be used wherever possible.**

### Cross-database joins

Let's say we want to fetch all the trainers along with their pokemons. The `trainer` table is in Postgres, while the `pokemon` table is in MongoDB. Here's how you can use an on-the-fly join to perform this cross database join:

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

As you can see, we specify the conditions for joining data in the `where` clause for on-the-fly joins. In the above example, the `trainer_id` field from the `pokemon` table is joined to the `id` field in the `trainer` table.

### Cross-database and microservice joins

Let's say we want to fetch all the users along with their billing info. 

Let's assume we have made a remote service named `billing` that fetches the billing info a user from your payment gateway's API. Assuming that this is the query for the remote service that you need to fire to fetch billing info of a user:

{{< highlight graphql>}}
query {
  billing_info (userId: $userId) @billing {
    status
    billing_address
  }
}
{{< /highlight >}}

Here's how we can join this remote service with our `users` table:

{{< highlight graphql "hl_lines=5">}}
query {
  users @postgres {
    id
    name
    billing_info (userId: "users.id") @billing {
      status
      billing_address
    }
  }
}
{{< /highlight >}}

## Implicit joins based on links

If you have defined links in your schema, then you can fetch the linked/nested data without specifying the `join` clause or any conditions for joining in the `where` clause.

**Example:** Fetch a list of trainers along with their caught pokemons:

To fetch trainers along with their pokemons using links, we first need to describe the relationship between trainer and pokemon using the `@link` directive: 

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

> **Native SQL joins are far more performant than on-the-fly joins or the joins using links and should be used wherever possible.**