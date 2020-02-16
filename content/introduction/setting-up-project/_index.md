---
title: "Setting up project"
date: 2019-09-26T09:23:13+05:30
draft: false
weight: 5
---

This section talks in-depth about setting up a frontend or backend project to use Space Cloud in your preferred language.

> **Note:** Make sure you have already [deployed](/install/docker) Space Cloud.

## Available options

Space Cloud supports both GraphQL and REST (HTTP and WebSockets) APIs so that you can stick to what you find comfortable.

### GraphQL API

GraphQL is the recommended way to use Space Cloud. It unlocks incredible powers like joins which are not exposed by REST APIs yet.

You can use any GraphQL client out there to talk to Space Cloud. However, it's always recommended to use a popular open-source client (e.g. Apollo).

Follow this [guide](/introduction/setting-up-project/graphql) to set up Apollo client (recommended for graphql) in your javascript project.

> **Note:** The file storage and user management APIs are only available via REST APIs as of now.

### REST API

You can use the [REST APIs of Space Cloud](https://app.swaggerhub.com/apis/YourTechBud/space-cloud/0.12.0) if you are more comfortable with REST. For file storage and user management module, REST is the only option as of now.

To make it easy to consume the REST APIs in web projects, we have created a Javascript SDK which consumes REST APIs internally. 

Follow this [guide](/introduction/setting-up-project/javascript) to set up Javascript SDK in your project.