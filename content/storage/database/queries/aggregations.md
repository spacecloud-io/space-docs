---
title: "Aggregations"
description: "Aggregations"
date: 2020-06-10T17:23:22+05:30
draft: false
weight: 7
---


You can easily perform aggregations on any table/collection using the `@aggregate` directive. The allowed aggregation functions are `count`, `min`, `max`, `avg`, `sum`. For more advanced use cases, you can use [prepared queries](/storage/database/prepared-queries). You can also group, filter, sort data in the aggregations.

## Simple aggregation query

**Example:** Fetch total amount of expenditures for all users:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#aggregations-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#aggregations-js">Javascript</a></li>
    </ul>
  </div>
  <div id="aggregations-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=4">}}
query {
  expenditures(group: ["user_id"]) @postgres {
    user_id
    amount @aggregate(op: "sum")
  }
}
{{< /highlight >}}
  </div>
  <div id="aggregations-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const { status, data } = db.get("expenditures")
    .aggregateSum("amount")
{{< /highlight >}}  
  </div>
</div>

You can specify the `@aggregate` directive against multiple fields in a query.

## Multiple aggregations on a single field

To specify multiple aggregations on the same field, you need to use the `field` argument in the `@aggregate` directive.

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#aggregations-group-by-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#aggregations-group-by-js">Javascript</a></li>
    </ul>
  </div>
  <div id="aggregations-group-by-graphql" class="col s12" style="padding:0">
{{< highlight graphql>}}
query {
  expenditures(group: ["user_id"]) @postgres {
    user_id
    total_amount @aggregate(op: "sum" field: "amount")
    max_amount @aggregate(op: "max" field: "amount")
    min_amount @aggregate(op: "min" field: "amount")
    average_amount @aggregate(op: "avg" field: "amount")
  }
}
{{< /highlight >}}
  </div>
  <div id="aggregations-group-by-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
// Coming soon!
{{< /highlight >}}  
  </div>
</div>