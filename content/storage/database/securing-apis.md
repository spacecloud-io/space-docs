---
title: "Securing your Database"
title: "Securing your Database APIs"
date: 2019-09-23T10:07:49+05:30
draft: false
weight: 8
---

You can easily configure access control for the database APIs with Space Cloud's security rules. The security rules in the database module works on the operation level (create, read, update, delete) for each table/collection. This means that you can have different rules for different operations on each table/collection.

Here's a sample snippet which shows the rules on the `users` table. Operations `create`  and `read` are allowed while `update` and `delete` are blocked:

{{< highlight json >}}
{
  "create": {
    "rule": "allow"
  },
  "read": {
    "rule": "allow"
  },
  "update": {
    "rule": "deny"
  },
  "delete": {
    "rule": "deny"
  }
}
{{< /highlight >}}

Space Cloud's security rules are flexible enough to enforce any access control logic including querying your databases, validating conditions and masking private data. Checkout the documentation of [security rules]() to learn more.

## Configuring security rules

Head over to the `Overview` tab in the `Database` section of the Mission Control. Click on the `Secure` action on any of the tracked tables/collections.

This will open a Rule Builder UI to configure the rules easily:

The rule editor also comes packed with a quite a few [shortcuts]() to make you feel productive.

If you are more comfortable wih JSON, you can switch to the JSON editor as well by clicking on the `JSON` tab. 

The API Explorer of Mission Control comes packed with a [token builder]() as well to make testing your security rules for different JWT claims a breeze!

## Available variables

Following are the variables available in the security rules for different operations in the database module:

### Database create

| Variable     | Data type | Description                                                                                            |
|--------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`  | Object    | Object containing the jwt claims present in the token.                                                 |
| `args.doc`   | Object    | Document/row to be inserted into the database.                                                         |
| `args.token` | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |

### Database read

| Variable     | Data type | Description                                                                                            |
|--------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`  | Object    | Object containing the jwt claims present in the token.                                                 |
| `args.find`  | Object    | The `find/where` clause of the read operation. Follows the MongoDB DSL.                                |
| `args.token` | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |

### Database update

| Variable      | Data type | Description                                                                                            |
|---------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`   | Object    | Object containing the jwt claims present in the token.                                                 |
| `args.find`   | Object    | The `find/where` clause of the update operation. Follows the MongoDB DSL.                              |
| `args.update` | Object    | The `update` clause of the update operation. Follows the MongoDB DSL.                                  |
| `args.token`  | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |

### Database read

| Variable     | Data type | Description                                                                                            |
|--------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`  | Object    | Object containing the jwt claims present in the token.                                                 |
| `args.find`  | Object    | The `find/where` clause of the delete operation. Follows the MongoDB DSL.                              |
| `args.token` | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |

### Database prepared query

| Variable      | Data type | Description                                                                                            |
|---------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`   | Object    | Object containing the jwt claims present in the token.                                                 |
| `args.params` | Object    | Object containing the `params` to be passed to the prepared query.                                     |
| `args.token`  | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |
