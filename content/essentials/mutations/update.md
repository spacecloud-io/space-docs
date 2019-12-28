---
title: "Update"
date: 2019-09-18T11:59:24+05:30
draft: false
weight: 2
---

An update request consists of two parts - a `where` clause and `update operators` for new values. The `where` clause has the same [filtering options](/essentials/queries/filtering) as queries.

> **Note:** At least any one of the `update operations` is required to update the rows.

## Update operations

You can perform different types of update operations like `set`, `inc`, `push`, etc. on your data. Following are the different types of update operations:

### Set operation

`set` operator is used to set a field's value with the given value.

Example: Update the name of your pokemon:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#set-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#set-js">Javascript</a></li>
    </ul>
  </div>
  <div id="set-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=4">}}
mutation {
  update_caught_pokemons(
    where: {id: {_eq: 1}},
    set: {name: "My Cool Pikachu"}
  ) @postgres {
    status
  }
}
{{< /highlight >}}   
  </div>
  <div id="set-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("id", "==", 1)

const { status } = await db.update("caught_pokemons")
  .where(whereClause)
  .set({name: "My Cool Pikachu"})
  .apply()
{{< /highlight >}}  
  </div>
</div>

### Increment operation

`inc` operator is used to increment/decrement a field's value by the provided value.

Example: Increment the combat power of your pokemon by 50:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#inc-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#inc-js">Javascript</a></li>
    </ul>
  </div>
  <div id="inc-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=4">}}
mutation {
  update_caught_pokemons(
    where: {id: 1},
    inc: {combat_power: 50}
  ) @postgres {
    status
  }
}
{{< /highlight >}}   
  </div>
  <div id="inc-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("id", "==", 1)

const { status } = await db.update("caught_pokemons")
  .where(whereClause)
  .inc({combat_power: 50})
  .apply()
{{< /highlight >}}  
  </div>
</div>

Example: Decrement the hit points of your pokemon by 10:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#dec-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#dec-js">Javascript</a></li>
    </ul>
  </div>
  <div id="dec-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=4">}}
mutation {
  update_caught_pokemons(
    where: {id: 1},
    inc: {hit_points: -10}
  ) @postgres {
    status
  }
}
{{< /highlight >}}   
  </div>
  <div id="dec-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("id", "==", 1)

const { status } = await db.update("caught_pokemons")
  .where(whereClause)
  .inc({hit_points: -10})
  .apply()
{{< /highlight >}}  
  </div>
</div>

### Multiply operation

`mul` operator multiplies a field's value by the given value.

> **Note:** The multiplier can be float as well to achieve division.

Example: Your pokemon has evolved, and you want to multiply its combat power by 2:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#mul-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#mul-js">Javascript</a></li>
    </ul>
  </div>
  <div id="mul-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=4">}}
mutation {
  update_caught_pokemons(
    where: {id: 1},
    mul: {combat_power: 2}
  ) @postgres {
    status
  }
}
{{< /highlight >}}   
  </div>
  <div id="mul-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("id", "==", 1)

const { status } = await db.update("caught_pokemons")
  .where(whereClause)
  .mul({combat_power: 2})
  .apply()
{{< /highlight >}}  
  </div>
</div>

### Min operation

`min` operator updates a field's value with the **least** (minimum) value amongst the specified value and the current value.

Example: Update the trainer's lowest score after a battle:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#min-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#min-js">Javascript</a></li>
    </ul>
  </div>
  <div id="min-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=4">}}
mutation {
  update_trainers(
    where: {id: 1},
    min: {lowest_sore: 50}
  ) @postgres {
    status
  }
}
{{< /highlight >}}   
  </div>
  <div id="min-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("id", "==", 1)

const { status } = await db.update("trainers")
  .where(whereClause)
  .min({lowest_score: 50})
  .apply()
{{< /highlight >}}  
  </div>
</div>

