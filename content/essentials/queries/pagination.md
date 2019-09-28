---
title: "Paginate query results"
date: 2019-09-17T07:22:47+05:30
draft: true
weight: 4
---

The operators `limit` and `skip` are used for pagination.

`limit` specifies the number of rows to retain from the result set and `skip` determines the number of objects to skip (i.e. the offset of the result)

The following are examples of different pagination scenarios:

## Limit results

Example: Fetch the first 5 trainers from the list of all trainers:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#limit-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#limit-js">Javascript</a></li>
      <li class="tab col s2"><a href="#limit-java">Java</a></li>
      <li class="tab col s2"><a href="#limit-golang">Golang</a></li>
    </ul>
  </div>
  <div id="limit-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=3">}}
query {
  trainers(
    limit: 5
  ) @mongo {
    _id
    name
  }
}
{{< /highlight >}}   
  </div>
  <div id="limit-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const { status, data } = await db.get("trainers")
  .limit(5)
  .apply()
{{< /highlight >}}  
  </div>
  <div id="limit-java" class="col s12" style="padding:0">
{{< highlight java>}}

{{< /highlight >}}    
  </div>
  <div id="limit-golang" class="col s12" style="padding:0">
{{< highlight golang>}}

{{< /highlight >}}    
  </div>  
</div>

## Skip and limit results

Example: Fetch 5 trainers from the list of all trainers starting from the 6th one:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#skip-limit-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#skip-limit-js">Javascript</a></li>
      <li class="tab col s2"><a href="#skip-limit-java">Java</a></li>
      <li class="tab col s2"><a href="#skip-limit-golang">Golang</a></li>
    </ul>
  </div>
  <div id="skip-limit-graphql" class="col s12" style="padding:0">
{{< highlight graphql >}}
query {
  trainers(
    skip: 5,
    limit: 5
  ) @mongo {
    _id
    name
  }
}
{{< /highlight >}}   
  </div>
  <div id="skip-limit-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const { status, data } = await db.get("trainers")
  .skip(5)
  .limit(5)
  .apply()
{{< /highlight >}}  
  </div>
  <div id="skip-limit-java" class="col s12" style="padding:0">
{{< highlight java>}}

{{< /highlight >}}    
  </div>
  <div id="skip-limit-golang" class="col s12" style="padding:0">
{{< highlight golang>}}

{{< /highlight >}}    
  </div>  
</div>

## Skip and limit results on nested queries

Example: Fetch first 3 trainers and 2 pokemons of each trainer starting from the 6th one:

{{< highlight graphql >}}
query {
  trainers(
    limit: 3
  ) @mongo {
    _id
    name
    pokemons(
      skip: 5,
      limit: 2
    ) 
  }
}
{{< /highlight >}}   