---
title: "Database"
description: "Database"
date: 2020-02-12T08:04:06+05:30
draft: false
weight: 1
---

The database module is responsible for creating **Instant, GraphQL APIs for all supported databases**. It also supports a subscriptions feature which lets you **listen on database changes in realtime**.

> **Space Cloud also allows you to execute native [prepared queries](/storage/database/prepared-queries) directly as an escape hatch in edge cases.**

Currently the database module supports the following databases :heart: :
- MongoDB
- PostgreSQL and PostgreSQL compatible databases (For eg. CockroachDB, Yugabyte etc.)
- MySQL and MySQL compatible databases (For eg. TiDB)
- SQL Server

Although the database module of Space Cloud is schemaless, it lets you **optionally provide a schema** via Mission Control for these added benefits:

- Data validation before making mutations to the database.
- Creation/modification of tables in SQL databases.

## Next Steps:

We recommend starting with the [data modelling guide](/storage/database/data-modelling/) to learn how you can create / edit tables, indexes and relations in Space Cloud in a declarative manner 