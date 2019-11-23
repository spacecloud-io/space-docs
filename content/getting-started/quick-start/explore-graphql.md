---
title: "Exploring GraphQL APIs"
date: 2019-09-26T12:58:22+05:30
draft: true
---

Let's explore some awesome powers of Space Cloud. In this guide, we will:

- Create tables
- Make trainers and catch Pokemons 😍 (Insert operation)
- Retrieve all trainers (Simple query operation)
- Retrieve all trainers along with their Pokemons 😎 (Join operation)

## Create tables

> **Note:** If you are using MongoDB, you can skip this step, since MongoDB is schemaless.

Head over to the `Database` section in `Mission Control`.

Click on `Add table` button to open this form:

![Create a project screen](/images/screenshots/add-table.png)

Give your table name as `trainer`.

**Copy-paste the following schema and hit save:**

{{< highlight graphql >}}
type trainer {
  id: ID! @primary
  name: String!
}
{{< /highlight >}}

> **Note:** Don't worry if this syntax is new to you. It is GraphQL SDL which Space Cloud uses to create tables for you. You can read more about it later from [here](/essentials/data-modelling).

Similarly, to create `pokemon` table click on `Add Table` button once again.

Give your table name as `pokemon`.

{{< highlight graphql >}}
type pokemon {
  id: ID! @primary
  name: String!
  trainer_id: ID!
}
{{< /highlight >}}

## Making trainers (insert operation)

Making trainers requires us to insert records of trainers into the database.

Head over to the `Explorer` section in `Mission Control`:

![Explorer](/images/screenshots/explorer.png)

Try running the following query in the GraphiQL section:

{{< highlight graphql >}}
mutation {
  insert_trainer(
    docs: [
      { id: "1", name: "Ash" },
      { id: "2", name: "Misty" },
      { id: "3", name: "Brock" }
    ]
  ) @postgres {
    status
  }
}
{{< /highlight >}}

On successful insert, you should be able to see the `status` as `200` which means you have inserted the records in the database successfully.

## Retrieving trainers (query operation)

Now let's get the list of trainers back using graphql. Try running the following query:

{{< highlight graphql >}}
query {
  trainer @postgres {
    id
    name
  }
}
{{< /highlight >}}

There, we get our list of trainers!

## Catch Pokemons (insert operation)

Catching Pokemons requires us to insert Pokemon data into the database (And lots of hard work, of course!😅)

{{< highlight graphql >}}
mutation {
  insert_pokemon(
    docs: [
      { id: "1", name: "Pikachu", trainer_id: "1" },
      { id: "2", name: "Snorlax", trainer_id: "1" },
      { id: "3", name: "Psyduck", trainer_id: "2" },
      { id: "4", name: "Staryu", trainer_id: "2" },
      { id: "5", name: "Onix", trainer_id: "3" }
    ]
  ) @postgres {
    status
  }
}
{{< /highlight >}}

Great! That's enough of Pokemon catching for the day. Now time for the trainers to show off their Pokemons.

## Retrieve trainers along with their Pokemons (join operation) 

Try running the following query in GraphiQL:

{{< highlight graphql >}}
query {
  trainer @postgres {
    id
    name
    pokemon (
      where: {trainer_id: {_eq: "trainer.id"}}
    ) @postgres {
      id
      name
    }
  }
}
{{< /highlight >}}

The response should look something like this:

{{< highlight json >}}
{
  "data": {
    "trainer": [
      {
        "id": "1",
        "name": "Ash",
        "pokemon": [
          { "id": "1", "name": "Pikachu" },
          { "id": "2", "name": "Snorlax" }
        ]
      },
      {
        "id": "2",
        "name": "Misty",
        "pokemons": [
          { "id": "3", "name": "Snorlax" },
          { "id": "4", "name": "Staryu" }
        ]
      },
      {
        "id": "3",
        "name": "Brock",
        "pokemons": [
          { "id": "5", "name": "Onix" }
        ]
      }      
    ]
  }
}
{{< /highlight >}}

## Next Steps

Awesome! We have just started our Pokemon journey _without writing a single line of backend code_. The journey ahead is undoubtedly going to be super exciting!

Read more about:

- [Building your schema](/essentials/data-modelling)
- [Database queries](/essentials/queries)
- [Mutations](/essentials/mutations)
- [Realtime subscriptions](/essentials/subscriptions)
- [Authentication & Authorization](/auth)