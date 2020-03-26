---
title: "Insert"
date: 2019-09-18T11:17:25+05:30
draft: false
weight: 1
---

An insert request only requires the `docs` argument, which is nothing but the array of objects to be inserted.

## Insert a single object

**Example:** Let's say you have caught a Pikachu! This is how you would add it to your list of caught pokemons:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#insert-one-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#insert-one-js">Javascript</a></li>
    </ul>
  </div>
  <div id="insert-one-graphql" class="col s12" style="padding:0">
{{< highlight graphql >}}
mutation {
  insert_caught_pokemons(
    docs: [
      {id: "1", name: "Pikachu", combat_power: 500}
    ]
  ) @postgres {
    status
    error
    returning {
      id
      name
    }
  }
}
{{< /highlight >}}   
  </div>
  <div id="insert-one-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const docToBeInserted = {id: "1", name: "Pikachu", combat_power: 500}

const { status } = await db.insert("caught_pokemons")
  .doc(docToBeInserted)
  .apply()
{{< /highlight >}}  
  </div>
</div>

The result of the above mutation is as follows:

{{< highlight json >}}
{
  "data": {
    "insert_caught_pokemons": {
      "returning": [
        {
           "id": "1",
           "name": "Pikachu"
        }
      ],
      "status": 200
    }
  }
}
{{< /highlight >}}   

## Insert multiple objects of the same type in the same mutation

**Example:** Add 3 items received from Professor Oak to your list of items:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#insert-many-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#insert-many-js">Javascript</a></li>
    </ul>
  </div>
  <div id="insert-many-graphql" class="col s12" style="padding:0">
{{< highlight graphql >}}
mutation {
  insert_items(
    docs: [
      {id: "1", type: "Pokeball"},
      {id: "2", type: "Potion"},
      {id: "3", type: "Antidote"}
    ]
  ) @postgres {
    status
    error
    returning {
      id
      type
    }
  }
}
{{< /highlight >}}   
  </div>
  <div id="insert-many-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const docsToBeInserted = [
  {id: "1", type: "Pokeball"},
  {id: "2", type: "Potion"},
  {id: "3", type: "Antidote"}
]

const { status } = await db.insert("items")
  .docs(docsToBeInserted)
  .apply()
{{< /highlight >}}  
  </div>
</div>

## Insert an object along with its related objects through relationships

Let's say you have linked the `pokemon` table to the `pokemons` field of the `trainer` table via the [`@link`](/essentials/data-modelling/types-and-directives/#link-directive) directive. Then you can insert a trainer along with their pokemons:

{{< highlight graphql >}}
mutation {
  insert_trainer(
    docs: [
      {
        id: "ash", 
        name: "Ash", 
        city: "Pallete Town",
        pokemons: [
          {
            id: "1",
            name: "Pikachu",
            combat_power: 200
          },
          {
            id: "2",
            name: "Charmender",
            combat_power: 150
          }
        ]
      }
    ]
  ) @postgres {
    status
    error
    returning {
      id
      name
      city
      pokemons {
        id
        name
        combat_power
      }
    }
  }
}
{{< /highlight >}}

## Insert an object with a JSON field

**Example:** Inserting a pokemon with stats (a JSON field):

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#insert-json-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#insert-json-js">Javascript</a></li>
    </ul>
  </div>
  <div id="insert-json-graphql" class="col s12" style="padding:0">
{{< highlight graphql >}}
mutation {
  insert_caught_pokemons(
    docs: [
      {id: "1", name: "Pikachu", stats: { combat_power: 500, attack: 200 }}
    ]
  ) @postgres {
    status
    error
    returning {
      id
      name
      stats {
        combat_power
        attack
      }
    }
  }
}
{{< /highlight >}}   
  </div>
  <div id="insert-json-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const docToBeInserted = {id: "1", name: "Pikachu", stats: {combat_power: 500, attack: 200}}

const { status } = await db.insert("caught_pokemons")
  .doc(docToBeInserted)
  .apply()
{{< /highlight >}}  
  </div>
</div>
