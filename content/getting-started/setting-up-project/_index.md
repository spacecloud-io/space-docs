---
title: "Setting up project"
date: 2019-09-26T09:23:13+05:30
draft: true
weight: 4
---

This section talks in depth about setting up a frontend or backend project to use Space Cloud in your preferred language.

> **Note:** Make sure you have already [deployed](/getting-started/deployment) Space Cloud.

## Available options

Space Cloud supports a wide variety of protocols (GraphQL, HTTP, websockets and gRPC).

### For GraphQL lovers

You can use any GraphQL client out there to talk to Space Cloud. However, it's always good to use some popular open source client (eg: Apollo).

Follow this [guide](/getting-started/setting-up-project/graphql) to set up Apollo client (recommended for graphql) in your javascript project.

> **Note:** Before choosing an option, check the [feature coverage](/getting-started/setting-up-project/#feature-coverage) across various options.

### For REST lovers

If you don't want to use graphql, we have made the following client SDKs for you:

- [Javascript](/getting-started/setting-up-project/javascript) for web and Nodejs projects
- [Java](/getting-started/setting-up-project/java) for Android or Java projects
- [Golang](/getting-started/setting-up-project/golang) for Golang projects

The javascript client uses the HTTP and websocket endpoints under the hood whereas the other clients uses the gRPC endpoints of Space Cloud.

> **Note:** For other languages, you can use our REST APIs directly which are documented [here](https://app.swaggerhub.com/apis/YourTechBud/space-cloud/0.11.0).

## Feature coverage

| Features          | GraphQL | Javascript | Java  | Golang |
| :---------------- | ------- | ---------- | ----- | -----: |
| Queries           | ✔️      | ✔️         | ️️ ✔️ |     ✔️ |
| Joins             | ✔️      | ❌         | ❌    |     ❌ |
| Mutations         | ✔️      | ✔️         | ✔️    |     ✔️ |
| Subscriptions     | ✔️      | ✔️         | ✔️    |     ✔️ |
| User management   | ❌      | ✔️         | ✔️    |    ✔️ ️ |
| File Storage      | ✔️      | ✔️         | ✔️    |     ✔️ |
| Writing functions | ❌      | ✔️         | ✔️    |     ✔️ |
| Calling functions | ✔️      | ✔️         | ✔️    |     ✔️ |
| Pub Sub           | ✔️      | ✔️         | ✔️    |     ✔️ |
