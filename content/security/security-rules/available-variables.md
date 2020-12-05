---
title: "Available Variables"
description: "Available Variables"
date: 2020-06-18T12:11:07+05:30
draft: false
weight: 8
---


## What are variables?

Each operation that is performed in Space Cloud has a context associated with it. 

For example, the token claims for that request. Some context information is specific to a particular type of request only. For example, the document to be inserted in case of the database create operation. 

Such context information is available in the form of variables to each security rule that is processed for an operation. You can take advantage of these context variables to enrich your security rules. 

## Available variables

Following are the variables available in the security rules of Space Cloud for the different operations:

### Database create

| Variable     | Data type | Description                                                                                            |
|--------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`  | Object    | Object containing the JWT claims present in the token.                                                 |
| `args.doc`   | Object    | Document/row to be inserted into the database.                                                         |
| `args.token` | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |

### Database read

| Variable     | Data type | Description                                                                                            |
|--------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`  | Object    | Object containing the JWT claims present in the token.                                                 |
| `args.find`  | Object    | The `find/where` clause of the read operation. Follows the MongoDB DSL.                                |
| `args.token` | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |
| `args.opts.limit` | Number    | Value of the limit clause if specified in the request. |
| `args.opts.skip` | Number    | Value of the skip clause if specified in the request. |

### Database update

| Variable      | Data type | Description                                                                                            |
|---------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`   | Object    | Object containing the JWT claims present in the token.                                                 |
| `args.find`   | Object    | The `find/where` clause of the update operation. Follows the MongoDB DSL.                              |
| `args.update` | Object    | The `update` clause of the update operation. Follows the MongoDB DSL.                                  |
| `args.token`  | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |

### Database delete

| Variable     | Data type | Description                                                                                            |
|--------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`  | Object    | Object containing the JWT claims present in the token.                                                 |
| `args.find`  | Object    | The `find/where` clause of the delete operation. Follows the MongoDB DSL.                              |
| `args.token` | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |

### Database prepared query

| Variable      | Data type | Description                                                                                            |
|---------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`   | Object    | Object containing the JWT claims present in the token.                                                 |
| `args.params` | Object    | Object containing the `params` to be passed to the prepared query.                                     |
| `args.token`  | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |

### File store create

| Variable      | Data type | Description                                                                                            |
|---------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`   | Object    | Object containing the JWT claims present in the token.                                                 |
| `args.params` | Object    | Object containing the path params of the file/folder to be created.                                    |
| `args.token`  | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |

### File store read

| Variable      | Data type | Description                                                                                            |
|---------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`   | Object    | Object containing the JWT claims present in the token.                                                 |
| `args.params` | Object    | Object containing the path params of the file/folder to be read.                                       |
| `args.token`  | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |

### File store delete

| Variable      | Data type | Description                                                                                            |
|---------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`   | Object    | Object containing the JWT claims present in the token.                                                 |
| `args.params` | Object    | Object containing the path params of the file/folder to be deleted.                                    |
| `args.token`  | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |

### Remote service call

| Variable      | Data type | Description                                                                                            |
|---------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`   | Object    | Object containing the JWT claims present in the token.                                                 |
| `args.params` | Object    | Object containing the params/arguments provided while calling the remote service.                      |
| `args.token`  | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |

### Custom event triggers

| Variable      | Data type | Description                                                                                            |
|---------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`   | Object    | Object containing the JWT claims present in the token.                                                 |
| `args.params` | Object    | The event data object.                                                                                 |
| `args.token`  | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |

### Ingress routes

| Variable               | Data type     | Description                                                                                            |
|------------------------|---------------|--------------------------------------------------------------------------------------------------------|
| `args.auth`            | Object        | Object containing the JWT claims present in the token.                                                 |
| `args.params`          | Object        | Object containing the path params of the ingress route.                                                |
| `args.query.path`      | String        | The exact request path.                                                                                |
| `args.query.pathArray` | Array<String> | Request path splitted by `/`.                                                                          |
| `args.query.params`    | Object        | Object containing the query params of the request.                                                     |
| `args.query.headers`   | Object        | Object containing the query params of the request.                                                     |                                               |
| `args.token`           | String        | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |