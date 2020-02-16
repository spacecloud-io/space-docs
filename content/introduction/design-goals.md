---
title: "Design Goals"
date: 2020-02-12T06:42:53+05:30
draft: false
weight: 2
---

Many design decisions were taken by us while creating Space Cloud. These decisions form the guiding principles which heavily influence the roadmap ahead. Understanding them would also make our objectives of creating Space Cloud a lot more clear.

## Ease of use
Space Cloud was born was to simplify the app/web development process. Right from making simple CRUD operations to syncing data reliably in a distributed environment, everything must be as simple as a function call. That's why we chose to have a consistent API across all the databases/technologies we support.

Well, it also means that Space Cloud needs to be as unopinionated as possible to reuse the existing skill sets and tech you might have, which is also why we added the support of **GraphQL** to Space Cloud since frontend developers love it.

## Security
We take security so seriously that we are close to being paranoid about it. All products built with Space Cloud must be highly secure.

The idea of exposing your database over a public API doesn't sound like a good one. But to make sure we can do it securely, we have added a powerful yet flexible feature called security rules. These **security rules** (written in JSON) along with JWT tokens help you take care of a wide variety of **authentication and authorization** problems.

## Enterprise-ready
We believe that each app built with Space Cloud must be extremely robust and future proof. We shall never comprise on the robustness of the platform at any cost. This stand also means that sometimes we have to skip the urge for easy hacks to implement things in a **cloud-native** fashion.

## Leverage the existing tools
The goal of this project is not to re-invent the wheel over and over again. Instead, we prefer integration with proven technologies over implementing them ourselves. For example, we use [Consul](https://www.consul.io/) in the distributed mode for service discovery and config sync.

We eat our dog food to such an extent that we have implemented the realtime module in Space Cloud is implemented on the back of Space Cloud's in-built eventing module.