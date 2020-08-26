---
title: "Querying a Database"
description: "Querying a Database"
date: 2020-06-18T12:07:18+05:30
draft: false
weight: 2
---

Many a times we want to allow access to a particular resource based on certain values in database. In such scenarios, we can use the `query` rule to fetch data from database.

Take the [Instagram example]() for instance, you can view a profile only if it's public or if you are in the followers list of that profile. This use case requires us to fetch the profile that you want to view from a database. 

Such complex authorization problems can be easily solved in Space Cloud by just writing security rules.

## How it works

The basic syntax for the `query` rule is:

{{< highlight javascript >}}
{
  "rule": "query",
  "db": "<alias name of the database to be queried>",
  "col": "<table/collection name>",
  "find": "<find object>",
  "clause": "<clause>" 
}
{{< /highlight >}}

The `query` rule makes a database query to the database and table/collection specified in the rule with the find object (where clause) specified in the rule. More details about find object is provided [below]().

The response from the database is available in `args.result` variable. The security rule provided in the `clause` of the `query` rule is then evaluated to resolve the `query` rule. More details about the `clause` is provided [below]().

### Find object

The find object acts like a where clause to the database query. It follows the syntax of [MongoDB find query](https://docs.mongodb.com/manual/reference/operator/query/).

For example, to find all articles in a particular category that are published before a particular date, the find object will look like this:  

{{< highlight javascript >}}
{
  "category": "Science",
  "published_date": { "$lt": "2019-12-31" }
}
{{< /highlight >}}

> **The syntax for find object remains same for all databases including SQL databases.**

You can even use variables inside a find object.

**Example:**

{{< highlight javascript >}}
{
  "category": "args.find.category",
  "published_date": { "$lt": "args.find.date" }
}
{{< /highlight >}}

Don't confuse the `args.find` with the find object that you are writing for the `query` rule in the above example. `args.find` is a variable availabe in security rules for `read`, `update` and `delete` database operations. Check out the [list of available variables]() for all operations in Space Cloud. 

### Clause

The `clause` field in the `query` rule helps to decide whether the `query` rule will be resolved or not. You can write any security rule inside a `clause` field. The `query` rule will get resolved only if the rule provided in the `clause` gets resolved.

**Example:** Check if the database query returned any rows with the help of `match` clause:

{{< highlight javascript >}}
{
  "clause": {
    {
      "rule": "match",
      "eval": ">",
      "type": "number",
      "f1": "utils.length(args.result)",
      "f2": 0 
    }
  }
}
{{< /highlight >}}

`args.result` is an array containing the records returned from the database query. `utils.length` is a helper function that helps us to check the length of an array/string. The database `query` rule will get resolved only if the length of `args.result` is greater than zero in the above example.

## Instagram example

This is a popular use case for the database `query` rule. In Instagram, you can view a profile only if its public or if you are in the followers of that profile.

Let's assume we are using MongoDB where `followers` is an embedded field inside profiles collection. Here's the security rule that we can write on the `profiles` collection to prevent the user from reading a profile that he isn't authorized to:

{{< highlight javascript >}}
{
  "rule": "query",
  "db": "mydb",
  "col": "profiles",
  "find": {
    "$or": [
      {
        "id": "args.find.id",
        "isPublic": true
      },
      {
        "followers": {
          "$in": "args.auth.id"
        }
      }
    ]
  },
  "clause": {
    "rule": "match",
     "eval": ">",
    "type": "number",
    "f1": "utils.length(args.result)",
    "f2": 0 
  }
}
{{< /highlight >}}

We are making a single database query to profiles collection with an `or` clause where:

- The specified profile (`args.find.id`) is public (has `isPublic` field set to true)

**OR**
- The user (`args.auth.id` - userId present inside token as id) is in the followers array of the profile.

> **Tip: Try to make a single database query using `and`/`or` clause for performance.** 

If the followers was a separate table in the above example, then we would have had to make two database queries, like this:

{{< highlight javascript >}}
{
  "rule": "or",
  "clauses": [
    {
      "rule": "query",
      "db": "mydb",
      "col": "profiles",
      "find": {
        "id": "args.find.id",
        "isPublic": true
      },
      "clause": {
        "rule": "match",
         "eval": ">",
        "type": "number",
        "f1": "utils.length(args.result)",
        "f2": 0 
      }
    },
    {
      "rule": "query",
      "db": "mydb",
      "col": "followers",
      "find": {
        "follower_id": "args.auth.id",
        "profile_id": "args.find.id"
      },
      "clause": {
        "rule": "match",
         "eval": ">",
        "type": "number",
        "f1": "utils.length(args.result)",
        "f2": 0 
      }
    }    
  ]
}
{{< /highlight >}}