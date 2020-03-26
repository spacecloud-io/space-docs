---
title: "Supported Features"
date: 2019-10-16T10:51:01+05:30
draft: false
weight: 3
---
This guide will give a detailed explanation of [object types](#object-types), [field types](#field-types), [field-constraints](#field-constraints) and [directives](#directives) in the Space Cloud schema definition language.

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

An `ID` is used to hold a string value of up to 50 characters. You use `ID` to store prominent strings in your model like the unique identifier of a row/document.

> **Note:** As of now, only field with type`ID` can be a primary key.

Space Cloud auto-generates the value of `ID` fields with [ksuid](https://github.com/segmentio/ksuid) (sortable unique identifiers) if you don't provide their value during an insert operation.

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

**JSON fields**

A `JSON` type stores JSON data. It is typically used when your data has nested structures rather than a flat structure.

> **Note:** This is only available in PostgreSQL as of now. It uses the `JSONB` type of Postgres underneath to provide this feature. 

For example: We might want to store the `address` of each user in the `user` table. However, `address` field itself can have other fields like `pincode`, `city`, etc. You can model such data easily in the following way using the `JSON` type:

{{< highlight graphql "hl_lines=5">}}
type user {
  id: ID! @primary
  email: ID!
  name: String!
  address: JSON
}
{{< /highlight >}}

Providing such a schema allows you to use JSON objects in your mutations and queries directly. Serializing and unserializing of the JSON data is handled automatically.

**Nested/embedded fields**

Document oriented databases like MongoDB have first-class support of nested structures. Modelling nested structures in such databases is as easy as writing a separate schema for the nested structure and using that schema in the parent schema. 

> **Note:** This feature is only available in MongoDB.

**Example:** Let's say each document in `post` collection has an embedded document called `author`: 

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

> **Note:** All the embedded types for a collection are provided in the schema of the collection itself.


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
  username: ID! @unique
  email: String!
}
{{< /highlight >}}

**Example:** Composite unique keys:

{{< highlight graphql >}}
type user {
  id: ID! @primary
  first_name: String! @unique("group": "unique_name", order: 1)
  last_name: String! @unique("group": "unique_name", order: 2)
}
{{< /highlight >}}

> **Note:** The `@unique` index only works with type `ID`, `Integer`, `Float`, `Boolean` and `DateTime`.

The above example creates a composite unique key on two columns - `first_name` and `last_name`. Read more about `@unique` directive from [here].

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
  author: ID @foreign(table: "author", field: "id")
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
The `@unique` directive is used to put a unique constraint/index on a field(s). In its simplest form it looks like this:

{{< highlight graphql "hl_lines=3">}}
type user {
  id: ID! @primary
  email: ID! @unique
  name: String!
}
{{< /highlight >}}

The above schema creates an unique index on the `email` field. (i.e. No two users will have the same `email`)

> **Note:** The `@unique` index only works with type `ID`, `Integer`, `Float`, `Boolean` and `DateTime`.

You can provide the following arguments in order to customize the unique index:

- `group`: (String) If two or more fields have the same `group`, then they form a **composite unique index**.
- `order`: (Integer starting from 1) Used to set the order of the column within the index . Required in case of composite unique index.

**Full fledged example:** Make sure that the combination of `first_name` and `last_name` is unique:

{{< highlight graphql "hl_lines=4" >}}
type user {
  id: ID! @primary
  first_name: ID! @unique(group: "user_name", order: 1),
  last_name: ID! @unique(group: "user_name", order: 2)
}
{{< /highlight >}}

The `@unique` directive is used to put a unique constraint/index on a field(s). It takes the following arguments:

- `group`: Optional. A string used to name the unique index. If two or more fields have the same `group`, then they form a composite unique key.
- `order`: Optional. An integer used to set the order of the column within the index . Required in case of composite unique key.

### Default value directive
The `@default` directive is used to assign a column / field a default value. During an insert, if the field containing the `@default` directive wasn't set, the default value is used

**Example:** Setting the default value of `role` to `user`:

{{< highlight graphql "hl_lines=4">}}
type account {
  id: ID! @primary
  name: ID!
  role: ID! @default(value: "user")
}
{{< /highlight >}}

> **Note:** The `@default` directive only works with type `ID`, `Integer`, `Float`, `Boolean` and `DateTime`.

### Foreign directive
The `@foreign` directive is used to create a foreign key constraint. Foreign keys are used to maintain the integrity of relations in your data model.

**Example:** Create a foreign key between the `order` and its `customer`:

{{< highlight graphql "hl_lines=10">}}
type customer {
  id: ID! @primary
  name: String!
}

type order {
  id: ID! @primary
  order_date: DateTime!
  amount: Float!
  customer_id: ID! @foreign(table: "customer", field: "id")
}
{{< /highlight >}}

In the above example, a foreign key is created from the `customer_id` field of `order` table to the `id` field of `customer` table.

> **Note:** Both the fields involved in the foreign key (in this case `order.customer_id` and `customer.id`) should have the same type (`ID` in this case).

### Link directive

Links are used to model relational data. They help you fetch a type along with its related type with a simple query. 

> **Note:** Links are not physical fields in table. They are virtual fields which help Space Cloud to perform join operations on the backend.

The `@link` directive is used to link a field to:

- Another type/table
- A field within another type/table
- Another link

**Case 1: (Linking to another type/table)**

In this example, we are going to link the orders of a customer to `orders` field in `customer` so that you can query a customer along with all his orders. Here's a schema example to achieve this: 

{{< highlight graphql "hl_lines=4">}}
type customer {
  id: ID! @primary
  name: String!
  orders: [order] @link(table: "order", from: "id", to: "customer_id")
}

type order {
  id: ID! @primary
  order_date: DateTime!
  amount: Float!
  customer_id: ID! @foreign(table: "customer", field: "id")
}
{{< /highlight >}}

> **Note:** There is no physical `orders` field in the `customer` table. The `customer.orders` is a **virtual field linked to another table** (order table in this case). 

So now you can perform this query on frontend:
{{< highlight graphql >}}
query {
  customer @mysql {
    id
    name
    orders {
      id
      amount
      order_date
    }
  }
}
{{< /highlight >}}

The above query results in a join between the customer and order table with the condition - `customer.id == order.customer_id`. This condition is described by the `from` and `to` arguments in the `@link` directive. 


**Case 2: (Linking to a field in another type/table)**

Let's say you want to query a customer along with the dates of all his orders. For that, we need to link the `order_dates` of all the orders placed by a `customer`. Here's a schema example to achieve this:

{{< highlight graphql "hl_lines=4">}}
type customer {
  id: ID! @primary
  name: String!
  order_dates: [DateTime] @link(table: "order", field: "order_date", from: "id", to: "customer_id")
}

type order {
  id: ID! @primary
  order_date: DateTime!
  amount: Float!
  customer_id: ID! @foreign(table: "customer", field: "id")
}
{{< /highlight >}}

So now you can perform this query on frontend:
{{< highlight graphql >}}
query {
  customer @mysql {
    id
    name
    order_dates
  }
}
{{< /highlight >}}

**Case 3: (Linking to another link)**

Many to many relationships in SQL are tracked by a third table called the **tracking table**. 

Let's say we want to fetch all the orders with their items. In this case, we first link the `order` table to the `items` field in `order_item` table (tracking table), which then links to the `item` table. Here's how you can model the schema for this example:

{{< highlight graphql "hl_lines=4 11">}}
type order {
  id: ID! @primary
  order_date: DateTime!
  items: [item] @link(table: "order_item", field: "items", from : "id", to: "order_id")
}

type order_item {
  id: ID! @primary
  order_id: ID! @foreign(table: "order", field: "id")
  item_id: ID! @foreign(table: "item", field: "id")
  items: [item] @link(table: "item", from: "item_id", to: "id")
}

type item {
  id: ID! @primary
  name: String!
  description: String!
  price: Float!
}
{{< /highlight >}}

So now you can perform this query on frontend:
{{< highlight graphql >}}
query {
  order @mysql {
    id
    order_date
    items {
      id
      name
      description
      price
    }
  }
}
{{< /highlight >}}

### Index directive

The `@index` directive is used to create an index on your table/collection. In its simplest form it looks like this:

{{< highlight graphql "hl_lines=3">}}
type user {
  id: ID! @primary
  email: ID! @index
  name: String!
}
{{< /highlight >}}

The above schema creates an index on the `email` field. 


> **Note:** The `@unique` index 

> **Note:** The `@index` directive isn't available on MongoDB yet and only works with type `ID`, `Integer`, `Float`, `Boolean` and `DateTime`.

You can provide the following arguments in order to customize the index:

- `group`: (String) If two or more fields have the same `group`, then they form a **composite index**.
- `order`: (Integer starting from 1) Used to set the order of the column within the index . Required in case of composite index.
- `sort`: (String - `asc`|`desc`) Used to set the sorting of the index.

**Full fledged example:** 

{{< highlight graphql "hl_lines=4" >}}
type user {
  id: ID! @primary
  first_name: ID! @index(group: "user_name", order: 1, sort: "asc"),
  last_name: ID! @index(group: "user_name", order: 2, sort: "desc")
}
{{< /highlight >}}

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