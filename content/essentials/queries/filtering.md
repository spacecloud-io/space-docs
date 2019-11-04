---
title: "Filter query results"
date: 2019-09-17T07:22:25+05:30
draft: true
weight: 2
skipsubheader: true
---

You can use `where` in your queries to filter results based on some field’s values. You can even use multiple filters in the same where clause using `and` or `or`.

**Example:** Fetch details of all fire type pokemons only:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#filtering-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#filtering-js">Javascript</a></li>
    </ul>
  </div>
  <div id="filtering-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=3">}}
query {
  pokemons(
    where: { type : { _eq: "Fire" }}
  ) @mongo {
    _id
    name
  }
}
{{< /highlight >}}
  </div>
  <div id="filtering-js" class="col s12" style="padding:0">
{{< highlight javascript "hl_lines=1 4">}}
const whereClause = cond("type", "==", "Fire")

const { status, data } = await db.get("pokemons")
  .where(whereClause)
  .apply()
{{< /highlight >}}  
  </div>
</div>

Let’s take a look at different operators that can be used to filter results and other advanced use cases:

## Equality operators 

The euality operators can be used to fetch specific objects based on equality comparison of a field.

For GraphQL, the equality operators are `_eq` (eqaul to) and `_ne` (not equal to). Whereas for the client SDKs, these operators are `==` and `!=` respectively.

The following are examples of using the equality operators on different types.

### Example: Integer (Works with Double, Float, Numeric, etc.)

Fetch the list of all 3rd evolution pokemons (`level` is an integer field which indicates the evolution level):

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#filtering-eq-int-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#filtering-eq-int-js">Javascript</a></li>
    </ul>
  </div>
  <div id="filtering-eq-int-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=3">}}
query {
  pokemons(
    where: { level: { _eq: 3}}
  ) @mongo {
    _id
    name
    type
  }
}
{{< /highlight >}}
  </div>
  <div id="filtering-eq-int-js" class="col s12" style="padding:0">
{{< highlight javascript "hl_lines=1 4">}}
const whereClause = cond("level", "==", 3)

const { status, data } = await db.get("pokemons")
  .where(whereClause)
  .apply()
{{< /highlight >}}  
  </div>
</div>

> **Syntatic Sugar:** In GraphQL, you can skip the `_eq` for equality operator. **Example**:  `where: {level: 3}`

### Example: String or Text

Fetch list of all caught pokemons with `name` (a text field) as "Pikachu":

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#filtering-eq-string-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#filtering-eq-string-js">Javascript</a></li>
    </ul>
  </div>
  <div id="filtering-eq-string-graphql" class="col s12" style="padding:0">
{{< highlight graphql >}}
query {
  caught_pokemons (
    where: { name: "Pikachu"}
  ) @mongo {
    _id
    combat_power
  }
}
{{< /highlight >}}
  </div>
  <div id="filtering-eq-string-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("name", "==", "Pikachu")

const { status, data } = await db.get("caught_pokemons")
  .where(whereClause)
  .apply()
{{< /highlight >}}  
  </div>
</div>

### Example: Boolean

Fetch list of all caught pokemons that have been marked favourite by their trainer (`is_favourite` is a boolean field):

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#filtering-eq-bool-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#filtering-eq-bool-js">Javascript</a></li>
    </ul>
  </div>
  <div id="filtering-eq-bool-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=3">}}
query {
  caught_pokemons(
    where: { is_favourite: true}
  ) @mongo {
    _id
    name
  }
}
{{< /highlight >}}
  </div>
  <div id="filtering-eq-bool-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("is_favourite", "==", true)

const { status, data } = await db.get("caught_pokemons")
  .where(whereClause)
  .apply()
{{< /highlight >}}  
  </div>
</div>

### Example: Date (Works with Timestamp as well)

