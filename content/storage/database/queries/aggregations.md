---
title: "Aggregations"
description: "Aggregations"
date: 2020-06-10T17:23:22+05:30
draft: false
weight: 7
---


You can easily perform aggregations on any table/collection using the `aggregate` field a table/collection. The allowed aggregation functions are `count`, `min`, `max`, `avg`, `sum`. For more advanced use cases, you can use [prepared queries](/storage/database/prepared-queries). You can also group, filter, sort data in the aggregations.

> **Note:** Aggregations are only available in SQL databases as of now.

## Simple aggregation query

**Example:** Fetch aggregated data of `expenditures` of a particular user:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#aggregations-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#aggregations-js">Javascript</a></li>
    </ul>
  </div>
  <div id="aggregations-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=3">}}
query {
  expenditures(where: {user_id: "1"}) @postgres {
    aggregate {
      count {
        id
      }
      min {
        amount
      }
      max {
        amount
      }
      sum {
        amount
      }
      avg {
        amount
      }
    }
  }
}
{{< /highlight >}}
  </div>
  <div id="aggregations-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const { status, data } = db.get("expenditures")
    .aggregateCount("id")
    .aggregateMin("amount")
    .aggregateMax("amount")
    .aggregateSum("amount")
    .aggregateAverage("amount")
{{< /highlight >}}  
  </div>
</div>

If you notice carefully, we can specify fields inside the aggregation function. For instance, in the above example, we have used the `amount` field inside the `sum` aggregation to specify that we want to sum the values of the `amount` field. You can also specify multiple fields inside an aggregate function.

## Grouping data in aggregations

You can use the `group` argument to group the data by one or more columns.

**Example:** Fetch the category wise max expenditures of each user. We need to group the data by `user_id` and `category` here:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#aggregations-group-by-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#aggregations-group-by-js">Javascript</a></li>
    </ul>
  </div>
  <div id="aggregations-group-by-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=2">}}
query {
  expenditures(group: ["user_id", "category"]) @postgres {
    aggregate {
      max {
        amount
      }
    }
  }
}
{{< /highlight >}}
  </div>
  <div id="aggregations-group-by-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const { status, data } = db.get("expenditures")
    .groupBy("user_id", "category")
    .aggregateMax("amount")
{{< /highlight >}}  
  </div>
</div>