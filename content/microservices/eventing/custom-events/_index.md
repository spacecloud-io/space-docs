---
title: "Custom Events"
description: "Using Custom Events"
date: 2020-03-30T10:26:43+05:30
draft: false
---

Database and File storage are the source of events for the majority of applications. However, certain use cases involve events from some other sources as well. With Space Cloud, you can trigger webhooks on any custom events in your application. Space Cloud uses an in-built eventing queue to invoke your webhooks reliably. 

## Modes of custom event triggers

- **Asynchronous event triggers:** (Default mode) Space Cloud acknowledges the event after persisting it, and then processes the event asynchronously in the background.
- **Synchronous event triggers:** The event is processed synchronously and the webhook response from the event handler is returned to the client.

## How it works

- Event is queued to Space Cloud via its REST API.
- Space Cloud persists the event and then triggers the desired webhooks with the appropriate retry/delivery guarantees.
- The webhook response is persisted to the event store.
- Based on the type of event trigger, Space Cloud either acknowledges the event queue request immediately after persisting it or returns the webhook response back to the client.

> **Note:** The webhook response can itself specify an array of events to be queued. This allows dynamic chaining of event triggers. 