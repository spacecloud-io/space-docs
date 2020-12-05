---
title: "Filtering Events"
description: "Filtering Events"
date: 2020-12-03T13:18:20+05:30
draft: false
weight: 3
---

## Need for filtering events

Many times, we might want to capture the events conditionally. 

For example, let's say we want to send an email to our users whenever their orders are delivered. 

Let's assume we have an `orders` table which has a field called `status`. The `status` field of the order would keep updating at various stages like packing, shipping, delivery, etc. 

However, we only want to send the email when the `status` becomes `delivered`. Now instead of handling this logic inside our email service, we can configure Space Cloud to trigger the webhook only when `status` field is `delivered`. 

## How it works

To filter events, you need to specify the filtering rules at an event trigger level. These filtering rules are the same as [security rules](/security/security-rules) in Space Cloud. 

While capturing an event for an event trigger, Space Cloud checks whether filtering rules are configured for that event trigger. If you have configured filtering rules for an event trigger, then the event is captured, only if the filtering rules for that event trigger evaluates to true.

Taking our previous example, here's a sample filtering rule to capture an event only if the `status` field in the `orders` table is marked as `delivered`:

{{< highlight graphql>}}
{
  "rule": "match",
  "type": string,
  "eval": "==",
  "f1": "args.data.doc.status",
  "f2": "delivered"
}
{{< /highlight >}}

The `args.data` variable holds the `data` of the event payload. 

## Configuring filtering rules for an event trigger

Head over to the `Overview` tab of the `Eventing` section in Mission Control:

![Event Triggers](/images/screenshots/event-triggers.png)

Click the `Filtering Rules` button beside the required event trigger to open the security rule builder. 