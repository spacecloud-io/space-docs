---
title: "Subscriptions"
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

To _offload the database_, Space Cloud does not rely on any CDC (Change Data Capture) mechanism. Space Cloud uses its in-built eventing system to guarantee that **all changes irrespective of any network failures propagate to the clients** over a bi-directional link in an orderly fashion. 

Isolating the database querying and the realtime module helps it scale the realtime piece independent of database. However, this poses some limitations which are acceptable for most applications. 