Fetch list of all pokemons that you caught on some special day 😉 (`caught_on` is a Date field):

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#filtering-eq-date-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#filtering-eq-date-js">Javascript</a></li>
    </ul>
  </div>
  <div id="filtering-eq-date-graphql" class="col s12" style="padding:0">
{{< highlight graphql >}}
query {
  caught_pokemons(
    where: { caught_on: "2019-09-15"}
  ) @mongo {
    _id
    name
  }
}
{{< /highlight >}}
  </div>
  <div id="filtering-eq-date-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("caught_on", "==", "2019-09-15")

const { status, data } = await db.get("caught_pokemons")
  .where(whereClause)
  .apply()
{{< /highlight >}}  
  </div>
</div>

## Comparison operators

The comparison operators can be used to fetch specific objects based on greater than or lesser than comparison of a field.

For GraphQL, the comparison operators are `_gt` (greater than), `_gte` (greater than or equal to), `_lt` (lesser than) and `_lte` (lesser than or equal to). Whereas for the client SDKs, these operators are `>`, `>=`, `<` and `<=` respectively.

The following are examples of using these operators on different types.

### Example: Integer (Works with Double, Float, Numeric, etc.)

Fetch list of all strong pokemons (with `combat_power` of 2000 or more):

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#filtering-comparison-int-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#filtering-comparison-int-js">Javascript</a></li>
    </ul>
  </div>
  <div id="filtering-comparison-int-graphql" class="col s12" style="padding:0">
{{< highlight graphql >}}
query {
  caught_pokemons(
    where: { combat_power: { _gte: 2000}}
  ) @mongo {
    _id
    name
    combat_power
  }
}
{{< /highlight >}}
  </div>
  <div id="filtering-comparison-int-js" class="col s12" style="padding:0">
{{< highlight javascript >}}
const whereClause = cond("combat_power", ">=", 2000)

const { status, data } = await db.get("todos")
  .where(whereClause)
  .apply()
{{< /highlight >}}  
  </div>
</div>

### Example: String or Text

Fetch list of pokemons whose names begin with any letter that comes after P (essentially, a filter based on a dictionary sort):

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#filtering-comparison-string-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#filtering-comparison-string-js">Javascript</a></li>
    </ul>
  </div>
  <div id="filtering-comparison-string-graphql" class="col s12" style="padding:0">
{{< highlight graphql >}}
query {
  pokemons(
    where: { name: { _gt: "P"}}
  ) @mongo {
    _id
    name
  }
}
{{< /highlight >}}
  </div>
  <div id="filtering-comparison-string-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("name", ">", "P")

const { status, data } = await db.get("pokemons")
  .where(whereClause)
  .apply()
{{< /highlight >}}  
  </div>
</div>

### Example: Date (Works with Timestamp as well)

Fetch list of all caught pokemons that were caught before a certain date:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#filtering-comparison-date-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#filtering-comparison-date-js">Javascript</a></li>
    </ul>
  </div>
  <div id="filtering-comparison-date-graphql" class="col s12" style="padding:0">
{{< highlight graphql "hl_lines=3">}}
query {
  articles(
    where: { caught_on: { _lt: "2019-09-15"}}
  ) @mongo {
    _id
    name
  }
}
{{< /highlight >}}
  </div>
  <div id="filtering-comparison-date-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("caught_on", "<", "2018-09-15")

const { status, data } = await db.get("caught_pokemons")
  .where(whereClause)
  .apply()
{{< /highlight >}}  
  </div>
</div>

## List based operators

The list based operators can be used to compare field values to a list of values.

For GraphQL, the list based operators are `_in` (in a list) and `_nin` (not in list). Whereas for the client SDKs, these operators are `in` and `notIn` respectively.

The following are examples of using these operators on different types.

### Example: Integer (Works with Double, Float, Numeric, etc.)