> **Note:** In the above example, the `lowest_score`  is updated, only if it's current value is greater than 50.

### Max operation

`max` operator updates a field's value with the **maximum** value amongst the specified value and the current value.

Example: Update the trainer's highest score after a battle:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#max-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#max-js">Javascript</a></li>
    </ul>
  </div>
  <div id="max-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=4">}}
mutation {
  update_trainers(
    where: {id: 1},
    max: {highest_score: 200}
  ) @postgres {
    status
  }
}
{{< /highlight >}}   
  </div>
  <div id="max-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("id", "==", 1)

const { status } = await db.update("trainers")
  .where(whereClause)
  .min({highest_score: 200})
  .apply()
{{< /highlight >}}  
  </div>
</div>

> **Note:** In the above example the `highest_score` is updated, only if it's current value is lesser than 200.

### Current date operation

`currentDate` operator updates a field's value with the current date/timestamp value.

Example: Update `last_battled` field of a pokemon to current date and `last_modified` field with the current timestamp:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#current-date-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#current-date-js">Javascript</a></li>
    </ul>
  </div>
  <div id="current-date-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=4-7">}}
mutation {
  update_caught_pokemons(
    where: {id: 1},
    currentDate: {
      last_battled: true,
      last_modified: { $type: "timestamp" }
    }
  ) @postgres {
    status
  }
}
{{< /highlight >}}   
  </div>
  <div id="current-date-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("id", "==", 1)

const { status } = await db.update("caught_pokemons")
  .where(whereClause)
  .currentDate("last_battled")
  .currentTimestamp("last_modified")
  .apply()
{{< /highlight >}}  
  </div>
</div>

### Push operation

> **Note:** This is only available for MongoDB.

`push` operator can be used to push a given value to an array in a document.

Example: Push `thunderbolt` to your pokemon's list of attacks:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#push-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#push-js">Javascript</a></li>
    </ul>
  </div>
  <div id="push-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=4">}}
mutation {
  update_caught_pokemons(
    where: {_id: "1"},
    push: {attacks: "thunderbolt"}
  ) @mongo {
    status
  }
}
{{< /highlight >}}   
  </div>
  <div id="push-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("id", "==", 1)

const { status } = await db.update("caught_pokemons")
  .where(whereClause)
  .push({attacks: "thunderbolt"})
  .apply()
{{< /highlight >}}  
  </div> 
</div>

### Unset operation

> **Note:** This is only available for MongoDB.

`unset` operator deletes the value of a particular field.

Example: Delete `is_favourite` field from your pokemons:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#unset-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#unset-js">Javascript</a></li>
    </ul>
  </div>
  <div id="unset-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=4">}}
mutation {
  update_caught_pokemons(
    where: {_id: "1"},
    unset: {is_favourite: ""}
  ) @mongo {
    status
  }
}
{{< /highlight >}}   
  </div>
  <div id="unset-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("_id", "==", "1")

const { status } = await db.update("caught_pokemons")
  .where(whereClause)
  .remove({is_favourite: ""})
  .apply()
{{< /highlight >}}  
  </div>
</div>

> **Note:** The specified value in the \$unset expression (i.e. "") does not impact the operation.

### Rename operation

> **Note:** This is only available for MongoDB.

`rename` operator rename the field's name.

Example: Rename `is_favourite` field to `favourite`:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#rename-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#rename-js">Javascript</a></li>
    </ul>
  </div>
  <div id="rename-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=4">}}
mutation {
  update_caught_pokemons(
    where: {_id: "1"},
    rename: {is_favourite: "favourite"}
  ) @mongo {
    status
  }
}
{{< /highlight >}}   
  </div>
  <div id="rename-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("_id", "==", "1")

const { status } = await db.update("caught_pokemons")
  .where(whereClause)
  .rename({is_favourite: "favourite"})
  .apply()
{{< /highlight >}}  
  </div>
</div>