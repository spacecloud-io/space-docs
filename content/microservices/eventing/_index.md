---
title: "Eventing"
description: "Eventing in Space Cloud"
date: 2019-10-19T10:46:59+05:30
draft: false
weight: 2
---

Space Cloud can be used to create event triggers on database, file storage or custom events. The eventing system in Space Cloud **reliably** invokes webhooks to carry out any custom logic.

## Why use event triggers?

Event triggers enable:

- **Improved performance**: Due to the **async** nature, event creators don't have to wait. 
- **Better reliability**: Configurable retry logic.
- **Simplified decoupling**: Change business logic without changing event data. 
- **Scheduling events**: Reschedule the event for some time in the future for flexible processing.

## Use cases

Event triggers are excellent for carrying out asynchronous business logic. Following are a few use cases of event triggers:

- Updating search index (e.g., Elasticsearch or Algolia) or a caching system on CRUD operations in your primary database.
- Performing mutations on any event.
- Sending out a welcome email on new signup.


## How it works

You add an event trigger to Space Cloud via Mission Control. Each event trigger has `type`, webhook and other configurable parameters.

Events can be of the following types:

- `DB_INSERT`: When a row/document gets created.
- `DB_UPDATE`: When a row/document gets updated.
- `DB_DELETE`: When a row/document gets deleted.
- `FILE_CREATE`: When a file/folder is created.
- `FILE_DELETE`: When a file/folder is deleted.
- `<CUSTOM>`: Whenever you queue a custom event to Space Cloud.

Whenever an event takes place (e.g., insert mutation via Space Cloud or a custom event), Space Cloud invokes the webhook with the event payload. If the webhook responds with a `2xx` status code, Space Cloud marks the event to be `processed`. Otherwise, it retries the webhook, a certain number of times (configurable) before finally marking it as `failed`. 

Space Cloud stores the events log in `event_logs` table in the eventing database (configurable).

### Service to service authentication

In some cases, you would want to verify the sender of the request received by your service. This is required when your service is running in an open or untrusted network.

Space cloud adds a `X-SC-Token` header which contains a token containing the identity of the caller space cloud instance. This token can be used to check if the incoming request is coming from an authentic source. This token is signed with the `secret` key provided in the project's configuration.