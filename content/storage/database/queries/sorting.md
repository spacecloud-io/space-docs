---
title: "Sort query results"
description: "Sort query results"
date: 2019-09-17T07:22:31+05:30
draft: false
weight: 3
---
You can sort your query results via Space Cloud by using the `sort` argument. The `sort` argument can be used to sort nested queries too.

The value of `sort` argument should be an array containing the name of fields to sort the results by.

The default order of sorting for any field provided in the `sort` array is **ascending**. To specify descending order, just put a minus (-) sign before the field name. 

## Sorting simple queries

**Example:** Sort all the trainers by their name:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#sorting-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#sorting-js">Javascript</a></li>
    </ul>
  </div>
  <div id="sorting-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=3">}}
query {
  trainers(
    sort: ["name"]
  ) @mongo {
    id
    name
  }
}
{{< /highlight >}}   
  </div>
  <div id="sorting-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const { status, data } = await db.get("trainers")
  .sort("name")
  .apply()
{{< /highlight >}}  
  </div>
</div>


## Sorting nested queries

**Example:** Sort all the trainers by their name in ascending order and their pokemons by their combat_power in descending order:

{{< highlight graphql >}}
query {
  trainers(
    sort: ["name"]
  ) @mongo {
    id
    name
    pokemons(
      sort: ["-combat_power]
    ) @mongo {
      name
      combat_power
    }
  }
}
{{< /highlight >}}  

## Sorting by multiple fields

**Example:** Sort all caught pokemons first by their `name` in ascending order and then by their `caught_on` date in descending order:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#sorting-multiple-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#sorting-multiple-js">Javascript</a></li>
    </ul>
  </div>
  <div id="sorting-multiple-graphql" class="col s12" style="padding:0">
{{< highlight graphql >}}
query {
  caught_pokemons(
    sort: ["name", "-caught_on"]
  ) @mongo {
    id
    name
    caught_on
    combat_power
  }
}
{{< /highlight >}}   
  </div>
  <div id="sorting-multiple-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const { status, data } = await db.get("caught_pokemons")
  .sort("name", "-caught_on")
  .apply()
{{< /highlight >}}  
  </div>
</div>