---
title: "Add New Database"
date: 2020-04-01T11:48:10+05:30
draft: false
weight: 1
---

## Spinning up a database

We first need to have a database up and running in order to add it to Space Cloud.

### Development/Testing environment

This guide assumes that you have used the docker setup of Space Cloud for development/testing environment.

> **Note:** Running database in docker is only recommended in development environment. In production environment, you must use a managed database service.

Working with a database in development environment can be cumbersome. For example, you need to inspect the Docker IP of the database container to form the correct database URL. Also, this Docker IP may get changed if you restart the database container. 

In order to provide a smoother development experience, we have `add database` command to `space-cli`. Just run the following bash command to spin up a database:

{{< highlight bash >}}
space-cli add database <db-type>
{{< /highlight >}}

The `<db-type>` is `postgres` for Postgres, `mysql` for MySQL and `mongo` for MongoDB. 

The `add database` command of `space-cli` runs the specified database in the same Docker network as Space Cloud and also makes sure that the database URL does not change on restarting the docker setup via `space-cli start` command.

The hostname of the database added via `space-cli` is of the following format:

{{< highlight bash >}}
<db-alias-name>.db.svc.cluster.local
{{< /highlight >}}

This hostname will be used in the connection string while adding the database to Space Cloud. 

### Production environment

We recommend using a managed database service for production environment like AWS RDS, Google Cloud SQL, Mongo Atlas, etc.

After spinning up a managed database, note down the hostname from their console as it will be used while adding database to Space Cloud.


## Adding database to Space Cloud

Database can be added to a Space Cloud project while creating a project or even after the project has been added. While creating a project, you will see a screen like this to add a database:

![Add database screen](/images/screenshots/add-database.png)

Select a database that you want to add from the following:
- `MongoDB`
- `PostgreSQL`
- `MySQL`
- `SQL Server`
- `Embedded` (bbolt db - an embedded document database)

Then, provide a connection string for the selected database. The format for connection string is as follows:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#conn-mongo">MongoDB</a></li>
      <li class="tab col s2"><a href="#conn-postgres">PostgreSQL</a></li>
      <li class="tab col s2"><a href="#conn-mysql">MySQL</a></li>
      <li class="tab col s2"><a href="#conn-sqlserver">SQL Server</a></li>
    </ul>
  </div>
  <div id="conn-mongo" class="col s12" style="padding:0">
{{< highlight bash >}}
mongodb://<hostname>:<port>
{{< /highlight >}}

This will create a database with the name of `<project-id>` inside MongoDB.
  </div>
  <div id="conn-postgres" class="col s12" style="padding:0">
{{< highlight bash >}}
postgres://<username>:<password>@<hostname>:<port>/<database>?sslmode=disable
{{< /highlight >}}

This will create a schema with the name of `<project-id>` inside the specified database.
  </div>
  <div id="conn-mysql" class="col s12" style="padding:0">
{{< highlight bash >}}
mysql://<username>:<password>@tcp(<hostname>:<password>)/
{{< /highlight >}}

This will create a database with the name of `<project-id>` inside MySQL.
  </div>
  <div id="conn-sqlserver" class="col s12" style="padding:0">
{{< highlight bash >}}
Data Source=<host>,1433;Initial Catalog=master;User ID=<username>;Password=<password>@#;
{{< /highlight >}}
  </div>
</div>