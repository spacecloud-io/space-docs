---
title: "Features"
date: 2019-09-20T06:42:53+05:30
draft: false
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

Although the database module of Space Cloud is schemaless, it lets you **optionally provide a schema** via Mission Control for these added benefits:

- Data validation before making mutations to the database.
- Creation/modification of tables in SQL databases.

Space Cloud allows you to perform a wide variety of CRUD operations:

### Querying

With Space Cloud, you can query your data in 3 ways:

- [Read](/essentials/querying/simple-queries) directly from a table/collection.
- Perform [joins](/essentials/querying/joins) on multiple tables (across databases).
- For complex aggregations, make views on your table and read data from a view as you would from a table.

> **Note:** You can make views only on SQL databases (e.g., PostgreSQL and MySQL)

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

Subscriptions is used to sync data in [realtime](/essential/subscriptions). You can subscribe to the data you are interested in, and Space Cloud guarantees to notify you whenever anything changes in that result set.

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

## Remote Services

Remote services are a means to extend Space Cloud. You can write your custom business logic in the form of HTTP services that run alongside Space Cloud. These services can be accessed securely via the GraphQL or REST APIs of Space Cloud.

Notable features of Remote services:

- Can be triggered from frontend directly or from other remote services.
- Space Cloud authorizes all calls to remote services via the security rules.
- Perform joins on remote services and databases via the GraphQL API of Space Cloud.

## Eventing Module

[Eventing module](/advanced/event-triggers/) is used to asynchronously trigger your custom business logic (e.g., AWS Lambda functions) based on any events in your app.

> **Note:** Right now the database and custom event triggers are supported. In a future release, eventing would also work on file storage events.

All event triggers are:

- **Reliable** - Each event, triggers a webhook reliably.
- **Trackable** - Stored in the database so that you can use them for other purposes.

## Authorization

All requests to the database, file storage and remote services go through the authorization layer. 

The authorization layer decides whether the request should be allowed or not based on the security rules you have provided in Mission Control and the JWT token present in the request.

Security rules allow you to:

- Allow/Deny access to requests unconditionally.
- Grant access only to **authenticated** requests (ones that have a valid JWT token).
- Evaluate **conditions** based on data from databases and incoming requests to grant access.
- Trigger webhooks to determine whether a request is authorized or not.

### Granularity of security rules

- **Database:** Operation (`create`, `read`, `update`, `delete`) level rules for each `collection / table` (eg: delete operation in `posts` collection).
- **Remote Services:** Endpoint level.
- **File Storage:** Operation (`create`, `read`, `delete`) level rules for each path prefix.