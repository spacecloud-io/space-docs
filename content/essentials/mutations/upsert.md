---
title: "Upsert"
date: 2019-09-18T18:23:46+05:30
draft: true
weight: 3
---

Upsert is usually used when it's unclear whether the object to be updated will be present or not.

An upsert query works like a normal update query if any document matching the `where` clause exists. Otherwise, it acts as an insert query, i.e. it creates a new document with all the fields from the `where` clause and update operators. 

Space Cloud performs all upsert operations with snapshot level isolations so that all upserts are race safe.

Example: Insert a pokemon or update it if it's already present:

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
  update_pokemons(
    where: {_id: "1"},
    set: {
      name: "Pikachu",
      type: "Electric"
    }
  ) @mongo {
    status
  }
}
{{< /highlight >}}   
  </div>
  <div id="upsert-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("_id", "==", "1")

const { status } = await db.upsert("pokemons")
  .where(whereClause)
  .set({name: "Pikachu", type: "Electric"})
  .apply()
{{< /highlight >}}  
  </div>  
</div>
