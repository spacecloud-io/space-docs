---
title: "Features"
description: "Space Cloud Features"
date: 2020-02-12T06:42:53+05:30
weight: 3
---

Space Cloud comes with a whole bunch of features to help you build realtime and scalable apps:

## Database module

The database module is the core of Space Cloud. It allows you to perform CRUD operations on your database directly from the frontend.

**Supported databases** :heart: :

- MongoDB
- PostgreSQL and PostgreSQL compatible databases (For eg. CockroachDB, Yugabyte etc.)
- MySQL and MySQL compatible databases (For eg. TiDB)
- SQL Server

<br>

Although the database module of Space Cloud is schemaless, it lets you **optionally provide a schema** via Mission Control for these added benefits:

- Data validation before making mutations to the database.
- Creation/modification of tables in SQL databases.

Space Cloud allows you to perform a wide variety of CRUD operations:

### Querying

With Space Cloud, you can query your data in 3 ways:

- [Read](/storage/database/queries/simple-queries) directly from a table/collection.
- Perform [joins](/storage/database/queries/joins) on multiple tables (across databases).
- For complex aggregations, make views on your table and read data from a view as you would from a table.

> **Note:** You can make views only on SQL databases (e.g., PostgreSQL and MySQL)

You can also [request data from multiple databases](/storage/database/queries/multiple-queries) within a single request.

Space Cloud also supports slicing and dicing of the requested data with the following operations:

- [Filtering](/storage/database/queries/filtering)
- [Sorting](/storage/database/queries/sorting)
- [Pagination](/storage/database/queries/pagination)

### Mutations

Mutations are used to make changes to your data. Following mutations are supported in Space Cloud:

- [Insert](/storage/database/mutations/insert) multiple records.
- [Update](/storage/database/mutations/update) all records or those that match a filter.
- [Upsert](/storage/database/mutations/upsert) i.e. update record(s) if exists or insert.
- [Delete](/storage/database/mutations/delete) all records or those that match a filter.
- [Transactions](/storage/database/mutations/transactions) multiple mutations in a single transaction.

The following operations are supported in `update` - `set`, `inc`, `mul`, `max`, `min`, `currentDate`, `push`, `unset` and `rename`.

### Realtime subscriptions

Subscriptions is used to sync data in [realtime](/storage/database/subscriptions). You can subscribe to the data you are interested in, and Space Cloud guarantees to notify you whenever anything changes in that result set.

## File Storage Module

With the file storage module your frontend can:

- [Upload](/storage/filestore/upload-file) and [download](/storage/filestore/download-file) files.
- [Create folders](/storage/filestore/create-folder).
- [Delete](/storage/filestore/delete) file(s) and/or folder(s).

Supported storage mechanisms are:

- Amazon S3
- Google Cloud Storage
- Digital Ocean Spaces
- Local file storage

## GraphQL APIs for Restful Services

Services are a means to extend Space Cloud using microservices and serverless functions. You can write your microservices in the form of HTTP services that run alongside Space Cloud. These services can be accessed securely via GraphQL or directly.

Notable features of Remote services:

- Can be triggered from frontend directly or from other remote services.
- Space Cloud authorizes all calls to remote services via the security rules.
- Perform joins on remote services and databases via the GraphQL API of Space Cloud.

## Eventing Module

[Eventing module](/microservices/eventing/) is used to asynchronously trigger your microservices or serverless functions (e.g., AWS Lambda functions) based on any events in your app.

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

## Deployments Module

The [Deployments Module](/microservices/deployments) automatically deploys and scales your docker images on any Kubernetes cluster. It has first-class support of Istio. Hence all your services enjoy the benefit of using a Service Mesh.

In a nutshell, the deployments module lets you:
- Deploy docker images to Kubernetes
- Fully encrypt all internal traffic by default for enhanced security.
- AutoScale HTTP workloads even down to zero!
- Define service to service communication policy for easy compliance with regulations.