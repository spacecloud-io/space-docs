---
title: "Features"
date: 2019-09-20T06:42:53+05:30
draft: true
weight: 3
---

Space Cloud comes with a whole bunch of features to help you build realtime and scalable apps:

## Database module

The database module is the core of Space Cloud. It allows you to perform CRUD operations on your database directly from the frontend.

**Supported databases** :heart: :

- MongoDB
- PostgreSQL and PostgreSQL compatible databases (For eg. CockroachDB, Yugabyte etc.)
- MySQL and MySQL compatible databases (For eg. TiDB)

<br>

Although the database module of Space Cloud is schemaless, it let's you **optionally provide a schema** via Mission Control for these added benefits:

- Data validation before making mutations to the database.
- Creation/modification of tables in SQL databases.

Space Cloud allows you to perform a wide variety of CRUD operations:

### Querying

With Space Cloud, you can query your data in 3 ways:

- [Read](/essentials/querying/simple-queries) directly from a table/collection.
- Perform [joins](/essentials/querying/joins) on multiple tables (across databases).
- For complex aggregations, make views on your table and read data from a view as you would from a table.

> **Note:** You can make views only on SQL databases (eg: PostgreSQL and MySQL)

You can also [request data from multiple databases](/essentials/querying/multiple-queries) within a single request.

Space Cloud also supports slicing and dicing of the requested data with the following operations:

- [Filtering](/essentials/querying/filtering)
- [Sorting](/essentials/querying/sorting)
- [Pagination](/essentials/querying/pagination)

### Mutations

Mutations are used to make changes to your data. Following mutations are supported in Space Cloud:

- [Insert](/essentials/mutations/insert) multiple records.
- [Update](/essentials/mutations/update) all records or those that match a filter.
- [Upsert](/essentials/mutations/upsert) i.e. update record(s) if exists or insert.
- [Delete](/essentials/mutations/delete) all records or those that match a filter.
- [Batch](/essentials/mutations/multiple-mutations) multiple mutations in a single transaction.

The following operations are supported in `update` - `set`, `inc`, `mul`, `max`, `min`, `currentDate`, `push`, `unset` and `rename`.

### Realtime subscriptions

Subscriptions is used to sync data in [realtime](/essential/subscriptions). You can subscribe to the data you are interested in by providing a filter and Space Cloud will notify you whenever anything changes in that result set.

## File Storage Module

With the file storage module your frontend can:

- [Upload](/essentials/file-storage/uploading) and [download](/essentials/file-storage/downloading) files.
- [Create folders](/essentials/file-storage/creating-folder).
- [Delete](/essentials/file-storage/deleting) file(s) and/or folder(s).

Supported storage mechanisms are:

- Amazon S3
- Google Cloud Storage
- Digital Ocean Spaces
- Local file storage

## Functions Module

Functions module allows you to [write custom business logic](/essentials/custom-business-logic/) in the form of simple functions like AWS Lambda. However, unlike AWS Lambda, these functions run as long lived microservices on the backend.

Notable features of Space Functions:

- Can be triggered from frontend directly or from other Space Functions.
- All calls to functions are load balanced automatically by Space Cloud.
- Service discovery and other networking aspects are handled automatically.

## Eventing Module

[Eventing module](/advanced/event-triggers/) is used to asynchronously trigger Space Functions or any other webhooks (eg: AWS Lambda functions) based on database and file storage events.

Right now the supported event triggers are the following database operations (`insert`, `update` and `delete`).

> **Note:** In a future release, eventing would also work on file storage events like `upload`, `delete`, etc.

All event triggers are:

- **Reliable** - Each event will trigger a Space Function or webhook.
- **Trackable** - Stored in database so that they can be used for other purposes.

## Pub Sub Module

You can use the pub sub module in Space Cloud backed by [Nats](https://nats.io). With the pub sub module you can:

- [Publish](/advanced/pub-sub/publish) events on a particular topic (eg: `/feeds/sports`)
- [Subscribe](/advanced/pub-sub/subscribe) to particular events in group (everyone gets the event) or in a queue (any one gets the event)

> **Note:** Subscriptions work on a prefix basis. (i.e. If you have subscribed for `/feeds`, you will also get events for `/feeds/sports`) 

## Authorization

All requests to the database, file storage, function and pub sub modules goes through the authorization layer. 

The authorization layer decides whether the request should be allowed or not based on the security rules you have provided in Mission Control and the JWT token present in the request.

Security rules allow you to:

- Allow / deny access unconditionally.
- Grant access only to **authenticated** requests (ones that have a valid JWT token).
- Evaluate **conditions** based on data from databases and incoming requests to grant access.
- Trigger Space Functions to determine whether a request is authenticated or not.

### Granularity of security rules

- **Database:** Operation (`create`, `read`, `update`, `delete`) level rules for each `collection / table` (eg: delete operation in `posts` collection).
- **Functions:** Service level as well as function level rules.
- **File Storage:** Operation (`create`, `read`, `delete`) level rules for each path prefix.
- **Pub Sub:** Operation (`publish` and `subscribe`) level rules for each path prefix.


