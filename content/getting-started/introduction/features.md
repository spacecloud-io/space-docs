---
title: "Features"
date: 2019-09-20T06:42:53+05:30
draft: true
weight: 3
---

Space Cloud comes with a whole lot of features to help you build realtime and scalable apps:

## Database module

The database module is the core of Space Cloud. It allows you to perform operations on your database directly from frontend.

**Supported databases**:heart::

- MongoDB
- PostgreSQL and PostgreSQL compatible databases (For eg. CockroachDB, Yugabyte etc.)
- MySQL and MySQL compatible databases (For eg. TiDB)

Although database module of Space Cloud is schemaless, it let's you **optionally provide schema** via Mission Control for the added benefits:

- Data validation before making requests to database
- Creation/modification of tables in SQL databases

Space Cloud allows you to perform wide variety of CRUD operations:

### Querying

With Space Cloud, you can query your data in 3 ways:

- [Read](/essentials/querying/simple-queries) directly from a table/collection
- Perform left [join](/essentials/querying/joins) on multiple tables and read the joined data
- For complex aggregations, make views on your table and read data from a view as you would from a table

> **Note:** You can make views only on SQL databases (eg: PostgreSQL or MySQL)

You can also [request data from multiple databases](/essentials/querying/multiple-queries) within a single request.

Space Cloud also supports slicing and dicing of the requested data with the following operations:

- [Filtering](/essentials/querying/filtering)
- [Sorting](/essentials/querying/sorting)
- [Pagination](/essentials/querying/pagination)

### Mutations

Mutations are used to make changes to your data. Following mutations are supported in Space Cloud:

- [Insert](/essentials/mutations/insert) multiple records
- [Update](/essentials/mutations/update) all records or those that match a filter
- [Upsert](/essentials/mutations/upsert) i.e. update record(s) if exists or insert
- [Delete](/essentials/mutations/delete) all records or those that match a filter
- [Batch](/essentials/mutations/multiple-mutations) multiple mutations in a request.

The following operations are supported in `update` - `set`, `inc`, `mul`, `max`, `min`, `currentDate`, `push`, `unset` and `rename`.

### Realtime subscriptions

`subscription` is used to sync data in [realtime](/essential/subscriptions). You can subscribe to the data you are interested in by providing a filter and Space Cloud will notify you whenever any thing changes in that result set.

## File Storage

With file storage module your frontend can:

- [Upload](/essentials/file-storage/uploading) and [download](/essentials/file-storage/downloading) files
- [Create folders](/essentials/file-storage/creating-folder)
- [Delete](/essentials/file-storage/deleting) file/folder

Supported storage mechanisms are:

- Amazon S3
- Google Cloud Storage
- Digital Ocean Spaces
- Local file storage

## Functions module

Functions module allows you to [write custom business logic](/essentials/custom-business-logic/) in the form of simple functions like AWS Lambda. However, unlike AWS Lambda, these functions run as long lived microservices on the backend.

Notable features of Space Functions:

- Can be triggered from frontend directly or from other Space Functions
- All calls to functions are load balanced automatically by Space Cloud

## Eventing

[Eventing module](/advanced/event-triggers/) is used to asynchronously trigger Space Functions or any other webhooks (eg: AWS Lambda functions) on database in a reliable fashion.

Right now the supported event triggers are database operations (`insert`, `update` and `delete`)

> **Note:** In a future release, eventing would also work on file storage events like `upload`, `delete`, etc.

All event triggers are:

- **Reliable** - They are retried for a particular number of times (configurable) in case they fail
- **Trackable** - Stored in database so that they can be used for some other purpose as well

## Pub Sub

You can use the pub sub module in Space Cloud backed by the internal Nats. With pub sub module you can:

- [Publish](/advanced/pub-sub/publish) events on a particular topic (eg: `/feeds/sports`)
- [Subscribe](/advanced/pub-sub/subscribe) to particular events in group (everyone gets the event) or in a queue (any one gets the event)

> **Note:** Subscriptions work on a prefix basis. (i.e. If you have subscribed for `/feeds`, you will also get events for `/feeds/sports`) 

## Authorization

Access (request) to the database, file storage, functions and pub sub module goes through the authorization layer. 

The authorization layer decides whether the request should be allowed or not based on the security rules you have provided in Mission Control and the JWT token present in the request.

Security rules allow you to:

- Allow/deny access unconditionally
- Grant access only to **authenticated** requests (ones that have valid JWT token)
- Evaluate **conditions** based on data from databases and incoming requests to grant access
- Trigger Space Functions to determine whether a request is authenticated or not

### Granularity of security rules

- **Database:** Field level rules for each `<Collection> + <Operation Type>` (eg: delete operation in `posts` collection) 
- **Functions:** Service (group of functions) level as well as function level rules
- **File Storage:** Operation (`create`, `read`, `delete`) level rules for each path prefix
- **Pub Sub:** Operation (`publish` and `subscribe`) level rules for each path prefix


