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

In this guide, we are taking a real-world example to describe all of these relations. Let's say we want to build an e-commerce app and have the following tables: `customers`, `addresses`, `orders` and `items`.

| Type           | Example                     | Meaning                                                                                 |
| :------------- | --------------------------- | --------------------------------------------------------------------------------------- |
| `one-to-one`   | `customers` and `addresses` | A `customer` can have only one `address` and one `address` can have only one `customer` |
| `one-to-many`  | `customers` and `orders`    | A `customer` can have many `orders` but a `order` can have only one `customer`          |
| `many-to-many` | `orders` and `items`        | An `order` can have many `items` and one `item` can be in many `orders`                 |


## Modelling one-to-one and one-to-many relations

`one-to-one` and `one-to-many` relations are modelled the same way in Space Cloud. Both of these are seen as `something(one|many)-to-one` in Space Cloud. 

Such relations are modelled using the `@relation` directive on the child/dependent table.

### one-to-one example

The schema modelling for our `customers` and `addresses` will look like these:

{{< highlight graphql "hl_lines=11">}}
type customers {
  id: ID! @id
  name: String!
  address_id: String!
}

type addresses {
  id: ID! @id
  address: String!
  pin_code: Integer!
  customer_id: customers! @relation(field: "id")
}
{{< /highlight >}}

Note that there is a @relation directive on the customer_id field. The `@relation` directive is used to specify that the `customer_id` field is referring to the `id` field of `customers` table. 


> **Syntactic sugar:** If you want to refer to the `id` field in SQL databases or `_id` field in MongoDB, you can use the `@relation` directive without `field` argument.

Space Cloud creates a foreign key on the field specified in the `@relation` directive. This foreign key helps maintain the integrity of the relation. For example, in this case, a `customer` can't be deleted before deleting his address since address depends on the customer.

### one-to-many example

The schema modelling for our `customers` and `orders` will look like these:

{{< highlight graphql "hl_lines=11">}}
type customers {
  id: ID! @id
  name: String!
  address_id: String!
}

type orders {
  id: ID! @id
  order_date: DateTime!
  amount: Float!
  customer_id: customers! @relation(field: "id")
}
{{< /highlight >}}

 The `@relation` directive is used to specify that the `customer_id` field is referring to the `id` field of `customers` table. 

Space Cloud creates a foreign key on the field specified in the `@relation` directive. This foreign key helps maintain the integrity of the relation. For example, in this case, a `customer` can't be deleted before deleting all of his orders since orders depend on the customer.

## Modelling many-to-many relations

Two `one-to-one` relations along with an extra table are required to model `many-to-many` relations.

The schema modelling for our `orders` and `items` will look like these:

{{< highlight graphql "hl_lines=17-18">}}
type orders {
  id: ID! @id
  order_date: DateTime!
  amount: Float!
  customer_id: customers! @relation(field: "id")
}

type items {
  id: ID! @id
  name: String!
  description: String
  price: Float!
}

type orders_items {
  id: ID! @id
  order_id: orders! @relation(field: "id")
  item_id: items! @relation(field: "id")
}
{{< /highlight >}}


Note that here we are making an extra table `orders_items` to store two one-to-one relations -  one with `orders` and one with `items`.

These make foreign keys on both the tables. Thus, you would first have to delete the linkage in the `orders_items` table before deleting an order or an item.