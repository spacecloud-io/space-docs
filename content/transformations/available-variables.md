---
title: "Available Variables"
description: "Available Variables"
date: 2020-11-27T11:24:17+05:30
draft: false
weight: 4
---

## What are variables?

Each transformation that is performed in Space Cloud has a context associated with it. For example, the token claims for that request or the request body itself.

Such context information is available in the form of variables to each transformation. You can take advantage of these context variables to enrich your transformations.

## Available variables

Following are the variables available in the transformations of Space Cloud for different modules:

### Event triggers

| Variable | Data type | Description                          |
|----------|-----------|--------------------------------------|
| `args`   | Object    | Object containing the event payload. |

Event payload structures for different types of events:

- [Database events](/microservices/eventing/database/#event-payload)
- [File storage events](/microservices/eventing/file-storage/#event-payload)
- [Custom events](/microservices/eventing/custom-events/create/#event-payload) 

### Remote services

| Variable | Data type | Description                                                                                       |
|----------|-----------|---------------------------------------------------------------------------------------------------|
| `args`   | Object    | Object containing the request/response body.                                                      |
| `auth`   | Object    | Object containing the JWT claims present in the token.                                            |
| `token`  | String    | Raw token present under the Authorization header in the request. (with the Bearer prefix removed) |

### Ingress routes

| Variable | Data type | Description                                            |
|----------|-----------|--------------------------------------------------------|
| `args`   | Object    | Object containing the request/response body.           |
| `auth`   | Object    | Object containing the JWT claims present in the token. |
