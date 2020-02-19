---
title: "Exposing a Service"
date: 2020-02-14T08:04:06+05:30
draft: false
weight: 2
---

All services deployed by Space Cloud can be accessed only from within the cluster. Its as if, they do not exist to the outside world.

Sometimes you might want to expose certain services or endpoints to the external world. This is especially true when you are hosting your frontend from within Space Cloud. To do this, we need to set up some rules in the `Routing` Section.

> **The recommended way to expose your endpoints is by using the [GraphQL API](/microservices/graphql) for enhanced security and flexibility**

![Setting up routing rules](/images/screenshots/expose-basic-service.png)

## How it works?

Each routing rule needs to point towards a `target service`. The target is the service you have deployed using Space Cloud.

Routing rules can be applied based on the `HOST` and `URL` of the incoming request. You can use either or a combination of both to set up your routing rules.

### Routing based on the requests host field

By default, each security rule matches requests irrespective of their host field. To match requests from specific hosts only, check the `Allow traffic from specified hosts only` option.

This allows you to insert an array of hosts you want the rule to match. The rule matches if any one of the hostname match.

You can use the `*` keyword to match requests irrespective of the host field.

### Routing based on the requests URL

Url based matching consists of 3 parts - `match type`, `URL / prefix` and `rewrite URL`.

The `match type` option configures the URL matching scheme used. There can be two possible values:

- **Prefix match:** This uses the specified `URL` to match with the prefix of the requests URL. 
- **Exact match:** This checks if the specified `URL` matches the requests URL exactly. 

Finally, `rewrite` is used to overwrite the prefix of the URL when enabled.

### Taking an example

Route Matching Type   | Prefix    | Rewrite  | Target Host                        | Target Port
---                   | ---       | ---      | ---                                | ----
`Prefix Match`        | `/v1/foo` |  `/foo`  |`myapp.myproject.svc.cluster.local` | 8080

An incoming request with the URL `/v1/foo/bar` would result in Space Cloud making a request `http://myapp.myproject.svc.cluster.local:8080/foo/bar`.

## Limitations

- The routing module only works for incoming HTTP requests.
- Websockets are not currently supported.
- Space Cloud always fires an `HTTP` request even if the incoming request was `HTTPS`.
- Routing rules can be applied based on the `HOST` and `URL` of the incoming request only.