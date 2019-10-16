---
title: "Getting Started"
date: 2019-10-15T10:25:42+05:30
draft: true
weight: 1
---

This guide helps you model a Pokemon app 😛 to explore the data modelling in Space Cloud!

> **Note:** This guide assumes PostgreSQL as the database, but you can use whichever you like.

## Setup

If you want to follow this guide along practically, first [deploy Space Cloud](/getting-started/deployment) along with PostgreSQL and create a project with PostgreSQL as the primary database.

After creating the project, head over to the `Overview` tab in the `Database` section.

Time for some data modelling now!

## Modelling the data

The Pokemon app which we are going to build have trainers and pokemons (quite obvious😅). 

Each pokemon belongs to a single trainer, and each trainer can have multiple pokemons😋. Note that this a **one-to-many relationship**. Read more about modelling relations [here](/essentials/data-modelling/relations).

### Trainers

We want each trainer to have a unique id, name and city field. 

Click `Add table` button in the Database Overview page in Mission Control.

Name your table as `trainers`.

Copy-paste the following schema and hit `Save`:

{{< highlight graphql >}}
type trainers {
  id: ID! @id
  name: String!
  city: String
}
{{< /highlight >}}

> **Note:** Space Cloud have created a `trainers` table in your database with the above schema.

The exclamation mark `!` for `id` and `name` indicates that these fields are required (i.e. they can't be null).

### Pokemons and their relation with trainers

Let's say a trainer wants to record the name and combat power of each pokemon along with the date when he captured it. 

We must not forget that each pokemon can belong to only one trainer.

Once again click on the `Add table` button to add `pokemons` table with the following schema:

{{< highlight graphql >}}
type pokemons {
  id: ID! @id
  name: String!
  combat_power: Integer
  trainer_id: trainers! @relation(field: "id")
  caught_on: DateTime! @createdAt
}
{{< /highlight >}}

The `@relation` directive above instructs Space Cloud to create a foreign key on the `id` field of the `trainers` table.  This foreign key prevents any actions that would destroy the links between the `pokemons` and `trainers` table. Which means that the database would throw an error if you delete a trainer before deleting their pokemons.

The `@createdAt` directive helps Space Cloud to automatically insert the datetime value whenever you insert a pokemon into the `pokemons` table.

## Time to play around

Let's insert some data and see whether Space Cloud is validating our data and maintaining its integrity or not.

Head over to the `Explorer` section in Mission Control.

### Creating some trainers and catching pokemons 

Try running the following graphql queries to insert some trainers and pokemons:

{{< highlight graphql >}}
mutation {
  insert_trainers(
    docs: [
      {id: "ash", name: "Ash", city: "Pallete Town"},
      {id: "misty", name: "Misty", city: "Cerulean City"}
    ]
  ) @postgres {
    status
  }
  insert_pokemons(
    docs: [
      {id: "1", name: "Pikachu", combat_power: 200, trainer_id: "ash"},
      {id: "2", name: "Charmender", combat_power: 150, trainer_id: "ash"},
      {id: "3", name: "Psyduck", combat_power: 180, trainer_id: "misty"},
      {id: "4", name: "Goldeen", combat_power: 150, trainer_id: "misty"}
    ]
  ) @postgres {
    status
  }
}
{{< /highlight >}}

You would see a response like this:

{{< highlight json >}}
{
  "insert_pokemons": {
    "status": 200
  },
  "insert_trainers": {
    "status": 200
  }
}
{{< /highlight >}}

This means we have successfully inserted trainers and pokemons.

### Retrieve trainers along with their Pokemons (join operation)

Try running the following graphql query in the GraphiQL section:

{{< highlight graphql >}}
query {
  trainers @postgres {
    id
    name
    city
    pokemons(
      where: {trainer_id: "trainers.id"}
    ) @postgres {
      name
      combat_power
      caught_on
    }
  }
}
{{< /highlight >}}


You should be able to see a response which looks like this:

{{< highlight json >}}
{
  "trainers": [
    {
      "id": "1",
      "name": "Ash",
      "city": "Pallete Town",
      "pokemons": []
    },
    {
      "id": "ash",
      "name": "Ash",
      "city": "Pallete Town",
      "pokemons": [
        {
          "name": "Pikachu",
          "combat_power": 200,
          "caught_on": "2019-10-15T07:21:14.643874Z"
        },
        {
          "name": "Charmender",
          "combat_power": 150,
          "caught_on": "2019-10-15T07:21:14.643876Z"
        }
      ]
    },
    {
      "id": "misty",
      "name": "Misty",
      "city": "Cerulean City",
      "pokemons": [
        {
          "name": "Psyduck",
          "combat_power": 180,
          "caught_on": "2019-10-15T07:21:14.643877Z"
        },
        {
          "name": "Goldeen",
          "combat_power": 150,
          "caught_on": "2019-10-15T07:21:14.643877Z"
        }
      ]
    }
  ]
}
{{< /highlight >}}

We just performed a join operation now. Read more about joins [here](/essentials/queries/joins).

Notice that we even received the values for `caught_on` even though we did not specify it while inserting. It means that Space Cloud auto-generated the values for `caught_on` field for us! Pretty great right?

It's time to put on the devil's hat and tinker around Space Cloud's data validation plane!

### Validate data

Let's check whether Space Cloud is enforcing the constraints or not that we specified (Foreign keys and required fields in our case).

Try running the following query in the GraphiQL section:

{{< highlight graphql >}}
mutation {
  insert_trainers(
    docs: [
      {id: "brock", city: "Pallete Town"},
    ]
  ) @postgres {
    status
  }
}
{{< /highlight >}}

This query should return the following error - `Field name Not Present`.


**Let's check whether the field type validations are working or not.** Try running the following query in the GraphiQL section:

{{< highlight graphql >}}
mutation {
  insert_trainers(
    docs: [
      {id: "brock", name: 123, city: "Pallete Town"},
    ]
  ) @postgres {
    status
  }
}
{{< /highlight >}}

This query should return the following error - `Integer wrong type wanted String got Integer`.

> **Note:** This validation layer works even for schemaless databases! 

This **robust validation layer** ensures that no one can mess around with your data structure! 😎

**Now let's check whether the foreign keys are working or not:**

{{< highlight graphql >}}
mutation {
  delete_trainers(
    where: {id: "ash"}
  ) @postgres {
    status
    error
  }
}
{{< /highlight >}}

This mutation should fail with the following response:

{{< highlight json >}}
{
  "delete_trainers": {
    "error": "pq: update or delete on table \"trainers\" violates foreign key constraint \"c_pokemons_trainer_id\" on table \"pokemons\"",
    "status": 500
  }
}
{{< /highlight >}}

It means Space Cloud has created foreign keys for us which helped us maintain the integrity of the relation.

Great! You have just learned the basics of data modelling in Space Cloud. The next steps would be to take a deep dive into all the [field types and directives](/essentials/data-modelling/types-and-directives) or learn [modelling relations](/essentials/data-modelling/relations) in detail.