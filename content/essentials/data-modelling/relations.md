---
title: "Modelling Relations"
date: 2019-10-16T08:21:54+05:30
draft: true
weight: 3
---

Most real-world applications have relations between their entities. Making your database aware of those relations have two significant advantages:

- It ensures that the integrity of relations is maintained.
- Inferring information to make [join](/essentials/queries/joins) queries simpler (upcoming).

## Table relationships

There are three major types of database relationships:

- `one-to-one`  
- `one-to-many`
- `many-to-many`

In this guide, we are taking a real-world example to describe all of these relations. Let's say we want to build an e-commerce app and have the following tables: `customer`, `address`, `order` and `item`.

| Type           | Example                  | Meaning                                                                                      |
|:---------------|--------------------------|----------------------------------------------------------------------------------------------|
| `one-to-one`   | `customer` and `address` | A `customer` can have only one `address` and one `address` can only belong to one `customer` |
| `one-to-many`  | `customer` and `order`   | A `customer` can have many `order` but a `order` can belong to only one `customer`                |
| `many-to-many` | `order` and `item`       | An `order` can have many `item` and one `item` can be in many `order`                        |


## Modelling one-to-one and one-to-many relations

`one-to-one` and `one-to-many` relations are modelled the same way in Space Cloud.

Such relations are modelled using the `@relation` directive on the child/dependent table.

### one-to-one example

The schema modelling for our `customer` and `address` will look like these:

{{< highlight graphql "hl_lines=10">}}
type customer {
  id: ID! @primary
  name: String!
}

type address {
  id: ID! @primary
  address: String!
  pin_code: Integer!
  customer: customer! @relation(field: "id")
}
{{< /highlight >}}

Note that there is a @relation directive on the `customer` field. The `@relation` directive is used to specify that the `customer` field in `address` is referring to the `id` field of `customer` table. 


> **Syntactic sugar:** If you want to refer to the `id` field in SQL databases or `_id` field in MongoDB, you can use the `@relation` directive without `field` argument.

Space Cloud creates a **foreign key** on the field specified in the `@relation` directive. This foreign key helps maintain the integrity of the relation. For example, in this case, a customer can't be deleted before deleting his address since address depends on the customer.

### one-to-many example

The schema modelling for our `customer` and `order` will look like these:

{{< highlight graphql "hl_lines=5 12">}}
type customer {
  id: ID! @primary
  name: String!
  address_id: String!
  orders: [order] @relation
}

type order {
  id: ID! @primary
  order_date: DateTime!
  amount: Float!
  customer: customer! @relation(field: "id")
}
{{< /highlight >}}

The `@relation` directive is used to specify that the `customer` field in the `order` table is referring to the `id` field of `customer` table. 

Space Cloud creates a foreign key on the field specified in the `@relation` directive. This foreign key helps maintain the integrity of the relation. For example, in this case, a customer can't be deleted before deleting all of his orders since order depends on the customer.

> **Note:** The `orders` field in the `customer` table does nothing as of now. But in future, Space Cloud would be able to make your join queries easier with this info.

## Modelling many-to-many relations

Two `one-to-one` relations along with an extra table are required to model `many-to-many` relations.

The schema modelling for our `order` and `item` table will look like these:

{{< highlight graphql "hl_lines=16-17">}}
type order {
  id: ID! @primary
  order_date: DateTime!
  amount: Float!
}

type item {
  id: ID! @primary
  name: String!
  description: String
  price: Float!
}

type order_item {
  id: ID! @primary
  order: orders! @relation(field: "id")
  item: items! @relation(field: "id")
}
{{< /highlight >}}


We are making an extra table here - `order_item` to store two one-to-one relations -  one with `order` and one with `item`.

These make foreign keys on both the tables. Thus, you would first have to delete the linkage in the `order_item` table before deleting an order or an item.