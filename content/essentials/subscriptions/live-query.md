---
title: "Live Query"
date: 2019-09-28T11:37:46+05:30
draft: true
weight: 1
---


## Live query
When you make a live query request to Space Cloud, it first pushes down the initial data in the result set one by one and there after notifies you of any changes that happens to your result set.

Example: Live query to the list of pokemons caught by a trainer:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#live-query-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#live-query-js">Javascript</a></li>
      <li class="tab col s2"><a href="#live-query-java">Java</a></li>
      <li class="tab col s2"><a href="#live-query-golang">Golang</a></li>
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
    doc
    docId # This is the primary key of the changed document 
  }
}
{{< /highlight >}}   
  </div>
  <div id="live-query-js" class="col s12" style="padding:0">
{{< highlight javascript "hl_lines=15">}}
const whereClause = cond("trainer_id", "==", "1")

// Callback for data changes:
const onSnapshot  = (docs, type, doc) => {
   // docs is the entire result set maintained by the client SDK
   // whereas doc is the concerned doc
   console.log(docs, type, doc)
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
  <div id="live-query-java" class="col s12" style="padding:0">
{{< highlight java>}}

{{< /highlight >}}    
  </div>
  <div id="live-query-golang" class="col s12" style="padding:0">
{{< highlight golang>}}

{{< /highlight >}}    
  </div>  
</div>

Data pushed down in live query have the following fields: 

- **type:** The type of operation which has resulted into Space Cloud pushing down data. Possible values are - `initial`, `insert`, `update`, and `delete`. `initial` is only applicable when Space Cloud is pushing the initial data down.
- **doc:** The concerned document/object. `null` for `delete` operation.
- **docId:** The unique id of the corresponding document/object. In case of MongoDB it's the `_id` field of the concerned document and in case of SQL databases, it's the `id` of the concerned record.

## Subscribing to changes only
In case you are interested in only the changes and not the initial values, pass the `options.skipInitial` argument to the live query:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#live-query-skip-initial-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#live-query-skip-initial-js">Javascript</a></li>
      <li class="tab col s2"><a href="#live-query-skip-initial-java">Java</a></li>
      <li class="tab col s2"><a href="#live-query-skip-initial-golang">Golang</a></li>
    </ul>
  </div>
  <div id="live-query-skip-initial-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=4">}}
subscription {
  caught_pokemons @mongo (
    where: {trainer_id: $trainerId},
    options: {skipInitial: true}
  ){
    type
    doc
    docId
  }
}
{{< /highlight >}}   
  </div>
  <div id="live-query-skip-initial-js" class="col s12" style="padding:0">
{{< highlight javascript "hl_lines=16">}}
const whereClause = cond("trainer_id", "==", "1")

// Callback for data changes:
const onSnapshot  = (docs, type, doc) => {
   // docs is the entire result set maintained by the client SDK
   // whereas doc is the concerned doc
   console.log(docs, type, doc)
}

// Callback for error while subscribing
const onError = (err) => {
   console.log('Live query error', err)
}

let subscription = db.liveQuery("caught_pokemons")
  .options({skipInitial: true})
  .where(whereClause).subscribe(onSnapshot, onError)

// Unsubscribe to changes
if (on some logic) {
  subscription.unsubscribe()
}
{{< /highlight >}}  
  </div>
  <div id="live-query-skip-initial-java" class="col s12" style="padding:0">
{{< highlight java>}}

{{< /highlight >}}    
  </div>
  <div id="live-query-skip-initial-golang" class="col s12" style="padding:0">
{{< highlight golang>}}

{{< /highlight >}}    
  </div>  
</div>