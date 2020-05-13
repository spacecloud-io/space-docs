---
title: "Distinct query results"
description: "Distinct query results"
date: 2020-01-08T15:05:00+05:30
draft: false
weight: 4
---
You can fetch the distinct/unique values of a particular field via Space Cloud by using the `distinct` argument.

**Example:** Get all the distinct pokemon types:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#distinct-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#distinct-js">Javascript</a></li>
    </ul>
  </div>
  <div id="distinct-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=3">}}
query {
  pokemons(
    distinct: "type"
  ) @mongo {
    type
  }
}
{{< /highlight >}}   
  </div>
  <div id="distinct-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const { status, data } = await db.get("pokemons")
  .distinct("type")
  .apply()
{{< /highlight >}}  
  </div>
</div>