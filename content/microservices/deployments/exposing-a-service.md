---
title: "Exposing a Service"
date: 2020-02-14T08:04:06+05:30
draft: false
weight: 3
---

All services deployed by Space Cloud can be accessed only from within the cluster. Its as if, they do not exist to the outside world.

Sometimes you might want to expose certain services or endpoints to the external world. This is especially true when you are hosting your frontend from within Space Cloud. To do this, we need to set up some rules in the `Routing` Section.

> **The recommended way to expose your endpoints is by using the [GraphQL API](/microservices/graphql/) for enhanced security and flexibility**

![Setting up routing rules](/images/screenshots/add-ingress-route.png)

## How it works?

Each incoming request is routed to one of the specified target services. A target service is selected randomly based on the weight assigned to it.

Routing rules can be applied based on the `HOST`, `METHOD` and `URL` of the incoming request. You can use either one or a combination of these to set up your routing rules.

### Routing based on the request's host

By default, each security rule matches the incoming request irrespective of their host. To match requests from specific hosts only, check the `Allow traffic with specified hosts only` option.

This allows you to insert an array of hosts you want the rule to match in the `Allowed hosts`. The rule matches if any one of the `Allowed hosts` matches with the host of the incoming request.

You can uncheck the `Allow traffic with specified hosts only` option to match requests irrespective of the host.

### Routing based on the request's method

By default, each security rule matches the incoming request irrespective of their method. To match requests from specific methods only, check the `Allow traffic with specified methods only` option.

This allows you to select multiple methods for which you want the rule to match in the `Allowed methods`. The rule matches if any one of the `Allowed methods` matches with the method of the incoming request.

You can uncheck the `Allow traffic with specified methods only` option to match requests irrespective of the method.

### Routing based on the request's URL

Url based matching consists of 3 parts - `match type`, `URL / prefix` and `rewrite URL`.

The `match type` option configures the URL matching scheme used. There can be two possible values:

- **Prefix match:** This uses the specified `URL` to match with the prefix of the request's URL. 
- **Exact match:** This checks if the specified `URL` matches the request's URL exactly. 

Finally, `rewrite` is used to overwrite the prefix of the URL when enabled.

### Taking an example

Let's say we want to route all the incoming requests matching the following criteria:

- **HOSTS:** `example.com`
- **METHODS:** `POST` and `GET`
- **Starting with:** `/v1/foo`

between two of our services with equal probability. And let's say we also want to replace the `/v1/foo` in the incoming requests with `/foo` before forwarding the requests to our services. Here's how you can specify a routing rule in Space Cloud to achieve this:


**Route Selection:**

| Route Matching Type | Prefix    | Rewrite | Allowed hosts   | Allowed methods |
|---------------------|-----------|---------|-----------------|-----------------|
| `Prefix Match`      | `/v1/foo` | `/foo`  | [`example.com`] | [`POST`, `GET`] |

**Targets:**

| Scheme | Service Host                         | Port   | Weight |
|--------|--------------------------------------|--------|--------|
| `HTTP` | `myapp1.myproject.svc.cluster.local` | `8080` | `50`   |
| `HTTP` | `myapp2.myproject.svc.cluster.local` | `8080` | `50`   |

## Limitations

- The routing module only works for incoming HTTP(s) based requests. WebSockets are currently not supported.
- Routing rules can be applied based on the `HOST`, `METHOD` and `URL` only of the incoming request.