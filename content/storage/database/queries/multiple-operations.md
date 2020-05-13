---
title: "Using Multiple Operations"
description: "Using Multiple Operations"
date: 2019-09-17T17:36:29+05:30
draft: false
weight: 6
---

Multiple operations can be used together in the same query. For example, you can filter the results, sort and limit them all in a single query.

**Example:** Fetch a list of trainers and only their first two Water-type pokemons sorted by their name:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#multiple-operations-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#multiple-operations-js">Javascript</a></li>
    </ul>
  </div>
  <div id="multiple-operations-graphql" class="col s12" style="padding:0">
{{< highlight graphql >}}
query {
  trainers @mongo {
    _id
    name
    pokemons(
      where: {type: "Water"},
      sort: {name: 1},
      limit: 2
    ) @mongo {
      id
      name
    }
  }
}
{{< /highlight >}}   
  </div>
  <div id="multiple-operations-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("type", "==", "Water")

const { status, data } = await db.get("pokemons")
  .where(whereClause)
  .sort("name")
  .limit(2)
  .apply()
{{< /highlight >}}  
  </div>
</div>