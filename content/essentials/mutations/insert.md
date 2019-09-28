---
title: "Insert"
date: 2019-09-18T11:17:25+05:30
draft: true
weight: 1
---

An insert request only requires the `docs` argument which is nothing but the array of objects to be inserted.

## Insert a single object

Example: Let's say you have caught a Pikachu! This is how you would add it to your list of caught pokemons:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#insert-one-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#insert-one-js">Javascript</a></li>
      <li class="tab col s2"><a href="#insert-one-java">Java</a></li>
      <li class="tab col s2"><a href="#insert-one-golang">Golang</a></li>
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
  <div id="insert-one-java" class="col s12" style="padding:0">
{{< highlight java>}}

{{< /highlight >}}    
  </div>
  <div id="insert-one-golang" class="col s12" style="padding:0">
{{< highlight golang>}}

{{< /highlight >}}    
  </div>  
</div>

## Insert multiple objects of the same type in the same mutation

Example: Add 3 items received from Professor Oak to your list of items:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#insert-many-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#insert-many-js">Javascript</a></li>
      <li class="tab col s2"><a href="#insert-many-java">Java</a></li>
      <li class="tab col s2"><a href="#insert-many-golang">Golang</a></li>
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
  <div id="insert-many-java" class="col s12" style="padding:0">
{{< highlight java>}}

{{< /highlight >}}    
  </div>
  <div id="insert-many-golang" class="col s12" style="padding:0">
{{< highlight golang>}}

{{< /highlight >}}    
  </div>  
</div>