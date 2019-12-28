---
title: "Data Modelling"
date: 2019-10-15T08:56:08+05:30
draft: false
weight: 1
---

With Space Cloud, you can quickly **model your data and the relations** that exist between them via the GraphQL Schema Definition Language (SDL).

Data modelling in Space Cloud has two significant roles:

- **Define the underlying database schema** (Space Cloud maps the types and directives you mention to database tables and constraints).
- **Data validation layer** (Space Cloud validates the request for correct schema before any mutations. This is especially helpful for schemaless databases like MongoDB).

If you are already excited and want to take the data modelling in Space Cloud for a quick spin, follow [this guide](/essentials/data-modelling/quick-start).


## How it works

With Space Cloud, you can easily model your databases using a Schema Definition Language (SDL) which is consistent across all databases.

### Creating table

While creating a table/collection through Mission Control, you provide its schema which looks something like this:

{{< highlight graphql >}}
type post {
  id: ID! @primary
  title: String!
  text: String!
  category: String
  is_published: Boolean!
  published_date: DateTime
}
{{< /highlight >}}

Space Cloud creates a table with all the constraints in the underlying database as per the schema you have mentioned. 

### Updating schema

If you want to change the schema, then you go to the `Schema` tab in the `Database` section and modify the schema. Space Cloud updates the table structure based on the new schema.

### Data validation

Whenever anyone performs a mutation on any table/collection, Space Cloud validates the data before actually performing the mutation on database. Thus, Space Cloud provides you with a decoupled validation plane which works independently of the database. This validation plane is especially helpful in schemaless databases.
 
## Features
- Supported data types: string, integer, float, boolean, datetime.
- Optional auto-generated unique `ID` fields.
- Optional auto-generated `createdAt` and `updatedAt` timestamps.
- Constraints like unique key, foreign key, primary key, default values and not null.
- Managing indexes.
- Data validation on CRUD operation.