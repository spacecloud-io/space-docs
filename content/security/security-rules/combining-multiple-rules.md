---
title: "Combining Multiple Rules"
description: "Combining Multiple Rules"
date: 2020-06-18T12:09:06+05:30
draft: false
weight: 7
---

Real world use cases often demand complex access control logic. Space Cloud allows you to mix and match various security rules using the `and` and `or` rules.

## How it works

The syntax for the `and` and `or` rule is:

{{< highlight javascript >}}
{
  "rule": "and|or",
  "clauses": "<array-of-clauses>"
}
{{< /highlight >}}

`clauses` is nothing but an array of Space Cloud security rules. All security rule except `allow`/`deny` are valid inside the clauses array including `and`/`or` themselves. 

- **`and`**: Performs logical AND operation on all the clauses. i.e. the `and` rule evaluates to true only if all the security rules inside the clauses evaluates to true.
- **`or`**: Performs logical OR operation on all the clauses. i.e. the `or` rule evaluates to true if any one of the clauses evaluates to true. As soon as a clause evaluates to true in an `or` rule, the rest of the clauses are not evaluated.

## Example

The Instagram problem - Make sure the user can query a profile only if it’s public or he is a follower:
{{< highlight javascript >}}
{
  "rule": "or",
  "clauses": [
    {
      "rule": "query",
      "db": "mongo",
      "col": "profiles",
      "find": {
        "userId": "args.find.userId",
        "isPublic": true
      }
    },
    {
      "rule": "query",
      "db": "mongo",
      "col": "profiles",
      "find": {
        "followers": {
          "$in": "args.auth.userId"
        }
      }
    }
  ]
}
{{< /highlight >}}


## Nesting and/or

To perform complex access control logic, you can even nest multiple `and/or` inside another `and/or` **infinitely**. 

**Example:** Allow updating a profile only if the update operation is performed by the owner of the profile himself or the admin. Also the name and email fields should always be encrypted no matter what and the description field should always be greater than 10 characters. Here's how we can write a security rule for this:

{{< highlight javascript >}}
{
  "rule": "and",
  "clauses": [
    {
      "rule": "or",
      "clauses": [
        {
          "rule": "match",
          "eval": "==",
          "type": "string",
          "f1": "args.find.user_id",
          "f2": "args.auth.id"
        },
        {
          "rule": "match",
          "eval": "==",
          "type": "string",
          "f1": "args.auth.role",
          "f2": "admin"
        }        
      ]
    },
    {
      "rule": "match",
      "eval": ">",
      "type": "number",
      "f1": "utils.length(args.$set.description)",
      "f2": 10
    },
    {
      "rule": "encrypt",
      "fields": ["args.$set.name", "args.$set.email"]
    }
  ]
}
{{< /highlight >}}