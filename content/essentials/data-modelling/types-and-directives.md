---
title: "Types and Directives"
date: 2019-10-16T10:51:01+05:30
draft: true
weight: 3
---
This guide will give a detailed explanation of [object types](#object-types), [field types](#field-types), [field-constraints](#field-constraints) and [directives](#directives) in Space Cloud schema definition language.

## Object types

An object type is used to define a table/collection with the keyword `type`.

**Example:** 

{{< highlight graphql >}}
type post {
  id: ID! @primary
  title: String!
  text: String!
  is_published: Boolean
}
{{< /highlight >}}

The above example will create a `post` table/collection which has the `id`, `title`, `text` and `is_published` columns/fields.

## Field types

Fields are the building blocks of an object type. A field either refers to a scalar type, a [nested type](#nested-fields) or a [relation](#relation).

### Scalar types

**ID**

An `ID` is used to hold a string value. You use `ID` to store prominent strings in your model like the unique identifier of a row/document. A field with type `ID` can store up to 50 characters. 

Space Cloud auto-generates the value of `ID` fields with [ksuid](https://github.com/segmentio/ksuid) (sortable unique identifiers) if you don't provide their value during mutation.

As of now, only `ID` fields can have primary and unique key constraints. If you want to alter this behaviour, contribute your thoughts on this [Github issue](https://github.com/spaceuptech/space-cloud/issues/479).

**Example:** Uniquely identify an order in an e-commerce app:

{{< highlight graphql "hl_lines=2">}}
type order {
  id: ID! @primary
  amount: Float!
}
{{< /highlight >}}

**String**

A `String` holds text. `String` is used for fields like the title of a blog post or anything that is best represented as text.

**Example:**

{{< highlight graphql "hl_lines=3">}}
type post {
  id: ID! @primary
  title: String!
  text: String!
}
{{< /highlight >}}

In queries or mutations, `String` fields have to be specified using enclosing double quotes: `string: "some-string"`.

**Integer**

An `Integer` is a number that cannot have decimals. Use this to store values such as the number of items purchased or the combat power 💪🏻 of a pokemon.

> **Note:** Int values are stored as 64 bit (ranging from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807).

**Example:**

{{< highlight graphql "hl_lines=4">}}
type pokemon {
  id: ID! @primary
  name: String!
  combat_power: Integer!
}
{{< /highlight >}}

In queries or mutations, `Integer` fields have to be specified without any enclosing characters: `integer: 42`.

**Float**

A `Float` is a number that can have decimals. `Float` helps you store values such as the price of an item or the result of some complex calculation.

**Example:**

{{< highlight graphql "hl_lines=4">}}
type item {
  id: ID! @primary
  name: String!
  price: Float!
  description: String
}
{{< /highlight >}}

In queries or mutations, `Float` fields have to be specified without any enclosing characters and an optional decimal point: `float: 42, float: 4.2`.

**Boolean**

A `Boolean` can have the value `true` or `false`. `Boolean` can help you keep track of settings such as whether a post is published or if a pokemon is marked favourite by his trainer 😛.

**Example:**

{{< highlight graphql "hl_lines=4">}}
type pokemon {
  id: ID! @primary
  name: String!
  is_favourite: Boolean!
}
{{< /highlight >}}

In queries or mutations, `Boolean` fields have to be specified without any enclosing characters: `boolean: true, boolean: false`.

**DateTime**

A `DateTime` stores date or time values. A good example might be a person's date of birth or the date a blog post was published.

**Example:**
{{< highlight graphql "hl_lines=5">}}
type post {
  id: ID! @primary
  title: String!
  is_published: Boolean
  published_date: DateTime
}
{{< /highlight >}}

In queries or mutations, `DateTime` fields have to be specified either in ISO 8601 format with enclosing double quotes or in milliseconds since epoch without enclosing double quotes:

- `datetime: "2015-11-22"`
- `datetime: "2015-11-22T13:57:31.123Z"`
- `datetime: 1571207400000`

**Nested fields**

Document oriented databases like MongoDB can have nested structures. 

**Example:** Let's say each document in `post` collection has an embedded document called `author`: 

> **Note:** All the embedded types for a collection are provided in the schema of the collection itself.

{{< highlight graphql "hl_lines=6">}}
type post {
  id: ID! @primary
  title: String!
  text: String!
  is_published: Boolean
  author: author
}

type author {
  id: String!
  name: String!
}
{{< /highlight >}}

> `Note:` The schema in MongoDB is used only for data validation.


### Field constraints
Fields can be configured with certain constraints to add further semantics to your data model.

**Not null constraint**

You use a not-null constraint for required fields in your app.  You can add a not-null constraint by adding an exclamation mark in front of the field type.  

**Example:** Making email a required field for a user:

{{< highlight graphql "hl_lines=3" >}}
type user {
  id: ID! @primary
  email: String!
  name: String
}
{{< /highlight >}}

**Primary key constraint**

Primary key constraint is used to make a field as a unique identifier of the table/collection. 

**Example:** Making order_id the unique identifier of an order:

{{< highlight graphql "hl_lines=3" >}}
type order {
  order_id: ID! @primary
  amount: Float!
}
{{< /highlight >}}

> Note: Space Cloud doesn't support composite primary keys ([Github issue](https://github.com/spaceuptech/space-cloud/issues/476)) yet.

**Unique constraint**

A unique constraint is used to ensure that a field always has a unique value. 

**Example:** Making username of a user unique:

{{< highlight graphql "hl_lines=3" >}}
type user {
  id: ID! @primary
  username: String! @unique
  email: String!
}
{{< /highlight >}}

> Note: Space Cloud doesn't support composite unique keys ([Github issue](https://github.com/spaceuptech/space-cloud/issues/477)) yet.

**Foreign key constraint**

A foreign key constraint is used to maintain the integrity of a relation.

**Example:** Create a foreign key on the `id` field of `author` for `post` table:

{{< highlight graphql "hl_lines=3" >}}
type author {
  id: ID! @primary
  name: String! @unique
}

type post {
  id: ID! @primary
  title: String!
  author: author @relation(field: "id")
}
{{< /highlight >}}


## Directives

Directives are used to provide additional information in your data model. They look like this: `@name(argument: "value")` or simply `@name` when there are no arguments.

### Primary key
The `@primary` directive is used to make a field as the **primary key** in that table/collection.

> **Note:** Only one field in a type can have `@primary` directive.

**Example:** 
{{< highlight graphql "hl_lines=2" >}}
type order {
  id: ID! @primary
  amount: Float!
}
{{< /highlight >}}

### Unique key
The `@unique` directive is used to put a unique constraint on a field.

**Example:** Make sure that each user has a unique `username`:

{{< highlight graphql "hl_lines=3" >}}
type user {
  id: ID! @primary
  username: String! @unique
}
{{< /highlight >}}

### Relation directive
The `@relation` directive is used to put foreign key constraints on a field. Learn more about modelling relationships from [here](/essentials/data-modelling/relations).

**Example:** `one-to-many` relation between `customer` and `order`:

{{< highlight graphql "hl_lines=10">}}
type customer {
  id: ID! @primary
  name: String!
  orders: [order] @relation
}

type order {
  id: ID! @primary
  order_date: DateTime!
  amount: Float!
  customer: customer! @relation(field: "id")
}
{{< /highlight >}}

The above example creates a foreign key on the `id` field of `customer` table.

> **Note:** The `orders` field in the `customer` table does nothing as of now. But in future, Space Cloud would be able to make your join queries easier with this info.

### createdAt directive

If you want to capture the creation time of a document/row, you should use the `@createdAt` directive. A good example is the order date of order:

{{< highlight graphql "hl_lines=4" >}}
type order {
  id: ID! @primary
  order_date: DateTime! @createdAt
  amount: Float!
}
{{< /highlight >}}

In an insert mutation, you don't need to provide values for the fields with `@createdAt` directive. Space Cloud automatically inserts the values for them.

> **Note:** You can use `@createdAt` directive only with a DateTime field.

### updatedAt directive

If you want to store the time of the last update made to a document/row, you should use the `@updatedAt` directive. A good example is showing the last modified date on a blog post:

{{< highlight graphql "hl_lines=4" >}}
type post {
  id: ID! @primary
  title: String!
  last_edited: DateTime! @updatedAt
  content: String!
}
{{< /highlight >}}

In an update mutation, you don't need to provide values for the fields with `@updatedAt` directive. Space Cloud automatically updates the values for them.

> **Note:** You can use `@updatedAt` directive only with a DateTime field.