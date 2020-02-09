---
title: "Remote Services"
date: 2019-10-19T10:45:00+05:30
draft: false
weight: 7
---

Space Cloud provides realtime CRUD and file storage APIs for various data stores with authorization and access controls. However, in many cases, you would need to write some backend code for custom business logic. (example: integrating third-party APIs like payment gateways)

Space Cloud can trigger your remote HTTP services and provide a unified API layer for your app. All you need to do is write an HTTP service and provide its URL and endpoints to Space Cloud. You can write these services in any language or framework. Space Cloud even lets you perform joins on your database and remote services via GraphQL APIs.

This is what Space Cloud running with "Remote Services" looks like:

![Remote service architecture](/images/architectures/remote-services.svg)

## Use cases

You should use Remote Services when you want to **synchronously** trigger certain business logic. 

> **Note:** If you want to trigger asynchronous business logic in the background, then you should see [Event Triggers](/advanced/event-triggers).

Following are a few use cases of Remote Services:

- Custom business logic.
- Third-party integrations (e.g., Firebase Auth, Mailchimp, Stripe).
- Extending support for data stores which Space Cloud doesn't support yet.

## How it works

You write a custom HTTP service in any language or framework. Then, you register this remote service to Space Cloud via mission Control with a unique `service name`. Each service has an `URL` and can have multiple endpoints (each with a unique `endpoint name` within that service, an endpoint path and HTTP method). These services can be deployed anywhere as long as Space Cloud can reach them.

Your frontend can query these services now via the unified APIs of Space Cloud. The frontend mentions a `service name` and `endpoint name` along with optional parameters. When Space Cloud gets a request for a remote service from the frontend, it makes an HTTP request to the corresponding remote endpoint (service URL + endpoint path) with a body containing the parameters sent by the frontend. 

## Verifying requests

The remote services module provides two kinds of mechanism to verify incoming requests.

### End to end user authentication

As the name suggests, we authenticate the end user in this form of authentication. This is essential if you need to verify or restrict requests from authorized users only. 

Space Cloud transparently forwards the token provided by the user in the `Authorization` header. This token is signed with the `secret` key provided in the project's configuration.

### Service to service authentication

In some cases, you would want to verify the sender of the request received by your service. This is required when your service is running in an open or untrusted network.

Space cloud adds a `X-SC-Token` header which contains a token containing the identity of the caller space cloud instance. This token can be used to check if the incoming request is coming from an authentic source. This token is signed with the `secret` key provided in the project's configuration.