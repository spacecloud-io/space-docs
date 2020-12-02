---
title: "Subscriptions"
description: "Subscriptions"
date: 2019-09-17T18:15:32+05:30
draft: false
weight: 6
---

With Space Cloud, you can subscribe to realtime changes in your database.

## How it works

Space Cloud allows you to subscribe to a particular _result set_ in your database by specifying a where clause. So whenever anything within that result set changes, i.e. new documents are added/updated/deleted, you get notified. 

However, for **efficient bandwidth utilization**, Space Cloud doesn't send the entire result set on every change. It only sends the changed document to the concerned clients. The client can choose whether or not to receive the initial documents in the result set at the time of subscribing. 

> **Note:** You can write a stateful link if you wish to maintain the entire result set while using any REST or GraphQL client libraries. However, if you are using one of the client SDKs of Space Cloud, you get the stateful link out of the box.

## Architecture

Space Cloud uses a CDC (Change Data Capture) mechanism to provide strong guarantees and reliability. 

Benefits of using CDC based architecture:

- Space Cloud can even capture mutations happening to the database directly from outside of Space Cloud.
- Reliability. All events get captured reliably.
- Performance. No need for polling database. Changes are streamed in realtime.

CDC based architecture has a few limitations which are documented below.

## Limitations

Following are the limitations of the subscriptions in Space Cloud:

- Truncating a table doesn't spawn the corresponding `DELETE` events.
- Subscriptions doesn't work for SQL Server yet.