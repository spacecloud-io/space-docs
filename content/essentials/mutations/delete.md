---
title: "Delete"
date: 2019-09-18T18:23:50+05:30
draft: true
weight: 4
---

A delete request only requires a `where` clause to filter rows to be deleted. The `where` clause has the same [filtering options](/essentials/queries/filtering) as queries.

Example: Delete all pokemons with combat_power lesser than 200:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#delete-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#delete-js">Javascript</a></li>
      <li class="tab col s2"><a href="#delete-java">Java</a></li>
      <li class="tab col s2"><a href="#delete-golang">Golang</a></li>
    </ul>
  </div>
  <div id="delete-graphql" class="col s12" style="padding:0">
{{< highlight graphql >}}
mutation {
  delete_caught_pokemons(
    where: { combat_power: {_lt: 200}}
  ) @postgres {
    status
  }
}
{{< /highlight >}}   
  </div>
  <div id="delete-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("combat_power", "<", 200)

const { status } = await db.delete("caught_pokemons")
  .where(whereClause)
  .apply()
{{< /highlight >}}  
  </div>
  <div id="delete-java" class="col s12" style="padding:0">
{{< highlight java>}}

{{< /highlight >}}    
  </div>
  <div id="delete-golang" class="col s12" style="padding:0">
{{< highlight golang>}}

{{< /highlight >}}    
  </div>  
</div>
