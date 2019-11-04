---
title: "Remote Services"
date: 2019-10-19T10:45:00+05:30
draft: true
weight: 7
---

Space Cloud provides realtime CRUD and file storage APIs for various data stores with authorization and access controls. However, in many cases, you would need to write some backend code for custom business logic. (example: integrating third-party APIs like payment gateways)

Space Cloud can trigger your remote services and provide a unified API layer for your app. All you need to do is write an HTTP service and provide its URL and endpoints to Space Cloud. You can write these services in any language or framework. Space Cloud even lets you perform joins on your database and remote services via GraphQL APIs.

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

You write a custom HTTP service in any language or framework. Then, you register this remote service to Space Cloud via mission Control with a unique `service name`. Each service has an `URL` and can have multiple endpoints (each with a unique `endpoint name` within that service and the endpoint path). These services can be deployed anywhere as long as Space Cloud can reach them.

Your frontend can query these services now via the unified APIs of Space Cloud. The frontend mentions a `service name` and `endpoint name` along with optional parameters. When Space Cloud gets a request for a remote service from the frontend, it makes a POST request to the corresponding remote endpoint (service URL + endpoint path) with a body containing the parameters sent by the frontend. 