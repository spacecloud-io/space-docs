---
title: "Design Goals"
date: 2019-09-20T06:42:41+05:30
draft: true
weight: 2
---

There are a lot of design decisions taken by us while creating Space Cloud. These form the guiding principles which heavily influence the roadmap ahead. Understanding them would also make our objectives of creating Space Cloud a lot more clear.

## Ease of use
The main reason Space Cloud was born was to simplify the app/web development process. Right from making simple CRUD operations to syncing data reliably in a distributed environment, everything must be as simple as a function call. This is the prime reason we chose to have a consistent API across all the databases/technologies we support.

This also means that Space Cloud needs to be as unopinionated as possible to reuse the existing skill sets and tech you might be well versed with. Which is also why we added the support of **GraphQL** to Space Cloud since frontend developers are well versed with it.

## Security
We take security a bit too seriously. In fact, we are close to being paranoid about it. All products built with Space Cloud must be highly secure.

The idea of exposing your database over a public API doesn't sound like a good one. But to make sure we can do it in a secure manner, we have added a powerful yet flexible feature called security rules. These **security rules** (written in JSON) along with JWT tokens help you take care of a wide variety of **authentication and authorization** problems.

## Enterprise-ready
We believe that each app built with Space Cloud must be extremely robust and future proof. We shall never comprise on the robustness of the platform at any cost. This also means that sometimes we have to skip the urge for easy hacks to implement things in a **cloud native** fashion.

## Leverage the existing tools
The goal of this project is not to re-invent the wheel over and over again. In fact, integration with proven technologies is preferred over implementing them ourselves. For example, we are using [Nats](https://nats.io/) under the hood, to power our pub sub and functions modules for high throughput and scale.

We eat our own dog food to such an extent, that the realtime module in Space Cloud is implemented on the back of the in-built event triggers and pub sub module in Space Cloud.























