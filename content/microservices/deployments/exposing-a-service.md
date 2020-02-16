---
title: "Exposing a service"
date: 2020-02-14T08:04:06+05:30
draft: false
weight: 2
---

All services deployed by Space Cloud can be accessed only from within the cluster. Its as if, they do not exist to the outside world.

Sometimes you might want to expose certain services or endpoints to the external world. This is especially true when you are hosting your frontend from within Space Cloud. In order to do this, we need to setup some rules in the `Routing` Section.

> **The recommended way to expose your endpoints is by using the [GraphQL API](/microservices/graphql) for enhanced security and flexibility**

![Setting up routing rules](/images/screenshots/expose-basic-service.png)

## How it works?

Each routing rule needs to point towards a `target service`. The target is the service you have deployed using Space Cloud.

The routing rules can be based on two aspects of the incoming request. The first is the requests `host` and the other is its `url`. You can use either or a combination of both to setup your routing rules.

### Routing based on the requests host field

By default, each security rule will match requests irrespective of their host field. To match requests from specific hosts only, check the `Allow traffic from specified hosts only` option.

This allows you to insert an array of hosts you want the rule to match. The rule matches if any one of the host name match.

You can use the `*` keyword to match requests irrespective of the host field.

### Routing based on the requests url

Url based matching consists of 3 parts - `match type`, `url / prefix` and `rewrite url`.

The `match type` is used to set how the url matching will be done. There can be two possible values:

- **Prefix match:** This uses the specified `url` to match with the prefix of the requests url. 
- **Exact match:** This checks if the specified `url` matches the requests url exactly. 

Finally `rewrite` is used to overwrite the prefix of the url when enabled.

### Taking an example

Route Matching Type   | Prefix    | Rewrite  | Target Host                        | Target Port
---                   | ---       | ---      | ---                                | ----
`Prefix Match`        | `/v1/foo` |  `/foo`  |`myapp.myproject.svc.cluster.local` | 8080

An incoming request with the url `/v1/foo/bar` would result in Space Cloud making a request `http://myapp.myproject.svc.cluster.local:8080/foo/bar`.

## Limitations

- The routing module only works for incoming HTTP requests.
- Websockets are not currently supported.
- Space Cloud always fires a `http` request even if the incoming request was `https`.
- Routing rules can be based on in request `url` and `hostname` only.