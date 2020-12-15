---
title: "Traffic Splitting"
description: "Splitting Traffic between Services"
date: 2020-04-05T09:30:07+05:30
draft: false
weight: 5
---

Sometimes you might want to split the incoming traffic to a service between its different versions and/or external services. The various use cases for traffic splitting include but are not limited to:

- Splitting traffic between various versions.
- A/B Testing different versions of a service.
- Rolling upgrades.

To configure the splitting of service traffic, we need to set up some rules in the `Rules` tab of the `Deployments` section:

![Setting up routing rules](/images/screenshots/service-routes.png) 

To add a routing rule for a service, click on the `Add` button besides its routing rules to open a form like this:

![Setting up routing rules](/images/screenshots/add-service-route.png) 

## How it works?

Each incoming request to an internal service is routed to one of the specified targets. A target can be a version of that service or an external host and is selected randomly based on the weight assigned to it.

As of now, you can split incoming to an external service on the basis of port only.

### Example 1 (Splitting traffic between multiple versions of a service)

**Targets:**

| Target type                | Version | Port   | Weight |
|----------------------------|---------|--------|--------|
| `Internal service version` | `v1`    | `8080` | `80`   |
| `Internal service version` | `v2`    | `8080` | `20`   |

The above config splits the incoming traffic to a service between its 2 versions (`v1` and `v2`). The splitting of traffic is random based on the weights. This means that roughly 80% of requests will go to `v1` while 20% will go to `v2`.

### Example 2 (Splitting traffic between internal versions of a service and an external host)

**Targets:**

| Target type                | Version/Host         | Port   | Weight |
|----------------------------|----------------------|--------|--------|
| `Internal service version` | Verson - `v1`        | `8080` | `50`   |
| `Internal service version` | Verson - `v2`        | `8081` | `30`   |
| `External host`            | Host - `example.com` | `5000` | `20`   |

The above config helps us to route 50% of incoming service requests to its `v1` version and 30% to its `v2` version. While the rest 20% goes to an external host `example.com`.