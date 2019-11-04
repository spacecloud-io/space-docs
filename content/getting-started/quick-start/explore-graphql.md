---
title: "Exploring GraphQL APIs"
date: 2019-09-26T12:58:22+05:30
draft: true
---

Let's explore some awesome powers of Space Cloud. In this guide, we will:

- Create trainers and catch Pokemons 😍 (Insert operation)
- Retrieve all trainers (Simple query operation)
- Retrieve all trainers along with their Pokemons 😎 (Join operation)


## Creating trainers (insert operation)

Creating trainers requires us to insert trainer documents into the database.

Head over to the `Explorer` section in `Mission Control`:


![Explorer](/images/screenshots/explorer.png)

Try running the following query in the GraphiQL section:

{{< highlight graphql >}}
mutation {
  insert_trainers(
    docs: [
      {_id: "1", name: "Ash"},
      {_id: "2", name: "Misty"},
      {_id: "3", name: "Brock"}
    ]
  ) @mongo {
    status
  }
}
{{< /highlight >}}

On successful insert, you should be able to see the `status` as `200` which means the documents were inserted in the database.

## Retrieving trainers (query operation)

Now let's get the list of trainers back using graphql. Try running the following query:

{{< highlight graphql >}}
query {
  trainers @mongo {
    _id
    name
  }
}
{{< /highlight >}}

There, we get our list of trainers!

## Catch Pokemons (insert operation)

Catching Pokemons requires us to insert Pokemon data into the database (And lots of hard work, of course!😅)

{{< highlight graphql >}}
mutation {
  insert_pokemons(
    docs: [
      {_id: "1", name: "Pikachu", trainerId: "1"},
      {_id: "2", name: "Snorlax", trainerId: "1"},
      {_id: "3", name: "Psyduck", trainerId: "2"},
      {_id: "4", name: "Staryu", trainerId: "2"},
      {_id: "5", name: "Onix", trainerId: "3"}
    ]
  ) @mongo {
    status
  }
}
{{< /highlight >}}

Great! That's enough of Pokemon catching for the day. Now time for the trainers to show off their Pokemons.

## Retrieve trainers along with their Pokemons (join operation) 

Try running the following query in GraphiQL:

{{< highlight graphql >}}
query {
  trainers @mongo {
    _id
    name
    pokemons(
      where: {trainerId: {_eq: "trainers._id"}}
    ) @mongo {
      _id
      name
    }
  }
}
{{< /highlight >}}

The response should look something like this:

{{< highlight json >}}
{
  "data": {
    "trainers": [
      {
        "_id": "1",
        "name": "Ash",
        "pokemons": [
          {"_id": "1", "name": "Pikachu"},
          {"_id": "2", "name": "Snorlax"}
        ]
      },
      {
        "_id": "2",
        "name": "Misty",
        "pokemons": [
          {"_id": "3", "name": "Snorlax"},
          {"_id": "4", "name": "Staryu"}
        ]
      },
      {
        "_id": "3",
        "name": "Brock",
        "pokemons": [
          {"_id": "5", "name": "Onix"}
        ]
      }      
    ]
  }
}
{{< /highlight >}}

## Next Steps

Awesome! We have just started our Pokemon journey _without writing a single line of backend code_. The journey ahead is undoubtedly going to be super exciting!

The next step is to dive into the various Space Cloud features:

- [Database queries](/essentials/queries)
- [Mutations](/essentials/mutations)
- [Realtime subscriptions](/essentials/subscriptions)
- [Custom business logic](/essentials/custom-logic)
- [Authentication & Authorization](/auth)