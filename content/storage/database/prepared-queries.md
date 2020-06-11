---
title: "Prepared Queries"
description: "Prepared Queries"
date: 2020-06-10T19:40:27+05:30
draft: false
weight: 7
---

The auto-generated APIs that Space Cloud provide for queries and mutations are quite powerful. However, in certain use cases, you need the flexibility to use the native/raw database queries. Prepared Queries help you achieve exactly that! (in a secure way of course 😀) 

> **Note:** Prepared queries work in SQL databases only.

## How do prepared queries work?

Prepared queries are nothing but ***prepared SQL statements*** that Space Cloud can execute on your database.

You define the prepared queries in Mission Control (Admin UI). Each prepared query has:

- **Name:** To identify the prepared query uniquely.
- **SQL query:** The SQL statement that you wish to execute.
- **Arguments:** The parameters to the SQL statement.

The client makes a GraphQL/REST request to Space Cloud with the name of the prepared query and any arguments if needed. Space Cloud executes the prepared SQL query with the arguments provided.

> **Note:** Prepared SQL statements are safe from SQL injections. 😇

You can easily configure who can invoke your prepared queries via the security rules of Space Cloud.

## Adding prepared query

Head over to the `Prepared queries` tab in the `Database` section of Mission Control.

Click on the `Add` button to open the following form:

![Add prepared query](/images/screenshots/add-prepared-query.png)

You need to enter the following information:

- **Name:** A unique name to identify the prepared query.
- **SQL Query:** The SQL query that you wish to execute.
- **Arguments:** The parameters to the SQL statement. [More on defining arguments](/storage/database/prepared-queries#defining-arguments) below.

Click the `Add prepared query` button. That's it!

### Defining arguments

The SQL statement that you want to execute might require some additional data/parameters to execute.

**For example**, to fetch the articles within a particular category of a user, you would have to write a query like this:

{{< highlight sql >}}
select * from articles where author_id = ? and category = ?
{{< /highlight >}}

Note the two `?`'s in the above query. They are used to define the parameters of the SQL statement. The value of parameters is resolved at the run time.

> **The syntax for denoting parameters in a SQL query is different for different databases. In Postgres, parameters are denoted as a series of `$` (`$1`, `$2`..). While for MySQL and SQL Server the parameters are simply denoted as `?`.**

Each parameter in the SQL query corresponds to a value in `arguments` array (in the same order) that you defined while adding the prepared query.

The values in the `arguments` array can either be static or dynamic. The arguments from the client request used to invoke the prepared query are available inside the `args` object. 

Thus, for the above example, we can add two arguments - `args.userId` and `args.category`, assuming that our GraphQL request contains arguments `userId` and `category`.

## Executing prepared query

Once you have added a prepared query to Space Cloud, you can execute them via the GraphQL or REST API of Space Cloud.

Let's say we have defined the following prepared query in Space Cloud:

| Field         | Value                                                  |
|:--------------|--------------------------------------------------------|
| **Name**      | `fetchArticles`                                        |
| **SQL Query** | `select id, title articles where user_id = ? and category = ?` |
| **Arguments** | [`args.userId`, `args.category`]                       |

To execute this prepared query, we can make the following request from client:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#prepared-query-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#prepared-query-js">Javascript</a></li>
    </ul>
  </div>
  <div id="prepared-query-graphql" class="col s12" style="padding:0">
{{< highlight graphql>}}
query {
  fetchArticles(userId: $userId, category: $category) @db {
    id
    title
  }
}
{{< /highlight >}}   
  </div>
  <div id="prepared-query-js" class="col s12" style="padding:0">
{{< highlight javascript >}}
// Coming soon
{{< /highlight >}}  
  </div>
</div>

> **Replace the `db` directive in the above query with the alias name of your database.**

Let's take a moment to understand what will happen by executing the above client request. The SQL query corresponding to the prepared query `fetchArticles` will be executed. The arguments passed in the request will be available under the `args` object. 

Let's say we have executed the above GraphQL query with the following variables:

{{< highlight json >}}
{
  "userId": "1",
  "category": "arts"
}
{{< /highlight >}}

The SQL query thus executed in effect will be:

{{< highlight sql >}}
select id, title articles where user_id = '1' and category = 'arts'
{{< /highlight >}}

Notice the selection set (id, title in the above GraphQL query). These are nothing but the fields returned by the execution of SQL query.

## Securing prepared queries

You can easily configure who can execute your prepared queries by defining the security rules in Space Cloud. 

These security rules are exactly similar to the ones that you write for [securing the auto-generated database APIs of Space Cloud](/storage/database/securing-apis). The only difference is that the security rules for auto-generated database APIs are written on table-operation level (e.g. `read` operation for `articles` table). While the security rules for prepared queries are directly written on the prepared query level.

To define security rules on a prepared query, head to the `Prepared queries` tab in the `Database` section. Click on the `Secure` button beside a prepared query to put the security rules.

**For example**, to make sure a user can only execute a prepared query only if the `userId` provided in the request arguments is his own userId, we can provide the following security rule:

{{< highlight js >}}
{
  "rule": "match",
  "type": "string",
  "eval": "==",
  "f1": "args.userId",
  "f2": "args.auth.id" // assuming that id inside the jwt claims is the user id 
}
{{< /highlight >}}

For more examples, checkout the [securing your database APIs](/storage/database/securing-apis) section.