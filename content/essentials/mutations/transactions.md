---
title: "Transactions"
date: 2019-09-18T18:24:26+05:30
draft: true
weight: 5
---

You can perform multiple mutations in a single database transaction with automatic rollbacks in case of failures. (i.e. either all of the mutations in a transaction will succeed or none of them)

**For example**, let's say you want to trade a pokemon, i.e. add a new pokemon to your list of pokemons and delete one from it simultaneously. This is how you would do it:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#upsert-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#upsert-js">Javascript</a></li>
    </ul>
  </div>
  <div id="upsert-graphql" class="col s12" style="padding:0">
{{< highlight graphql >}}
mutation {
  insert_caught_pokemons(
    docs: [
      {id: 5, name: "Charizard"}
    ]
  ) @postgres {
    status
  }
  delete_caught_pokemons(
    where: {id: 4}
  ) @postgres {
    status
  }
}
{{< /highlight >}}   
  </div>
  <div id="upsert-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const batch = db.beginBatch()

batch.add(db.insert("caught_pokemons").docs({id: 5, name: "Charizard"}))
batch.add(db.delete("caught_pokemons").where(cond("id", "==", 4)))

const { status } = batch.apply()
{{< /highlight >}}  
  </div>
</div>
