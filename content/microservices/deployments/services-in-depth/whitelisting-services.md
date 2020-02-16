---
title: "Whitelisting services"
date: 2020-02-14T10:45:00+05:30
draft: false
weight: 6
---

Space Cloud allows you to whitelist the downstream services which are allowed to communicate with the current service in an extremely easy manner.

![Whitelisting Services](/images/screenshots/whitelisting-services.png)

> **Space Cloud whitelists all services within the same project by default.**

## How it works?

Whitelisting uses Istio's [Authorization Policies](https://istio.io/docs/reference/config/security/authorization-policy/) to enforce policy control. This helps you safeguard your sensitive services from internal attacks.

Let's say you have a _Customer Identity Service_ which deals with personally identifiable information. By whitelisting the services which have access to this service, you can prevent customer data from leaking within the organization.

Space Cloud requires two parameters to configure whitelisting.

- **Project Id:** The project id of the service to be whitelisted
- **Service Id:** The id of the service to be whitelisted

Clearly, Space Cloud allows you to whitelist services from different projects.

> **Whitelisting services from different projects works inside the same cluster only.**

- A `*` in the project id field indicates that the provided service can be accessible by all services in all projects.
- A `*` in the service id field indicates that the provided service can be accessible by all services in the provided project.