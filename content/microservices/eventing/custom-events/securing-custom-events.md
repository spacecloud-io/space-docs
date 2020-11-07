---
title: "Securing Custom Events"
description: "Securing Custom Events"
date: 2020-03-30T20:37:14+05:30
draft: false
weight: 3
---


You can easily configure the access control logic for queing/triggering custom events with Space Cloud's security rules. The security rules for custom events work on the event type level. This means you can have different rules for different types of custom events.

> **Note:** You only need to secure custom events as they are queued via REST API of Space Cloud, unlike database and file storage events that are queued by Space Cloud internally.

Here's a sample snippet which shows the rules of a custom event type `MY_EVENT_TYPE`:

{{< highlight json >}}
{
  "rule": "allow"
}
{{< /highlight >}}

You can add rules for each custom event type. A request to queue an endpoint is denied if there is no rule for its type. This ensures that all calls to queue events are secure by default.

Space Cloud's security rules are flexible enough to enforce any access control logic including querying your databases, validating conditions and masking private data. Checkout the documentation of [security rules]() to learn more.

## Configuring security rules

Head over to the `Rules` tab in the `Eventing` section of the Mission Control. You would see a list of custom event types that you are using in your event triggers. Click the `Secure` action next to any of the event type:

This will open a Rule Builder UI to configure the rules easily:

The rule editor also comes packed with a quite a few [shortcuts]() to make you feel productive.

If you are more comfortable wih JSON, you can switch to the JSON editor as well by clicking on the `JSON` tab. 

## Available variables

Following are the variables available in the security rules for custom events:

| Variable      | Data type | Description                                                                                            |
|---------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`   | Object    | Object containing the jwt claims present in the token.                                                 |
| `args.params` | Object    | The event data object.                                                                                 |
| `args.token`  | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |