---
title: "Conditional Access"
description: "Conditional Access"
date: 2020-10-22T13:28:15+05:30
draft: false
weight: 4
---

Most of the times, we want to grant our users access to a particular resource conditionally, i.e. only if the user/request matches certain criteria or conditions. 

There are three primary security rules in Space Cloud for granting access conditionally:

- **match:** This rule is used to allow a particular request only when a certain condition has been met. Generally, it is used to match the request parameters (like the where clause or certain fields in the document to be inserted) with the auth object (token claims).
- **query:** Performs a database query to make use of additional data for matching conditions in the `match` rule. 
- **webhook:** Triggers a webhook to invoke custom logic for edge cases that can't be covered by `match` and `query`.

> **You can easily model complex authorization tasks in Space Cloud by [combining multiple security rules together](/security/security-rules/combining-multiple-rules) using `and`/`or` rules.**

For example, a user with the role `author` should be allowed to delete an article only if he is the author of that article. (i.e. the article's `author_id` field is equal to the id claim of the user) However, an admin should be able to delete any article. This can be modelled as - an article should be allowed to delete only if the user has role `admin`, or if the user has role `user` and the article id is equal to user id. 

Here's a security rule expressing the authorization logic for the above example:

{{< highlight javascript >}}
{
  "rule": "or",
  "clauses": [
    {
      "rule": "match",
      "type": "string",
      "eval": "==",
      "f1": "args.auth.role", // assuming token contains a claim named role
      "f2": "admin" 
    },
    {
      "rule": "or",
      "clauses": [
        {
          "rule": "match",
          "type": "string",
          "eval": "==",
          "f1": "args.auth.role",
          "f2": "user" 
        },
       {
          "rule": "match",
          "type": "string",
          "eval": "==",
          "f1": "args.find.author_id", // args.find is the variable containing the where clause
          "f2": "args.auth.id" // assuming token contains a claim names id equal to id of the user
        }
      ]   
    }
  ]
}
{{< /highlight >}}

## Next steps

Check out the in-depth documentation for the `match`, `query` and `webhook` rules in the upcoming pages.