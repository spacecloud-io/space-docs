---
title: "Add Existing Database"
description: "Add Existing Database"
date: 2020-04-01T11:48:23+05:30
draft: false
weight: 2
---

**Note:**
- **For MongoDB/Postgres/SQLServer users:** Space Cloud connects to the database with the name of your project id in case of **MongoDB** and **SQL Server**. In case of **Postgres**, it connects to the schema with the name of your project id inside the specified database. This behaviour will be fixed in an upcoming release. So as of now if you want to use your existing database/schema, you should name your project with the name of your database/schema. If you already have a project, then you should recreate the project with the database/schema name or rename the database/schema.
- **For MySQL users:** You can connect space cloud to any existing database. However, you need to start space cloud with the `--remove-project-flag`. If you are using `space-cli` then you can use the following command to start space cloud - `space-cli setup --env REMOVE_PROJECT_SCOPE`.

## Prerequisites

You need to follow some steps before adding an existing database based on where your existing database is:

- [Inside single node docker (started by space cli)](/storage/database/add-existing-database/#inside-single-node-docker-started-by-space-cli)
- [Inside single node docker (started manually by you)](/storage/database/add-existing-database/#inside-single-node-docker-started-manually-by-you)
- [Inside Kubernetes](/storage/database/add-existing-database/#inside-kubernetes)
- [Outside (Managed service)](/storage/database/add-existing-database/#outside-managed-service)

### Inside single node docker (started by space cli)

- **For MySQL users:** You need to start space cloud with the `--remove-project-flag`. If you are using `space-cli` then you can use the following command to start space cloud - `space-cli setup --env REMOVE_PROJECT_SCOPE`.
- **For MongoDB/Postgres/SQLServer users:** No need to start space cloud with any special flags.

The databases started with space cli have fixed hostname of the following format:
{{< highlight bash >}}
<db-alias-name>.db.svc.cluster.local
{{< /highlight >}}

For example, if you have kept the DB alias name of your database as `mydb` while spinning up the database via `space-cli`, then your hostname will be:
{{< highlight bash >}}
mydb.db.svc.cluster.local
{{< /highlight >}}

Note down this hostname as it will be used while adding the database to Space Cloud.

### Inside single node docker (started manually by you)

If you have run Space Cloud via `space-cli` but have an existing database (inside a docker container) not started by `space-cli`, then you need to follow these extra steps.

Connect you database to Space Cloud's network by running the following command:
{{< highlight bash >}}
docker network connect space-cloud <your-database-container-name>
{{< /highlight >}}

For example, if your database container name is `some-mongo`, then you need to run:
{{< highlight bash >}}
docker network connect space-cloud some-mongo
{{< /highlight >}}

Inspect your database container to get its IP Address. Run the following command:
{{< highlight bash >}}
docker inspect <your-database-container-name>
{{< /highlight >}}

It will log a very big JSON object on the console. The `IPAdrress` you are interested in will be under `Networks.space-cloud` key. This is the IP Adrress that will be used as the hostname while adding the database.

### Inside Kubernetes
Make sure you have created a Kubernetes service for your database inside a particular namespace. 

> **The namespace containing your database service should be different from your space cloud project id.**

The hostname of your database for Space Cloud would then be:
{{< highlight bash >}}
<service-name>.<namespace>.svc.cluster.local
{{< /highlight >}}

For example, if you have created a service named `my-postgres` inside `my-databases` namespace, then your hostname will be:
{{< highlight bash >}}
my-postgres.my-databases.svc.cluster.local
{{< /highlight >}}

Note down the hostname as it will be required later while adding the database to Space Cloud.

### Outside (Managed service)

If you are using one of the managed services like AWS RDS, Google Cloud SQL, etc. you need to get the hostname of the database from the console of that managed database.

## Adding a database to Space Cloud

Head to the Mission Control. If you have not already created your project, first create your project:

![Create project screen](/images/screenshots/create-project.png)

While creating a project, you will be prompted to add a database to your project with the following screen:

![Add database screen](/images/screenshots/add-database.png)

> **Note:** You can also add database(s) later to your project. To add a database to your project, you need to go the `Database` section of that project, click on the database selector/dropdown and then click on the `Add database` button to open the screen to add a database.

First, select a particular database that you want to add.

Then, provide the connection string of that selected database. The connection string is of the following format for the various databases:

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
  </div>
  <div id="conn-postgres" class="col s12" style="padding:0">
{{< highlight bash >}}
postgres://<username>:<password>@<hostname>:<port>/<database>?sslmode=disable
{{< /highlight >}}
  </div>
  <div id="conn-mysql" class="col s12" style="padding:0">
{{< highlight bash >}}
mysql://<username>:<password>@tcp(<hostname>:<password>)/<database>
{{< /highlight >}}
  </div>
  <div id="conn-sqlserver" class="col s12" style="padding:0">
{{< highlight bash >}}
Data Source=<host>,1433;Initial Catalog=master;User ID=<username>;Password=<password>@#;
{{< /highlight >}}
  </div>
</div>

Use the hostname collected from the prerequisite step in the above connection string format.

Then, give your database an alias name. The alias name that you provide here should be used in your GraphQL queries to identify your database (since Space Cloud can work with multiple databases). By default alias name is `mongo`, `postgres`, `mysql` and `sqlserver` for MongoDB, Postgres, MySQL and SQL Server respectively.

For example, if you change the alias name to `mydb`, then your GraphQL queries should be updated to include `mydb` like this:
{{< highlight graphql "hl_lines=2">}}
query {
  pokemon @mydb {
    id
    name
  }
}
{{< /highlight >}}

Finally, click on the `Add database` button. That's it! You have added your existing database to Space Cloud! You can now start tracking your existing tables/collection or create new ones.

## Tracking existing tables

Head to the `Overview` tab of `Database` section in Mission Control. If you have any existing tables in your database that haven't been tracked yet, you will see them under `Untracked Tables` like these:

![Untracked tables](/images/screenshots/untracked-tables.png)

Tracking a table/collection in Space Cloud exposes that table/collection via its REST/GraphQL APIs to the outside world (with security rules of course). When you track an existing table, you don't need to provide schema as Space Cloud understands it automatically by inspecting the database.

Click on the `Track` button beside the table name that you want to track. If you want to track all tables/collections, then click on the `Track all` button. Once you track a table, you can see it inside the Tables/Collections header as follows:

That's it you can now start various operations on your existing data like:
- [Queries](/storage/database/queries)
- [Mutations](/storage/database/mutations)
- [Realtime subscriptions](/storage/database/subscriptions)