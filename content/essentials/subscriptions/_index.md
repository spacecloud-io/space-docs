---
title: "Subscriptions"
date: 2019-09-17T18:15:32+05:30
draft: true
weight: 4
---

With Space Cloud, you can subscribe to realtime changes in your database.


## How it works

The clients can subscribe to realtime changes in database by specifying a where clause. It's similar to a regular query. However, it's **live**, i.e. the client gets updated on any changes in the result set.

Space Cloud sends the initial result set on subscription request. After that, it only sends the **changes** and not the entire result set for **efficient bandwidth utilization**. The client SDKs maintain the complete result for you based on the initial set and changes received after that. However, if you are only interested in the changes and not the entire result set, you can customize this behaviour.

> **Note:** The feature of maintaining the entire result set is only available in client SDKs. In GraphQL, you can write a stateful link if you wish to maintain the entire result set.

## Architecture

To _offload the database_, Space Cloud does not rely on any CDC (Change Data Capture) mechanism. Space Cloud uses its in-built eventing system to guarantee that **all changes irrespective of any network failures propagates to the clients** over a bi-directional link in an orderly fashion. 

Isolating the database querying and the realtime module helps it scale the realtime piece independent of database. However, this poses some limitations which are acceptable for most applications. 

## Limitations

- The table/collection should have a primary key that must be `_id` in case of MongoDB and `id` for MySQL and Postgres and of type [ID](/essentials/data-modelling/types-and-directives/#scalar-types).
- All mutations (inserts, updates and deletes) have to take place via Space Cloud.
- All updates and deletes can be made on a single document only using the `_id` or `id` field in the where clause.
- Another request should not update the fields used in the where clause of `liveQuery`.

> **Note:** These limitations are only applicable if you intend to use the realtime functionality.