Fetch a list of all `pokemons` with `level` either 1, 2 or 3:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#filtering-list-int-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#filtering-list-int-js">Javascript</a></li>
    </ul>
  </div>
  <div id="filtering-list-int-graphql" class="col s12" style="padding:0">
{{< highlight graphql >}}
query {
  pokemons(
    where: { level: { _in: [1, 2, 3]}}
  ) @mongo {
    _id
    name
  }
}
{{< /highlight >}}
  </div>
  <div id="filtering-list-int-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("level", "in", [1, 2, 3])

const { status, data } = await db.get("pokemons")
  .where(whereClause)
  .apply()
{{< /highlight >}}  
  </div>
</div>

### Example: String or Text

Fetch a list of all `pokemons` that are not of the following `type` - Water, Fire, Grass:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#filtering-list-string-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#filtering-list-string-js">Javascript</a></li>
    </ul>
  </div>
  <div id="filtering-list-string-graphql" class="col s12" style="padding:0">
{{< highlight graphql >}}
query {
  pokemons(
    where: { name: { _nin: ["Water", "Fire", "Grass"]}}
  ) @mongo {
    _id
    name
  }
}
{{< /highlight >}}
  </div>
  <div id="filtering-list-string-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = cond("name", "notIn", ["Water", "Fire", "Grass"])

const { status, data } = await db.get("pokemons")
  .where(whereClause)
  .apply()
{{< /highlight >}}  
  </div>
</div>

## Using multiple filters in the same query

You can group multiple parameters in the same `where` clause using the logical **AND** and **OR** operations. These logical operations can even be **infinitely nested** to apply **complex filters**.

For GraphQL, `_and` and `_or` are the logical **AND** and **OR** operators respectively. 

Whereas for the client SDKs, `and` and `or` are the methods used for **AND** and **OR** operations respectively.

### Example: AND

Let's say we want to fetch all `pokemons` that were caught between two particular dates by `Ash` (trainer_id - 1). This is how you would do it:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#filtering-and-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#filtering-and-js">Javascript</a></li>
    </ul>
  </div>
  <div id="filtering-and-graphql" class="col s12" style="padding:0">
{{< highlight graphql >}}
query {
  caught_pokemons(
    where: {
      _and: {
        "caught_on": {
          _gte: "2019-06-01",
          _lte: "2019-09-15"
        },
        "trainer_id": "1"
      }
    } 
  ) @mongo {
    _id
    name
  }
}
{{< /highlight >}}
  </div>
  <div id="filtering-and-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = and(
  cond("caught_on", ">=", "2019-06-01"),
  cond("caught_on", "<=", "2019-09-15"),
  cond("trainer_id", "==", "1")
)

const { status, data } = await db.get("caught_pokemons")
  .where(whereClause)
  .apply()
{{< /highlight >}}  
  </div>
</div>

### Example: OR

Let's say we want to fetch information of all Fire type or Legemdary pokemons. This is how you would do it:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#filtering-or-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#filtering-or-js">Javascript</a></li>
    </ul>
  </div>
  <div id="filtering-or-graphql" class="col s12" style="padding:0">
{{< highlight graphql >}}
query {
  pokemons(
    where: {
      _or: [
        {type: "Fire"},
        {is_legendary: true}
      ]
    } 
  ) @mongo {
    _id
    name
  }
}
{{< /highlight >}}
  </div>
  <div id="filtering-or-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const whereClause = or(
  cond("type", "==", "Fire"),
  cond("is_legendary", "==", true)
)

const { status, data } = await db.get("pokemons")
  .where(whereClause)
  .apply()
{{< /highlight >}}  
  </div>
</div>

## Filter nested queries

The `where` argument can be used to filter even nested queries. 

Let's say we want to fetch a list of all the trainers who have joined the game after a particular date along with their Fire type pokemons. This is how you would do it:

{{< highlight graphql >}}
query {
  trainers(
    where: {joined_on: "2019-09-15"}
  ) @mongo {
    _id
    name
    caught_pokemons(
      where: {
        _and: {
          trainer_id: "trainers.id"
          type: "Fire"
        }
      }
    ) @mongo {
      _id
      name
    }
  }
}
{{< /highlight >}}
