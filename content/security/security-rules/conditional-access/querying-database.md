---
title: "Querying database"
description: "Querying database"
date: 2020-10-22T13:28:01+05:30
draft: false
weight: 2
---

Many times we want to allow access to a particular resource based on certain values in the database. In such scenarios, we can use the `query` rule to fetch data from the database.

Take the [Instagram example](#example) for instance. You can view a profile only if it's public or if you are in the followers' list of that profile. This use case requires us to fetch the profile that you want to view from a database. 

Such complex authorization problems can be easily solved in Space Cloud by just writing security rules.

## How it works

The basic syntax for the `query` rule is:

{{< highlight javascript >}}
{
  "rule": "query",
  "db": "<alias name of the database to be queried>",
  "col": "<table/collection name>",
  "find": "<find object>",
  "store": "<variable to store the response>"
  "clause": "<clause>" 
}
{{< /highlight >}}

The `query` rule makes a database query to the database and table/collection specified in the rule with the `find` object (where clause) specified in the rule. More details about find object are provided below.

The response from the database is stored in the variable specified in the `store` field. If no value is specified in the `store` field, then the response is stored in the `args.result` field. 

The security rule provided in the `clause` of the `query` rule is then evaluated to resolve the `query` rule. More details about the `clause` are provided below.

### Find object

The `find` object acts like a where clause to the database query. It follows the syntax of [MongoDB find query](https://docs.mongodb.com/manual/reference/operator/query/).

For example, to find all articles in a particular category that are published before a particular date, the `find` object will look like this:  

{{< highlight javascript >}}
{
  "category": "Science",
  "published_date": { "$lt": "2019-12-31" }
}
{{< /highlight >}}

> **The syntax for find object remains the same for all databases including SQL databases.**

You can even use variables inside a `find` object.

**Example:**

{{< highlight javascript >}}
{
  "category": "args.find.category",
  "published_date": { "$lt": "args.find.date" }
}
{{< /highlight >}}

Don't confuse the `args.find` with the `find` object that you are writing for the `query` rule in the above example. `args.find` is a variable available in security rules for `read`, `update` and `delete` database operations. Check out the [list of available variables](/security/security-rules/available-variables) for all operations in Space Cloud. 

### Clause

The `clause` field in the `query` rule helps to decide whether the `query` rule will be resolved or not. You can write any security rule inside a `clause` field. The result of the database query can be accessed inside the `clause` along with any other [available variables](/security/security-rules/available-variables). The `query` rule will get resolved, only if the rule provided in the `clause` gets resolved.

**Example:** Allow a user to create max 10 articles in the free plan. This requires you to first use the `query` rule to find the user's articles and then use the `clause` to check if the rows returned by the database are lesser than 10. Here's how you can use the `match` rule inside the `clause` to check this:

{{< highlight javascript >}}
{
  "clause": {
    {
      "rule": "match",
      "eval": "<",
      "type": "number",
      "f1": "utils.length(args.result)",
      "f2": 10 
    }
  }
}
{{< /highlight >}}

`args.result` is an array containing the records returned from the database query. `utils.length` is a helper function that helps us to check the length of an array/string. The database `query` rule will get resolved only if the length of `args.result` is lesser than 10 in the above example.

You can even match certain fields in the database query response. For example, `args.result.0.id` in the above example would mean the `id` field of the first row of the database result.

## Example

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
- The user (`args.auth.id` - userId present inside token as id) is in the followers' array of the profile.

> **Tip: Try to make a single database query using `and`/`or` clause for performance.** 

If the followers were a separate table in the above example, then we would have had to make two database queries, like this:

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

## Forwarding the database query results to your service

While using the database query rule to secure your remote services, you might often want to use the result of the database query used in the security rules in your remote service.

For example, let's say you are building an e-commerce shop. You have written a remote service that redeems a coupon code to users. You want to make sure that the coupon code that the user has provided is still active. So you write the following `query` rule to query the status of the coupon code and provide a `match` clause to allow the request only when the coupon code's status is active:

{{< highlight javascript >}}
{
  "rule": "query",
  "db": "mydb",
  "col": "coupon_codes",
  "find": {
    "id": "args.params.couponId"
  },
  "clause": {
    "rule": "match",
     "eval": "==",
    "type": "string",
    "f1": "args.result.0.status",
    "f2": "active" 
  }
}
{{< /highlight >}}

However, you want to access the coupon code details in the remote service as well to redeem the proper amount. Instead of querying the database again for the same details, you can forward the results of the database query to the payload of your remote service. 

Here's how you can forward the query results to your remote service by using the `store` field:

{{< highlight javascript "hl_lines=8 13">}}
{
  "rule": "query",
  "db": "mydb",
  "col": "coupon_codes",
  "find": {
    "id": "args.params.couponId"
  },
  "store": "args.params.couponDetails"
  "clause": {
    "rule": "match",
     "eval": "==",
    "type": "string",
    "f1": "args.params.couponDetails.0.status",
    "f2": "active" 
  }
}
{{< /highlight >}}

We have stored the query results in a field (`couponDetails`) inside `args.params` which is nothing but the payload of the remote service call. Thus the remote service will receive a field `couponDetails` inside the request payload/body.

