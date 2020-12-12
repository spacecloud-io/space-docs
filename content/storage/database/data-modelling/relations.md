---
title: "Modelling Relations"
description: "Modelling Relations"
date: 2019-10-16T08:21:54+05:30
draft: false
weight: 2
---

Most real-world applications have relations between their entities. Describing these relations in your schema has two significant advantages:

- It ensures that the integrity of relations is maintained.
- Simpler queries to fetch related data on frontend. (Joins are implied by the relations you describe in the schema)

## Table relationships

There are three major types of database relationships:

- `one-to-one`  
- `one-to-many`
- `many-to-many`

In this guide, we are taking a real-world example to describe all of these relations. Let's say we want to build an e-commerce app and have the following tables: `customer`, `address`, `order` and `item`.

| Type           | Example                  | Meaning                                                                                      |
|:---------------|--------------------------|----------------------------------------------------------------------------------------------|
| `one-to-one`   | `customer` and `address` | A `customer` can have only one `address` and one `address` can only belong to one `customer` |
| `one-to-many`  | `customer` and `order`   | A `customer` can have many `order`, but an `order` can belong to only one `customer`           |
| `many-to-many` | `order` and `item`       | An `order` can have many `item` and one `item` can be in many `order`                        |

## Modelling relations

Modelling relations in Space Cloud have two parts:

- `@foreign`: Helps maintain the integrity of the relation by creating a foreign key.
- `@link`: Helps simplify the queries on frontend by linking related types in schema.

In this guide, we are going to look at the best practices for modelling different types of relations in Space Cloud using the links and foreign keys. 

> **Note:** Both the links and foreign keys are optional and independent of each other. For example, you can skip creating the foreign key if you don't care about the integrity of the relationship and vice versa.

### One-to-one example

Let's take an example where each customer can have only one address. Note that this is a one-to-one relationship. The schema modelling to enable this relationship is as follows:

{{< highlight graphql "hl_lines=4 11">}}
type customer {
  id: ID! @primary
  name: String!
  address: address! @link(table: "address", from: "id", to: "customer_id")
}

type address {
  id: ID! @primary
  street: String!
  pin_code: Integer!
  customer_id: ID! @foreign(table: "customer", field: "id")
}
{{< /highlight >}}

**Link:**

The above example links the `customer.address` field to the `address` type/table. 

> **Note:** `customer.address` is not a physical field. It's just a virtual field to describe the relationship between customer and address types.

The advantage of describing this link is that you can now query a customer along with its address in a simple query from frontend:

{{< highlight graphql >}}
query {
  customer @mysql {
    id
    name
    address {
      street
      pin_code
    }
  }
}
{{< /highlight >}}

The above query will join the customer and address table on the backend with the condition - `customer.id == address.customer_id`. This condition is described by the arguments - `table`, `from` and `to` of the `@link` directive.

> **You should use the [Native SQL joins](/storage/database/queries/joins#native-sql-joins) via Space Cloud's GraphQL API wherever possible as they are far more performant than the one described above.**

**Foreign Key:**

If you have noticed, we specified a `@foreign` directive at the `address.customer_id` field. This instructs Space Cloud to create a foreign key from the `address.customer_id` field to the `id` field of the `customer` table. The target of the foreign key is described by the `table` and `field` arguments of the `@foreign` directive. A foreign key helps to maintain the integrity of the relationship, i.e. a customer can't be deleted without deleting his address.

If you also wanted to fetch an address along with its customer, then you would also have to create a similar virtual field in address table linking to the customer table:

{{< highlight graphql "hl_lines=12">}}
type customer {
  id: ID! @primary
  name: String!
  address: address! @link(table: "address", from: "id", to: "customer_id")
}

type address {
  id: ID! @primary
  street: String!
  pin_code: Integer!
  customer_id: ID! @foreign(table: "customer", field: "id")
  customer: customer! @link(table: "customer", from: "customer_id", to: "id")
}
{{< /highlight >}}

### One-to-many example

The schema modelling for our `customer` and `order` (one-to-many relation) will look like these:

{{< highlight graphql "hl_lines=4 11">}}
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

Note how we are expecting `customer.orders` to be an array of type `order`. However, there is no such physical field called `orders` in the `customer` table. It's just a virtual field that is referring to the `order` table. 

So now you can perform this query on the frontend:

{{< highlight graphql >}}
query {
  customer @mysql {
    id
    name
    orders {
      id
      order_date
      amount
    }
  }
}
{{< /highlight >}}

As in the previous example, we have also mentioned a `@foreign` directive to create a foreign key between `order.customer_id` and `customer.id`.

## Modelling many-to-many relations

You can model many-to-many relationships in SQL with the help of an extra tracking table that tracks the relationships between the two tables. 

Let's take an example where each order can have multiple items, and each item can be in multiple orders. To maintain this relation, we need to create a third table that tracks the relation between orders and items. To fetch an order with all of its items, we need to describe two links - first between the `order` and `order_item` table and second between the `order_item` and `item` table. Here's an example that does this:

{{< highlight graphql "hl_lines=5 12">}}
type order {
  id: ID! @primary
  order_date: DateTime!
  amount: Float!
  items: [item] @link(table: "order_item", field: "items" from: "id", to: "order_id")
}

type order_item {
  id: ID! @primary
  order_id: ID! @foreign(table: "order", field: "id")
  item_id: ID! @foreign(table: "item", field: "id")
  items: item @link (table: "item", from: "item_id", to:"id")
}

type item {
  id: ID! @primary
  name: String!
  description: String
  price: Float!
}

{{< /highlight >}}

In this example, we are first linking `order.items` to the `order_item.items` field, which in turn links to the `item` table. 

Thus we can now query order along with their items in a simple query:
{{< highlight graphql >}}
query {
  order @mysql {
    id
    order_date
    amount
    items {
      id
      name
      description
      price
    }
  }
}
{{< /highlight >}}

Note that we are also making two foreign keys in this case - one for the order and one for the item table. 
