---
title: "Live Query"
description: "Live Query"
date: 2019-09-28T11:37:46+05:30
draft: false
weight: 1
---

## Prerequisites

To use the realtime functionality (liveQuery) on any table/collection, you need to make sure that the following things are true:

- The schema of the table/collection has some fields that uniquely identify each row (i.e. the table should have primary or unique fields). These fields should also be present in the `where` clause during update and delete mutations. 
- The particular table/collection has the realtime feature enabled. You can find and change this setting for each table/collection in the `Overview` tab of the `Database` section.

## Live query
When you make a live query request to Space Cloud, it first pushes down the initial data in the result set one by one.  After that, it just notifies you of any changes that happen to your result set.

**Example:** Live query to the list of pokemons caught by a trainer:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#live-query-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#live-query-js">Javascript</a></li>
    </ul>
  </div>
  <div id="live-query-graphql" class="col s12" style="padding:0">
{{< highlight graphql>}}
# Note: Only one single top level field is allowed in subscriptions

subscription {
  caught_pokemons(
    where: {trainer_id: "1"}
  ) @mongo {
    type
    payload {
      name
    }
    find # Object containing the unique fields of the concerned document 
  }
}
{{< /highlight >}}   
  </div>
  <div id="live-query-js" class="col s12" style="padding:0">
{{< highlight javascript "hl_lines=15">}}
const whereClause = cond("trainer_id", "==", "1")

// Callback for data changes:
const onSnapshot  = (docs, type, find, doc) => {
   // docs is the entire result set maintained by the client SDK
   // doc is the concerned doc whereas find is the object containing the unique fields
   console.log(docs, type, find, doc)
}

// Callback for error while subscribing
const onError = (err) => {
   console.log('Live query error', err)
}

let subscription = db.liveQuery("caught_pokemons")
  .where(whereClause).subscribe(onSnapshot, onError)

// Unsubscribe to changes
if (on some logic) {
  subscription.unsubscribe()
}
{{< /highlight >}}  
  </div>
</div>

Data pushed down in live query have the following fields: 

- **type:** The type of operation which has resulted in Space Cloud pushing down data. Possible values are - `initial`, `insert`, `update`, and `delete`. `initial` is only applicable when Space Cloud is pushing the initial data down.
- **payload:** The concerned document/object.
- **find:** An object containing the unique fields of the document. 
- **time:** The timestamp of the operation in milliseconds.

## Subscribing to changes only
In case you are interested in only the changes and not the initial values, use can use `skipInitial`:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#live-query-skip-initial-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#live-query-skip-initial-js">Javascript</a></li>
    </ul>
  </div>
  <div id="live-query-skip-initial-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=4">}}
subscription {
  caught_pokemons @mongo (
    where: {trainer_id: $trainerId},
    skipInitial: true
  ){
    type
    payload {
      name
    }
    find
  }
}
{{< /highlight >}}   
  </div>
  <div id="live-query-skip-initial-js" class="col s12" style="padding:0">
{{< highlight javascript "hl_lines=16">}}
const whereClause = cond("trainer_id", "==", "1")

// Callback for data changes:
const onSnapshot  = (docs, type, find, doc) => {
   // docs is the entire result set maintained by the client SDK
   // doc is the concerned doc whereas find is the object containing the unique fields
   console.log(docs, type, find, doc)
}

// Callback for error while subscribing
const onError = (err) => {
   console.log('Live query error', err)
}

let subscription = db.liveQuery("caught_pokemons")
  .options({ skipInitial: true })
  .where(whereClause).subscribe(onSnapshot, onError)

// Unsubscribe to changes
if (on some logic) {
  subscription.unsubscribe()
}
{{< /highlight >}}  
  </div>
</div>