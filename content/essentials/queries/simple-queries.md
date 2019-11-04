---
title: "Simple Queries"
date: 2019-09-17T07:19:50+05:30
draft: true
weight: 1
---

You can fetch a single or multiple objects of the same type using a simple object query.

## Fetch list of objects

Example: Let's say we want to fetch a list of all pokemons. This is how you would do it: 

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#client-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#client-js">Javascript</a></li>
    </ul>
  </div>
  <div id="client-graphql" class="col s12" style="padding:0">
{{< highlight graphql>}}
query {
  pokemons @mongo {
    _id
    name
  }
}
{{< /highlight >}}   
  </div>
  <div id="client-js" class="col s12" style="padding:0">
{{< highlight javascript "hl_lines=4">}}
// Select clause describes which fields to retrieve
const selectClause = { _id: 1, name: 1 }

const { status, data } = await db.get("pokemons").select(selectClause).apply()
console.log("Pokemons", data.result)

// To get all the fields in pokemons don't use the select clause:
// const { status, data } = db.get("pokemons").apply()
{{< /highlight >}}  
  </div>
</div>
